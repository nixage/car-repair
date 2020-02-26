const express = require('express');
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer');

const server = express();
const jsonParser = bodyParser.json();


/* ===========================SERVER USE=========================== */
server.use(jsonParser);

server.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, access_token');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);


  // Pass to next layer of middleware
  next();
});
/* ================================================================ */




/* =====================CONNECT DATABASE MYSQL===================== */
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "cars_repair",
  password: ""
});

connection.connect(function(err){
  if (err) {
      return console.error("Ошибка: " + err.message);
    }
    else{
      console.log("Подключение к серверу MySQL успешно установлено");
    }
});


/* ============================================================== */
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: '',
      pass: ''
    }
  });


/* ============================================================== */

server.get('/', function(){
    console.log('Start page')
})

server.get('/cars', function(req, res){
    const select = `select c_mark.mark, c_model.model, c_year.year from car_mark c_mark
                    join car_model c_model on c_model.mark_id = c_mark.id
                    join car_year c_year on c_year.model_id = c_model.id`;
    connection.query(select, function(err, result){
      if (err){
          res.status(500).json({msg:"database => error"})
      }
      res.json(result)
    })

})

server.post('/reg-car', function(req, res){
  transporter.sendMail({
    from: '',
    to: '',
    subject: `Заказ на ремонт автомобиля ${req.body.mark} ${req.body.model}`,
    text: "В ближайшее время с вами свяжется наш менеджер",
  }, function(err, info) {
    res.json({msg:'Заказ успешно обработан'})
  });
})

server.listen(3001, function () {
  console.log('Example app listening on port 3001');
});
