import express from "express";
export const freelancerRouter = express.Router();

import { Task } from './model.js'
import { requireAdmin, requireAuth, requireModerator } from '../auth/middlewire.js'
import { User } from "../auth/model.js";


const AddTask = async (req, res, next) => {

    try {
        let task = req.body;
        task.creatorId = req.user_id;
        task    = await Task.insertOne(task)
        console.log( task )
        console.log("here")
        res.status(200).json( { task } )
    } catch(err) {
        console.log( err.message )
        res.status(400).json({ error: err.message })
    }
}

const MyTask = async ( req, res, next ) => {

    try {
        let tasks = await Task.findById( req.user_id );
        res.status(200).json( { tasks } );
    } catch(err) {
        console.log( err.message )
        res.status(400).json( { error: err.message } )
    }
}


freelancerRouter.post( "/add-task", requireAuth, requireModerator, AddTask )
freelancerRouter.get( "/my-task", requireAuth, requireModerator, MyTask )
