import { Router, json } from 'express';
import * as TaskController from "../controllers/TaskController";

const route = Router();

route.use(json());

route.get('/tasks', TaskController.getTasks);
route.post('/task', TaskController.addTask)
route.put('/task', TaskController.modifyTask);
route.delete('/tasks', TaskController.deleteDoneTasks);

export default route;