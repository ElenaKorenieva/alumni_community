const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postsSchema = new Schema({
    topic:{
        type: String,
        require: true,
        maxLength: 40,
        minLength: 1,
    },
    
    message:{
        type: String,
        require: true,
        maxLength: 40,
        minLength: 1,
    },
    create_at: {
        type: Date,
        default: Date.now,
        get: function (createAt){
            moment().format('MMMM Do YYYY, h:mm:ss')
        }
    }
    
}, {timestamps:true})

module.exports =mongoose.model('Posts', postsSchema)