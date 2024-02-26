/*Exercise 1b – HTTP Basic Middleware

Take your Exercise 1 implementation and convert it into a ExpressJS middleware. 
Then implement three API routes (GET /public, GET /httpbasic, GET/anotherhttpbasic). 
The /public route should be publicly available without HTTP Basic. The /httpbasic and 
/anotherhttpbasic routes should be protected using your HTTP Basic middleware implementation.

All routes should simply return text “Hello from ‘routename’”.
*/

const express = require('express');
const app = express();


function httpBasicMw(req, res, next){
     //step 1 check if the request has an authorization header
    const authHeader = req.get('Authorization'); 
    if(authHeader === undefined) {
        res.status(401).send('You are not authorized');
        return;
     }



    //step 2 check if the authorization header value starts with Basic

     if (!authHeader.startsWith('Basic ')) {
         res.status(401).send('You are not authorized');
            return;
        }

    //step 3 decode the base64 encoded string
     //we need to split the screen into two parts
    const splittedAuthHeader = authHeader.split(' ');
    if (splittedAuthHeader.length !== 2) {
        res.status(401).send('You are not authorized');
    }
    console.log(splittedAuthHeader);
    const base64encodedUsernamePassword = splittedAuthHeader[1];

    const decodedString = Buffer.from(base64encodedUsernamePassword, 'base64').toString('utf-8');
    console.log(decodedString);
    //step 4 split the decoded string into two parts
    const usernamePassword = decodedString.split(':');
    const username = usernamePassword[0];
    const password = usernamePassword[1];

    console.log("username :" + username +", Password : " + password);
    
    //step 5 check if the username matches hard-coded username: testuser
    if (username !== 'testuser') {
        res.status(401).send('You are not authorized');
        return;
    }

    //step 6 check if the password matches hard-coded password: testpassword
    if (password !== 'testpassword') {
        res.status(401).send('You are not authorized');
        return;
    }

   next();
};



app.get('/httpbasic',httpBasicMw, (req, res) => { 
    
    //response with tetxt "completed"
    res.status(200).send('You are authorized exercise1B completed');
});
app.get('/anotherhttpbasic',httpBasicMw, (req, res) => { 
    
    //response with tetxt "completed"
    res.status(200).send('hello from anotherhttpbasic');
});
app.get('/public', (req, res) => { 
    
    //response with tetxt "completed"
    res.status(200).send('hello from public');
});


app.listen(4000, () => {
    console.log('Server is running on port 4000');
});