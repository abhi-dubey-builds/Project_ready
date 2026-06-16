'use strict';
require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const Joi = require('joi');

const app = express();
const PORT = process.env.PORT || 3000;

// Security: Disable x-powered-by
app.disable('x-powered-by');

// Security: Helmet for security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net", "https://cdn.tailwindcss.com"],
      scriptSrcAttr: ["'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdn.tailwindcss.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      connectSrc: ["'self'"],
      imgSrc: ["'self'", "data:"],
    },
  },
}));

// Security: CORS
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  methods: 'GET,POST,PATCH,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true,
};
app.use(cors(corsOptions));

// Security: Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});
app.use('/api/', apiLimiter);

// MongoDB Connection
const MONGODB_URI = process.env.MONGO_URI;
if (!MONGODB_URI) {
    console.error('FATAL: MONGO_URI is not defined in .env file');
    process.exit(1);
}

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Mongoose Model
const Task = require('./models/Task');

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

// Validation Schemas
const taskSchema = Joi.object({
    title: Joi.string().trim().min(3).max(100).required(),
    description: Joi.string().trim().max(500).optional(),
    status: Joi.string().valid('To-Do', 'In-Progress', 'Done').default('To-Do'),
});

const statusUpdateSchema = Joi.object({
    status: Joi.string().valid('To-Do', 'In-Progress', 'Done').required(),
});

// GET all tasks
app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An internal server error occurred.' });
    }
});

// POST a new task
app.post('/api/tasks', async (req, res) => {
    try {
        const { error, value } = taskSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: 'Validation failed.', details: error.details });
        }
        const newTask = new Task(value);
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An internal server error occurred.' });
    }
});

// PATCH to update task status
app.patch('/api/tasks/:id', async (req, res) => {
    try {
        const { error } = statusUpdateSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: 'Invalid status value.', details: error.details });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { returnDocument: 'after' }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found.' });
        }

        res.json(updatedTask);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An internal server error occurred.' });
    }
});

// Global unhandled rejection handler
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    process.exit(1);
});

app.listen(PORT, () => {
  console.log(`Server is running securely on port ${PORT}`);
});