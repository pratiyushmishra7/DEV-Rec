var mongoose = require("mongoose"),
    Campground=require("./models/Campgrounds");
    
function seedDB(){
    Campground.remove({},function(err){
    if(err){
        console.log(err);
    }
    console.log("removed Campground");
    });
}





module.exports=seedDB;

