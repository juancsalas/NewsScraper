$(document).ready(function () {
    $.getJSON("/articles", function(data){

        for (let i = 0; i < data.length; i++) {

            console.log("DATA NUMBER 1: " + data[1])
            
            $("#articleRow").append("<div class='col-lg-4 articleCard'>"
                + "<div class='card' style='width: 18rem;'><img src='" + data[i].image
                + "' class='card-img-top' alt=''> <div class='card-body'>"
                + "<a class='card-title' href='" + data[i].link + "target='_blank articleTitle'>" + data[i].title + "</a>"
                + "<p class='card-text' articleSummary'>" + data[i].summary + "</p>"
                + "<p class='card-text articleCategory'>Section: " + data[i].category + "</p>"
                + "<button type='button' class='btn btn-primary'>Save Article</button></div></div>"

            )
        }
    });
});

