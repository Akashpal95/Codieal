{let e=function(e,t){new Noty({theme:"relax",text:t,type:e,layout:"topRight",timeout:1500}).show()},t=function(){console.log("Events on comments are being set!!"),$.each($(".new-comment-form"),(e,t)=>{createComment($(t))}),$.each($(" .delete-comment-button"),(e,t)=>{o($(t))})};var createComment=function(t){console.log("Create Comment!!"),t.submit((function(c){c.preventDefault(),$.ajax({type:"post",url:"/comments/create",data:t.serialize(),success:function(t){let c=n(t.data);$("#post-comments-"+t.data.comment.post).append(c),o($(" .delete-comment-button",c)),CommonLikeFunctions.LikeEventSetter($(" .like-button-form",c)),e("success","Comment Added!!")},error:function(t){e("error","Error in adding comment!!"),console.log("Error : ",t.responseText)}})}))};let n=function(e){return $(`<li id="comment-${e.comment._id}">\n                    <p>\n                    <div class="user-card">\n                        <img class="profile-pic-micro" src="https://www.flaticon.com/svg/static/icons/svg/3011/3011270.svg">\n                        <p>\n                          <a href="/users/profile/${e.user_id}">${e.username} </a>\n                        </p>\n                        <div class="options-container">\n                          <div class="more-container">\n                            <a class="delete-comment-button" href="/comments/destroy/${e.comment._id}">Delete</a>\n                          </div>\n                          <div class="more-container">\n                              <img src="https://www.flaticon.com/svg/static/icons/svg/1828/1828687.svg">\n                          </div>\n                        </div>\n                      </div>\n                      <div class="post-content-container">\n                      ${e.comment.content}\n                        </div>\n                        <form class="like-button-form" action="/likes/toggle/?id=${e.comment._id}&type=Comment" method="POST">\n                          <span id="like-${e.comment._id}">${e.comment.likes.length}</span>&nbsp;<button type="submit" >Like</button>\n                        </form>\n                        <br>\n                    </p>\n                </li>`)},o=function(t){t.click((function(n){n.preventDefault(),$.ajax({type:"get",url:t.prop("href"),success:function(t){$("#comment-"+t.data.comment_id).remove(),e("success","Comment Deleted!!")},error:function(t){e("error","Error in deleting comment!!"),console.log("Error : ",t.responseText)}})}))};t()}