const express = require('express');
const app = express();
const hbs = require('hbs');
const expressHbs = require('express-handlebars');
const fs = require('fs');
const path = require('path');
const addRouter = require('./routers/addRouter');
const updateRouter = require('./routers/updateRouter');


app.use('/static', express.static(path.join(__dirname,'/static')));

app.engine("hbs", expressHbs.engine(
    {
        layoutsDir: "views/layouts", 
        defaultLayout: "layout",
        extname: "hbs"
    }
));
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");
hbs.registerHelper("backButton", function(){
    return new hbs.SafeString('<button onclick="window.location.href= window.location.href.slice(0,window.location.href.indexOf(`/add`));">Отказаться</button>');
});

app.use(express.urlencoded({extended: false}));


app.use('/add', addRouter);
app.use('/update', updateRouter);

app.get('/', function(request,response){
    try{
        let data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
        response.render('mainPage.hbs',{
            title: 'Contacts',
            elements: data
        });
    } catch(error){
        console.log( `error ${error.message}`);
        const status = error.status || 400;
        response.status(status).send(error.message);
    }
});

app.post('/delete', function(request,response){
    try{
        console.log(request.query);
        let phone = request.query.phone;
        let data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
        console.log(data);
        for(let i = 0; i < data.length; i++){
            if(data[i].phone == phone){
            data.splice(i, 1);
            }
        }
        fs.writeFileSync('data.json', JSON.stringify(data));
        response.redirect('/');
    } catch(error){
        console.log( `error ${error.message}`);
        const status = error.status || 400;
        response.status(status).send(error.message);
    }
});

app.listen(3000);