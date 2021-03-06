const Express = require('express');
const router = Express.Router();

const requestLogger = require('./middlewares/requestLogger');

const HomeCtrl = require('./controllers/home');
const ItemCtrl = require('./controllers/items');


module.exports = (db) => {

    const home = new HomeCtrl();
    const items = new ItemCtrl(db);
    
    router.use(requestLogger);
    router.get('/', home.getHome);
    router.get('/items', items.getItems.bind(items));
    router.post('/items', items.saveItems.bind(items));

    router.get('*', home.notFound);

    return router;
};