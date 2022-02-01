///////////////////////////////////////////////////////////////////
// load the express package and create our app
var express = require('express');
var app     = express();
const PORT = process.env.PORT || 8080;
// set the port based on environment (more on environments later)
var port    = PORT;

app.route('/login')
  // show the form (GET http://localhost:PORT/login)
    .get(function(req, res) {
    res.send('this is the login form');
  })
  // process the form (POST http://localhost:PORT/login)
    .post(function(req, res) { console.log('processing');
    res.send('processing the login form!');
  });

// send our index.html file to the user for the home page
app.get('/', function(req, res) {
     res.sendFile(__dirname + '/myWebPage.html');
});

///////////////////////////////////////////////////////////////////
// create routes for the admin section
//get an instance of the router
var adminRouter = express.Router();
///////////////////////////////////////////////////////////////////
// route middleware that will happen on every request
  adminRouter.use(function(req, res, next) {
    // log each request to the console
    console.log(req.method, req.url);
    console.log("Its middleware!!!");
    // continue doing what we were doing and go to the route
    next(); });
///////////////////////////////////////////////////////////////////


// admin main page. the dashboard (http://localhost:PORT/admin)
adminRouter.get('/', function(req, res) {
  res.send('I am the dashboard!'); });
// users page (http://localhost:PORT/admin/users)
adminRouter.get('/users', function(req, res) {
  res.send('I show all the users!'); });

// route middleware to validate :name
adminRouter.param('name', function(req, res, next, name) {  // do validation on name here  // log something so we know its working
  console.log('doing name validations on ' + name);  // once validation is done save the new item in the req  req.name = name;  // go to the next thing   next();
});


// route with parameters (http://localhost:PORT/admin/users/:name) 
adminRouter.get('/users/:name', function(req, res) {  res.send('hello ' + req.params.name + '!'); }); 

// posts page (http://localhost:PORT/admin/posts)
adminRouter.get('/posts', function(req, res) {
  res.send('I show all the posts!'); });


// apply the routes to our application
app.use('/admin', adminRouter); 
///////////////////////////////////////////////////////////////////


// start the server
app.listen(PORT);
console.log('Express Server running at http://127.0.0.1:'.PORT);
///////////////////////////////////////////////////////////////////
