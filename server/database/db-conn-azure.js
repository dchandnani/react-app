const mongoose = require('mongoose');

/*
const { DB_CONN, DB_USER, DB_PW } = process.env;

// Connecting mongoDB Database
mongoose.connect(DB_CONN, {
    auth: {
        user: DB_USER,
        password: DB_PW
    },
    useNewUrlParser: true
}).then(() => {
  console.log('Database sucessfully connected!')
},
  error => {
    console.log('Could not connect to database : ' + error)
  }
)

*/

mongoose.connect(process.env.DB_CONN , { 
    useNewUrlParser: true 
})
.then(() => console.log('connection successful'))
.catch((err) => console.error("Ahhhgh! "+ err));
 