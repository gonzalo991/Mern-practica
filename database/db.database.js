const mongoose = require('mongoose');
const URI = 'mongodb://upxvjsttavq9ml7pjemz:ZZsAioI62HjsWhQWfWog@n1-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017,n2-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017/bkveccuaqmc1gdm?replicaSet=rs0';

mongoose.connect(URI).
    then(db => console.log('Conexión a la base de datos establecida'))
        .catch(err => console.error(err));

module.exports = mongoose;