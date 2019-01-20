$(document).ready(function () {

    $("#exampleModal").on("show.bs.modal", function(e){

        e.preventDefault();
        
        var id = $(".articleID").attr("data-id");
        console.log(id);
    
        $.ajax({
            method: "GET",
            url: "/articleSaved/" + id
        })
        .then(function(data) {

            for (let i = 0; i < data.length; i++) {

                var comment = "<li data-id='" + data[i].comments._id + "' class='comment'>" + data[i].comments[0].comment + "</li>"
                + "<button type='button' class='close deleteComment' aria-label='Close'>"
                + "<span aria-hidden='true'>&times;</span></button>"     

                $(".commentList").append(comment)
            }
            
        });
          

    // function renderComment () {

    //     var id = $(".articleID").attr("data-id")

    //     console.log(id)

    //     $.getJSON("/savedArticles/" + id, function(data){
        
    //         for (let i = 0; i < data.length; i++) {

    //             var comment = "<li data-id='" + data[i]._id + "' class='comment'>" + data[i].comment + "</li>"
    //             + "<button type='button' class='close deleteComment' data-dismiss='modal' aria-label='Close'>"
    //             + "<span aria-hidden='true'>&times;</span></button>"     

    //             $(".commentList").prepend(comment)
    //         }


    //         $(".deleteComment").on("click", function(e){
    //             e.preventDefault();
    //             deleteComment(this);
                
    //         })   
    //     })

            
    });





    function deleteComment (data) {
        
        var thisId = $(data).attr("data-id")

        $.ajax({
            method: "DELETE",
            url:"/articles/" + thisId
        })
    }

    // renderComment ()

})