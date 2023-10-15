const express = require('express')
const app = express()
const Cron = require("croner")
const axios = require("axios")
const moment = require("moment")
const fs = require("fs")

const PORT = process.env.PORT || 3001;

app.get('/', function (req, res) {
    res.send('Hello World')
})

Cron("*/30 * * * * *", async () => {
    console.log("I don run ooo")
    // Get the current timestamp
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    try {
        const response = await axios.get('https://crowdfunding-etlg.onrender.com/api/v1/');
        const responseData = response.data;
        console.log(responseData)

        // Get the current timestamp
        const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');

        // Append the response with timestamp to a file
        const logMessage = `\n${timestamp}: ${responseData}\n`;
        // fs.appendFileSync('response.txt', logMessage);
        fs.appendFile('response.txt', logMessage, function (err) {
            if (err) {
                // append failed
                console.log("error appending data to text file")
            } else {
                // done
            }
        })
        console.log('Request made and response appended to response.log');
    } catch (error) {
        const logMessage = `\n${timestamp}: ${error.message}\n`;
        // fs.appendFileSync("response.txt", error.message)
        fs.appendFile('response.txt', logMessage, function (err) {
            if (err) {
                // append failed
                console.log("error appending data to text file")
            } else {
                // done
            }
        })
        console.error('Error making the request:', error.message);
    }
})


app.listen(PORT, () => {
    console.log("App running on port: " + PORT)
})