import express from 'express';
import * as path from 'path';
import bodyParser from "body-parser";
import * as router from './controllers.js';
const app = express();
const dirname = path.resolve();
const PORT = 3000;
const jsonParser = bodyParser.json();
app.use(express.static(path.join(dirname, '/public')));
app.use(jsonParser);
app.set('view engine', 'ejs');
app.set('views', path.join(dirname, '/views'));
app.get('/', (req, res) => {
    res.render(path.join(dirname, '/views/main-page.ejs'));
});
app.get('/menu-desserts', (req, res) => {
    res.render(path.join(dirname, '/views/menu-page.ejs'));
});
app.get('/menu-buns', (req, res) => {
    res.render(path.join(dirname, '/views/menu-page.ejs'));
});
app.get('/menu-drinks', (req, res) => {
    res.render(path.join(dirname, '/views/menu-page.ejs'));
});
app.get('/shop-cart', (req, res) => {
    res.render(path.join(dirname, '/views/shop-cart.ejs'));
});
app.get('/profile', (req, res) => {
    res.render(path.join(dirname, '/views/profile-page.ejs'));
});
app.route('/api/cakes').get(router.requestCakes);
app.route('/api/drinks').get(router.requestDrinks);
app.route('/api/buns').get(router.requestPastries);
app.listen(PORT, () => {
    console.log(`Server starts on port ${PORT}`);
});
