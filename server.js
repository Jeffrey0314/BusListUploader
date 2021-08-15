const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cors());

//  Mongoose
mongoose.connect("mongodb+srv://JeffG:central0314@cluster0.hl1yo.mongodb.net/searchbox?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});

// data schema and model
const buslistSchema = {
    index: Number,
    status: String,
    name: String,
    location: String,
    landmark: String,
    businessType: String,
    openingDays: String,
    openingHours: String,
    landline: String,
    mobile: String,
    geolocationId: String,
    image: String
}

const Buslist = mongoose.model("Buslist", buslistSchema);

// API Routes
app.get('/buslist', (req, res) => {
    Buslist.find().then(buslist => res.json(buslist));
})

// add Buslist
app.post('/newbuslist', function(req, res) {
    const index = req.body.index;
    const status = req.body.status;
    const name = req.body.name;
    const location = req.body.location;
    const landmark = req.body.landmark;
    const businessType = req.body.businessType;
    const openingDays = req.body.openingDays;
    const openingHours = req.body.openingHours;
    const landline = req.body.landline;
    const mobile = req.body.mobile;
    const geolocationId = req.body.geolocationId;
    const image = req.body.image

    const newBuslist = new Buslist({
        index,
        status,
        name,
        location,
        landmark,
        businessType,
        openingDays,
        openingHours,
        landline,
        mobile,
        geolocationId,
        image
    });

    newBuslist.save();
})

app.delete('/delete/:id', function(req, res) {
    const id = req.params.id;
    Buslist.findByIdAndDelete({_id: id}, function(err){
        if(!err) {
            console.log("buslist deleted")
        } else {
            console.log(err);
        }
    })
})

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get("*", (req, res)=> {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

app.listen(port, function() {
    console.log("express is running");
})