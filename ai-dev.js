// ai-dev.js — Emmanuel AI Dev Toolkit (OpenRouter version)
import dotenv from "dotenv";
import OpenAI from "openai";
import readline from "readline";

dotenv.config();

// Use OpenRouter instead of OpenAI
const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("\n🤖 Welcome to Emmanuel AI Dev Toolkit!");
console.log("💻 Commands: explain | debug | generate | document | exit\n");

async function askAI(prompt) {
  try {
    const completion = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });
    console.log("\n🧠 AI Response:\n");
    console.log(completion.choices[0].message.content);
    console.log("\n--------------------------------------\n");
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

function startCLI() {
  rl.question("👉 What do you want to do? ", async (action) => {
    if (action === "exit") {
      rl.close();
      return;
    }

    if (["explain", "debug", "generate", "document"].includes(action)) {
      rl.question("🧾 Enter your code or request:\n", async (req) => {
        await askAI(req);
        startCLI();
      });
    } else {
      console.log("❌ Unknown command. Try again.\n");
      startCLI();
    }
  });
}

startCLI();
