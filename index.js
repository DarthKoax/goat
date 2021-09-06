


const express = require('express')
const app = express()
const port = 4000
const fs = require('fs');


const DESTINATIONS = "./destinations/destinations.json"

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', '[*]');
  res.append('Access-Control-Allow-Methods', 'GET,POST');
  res.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ?go=%s
app.get('/', async function (req, res) {
  // console.log(`Route reached: /api/img/${atob(req.params.img)}`)
  // console.log(req.query);

  if (req.query.go) {
    // let result;
    let rawdata = fs.readFileSync(DESTINATIONS)
    let result = JSON.parse(rawdata);

    result.forEach(element => {
      console.log(element.key)
      if (element.key === req.query.go) {
        res.status(200);
        console.log(element.route)
        return res.redirect(element.route);
      }
    });
  } else {
    
    res.status(200);
    res.send("<div<p>Usage, </p> <p>'GO' = ?go=%s </p><p> 'ADD' = /add?key=%s&route=%s</p></div>")
  }
});

// /add?key=%s&route=%s
app.get('/add', async function (req, res) {
  
  if (req.query.key && req.query.route) {

    let rawdata = fs.readFileSync(DESTINATIONS)
    let result = JSON.parse(rawdata);

    let inData = {
      "key": req.query.key,
      "route": req.query.route
    }
    
    console.log(result)
    
    result.push(inData);
    
    result = JSON.stringify(result);
    // let result;
    fs.writeFileSync(DESTINATIONS,result)
    res.status(200);
    res.send("new route added");
  }
  else {
    res.status(404);
    res.send("error")
  }
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
