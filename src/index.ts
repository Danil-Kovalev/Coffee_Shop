import express, { Express, Request, Response } from 'express';
import * as path from 'path';
import bodyParser from "body-parser";

import * as router from './controllers.js'

const app: Express = express();

const dirname: string = path.resolve();
const PORT: number = 3000;
const jsonParser = bodyParser.json();

app.use(express.static(path.join(dirname, '/public')));
app.use(jsonParser)

app.set('view engine', 'ejs');
app.set('views', path.join(dirname, '/views'))

app.get('/', (req: Request, res: Response) => {
    res.render(path.join(dirname, '/views/main-page.ejs'))
});

app.get('/menu-desserts', (req: Request, res: Response) => {
    res.render(path.join(dirname, '/views/menu-page.ejs'))
});

app.get('/menu-buns', (req: Request, res: Response) => {
    res.render(path.join(dirname, '/views/menu-page.ejs'))
});

app.get('/menu-drinks', (req: Request, res: Response) => {
    res.render(path.join(dirname, '/views/menu-page.ejs'))
});

app.get('/shop-cart', (req: Request, res: Response) => {
    res.render(path.join(dirname, '/views/shop-cart.ejs'))
});

app.get('/profile', (req: Request, res: Response) => {
    res.render(path.join(dirname, '/views/profile-page.ejs'))
});

app.route('/api/cake').get(router.requestCakes);

app.listen(PORT, () => {
    console.log(`Server starts on port ${PORT}`);
});