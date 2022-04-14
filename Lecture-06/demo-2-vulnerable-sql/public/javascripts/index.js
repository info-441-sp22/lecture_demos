async function personSearch(){
    document.getElementById("results").innerText = "Loading...";
    let nameSearch = document.getElementById("nameSearchBox").value
    try{
        let personResponse = await fetch("/api/person?nameSearch=" + nameSearch)
        let people = await personResponse.text();

        document.getElementById("results").innerText = people;
    } catch(error) {
        document.getElementById("results").innerText = "there was an error" + error;
    }
}
