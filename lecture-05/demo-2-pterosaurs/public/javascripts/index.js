
async function getPterosaurs(){
    // get info from server
    let response = await fetch('api/getPterosaurs')
    let pterosaurJson = await response.json()

    let pterosaurHtml = pterosaurJson.map(onePterosaur => {
        let onePterosaurHtml = `
            <div>
                <p>${onePterosaur.Genus}</p>
                <img src="${onePterosaur.img}" />
            </div>
        `
        return onePterosaurHtml
    }).join('')

    document.getElementById('results').innerHTML = pterosaurHtml
}