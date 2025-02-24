//Import Express
import express from 'express';

const app = express();

app.use(express.urlencoded({extended:true}));

app.set('view engine', 'ejs');

app.use(express.static('public'));

const PORT = 3000;

const orders = [];

//Define a "default" route for our home page
app.get('/', (req, res) => {

    // Send our home page as a response to the client
    res.render('sign-in');
});

// Setting up a route to "list-view" from "sign-in"
app.get('/list-view', (req, res) => {
     res.render('list-view');
});

app.listen(PORT, () => {
     console.log(`Server is running at http://localhost:${PORT}`);
 });
 