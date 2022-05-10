async function init(){
      loadItems();
}

let allItemIds = []

async function loadItems(){
    document.getElementById("allitemsdiv").innerHTML = "Loading...";

    //load items from server
    let response = await fetch("/items");
    let itemsJson = await response.json();

    allItemIds = itemsJson.map(itemInfo => itemInfo._id);

    //display users
    let itemsHTML = itemsJson.map(itemInfo => {
        return `
        <hr>
        <div>
            <h3>Item: ${itemInfo.name}</h3>
            <strong>Price: </strong>$${itemInfo.price}<br>
            <strong>How many do you want?</strong> <input type="number" id="item_num_${itemInfo._id}" value=0 /> 
        </div>`
    }).join("<hr>")

    document.getElementById("allitemsdiv").innerHTML = itemsHTML;

}

async function checkout(){
    let cartInfo = allItemIds.map(itemId => {
        return {
            itemId: itemId,
            itemCount: document.getElementById(`item_num_${itemId}`).value
        }
    })

    cartInfo = cartInfo.filter(itemInfo => itemInfo.itemCount > 0)

    let response = await fetch(
        "/items/saveCart",
        {
            method: "POST",
            body: JSON.stringify(cartInfo),
            headers: {'Content-Type': 'application/json'}
        }
    );

    //once cart is saved, redirect to the checkout page
    location.href = "/checkout.html"
}