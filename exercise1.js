const express = require('express');
const app = express();

app.get('/httpbasic', (req, res) => {
    //step 1 check if the request has an authorization header
    const authHeader = req.get('Authorization'); 
    if(authHeader === undefined) {
        res.status(401).send('You are not authorized');
     }



    //step 2 check if the authorization header value starts with Basic

     if (!authHeader.startsWith('Basic')) {
         res.status(401).send('You are not authorized');
     }

    //step 3 decode the base64 encoded string
     //we need to split the screen into two parts

    //step 4 split the decoded string into two parts


    //step 5 check if the username matches hard-coded username: testuser


    //step 6 check if the password matches hard-coded password: testpassword



    //step 7 if both username and password match, send a response with status code 200 and message "You are authorized"



    //response with tetxt "completed"
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
}