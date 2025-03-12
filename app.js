import express from 'express';
import mariadb from 'mariadb';
import dotenv from 'dotenv';
import validateAddHobby from './services/validation.js';
import validateSignIn from './services/sign-in-validation.js';

dotenv.config();

//Define our database credentials
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.PORT
});

async function connect() {
     try {
          const conn = await pool.getConnection();
     console.log('Connected to the database');
     return conn;
     } catch (err) {
          console.log(`Error connecting to the database ${err}`);
     }

}

const app = express();

app.use(express.urlencoded({extended:true}));

app.set('view engine', 'ejs');

app.use(express.static('public'));

const PORT = process.env.APP_PORT || 3000;

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
app.post('/account-created', async (req, res) => {

     const user = {
          username: req.body.username,
          password: req.body.password
     }

     //validation
     const result = validateSignIn(user);

     if (!result.isValid) 
     {
          console.log(result.errors);
          res.send(result.errors);
          return;
     }

     // NOT WORKING, NEED TO FIX:
     // const conn = await connect();

     // const insertQuery = await conn.query(
     //      `INSERT INTO userProfile (userName, userPassword) VALUES (?, ?);`, 
     //      [user.username, user.password]);

     users.push(user)
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
app.post('/hobby-added', async (req, res) => {
     const plan = {
          title: req.body.title,
          description: req.body.description,
          tagName: req.body.tagName,
          tagColor: req.body.tagColor,
          availStartDateTime: req.body.dueDate + " " + req.body.startTimer,
          availEndDateTime: req.body.dueDate + " " + req.body.endTimer
     };

     //validation
     const result = validateAddHobby(plan);
     if (!result.isValid) 
     {
          console.log(result.errors);
          res.send(result.errors);
          return;
     }     

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
 