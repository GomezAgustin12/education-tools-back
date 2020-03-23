const express = require("express");
const router = express.Router();
const Cards = require("./../models/cards");
const multer = require("multer");

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, "./public/image");
	},
	filename: function(req, file, cb) {
		cb(null, file.originalname);
	}
});

const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
	try {
		const cards = await Cards.find();
		res.status(200).json(cards);
	} catch (error) {
		res.status(200).json({ data: error.message });
	}
});

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
		res.status(500).json({ data: error.message });
	}
});

module.exports = router;
