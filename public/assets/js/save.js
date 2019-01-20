$(document).ready(function () {

    // Function that renders all the saved articles onto the page
    function renderSaved () {

        $.getJSON("/savedArticles", function(data){

            for (let i = 0; i < data.length; i++) {

                var savedArticleCard = "<div class='col-lg-4 my-4 articleCard'>"
                + "<div class='card' style='width: 18rem;'><img src='" + data[i].image + "' class='card-img-top' alt=''>" 
                + "<div class='card-body'> <a class='card-title font-weight-bold articleID articleTitle' data-id='" + data[i]._id + "' "
                + "href='" + data[i].link + "' target='_blank '>" + data[i].title + "</a>"
                + "<p class='card-text articleSummary'>" + data[i].summary+ "</p>"
                + "<p class='card-text articleCategory'>Section: " + data[i].category + "</p>"
                + "<button type='button' class='btn btn-info mx-2 commentsButton' data-id='" + data[i]._id + "' "
                + "data-toggle='modal' data-target='#exampleModal'>Comments</button>"        
                + "<button type='button' data-id='" + data[i]._id + "' class='btn btn-danger mx-2 deleteArticle'>Delete"
                + "</button></div></div>"

                var savedArticleRow = $("#savedArticleRow").append(savedArticleCard)

                $(".articleContainer").prepend(savedArticleRow)
            }

            // Event handler that call on deleteArticle function to delete an article from the save page
            $(".deleteArticle").on("click", function(e){
                var id = $(this).attr("data-id");
                e.preventDefault();
                deleteArticle(id)
            });

            // Event handler that triggers the modal with all the existing comments if applicable
            $(".commentsButton").on("click", function(e){
                e.preventDefault();
                var id = $(this).attr("data-id");

                // Clears the current comments so they don't get appended repeatedly
                $(".commentList").empty();

                // Default message if no comments exist
                $(".commentList").text("There are currently no comment for this article.");
                
                // Clears the modal footer so buttons aren't rendered repeatedly after every opening
                $(".modal-footer").empty()

                // Renders 'Add Comment' and 'Close' buttons for the modal
                var addButton = "<button type='button' data-dismiss='modal' data-id='" + id + "' class='btn btn-primary addComment'>Add Comment</button>"
                + "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button>"
                $(".modal-footer").append(addButton)

                $.ajax({
                    method: "GET",
                    url: "/savedArticles/" + id
                })
                .then(function(data) {

                    // Conditional statement determines if there are comments populating the article object
                    if (data.comments.comment){

                        // Clears comment box of default message
                        $(".commentList").empty();

                        var comment = "<li data-id='" + data.comments._id + "' class='currentComment'>" + data.comments.comment
                        + "<button type='button' data-dismiss='modal' data-id='" + data.comments._id 
                        + "'class='close deleteComment'>x</button></li>"

                        $(".commentList").append(comment)                        
                    }
                    
                    // Event listener that calls on deleteComment function to delete comment from saved article
                    $(".deleteComment").on("click", function(e){
                        e.preventDefault();
                        id = $(this).attr("data-id")
                        console.log(id); 
    
                        deleteComment(id);
                    })
                })

                // Event listener that calls addComment function to add comment to specific article
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