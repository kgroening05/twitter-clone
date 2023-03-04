require('dotenv').config()

module.exports = function getPort(){
    if (process.env.PORT){
        return process.env.PORT
    } else {
        return 8080
    }
}