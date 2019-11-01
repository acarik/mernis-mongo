params = require("./params.json");
// Retrieve
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect(params.mongo.url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db(params.mongo.dbName)
    dbo.createCollection(params.mongo.collectionName, function(err, res){
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    });
});

/*
Person = require('./Person.js')

sqlFileDir = "H:\\Downloads\\mernis\\data_dump.sql";
startStr = "COPY citizen (uid, national_identifier, first, last, mother_first, father_first, gender, birth_city, date_of_birth, id_registration_city, id_registration_district, address_city, address_district, address_neighborhood, street_address, door_or_entrance_number, misc) FROM stdin;"

const lineReader = require('line-reader');

var startFlag = false;
var lineCtr = 0;
var thisPerson = new Person();
lineReader.eachLine(sqlFileDir, function(line) {
    if (++lineCtr % 1000 == 0){
        console.log('reading line ' + lineCtr.toString());
        console.log(line);
    }
    if(startFlag){
        thisPerson.set(line);
        console.log(thisPerson);

    }
    //console.log(line);
    if (line.includes(startStr)) {
        //return false; // stop reading
        startFlag = true;
    }

    if (line.includes('26471241186aaa')) {
        return false;
    }
});

const a = new Person('temp');

let b = 1;


*/