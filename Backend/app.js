const express = require('express');
const app = express();
const boddyParser = require('body-parser');
const morgan = require('morgan')
const mongoose = require('mongoose');

require('dotenv/config');
const api = process.env.API_URL;


const productsRouter = require('./routers/products');


//middleware
app.use(boddyParser.json());
app.use(morgan('tiny'));


//Routers
app.use(`${api}/products`, productsRouter);


mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'my-app'
})
.then(()=>{
    console.log('Database Connection is ready...')
})
.catch((err)=>{
    console.log(err);
})

app.listen(3000, ()=>{
    console.log(api);
    console.log('Server is running http://localhost:3000');
})