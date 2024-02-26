/*Exercise 2

Create a new express based server, create one route into it and 
use JWT security scheme in your route to protect it.

For this to work you need another route which is used to create the JWT
*/

const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const jwtStrategy = passportJWT.Strategy;
const extractJWT = passportJWT.ExtractJwt;
const SUPERSECRETKEY = 'secretkey';

const jwtOptions = {
    jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: SUPERSECRETKEY
};
passport.use(new jwtStrategy(jwtOptions, function(jwt_Payload, done) { 
    //here i can do whatever i want with the payload
    //the token is valid
    console.log('this is the payload: ', jwt_Payload);
    console.log('token is valid');

    // when you are ready, call the done function with the payload as argument
    //for example,find the user information from the database
    //and pass it to the route handler
     const userInformationExample = {
        email: 'example@example',
        username: 'example',
        address: 'example street 123',
        id : 123

     };
    done(null, userInformationExample);
}));


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

function validateJWT(req,res,next){
const authHeader = req.get('Authorization');
console.log(authHeader);

}


app.get('/login',httpBasicMw, (req, res) => { 
    //create a jwt token
      const jsonwebtoken = jwt.sign({
        username: 'testuser',
        someotherdata: 'someotherdata',
        userId: 123,
      }, SUPERSECRETKEY);

    //send the jwt token in the response
    res.status(200).json({
        token: jsonwebtoken
    });
});
app.get('/jwtProtectedRoute',
 passport.authenticate('jwt', { session: false }),
  (req, res) => { 
    // at the moment we are sure that the jwt is valid because the validateJWT middleware has been executed
     

    //now we can send the protected resource
    console.log('hello from jwtProtectedRoute');
    
    //the user information is available in the req.user 
    console.log('user information:', req.user);
    
    //response with tetxt "completed"
    res.status(200).send('hello from jwtProtectedRoute');
});
app.get('/public', (req, res) => { 
    
    //response with tetxt "completed"
    res.status(200).send('hello from public');
});


app.listen(4000, () => {
    console.log('Server is running on port 4000');
});