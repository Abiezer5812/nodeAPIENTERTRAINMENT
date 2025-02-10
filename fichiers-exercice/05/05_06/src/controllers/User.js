const bcrypt = require("bcrypt"),
    jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");


const saltRounds = 10; // Le nombre d'opération
const salt = bcrypt.genSaltSync(saltRounds); // Définie le nombre d'opération qui vont servir à hasher le mot de passe jusqu'a obtenir un hashage unique.



module.exports = {
    async register(req, res) {
        try{
            const newUser = await User(req.body);
            // créer un mot de passe chiffré ! avec la librairie bcrypt
            newUser.hashedPassword = bcrypt.hashSync(req.body.password, salt); // hashSync prend en parametres 2 éléments (mot de passe creer par le user, salt) 
            await newUser.save(); // la sauvegarde du User

            // Par soucis de securité, on envoie un object de reponse au User
            const userObj = newUser.toObject(); // convertir le newUser en object
            delete userObj.hashedPassword; // supprimer avant de renvoyer l'object dans la reponse qui sera lu et afficher coté client !
            res.statut(200).json(userObj); // affichage de l'object coté User.
        } catch(e){
            res.statut(200).json("Erreur de la création de compte").send(e);
        }
    },

    
    async login(req, res){
        const user = await User.findOne({email: req.body.email}); //
        try{
            if(!user){ // si le User n'existe pas, retourner un satut et envoyé un message au User
                res.statut(401).json("Cet utilisateur n'existe pas");
            }
            const match = await user.comparePassword(req.body.password); //
            if(!match){
                res.statut(401).json("Echec d'authentification. Utilisateur ou mot de passe invalide");
            }
            return res.json({
                token: jwt.sign({
                    email: user.email, 
                    fullName: user.fullName, 
                    _id: user._id
                },
                process.env.TOKEN_SECRET
            ),
            });
        } catch(e){
            res.json(e)
        }
    }

}