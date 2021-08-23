# Install
- node https://nodejs.org/en/download/
- yarn https://classic.yarnpkg.com/en/docs/install/#windows-stable
- mongodb https://docs.mongodb.com/manual/installation/

# Create app
## Set up client
- Create react-app folder
- From react-app folder run: npx create-react-app client
- From cient folder run: yarn add "@material-ui/core" "@material-ui/icons" "contentful" "prop-types" "react-router-dom" "styled-components" axios react-fontawesome
- From client folder, run: yarn start
- Your client will now be running on http://localhost:3000 
- Delete contents of App.js and start editing it to start creating your app

## Set up server
- From react-app folder, run: yarn init -y 
- From react-app folder run: yarn add express body-parser dotenv cors axios nodemon cookie-parser
- Note: put nodemon in devDependencies in package.json after running the above command
- Create server.js
- Create index.html
- From react-app folder run: yarn run nodemon server
- Open http://localhost:4000 and verify index.html loads!
- Create a test API in server.js and try it out at http://localhost:4000/test
```js
// test API
app.get('/test', (req, res) => {
    res.json({test: 2});
}) 
```

## Set up database
- From react-app folder run: yarn add mongoose
- In react-app folder, create server folder
- In server folder create database folder and in it create db-conn.js
- In database folder create db folder. This will be where mongod will point to
- Start mondodb. To do so, from any folder, run: mongod --dbpath <path to /server/database/db>
- Create models and routes
- Folder structure:
  - client
  - server
    - database
      - db
      - db-conn.js
    - models
      - Person.js
      - ...
    - routes
      - person.route.js
      - ...
  - server.js
  - package.json

### In db-conn.js:
```js
const mongoose = require('mongoose');

const db = 'mongodb://localhost:27017/infoapp'

//console.log("*******Mongoose!")
// Connecting mongoDB Database
mongoose.Promise = global.Promise;
mongoose.connect(db, {
  useNewUrlParser: true
}).then(() => {
  console.log('Database sucessfully connected!')
},
  error => {
    console.log('Could not connect to database : ' + error)
  }
)
```

### In Person.js
```js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let personSchema = new Schema({
  fname: {
    type: String
  },
  age: {
    type: Number
  }
}, {
    collection: 'person'
  })

module.exports = mongoose.model('Person', personSchema)
```

### In person.route.js
```js
let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();

// Person Model
let personModel = require('../models/Person');

// CREATE Student
router.route('/create-person').post((req, res, next) => {
    personModel.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      //console.log(data)
      res.json(data)
    }
  })
});

// Delete Student
router.route('/delete-person/:id').delete((req, res, next) => {
    personModel.findByIdAndRemove(req.params.id, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          msg: data
        })
      }
    })
  })

// Delete Student
router.route('/delete-person').delete((req, res, next) => {
    console.log(req.query.name)
    personModel.findOneAndDelete({fname: req.query.name}, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          msg: data
        })
      }
    })
  })

// Get Students
router.route('/all').get((req, res, next) => {
    console.log(req.query.name)
    personModel.find({age: {$gte:2}}, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          msg: data
        })
      }
    })
  })

// Update Students
router.route('/update-person').put((req, res, next) => {
    console.log(req.body.fname)
    personModel.updateOne({fname: req.body.fname}, req.body, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          msg: data
        })
      }
    })
  })  


module.exports = router;
```

### In server.js include:
```js
require('./server/database/db-conn');

// Configure Routes
const personRoute = require('./server/routes/person.route')
app.use('/person', personRoute)
```
That's it! Your app is set up end to end!

# Check-in to GitHub
1. Create git repo on github (do it without Readme.md - you can add this later)
2. From react-app folder:
- run: git init
- Add .gitignore file to react-app folder
- run: git add --all
- run: git commit -m "Initial commit to set up app"
- run: git remote add origin https://github.com/dchandnani/<repo-name>.git
- run: git push -u origin master

