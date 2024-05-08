var http = require('http');
var ank = []
var htmlbeg = `<!DOCTYPE html>
    <html>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <head>
    <meta charset="UTF-8">
    </head>
    <body>`
var htmlend = `</body></html>`

http.createServer(async (request, response) => {
    var url = request.url;
    var text = '';
	if (url != '/favicon.ico') {
        if (url == '/get_ank') {
            text = ank;
        } 
        else if (url == '/ank/1') {
text = htmlbeg +
`<form action="/ank_new" method="POST">
            <img src="/logo.png">
            <hr>
        <h5 style="text-align:center">Анкета для оценки качества условий оказания услуг в ГБУЗ РКЦ в амбулаторных условиях</h5>
            <ol>
                <li>Ваши Ф.И.О. <input class="inp" type="text" name="fio" style="width:100%"></li>
                <li>Место проживания (укажите город, район РБ): 
                    <input class="inp" type="text" name="locate" style="width:100%"></li>
                <li>Дата обращения в поликлинику: <input class="inp" type="date" name="date"></li>
                <li onclick="setOther()">Вы записались на прием к врачу:<br>
                    <input class="btn-check" type="radio" name="radio1" value="1" id="radio11" checked> 
                        <label class="btn btn-outline-success btn-sm lab" for="radio11">по телефону</label><br>
                    <input class="btn-check" type="radio" name="radio1" value="2" id="radio12">
                        <label class="btn btn-outline-success btn-sm lab" for="radio12">через своего лечащего врача</label><br>
                    <input class="btn-check" type="radio" name="radio1" value="3" id="radio13">
                        <label class="btn btn-outline-success btn-sm lab" for="radio13">при личном обращении в регистратуру</label><br>
                    <input class="btn-check" type="radio" name="radio1" value="4" id="radio14">
                        <label class="btn btn-outline-success btn-sm lab" for="radio14">другое:</label>
                            <input class="inp" type="text" name="other1" id="other1" style="width:100%">
                </li>
                <li onclick="setOther()">Срок ожидания приема врача, к которому Вы записались, с момента записи:<br> 
                    <input class="btn-check" type="radio" name="radio2" value="1" id="radio21" checked>
                        <label class="btn btn-outline-success btn-sm lab" for="radio21">более 14 календарных дней</label><br>
                    <input class="btn-check" type="radio" name="radio2" value="2" id="radio22">
                        <label class="btn btn-outline-success btn-sm lab" for="radio22">7-14 календарных дней</label><br>
                    <input class="btn-check" type="radio" name="radio2" value="3" id="radio23">
                        <label class="btn btn-outline-success btn-sm lab" for="radio23">4-6 календарных дней</label><br>
                    <input class="btn-check" type="radio" name="radio2" value="4" id="radio24">
                        <label class="btn btn-outline-success btn-sm lab" for="radio24">1-3 календарных дня </label><br>
                    <input class="btn-check" type="radio" name="radio2" value="5" id="radio25">
                        <label class="btn btn-outline-success btn-sm lab" for="radio25">другое:</label>
                            <input class="inp" type="text" name="other2" id="other2" style="width:100%">
                </li>
                </ol>	
                <hr>
                <button type="submit" class="btn btn-primary submitbutton"> Отправить данные </button>
        </form>
        
        <script>
            window.addEventListener("load", ()=>{
                if (document.getElementById("radio14").checked)
                    document.getElementById("other1").style.display = 'block'
                else
                    document.getElementById("other1").style.display = 'none'
        
                if (document.getElementById("radio25").checked)
                    document.getElementById("other2").style.display = 'block'
                else
                    document.getElementById("other2").style.display = 'none'
            });
            
            const setOther=()=>{
                console.log("dsfsfsf", event.target);
                if (document.getElementById("radio14").checked)
                    document.getElementById("other1").style.display = 'block'
                else
                    document.getElementById("other1").style.display = 'none';
        
                if (document.getElementById("radio25").checked)
                    document.getElementById("other2").style.display = 'block'
                else
                    document.getElementById("other2").style.display = 'none';
            }
        </script>
        
        <style>
            #other1, #other2 {
                display: none;
            }
            form {
                width: 100%;
                max-width: 480px;
                margin-left: auto;
                margin-right: auto;
                font-family:Arial, Helvetica, sans-serif;
                border: 1px solid;
                border-radius: 12px;
                box-shadow: 4px 4px 4px;
                padding: 12px;
            }
            ol {
                width: 94%;
                margin-left: -12px;
            }
            ol li {
                padding-top: 12px;
            }
        
            h4 {
                margin-left: auto;
                margin-right: auto;		
            }
            .submitbutton {
                width: 80%;
                margin-left: 10%;
            }
        
            img {
                width: 100%;
            }
        
            .lab {
                padding: 3px;
                width: 80%;
                margin: 3px auto;
            }
            .inp {
                color:blue;
                font-style: italic;
            }
        </style>
` + htmlend;
        } 
        else if (url == '/ank_new') {
            request.setEncoding('utf8');
            var data = '';
            request.on('data', function(chunk) {
                data += chunk.toString();
            });
            request.on('end', function() {
                ank.push(data);
            });  
            ank.push(data);         
            console.log(ank);
text = htmlbeg +
`
<div class="new-ank">
    <img src="/logo.png">
    <hr>
    <h4>Уважаемый <i>{{fio}}</i>!</h4>
    <br>
    <h6>Благодарим Вас за предоставленную информацию. <br>Надеемся, она поможет нам улучшить качество наших услуг.</h6>
    <br>
    <hr>
    <a href="https://bashcardio.ru/">На сайт ГБУЗ РКЦ</a>
</div>

<style>
    .new-ank {
        margin-left: auto;
        margin-right: auto;
        width: 100%;
        max-width: 480px;
        border-radius: 12px;
        border: 1px solid;
        box-shadow: 4px 4px 4px;
        padding: 18px;
    }

    img {
        width: 100%;
    }
</style>` + htmlend;
        } 
        else {
            text = 'What are you doing here?'
        };

		response.writeHead(200, {'Content-Type': 'text/html'});
		response.write(text);
		response.end();
	}
}).listen(3000);