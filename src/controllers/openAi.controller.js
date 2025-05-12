import openAiService from "../services/openAi.service.js";
import { successResponse } from '../utils/helper.js';

export default {
    // @desc    Ask question to OpenAI
    // @route   POST /api/v1/openAi/ask
    // @access  Public
    ask:async(req,res)=>{
        try {
            const result = await openAiService.ask(req.body.question)
            successResponse(res, 200, result, 'Question asked successfully');
        } catch (error) {
            throw error;
        }
    }
}