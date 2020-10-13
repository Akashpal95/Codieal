{
  let showNotification = function(type, message) {
    new Noty({
      theme: 'relax',
      text: message,
      type: type,
      layout: 'topRight',
      timeout: 1500
    }).show();
  };

  let allCommentsEventSetter = function() {
    console.log('Events on comments are being set!!');
    // set event listener on every comment form
    $.each($('.new-comment-form'), (index, item) => {
      createComment($(item));
    }); //You need to send jQuery format of item/element i.e. $(item) for .submit and .serialize to work as they are all jquery functions
    //set event Listener on every comment delete button
    $.each($(' .delete-comment-button'), (index, item) => {
      deleteComment($(item));
    });
  };
  var createComment = function(commentForm) {
    console.log('Create Comment!!');
    commentForm.submit(function(e) {
      e.preventDefault();

      $.ajax({
        type: 'post',
        url: '/comments/create',
        data: commentForm.serialize(),
        success: function(data) {
          let newComment = newCommentDom(data.data);
          $(`#post-comments-${data.data.comment.post}`).append(newComment);
          deleteComment($(' .delete-comment-button', newComment));
          CommonLikeFunctions.LikeEventSetter(
            $(' .like-button-form', newComment)
          );
          showNotification('success', 'Comment Added!!');
        },
        error: function(err) {
          showNotification('error', 'Error in adding comment!!');
          console.log('Error : ', err.responseText);
        }
      });
    });
  };

  let newCommentDom = function(data) {
    return $(`<li id="comment-${data.comment._id}">
                    <p>
                        <small>
                            <a class= "delete-comment-button" href="/comments/destroy/${data.comment._id}">X</a>
                        </small>
                        <small>
                            ${data.username} says:
                        </small>
                        ${data.comment.content}
                        <form class="like-button-form" action="/likes/toggle/?id=${data.comment._id}&type=Comment" method="POST">
                          <span id="like-${data.comment._id}">${data.comment.likes.length}</span>&nbsp;<button type="submit" >Like</button>
                        </form>
                        <br>
                    </p>
                </li>`);
  };

  //method to delete a comment DOM
  let deleteComment = function(deleteLink) {
    deleteLink.click(function(e) {
      e.preventDefault();

      $.ajax({
        type: 'get',
        url: deleteLink.prop('href'),
        success: function(data) {
          $(`#comment-${data.data.comment_id}`).remove();
          showNotification('success', 'Comment Deleted!!');
        },
        error: function(err) {
          showNotification('error', 'Error in deleting comment!!');
          console.log('Error : ', err.responseText);
        }
      });
    });
  };

  allCommentsEventSetter();
}
