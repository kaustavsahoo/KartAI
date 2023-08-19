import OpenAI from "openai";
import { openaiKey } from "../../config.js";

export default new OpenAI({
    apiKey: openaiKey
})

// export default new OpenAIApi(configuration)