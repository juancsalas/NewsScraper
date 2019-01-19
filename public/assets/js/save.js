$(document).ready(function () {

    function renderSaved () {

        $.getJSON("/savedArticles", function(data){
                    

            for (let i = 0; i < data.length; i++) {

                var savedArticleCard = "<div class='col-lg-4 my-4 articleCard'>"
                + "<div class='card' style='width: 18rem;'><img src='" + data[i].image + "' class='card-img-top' alt=''>" 
                + "<div class='card-body'> <a class='card-title articleID articleTitle' data-id='" + data[i]._id + "' "
                + "href='" + data[i].link + "' target='_blank '>" + data[i].title + "</a>"
                + "<p class='card-text' articleSummary'>" + data[i].summary+ "</p>"
                + "<p class='card-text articleCategory'>Section: " + data[i].category + "</p>"
                + "<button type='button' class='btn btn-primary mx-2 commentsButton' data-toggle='modal' data-target='#exampleModal'>Comments</button>"        
                + "<button type='button' class='btn btn-primary mx-2 deleteArticle'>Delete</button></div></div>"

                var savedArticleRow = $("#savedArticleRow").append(savedArticleCard)

                $(".articleContainer").prepend(savedArticleRow)
            }

            $(".deleteArticle").on("click", function(e){
                e.preventDefault();
                deleteArticle($(".articleID").attr("data-id"))
            });

            $(".addComment").on("click", function(e){
                e.preventDefault();
                addComment($(".articleID").attr("data-id"))
            })

            $(".commentsButton").on("click", function(e){

                e.preventDefault();
                
                var id = $(".articleID").attr("data-id");
                console.log(id);
            
                $.ajax({
                    method: "GET",
                    url: "/savedArticles/" + id
                })
                .then(function(data) {

                    var comment = "<li data-id='" + data.comments._id + "' class='comment'>" + data.comments.comment
                    + "<button type='button' class='close deleteComment' data-dismiss='modal' aria-label='Close'>"
                    + "<span aria-hidden='true'>&times;</span></button></li>"
                    
                    $(".commentList").append(comment)
                          
                })

                $(".comments").on("click", function(e){
                    e.preventDefault();
                    deleteComment(this);
                })
                    
            });

        });
    }

    function deleteArticle (data) {

        $.ajax({
            method: "PUT",
            url:"/savedArticles/" + data
        })

        location.reload()

    }

    function addComment (entry) {

        $.ajax({
            method: "POST",
            url: "/articles/" + entry,
            data: { comment: $("#message-text").val() }
        })
        .then(function(data) {
            // console.log(data);
            $("#message-text").empty();
        })
        .catch(function(err){
            res.json(err);
        });
        
    }

    function deleteComment (data) {
        
    }


    renderSaved ()

})