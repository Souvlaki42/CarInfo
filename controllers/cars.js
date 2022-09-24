const Cars = require("../models/Car");
const { Translator } = require("../config/api");

function getNew(req, res) {
	res.render("new");
}

async function postNew(req, res) {
	const { engine_number, frame, license_plate, date, price } = req.body;
	let errors = [];

	if (!engine_number || !frame || !license_plate || !date) {
		errors.push({ msg: Translator.translate("Please fill in all fields") });
	}

	if (errors.length > 0) {
		res.render("new", { errors, engine_number, frame, license_plate, date, price });
	} else {
		let car = new Cars({
			engineNumber: engine_number,
			frame: frame,
			licensePlate: license_plate,
			date: date,
			price: price || "",
			creator: req.user.email
		});

		car = await car.save();
		res.redirect("/");
	}
}

async function deleteCar(req, res, next) {
	const car = await Cars.findOne({ bid: req.params.bid });
	if (car == null) return res.sendStatus(404);

	Cars.deleteOne({ bid: req.params.bid }, function (err) {
		if (err) { return next(err); }
		res.redirect("/");
	});
}

module.exports = { getNew, postNew, deleteCar };