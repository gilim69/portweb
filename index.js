let data;
import expressHandlebars from 'express-handlebars';
const handlebars = expressHandlebars.create({
	defaultLayout: 'main', 
	extname: 'hbs'
});

import express from 'express';
let app = express();
let ank = [];
data = [
//0:
[],
//1: ank 1
[
	//0:radio 1
	[
		'по телефону',
		'через своего лечащего врача',
		'при личном обращении в регистратуру',
		'другое:',
	],
	//1:radio 2
	[
		'более 14 календарных дней',
		'7-14 календарных дней',
		'4-6 календарных дней',
		'1-3 календарных дня',
		'другое:',
	]
],
//2: ank 2
[
	//0: select 1
	[
		[4, 'КО-1       Кардиологическое отделение №1'],
		[12, 'КО-2       Кардиологическое отделение №2'],
		[20, 'КО-3       Кардиологическое отделение №3'],
		[28, 'ОМР        Отделение медицинской реабилитации взрослых для пациентов с соматическими заболеваниями'],
		[44, 'КДО        Кардиологическое (детское) отделение)'],
		[54, 'КХО-1      Кардиохирургическое отделение №1 (детское)'],
		[66, 'КХО-2      Кардиохирургическое отделение №2 (взрослое)'],
		[77, 'КХО-3      Кардиохирургическое отделение №3'],
		[86, 'ОРМДиЛ-1   Отделение рентгенохирургических методов диагностики и лечения №1'],
		[99, 'ОРМДиД-2   Отделение рентгенохирургических методов диагностики и лечения №2'],
		[109, 'ОХЛСНРСиЭК Отделение хирургического лечения сложных нарушений ритма сердца и электрокардиостимуляции'],
		[121, 'ОСХ        Отделение сосудистой хирургии'],
		[147, 'ОАР-1      Отделение анестезиологии-реанимации №1 (детское)'],
		[157, 'ОАР-2      Отделение анестезиологии-реанимации №2 (взрослое)'],
	],
	//1: radio 1
	[
		'Да',
		'Нет',
	],
	//2: radio 2
	[
		'Да',
		'Нет',
		'Обезболивание не проводилось',
	],
	//3: radio 3
	[1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
	//4: radio 4
	[
		'Легко',
		'Скорее легко',
		'Скорее сложно',
		'Сложно',
		'Затрудняюсь ответить',
	]
],
]; //end

import bodyParser from 'body-parser';
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'))

app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');
app.get('/', (req, res)=>{
    res.send('What do you want here?');
})

app.get('/ank/:id', function(req, res) {
	let id = req.params.id;
	res.render('ank'+id, {
				helpers: {
					setTag: function(tagname, name, ind) {
						let s = '';
						let i = 1;
						let sel = ' selected';
						let ch = ' checked';
						let br = '<br>';
						let lab = ' lab';
						let dd = data[id][ind];
						if (tagname.toUpperCase()=='SELECT') {
							s += '<select class="form-select form-select-sm" name="' + name; 
							s += '" value="1" id="' + name + '">';
							for (let d of dd) {
								s += '<option value="' + d[0] + '"' + sel + '>' + d[1] + '</option>';
								sel = '';
								i++;
							}
							s += '</select>'
						} else if (tagname.toUpperCase()=='COL' || tagname.toUpperCase()=='ROW') {
							if (tagname.toUpperCase()=='ROW') {br = '&nbsp'; lab = ''};
							for (let d of dd) {
								if (dd.length>9) {if (i==10) {ch = ' checked'} else {ch=''}};
								s += '<input class="btn-check" type="radio" name="' + name + '" ';
								s += 'value="' + i + '" id="' + name + '_' + i;
								s += '"' + ch + '><label class="btn btn-outline-success btn-sm' + lab + '" for="' + name + '_' + i + '">';
								s += d + '</label>' + br;
								ch = '';
								i++;
							}
						};
						return s;
					}
				}
		});
});

app.post('/ank_new/:id', (req, res) => {
        console.log(req.params)
        let rec = req.body;
        rec['dt'] = new Date();
        rec['mod'] = 'Ank' + req.params.id
	ank.push(rec);
	console.log(ank);
	res.render('ank_new', {fio:req.body.fio});
});

app.get('/get_ank', (req, res) => {
	console.log('get_ank OK');
	res.send(ank);
	ank = [];
});
app.get('/gett', (req, res) => {
        console.log('gett');
	res.send(ank);
});


app.listen(3000, ()=>{
	console.log('running');
});