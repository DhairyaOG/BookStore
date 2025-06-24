import express from 'express';
import mongoose from 'mongoose';
import { book } from '../models/bookmodel.js';

const router = express.Router();

// Create book
router.post('/', async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;
    if (!title || !author || !publishYear) {
      return res.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      });
    }
    const newBook = new book({ title, author, publishYear });
    await newBook.save();
    res.status(201).send(newBook);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: error.message });
  }
});

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await book.find({});
    res.status(200).json({ count: books.length, data: books });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Get book by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid book ID format' });
  }

  try {
    const singleBook = await book.findById(id);
    if (!singleBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(singleBook);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Update book
router.put('/:id', async (req, res) => {
  const { title, author, publishYear } = req.body;
  const { id } = req.params;

  if (!title || !author || !publishYear) {
    return res.status(400).send({
      message: 'Send all required fields: title, author, publishYear',
    });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid book ID format' });
  }

  try {
    const result = await book.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!result) {
      return res.status(404).send({ message: 'Book not found' });
    }
    res.status(200).send({ message: 'Book updated successfully', data: result });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Delete book
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid book ID format' });
  }

  try {
    const result = await book.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: 'Book Not Found' });
    }
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

export default router;
