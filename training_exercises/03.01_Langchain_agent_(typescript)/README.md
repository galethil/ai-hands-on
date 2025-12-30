# 🌦️ Langchain Weather Agent Exercise

```
     .---.
    (     )
   (_     _)
    /`---'\
   /       \         "Is it raining? Let's ask an AI agent!"
  |  O   O  |
  |    ^    |        
   \  \_/  /
    `-----'
```

Welcome to the most **meteorologically mind-blowing** exercise you'll ever encounter! 🎉

In this exercise, you'll transform a basic chatbot into a weather-savvy AI agent that can tell you if you need an umbrella ☔, sunglasses 😎, or a snowboard 🏂!

---

## 📚 Required Reading (Don't Skip This, Future You Will Thank You!)

Before you dive into coding paradise, make sure you understand these concepts:

### 1. **What is an AI Agent?**
- 📖 [Langchain Agents Documentation](https://js.langchain.com/docs/concepts/agents/)
- An agent is an AI that can **decide** which tools to use and **when** to use them
- Think of it like giving your AI a Swiss Army knife 🔪🔧✂️

### 2. **Tools in Langchain**
- 📖 [Langchain Tools Documentation](https://js.langchain.com/docs/concepts/tools/)
- Tools are functions that agents can call
- You need to define: name, description, schema, and the function itself
- The better your description, the smarter your agent! 🧠

### 3. **Weather API Basics**
- 📖 [Open-Meteo API Docs](https://open-meteo.com/en/docs) (Free, no API key needed! 🎁)
- Learn how to make HTTP requests in Node.js
- Understanding query parameters (latitude, longitude, temperature units)

### 4. **TypeScript Async/Await**
- 📖 [Async/Await Guide](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-1-7.html#asyncawait)
- Agents are inherently asynchronous
- `async` functions return Promises, `await` waits for them

### 5. **Environment Variables**
- 📖 [dotenv Documentation](https://www.npmjs.com/package/dotenv)
- Keep your configuration separate from code
- Already set up in your project with `dotenv.config()`

---

## 🎯 Exercise Goal

Transform the boring chatbot in `01_exercise/agent-weather.ts` into a **Weather-Predicting Genius** that can:

1. ✅ **Understand natural language queries** like:
   - "What's the weather in Paris?"
   - "Is it raining in Tokyo?"
   - "What's the temperature in New York?"

2. ✅ **Use a weather tool** to fetch real-time weather data from [Open-Meteo API](https://open-meteo.com/)

3. ✅ **Make intelligent decisions** about when to use the weather tool vs. answering from its own knowledge

4. ✅ **Provide helpful, conversational responses** that combine tool results with natural language

---

## 🏗️ What You'll Build

```
User: "What's the weather like in London?"
  │
  ▼
┌─────────────────────────────┐
│   Langchain Agent           │
│   (Your Smart AI)           │
└─────────────────────────────┘
  │
  │ (Decides: "I need weather data!")
  ▼
┌─────────────────────────────┐
│   Weather Tool              │
│   (Fetches from API)        │
└─────────────────────────────┘
  │
  ▼
┌─────────────────────────────┐
│   Open-Meteo API           │
│   🌍 Real Weather Data      │
└─────────────────────────────┘
  │
  ▼
Agent: "It's currently 15°C and partly cloudy in London. 
        Perfect weather for a cuppa! ☕"
```

---

## 🚀 Getting Started

1. **Navigate to the exercise folder:**
   ```bash
   cd 01_exercise
   ```

2. **Install dependencies** (if you haven't already):
   ```bash
   npm install
   ```

3. **Set up your environment:**
   - Make sure you have Ollama running with a model (e.g., `llama3.1:8b`)
   - Or update `.env` to use OpenAI or another provider

4. **Run the current code:**
   ```bash
   npm start
   ```
   
   You'll see it only answers basic questions. Time to level it up! 💪

---

## 🧩 Your Mission (If You Choose to Accept It)

Your task is to modify `agent-weather.ts` to:

1. **Create a weather tool** that:
   - Takes a city name as input
   - Converts it to coordinates (or uses major city coordinates)
   - Calls the Open-Meteo API
   - Returns formatted weather data

2. **Connect the tool to the agent** so it can:
   - Automatically decide when to use the weather tool
   - Parse the tool's response
   - Provide natural, helpful answers

3. **Test with various queries** like:
   - "What's the weather in Berlin?"
   - "Tell me about the weather in San Francisco"
   - "Is it cold in Stockholm?"

---

## 💡 Hints

- 🔍 Look at the `@langchain/core/tools` package for the `tool()` function
- 🗺️ You can use a simple mapping of major cities to coordinates
- 🌐 Open-Meteo API example: `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,weather_code`
- 🤖 The agent needs a `tools` array in its configuration
- 📝 Tool descriptions should be clear - they guide the AI's decision-making!

---

## 🎓 Bonus Challenges

Once you've got the basic agent working:

- 🌟 Add more weather details (humidity, wind speed, precipitation)
- 🗺️ Support coordinates directly ("weather at 51.5074° N, 0.1278° W")
- 🌈 Add weather condition emojis (☀️🌧️❄️⛈️) based on weather codes
- 📅 Extend to forecast for future days
- 🛠️ Create multiple tools (weather, time, calculator) and let the agent choose

---

## 🆘 Need Help?

If you get stuck, check out the step-by-step solution in [`99_solution/README.md`](./99_solution/README.md)

Remember: The journey of a thousand lines of code begins with a single `npm install` 🚀

---

## 📝 What You'll Learn

By completing this exercise, you'll master:

- ✅ Creating custom tools for Langchain agents
- ✅ Integrating external APIs with AI agents
- ✅ Understanding agent reasoning and tool selection
- ✅ Async/await patterns in TypeScript
- ✅ Building production-ready AI applications

Now go forth and make it rain (weather data)! 🌧️💻

```
    \o/     "I can check the weather now!"
     |      
    / \     
```
