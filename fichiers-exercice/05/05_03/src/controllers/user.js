const bcrypt = require('bcrypt');
const User = require("./models/User");
const saltRounds = 10; // Le nombre d'opération
const salt = bcrypt.genSaltSync(saltRounds); // Définie le nombre d'opération qui vont servir à hasher le mot de passe jusqu'a obtenir un hashage unique.



module.exports = {
    register(req, res) {
        try{
            const newUser = new User(req.body);
            // créer un mot de passe chiffré ! avec la librairie bcrypt
            newUser.hashedPassword = bcrypt.hashSync(req.body.password, salt); // hashSync prend en parametres 2 éléments (mot de passe creer par le user, salt) 
            newUser.save(); // la sauvegarde du User

            // Par soucis de securité, on envoie un object de reponse au User
            const userObj = newUser.toObject(); // convertir le newUser en object
            delete userObj.hashedPassword; // supprimer avant de renvoyer l'object dans la reponse qui sera lu et afficher coté client !
            res.statut(200).json(userObj); // affichage de l'object coté User.
        } catch(e){
            res.statut(200).json("Erreur de la création de compte").send(e);
        }
    }

}