const baseURL = 'http://localhost:1337/api/';

var GlobalDeleteID;
function setGlobalDeleteID (id) {
  GlobalDeleteID = id;
  console.log(GlobalDeleteID);
}

var GlobalEditID;
function setGlobalEditID (id) {
  GlobalEditID = id;
  console.log(GlobalEditID);

}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function eraseCookie(name) {   
  document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

/*function getPosts () {

  var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
  fetch(baseURL + 'post', requestOptions)
  .then(response => response.json())
  .then(result => {console.log(result); return result;})
  .catch(error => console.log('error', error));
}*/


const postItem = (id, title, body, createdBy, createdAt) => `
<div  class="col-12 col-md-6 p-3">
          <div class="card">
              <div class="card-header ">
                ID : ${id}
                <i class="fas fa-trash mr-3 float-right" onclick="setGlobalDeleteID('${id}'); checkCookie(deletePost);"></i>
                <i class="fas fa-edit mr-3 float-right" onclick="setGlobalEditID('${id}'); showEdit();"></i>
              </div>
              <div id = "${id}-view" class="card-body text-center">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${body}</p>
              </div>
              <div id = "${id}-edit" class="card-body text-center" style="display: none;">
                <form>
                  <div class="form-group">
                    <label for="${id}-edit-post-title">Title</label>
                    <input type="text" class="form-control" id="${id}-edit-post-title" value=${title} placeholder="New title ..." minlength="1" maxlength = "30" required>
                  </div>
                  <div class="form-group">
                    <label for="${id}-edit-post-body">Content</label>
                    <textarea class="form-control" id="${id}-edit-post-body" rows="5" maxlength = "1000" data-announce="true">${body}</textarea>
                  </div>
                  <br/>
                  <button type="submit" class="btn btn-secondary" onclick="hideEdit();">Cancle</button>
                  <button type="submit" class="btn btn-success" onclick="checkCookie(updatePost);">Done</button>
                  <br/>
                </form>
              </div>
              <div class="card-footer text-muted">
                Created at : ${createdAt}
              </div>
            </div>
          </div>
        </div>
`;

const profileItem = (id, email) => `
<div class="container">
<br/>
<div class="card">
  <br/>
  <div class="text-center">
    <img class="card-img-top rounded" style="width: 150px; height: 150px;" src="avatar-1.png" alt="Main Program Registration">
  </div>
  <div class="card-body">
    <h5 class="card-title text-center">Profile</h5>
    <br/>
    <p style="color: gray" class="card-title">Hi! <br/> My ID is <b style="color: red">${id}</b> and my email is <b style="color: red">${email}</b>.</p>
    <br/>
  </div>
</div>
<br/>
<br/>
</div>
`;

const editModal = `
div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          ...
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>`

function serveMyPosts () {

  var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append('Authorization', 'Bearer ' + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      
    postHtml = "";
    fetch(baseURL + 'admin/post/crud/', requestOptions)
        .then(response => response.json())
        .then(result => {
          result.posts.forEach( function(post) {
            postHtml += (postItem(post.id, post.title, post.content, post.created_by, post.created_at));
          });
          document.getElementById("my-posts").innerHTML = postHtml;
        })
        .catch(error => console.log('error', error));
}

function addPost() {
  var title = document.getElementById("add-post-title").value;
  var content = document.getElementById("add-post-body").value;

  var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append('Authorization', 'Barear ' + token);

    var urlencoded = new URLSearchParams();
    urlencoded.append("title", title);
    urlencoded.append("content", content);

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
    };

    fetch(baseURL + 'admin/post/crud', requestOptions)
      .then(response => {
        status = response.statusText;
        return response;
        })

      .then(response => response.json())
      .then( result => {
          console.log(status);
          console.log(result);
          
          if(status == "OK") {
            onClickDashboard();
            return;
          }

          document.getElementById("add-post-result").innerHTML = result.message;
          document.getElementById("add-post-resultBox").style.display = "initial";
          return;
        })
      .catch(error => console.log('error', error));
}

function showProfile () {

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
  };

  var status;
  fetch(baseURL + 'tokenverify/' + token, requestOptions)
  .then(response => {
      status = response.statusText;
      console.log(response);
      console.log(status);
      return response;
      })  

  .then(response => response.json())
  .then( result => {
      console.log(status);
      console.log(result);
      

      if(status == "OK") {
        document.getElementById("my-profile").innerHTML = profileItem(result.id, result.email);

        result.id
        return;
      }

      window.location.href = "http://127.0.0.1:8080/login/login.html";
      return;

  })
  .catch(error => console.log('error', error));

}

function updatePost () {
  postId = GlobalEditID;
  postTitle = document.getElementById(GlobalEditID+'-edit-post-title').value;
  postContent = document.getElementById(GlobalEditID+'-edit-post-body').value;

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append('Authorization', 'Barear ' + token);

  var urlencoded = new URLSearchParams();
  urlencoded.append("title", postTitle);
  urlencoded.append("content", postContent);

  var requestOptions = {
  method: 'PUT',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
  };

  fetch(baseURL + 'admin/post/crud/' + postId, requestOptions)
  .then(response => {
    status = response.statusText;
    return response;
    })

  .then(response => response.json())
  .then( result => {
      console.log(status);
      console.log(result);
      
      if(status == "OK") {
        onClickDashboard();
        return;
      }

      alert(result.message);
      return;
    })
  .catch(error => console.log('error', error));
}

