const express = require('express');
const app = express();
const hbs = require('hbs');
const expressHbs = require('express-handlebars');
const fs = require('fs');
const path = require('path');

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
const urlencodedParser = express.urlencoded({extended: false});
app.use(urlencodedParser);
hbs.registerHelper("backButton", function(){
    return new hbs.SafeString('<button onclick="window.location.href= window.location.href.slice(0,window.location.href.indexOf(`/add`));">Отказаться</button>');
});

app.get('/', function(request,response){
    let data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
    response.render('mainPage.hbs',{
        title: 'Contacts',
        elements: data
    });
});

app.get('/add', function(request,response){
    let data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
    response.render('addPage.hbs',{
        isDisable: true,
        title: 'Add contact',
        elements: data
    });
});

app.post('/add', function(request,response){
    let data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
    for(let i = 0; i < data.length; i++){
        if(data[i].phone == request.body.phone){
            response.redirect('/');
            return;
        }
    }
    data.push({name: request.body.name, phone: request.body.phone});
    fs.writeFileSync('data.json', JSON.stringify(data));
    response.redirect('/');
});

app.get('/update', function(request,response){
    let data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
    let phone = request.query.phone;
    console.log(phone)
    for(let i = 0; i < data.length; i++){
        if(data[i].phone ==  phone){
            response.render('updPage.hbs',{
                isDisable: true,
                title: 'Update contact',
                elements: data,
                contactsName: data[i].name,
                contactsPhone: data[i].phone
            });
            return;
        }
    }
});

app.post('/update', function(request,response){
    console.log(request.body);
    let data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
    for(let i = 0; i < data.length; i++){
        if(data[i].phone == request.body.phone){
           data[i].name = request.body.name;
           data[i].phone = request.body.newPhone;
        }
    }
    fs.writeFileSync('data.json', JSON.stringify(data));
    response.redirect('/');
});

app.post('/delete', function(request,response){
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
});

app.listen(3000);