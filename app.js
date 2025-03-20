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
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
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
//const plans = [];
const setUser  = [];


//Define a "default" route for our home page
app.get('/', (req, res) => {

    // Send our home page as a response to the client
    res.render('home');
});

// Define a route for creating an account
app.get('/create-account', (req, res) => {
     res.render('create-account');
});

// Define confirmation for account creation
app.post('/account-created', async (req, res) => {

     console.log(req.body);

     const user = {
          username: req.body.username,
          password: req.body.password
     }

     //validation
     const result = validateSignIn(user);
     if (!result.isValid) 
     {
          console.log(result.errors);
          // res.render('home', { errors: errors }
          res.send(result.errors);
          return;
     }

     const conn = await connect();

     const insertQuery = await conn.query(`INSERT INTO userProfile (userName, userPassword) VALUES (?, ?);`, [user.username, user.password]);

     users.push(user)
     // Send "account-created" page
     res.render('account-created', { user });
});

// Define confirmation for sign in
app.post('/logged-in', async  (req, res) => {
     const user = {
          username: req.body.username,
          password: req.body.password
     }

     // Validation
     const result = validateSignIn(user);
     if (!result.isValid) 
     {
          console.log(result.errors);
          // res.render('home', { errors: errors }
          res.send(result.errors);
          return;
     }

     const conn = await connect();
     const verifyQuery  = await conn.query("Select userName FROM userProfile WHERE userName = ? AND userPassword = ?", [user.username, user.password]);
    
     if (verifyQuery[0] === undefined)
     {
          // Is not in the Database
          console.log("False");
          res.send("This is not a Username and/or Password. Try again, or make a new account."); // Use Validation to handle
     }
     else
     {
          // Is in the Database
          console.log("True");
          setUser.push(user.username);
     }

     res.render('logged-in', { user })
});

// Setting up a route to "list-view" from the home page
app.get('/list-view', async (req, res) => {     
     const conn = await connect();
     const plans = await conn.query('SELECT title, itemDescription FROM hobbyItem WHERE userName = ?', [setUser[0]]);

     res.render('list-view', { plans });
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
          //tagName: req.body.tagName,
          tagColor: req.body.tagColor,
          availStartDateTime: req.body.dueDate + " " + req.body.startTimer,
          availEndDateTime: req.body.dueDate + " " + req.body.endTimer
     };

     //validation
     const result = validateAddHobby(plan);
     if (!result.isValid) 
     {
          console.log(result.errors);
          // res.render('home', { errors: errors }
          res.send(result.errors);
          return;
     }
     
     const conn = await connect();

     console.log(setUser[0]);
     console.log(plan);

     const insertHobby = await conn.query(`INSERT INTO hobbyItem (userName, title, itemDescription, tagColor, availDateTimeStart, availDateTimeEnd) VALUES (?, ?, ?, ?, ?, ?);`, [setUser[0], plan.title, plan.description, plan.tagColor, plan.availStartDateTime, plan.availEndDateTime]);

     res.render('hobby-added');
});

// Setting up a route to the profile page
app.get('/profile', (req, res) => {
     res.render('profile', {setUser});
});

app.listen(PORT, () => {
     console.log(`Server is running at http://localhost:${PORT}`);
 });
 