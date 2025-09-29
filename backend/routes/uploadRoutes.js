import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // temp storage

// Upload image
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path); // upload to cloudinary
    fs.unlinkSync(req.file.path); // delete temp file
    res.json({ url: result.secure_url }); // return Cloudinary URL
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
