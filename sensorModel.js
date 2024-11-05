const mongoose = require('mongoose')

const sensorSchema = mongoose.Schema({
    sensorData :{
        type:String
    }
})

const sensorModel = mongoose.model('sensors',sensorSchema)

module.exports = sensorModel