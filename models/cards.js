const mongoose = require("mongoose");

const CardsSchema = new mongoose.Schema({
	title: {
		type: String
	},
	subtitle: {
		type: String
	},
	description: {
		type: String
	},
	link: {
		type: String
	},
	image: {
		type: String
	}
});

module.exports = Cards = mongoose.model("cards", CardsSchema);
