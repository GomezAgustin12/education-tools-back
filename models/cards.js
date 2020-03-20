const mongoose = require("mongoose");

const CardsSchema = new mongoose.Schema({
	img: {
		type: String
	},
	title: {
		type: String
	},
	subtitle: {
		type: String
	},
	content: {
		type: String
	}
});

module.exports = Cards = mongoose.model("cards", CardsSchema);
