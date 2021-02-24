import * as mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    text: { type: String, required: true },
    date: { type: Date, required: true },
    done: { type: Boolean, required: true }
})

export default mongoose.model('Task', taskSchema);