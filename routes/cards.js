const express = require("express");
const router = express.Router();
const Cards = require("./../models/cards");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

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
		// console.log(req.body);
		console.log(req.file);

		// Cards.create(req.body);
		res.status(200).json({ data: "Card Cargada", error: false });
	} catch (error) {
		res.status(500).json({ data: error.message });
	}
});

module.exports = router;
