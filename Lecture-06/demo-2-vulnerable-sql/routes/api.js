import express from 'express';
var router = express.Router();

/* GET users listing. */
router.get('/person', function(req, res, next) {
  let nameSearch = req.query.nameSearch;
  nameSearch = nameSearch ? nameSearch : "" // make sure it is at least an empty string 
  
  //query the database for names that match the nameSearc
  req.db.all(`SELECT * FROM people WHERE first_name = "${nameSearch}"`, 
    (err, allRows) => {
        if(err) {
            console.log("db error: " + err)
            res.send("db error: " + err)
            return
        }
        if(!allRows){
            res.send("")
            return;
        }
        let matching_names = allRows.map(row => {
            return `${row.first_name} ${row.last_name}`
        }).join("\n")
        res.send(matching_names)
  })
});

export default router;
