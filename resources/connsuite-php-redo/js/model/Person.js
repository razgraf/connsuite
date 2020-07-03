/**
 * Created by @VanSoftware on 20/07/2018.
 */

const PERSON_KEY_ID = "ID";
const PERSON_KEY_NAME = "name";
const PERSON_KEY_EMAIL = "email";
const PERSON_KEY_PHONE = "phone";
const PERSON_KEY_INFO = "info";
const PERSON_KEY_INSTANTIATED = "instantiated";

class Person extends ClassHelper{
    get instantiated() {
        return this._instantiated;
    }

    set instantiated(value) {
        this._instantiated = value;
    }

    get info() {
        return this._info;
    }

    set info(value) {
        this._info = value;
    }
    get phone() {
        return this._phone;
    }

    set phone(value) {
        this._phone = value;
    }
    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }
    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }
    get ID() {
        return this._ID;
    }

    set ID(value) {
        this._ID = value;
    }

    constructor(object){
        super();

        this.ID = this.getValue(object, PERSON_KEY_ID);
        this.name = this.getValue(object, PERSON_KEY_NAME);
        this.email = this.getValue(object, PERSON_KEY_EMAIL);
        this.phone = this.getValue(object, PERSON_KEY_PHONE);
        this.info = this.getValue(object, PERSON_KEY_INFO);
        this.instantiated = this.getValue(object,PERSON_KEY_INSTANTIATED);

    }
}
