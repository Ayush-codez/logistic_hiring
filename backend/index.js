const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const conn = mongoose.connection;

conn.once('open', () => {
  console.log('MongoDB connected');

  // Init GridFS stream
  const gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
  app.set('gfs', gfs); // Make it available in controllers if needed

  // GridFS Storage Engine
  const storage = new GridFsStorage({
    url: process.env.MONGODB_URI,
    file: (req, file) => {
      return {
        filename: `${Date.now()}-${file.originalname}`,
        bucketName: 'uploads',
      };
    },
  });

  const upload = multer({ storage });

  // Load Routes after GridFS ready
  const formRoutes = require('./routes/formroutes')(upload);
  app.use('/api', formRoutes);

  // Start Server after all is ready
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
