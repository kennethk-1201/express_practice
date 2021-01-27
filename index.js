const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./Members')

const app = express();

// Init Middleware
app.use(logger);

// Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars')

// Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded({extended : false}))

// Homepage Route
app.get('/', (req, res) => res.render('index', {
    title: 'Member App',
    members
}))

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Members api routes
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000

// Start app
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))