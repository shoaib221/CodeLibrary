import mongoose, { Types } from 'mongoose';

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    detail: {
        type: String,
        required: true,
    },
    required_workers: {
        type: Number,
        required: true
    },
    payable_amount: {
        type: Number,
        required: true,
    },
    completion_deadline: {
        type: Date,
        required: true
    },
    submission_info: {
        type: String,
    },
    image: {
        type: String
    },
    creatorId: {
        type: Types.ObjectId,
        required: true
    }
}, { timestamps: true });


export const Task = mongoose.model("Task", TaskSchema);


