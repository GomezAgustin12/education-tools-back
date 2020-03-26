const express = require("express");
const router = express.Router();
const Cards = require("./../models/cards");
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, "./uploads/");
	},
	filename: function(req, file, cb) {
		cb(null, file.originalname);
	}
});

const upload = multer({ storage: storage });

//-------------------------------------------------------------------------------------------------------
router.get("/", async (req, res) => {
	try {
		const cards = await Cards.find();
		res.status(200).json({ cards, error: false });
	} catch (error) {
		res.status(200).json({ data: error.message, error: true });
	}
});

//-------------------------------------------------------------------------------------------------------
router.post("/", upload.single("image"), async (req, res) => {
	try {
		const { title, subtitle, description, link, orientacion } = req.body;
		Cards.create({
			title: title,
			subtitle: subtitle,
			description: description,
			link: link,
			orientacion: orientacion,
			image: req.file.filename
		});
		res.status(200).json({ data: "Card Cargada", error: false });
	} catch (error) {
		res.status(500).json({ data: error.message, error: true });
	}
});

//-----------------------------------------------------------------------------------------------------------
router.patch("/", async (req, res) => {
	try {
		const { _id } = req.body;
		await Cards.findByIdAndUpdate(_id, req.body);
		await res.status(200).js({ error: false });
	} catch (error) {
		res.status(500).json({ data: error.message, error: true });
	}
});

//-------------------------------------------------------------------------------------------------------------
router.delete("/", async (req, res) => {
	try {
		const { _id = "", image } = req.body;
		// await Cards.deleteOne({ _id });
		await fs.unlinkSync(`/uploads/${image}`);
		res.status(500).json({ error: false });
	} catch (error) {
		res.status(500).json({ data: error.message, error: true });
	}
});

module.exports = router;
