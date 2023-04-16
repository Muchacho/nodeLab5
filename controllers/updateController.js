const fs = require('fs');

exports.getUpdPage = function(request,response){
    try{
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
    } catch(error){
        console.log( `error ${error.message}`);
        const status = error.status || 400;
        response.status(status).send(error.message);
    }
};

exports.updateContact = function(request,response){
    try{
        console.log(request.body);
        let regex = /^\d{12}$/;
        if(!request.body.newPhone.match(regex)){
            response.status(400).send('incorrect phone');
            return;
        }
        let data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
        for(let i = 0; i < data.length; i++){
            if(data[i].phone == request.body.phone){
            data[i].name = request.body.name;
            data[i].phone = request.body.newPhone;
            }
        }
        fs.writeFileSync('data.json', JSON.stringify(data));
        response.redirect('/');
    } catch(error){
        console.log( `error ${error.message}`);
        const status = error.status || 400;
        response.status(status).send(error.message);
    }
};