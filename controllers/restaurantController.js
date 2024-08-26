const Restaurant = require('../models/Restaurants');

//create Restaurant
exports.createRestaurants = async (req,res) =>{
   try {
    const restaurant = new Restaurant(req.body);
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}


//Lists Restaurants
exports.getAllRestaurants = async (req, res) => {                         
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//Retrieve Restaurant Details
exports.getRestaurant= async (req, res) => {                                 
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Edit Restaurant
exports.updateRestaurant= async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
    res.json(restaurant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Delete Restaurants
exports.deleteRestaurant = async (req, res) => {                                            
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
    res.json({ message: 'Restaurant deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getNearbyRestaurants = async (req, res) => {
  try {
    const { latitude, longitude, radius } = req.body;

    // Parse input values
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    const rad = parseFloat(radius);

    // Log parsed values for debugging
    console.log('Parsed Latitude:', lat);
    console.log('Parsed Longitude:', lon);
    console.log('Parsed Radius:', rad);

    // Validate inputs
    if (isNaN(lat) || isNaN(lon) || isNaN(rad)) {
      return res.status(400).json({ message: 'Invalid latitude, longitude, or radius' });
    }

    // Find nearby restaurants
    const restaurants = await Restaurant.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lon, lat]
          },
          $maxDistance: rad
        }
      }
    });

    // Respond with restaurant data
    res.json(restaurants.map(restaurant => ({
      name: restaurant.name,
      description: restaurant.description,
      location: restaurant.location,
      averageRating: restaurant.ratings.length > 0 
      ? (restaurant.ratings.reduce((a, b) => a + b, 0) / restaurant.ratings.length).toFixed(2)
      : 0,    
      numberOfRatings: restaurant.ratings.length
    })));
  } catch (error) {
    console.error('Error fetching nearby restaurants:', error);
    res.status(500).json({ message: error.message });
  }
};


exports.getRestaurantsInRange = async (req, res) => {
  try {
    const { latitude, longitude, minimumDistance, maximumDistance } = req.body;  
    
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    const minDist = parseFloat(minimumDistance);
    const maxDist = parseFloat(maximumDistance);

    if (isNaN(lat) || isNaN(lon) || isNaN(minDist) || isNaN(maxDist)) {
      return res.status(400).json({ message: 'Invalid latitude, longitude, minimum distance, or maximum distance' });
    }

    const restaurants = await Restaurant.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lon, lat]
          },
          $minDistance: minDist,
          $maxDistance: maxDist
        }
      }
    });

    res.json(restaurants.map(restaurant => ({
      name: restaurant.name,
      description: restaurant.description,
      location: restaurant.location,
      averageRating: restaurant.ratings.length > 0 
      ? (restaurant.ratings.reduce((a, b) => a + b, 0) / restaurant.ratings.length).toFixed(2)
      : 0.0,    
      numberOfRatings: restaurant.ratings.length
    })));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
