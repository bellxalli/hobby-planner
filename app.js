//Import Express
import express from 'express';

const app = express();

app.use(express.urlencoded({extended:true}));

app.set('view engine', 'ejs');

app.use(express.static('public'));

const PORT = 3000;

const users = [];

//Define a "default" route for our home page
app.get('/', (req, res) => {

    // Send our home page as a response to the client
    res.render('sign-in');
});

// CHANGE BACK TO "app.post" once connected from "create-account"
app.get('/account-created', (req, res) => {
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

// Setting up a route to "list-view" from "sign-in"
app.get('/list-view', (req, res) => {
     res.render('list-view');
});

app.listen(PORT, () => {
     console.log(`Server is running at http://localhost:${PORT}`);
 });
 