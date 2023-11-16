//requirements

const express = require('express')
const cors = require('cors')
const { exec } = require('child_process');
const { default: rateLimit } = require('express-rate-limit')
require('dotenv').config()

const PORT = process.env.PORT || 3000

const app = express()


app.get('/scrape', (req, res) => {
    const url = req.query.url;

    if (!url) {
        return res.status(400).send('URL parameter is required.');
    }

    // Execute your Python script with the specified URL
    exec(`python scrape_extract.py ${url}`, (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error executing Python script');
        }
        console.log(stdout);
        res.send('Python script executed successfully');
    });
});

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