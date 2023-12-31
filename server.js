const express= require('express');
const app= express();
const morgan= require('morgan');
const dotenv= require('dotenv');
const connectDB = require('./config/db');
const path= require('path');

dotenv.config();

connectDB();

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/user', require('./routes/userRoutes'));
app.use('/api/v1/admin', require('./routes/adminRoutes'));
app.use('/api/v1/doctor', require('./routes/doctorRoutes'));
app.use(express.static(path.join(__dirname, './client/build')));

app.get('*', function(req, res){
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});


const port= process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`);
})