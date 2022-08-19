const baseURL = 'http://localhost:1337/api/';

function setCookie(name,value,hours) {
    var expires = "";
    if (hours) {
        var date = new Date();
        date.setTime(date.getTime() + (hours*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    console.log(name + "=" + (value || "")  + expires + "; path=/");
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function signIn (email, password) {
    var myHeaders = new Headers();
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
          
          if(status == "OK") {
            var token = result.message.token;
            token = token.slice(7);

            eraseCookie("token");
            setCookie("token", token, 0.5);
            console.log(token);

            window.location.href = "http://127.0.0.1:8080/dashboard/dashboard.html";
            return;
          }

        })
      .catch(error => console.log('error', error));
}

function signUp (email, password) {
    //var myHeaders = new Headers();
    //myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("email", email);
    urlencoded.append("password", password);

    var requestOptions = {
    method: 'POST',
    //headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
    };

    var status;
    fetch(baseURL + 'signup', requestOptions)
    .then(response => {
        status = response.statusText;
        return response;
        })  

    .then(response => response.json())
    .then( result => {
        console.log(status);
        console.log(result);
        
        if(status == "Created") {
            signIn(email, password);
            return;
        }

        document.getElementById("error-text-area").innerHTML = result.message;
        document.getElementById("error-text-area").style.display = "initial";
        document.getElementById("submitId").disabled = false;
        return;

    })
    .catch(error => console.log('error', error));
}



function submitSignUp () {
    console.log("Submited!");
    var email = document.getElementById("emailId").value;
    var password = document.getElementById("passwordId").value;
    document.getElementById("submitId").disabled = true;
    console.log(email);
    console.log(password);
    signUp(email, password);
}