const fs = require("fs");

try {
	fs.unlinkSync("routes/drive.png");
} catch (error) {
	console.log(error.message);
}
