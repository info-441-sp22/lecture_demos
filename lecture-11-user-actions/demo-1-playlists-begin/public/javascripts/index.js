
async function addUser(){
    let name = document.getElementById("name_input").value

    await fetch("/api/v1/users", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: name})
    })
}

async function loadUsers(){
    document.getElementById("allusersdiv").innerText = "loading..."

    // do an api call to get users
    let response = await fetch("/api/v1/users")
    let usersJson = await response.json()

    // display the info about the users
    let usersHTML = usersJson.map(userInfo =>{
        return `
        <hr>
        <div>
            <h3>Username: ${userInfo.username}</h3>
        </div>
        `
    }).join("<hr>")
    document.getElementById("allusersdiv").innerHTML = usersHTML
}