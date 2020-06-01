# To Run the app:

# Creating react-app

Create folder and package.json
1. Create root folder: react-app
2. From react-app folder, run: yarn init -y 

Set up git:
3. Create git repo on github
4. From react-app folder:
    run: git init
    Add .gitignore file to react-app folder
    run: git add --all
    run: git commit -m "Initial commit to set up app"
    run: git remote add origin https://github.com/dchandnani/react-app.git
    run: git push -u origin master

Note: if you have created the repo on github with Readme.md file, then you will first need to pull it locally before commit, else remote push will fail. You can still resolve this, by running following command before push: git pull origin master --allow-unrelated-histories


