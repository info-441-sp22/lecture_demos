async function uploadData(){
    let first_name = document.getElementById("first_name_input").value
    let last_name = document.getElementById("last_name_input").value
    let favorite_ice_cream = document.getElementById("favorite_ice_cream").value
    
    let myData = {
        first_name: first_name,
        last_name: last_name,
        favorite_ice_cream: favorite_ice_cream
    }

    console.log(myData)

    //send myData to the server
    let response = await fetch("users/addUserData", {
        method: "POST",
        body: JSON.stringify(myData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

async function loadUsers(){
    let response = await fetch("users/getUserData")
    let userJson = await response.json()

    document.getElementById("results").innerHTML = JSON.stringify(userJson)
}