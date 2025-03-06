//Import Express
import express from 'express';
// import mariadb from 'mariadb';
//import dotenv from 'dotenv';

// dotenv.config();

// //Define our database credentials
// const pool = mariadb.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     port: process.env.PORT
// });


const app = express();

app.use(express.urlencoded({extended:true}));

app.set('view engine', 'ejs');

app.use(express.static('public'));

const PORT = 3000;

const users = [];
const plans = [];


//Define a "default" route for our home page
app.get('/', (req, res) => {

    // Send our home page as a response to the client
    res.render('home');
});

// Define a route for creating an account
app.get('/create-account', (req, res) => {
     res.render('create-account');
})

// CHANGE BACK TO "app.post" once connected from "create-account"
app.post('/account-created', (req, res) => {
     // Testing verification
     console.log(req.body);

     const user = {
          username: req.body.username,
          password: req.body.password
     }

     // Add the user to the users database
     users.push(user);
     console.log(users);

     // Send "account-created" page
     res.render('account-created', { user });
});

// Setting up a route to "list-view" from the home page
app.get('/list-view', (req, res) => {
     res.render('list-view', {plans});
});

// Defining a route to add a new hobby to the list
app.get('/create-hobby', (req, res) => {
     res.render('create-hobby');
});
// Defining a route to confirm the posted hobby
app.post('/hobby-added', (req, res) => {
     const plan = {
          title: req.body.title,
          description: req.body.description,
          tagName: req.body.tagName,
          tagColor: req.body.tagColor,
          availStartDateTime: req.body.dueDate + " " + req.body.startTimer,
          availEndDateTime: req.body.dueDate + " " + req.body.endTimer
     };

     console.log(plan);
     plans.push(plan);

     res.render('hobby-added', {plans});
});

// Setting up a route to the profile page
app.get('/profile', (req, res) => {
     res.render('profile');
});

app.listen(PORT, () => {
     console.log(`Server is running at http://localhost:${PORT}`);
 });
 