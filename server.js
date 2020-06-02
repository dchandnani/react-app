require('dotenv').config()
let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');
require('./server/database/db-conn');
//require('./server/database/db-conn-azure');

// ****Initialize app**********
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());

// Configure Routes
const studentRoute = require('./server/routes/student.route')
app.use('/students', studentRoute)


// Configure client app
app.use(express.static('./client/build/'));
// * is very important, as it enabled all the reactjs routes!
app.get('/*', (req, res) => {
    res.sendFile('index.html', {root: './client/build/'});
})

// PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// 404 Error
app.use((req, res, next) => {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});