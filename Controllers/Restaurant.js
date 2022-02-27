const Restaurants = require('../Models/Restaurants');

exports.filterRestaurants = (req, res) => {
    let { mealtype, cuisine, location, lcost, hcost, page, sort } = req.body;
    
    page = page ? page : 1; 
    sort = sort ? sort : 1; 

    let filterPayload = {};
    const itemsPerPage = 2;

    let startIndex = itemsPerPage * page - itemsPerPage; 
    let endIndex = itemsPerPage * page; 

    if (mealtype) {
        filterPayload["type.mealtype"] = mealtype; 
    }
    if (mealtype && cuisine) {
        filterPayload["type.mealtype"] = mealtype;
        filterPayload["Cuisine.cuisine"] = { $in : cuisine };
    }
    if (mealtype && hcost && lcost) {
        filterPayload["type.mealtype"] = mealtype;
        filterPayload["cost"] = { $lte: hcost, $gte: lcost };
    }
    if (mealtype && cuisine && lcost && hcost) {
        filterPayload["type.mealtype"] = mealtype;
        filterPayload["cost"] = { $lte: hcost, $gte: lcost };
        filterPayload["Cuisine.cuisine"] = { $in : cuisine };
    }
    if (mealtype && location) {
        filterPayload["type.mealtype"] = mealtype;
        filterPayload["locality"] = location;
    }
    if (mealtype && location && cuisine) {
        filterPayload["type.mealtype"] = mealtype;
        filterPayload["locality"] = location;
        filterPayload["Cuisine.cuisine"] = { $in : cuisine };
    }
    if (mealtype && location && lcost && hcost) {
        filterPayload["type.mealtype"] = mealtype;
        filterPayload["locality"] = location;
        filterPayload["cost"] = { $lte: hcost, $gte: lcost };
    }
    if (mealtype && location && cuisine && lcost && hcost) {
        filterPayload["type.mealtype"] = mealtype;
        filterPayload["locality"] = location;
        filterPayload["Cuisine.cuisine"] = { $in : cuisine };
        filterPayload["cost"] = { $lte: hcost, $gte: lcost };
    }
    console.log(filterPayload);
    Restaurants.find(filterPayload).sort({ cost: sort })
        .then(response => {
            // Pagination Logic 
            const filteredResponse = response.slice(startIndex, endIndex);
            res.status(200).json({ message: "Restaurants Fetched Succesfully", restaurants: filteredResponse })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}