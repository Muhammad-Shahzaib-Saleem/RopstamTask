const app = require('mongoose');

app.connect('mongodb://localhost:27017/cars-crud',{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log("Connections Sucessfull");
}).catch((e)=>{
    console.log(e);
})