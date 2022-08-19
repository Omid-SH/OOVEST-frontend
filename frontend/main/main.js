const baseURL = 'http://localhost:1337/api/';

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


function getPosts () {

  var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
  fetch(baseURL + 'post', requestOptions)
  .then(response => response.json())
  .then(result => {
    var posts = result.posts;
    var postHtml = "";
    posts.forEach( function(post) {
      //console.log(post);
      //console.log(postItem(post.id, post.title, post.body, post.created_by, post.created_at));
      postHtml += (postItem(post.id, post.title, post.content, post.created_by, post.created_at));
    });
    document.getElementById("posts-div").innerHTML = postHtml;
  })
  .catch(error => console.log('error', error));
}

const postItem = (id, title, body, createdBy, createdAt) => `
<div  class="col-12 col-md-6 p-3">
  <div class="card">
      <div class="card-header ">
        ID : ${id}
      </div>
      <div class="card-body text-center">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${body}</p>
      </div>
      <div class="card-footer text-muted">
        Created by : ${createdBy}
        </br>
        Created at : ${createdAt}
      </div>
    </div>
  </div>
</div>
`;

function checkToken () {

  token = getCookie("token");
  console.log(token);

  if(token == null) {
    return;
  }

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
        document.getElementById("button-login").style.display = "none";
        document.getElementById("button-signup").style.display = "none";

        document.getElementById("button-name").innerHTML = result.id;
        document.getElementById("button-name").style.display = "flex";

        result.id
        return;
      }

      console.log(result.message);
      return;

  })
  .catch(error => console.log('error', error));
}

window.onload = (event) => {
  getPosts();
  checkToken();
};