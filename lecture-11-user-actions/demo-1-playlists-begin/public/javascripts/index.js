
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
            <h3>Username: ${userInfo.username} <button onclick="deleteUser('${userInfo._id}')">Delete</button></h3>
            <strong>Favorite Bands: </strong> ${userInfo.favorite_bands.join(', ')} <br>
            <strong>Add Band: </strong> <input type="text" id="add_band_text_${userInfo._id}" />
            <button onclick="addBand('${userInfo._id}')">Add Band</button>
            <h3>Playlists</h3>
            <div id="playlist_div_${userInfo._id}"></div>
            <h3>Add Playlist</h3>
            <strong>Title: </strong> <input type="text" id="add_playlist_title_text_${userInfo._id}" /><br>
            <strong>Songs: </strong> <input type="text" id="add_playlist_songs_text_${userInfo._id}" /><br>
            <button onclick="addPlaylist('${userInfo._id}')">Add Playlist</button>
        </div>
        `
    }).join("<hr>")
    document.getElementById("allusersdiv").innerHTML = usersHTML

    usersJson.forEach(userInfo => {
        loadPlaylistsForUser(userInfo._id)
    })
}

async function loadPlaylistsForUser(userId){
    let response = await fetch("/api/v1/playlists?userId="+userId)
    let playlists_info = await response.json()

    let playlistHTML = playlists_info.map(playlistInfo => {
        return `
        <div>
            <h4>Playlist: ${playlistInfo.title}</h4>
            <strong>Songs: </strong> ${playlistInfo.songs}
        </div>`
    }).join("")

    document.getElementById("playlist_div_" + userId).innerHTML = playlistHTML
}

async function addBand(userId){
    let bandToAdd = document.getElementById('add_band_text_' + userId).value

    await fetch('/api/v1/users/bands', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            userId: userId,
            band: bandToAdd
        })
    })
}

async function addPlaylist(userId){
    let title = document.getElementById("add_playlist_title_text_" + userId).value
    let songs = document.getElementById("add_playlist_songs_text_" + userId).value
    
    await fetch('/api/v1/playlists', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            title: title,
            songs: songs,
            userId: userId
        })
    })
}

async function deleteUser(userId){
    await fetch('/api/v1/users', {
        method: "DELETE",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userId: userId})
    })
}