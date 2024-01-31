const express=require("express");
const router  = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const{isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer'); //parse the multipart/form-data's data by using multer
const {storage}=require("../cloudconfig.js");
const upload = multer({ storage }); //store files in cloudinary storage 

app.get('/', (req, res) => {
    res.redirect('/listings');
});

//Router.route(path)
router.route("/")
.get(wrapAsync(listingController.index)) //Add New Listing 
.post(isLoggedIn,upload.single('listing[image]'),validateListing,wrapAsync(listingController.createListing)); //Added

router.get("/new",isLoggedIn,(listingController.renderNewForm)); //New Route

// //Icons Functionality
// const categories = [
//     { path: "/iconiccities", category: "iconicCity", iconClass: "fa-mountain-city" },
//     { path: "/castles", category: "castle", iconClass: "fa-fort-awesome" },
//     { path: "/pools", category: "pool", iconClass: "fa-person-swimming" },
//     { path: "/camping", category: "camping", iconClass: "fa-campground" },
//     { path: "/farms", category: "farms", iconClass: "fa-cow" },
//     { path: "/arctics", category: "arctic", iconClass: "fa-snowflake" },
//     { path: "/ships", category: "ship", iconClass: "fa-ship" },
//     { path: "/tropicals", category: "tropical", iconClass: "fa-tree" },
//     { path: "/houses", category: "house", iconClass: "fa-house" },
//     { path: "/golfing", category: "golf", iconClass: "fa-golf-ball-tee" },
//     { path: "/beachFront", category: "beachFront", iconClass: "fa-umbrella-beach" },
//     { path: "/ski-in-out", category: "ski-in-out", iconClass: "fa-person-skiing-nordic" }
// ];

// categories.forEach(({ path, category, iconClass }) => {
//     router.get(path, wrapAsync(async(req, res) => {
//         console.log(`${path} is Working`);
//         const allListings = await Listing.find({ category });
//         console.log(allListings);
//         res.render("listings/icon_filter.ejs", { allListings });
//     }));
// });

router.get("/iconiccities",wrapAsync(async(req,res)=>{
    console.log("/iconicCities is Working");
    const allListings = await Listing.find({category:"iconicCity" });
    console.log(allListings);
    res.render("listings/icon_filter.ejs",{allListings});
}));
router.get("/castles",wrapAsync(async(req,res)=>{
    console.log("/iconicCities is Working");
    const allListings = await Listing.find({category:"castle" });
    console.log(allListings);
    res.render("listings/icon_filter.ejs",{allListings});
}));
router.get("/pools",wrapAsync(async(req,res)=>{
    console.log("/iconicCities is Working");
    const allListings = await Listing.find({category:"pool" });
    console.log(allListings);
    res.render("listings/icon_filter.ejs",{allListings});
}));
router.get("/camping",wrapAsync(async(req,res)=>{
    console.log("/iconicCities is Working");
    const allListings = await Listing.find({category:"camping" });
    console.log(allListings);
    res.render("listings/icon_filter.ejs",{allListings});
}));
router.get("/farms",wrapAsync(async(req,res)=>{
    console.log("/iconicCities is Working");
    const allListings = await Listing.find({category:"farms" });
    console.log(allListings);
    res.render("listings/icon_filter.ejs",{allListings});
}));
router.get("/arctics",wrapAsync(async(req,res)=>{
    console.log("/iconicCities is Working");
    const allListings = await Listing.find({category:"arctic" });
    console.log(allListings);
    res.render("listings/icon_filter.ejs",{allListings});
}));
router.get("/ships",wrapAsync(async(req,res)=>{
    console.log("/iconicCities is Working");
    const allListings = await Listing.find({category:"ship" });
    console.log(allListings);
    res.render("listings/icon_filter.ejs",{allListings});
}));
router.get("/tropicals",wrapAsync(async(req,res)=>{
    console.log("/iconicCities is Working");
    const allListings = await Listing.find({category:"tropical" });
    console.log(allListings);
    res.render("listings/icon_filter.ejs",{allListings});
}));
router.get("/houses",wrapAsync(async(req,res)=>{
    console.log("/iconicCities is Working");
    const allListings = await Listing.find({category:"house" });
    console.log(allListings);
    res.render("listings/icon_filter.ejs",{allListings});
}));
router.get("/golfing",wrapAsync(async(req,res)=>{
    console.log("/iconicCities is Working");
    const allListings = await Listing.find({category:"golf" });
    console.log(allListings);
    res.render("listings/icon_filter.ejs",{allListings});
}));
router.get("/beachFront",wrapAsync(async(req,res)=>{
    console.log("/iconicCities is Working");
    const allListings = await Listing.find({category:"beachFront" });
    console.log(allListings);
    res.render("listings/icon_filter.ejs",{allListings});
}));
router.get("/ski-in-out",wrapAsync(async(req,res)=>{
    console.log("/iconicCities is Working");
    const allListings = await Listing.find({category:"ski-in-out" });
    console.log(allListings);
    res.render("listings/icon_filter.ejs",{allListings});
}));




router.route("/:id")
.get(wrapAsync(listingController.showListing)) //Show
.put(isLoggedIn,isOwner,upload.single('listing[image]'),validateListing,wrapAsync(listingController.updateListing)) //Update
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing)); //Delete

router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm)); //Edit Route

//Search
router.post("/search",wrapAsync( async (req, res) => {
    console.log("Search is working");
    let { search } = req.body;
    console.log("Searched element is:", search);

   // Case-insensitive search
    const allListings = await Listing.find({country: { $regex: new RegExp(search, "i") } });
    console.log(allListings);
    
    if (allListings.length) {
        console.log("Places are present");
        res.render("listings/filter.ejs", { allListings,search });
        } else {
        req.flash("error","Sorry, no destinations were found for this country.");
        res.redirect("/listings");
        }
    } 
));

module.exports = router;