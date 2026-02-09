
import mongoose from "mongoose";

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
    audio: {
        type: String
    },
    video: {
        type: String
    },
    image: {
        type: String
    }
    
}, { timestamps: true } );


export const Message = mongoose.model('Message', MessageSchema);


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

export const Group = mongoose.model("Group", GroupSchema);

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
    },
    photo: {
        type: String,
        required: true
    },
    admin : {
        type: String,
        required: true
    }
},
    {timestamps: true}
)

GroupMembersSchema.index( { group_id:1, member:1 }, { unique: true } )

export const GroupMembers = mongoose.model("GroupMember", GroupMembersSchema )

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
        type: String
    }, 
    mediaType: {
        type: String
    },
    mediaURL: {
        type: String,
    },
    createdAt: {
        type: String,
        required: true
    }
})


export const GroupMessage = mongoose.model("GroupMessage", GroupMessageSchema );


const StorySchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
}, { timestamps: true } )


export const Story = mongoose.model("Story", StorySchema );



