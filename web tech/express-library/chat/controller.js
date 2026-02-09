//console.log("controller");



import express from "express";
export const chatRouter = express.Router();
import { User } from "../auth/model.js";
import { requireAuth } from "../auth/middlewire.js";
import { Message, Group, GroupMessage, GroupMembers, Story } from "./model.js";
import { io, onlineUserMap } from '../utils/socket.js';
import { multer_uploader, TestMulter } from "./multer.js";




//console.log( "controller", onlineUserMap);




const fetchMessage = async (req, res, next) => {
	console.log("fetch message");

	try {
		const { partner } = req.body;


		//console.log( sender, receiver );
		const messages = await Message.find({
			$or: [
				{ receiver: req.username, sender: partner.username },
				{ receiver: partner.username, sender: req.username },
			],
		});

		//console.log(messages);

		res.status(200).json({ messages });

	} catch (error) {
		res.status(400).json({ error: error.message });
	}
}




const sendMessage = async (req, res) => {

	try {
		const { receiver, text } = req.body;
		console.log( receiver, text );

		if( req.files ) {
			console.log("files received");
		}

		const messages = [];

		let new_message = await Message.create({
			sender: req.username,
			receiver,
			text,
		});

		messages.push( new_message );

		req.files.image?.forEach( async (elem) =>  {
			let new_message = await Message.create({
				sender: req.username,
				receiver,
				image:  `http://localhost:4000/${ elem.filename }`,
			});

			messages.push( new_message );
		} );

		req.files.video?.forEach( async ( elem ) => {
			let new_message = await Message.create({
				sender: req.username,
				receiver,
				video:  `http://localhost:4000/${ elem.filename }`
			});

			messages.push( new_message );
		} );


		req.files.audio?.forEach( async ( elem ) => {
			let new_message = await Message.create({
				sender: req.username,
				receiver,
				audio:  `http://localhost:4000/${ elem.filename }`
			});

			messages.push( new_message );
		} );

		const receiver_socket_id = onlineUserMap[receiver];
		console.log( receiver_socket_id );
		if (receiver_socket_id) {
			console.log( receiver_socket_id );
			io.to(receiver_socket_id).emit("receive_message", {messages} ) 
		}

		return res.status(200).json({ messages });
	} catch (err) {
		console.error(err);
		return res.status(400).json({ error: err.message });
	}
};


const FetchUsers = async (req, res, next) => {
	console.log("fetch users")
	try {
		//console.log( req.username )
		const users = await User.find({ username: { $ne: req.username } })
		//console.log( users )
		res.status(200).json({ users })

	} catch (err) {
		res.status(400).json({ error: err.message })
	}
}


const createGroup = async (req, res, next) => {
	console.log("create group")
	try {
		const { newGroup } = req.body
		console.log(newGroup)

		const new_group = new Group({
			admin: req.username,
			name: newGroup,
		})

		const saved_group = await new_group.save();

		const me = await User.findOne({ username: req.username })

		const new_member = new GroupMembers({
			group_id: saved_group._id,
			group_name: saved_group.name,
			member: req.username,
			photo: me.photo,
			admin: req.username
		})

		const saved_member = await new_member.save();

		res.status(200).json(saved_member)
	} catch (err) {
		res.status(400).json({ error: err.message })
	}
}


const FetchGroups = async (req, res, next) => {
	console.log("fetch groups")
	try {
		const groups = await GroupMembers.find({ member: req.username })
		//console.log(groups)
		res.status(200).json(groups)
	} catch (err) {
		res.status(400).json({ error: err.message })
	}
}


const AddToGroup = async (req, res, next) => {
	console.log("add to group")
	try {
		const { new_member, group_name } = req.body
		console.log(new_member, group_name)

		const group = await Group.findOne({ name: group_name, admin: req.username })
		const nmember = await User.findOne({ username: new_member })
		const new_data = new GroupMembers({
			group_id: group._id,
			group_name: group.name,
			member: new_member,
			photo: nmember.photo,
			admin: req.username
		})

		const saved_data = await new_data.save()

		res.status(200).json(saved_data)
	} catch (err) {
		res.status(400).json({ error: err.message })
		console.log(err)
	}
}


const DeleteFromGroup = async (req, res, next) => {
	console.log("delete from group")
	try {
		const { group_id, member } = req.body
		await GroupMembers.deleteOne({ group_id, member })
		res.status(200).json("ok")
	} catch (err) {
		res.status(400).json({ error: err.message })
	}
	finally {
		next()
	}
}


