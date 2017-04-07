const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

const port = process.env.PORT || 3000;
//middleware
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((request, response, next) => {
	var now = new Date().toString();
	var log = `${now}: ${request.method} ${request.originalUrl}`;
	console.log(log);

	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to append to server.log');
		}
	})
	next();
});
// app.use((request, response, next) => {
// 	response.render('maintenance.hbs')
// });
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
})

app.get('/', (request, response) => {
	response.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome to our page!'
		});
});
app.get('/about', (request, response) => {
	response.render('about.hbs', {
		pageTitle: 'About Page',
		welcomeMessage: 'About us!'
	});
})
app.get('/projects', (request, response) => {
	response.render('projects.hbs', {
		pageTitle: 'projects Page',
		welcomeMessage: 'Portfolio Page'
	});
})
app.get('/bad', (request, response) => {
	response.send({
		errMsg: 'Unable to Handle Request'
	})
})

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});
