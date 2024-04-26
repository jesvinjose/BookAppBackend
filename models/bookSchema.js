import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date, 
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, { timestamps: true }); 

export const Book = mongoose.model('Book', bookSchema);
