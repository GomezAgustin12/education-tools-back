const express = require("express");
const router = express.Router();
const Cards = require("./../models/cards");

router.get("/", async (req, res) => {
	try {
		const cards = await Cards.find({});
		res.status(200).json(cards);
	} catch (error) {
		res.status(200).json({ data: error.message });
	}
});

router.post("/", async (req, res) => {
	try {
		Cards.create(req.body);
		await res.status(200).json({ data: "Card Cargada", error: false });
	} catch (error) {
		res.status(500).json({ data: error.message });
	}
});

module.exports = router;
