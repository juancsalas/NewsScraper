$(document).ready(function () {

    $("#scrape").on("click", function(e){
        e.preventDefault();
        newScrape()
        setTimeout(renderScrape,1000)
    });     

    function newScrape() {
        $.getJSON("/scrape", function (){
            console.log("scrapte Complete.");
        })
    }

    function renderScrape () {

        $.getJSON("/articles", function(data){

            for (let i = 0; i < data.length; i++) {

                $("#articleRow").append(
                    "<div class='col-lg-4 articleCard'>"
                    + "<div class='card' style='width: 18rem;'><img src='" + data[i].image
                    + "' class='card-img-top' alt=''> <div class='card-body'>"
                    + "<a class='card-title articleTitle' href='" + data[i].link + "target='_blank ' "
                    + "data-id='" + data[i]._id + "'>" + data[i].title + "</a>"
                    + "<p class='card-text' articleSummary'>" + data[i].summary + "</p>"
                    + "<p class='card-text articleCategory'>Section: " + data[i].category + "</p>"
                    + "<button type='button' data-id='" + data[i]._id + "'"
                    + "class='btn btn-primary saveArticle'>Save Article</button></div></div>"

                )
            }


            $(".saveArticle").on("click", function(e){
                e.preventDefault();
                saveArticle(this)
            });
        });
    }

    function saveArticle (data) {
        
        var thisId = $(data).attr("data-id")
        console.log(thisId);
    
        $.ajax({
            method: "PUT",
            url:"/articles/" + thisId
        })

    }

    renderScrape ()
  
});

