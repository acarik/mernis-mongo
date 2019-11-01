params = require("./params.json");
Person = require('./Person.js');

const lineReader = require('line-reader');
var MongoClient = require('mongodb').MongoClient;
var logFlag = false;
var logLength = 1000;

sqlFileDir = "H:\\Downloads\\mernis\\data_dump.sql";
startStr = "COPY citizen (uid, national_identifier, first, last, mother_first, father_first, gender, birth_city, date_of_birth, id_registration_city, id_registration_district, address_city, address_district, address_neighborhood, street_address, door_or_entrance_number, misc) FROM stdin;"

// Connect to the db
MongoClient.connect(params.mongo.url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db(params.mongo.dbName)
    dbo.createCollection(params.mongo.collectionName, function (err, res) {
        if (err) throw err;
        console.log(params.mongo.collectionName + " collection created in db " + params.mongo.dbName);
        // adding records

        var startFlag = false;
        var lineCtr = 0;
        var thisPerson = new Person();
        lineReader.eachLine(sqlFileDir, function (line) {

            logFlag = (++lineCtr % logLength == 0)

            if (logFlag) {
                console.log('reading line ' + lineCtr.toString());
                console.log(line);
            }
            if (startFlag) {
                thisPerson.set(line);
                console.log(thisPerson);
                var myobj = { name: "Company Inc", address: "Highway 37" };
                dbo.collection(params.mongo.collectionName).insertOne(myobj, function (err, res) {
                    if (err) throw err;
                    if (logFlag) {
                        console.log(logLength.toString() + " documents inserted")
                    }
                })
            }

            if (line.includes(startStr)) {
                //return false; // stop reading
                startFlag = true;
            }

            if ((startFlag) && (line.includes('\.'))) {
                // demek ki bitmis
                return false;
            }
        });
        db.close();
    });
});
