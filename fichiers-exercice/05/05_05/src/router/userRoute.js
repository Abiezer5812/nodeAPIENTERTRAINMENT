const {register, login} = require("/controllers/user");

module.exports = (router) => {
    router.get("/auth/register", register);
    router.get("/auth/login", login);
}