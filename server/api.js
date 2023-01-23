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
router.post("/workout", auth.ensureLoggedIn, (req, res) => {
  User.findById(req.body.userId).then((user)=> {const newWorkout = new Workout({
    username: user,
    workoutType: req.body.workoutType,
    
  });

  newWorkout.save().then((workout) => res.send(workout));});

});

router.post("/exercise",auth.ensureLoggedIn, (req, res) => {
  console.log(req.body);
  const username = User.findById(req.body.userId)
  console.log(username);
  
  //get userid from props, pass in to body, wrap func below with then (User.find(id).then(exercise stuff))
  
    const newExercise = new Exercise({
      userId: req.body.userId,
      
      exercise: req.body.exercise,
      sets: req.body.sets,
      reps: req.body.reps,
      weightUsed: req.body.weightUsed,
    });
    const newWorkout = new Workout({
      username: username,
      exercises: exercises.push(req.body._id),


    });

    newExercise.save().then((exercise) => res.send(exercise)); 
    newWorkout.save().then((workout) => res.send(workout)); 

});



// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});


module.exports = router;
