import express from 'express';
import { promises as fs } from 'fs';

var router = express.Router();

/* GET users listing. */
router.get('/getPterosaurs', async function(req, res, next) {
    const data = await fs.readFile("data/pterosaur.json")
    let pterosaurInfo = JSON.parse(data)

    //delete ones without images
    let filteredPterosaurInfo = pterosaurInfo.filter(onePterosaur => {
        if(onePterosaur.img && onePterosaur.img != ""){
            return true
        } else {
            return false
        }
    })

    res.json(filteredPterosaurInfo)
});

export default router;
