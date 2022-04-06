async function pluralizeWord(){
    let inputWord = document.getElementById("wordInput").value

    let response = await fetch("pluralize?word=" + inputWord)
    let resultText = await response.text()

    document.getElementById("results").innerHTML = resultText
}