const mongoose = require('mongoose');

const deploymentSchema = mongoose.Schema({
    templateName: {
        type: String
    },
    url : {
        type: String
    },
    version:{
        type: String
    },
    deployedAt:{
        type: Date,
        default : Date.now()
    }
})

const Deployment = mongoose.model('Deployment', deploymentSchema);

module.exports = { Deployment }