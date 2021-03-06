// Author: Sean Williams
//Purpose: Create a new user and give it to the database handler then set session storage with user ifo


const { validateUser, validateNewUser } = require("./loginValidation")
const NutshellDatabase = require("../database")
const userTableFactory = require("../factories/usersTableFactory")


const createNewUser = function (userName, email) {
    const data = NutshellDatabase()
    if (validateNewUser(userName, email, data.users)) {
        const newUser = userTableFactory({ "userName": userName, "email": email }).save()

        const storedUserInfo = JSON.stringify({ "userId": newUser.id, "userName": newUser.userName, "isEditing": false })
        sessionStorage.setItem("userInfo", storedUserInfo)
        return true
    }
    else {
        return false
    }
}

module.exports = createNewUser