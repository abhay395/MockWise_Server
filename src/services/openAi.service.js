// Import OpenAI library and custom ApiError utility
// import OpenAI from "openai";
import Together from 'together-ai';
import ApiError from "../utils/ApiError.js";
import dotenv from 'dotenv';
dotenv.config();
// Initialize OpenAI instance with API key from environment variables
// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// });
const togetherai = new Together({
    apiKey: process.env.TOGETHER_API_KEY
})
// Export service object with OpenAI interaction methods
export default {
    // Method to ask question to OpenAI
    ask: async (question) => {
        try {
            // Create chat completion using GPT-3.5-turbo model
            const response = await togetherai.chat.completions.create({
                model: 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
                messages: [{ role: 'user', content: question }],
              });
            // Return the content of the first response message
            return response.choices[0].message.content;
        } catch (error) {
            // Handle errors by throwing custom ApiError with 500 status
            throw new ApiError(error.message, 500);
        }
    }
}