Note: if you have created the repo on github with Readme.md file, then you will first need to pull it locally before commit, else remote push will fail. You can still resolve this, by running following command before push: git pull origin master --allow-unrelated-histories

# Getting ready to deploy  
## Set up server to return the react app
1. From client directory run: yarn run build

2. In server.js, make sure to return client bundle

```js
app.use(express.static('./client/build/'));
// * is very important, as it enabled all the reactjs routes!
app.get('/*', (req, res) => {
    res.sendFile('index.html', {root: './client/build/'});
})
```

3. In package.json of react-app (i.e. server), add the following:

```json
  "scripts": {
    "start": "cd client/test-material && yarn && yarn run build && cd ../.. && node server",
    "dev": "node server",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

## Connecting to Azure
- In react-app folder create .env file and fill following contents

```js
DB_CONN="mongodb://..."
DB_USER="..."
DB_PW="..."
```

- Update db-conn.js to following (or create new db-conn-azure.js and use that instead):

```js
mongoose.connect(process.env.DB_CONN , { 
    useNewUrlParser: true 
})
.then(() => console.log('connection successful'))
.catch((err) => console.error("Ahhhgh! "+ err));
 ```

# Examples
## Form examples

### Example 1 (Simple)
HTML:
```html
          <form onSubmit={this.handleSubmit}>
            <input name="fname"/>
            <button type="submit">Submit</button>
          </form>
```

JS:
```js
  handleSubmit = (e) => {
    e.preventDefault();
    alert(e.target.fname.value);
    e.target.fname.value = "";
  }
```

### Example 2 (With state)
HTML:
```html
          <form onSubmit={this.handleSubmit}>
            <input name="fname" value={this.state.fname} onChange={this.handleChange}></input>
            <button type="submit">Submit</button>
          </form>
```

JS:
```js
  constructor(props) {
    super(props)
    this.state = {
      fname: ""
    }
  }

  handleChange = (e) => {
    e.preventDefault();
    let {name, value} = e.target;
    this.setState({[name]: value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    alert(this.state.fname);
    this.setState({fname: ""})
  }
```

## Axios Examples

### GET example

```js
url = "http://localhost:4000"
axios.post(this.url + '/person/create-person', this.state) 
```

### POST example

```js
url = "http://localhost:4000"
axios.post(this.url + '/person/create-person', this.state) 
```

### Get list from database example
In this example we are getting a list from backend and storing it in state. When the state is updated, render() gets called and UI is updated. Note, we get the list when component is mounted, else it will complain that state is not initialized.

```js
class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            people: []
        };
    }

    componentDidMount() {
        this.getPeopleInfo();
    }

    getPeopleInfo = () => {
        axios.get("http://localhost:4000/person/all")
        .then((response) => {
            console.log(response);
            this.setState({people: response.data.msg})
            console.log(this.state.people)
          }, (error) => {
            console.log(error);
          });
    }

    render() {
        return(
            <React.Fragment>
                <img src="https://www.w3schools.com/html/pic_trulli.jpg" alt="Trulli" width="500" height="333"/>
                <a href="https://google.com">GOOGLE</a>
                {this.state.people.map(p => (
                    <PersonInfo person={p}/>
                ))}
            </React.Fragment>
        )
    }
}

export default Home;
```

## render/display list example

### Example 1:

```js
   render() {
        const elements = ['one', 'two', 'three'];
        //const elements = ['one'];
        return (
            <React.Fragment>
                <Grid container spacing={1} justify="space-evenly" style={{width: '100%'}}>
                    {elements.map(currentCourse => (
                    <Grid item xs={12} sm={6} md={3} lg={3} xl={2}>
                        <ProductCard/>
                    </Grid>
                ))}
                </Grid>
            </React.Fragment>
        );
    }
}
```

### Example 2:

```js
    render() {
        return(
            <React.Fragment>
                <img src="https://www.w3schools.com/html/pic_trulli.jpg" alt="Trulli" width="500" height="333"/>
                <a href="https://google.com">GOOGLE</a>
                {this.state.people.map(p => (
                    <PersonInfo person={p}/>
                ))}
            </React.Fragment>
        )
    }
