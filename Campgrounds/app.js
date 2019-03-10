var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/Campgrounds"),
   //seedDB      = require("./seeds"),
    Comment     =require("./models/comments"),
    passport  =require("passport"),
    User = require("./models/user"),
    flash = require('connect-flash'),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override");
    
    
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index");
    

//seedDB();
mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(flash());
app.set("view engine", "ejs");

app.use(require("express-session")({
    secret: "big bazaar",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// SCHEMA SETUP


// Campground.create(
//      {
//          name: "Jaisalmer, Rajasthan", 
//          image: "https://ihplb.b-cdn.net/wp-content/uploads/2014/06/Camping-in-Jaisalmer.jpg",
//          description : "The natural setting of Jaisalmer makes it a perfect paradise for campers. Fondly known as the ‘Golden City of India’, Jaisalmer is indeed a trekker’s paradise. The famous Sam Sand Dunes offer some of the amazing camping sites in India. The son touched gleaming sands create a silhouette against the sand dunes. However, if you want to indulge yourself, The Serai will provide you a wonderful experience. It houses 21 large canvas tents built on a base of Jaisalmer stone, set away from it all on 30 acres of desert scrub"
         
//      },
//      function(err, campground){
//       if(err){
//           console.log(err);
//       } else {
//           console.log("NEWLY CREATED CAMPGROUND: ");
//           console.log(campground);
//       }
//     });
// app.get("/campgrounds/:id/comments/new",isLoggedIn, function(req, res){
//     // find campground by id
//     Campground.findById(req.params.id, function(err, campground){
//         if(err){
//             console.log(err);
//         } else {
//              res.render("comments/new", {campground: campground,currentUser:req.user});
//         }
//     });
// });
    
//     function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
// }


//INDEX - show all campgrounds



//  ===========
// AUTH ROUTES
//  ===========

// show register form
app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp Server Has Started!");
});