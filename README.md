# To Run the app locally:

1. From client folder, run: yarn run build
2. From any folder, run: mongod --dbpath <path to /server/database/db>
3. From react-app folder, run: yarn run nodemon server

Note: In server.js, use db-conn to use local mongodb, and use db-conn-azure to use cosmosdb in Azure
require('./server/database/db-conn');
//require('./server/database/db-conn-azure');

# Deploying the app
1. Create Cosmosdb Mongo in Azure 
2. Update .env with the connection details
3. Create App service in Azure and add the cosmosdb connection details from .env file to App settings of the App service in Azure
4. Setup Deployment from git under deployment options of the app service
5. That's it! Now as commits happen to master in github, it should deploy to website automatically.

Note: Step 5 is not working. So have to build the app locally by running from folder client: npm run build, and then uploading build folder to github. 

# Issue
In StudentList.js and other files (under /client/src/components/Students) the URL for get/post is http://localhost:4000. This seems incorrect and should be https://reactwebdemo.azurewebsites.net though still needs investigation

## To check if the client build is working as expected, do the following:
1. In Azure, for the app service, choose Advanced Tools, and choose Kudu and hit Go
2. Click on Files, and you should be able to navigate to : https://reactwebdemo.scm.azurewebsites.net/api/vfs/site/wwwroot/client/
3. Here you should see build folder if the build happened succesfully

# Creating react-app

## Install node, yarn, mongodb

## Create folder and package.json
1. Create root folder: react-app
2. From react-app folder, run: yarn init -y 

## Set up git:
1. Create git repo on github
2. From react-app folder:
- run: git init
- Add .gitignore file to react-app folder
- run: git add --all
- run: git commit -m "Initial commit to set up app"
- run: git remote add origin https://github.com/dchandnani/react-app.git
- run: git push -u origin master

Note: if you have created the repo on github with Readme.md file, then you will first need to pull it locally before commit, else remote push will fail. You can still resolve this, by running following command before push: git pull origin master --allow-unrelated-histories

## Set up server
1. From react-app folder run: yarn add express body-parser dotenv cors axios nodemon
Note: put nodemon in devDependencies in package.json after running the above command
2. Create server.js
3. Create index.html
4. From react-app folder run: yarn run nodemon server
5. Open http://localhost:4000 and verify index.html loads!

## Set up database
1. From react-app folder run: yarn add mongoose
2. In react-app folder, create server folder
3. In server folder create database folder and create db-conn.js
4. In database folder create db folder. This will be where mongod will point to
5. Create models and routes

## Set up client
1. From react-app folder run: npx create-react-app client
2. From cient folder run: yarn add for following:
"@material-ui/core"
"contentful"
"prop-types"
"react-router-dom"
"styled-components"
axios


## Set up server to return the react app
1. From client directory run: yarn run build

2. In server.js, make sure to return client bundle

app.use(express.static('./client/build/'));
// * is very important, as it enabled all the reactjs routes!
app.get('/*', (req, res) => {
    res.sendFile('index.html', {root: './client/build/'});
})

3. In package.json of react-app (i.e. server), add the following:

  "scripts": {
    "start": "cd client/test-material && yarn && yarn run build && cd ../.. && node server",
    "dev": "node server",
    "test": "echo \"Error: no test specified\" && exit 1"
  },


## To run the app
1. From client folder, run: yarn run build
2. From any folder, run: mongod --dbpath <path to /server/database/db>
3. From react-app folder, run: yarn run nodemon server



