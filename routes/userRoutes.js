import express from 'express';
import { addBook, listBooks,deleteBook,editBook,getBook } from '../controller/bookController.js';

const userRoute=express.Router();

userRoute.post('/addBook',addBook)
userRoute.get('/books',listBooks)
userRoute.delete('/deleteBook/:id',deleteBook)
userRoute.get('/editBook/:id',getBook)
userRoute.post('/editBook/:id',editBook)

export default userRoute;