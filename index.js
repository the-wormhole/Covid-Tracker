const express = require('express');
const port = 5000 || process.env.PORT;
const db = require('./config/mongoose');

const app = express();
const router = require('./routes/index');

app.use(express.urlencoded());

app.set('view engine','ejs');
app.set('views','./views');

app.use(express.static('assets'));

app.use('/',router);

app.listen(port,(err)=>{
    if(err){
        console.log('Error in initiating the server!!',err);
    }
    console.log('Server is up and running!!');
});