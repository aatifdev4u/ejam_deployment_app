const express = require('express');
const router = express.Router();
const { Deployment } = require('../models/Deployment');
const { versionData } = require('../Utils')

router.post('/add_deployment', (req, res)=>{
    const deploy = new Deployment(req.body);

    deploy.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true,
            data: doc
        });
    });
})

router.get('/get_deployment', (req, res)=>{
    Deployment
        .find()
        .exec((err, data)=>{
            if (err) return res.json({ success: false, err });
            return res.status(200).json({
                success: true,
                data
            });
        })
})

router.post('/delete_deployment', (req, res)=>{
    const deleteDeployment = req.body.id;
    Deployment.findByIdAndDelete(deleteDeployment).exec((err, data)=>{
        if(err) res.status(400).send(err);
        return res.status(200).json({ success: true, data})
    })
})

router.get('/get_details', (req, res)=>{
    res.json({
        success: true,
        data: versionData
    })
})

module.exports = router;