const FetchGroupMembers = async (req, res, next) => {
	console.log("fetch group members")
	try {
		const { group_id, member } = req.body
		const data = await GroupMembers.find({ group_id })
		res.status(200).json(data)
	} catch (err) {
		res.status(200).json({ error: err.message })
	}
}

const DeleteGroup = async (req, res, next) => {
	console.log("delete group")
	try {
		const { group_id } = req.body
		await Group.deleteOne({ _id: group_id })
		await GroupMembers.deleteMany({ group_id })
		await GroupMessage.deleteMany({ group_id })
		res.status(200).json("ok")
	} catch (err) {
		res.status(400).json({ error: err.message })
	}
}


const FetchGroupMessage = async (req, res, next) => {
	console.log("fetch group message");
	try {
		const { group_id } = req.body
		const messages = await GroupMessage.find({ group_id })
		//console.log(messages)
		res.status(200).json(messages)
	} catch (err) {
		res.status(400).json({ error: err.message })
	}
}



const LeaveGroup = async (req, res, next) => {
	console.log("leave group")
	try {
		const { group_id } = req.body
		await GroupMembers.deleteOne({ member: req.username });
		res.status(200).json("Left From The Group")
	} catch (err) {
		res.status(400).json({ error: err.message })
	}
}




const GroupMessageCont = async (req, res, next) => {
	console.log("group message cont")
	try {
		const { text, group_id } = req.body
		let messages = []
		//console.log( req.files )
		if (text) messages.push(new GroupMessage({ text, sender: req.username, group_id, createdAt: new Date().toLocaleString() }))

		for (let key in req.files) {
			for (item of req.files[key]) {
				//console.log(item)

				messages.push(new GroupMessage({
					sender: req.username,
					group_id,
					mediaType: key,
					mediaURL: 'http://localhost:4000/messages/' + item.filename,
					createdAt: new Date().toLocaleString()
				}))
			}
		}


		let saved_messages = []
		for (let i = 0; i < messages.length; i++) {
			let result = await messages[i].save()
			//console.log(result)
			saved_messages.push(result)
		}

		//console.log("group message");

		const group_members = await GroupMembers.find({ group_id })

		//console.log( "online", onlineUserMap );


		group_members.forEach(x => {
			//console.log(x)
			if (onlineUserMap[x.member])
				//console.log(x.member)
				io.to(onlineUserMap[x.member]).emit("newGroupMessage", saved_messages)
		})
		res.status(200).json("ok")


	} catch (err) {
		res.status(400).json({ error: 'backend ' + err.message })
	} finally {
		//console.log( 'photo' )
		next()
	}
}


const CreateStory = async (req, res, next) => {
	console.log("create story")
	try {
		const { text } = req.body;
		console.log(text)
		let story = null;
		console.log(story)
		if (text) {
			story = new Story({ owner: req.username, type: "text", url: text })
			story = await story.save()
		}
		else if (req.files.length > 0) {
			story = new Story({
				owner: req.username,
				type: req.files[0].mimetype.substr(0, 5),
				url: "http://localhost:4000/messages/" + req.files[0].filename
			})

			story = await story.save()
		}

		res.status(200).json(story)
	} catch (err) {
		console.log(err.message)
		res.status(400).json({ error: err.message })
	}
}


const FetchStory = async (req, res, next) => {

	try {
		let stories = await Story.find({});
		res.status(200).json(stories);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}


}


chatRouter.use(requireAuth);
chatRouter.post("/fetch-message", requireAuth, fetchMessage);

chatRouter.post("/send-message", multer_uploader.fields( [ 
	{ name: 'image', maxCount: 5 },
	{ name: "video", maxCount: 5 },
	{ name: "audio", maxCount: 5 }
 ] ) , sendMessage); 

chatRouter.get("/fetch-users", requireAuth, FetchUsers);
chatRouter.post("/creategroup", createGroup);
chatRouter.get("/fetchgroups", FetchGroups);
chatRouter.post("/addtogroup", AddToGroup);
chatRouter.post("/fetchgroupmembers", FetchGroupMembers);
chatRouter.post("/deletemember", DeleteFromGroup);
chatRouter.post("/deletegroup", DeleteGroup);
chatRouter.post("/leavegroup", LeaveGroup);
chatRouter.post("/fetchgroupmessage", FetchGroupMessage);
chatRouter.post("/group_message", GroupMessageCont);
chatRouter.post("/create-story",  CreateStory);
chatRouter.get("/fetch-story", FetchStory);




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