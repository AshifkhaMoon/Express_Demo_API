const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // for parsing application/json
/* 
GET /HEllOWORLD
POST /HEllOWORLD


GET /Countriess
GET /Countriess/:country 
*/
function thisIsAMiddleware(req, res, next) {
    console.log('This is a middleware');
    req.foo = 'bar';
    next();
}
app.get('/helloworld',thisIsAMiddleware, (req, res) => {
    console.log('Hello World');
   console.log(req.foo);
    res.send('Hello World');
});

app.post('/helloworld', (req, res) => {
    console.log('POST/HelloWorld');
    console.log(req.body);

    res.send('Hello World');
});

app.get('/countries', (req, res) => {   
    console.log('GET /countries');

    const countries = [ 
        { name: 'India', capital: 'New Delhi' },
        { name: 'USA', capital: 'Washington DC' },
        { name: 'UK', capital: 'London' },
        { name: 'Australia', capital: 'Canberra' },
        { name: 'France', capital: 'Paris' },
        { name: 'Germany', capital: 'Berlin' },
        { name: 'Italy', capital: 'Rome' },
        { name: 'Japan', capital: 'Tokyo' },
        { name: 'China', capital: 'Beijing' },
        { name: 'Russia', capital: 'Moscow' }

    ];
    res.send(countries);

});
app.get('/countries/:country', (req, res) => {
    console.log('GET /countries/:country');
    console.log(req.params);

    res.send(`You requested data for ${req.params.country}`);
  
});





app.listen(port, () => { 
    console.log(`Server is running on port ${port}`);
});