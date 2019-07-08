const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var cors = require('cors')
var methodOverride = require('method-override');

app.use(methodOverride('_method'));
app.use(methodOverride('X-HTTP-Method'));
app.use(methodOverride('X-HTTP-Method-Override')); 
app.use(methodOverride('X-Method-Override')); 

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())

// Configuring the database
const dbConfig = require('./config/database.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

require('./route/route')(app);

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("connexion avec succes");    
}).catch(err => {
    console.log('erreur de connexion', err);
    process.exit();
});

app.get('/', (req, res) => {
    res.json({"message": "Welcome to simplon test unitaire."});
});

app.listen(8080, () => {
    console.log("Server demarer 8080");
});


module.export = app;

    


    // app.set('view engine', 'ejs');
    // app.use(express.static('public'));
    // app.use(bodyParser.urlencoded({extended: true}));
    // app.use(bodyParser.json());
    // var port = 8080;
    // app.get('/', function (req, res) {
    //   res.render('index');
    // });
    // app.post('/send-email', function (req, res) {
    //     // let transporter = nodeMailer.createTransport({
    //     //     host: 'smtp.gmail.com',
    //     //     port: 465,
    //     //     secure: true,
    //     //     auth: {
    //     //         user: 'xxx@xx.com',
    //     //         pass: 'xxxx'
    //     //     }
    //     // });
        
    //   });
    //       app.listen(port, function(){
    //         console.log('Server is running at port: ',port);
    //       });