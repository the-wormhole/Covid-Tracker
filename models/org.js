const mongoose = require('mongoose');

const orgSchema = new mongoose.Schema({

    Name:{
        type:String,
        required:true
    },
    Address:{
        type:String,
        required:true
    },
    Email:{
        type: String,
        required:true
    },
    Contact:{
        type:Number,
        required:true
    }
},{timestamps: true});

const Org = mongoose.model('Org',orgSchema);
module.exports = Org;