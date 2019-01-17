$(document).ready(function () {

    function renderSaved () {

        $.getJSON("/savedArticles", function(data){

            console.log("this is data: " + data);
            

            for (let i = 0; i < data.length; i++) {

                $("#savedArticleRow").append(
                    "<div class='col-lg-4 articleCard'>"
                    + "<div class='card' style='width: 18rem;'><img src='" + data[i].image
                    + "' class='card-img-top' alt=''> <div class='card-body'>"
                    + "<a class='card-title articleTitle' href='" + data[i].link + "target='_blank '>" + data[i].title + "</a>"
                    + "<p class='card-text' articleSummary'>" + data[i].summary + "</p>"
                    + "<p class='card-text articleCategory'>Section: " + data[i].category + "</p>"
                    + "<button type='button' class='btn btn-primary comments'>Comments</button></div></div>"
                    + "<button type='button' class='btn btn-primary seleteArticle'>Delete Article</button></div></div>"

                )
            }
        });
    }

    renderSaved ()

})