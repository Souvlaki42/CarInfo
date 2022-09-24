const Cars = require("../models/Car");

async function getIndex(req, res)  {
	const cars = await Cars.find().sort({ createdAt: "desc" });
	res.render("index", { cars: cars });
}

async function postIndex(req, res) {
	let search = req.body.query;
	let select = req.body.selector;
	let errors = [];

	if (!search) {
		errors.push({ msg: Translator.translate("Please fill the searchbox") });
	}

	if (select == 0) {
		errors.push({ msg: Translator.translate("Please select a type to search") });
	}

	if (errors.length > 0) {
		cars = await Cars.find().sort({ createdAt: "desc" });
		res.render("index", { cars: cars, search: req.body.query, errors: errors });
	} else {
		if (select == "1") {
			cars = await (await Cars.find().sort({ createdAt: "desc" })).filter(car => car.engineNumber.includes(search));
		}
		if (select == "2") {
			cars = await (await Cars.find().sort({ createdAt: "desc" })).filter(car => car.frame.includes(search));
		}
		if (select == "3") {
			cars = await (await Cars.find().sort({ createdAt: "desc" })).filter(car => car.licensePlate.includes(search));
		}
		if (select == "4") {
			cars = await (await Cars.find().sort({ createdAt: "desc" })).filter(car => car.date.includes(search));
		}

		res.render("index", { cars: cars, search: req.body.query });
	}
}

module.exports = { getIndex, postIndex };