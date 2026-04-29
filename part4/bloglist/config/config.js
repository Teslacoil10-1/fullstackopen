require('dotenv').config()

const PORT = process.env.PORT || 8080
const MONGOURL = process.env.MONGOURL

module.exports = { PORT, MONGOURL}