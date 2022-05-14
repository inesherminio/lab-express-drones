const express = require('express');
const router = express.Router();

// require the Drone model here
const Drone = require('../models/Drone.model');

router.get('/', (req, res, next) => {
  // Iteration #2: List the drones
  try {
    const drones = Drone.find();
    res.render('drones/list', { drones });
  } catch (error) {
    next(error);
  }
});

router.get('/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render('drones/create-form');
  
});

router.post('/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  try {
    const { name, propellers, maxSpeed}=req.body;
     Drone.create({
      name, 
      propellers, 
      maxSpeed
    })
    res.redirect('/drones');
  } catch (error) {
    
  }
});

router.get('/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  try {
    const { id } = req.params;
    const drone = Drone.findById(id);
    res.render('drones/update-form', drone);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  try {
    const { id } = req.params;
    const { name, propellers, maxSpeed } = req.body;
    Drone.findByIdAndUpdate(id,
      { name, propellers, maxSpeed },
      {
        new: true
      });
    
      res.redirect('/drones');
  } catch (error) {
    next(error);
  }
});

router.post('/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  try {
    const { id } = req.params;
    Book.findByIdAndDelete(id);

    res.redirect('/drones');
  } catch (error) {
    next(error);
  }
});


module.exports = router;