```

## MondoDB examples

### CRUD example:
In person.route.js

```js
let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();

// Person Model
let personModel = require('../models/Person');

// CREATE Student
router.route('/create-person').post((req, res, next) => {
    personModel.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      //console.log(data)
      res.json(data)
    }
  })
});

// Delete Student
router.route('/delete-person/:id').delete((req, res, next) => {
    personModel.findByIdAndRemove(req.params.id, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          msg: data
        })
      }
    })
  })

// Delete Student
router.route('/delete-person').delete((req, res, next) => {
    console.log(req.query.name)
    personModel.findOneAndDelete({fname: req.query.name}, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          msg: data
        })
      }
    })
  })

// Get Students
router.route('/all').get((req, res, next) => {
    console.log(req.query.name)
    personModel.find({age: {$gte:2}}, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          msg: data
        })
      }
    })
  })

// Update Students
router.route('/update-person').put((req, res, next) => {
    console.log(req.body.fname)
    personModel.updateOne({fname: req.body.fname}, req.body, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          msg: data
        })
      }
    })
  })  


module.exports = router;
```


### Complex query example: Multiple clauses

Example 1:
```js
let reviewModel = require('../models/review');
let productModel = require('../models/product');
let userModel = require('../models/user');

// Get Top10 products
router.route('/top10').get((req, res, next) => {
  console.log(req);
  productModel
  .find()     // filter. 
  .sort({aggregateRating: -1})           // Sort by time DESC
  .limit(10)
  .select('_id name restaurant lastReviewTIme totalReviews aggregateRating time')
  .exec((error, data) => {
      if (error) {
          return next(error)
      } else {
          res.json(data)
      }
  });
})
```

Example 2:
```js
// Get Reviews of person. parameter is mongo userid i.e. _id field of user object
router.route('/:userid').get((req, res, next) => {
  console.log(req);
  userModel.findById(req.params.userid, (error, userData) => {
    if(error) { return next(error)}    
    else {
      reviewModel
      .find({user: userData})     // filter. 
      .populate("product", ["name", "restaurant"])
      .sort({time: -1})           // Sort by time DESC
      .exec((error, data) => {
          if (error) {
              return next(error)
          } else {
              res.json(data)
          }
      });
    }
  })
})
```

### Complex query example: Multiple models

Example 1:
```js
// CREATE review
// Note: req needs to have both review and product.
// First create review. And if the product does not exist, create that too, else update product
router.route('/create-review').post((req, res, next) => {
  //console.log(req)
  userModel.findById(req.body.user._id, (error, userData) => {
    if(error) { return next(error)}
    else
    {
      req.body.review.time = new Date();
      reviewModel.create(req.body.review, (error, reviewData) => {
        if (error) { return next(error) } 
        else 
        {
          // Review created
          console.log("Review created: " + reviewData);
          // Find the product
          console.log("Finding Product data:");
          productModel.findOne(req.body.product, (error, productData) => {
              if(error) { return next(error) } 
              else 
              {
                console.log("Found Product data:" + productData);
                if(!productData) 
                {
                  console.log("Creating Product data:" + req.body.product);
                  // Create product
                  productModel.create(req.body.product, (error, newproductData) => {
                    if(error) { return next(error) } 
                    else 
                    { 
                      console.log("Created Product data:" + newproductData);
                      addReviewToProduct(newproductData, reviewData, userData, res);
                    }
                  })
                }
                else
                {
                  addReviewToProduct(productData, reviewData, userData, res);
                }
              }
          })
        }
      })
    }
  })
})  
```

Example 2:

```js
addReviewToProduct = (p, r, u, res) => {
  console.log("Adding review to product:" + p);
  // Update product
  productModel.findByIdAndUpdate(p._id, 
    { 
      $addToSet: {reviews: r},
      lastReviewTime: new Date(),
      aggregateRating: p.totalReviews && p.aggregateRating ? (p.aggregateRating*p.totalReviews + r.rating)/(p.totalReviews + 1) : r.rating,
      totalReviews: p.totalReviews ? p.totalReviews + 1 : 1,
      img: p.img ? p.img : r.img
    }, 
    (error, productData) => {
    if(error) { return next(error)}
    else 
    { 
      // Update review
      reviewModel.findByIdAndUpdate(r._id, {product: p, user: u}, (error, reviewData) => {
        if(error) {return next(error)}
        else 
        {
          return res.json({product: productData._id, review: reviewData, user: u._id});
        }
      })
    }
  })
}

