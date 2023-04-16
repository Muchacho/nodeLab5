const fs = require('fs');

exports.getAddPage = function (request,response){
    try{
        let data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
        response.render('addPage.hbs',{
            isDisable: true,
            title: 'Add contact',
            elements: data
        });
    } catch(error){
        console.log( `error ${error.message}`);
        const status = error.status || 400;
        response.status(status).send(error.message);
    }
};

exports.addContact = function(request,response){
    try{
        let regex = /^\d{12}$/;
        if(!request.body.phone.match(regex)){
            response.status(400).send('incorrect phone');
            return;
        }
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
    } catch(error){
        console.log( `error ${error.message}`);
        const status = error.status || 400;
        response.status(status).send(error.message);
    }
};