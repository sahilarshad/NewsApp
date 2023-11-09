//requirements

const express = require('express')
const cors = require('cors')
const { default: rateLimit } = require('express-rate-limit')
require('dotenv').config()

const PORT = process.env.PORT || 5000

const app = express()


//rate limiting
const limiter = rateLimit({
    windowsMs: 10*60*1000, //10 mins
    max: 10,
})
app.use(limiter)
app.set('trust proxy', 1)

//set static folder
app.use(express.static('public'))

//router
app.use('/api', require('./routes'))


//use cors
app.use(cors())

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))