import mongoose from 'mongoose';

const OpenAiSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    Output:{
        type:String,
        required:true
    }
},{timestamps:true})

const OpenAiM = mongoose.model('OpenAi',OpenAiSchema)
export default OpenAiM