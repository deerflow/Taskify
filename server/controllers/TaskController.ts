import Task from '../models/Task';
import { Request, RequestHandler, Response } from "express";

export const getTasks: RequestHandler = async (req: Request, res: Response) => {
    const tasks = await Task.find({});
    res.status(200).json(tasks);
}

export const deleteDoneTasks: RequestHandler = async (req: Request, res: Response) => {
    await Task.deleteMany({ done: true });
    res.status(200).json({ message: 'Successfully deleted done tasks' });
}

export const addTask: RequestHandler = async (req: Request, res: Response) => {
    if (req.body?.text && req.body?.date) {
        await new Task({
            text: req.body.text,
            date: req.body.date,
            done: false
        }).save()
        return res.status(201).json({ message: `Task ${req.body.text} successfully created` });
    }
    res.status(400).json({ error: 'Invalid format' });
}

export const modifyTask: RequestHandler = async (req: Request, res: Response) => {
    if (req.body.hasOwnProperty('text') && req.body.hasOwnProperty('done')) {
        await Task.updateOne({ text: req.body.text }, { done: req.body.done });
        return res.status(200).json({ message: `Successfully updated ${req.body.text}`});
    }
    res.status(400).json({ error: 'Invalid format' });
}