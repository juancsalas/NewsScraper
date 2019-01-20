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
                + "<button type='button' class='btn btn-primary mx-2 commentsButton' data-id='" + data[i]._id + "' "
                + "data-toggle='modal' data-target='#exampleModal'>Comments</button>"        
                + "<button type='button' data-id='" + data[i]._id + "' class='btn btn-primary mx-2 deleteArticle'>Delete"
                + "</button></div></div>"

                var savedArticleRow = $("#savedArticleRow").append(savedArticleCard)

                $(".articleContainer").prepend(savedArticleRow)
            }

            $(".deleteArticle").on("click", function(e){
                var id = $(this).attr("data-id");
                e.preventDefault();
                deleteArticle(id)
            });

            $(".commentsButton").on("click", function(e){
                e.preventDefault();

                var id = $(this).attr("data-id");

                $(".commentList").empty();
                $(".commentList").text("No Comments");
                
                $(".modal-footer").empty()
                var addButton = "<button type='button' data-dismiss='modal' data-id='" + id + "' class='btn btn-primary addComment'>Add Comment</button>"
                + "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button>"
                $(".modal-footer").append(addButton)

                $.ajax({
                    method: "GET",
                    url: "/savedArticles/" + id
                })
                .then(function(data) {
                
                    if (data.comments.comment){

                        $(".commentList").empty();

                        var comment = "<li data-id='" + data.comments._id + "' class='currentComment'>" + data.comments.comment
                        + "<button type='button' data-dismiss='modal' data-id='" + data.comments._id 
                        + "'class='close deleteComment'>x</button></li>"

                        $(".commentList").append(comment)                        
                    }
                
                    $(".deleteComment").on("click", function(e){
                        e.preventDefault();
                        id = $(this).attr("data-id")
                        console.log(id); 
    
                        deleteComment(id);
                    })
                })

                $(".addComment").on("click", function(e){
                    e.preventDefault();

                    id = $(this).attr("data-id")
                    addComment(id)       
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
        
        console.log(entry);
    
        $.ajax({
            method: "POST",
            url: "/articles/" + entry,
            data: { comment: $("#message-text").val() }
        })
        .then(function(data) {
            $(".commentInput").val("");
        })
        .catch(function(err){
            res.json(err);
        });
    }

    function deleteComment (data) {

        $.ajax({
            method: "GET",
            url: "/articleComments/" + data,
        })
        .then(function(data) {
            console.log("Comment Deleted.");
        })
        .catch(function(err){
            res.json(err);
        });
    }


    renderSaved ()

})