module.exports = router;
```

## Router browser example

```js
import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';
import Layout from './components/Layout';
import FormExample from './components/FormExample';

class App extends React.Component {
  render() {
    return(
      <Router>
        <React.Fragment>
          <Header/>
          <Switch>
            <Route path='/layout' component={Layout}/>
            <Route path='/form' component={FormExample}/>
            <Route path='/' component={Home}/>
          </Switch>
        </React.Fragment>
      </Router>
    )
  }
}

export default App;
```

## App Header with navigation example

```js
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button'
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontFamily: "Josefin Sans",
  },
}));

export default function Header(props) {
  const classes = useStyles();
  let history = useHistory();
  
  const handleClick = () => {
    history.push("/login")
  }

  return (
    <div className={classes.root}>
        <AppBar position="static" >
            <Toolbar variant="dense">
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                  <MenuIcon />
                </IconButton>
                <Typography variant="h5" color="inherit" className={classes.title}>
                    tastebuds
                </Typography>
                <Button color="inherit" onClick={handleClick}>Login</Button>
                <IconButton aria-label="add comment" color="inherit" onClick={props.onSearchOpen}>
                    <SearchIcon />
              </IconButton>
              <IconButton aria-label="add comment" color="inherit">
                    <AddIcon />
              </IconButton>
              <IconButton aria-label="add comment" color="inherit">
                    <AccountCircleIcon />
              </IconButton>
            </Toolbar>
        </AppBar>
    </div>
  );
}
```

## Localstorage example

GET
```js
    //******* LOCAL STORAGE EXAMPLE */
    if(localStorage.name!=undefined) {
      let p = localStorage.name;
    }
```

SET
```js
    //******* LOCAL STORAGE EXAMPLE */
    localStorage.name = "foo";
```

## Cookies example

server.js

```js
let cookieParser = require('cookie-parser');

app.use(cookieParser());

// app.use(cors());         // OK if you don't care about cookies
app.use(cors(corsOptions)); // Use this for cookies to work

//******* COOKIES! **********/
app.use((req, res, next) => {
    if(req.cookies['test']===undefined) {
        res.cookie('test', 5, { maxAge: 2147483647000, httpOnly: true });
        res.cookie('test1', 5, { maxAge: 2147483647000, httpOnly: true });
        res.cookie('test2', 5, { maxAge: 2147483647000, httpOnly: true });
        console.log("new cookie");
    }
    else {
        console.log("cookie already present");
    }
    next(); // Important!
  });
```

Client:

```js
  handleTop10 = () => {
    //axios.get(url + '/scores/top10') // cookies will not be honored
    axios.get(url + '/scores/top10', {withCredentials: true}) // withCredentials is required for cookies to be sent and received/stored
    .then(res => {
      console.log(res.data)
    });
  }
