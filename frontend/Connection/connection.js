const baseURL = 'http://localhost:1337/api/';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoib21pZGlpaUB5YWhvby5jb20iLCJwYXNzd29yZCI6IjEyMzQ1NiIsImV4cGlyZXNJbiI6MTYxMTc0NTA2NDg4NywiaWF0IjoxNjExNzQzMjY0LCJleHAiOjMyMjM0ODgzMjh9.S0WWth_ZgDOzUIQrN2jT-Srj97fvyLwHCxf2sSWkvpA';

//import fetch from 'node-fetch';
//import * as fetch from 'node-fetch';
global.fetch = require("node-fetch");

function getPosts () {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
    fetch(baseURL + 'post', requestOptions)
    .then(response => response.json())
    .then(result => {console.log(result); return result;})
    .catch(error => console.log('error', error));
}

function signUp (email, password) {
    var myHeaders = new fetch.Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("email", email);
    urlencoded.append("password", password);

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
    };

    fetch(baseURL + 'signup', requestOptions)
    .then(response => response.json())
    .then(result => {console.log(result); return result;})
    .catch(error => console.log('error', error));
}

function signIn (email, password) {
    var myHeaders = new fetch.Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
    var urlencoded = new URLSearchParams();
    urlencoded.append("email", email);
    urlencoded.append("password", password);
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
    
    var status;
    fetch(baseURL + 'signin', requestOptions)
      .then(response => {
        status = response.statusText;
        return response;
        })

      .then(response => response.json())
      .then( result => {
          console.log(status);
          console.log(result);
          return result;
        })
      .catch(error => console.log('error', error));
}

function creatPost (postTitle, postContent, ) {
    var myHeaders = new fetch.Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append('Authorization', token);

    var urlencoded = new URLSearchParams();
    urlencoded.append("title", postTitle);
    urlencoded.append("content", postContent);

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
    };

    fetch(baseURL + 'admin/post/crud', requestOptions)
    .then(response => response.json())
    .then(result => {console.log(result); return result;})
    .catch(error => console.log('error', error));
}

function updatePost (postTitle, postContent, postId, ) {
    var myHeaders = new fetch.Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append('Authorization', token);

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
    .then(response => response.json())
    .then(result => {console.log(result); return result;})
    .catch(error => console.log('error', error));
}

function deletPost (postId) {
    var myHeaders = new fetch.Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append('Authorization', token);

    var urlencoded = new URLSearchParams();

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
    
    fetch(baseURL + 'admin/post/crud/' + postId, requestOptions)
      .then(response => response.json())
      .then(result => {console.log(result); return result;})
      .catch(error => console.log('error', error));
}

function readMyPosts () {
    var myHeaders = new fetch.Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append('Authorization', 'Bearer ' + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      
    fetch(baseURL + 'admin/post/crud/', requestOptions)
        .then(response => response.json())
        .then(result => {console.log(result); return result;})
        .catch(error => console.log('error', error));
}

function checkToken () {
  var myHeaders = new fetch.Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  //var urlencoded = new URLSearchParams();

  var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  //body: urlencoded,
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
        console.log('Nice');
        return;
      }

      console.log(result.message);
      return;

  })
  .catch(error => console.log('error', error));
}

//getPosts()
//signUp("omidii@yahoo.com", "123456")
//signIn("omidii@yahoo.com", "123456")
//creatPost("This head2", "Body2!");
//updatePost("myHeader", "New Body!!", 'UY8pkhNmTf');
//deletPost('9HMatE3CsS')
//readMyPosts()
checkToken()