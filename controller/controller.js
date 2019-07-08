const Profile = require('../model/model');
const nodeMailer = require('nodemailer');

//Create new profil
exports.create = (req, res) => {
    Profile.find()
    .then(user => {
        //autoincrement
        let idautom;
        if(user.length == 0){
            idautom = 0
        }else {
            idautom = parseInt(user[user.length - 1]._id) + 1
        }

        //console.log('image file '+req.body.filename)
    const profil = new Profile({   
             
        _id: idautom,
        nom: req.body.nom , 
        mail: req.body.mail
    });

    let transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
               user: 'ralahajanaharynoah@gmail.com',
               pass: 'xxxxxxx'
           }
       });
  let mailOptions = {
      from: 'ralahajanaharynoah@gmail.com', 
      to: 'ralahajanaharynoah@gmail.com, est.brunomarcelino@gmail.com',
      subject: req.body.subject,
      body: req.body.body,
      profil,
      html: '<b>mail envoyer OK</b>'
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
          res.render('index');
      });

    // Save p in the database
    profil.save()
    .then(() => {
        Profile.find()
        .then(data=>{
            res.send(data);
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the profil."
            
        });
    });
})
};

exports.findAll = (req, res) => {   
    Profile.find()
    .then(users => {    
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving profils."
        });
    });
};