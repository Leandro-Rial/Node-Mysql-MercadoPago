const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

const app = express()

// Settings
app.set('port', process.env.PORT || 5000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middelware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: 'contraleanpass',
    port: 3306,
    database: 'nodemysql'
}, 'single'))

// Mercado Pago SDK
const mercadopago = require("mercadopago");
// Add Your credentials
mercadopago.configure({
  access_token:
    "APP_USR-4945118799227098-053019-a75d914a4561a1e8f794f1e6ba1fed78-767583450",
});

// Router
app.use('/', require('./routes/product'))

app.post("/checkout", (req, res) => {
    // Crea un objeto de preferencia
    let preference = {
      items: [
        {
          title: req.body.title,
          unit_price: parseInt(req.body.price),
          description: req.body.description,
          quantity: 1,
        },
      ],
    };
  
    mercadopago.preferences
      .create(preference)
      .then(function (response) {
  
        res.redirect(response.body.init_point);
  
      })
      .catch(function (error) {
        console.log(error);
      });
  });

// Static file
app.use(express.static(path.join(__dirname, 'public')))

// Server
app.listen(app.get('port'), () => {
    console.log(`Server running on port: ${app.get('port')}`);
})