```

## Login example

Server:
```js
app.get('/authKeys', (req, res) => {
    res.json({
        GOOGLE_CLIENTID: process.env.GOOGLE_CLIENTID,
        FACEBOOK_APPID: process.env.FACEBOOK_APPID,
        TWITTER_KEY: process.env.TWITTER_KEY,
        TWITTER_SECRET: process.env.TWITTER_SECRET,
        MICROSOFT_APPID: process.env.MICROSOFT_APPID,
        INSTAGRAM_CLIENTID: process.env.INSTAGRAM_CLIENTID
    })
})
```

Client:
```js
import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome'
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import TwitterLogin from "react-twitter-login";
import MicrosoftLogin from "react-microsoft-login";
import InstagramLogin from 'react-instagram-login';
import axios from 'axios';
import { url } from '../server-conn';

class Login extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
          Keys: {}
        };

        this.getKeys();
    }

    getKeys = () => {    
        axios.get(url + '/authKeys/')
        .then(res => {
            this.setState({Keys: res.data})
        })
        .catch((error) => {
            console.log(error);
        })
    }

    responseGoogle = (response) => {
        console.log(response);
    }

    responseFacebook = (response) => {
        console.log(response);
    }

    responseTwitter = (err, data) => {
        console.log(err, data);
    };

    responseMicrosoft = (err, data) => {
        console.log(err, data);
    };

    responseInstagram = (response) => {
        console.log(response);
    };


    componentClicked = (response) => {
        console.log("clicked");
    };

    render() {
        if(this.state.Keys.GOOGLE_CLIENTID==undefined)
            return(<div>Loading</div>);
         
        return (
            <React.Fragment>
                <div>
                    <GoogleLogin
                            clientId={this.state.Keys.GOOGLE_CLIENTID}
                            buttonText="Login"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                </div>
                <div>
                    <GoogleLogin
                            clientId={this.state.Keys.GOOGLE_CLIENTID}
                            render={renderProps => (
                            <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
                            )}
                            buttonText="Login"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                </div>
                <div>
                <FacebookLogin
                    appId={this.state.Keys.FACEBOOK_APPID}
                    autoLoad={true}
                    fields="name,email,picture"
                    onClick={this.componentClicked}
                    callback={this.responseFacebook} />
                </div>
                <div>
                <FacebookLogin
                    appId={this.state.Keys.FACEBOOK_APPID}
                    autoLoad
                    callback={this.responseFacebook}
                    render={renderProps => (
                        <button onClick={renderProps.onClick}>This is my custom FB button</button>
                    )}
                    />
                </div>
                <div>
                    <TwitterLogin
                        authCallback={this.responseTwitter}
                        consumerKey={this.state.Keys.TWITTER_KEY}
                        consumerSecret={this.state.Keys.TWITTER_SECRET}
                        callbackUrl=""
                        buttonTheme="dark_short"
                    />            
                </div>
                <div>
                    <TwitterLogin
                        authCallback={this.responseTwitter}
                        consumerKey={this.state.Keys.TWITTER_KEY}
                        consumerSecret={this.state.Keys.TWITTER_SECRET}
                        callbackUrl=""
                        buttonTheme="dark_short"
                        children={<button>Twitter login</button>}
                    />            
                </div>
                <div>
                    <MicrosoftLogin 
                        clientId={this.state.Keys.MICROSOFT_APPID} 
                        buttonTheme="light_short"
                        authCallback={this.responseMicrosoft} 
                    />
                </div>
                <div>
                    <MicrosoftLogin 
                        clientId={this.state.Keys.MICROSOFT_APPID} 
                        buttonTheme="light_short"
                        authCallback={this.responseMicrosoft} 
                        children={<button>Microsoft login</button>}
                    />
                </div>
                <div>
                    <InstagramLogin
                        clientId={this.state.Keys.INSTAGRAM_CLIENTID}
                        onSuccess={this.responseInstagram}
                        onFailure={this.responseInstagram}
                    >
                        <FontAwesome
                            name="instagram"
                        />
                        <span> Login with Instagram</span>
                    </InstagramLogin>
                </div>
                <FontAwesome name="rocket"/>
            </React.Fragment>

        );
    }
}

export default Login;

```
