const express = require('express');
const cors = require('cors');
const mongodbconnection = require('./dbconnection');
const app = express();

const port = process.env.PORT;

//cors is used to allow accessing apis through any origin
app.use(cors());

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb',extended: true}));

app.use('/api', require('./routes/product'));

app.listen(port,()=>{
    console.log(`Octdaily Test Backend is working at http://localhost:${port}`)
})
mongodbconnection();