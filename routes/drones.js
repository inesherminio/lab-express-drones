const express = require('express');
const router = express.Router();

// require the Drone model here
const Drone = require('../models/Drone.model');

/* General to all routes: mongoose methods (find, create, etc) return promises. Thus, we must either use them with then/catch or async/await.
You are not using any of those, that's why nothing was showing up. */

router.get('/', async (req, res, next) => {
  // Iteration #2: List the drones
  try {
    const drones = await Drone.find();
    res.render('drones/list', { drones });
  } catch (error) {
    /* Great job with using the next() method to trigger error handling! */
    next(error);
  }
});

router.get('/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render('drones/create-form');
  
});

router.post('/create', async (req, res, next) => {
  // Iteration #3: Add a new drone
  try {
    const { name, propellers, maxSpeed}=req.body;
    await Drone.create({
      name, 
      propellers, 
      maxSpeed
    })
    res.redirect('/drones');
  } catch (error) {
    next(error);
  }
});

router.get('/:id/edit', async (req, res, next) => {
  // Iteration #4: Update the drone
  try {
    const { id } = req.params;
    const drone = await Drone.findById(id);
    console.log(drone)
    res.render('drones/update-form', drone);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/edit', async (req, res, next) => {
  // Iteration #4: Update the drone
  try {
    const { id } = req.params;
    const { name, propellers, maxSpeed } = req.body;
    await Drone.findByIdAndUpdate(id,
      { name, propellers, maxSpeed },
      {
        new: true
      });
    
      res.redirect('/drones');
  } catch (error) {
    next(error);
  }
});

router.post('/:id/delete',async  (req, res, next) => {
  // Iteration #5: Delete the drone
  try {
    const { id } = req.params;
    await Drone.findByIdAndDelete(id);

    res.redirect('/drones');
  } catch (error) {
    next(error);
  }
});


module.exports = router;