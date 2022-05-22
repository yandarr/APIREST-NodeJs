const { Router } = require('express');
const { formValidatorBST } = require('../helpers/formValidator');
const State = require('../models/State');
const router = Router();


router.get('/', async function(req, res){
    try{
        const state = await State.find();
        res.send(state);
    }catch{
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
});

router.post('/', async function(req, res){
    try{
        const validations = formValidatorBST(req);

        if(validations.length > 0){
            return res.status(400).send(validations);
        }
        
        console.log('Objeto recibido', req.body);
        let state = new State();
        state.name = req.body.name;
        state.active = req.body.active;
        state.created_at = new Date();
        state.modified_at = new Date();

        state = await state.save();
        res.send(state);
        
    }catch{
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
});

router.put('/:stateId', async function(req, res){
    try{
        const validations = formValidatorBST(req);

        if(validations.length > 0){
            return res.status(400).send(validations);
        }
        
        console.log('Objeto recibido', req.body);

        let state = await State.findById(req.params.stateId);

        if(!state){
            res.status(400).send('No existe ese estado');
        }
        
        state.name = req.body.name;
        state.active = req.body.active;
        state.modified_at = new Date();

        state = await state.save();
        res.send(state);

    }catch{
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
    
});

module.exports = router;