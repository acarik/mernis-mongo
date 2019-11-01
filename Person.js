
class Person{
    constructor(str){
        this.set(str);
    }

    set(str = ''){
        var fields = ['uid', 'national_identifier', 'first', 'last', 'mother_first', 'father_first', 'gender', 'birth_city', 'date_of_birth', 'id_registration_city', 'id_registration_district', 'address_city', 'address_district', 'address_neighborhood', 'street_address', 'door_or_entrance_number', 'misc'];
        var words = str.split('\t');
        for (let i = 0; i<fields.length; i++){
            this[fields[i]] = words[i];
        }
    }
}

module.exports = Person;