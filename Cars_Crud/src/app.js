const express = require('express');

const router = require('./routers/car');
const app = express();

require('./db/conn.js');



//Define port
const port = 3001;
app.use(express.json());
app.use(router);


//Listening app at port{3001}
app.listen(port,()=>{
    console.log(`app is listening at port ${port}`);
})