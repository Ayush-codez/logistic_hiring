<<<<<<< HEAD
// todo
=======
// controllers/formController.js
const Submission = require('../models/submissions');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');


const handleFormSubmission = async (req, res) => {
  try {
    const {
      type,
      name,
      email,
      phone,
      description,
      skills,
      experience,
      companySize,
      website,
    } = req.body;

    const fileId = req.file?.id || null;

    const newSubmission = new Submission({
      type,
      name,
      email,
      phone,
      description,
      file: fileId, // Store GridFS file ID
      skills: skills ? skills.split(',') : undefined,
      experience,
      companySize,
      website,
    });

    await newSubmission.save();

    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while submitting form' });
  }
  console.log('REQ FILE:', req.file);
  console.log('REQ BODY:', req.body);
};
// let gfs;
// mongoose.connection.once('open', () => {
//   gfs = Grid(mongoose.connection.db, mongoose.mongo);
//   gfs.collection('uploads');
// });





const downloadFileById = async (req, res) => {
  try {
    const gfs = req.app.get('gfs'); // ✅ Get from app
    const fileId = new mongoose.Types.ObjectId(req.params.id);

    gfs.files.findOne({ _id: fileId }, (err, file) => {
      if (!file || file.length === 0) {
        return res.status(404).json({ error: 'No file found' });
      }

      const readstream = gfs.createReadStream({ _id: file._id });
      res.set('Content-Type', file.contentType);
      return readstream.pipe(res);
    });
  } catch (error) {
    console.error('Error downloading file:', error);
    res.status(500).json({ error: 'Error fetching file' });
  }
};

const getAllSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find().sort({ submittedAt: -1 });

    const fullSubmissions = submissions.map((sub) => {
      return {
        ...sub.toObject(),
        fileDownloadUrl: sub.file
          ? `${req.protocol}://${req.get('host')}/api/file/${sub.file}`
          : null,
      };
    });

    res.json(fullSubmissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ error: 'Unable to fetch submissions' });
  }
};





module.exports = { handleFormSubmission,
    downloadFileById,
    getAllSubmissions
 };
>>>>>>> efe69e524b89ca71dce39423d443610d8d9fa27c
