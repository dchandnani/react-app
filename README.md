# To run the app locally
## Install node modules
If you are downloading the project from git, you will likley not have the node modules installed. To install them, run following from root folder and client folder: yarn install (or you can also run npm install. I prefer yarn install as it seems more reselient to dependencies)

If you are starting from scratch, 
1. Run this from app directory (these modules are required for server): npm install express body-parser cors mongoose dotenv cookie-parser nodemon
2. Run this from client directory: 
yarn add @material-ui/core axios react-fontawesome react-google-login react-facebook-login react-microsoft-login react-twitter-login react-instagram-login

## Start DB
If you want to use Cosmos-db, make sure server.js is using require('./server/database/db-conn-azure');

If you want to use local mongodb, do following:
1. Make sure server.js is using require('./server/database/db-conn');
2. From any folder, run: mongod --dbpath <path to /server/database/db>

## Start server
1. Make sure url in  ./client/src/server-conn.js is set to http://localhost:4000 
2. If nodemon is not installed: yarn global add nodemon
3. From react-app (i.e. root) folder, run: yarn run nodemon server

## Set up client
From client folder, run: yarn start
to build, run: yarn run build

Navigate to localhost:3000 --> here you can see the app too. And as you make changes to client and server, both will just work fine! This is good for dev scenario. When you deploy, you should have things workikng from localhost:4000 (so that you only have to run one instance of node).

Navigate to localhost:4000 (this is where server is running). That's it! --> Note, if you make changes to the client, you will need to build it. 


Note: each time you make a change in the client you will need to build the client. To avoid this, see the next section.

# To run the app locally and avoid having to rebuild client each time manually

When you are creating the app locally, you will be making client and server changes. In order to avoid having to build the client package each time you make a client change, following trick will work well:

## Start DB
Same as above

## Start server
Same as above

## Set up client
From client directory, run: 
npm i --save-dev npm-watch
npm run watch 

In separate command prompt run:
yarn start


Now, navigate to localhost:3000 (this is where the client react server is running)
That's it! Now any changes you make to the client or server will show without requiring you to build client each time


# Deploying the app

## Setting up resources in Azure
1. Create Cosmosdb Mongo in Azure 
2. Update .env with the connection details
3. Create App service in Azure and add the cosmosdb connection details from .env file to App settings of the App service in Azure
4. Setup Deployment from git under deployment options of the app service

## Continuous deployment

After you have made all the local changes and tested it, you are ready for deployment.
1. Make sure that server.js is using require('./server/database/db-conn-azure');
2. Make sure server-conn.js in ./client/src folder has url set to ""
3. From client folder, run: npm run build
4. Then from root folder, run:
- git add --all (do this if you have added any new files)
- git add -f client/build (need to do this since gitignore excludes build directory)
- git commit -am "<message>"
- git push origin master

That's it! Changes should deploy to website automatically. You can check this by navigating to the Deployment Center in Azure for the app service and seeing your commit sync'd.

Note: Step 3 should ideally not be required as the client should be built in Azure. However, building in Azure is failing (needs to be investigated). To work around, we are requiring Step 3 to build locally and then upload the build.

### To check files in Azure, do the following:
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
- run: git remote add origin https://github.com/dchandnani/<repo-name>.git
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
2. From cient folder run: yarn add "@material-ui/core" "contentful" "prop-types" "react-router-dom" "styled-components" axios


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


## To run app locally
See the steps outlined above
