const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/GEP")
    .then( 
        ()=>{console.log('Connected to MongoDB Atlas');}
    )
    .catch( (err) => console.error('Could not connect to MongoDB Atlas', err));




module.exports = mongoose;