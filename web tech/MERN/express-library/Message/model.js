
const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({

    
    text: {
        type: String
    },
    sender: {
        type: String
    }
    
}, { timestamps: true } );


const Message = mongoose.model('Message', MessageSchema);



module.exports = { Message };