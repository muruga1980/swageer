import express from "express";

const postFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.json({ message: "not file upload" });

      const Imagefile = Image({
        fileName: req.file.fileName,
        filePath: req.file.filePath,
      });
    }

    const savedFile = await Imagefile.save();
    res.status(200).json({ message: "file Upload successfull" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { postFile };
