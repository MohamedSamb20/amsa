/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Workout = require("./models/workout");
const Exercise = require("./models/exercise");
const Setting = require("./models/settings");
const Friendship = require("./models/friendship");
const Friendrequest = require("./models/friendrequest");
const Workoutrequest = require("./models/workoutrequest");
const LastWorkout = require("./models/lastworkout");
const Plannedworkout = require("./models/plannedworkout");
const Routine = require("./models/routine.js");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

const DAYS_IN_MONTH =[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|





router.post("/exercise", auth.ensureLoggedIn, (req, res) => {
  // console.log(req.body);

  // console.log(req.user);
  // const username = User.find(req.body.userId)
  // console.log(username);

    const newExercise = new Exercise({
      userId: req.body.userId,
      
      exercise: req.body.exercise,
      sets: req.body.sets,
      reps: req.body.reps,
      weightUsed: req.body.weightUsed,
    });
    newExercise.save().then((exercise) => res.send(exercise)); 
});
router.get("/exercise", (req, res) => {
  Exercise.findOne({_id: req.query._id}).then((item) => {
    console.log(item);
    res.send(item);

  });
}
);
router.post("/deleteexercise", auth.ensureLoggedIn, (req, res) => {
  Exercise.findOneAndDelete({exercise: req.body.exercise, userId: req.body.userId}).then((result) => {res.send(result)});

});
router.post("/workout", auth.ensureLoggedIn, (req, res) => {
  
    
    const newWorkout = new Workout({
    userId: req.body.userId,
    username: req.user.name,
    workoutType: req.body.workoutType,
    exerciseIds: req.body.exerciseIds,
    weightUnit: req.body.weightUnit,
    
  });

  newWorkout.save().then((workout) => res.send(workout));
});

router.post("/lastworkout", auth.ensureLoggedIn, (req, res) => {
  const posted = {
    userId: req.body.userId,
    username: req.user.name,
    workoutType: req.body.workoutType,
    exerciseIds: req.body.exerciseIds,
    weightUnit: req.body.weightUnit,
    day: Math.floor(Date.now()/(1000*60*60*24)),
  };
  LastWorkout.findOne({userId: req.body.userId}).then((workout) =>{
    if (workout === null) {
      User.findOneAndUpdate({_id: req.body.userId}, {streak:1}, {new:true, }).then(
        (user) => {user.save()});
      const newWorkout = new LastWorkout(posted);
      newWorkout.save().then((workout) => res.send(workout));
    } else {
      if (workout.day !== Math.floor(Date.now()/(1000*60*60*24))) {
        User.findOne({ _id: req.body.userId}).then((user) => {
          User.findOneAndUpdate({ _id: req.body.userId}, {streak: user.streak + 1}, {new:true, }).then((user) => {
            user.save()
          })});
      };
      LastWorkout.findOneAndUpdate({ userId: req.body.userId}, posted,{new:true, }).then((workout) => {
      workout.save().then((workout) => res.send(workout));
      })
    }
  })
});

router.get('/workout', (req,res) => {
  // console.log('here');
  LastWorkout.findOne({userId : req.query.userId}).then((workout) => {
    if (workout === null) {workout = null};
    res.send(workout)});
});
router.get('/allworkouts', (req,res) => {
  // console.log('here');
  Workout.find({$query:{userId: req.query.userId},$orderby:{sort:{timestamp:-1}}}).then((exercises) => {
    console.log('got exercises,' , exercises);
    res.send(exercises)});
 
});

router.get("/settings", (req, res) => {
  Setting.findOne({ userId: req.query.userId}).then((setting) => {
    if (setting === null) {setting = false}
    res.send(setting);
  });
});

router.post("/settings", auth.ensureLoggedIn, (req, res) => {
  let weights = []
  Setting.findOne({ userId: req.body.userId}).then((set) => {
    weights = (set === null)? []: set.weightHistory;
    const currentDate = new Date();
    const dateInString = `${MONTHS[currentDate.getMonth()]} ${currentDate.getDate()}`;
    weights.push([dateInString, req.body.weight]);
    const posted = {
      userId: req.body.userId,
      weightUnit: req.body.weightUnit,
      heightUnit: req.body.heightUnit,
      height: req.body.height,
      weight: req.body.weight,
      height1: req.body.height1,
      height2: req.body.height2,
      weightHistory: weights,
      username: req.body.username,
    };
    Setting.findOne({ userId: req.body.userId}).then((setting) =>{
      if (setting === null) {
        const newSetting = new Setting(posted);
        newSetting.save().then((setting) => res.send(setting));
      } else {
        Setting.findOneAndUpdate({ userId: req.body.userId}, posted,{new:true, }).then((setting) => {
            setting.save().then((setting) => res.send(setting));
          })
      };
    });
  });
});


router.get("/friends", (req, res) => {
  Friendship.find({ userId: req.query.userId }).then((friendships) => {
    res.send(friendships);
  }); 
});

router.post("/friend", auth.ensureLoggedIn, async (req, res) => {
  const previousFriends = await Promise.all([
    Friendship.find({userId: req.body.userId, friendId: req.body.friendId}).count(),
  ])
  if(previousFriends[0] > 0){
    res.send({});
  } else {
    const newFriendship = new Friendship({
      userId: req.body.userId,
      friendId: req.body.friendId,
    });
  
    newFriendship.save().then((friendship) => res.send(friendship));
  }
});

router.get("/people", (req, res) => {
  User.find({ name : new RegExp(req.query.value, "i") }).then((people) => {
    res.send(people);
  });
});

router.post("/friendrequest", auth.ensureLoggedIn, async (req, res) => {
  const previousRelations = await Promise.all([
    Friendrequest.find({userId: req.body.requestee, requester: req.body.user}).count(),
    Friendship.find({userId: req.body.requestee, friendId: req.body.user}).count(),
    Friendrequest.find({requester: req.body.requestee, userId: req.body.user}).count(),]);
  if(previousRelations[0] + previousRelations[1] + previousRelations[2] > 0){
        res.send({});
  } else {
    const newFriendrequest = new Friendrequest({
      userId: req.body.requestee,
      requester: req.body.user,
    });
  
    newFriendrequest.save().then((friendrequest) => res.send(friendrequest));
  }
});

router.post("/removefriendrequest", auth.ensureLoggedIn, (req, res) => {
  Friendrequest.deleteOne({
    userId: req.body.userId,
    requester: req.body.requester,
  }).then((response) => res.send(response));
});

router.post("/removefriend", auth.ensureLoggedIn, (req, res) => {
  Friendship.deleteOne({
    userId: req.body.userId,
    requester: req.body.requester,
  }).then((response) => res.send(response));
});

router.get("/friendrequests", (req, res) => {
  const friendRequests = Friendrequest.find({userId: req.query.userId}).then((request) => res.send(request));
});

router.get("/outgoingrequests", (req, res) => {
  Friendrequest.find({requester: req.query.userId}).then((requests) => res.send(requests));
});

router.get("/user", (req, res) => {
  User.findOne({_id: req.query.userId}).catch((err) => {
    console.log(`Failed to fetch friend requests: ${err}`);
  }).then((request) => res.send(request));
});


router.get("/streak", (req, res) => {
  User.findById(req.query.userId).then((user) => {
    res.send(user);
  });
});

router.post("/workoutrequest", auth.ensureLoggedIn, (req, res) => {
  const currentTime = new Date();
  let dayOffset = currentTime.getDate();
  let monthOffset = currentTime.getMonth() + 1;
  let yearOffset = currentTime.getFullYear();
  if(currentTime.getHours() > req.body.hour){
    dayOffset += 1;
  } else if(currentTime.getHours() === req.body.hour && currentTime.getMinutes() > req.body.minute){
    dayOffset += 1;
  }
  if(dayOffset > DAYS_IN_MONTH[monthOffset-1]) {
    monthOffset += 1;
    dayOffset = 1;
  }
  if(monthOffset > 12){
    yearOffset += 1;
    monthOffset = 1;
  }

  const time = `${yearOffset}-${monthOffset}-${dayOffset}T${req.body.hour}:${req.body.minute}:00`
  const newRequest = new Workoutrequest({
    userId: req.body.userId,
    requester : req.body.requester,
    time: time,
    routine: req.body.routine,
    notes: req.body.notes,
  });

  newRequest.save().then((request) => res.send(request));
});

router.get("/workoutrequests", (req, res) => {
  Workoutrequest.find({userId: req.query.userId}).then((requests) => {
    const requestsToSend = []
    const today = new Date();
    for(const request of requests){
      requestTime = new Date(request.time);
      if(requestTime.getTime() < today.getTime()){
        Workoutrequest.deleteOne({time: request.time})
      } else {
        requestsToSend.push(request)
      }
    }
    res.send(requestsToSend);
  });
});

router.get("/outgoingworkoutrequests", (req, res) => {
  Workoutrequest.find({requester: req.query.userId}).then((requests) => {
    const requestsToSend = []
    const today = new Date();
    for(const request of requests){
      requestTime = new Date(request.time);
      if(requestTime.getTime() < today.getTime()){
        Workoutrequest.deleteOne({time: request.time})
      } else {
        requestsToSend.push(request)
      }
    }
    res.send(requestsToSend);
  });
});

router.post("/removeworkoutrequest", auth.ensureLoggedIn, (req, res) => {
  Workoutrequest.deleteOne({
    userId: req.body.userId,
    requester: req.body.requester,
    time: req.body.time,
    routine: req.body.routine,
    notes: req.body.notes,
  }).then((response) => res.send(response));
});

router.post("/plannedworkout", auth.ensureLoggedIn, (req, res) => {
  const newRequest = new Plannedworkout({
    userId: req.body.userId,
    workoutBuddy : req.body.buddy,
    time: req.body.time,
    routine: req.body.routine,
    notes: req.body.notes,
  });

  newRequest.save().then((request) => res.send(request));
});

router.get("/plannedworkout", (req, res) => {
  Plannedworkout.find({userId: req.query.userId}).then((workouts) => {
    const workoutsToSend = []
    const today = new Date();
    for(const workout of workouts){
      workoutTime = new Date(workout.time);
      if(workoutTime.getTime() < today.getTime()){
        Plannedworkout.deleteOne({time: workout.time})
      } else {
        workoutsToSend.push(workout)
      }
    }
    res.send(workoutsToSend);
  });
});


router.post("/routine", auth.ensureLoggedIn, (req, res) => {
  console.log(req.body);
  const posted = req.body;
  Routine.findOne({ userId: req.body.userId}).then((routine) =>{
    if (routine === null) {
      const newRoutine = new Routine(posted);
      newRoutine.save().then((routine) => res.send(routine));
    } else {
      Routine.findOneAndUpdate({ userId: req.body.userId}, posted,{new:true, }).then((routine) => {
          routine.save().then((setting) => res.send(setting));
        })
    };
  })
});

router.get("/routine", (req, res) => {
  Routine.findOne({ userId: req.query.userId}).then((routine) => {
    if (routine === null) {routine = false}
    res.send(routine);});
  });

router.get("/userWithUsername", (req, res) => {
  Setting.findOne({username: req.query.username}).then((setting) => {
    if(setting === null || setting.userId === req.query.userId) res.send(false);
    else res.send(true);
  })
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
