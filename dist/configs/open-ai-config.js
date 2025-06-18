import OpenAi from "openai";
export const configureOpenAI = () => {
    const config = new OpenAi({
        apiKey: process.env.OPEN_AI_SECRET_KEY,
    });
    return config;
};
//# sourceMappingURL=open-ai-config.js.map