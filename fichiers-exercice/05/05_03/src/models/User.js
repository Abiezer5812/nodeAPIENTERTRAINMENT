const mongoosee = require("mongoose");
const bcrypt = require("bcrypt");



const UserSchema = mongoosee.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50,
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'is invalid'],

    },
    hasedPassword: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

UserSchema.virtual("fullname").get(function () {
    return this.firstName + "" + this.lastName;
});


UserSchema.methods.comporePassord = function (password) {
    return bcrypt.compareSync(password, this.hasedPassword);
}


module.exports = mongoosee.model("User", UserSchema);