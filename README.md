# Mongo NewsScraper - Juan Carlos Salas

### About the Application
This application will allow you to search through National Public Radios's online news section and display the most recent articles published with the following information:
- An image of the title
- The headline with a link to the article page
- The date of the article publishing
- A summary of the article
- The section topic of the article
- A button that allows you to save the article

Each article card will have a "Save Article" button which when clicked will save the corresponding articles and render them in the "Your Saved Articles" page. Within the "Your Saved Articles" page, you'll be able delete the articles or open a comment modal to write comments about each article; which you'll be able to delete or update it by submitting a new comment. The "Delete All Articles" button in the home page will clear all articles, including the articles you've saved.

### Development
I built this app in a about a week using  [MongoDB](https://github.com/mongodb/mongo), [Handelbars](https://github.com/wycats/handlebars.js/), and [Express](https://github.com/expressjs/express) to store article and comment information, render views, and handle the routing information, respectively. Other Node pckages which were utlizied are: [Morgan](https://github.com/expressjs/morgan); [Mongoose](https://github.com/Automattic/mongoose); [Axios](https://github.com/axios/axios); [Cheerio](https://github.com/cheeriojs/cheerio); and [Express-handlebars](https://github.com/ericf/express-handlebars).

As previously mentioned, I used [Handlebars](https://github.com/wycats/handlebars.js/) templatates alongside Bootstrap and customized CSS.

### Deployment
It is important that you connect to [MongoDB](https://github.com/mongodb/mongo) before trying to run the application. Enter ```$ mongod``` in your terminal.

Once the repo is cloned you must input ```$ npm install``` in the root directory. Once all dependencies and modules are installed, you can deploy the app with ```$mnpm start```.

The app structue is as follows:
```
├── models
│   ├── Article.js
│   ├── Comments.js
│   └── index.js
├── package-lock.json
├── package.json
├── public
│   └── assets
│       ├── css
│       │   ├── reset.css
│       │   └── scraper.css
│       ├── images
│       │   └── news.jpg
│       └── js
│           ├── home.js
│           └── save.js
├── server.js
└── views
    ├── index.handlebars
    ├── layouts
    │   ├── main.handlebars
    │   └── save-main.handlebars
    ├── partials
    │   ├── comment.handlebars
    │   ├── footer.handlebars
    │   ├── nav.handlebars
    │   └── saveNav.handlebars
    └── savedArticles
        └── savedArticles.handlebars
```

You can see a deployed demo of the app through [Heroku](https://github.com/heroku) here: [Mongo Scraper: NPR Edition](https://ancient-forest-53065.herokuapp.com/)
