import express from 'express';

const app = express;
const PORT = 3000;

app.request(express.urlencoded({ extended: true}));
app.request(express.static('public'));

app.get('/', (req, res) => {
     res.render('home');
});

app.listen(PORT, () => {
     console.log(`Server is running at http://localhost:${PORT}`);
});