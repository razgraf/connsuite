/**
 * Created by razvan on 16/10/2017.
 */



function CustomCard(response){
    var ID;
    var name;
    var initials;
    var phone;
    var email;
    var website;
    var description;
    var instantiated;
    var picture1;
    var picture2;
    var picture1Changed = 0;
    var picture2Changed = 0;

    this.ID = response.hasOwnProperty('ID') ? response['ID'] : null;
    this.name = response.hasOwnProperty('name') ? response['name'] : null;
    this.phone = response.hasOwnProperty('phone') ? response['phone'] : null;
    this.email = response.hasOwnProperty('email') ? response['email'] : null;
    this.website = response.hasOwnProperty('website') ? response['website'] : null;
    this.description = response.hasOwnProperty('description') ? response['description'] : null;
    this.instantiated = response.hasOwnProperty('instantiated') ? response['instantiated'] : null;
    this.picture1 = response.hasOwnProperty('picture1') && response['picture1'].length > 0 ? response['picture1'] : null;
    this.picture2 = response.hasOwnProperty('picture2')&& response['picture2'].length > 0 ?response['picture2'] : null;

    if(this.name){
        var names = this.name.split(' ');
        if(names){
            if(names.length === 1) this.initials = names[0][0];
            else if(names.length > 1) this.initials = names[0][0] + names[1][0];
        }
        else this.initials = null;
    }

    if(this.picture1) this.picture1 = this.buildImage(this.picture1);
    if(this.picture2) this.picture2 = this.buildImage(this.picture2);

}

CustomCard.prototype.buildImage = function(pictureName){
    return ROOT+"data/custom_bc/"+pictureName;
};