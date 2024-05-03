import expressHandlebars from 'express-handlebars';
const handlebars = expressHandlebars.create({
	defaultLayout: 'main', 
	extname: 'hbs'
});

import express from 'express';
import { get } from 'http';
let app = express();

app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');
app.get('/', (req, res)=>{
    res.send('hello world');
})

app.get('/page/', function(req, res) {
	res.render('page', {text1: 'aaa', text2: 'bbb'});
});

app.listen(3000, ()=>{
	console.log('running');
});