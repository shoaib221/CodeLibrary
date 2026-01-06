//console.log("controller");


const express = require("express");
const messageRouter = express.Router();
const { Message } = require("./model.js");
const { requireAuth } = require('../auth/middlewire.js')



const FetchMessage  = async ( req, res, next ) => {
	console.log("fetch message");

	try {
		const {message, sender} = req.body;


		//console.log( sender, receiver );
		const messages = await Message.find({});


		//console.log(messages);

		res.status(200).json( messages );
		
	} catch (error) {
		res.status(400).json({ error: error.message  });
	} finally {
		next();
	}
}


const CreateMessage = async ( req, res, next ) => {

	try {
		
		const { message, sender }  = req.body;
		const new_message = Message( { sender: sender, text: message } );
		const saved_message = await new_message.save();
		res.status(200).json( { message: saved_message } );

	} catch(err) {
		res.status(400).json({ error: err })
	} finally {
		next()
	}
}


const SendMessage = async ( req, res, next ) => {
	console.log( req.body );
	try {
		res.status(200).json( { msg: 'Success' } )
	} catch (err) {
		res.status(400).json( { msg: err } )
	}
}


messageRouter.get( '/fetch-message', FetchMessage );
messageRouter.post( '/create-message', CreateMessage );
messageRouter.post( '/send', requireAuth, SendMessage );


module.exports = { messageRouter };


/*


const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({

	sender: {
		type: String,
		required: true,
	},
	receiver: {
		type: String,
		required: true,
	},
	text: {
		type: String
	},
	media: {
		type: String
	}
	
}, { timestamps: true } );


const Message = mongoose.model('Message', MessageSchema);


const GroupSchema  = new mongoose.Schema({
	name : {
		type: String,
		required: true
	},
	admin : {
		type: String,
		required: true
	}},
	{ timestamps: true }
)

GroupSchema.index( { name: 1, admin: 1  }, { unique: true } )

const Group = mongoose.model("Group", GroupSchema)

const GroupMembersSchema = new mongoose.Schema({
	group_id: {
		type: String,
		required: true
	},
	group_name: {
		type: String,
		required: true
	},
	member: {
		type: String,
		required: true
	}
},
	{timestamps: true}
)

GroupMembersSchema.index( { group_id:1, member:1 }, { unique: true } )

const GroupMembers = mongoose.model("GroupMember", GroupMembersSchema )

const GroupMessageSchema = new mongoose.Schema({
	group_id: {
		type: String,
		required: true
	},
	sender: {
		type: String,
		required: true
	},
	text: {
		type: String,
	}, 
	media: {
		type: String
	}},
	{ timestamps: true }
)

const GroupMessage = mongoose.model("GroupMessage", GroupMessageSchema );

module.exports = { Message, Group, GroupMessage, GroupMembers };


*/