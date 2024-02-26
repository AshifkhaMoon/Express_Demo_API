/*Create a new express based server, 
create one route (GET /httpbasic) into it and
 use HTTP Basic security scheme in your route.
  Implement the HTTP Basic on your own without 
  ready libraries except for base64 decoding (see Encoding and Decoding 
    Base64 Strings in Node.js (stackabuse.com) for decoding base64 strings).

Validate that your implementation works correctly. Use for example this service to create username&password 
in base64 format: Base64 Encode and Decode - Online

Send requests with Postman, Thunderclient etc. to your server.

- When the username does not match

- When the password is not correct

- When both of them are correct, return the content of the route


*/
const express = require('express');
const app = express();

app.get('/httpbasic', (req, res) => {
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

    //step 7 if both username and password match, send a response with status code 200 and message "You are authorized"
    //response with tetxt "completed"
    res.status(200).send('You are authorized exercise completed');
});


app.listen(4000, () => {
    console.log('Server is running on port 4000');
});