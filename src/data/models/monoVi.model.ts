import mongoose from "mongoose";

const caseSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    age: { 
        type: Number,
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    },
    country:{
        type:String,
        required: true
    },
    city:{
        type:String,
        required: true
    },
    isEmailSent: {
        type: Boolean,
        default: false
    },
    creationDate: {
        type: Date,
        default: Date.now, 
    },
});

export const MonoViModel = mongoose.model("Mono", caseSchema)