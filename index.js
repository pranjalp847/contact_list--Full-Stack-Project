const { name } = require('ejs');
const express = require('express');
const path = require('path');
const port = 8000;

const db=require('./config/mongoose');

const Contact=require('./models/contact')

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

var contactList = [
    {
        name : 'Pranjal',
        phone : '123'
    }
    ,
    {
        name : 'Flash',
        phone : '465'
    }
    ,
    {
        name : 'logan',
        phone : '789'
    }
]

app.get('/',function(req,res)
{
    Contact.find({},function(err,contacts)
    {
        if(err)
        {
            console.log('Error in fetching contacts from db');
        }

        return res.render('home',{
            title : 'My contact list',
            contact_List : contacts
        }) ;
    });


});

app.post('/practice', function(req,res)
{
    Contact.create({
        name : req.body.name,
        phone : req.body.phone
    },function(err,newContact)
    {
        if(err){
            console.log('error in creating a contact');
        }

        console.log('*****',newContact);
        return res.redirect('back');
    });
});

app.get('/delete-contact/',function(req,res)
{
    let id = req.query.id;
    
    Contact.findByIdAndDelete(id,function(err)
    {
        if(err)
        {
            console.log('error in deleting an object from database');
        }
    })

    return res.redirect('back');


});




app.listen(port,function(err)
{ 
    if(err)
    {
        console.log('Error in running in the server',port);
    }
    console.log('Express in successfully running');
});