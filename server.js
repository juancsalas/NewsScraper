var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
const exphbs = require("express-handlebars");
var app = express();

var db = require("./models");
var PORT = process.env.PORT || 3000;

// Setting Handlebars

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);

// Renders Home Page
app.get("/", function(req,res) {
    res.render("index");
});

// Renders Save Page
app.get("/savedPage", function(req, res){
    res.render("savedArticles/savedArticles", {
        layout: "save-main"
    });
})

// API for Saved Articles
app.get("/savedArticles", function(req, res){
  
    db.Article.find({"saved" : true})
    .then(function(dbSavedArticle){
        res.json(dbSavedArticle);
    })
    .catch(function(err){
        res.json(err);
    });
})

// Does the scrapping
app.get("/scrape", function(req, res){
    axios.get("https://www.npr.org/sections/news/").then(function(response){
                
        var $ = cheerio.load(response.data);

        $("article").each(function(i, element){
            var result = {};

            result.title = $(this)
            .find($(".title"))
            .text();

            result.link = $(this)
            .find($("a"))
            .attr("href");

            result.category = $(this)
            .find($(".slug"))
            .text();

            result.summary = $(this)
            .find($(".teaser"))
            .text();

            result.image = $(this)
            .find($("img"))
            .attr("src");

            result.saved = false;

            db.Article.create(result)
            .then(function(dbArticle){
                console.log(dbArticle);
            })
            .catch(function(err){
                return res.json(err);
            })
        });
        res.send("Scrape Complete")
    });
});

// JSON of all scraped articles
app.get("/articles", function(req, res){
    
    db.Article.find({})
    .then(function(dbArticle){
        res.json(dbArticle);
    })
    .catch(function(err){
        res.json(err);
    });
});

//Sets the articles to saved = true
//Adds them to save page
app.put("/articles/:id", function(req, res){
    
    var id = req.params.id;

    db.Article.findOneAndUpdate({"_id":id},
        {$set: { saved : true }
    })
    .then(function(dbArticle){
        res.json(dbArticle);       
    })
    .catch(function(err){
        res.json(err);
    })
});

//Sets saved articles to saved = false
//Removes from saved page
app.put("/savedArticles/:id", function(req, res){
    
    var id = req.params.id;

    db.Article.findOneAndUpdate({"_id":id},
        {$set: { saved : false }
    })
    .then(function(dbArticle){
        res.json(dbArticle);       
    })
    .catch(function(err){
        res.json(err);
    })
});


// creates and adds comment id to articles in API
app.post("/articles/:id", function(req, res){

    var id = req.params.id;

    db.Comments.create(req.body)
    .then(function(dbComments){

        return db.Article.findOneAndUpdate({"_id" : id}, {comments: dbComments._id}, {new:true});
    })
    .then(function(dbArticle){
        res.join(dbArticle);
    })
    .catch(function(err){
        res.json(err)
    });
});

//Populates comments to all articles in API
app.get("/articles/:id", function(req, res){

    var id = req.params.id;    

    db.Article.findOne({"_id":id})
    .populate("comments")
    .then(function(dbArticle){
        res.json(dbArticle);
    })
    .catch(function(err){
        res.json(err);
    });
});

//Populates savedArticles API with comments
//CANT FIGURE THIS OUT!!
app.get("/savedArticles/:id", function(req, res){
    
    var id = req.params.id;
  
    db.Article.findOne({"_id" : id})
    .populate("comments")
    .then(function(dbSavedArticle){
        res.json(dbSavedArticle);
    })
    .catch(function(err){
        res.json(err);
    });
})

app.get("/articleComments", function(req, res){
  
    db.Comments.find({})
    .then(function(dbComments){
        res.json(dbComments);
    })
    .catch(function(err){
        res.json(err);
    });
})

app.get("/articleComments/:id", function(req, res){

    var commentID = req.params.id;

    db.Comments.remove({"_id" : commentID})
    .then(function(dbComments){
        res.json(dbComments);
    })
    .catch(function(err){
        res.json(err);
    })
})

// Deletes all articles that were scraped from API
app.get("/clearAll", function(req, res) {
    db.Article.remove({}, function(error, response) {
        if (error) {
            res.send(error);
        }
        else {
            res.send(response);
        }
    });
});

// Deletes all comments in the comment api
app.get("/clearComments", function(req, res) {
    db.Comments.remove({}, function(error, response) {
        if (error) {
            res.send(error);
        }
        else {
            res.send(response);
        }
    });
});


app.listen(PORT, function(){
    console.log("App running on port " + PORT + "!");
})


