// Express stuffs
const express = require('express');
const app = express();
// port
const port = process.env.PORT || 4000;

const bodyParser = require('body-parser');

const path = require('path');
module.exports = {
	config: path.resolve('./db/config', 'config.json'),
	'models-path': path.resolve('./db/models'),
	'seeders-path': path.resolve('./db/seeders'),
	'migrations-path': path.resolve('./db/migrations'),
};

const models = require('./db/models');

var events = [
	{
		title: 'I am your first event',
		desc: 'A great event that is super fun to look at and good',
		imgUrl:
			'https://static.wikia.nocookie.net/969103c3-ca97-4a57-a7f1-cf3a8ddae86a/scale-to-width/755',
	},
	{
		title: 'I am your second event',
		desc: 'A great event that is super fun to look at and good',
		imgUrl:
			'https://static.wikia.nocookie.net/969103c3-ca97-4a57-a7f1-cf3a8ddae86a/scale-to-width/755',
	},
	{
		title: 'I am your third event',
		desc: 'A great event that is super fun to look at and good',
		imgUrl:
			'https://static.wikia.nocookie.net/969103c3-ca97-4a57-a7f1-cf3a8ddae86a/scale-to-width/755',
	},
];

// Run on this port
app.listen(port, () => {
	console.log('App is listening on port 4000');
});

// Express Handlebar stuffs

const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const {
	allowInsecurePrototypeAccess,
} = require('@handlebars/allow-prototype-access');

// main is default component
app.engine(
	'handlebars',
	exphbs.engine({
		defaultLayout: 'main',
		handlebars: allowInsecurePrototypeAccess(Handlebars),
	})
);

app.set('view engine', 'handlebars');

// Landing Route
app.get('/', (req, res) => {
	models.Event.findAll({ order: [['createdAt', 'DESC']] }).then((events) => {
		res.render('events-index', { events: events });
	});
});

// Other routes

app.get('/events', (req, res) => {
	res.render('events-index', { events: events });
});

app.get('/events/new', (req, res) => {
	res.render('events-new', {});
});

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/events', (req, res) => {
	models.Event.create(req.body)
		.then((event) => {
			res.redirect(`/`);
		})
		.catch((err) => {
			console.log(err);
		});
});
