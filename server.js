var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");
var PORT = 3000;

var app = express();

// Setting Handlebars
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);

app.get("/", function(req,res) {
    res.render('index', {
      layout: 'about-main'
    });
});


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

app.get("/articles", function(req, res){
    
    db.Article.find({})
    .then(function(dbArticle){
        res.json(dbArticle);
    })
    .catch(function(err){
        res.json(err);
    });
});

app.get("/articles/:id", function(req, res){

    var id = req.params.id;

    db.Article.findOne({"_id":id})
    .populate("Comments")
    .then(function(dbArticle){
        res.json(dbArticle);
    })
    .catch(function(err){
        res.json(err);
    });
});

app.post("/articles/:id", function(req, res){

    var id = req.params.id;

    db.Comments.create(req.body)
    .then(function(dbComments){
        return db.Article.findOneAndUpdate({_id:id}, {comments: dbComments._id}, {new:true});
    })
    .then(function(dbArticle){
        res.join(dbArticle);
    })
    .catch(function(err){
        res.json(err)
    });
});

// Delete all articles in JSON
app.get("/clearall", function(req, res) {
    // Remove every note from the notes collection
    db.Article.remove({}, function(error, response) {
      // Log any errors to the console
      if (error) {
        res.send(error);
      }
      else {
        // Otherwise, send the mongojs response to the browser
        // This will fire off the success function of the ajax request
        res.send(response);
      }
    });
  });

app.listen(PORT, function(){
    console.log("App running on port " + PORT + "!");
    
})