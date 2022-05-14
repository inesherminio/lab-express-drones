const express = require("express");
const router = express.Router();

// require the Drone model here
const Drone = require("../models/Drone.model");

router.get("/", (req, res, next) => {
  // Iteration #2: List the drones
  Drone.find()
    .then((droneInfos) => {
      console.log(droneInfos);
      res.render("drones/list", { droneInfos });
    })
    .catch((error) => {
      /* On error catching, and since we're using the Ironlauncher generator, and it is prepared to deal with errors,
      instead of console logging the error, you could do next(error), which means that, everytime an error occurs it
      will keep searching for a predefined way of dealing with it: in this case, line 33 of app.js defines it */
      console.log(error);
      next(error);
    });
});

router.get("/create", (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render("drones/create-form");
});

router.post("/create", (req, res, next) => {
  // Iteration #3: Add a new drone
  const { name, propellers, maxSpeed } = req.body;
  Drone.create(req.body)
    .then((createDroneInfos) => {
      console.log(createDroneInfos);
      res.redirect("/drones");
    })
    .catch((error) => {
      console.log("Something went wrong");
      next(error);
    });
});

router.get("/:id/edit", (req, res, next) => {
  // Iteration #4: Update the drone
  const { id } = req.params;
  Drone.findById(id)
    .then((droneData) => {
      console.log(droneData);
      res.render("drones/update-form", { droneData });
    })
    .catch((error) => {
      console.log("Error: ", error);
      next(error);
    });
});

router.post("/:id/edit", (req, res, next) => {
  // Iteration #4: Update the drone
  const { id } = req.params;
  const { name, propellers, maxSpeed } = req.body;
  Drone.findByIdAndUpdate(id, req.body, { new: true })
    .then((droneData) => {
      console.log(droneData);
      res.redirect("/drones");
    })
    .catch((error) => {
      console.log("Error: ", error);
      next(error);
    });
});

router.post("/:id/delete", (req, res, next) => {
  // Iteration #5: Delete the drone
  const { id } = req.params;
  Drone.findByIdAndDelete(id)
    .then(() => {
      console.log("Successfully deleted drone");
      res.redirect("/drones");
    })
    .catch((error) => {
      console.log("Can't delete drone");
      next(error);
    });
});

module.exports = router;

/* Very good job defining your routes. The code is clean and logic */