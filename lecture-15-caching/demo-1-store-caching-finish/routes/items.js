import cache from 'memory-cache'
import express from 'express';
var router = express.Router();

// artifically slow down getting the items from the database
// to pretend that it is a really difficult query, so that
// we can see the benefits of caching
async function getItemsSlow(req){
    let allItems = await req.models.Item.find()

    //add a pause
    let sleepSeconds = 5
    await new Promise(r => setTimeout(r, sleepSeconds * 1000))

    return allItems
}



router.get('/', async (req, res, next) => {

    console.log("got a request, first look it up in the cache")
    let allItems = cache.get('allItems')
    if(allItems){
        console.log("found items in the cache!")
    } else{
        console.log("cache miss, doing the slow db lookup")
        allItems = await getItemsSlow(req)
        console.log("found items in db, saving to cache")
        cache.put('allItems', allItems, 30*1000)
    }

    // set chaching rule for browser
    //res.set("Cache-Control", "public, max-age=30")
    res.json(allItems)
})

router.post('/saveCart', async (req, res, next) => {
    // req body looks like : [{itemId: "627ae955fc690f153636d564", itemCount: "3"},…]
    let cartInfo = req.body

    console.log("saving cart session: ", cartInfo)
    req.session.cartInfo = JSON.stringify(cartInfo)
    console.log("session is now: ", req.session)

    res.json({status: "success"})
})

async function addPricesToCart(cartInfoText, models){
    if(!cartInfoText) {
        return []
    }

    let cartInfoJson = JSON.parse(cartInfoText)
    // should be object with item _id and itemCount

    //look up all items listed in my cart
    let cartItemIds = cartInfoJson.map(cartItem => cartItem.itemId)
    let itemsInfo = await models.Item.find().where('_id').in(cartItemIds).exec()

    //make itemsInfo look-upable by the id
    let itemsInfoById = {}
    itemsInfo.forEach(itemInfo =>{
        itemsInfoById[itemInfo._id] = itemInfo
    })

    //take the cart Info, and for each item, add the name and price
    let combinedCartInfo = cartInfoJson.map(cartItem => {
        cartItem.price = itemsInfoById[cartItem.itemId].price
        cartItem.name = itemsInfoById[cartItem.itemId].name
        return cartItem
    })

    return combinedCartInfo//cart with prices attached
}

router.get('/getCart', async (req, res, next) => {
    let combinedCartInfo = await addPricesToCart(req.session.cartInfo, req.models)

    res.json(combinedCartInfo)
})

async function calculateOrderAmount(cartInfoText, models){
    let combinedCartInfo = await addPricesToCart(cartInfoText, models)

    let totalCost = combinedCartInfo
        .map(item => item.price * item.itemCount)
        .reduce((prev, curr) => prev + curr)
    return totalCost
}

router.post('/create-payment-intent', async (req, res, next) => {
    let orderAmount = await calculateOrderAmount(req.session.cartInfo, req.models)
    console.log("creating payment intent for: " + orderAmount)

    //create a PaymentIntent object with order amount
    const paymentIntent = await req.stripe.paymentIntents.create({
        amount: orderAmount * 100,
        currency: "usd", // it actually does values in cents, so muliply dollars by 100
        automatic_payment_methods: {
            enabled: true,
        }
    })
    // send back the client_secret of that PaymentIntent object
    res.send({
        clientSecret: paymentIntent.client_secret
    })
})

export default router;
