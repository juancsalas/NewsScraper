$(document).ready(function () {

    // Event listener that initiates the scrape
    $("#scrape").on("click", function(e){
        e.preventDefault();
        newScrape()
        setTimeout(renderScrape,2000)
    });     

    // Functons that conects to server file to do the scraping
    function newScrape() {
        
        $.getJSON("/scrape", function (){
            console.log("scrapte Complete.");
        })
    }

    // Renders all the articles from the scrape to the DOM
    function renderScrape () {

        $.getJSON("/articles", function(data){


            for (let i = 0; i < data.length; i++) {
                
                var articleCard = "<div class='col-lg-4 my-4 articleCard'>"
                + "<div class='card' style='width: 18rem;'><img src='" + data[i].image
                + "' class='card-img-top' alt=''> <div class='card-body'>"
                + "<a class='card-title font-weight-bold articleTitle' href='" + data[i].link + "' target='_blank ' "
                + "data-id='" + data[i]._id + "'>" + data[i].title + "</a>"
                + "<p class='card-text articleSummary'>" + data[i].summary + "</p>"
                + "<p class='card-text articleCategory'>Section: " + data[i].category + "</p>"
                + "<button type='button' data-id='" + data[i]._id + "'"
                + "class='btn btn-success saveArticle'>Save Article</button></div></div>"

                var articleRow = $("#articleRow").append(articleCard)
                
                $(".articleContainer").prepend(articleRow)
            }

            // Event listener that saves articles to the save page
            $(".saveArticle").on("click", function(e){
                e.preventDefault();
                saveArticle(this)
            });

            // Event listener that deletes all articles in the API
            $("#deleteAll").on("click", function(e){
                e.preventDefault();
                deleteAll()
                $("#articleRow").empty()
            })
        });
    }


    function saveArticle (data) {



        var thisId = $(data).attr("data-id")        

        $.ajax({
            method: "PUT",
            url:"/articles/" + thisId
        })
    }

    function deleteAll () {
       
        $.getJSON("/clearAll", function (){
            console.log("Delete All Completed.");
        })
    }

    renderScrape ()
  
});

