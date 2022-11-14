const mongoose = require ('mongoose');

const express = require('express');
const {urlencoded} = require("express");

const authRouter = require('./router/auth.router');
const carRouter = require('./router/car.routers');
const userRouter = require('./router/user.routers');


const configs = require('./config/config')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/auth', authRouter);
app.use('/cars', carRouter);
app.use('/users', userRouter);



app.use((err, req,res,next) => {

    res.status(err.status || 500).json({
        message: err.message || 'Unknown error',
        status: err.status || 500
    })
})

app.listen(configs.PORT,async () => {
    await mongoose.connect(configs.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log(`Listen port ${configs.PORT}`);


});



