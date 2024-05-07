import expressHandlebars from 'express-handlebars';
const handlebars = expressHandlebars.create({
	defaultLayout: 'main', 
	extname: 'hbs'
});

import express from 'express';
let app = express();
let ank = []

import bodyParser from 'body-parser';
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'))

app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');
app.get('/', (req, res)=>{
    res.send('What do you want here?');
})

app.get('/ank/:id', function(req, res) {
	res.render('ank'+req.params.id);
});

app.post('/ank_new', (req, res) => {
	ank.push(req.body);
	console.log(ank);
	res.render('ank_new', {fio:req.body.fio});
});

app.get('/get_ank', (req, res) => {
	console.log('get_ank OKKKK');
	res.send(ank);
	//ank = [];
});

app.listen(3000, ()=>{
	console.log('running');
});