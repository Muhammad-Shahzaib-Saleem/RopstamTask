const express = require('express');

const Car = require('../model/car');

const router = express.Router();




router.get('/carsdb',async(req,res)=>{

    try{
        
        res.status(201).send("Car db working fine");
    }catch(e){

        res.status(401).send(e);
    }
})


//Creation of new Car in db

router.post('/cars',async(req,res)=>{

    try{
        const user = new Car(req.body);
        const createUser = await user.save(); 
        res.status(201).send(createUser);
    }catch(e){

        res.status(401).send(e);
    }
})


//Read the Car db
router.get('/cars',async(req,res)=>{

    try{
        const getCars = await Car.find();
        res.status(201).send(getCars);
    }catch(e){

        res.status(401).send(e);
    }
})

//Update the data Car db
router.patch('/cars/:registration_no',async(req,res)=>{

    try{
        const _registration_no = req.params.registration_no;
        
        const updateCar = await Car.findOneAndUpdate({registration_no:_registration_no},req.body,{
            new:true
        })
        res.status(201).send(updateCar);
    }catch(e){

        res.status(401).send(e);
    }
})

//Delete the data from car db

router.delete('/cars/:id',async(req,res)=>{

    try{
        const id = req.params.id;
        console.log(id);
        const deleteCar = await Car.findByIdAndDelete(id,req.body);

        if(!req.params.id){
            return res.status(400).send();
        }
        return res.status(200).send(deleteCar);
        
    }catch(e){

        res.status(401).send(e);
    }
})




module.exports = router;