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
const Routine = require("./models/routine.js")
const LastWorkout = require("./models/lastworkout.js")

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

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
  };
  LastWorkout.findOne({userId: req.body.userId}).then((workout) =>{
    if (workout === null) {
      User.findOneAndUpdate({_id: req.body.userId}, {streak:1}, {new:true, }).then(
        (user) => {user.save()});
      const newWorkout = new LastWorkout(posted);
      newWorkout.save().then((workout) => res.send(workout));
    } else {
      if (workout.day !== Math.floor(Date.now()/(1000*60*60*24))) {
        User.findOneAndUpdate({_id: req.body.userId}, {streak:2}, {new:true, }).then(
          (user) => {user.save()});
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
    const dateInString = `${currentDate.getMonth() + 1}-${currentDate.getDate()}-${currentDate.getYear()}`;
    weights.push([dateInString, req.body.weight]);
    const posted = {
      userId: req.body.userId,
      weightUnit: req.body.weightUnit,
      heightUnit: req.body.heightUnit,
      height: req.body.height,
      weight: req.body.weight,
      weightHistory: weights,
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
    res.send(routine);
  });
});

router.get("/streak", (req, res) => {
  User.findById(req.query.userId).then((user) => {
    res.send(user);
  });
});


// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
