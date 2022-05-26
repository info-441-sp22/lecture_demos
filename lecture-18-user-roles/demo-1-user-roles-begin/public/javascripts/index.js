let isLoggedIn = false;


async function init(){
    await loadUserInfo()
    await loadComments()
}

async function loadUserInfo(){
    let response = await fetch("api/v1/users/me")
    let responseJson = await response.json()

    if(responseJson.status == "logged in") {
        isLoggedIn = true;
    }

    document.getElementById("userInfo").innerText = JSON.stringify(responseJson)
}


async function loadComments(){
    let response = await fetch("api/v1/comments")
    let responseJson = await response.json()

    let html = responseJson.map((comment) => {
        return `
        <p>
        ${escapeHTML(comment.comment)} - ${escapeHTML(comment.username)}
        ${isLoggedIn ? 
            `<button onclick="deleteComment('${comment._id}')">delete</button>` :
            ``
        }
        </p>
        `
    }).join("")
    document.getElementById("commentsBox").innerHTML = html
}

async function postComment(){
    let comment = document.getElementById("comment_input").value
    let response = await fetch("api/v1/comments", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"comment": comment})
    })
    let responseJson = await response.json()

    loadComments()
}

async function deleteComment(commentId){
    let response = await fetch("api/v1/comments", {
        method: "DELETE",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"commentId": commentId})
    })
    let responseJson = await response.json()

    loadComments()
}


// from: https://stackoverflow.com/questions/40263803/native-javascript-or-es6-way-to-encode-and-decode-html-entities
const escapeHTML = str => str ? str.replace(/[&<>'"]/g, 
  tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag])) : "";
