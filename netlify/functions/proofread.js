const { Configuration, OpenAIApi } = require("openai");

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const configuration = new Configuration({ apiKey: OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

exports.handler = async function(event) {
  try {
    const { text } = JSON.parse(event.body || "{}");
    if (!text) {
      return { statusCode: 400, body: JSON.stringify({ result: "No text provided" }) };
    }

    // System prompt for proofreading
    const systemPrompt =
      "You are an expert book editor. Review the passage and rewrite it with corrections for grammar, spelling, and stylistic clarity. Only respond with the corrected text.";

    const completion = await openai.createChatCompletion({
      model: "gpt-4-turbo", // or "gpt-3.5-turbo"
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: text },
      ],
      max_tokens: 2048,
      temperature: 0.3,
    });

    const result = completion.data.choices[0].message.content;
    return {
      statusCode: 200,
      body: JSON.stringify({ result }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ result: error.message }),
    };
  }
};
