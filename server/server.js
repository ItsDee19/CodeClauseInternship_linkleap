const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = 3001;

// Connect to your MongoDB database
mongoose.connect('YOUR_MONGODB_CONNECTION_STRING_HERE', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define file schema
const fileSchema = new mongoose.Schema({
  filename: String,
  password: String,
  expiryDate: Date,
  sharedLink: String
});

const File = mongoose.model('File', fileSchema);

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// File upload endpoint
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { filename, password, expiryDate } = req.body;
    const file = new File({
      filename,
      password,
      expiryDate: new Date(expiryDate),
      sharedLink: generateSharedLink()
    });
    await file.save();

    console.log('File uploaded successfully:', file);
    res.status(200).json({ link: file.sharedLink });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Error uploading file' });
  }
});

// Function to generate a unique shared link
function generateSharedLink() {
  const randomString = Math.random().toString(36).substring(2, 8); // Generate a random string
  return `/shared/${randomString}`; // Append random string to base URL
}

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
