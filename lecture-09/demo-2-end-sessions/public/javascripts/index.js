async function login(){
    let username = document.getElementById("username_input").value
    let password = document.getElementById("password_input").value
    let loginData = {
        username: username,
        password: password
    } 
    let response = await fetch(
        "/users/login",
        {
            method: "POST",
            body: JSON.stringify(loginData),
            headers: {
                'Content-Type': 'application/json'
              }
        }
    );
    let responesText = await response.text();
    document.getElementById("results").innerText = responesText;
}