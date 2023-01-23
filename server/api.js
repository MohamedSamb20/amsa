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
const Friendship = require("./models/friendship")

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
  const newWorkout = new Workout({
    user: req.user._id,
    username: req.user.name,
    exercise: req.body.exercise,
  });

  newWorkout.save().then((workout) => res.send(workout));
});

router.post("/exercise", auth.ensureLoggedIn, (req, res) => {
  console.log(req.body);
  //get userid from props, pass in to body, wrap func below with then (User.find(id).then(exercise stuff))
  const newExercise = new Exercise({
    userId: req.body.userId,

    exercise: req.body.exercise,
    sets: req.body.sets,
    reps: req.body.reps,
  });

  newExercise.save().then((exercise) => res.send(exercise));
});

router.get("/settings", (req, res) => {
  Setting.findOne({ userId: req.query.userId}).then((setting) => {
    res.send(setting);
  });
});

router.post("/settings", auth.ensureLoggedIn, (req, res) => {
  console.log(req.body);

  const newSettings = new Setting({
    userId: req.body.userId,
    weightUnit: req.body.weightUnit,
    heightUnit: req.body.heightUnit,
    height: req.body.height,
    weight: req.body.weight,
  });

  newSettings.save().then((settings) => res.send(settings));
});
router.get("/friends", (req, res) => {
  Friendship.find({ userId: req.query.userId }).then((friendships) => {
    res.send(friendships);
  });
});

router.post("/friends", auth.ensureLoggedIn, (req, res) => {
  console.log(req.body);

  const newFriendship = new Friendship({
    userId: req.body.userId,
    friendId: req.friendId,
  });

  newFriendship.save().then((friendship) => res.send(friendship));
});



// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
