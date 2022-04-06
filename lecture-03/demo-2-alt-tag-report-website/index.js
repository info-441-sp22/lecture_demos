async function auditUrl(){
    let url = document.getElementById("urlInput").value

    let response = await fetch("/api/auditurl?url=" + url)
    let responseText = await response.text()

    document.getElementById("results").innerHTML = responseText
}