function deletePost () {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append('Authorization', 'Barear ' + token);

  var urlencoded = new URLSearchParams();

  var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  };
  
  fetch(baseURL + 'admin/post/crud/' + GlobalDeleteID, requestOptions)
  .then(response => {
    status = response.status;
    console.log(status);
    if(status == '204') {
      onClickDashboard();
      return;
    }

    })

  .catch(error => console.log('error', error));
}

function showEdit() {
  document.getElementById(GlobalEditID+'-view').style.display = "none";
  unfade(document.getElementById(GlobalEditID+'-edit'));

}

function hideEdit() {
  unfade(document.getElementById(GlobalEditID+'-view'));
  document.getElementById(GlobalEditID+'-edit').style.display = "none";
}

function fade(element) {
  var op = 1;  // initial opacity
  var timer = setInterval(function () {
      if (op <= 0.1){
          clearInterval(timer);
          element.style.display = 'none';
      }
      element.style.opacity = op;
      element.style.filter = 'alpha(opacity=' + op * 100 + ")";
      op -= op * 0.1;
  }, 50);
}

function unfade(element) {
  var op = 0.1;  // initial opacity
  element.style.display = 'block';
  var timer = setInterval(function () {
      if (op >= 1){
          clearInterval(timer);
      }
      element.style.opacity = op;
      element.style.filter = 'alpha(opacity=' + op * 100 + ")";
      op += op * 0.1;
  }, 10);
}

function checkCookie(_callback) {
  token = getCookie("token");
  console.log(token);

  if(token == null) {
    window.location.href = "http://127.0.0.1:8080/login/login.html";
    return;
  }

  //checkCookieReq(token); -> toDo : Check token validation
  
  _callback();

}

function onClickDashboard() {
  document.getElementById("dashboard-top-nav").classList.add("active");
  document.getElementById("addpost-top-nav").classList.remove("active");
  document.getElementById("profile-top-nav").classList.remove("active");
  document.getElementById("signout-top-nav").classList.remove("active");

  document.getElementById("dashboard-left-nav").classList.add("active");
  document.getElementById("addpost-left-nav").classList.remove("active");
  document.getElementById("profile-left-nav").classList.remove("active");
  document.getElementById("signout-left-nav").classList.remove("active");

  document.getElementById("my-posts").style.display = "flex";
  document.getElementById("add-post").style.display = "none";
  document.getElementById("my-profile").style.display = "none";

  checkCookie(serveMyPosts);
  
}

function onClickAddPost() {
  document.getElementById("dashboard-top-nav").classList.remove("active");
  document.getElementById("addpost-top-nav").classList.add("active");
  document.getElementById("profile-top-nav").classList.remove("active");
  document.getElementById("signout-top-nav").classList.remove("active");

  document.getElementById("dashboard-left-nav").classList.remove("active");
  document.getElementById("addpost-left-nav").classList.add("active");
  document.getElementById("profile-left-nav").classList.remove("active");
  document.getElementById("signout-left-nav").classList.remove("active");

  document.getElementById("my-posts").style.display = "none";
  document.getElementById("add-post").style.display = "initial";
  document.getElementById("my-profile").style.display = "none";

}

function onClickProfile() {
  document.getElementById("dashboard-top-nav").classList.remove("active");
  document.getElementById("addpost-top-nav").classList.remove("active");
  document.getElementById("profile-top-nav").classList.add("active");
  document.getElementById("signout-top-nav").classList.remove("active");

  document.getElementById("dashboard-left-nav").classList.remove("active");
  document.getElementById("addpost-left-nav").classList.remove("active");
  document.getElementById("profile-left-nav").classList.add("active");
  document.getElementById("signout-left-nav").classList.remove("active");

  document.getElementById("my-posts").style.display = "none";
  document.getElementById("add-post").style.display = "none";
  document.getElementById("my-profile").style.display = "initial";

  checkCookie(showProfile);
}

function onClickSignOut() {
  document.getElementById("dashboard-top-nav").classList.remove("active");
  document.getElementById("addpost-top-nav").classList.remove("active");
  document.getElementById("profile-top-nav").classList.remove("active");
  document.getElementById("signout-top-nav").classList.add("active");

  document.getElementById("dashboard-left-nav").classList.remove("active");
  document.getElementById("addpost-left-nav").classList.remove("active");
  document.getElementById("profile-left-nav").classList.remove("active");
  document.getElementById("signout-left-nav").classList.add("active");

  eraseCookie("token");
  window.location.href = "http://127.0.0.1:8080/main/main.html";

}


window.onload = function() {
  checkCookie(onClickDashboard);
};

