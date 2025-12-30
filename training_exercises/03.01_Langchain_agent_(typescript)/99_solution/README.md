# 🎯 Step-by-Step Solution Guide

```
    _______________
   |  SOLUTION!   |
   |  ___         |
   | |[ ]|  [][]  |
   | |[ ]|  [][]  |
   | |___|  [][]  |
   |______________|
```

Welcome to the detailed solution! This guide will walk you through building your weather agent step by step.

---

## 📋 Overview of What We'll Build

We're going to modify `agent-weather.ts` to:
1. Create a weather tool function
2. Define it as a Langchain tool with proper schema
3. Connect it to our agent
4. Test it with weather queries

Let's go! 🚀

---

## 🔧 Step 1: Import Required Dependencies

First, let's add the necessary imports at the top of your file.

**Add these imports:**

```typescript
import { ChatOllama } from '@langchain/ollama';
import dotenv from 'dotenv';
import { createAgent } from 'langchain';
import { tool } from '@langchain/core/tools';
import { z } from 'zod';
```

**Why?**
- `tool`: Function to define tools for the agent
- `z`: Zod library for schema validation (comes with `@langchain/core`)

---

## 🌍 Step 2: Create a City Coordinates Mapping

Before the model initialization, add a simple mapping of cities to coordinates:

```typescript
dotenv.config({ quiet: true });

// Simple mapping of major cities to coordinates
const CITY_COORDINATES: Record<string, { lat: number; lon: number }> = {
  london: { lat: 51.5074, lon: -0.1278 },
  paris: { lat: 48.8566, lon: 2.3522 },
  'new york': { lat: 40.7128, lon: -74.0060 },
  tokyo: { lat: 35.6762, lon: 139.6503 },
  berlin: { lat: 52.5200, lon: 13.4050 },
  sydney: { lat: -33.8688, lon: 151.2093 },
  moscow: { lat: 55.7558, lon: 37.6173 },
  dubai: { lat: 25.2048, lon: 55.2708 },
  mumbai: { lat: 19.0760, lon: 72.8777 },
  'san francisco': { lat: 37.7749, lon: -122.4194 },
  stockholm: { lat: 59.3293, lon: 18.0686 },
  barcelona: { lat: 41.3874, lon: 2.1686 },
  singapore: { lat: 1.3521, lon: 103.8198 },
  toronto: { lat: 43.6532, lon: -79.3832 },
  amsterdam: { lat: 52.3676, lon: 4.9041 },
};
```

**Why?**
- Open-Meteo requires latitude and longitude
- This keeps our example simple (in production, you'd use a geocoding API)
- It's case-insensitive friendly

---

## 🌡️ Step 3: Create the Weather Fetching Function

Add this function before creating the agent:

```typescript
// Function to fetch weather data from Open-Meteo API
async function getWeatherData(city: string): Promise<string> {
  try {
    // Normalize city name
    const normalizedCity = city.toLowerCase().trim();
    
    // Find coordinates
    const coords = CITY_COORDINATES[normalizedCity];
    
    if (!coords) {
      return `Sorry, I don't have coordinates for "${city}". I know about these cities: ${Object.keys(CITY_COORDINATES).join(', ')}`;
    }

    // Fetch weather data from Open-Meteo API
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&temperature_unit=celsius&wind_speed_unit=kmh`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Weather API returned status: ${response.status}`);
    }
    
    const data = await response.json();
    const current = data.current;
    
    // Weather code descriptions (WMO Weather interpretation codes)
    const weatherDescriptions: Record<number, string> = {
      0: '☀️ Clear sky',
      1: '🌤️ Mainly clear',
      2: '⛅ Partly cloudy',
      3: '☁️ Overcast',
      45: '🌫️ Foggy',
      48: '🌫️ Depositing rime fog',
      51: '🌦️ Light drizzle',
      53: '🌦️ Moderate drizzle',
      55: '🌦️ Dense drizzle',
      61: '🌧️ Slight rain',
      63: '🌧️ Moderate rain',
      65: '🌧️ Heavy rain',
      71: '🌨️ Slight snow',
      73: '🌨️ Moderate snow',
      75: '🌨️ Heavy snow',
      77: '🌨️ Snow grains',
      80: '🌦️ Slight rain showers',
      81: '🌧️ Moderate rain showers',
      82: '🌧️ Violent rain showers',
      85: '🌨️ Slight snow showers',
      86: '🌨️ Heavy snow showers',
      95: '⛈️ Thunderstorm',
      96: '⛈️ Thunderstorm with slight hail',
      99: '⛈️ Thunderstorm with heavy hail',
    };
    
    const weatherDesc = weatherDescriptions[current.weather_code] || '🌍 Unknown conditions';
    
    // Format the response
    return `Weather in ${city}:
🌡️ Temperature: ${current.temperature_2m}°C
💧 Humidity: ${current.relative_humidity_2m}%
💨 Wind Speed: ${current.wind_speed_10m} km/h
${weatherDesc}`;
    
  } catch (error) {
    console.error('Error fetching weather:', error);
    return `Sorry, I couldn't fetch weather data for ${city}. Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}
```

**What's happening here?**
- 🔍 Normalizes city name to match our dictionary
- 📍 Gets coordinates from our mapping
- 🌐 Calls Open-Meteo API with coordinates
- 🎨 Formats the response with emojis and readable text
- ⚠️ Handles errors gracefully

---

## 🛠️ Step 4: Define the Weather Tool

Now let's wrap our function in a Langchain tool:

```typescript
// Define the weather tool
const weatherTool = tool(
  async ({ city }: { city: string }) => {
    return await getWeatherData(city);
  },
  {
    name: 'get_weather',
    description: 'Gets the current weather for a specified city. Use this tool whenever someone asks about weather conditions, temperature, or climate in a specific city. Input should be the city name.',
    schema: z.object({
      city: z.string().describe('The name of the city to get weather for'),
    }),
  }
);
```

**Key points:**
- 📝 **name**: Short identifier for the tool
- 📖 **description**: Critical! This tells the agent WHEN to use the tool
- 🔤 **schema**: Defines the input structure using Zod
- 🎯 The better the description, the better the agent performs!

---

## 🤖 Step 5: Update the Agent Configuration

Modify your agent creation to include the tool:

```typescript
const model = new ChatOllama({
  model: process.env.OLLAMA_MODEL || 'llama3.1:8b',
  temperature: 0.7,
  maxRetries: 2,
});

const agent = createAgent({
  model,
  tools: [weatherTool], // Add the tools array
});
```

**What changed?**
- Added `tools` array with our `weatherTool`
- The agent can now access and use this tool!

---

## 🧪 Step 6: Update the Run Function

Let's test our weather agent:

```typescript
const run = async () => {
  console.log('🌦️ Weather Agent is ready!\n');
  
  // Test weather query
  const weatherQuery = "What's the weather like in Paris?";
  console.log(`User: ${weatherQuery}\n`);
  
  const response = await agent.invoke({
    messages: weatherQuery,
  });
  
  console.log('Agent:', response);
  console.log('\n---\n');
  
  // Test a non-weather query to see the agent's reasoning
  const generalQuery = "What is the capital of France?";
  console.log(`User: ${generalQuery}\n`);
  
  const response2 = await agent.invoke({
    messages: generalQuery,
  });
  
  console.log('Agent:', response2);
};

run();
```

---

## 📄 Complete Solution Code

Here's the full file for reference:

```typescript
import { ChatOllama } from '@langchain/ollama';
import dotenv from 'dotenv';
import { createAgent } from 'langchain';
import { tool } from '@langchain/core/tools';
import { z } from 'zod';

dotenv.config({ quiet: true });

// Simple mapping of major cities to coordinates
const CITY_COORDINATES: Record<string, { lat: number; lon: number }> = {
  london: { lat: 51.5074, lon: -0.1278 },
  paris: { lat: 48.8566, lon: 2.3522 },
  'new york': { lat: 40.7128, lon: -74.0060 },
  tokyo: { lat: 35.6762, lon: 139.6503 },
  berlin: { lat: 52.5200, lon: 13.4050 },
  sydney: { lat: -33.8688, lon: 151.2093 },
  moscow: { lat: 55.7558, lon: 37.6173 },
  dubai: { lat: 25.2048, lon: 55.2708 },
  mumbai: { lat: 19.0760, lon: 72.8777 },
  'san francisco': { lat: 37.7749, lon: -122.4194 },
  stockholm: { lat: 59.3293, lon: 18.0686 },
  barcelona: { lat: 41.3874, lon: 2.1686 },
  singapore: { lat: 1.3521, lon: 103.8198 },
  toronto: { lat: 43.6532, lon: -79.3832 },
  amsterdam: { lat: 52.3676, lon: 4.9041 },
};

// Function to fetch weather data from Open-Meteo API
async function getWeatherData(city: string): Promise<string> {
  try {
    const normalizedCity = city.toLowerCase().trim();
    const coords = CITY_COORDINATES[normalizedCity];
    
    if (!coords) {
      return `Sorry, I don't have coordinates for "${city}". I know about these cities: ${Object.keys(CITY_COORDINATES).join(', ')}`;
    }

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&temperature_unit=celsius&wind_speed_unit=kmh`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Weather API returned status: ${response.status}`);
    }
    
    const data = await response.json();
    const current = data.current;
    
    const weatherDescriptions: Record<number, string> = {
      0: '☀️ Clear sky',
      1: '🌤️ Mainly clear',
      2: '⛅ Partly cloudy',
      3: '☁️ Overcast',
      45: '🌫️ Foggy',
      48: '🌫️ Depositing rime fog',
      51: '🌦️ Light drizzle',
      53: '🌦️ Moderate drizzle',
      55: '🌦️ Dense drizzle',
      61: '🌧️ Slight rain',
      63: '🌧️ Moderate rain',
      65: '🌧️ Heavy rain',
      71: '🌨️ Slight snow',
      73: '🌨️ Moderate snow',
      75: '🌨️ Heavy snow',
      77: '🌨️ Snow grains',
      80: '🌦️ Slight rain showers',
      81: '🌧️ Moderate rain showers',
      82: '🌧️ Violent rain showers',
      85: '🌨️ Slight snow showers',
      86: '🌨️ Heavy snow showers',
      95: '⛈️ Thunderstorm',
      96: '⛈️ Thunderstorm with slight hail',
      99: '⛈️ Thunderstorm with heavy hail',
    };
    
    const weatherDesc = weatherDescriptions[current.weather_code] || '🌍 Unknown conditions';
    
    return `Weather in ${city}:
🌡️ Temperature: ${current.temperature_2m}°C
💧 Humidity: ${current.relative_humidity_2m}%
💨 Wind Speed: ${current.wind_speed_10m} km/h
${weatherDesc}`;
    
  } catch (error) {
    console.error('Error fetching weather:', error);
    return `Sorry, I couldn't fetch weather data for ${city}. Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}

// Define the weather tool
const weatherTool = tool(
  async ({ city }: { city: string }) => {
    return await getWeatherData(city);
  },
  {
    name: 'get_weather',
    description: 'Gets the current weather for a specified city. Use this tool whenever someone asks about weather conditions, temperature, or climate in a specific city. Input should be the city name.',
    schema: z.object({
      city: z.string().describe('The name of the city to get weather for'),
    }),
  }
);

const model = new ChatOllama({
  model: process.env.OLLAMA_MODEL || 'llama3.1:8b',
  temperature: 0.7,
  maxRetries: 2,
});

const agent = createAgent({
  model,
  tools: [weatherTool],
});

const run = async () => {
  console.log('🌦️ Weather Agent is ready!\n');
  
  const weatherQuery = "What's the weather like in Paris?";
  console.log(`User: ${weatherQuery}\n`);
  
  const response = await agent.invoke({
    messages: weatherQuery,
  });
  
  console.log('Agent:', response);
  console.log('\n---\n');
  
  const generalQuery = "What is the capital of France?";
  console.log(`User: ${generalQuery}\n`);
  
  const response2 = await agent.invoke({
    messages: generalQuery,
  });
  
  console.log('Agent:', response2);
};

run();
```

---

## 🏃 Running Your Agent

```bash
npm start
```

You should see output like:

```
🌦️ Weather Agent is ready!

User: What's the weather like in Paris?

Agent: [Tool call → get_weather with city="Paris"]
Weather in Paris:
🌡️ Temperature: 12°C
💧 Humidity: 75%
💨 Wind Speed: 15 km/h
⛅ Partly cloudy

---

User: What is the capital of France?

Agent: The capital of France is Paris. Would you like to know the weather there?
```

---

## 🎓 Understanding What Happened

### Agent Decision Making
The agent now follows this process:

1. **Receives user message**
2. **Analyzes the intent** - Does this require a tool?
3. **If weather-related:**
   - Extracts the city name
   - Calls the `get_weather` tool
   - Receives the weather data
   - Formats a natural response
4. **If not weather-related:**
   - Answers from its training data
   - No tool needed!

### Key Concepts Demonstrated

🔹 **Tool Definition**: How to wrap functions for agent use
🔹 **Schema Validation**: Using Zod for type-safe inputs
🔹 **API Integration**: Calling external services
🔹 **Error Handling**: Graceful degradation
🔹 **Agent Reasoning**: Automatic tool selection

---

## 🚀 Extensions and Improvements

Now that you have a working agent, try these enhancements:

### 1. Add Geocoding
```typescript
// Instead of hardcoded cities, use a geocoding API
const coords = await geocodeCity(city);
```

### 2. Multi-Day Forecast
```typescript
// Extend to show forecast for next 7 days
const forecastTool = tool(
  async ({ city, days }: { city: string; days: number }) => {
    // Implementation here
  },
  { /* tool config */ }
);
```

### 3. More Tools
```typescript
const tools = [
  weatherTool,
  timeTool,
  calculatorTool,
  newsSearchTool,
];
```

### 4. Conversation Memory
```typescript
import { BufferMemory } from 'langchain/memory';

const memory = new BufferMemory();
// Add to agent configuration
```

### 5. Streaming Responses
```typescript
const stream = await agent.stream({
  messages: query,
});

for await (const chunk of stream) {
  process.stdout.write(chunk);
}
```

---

## 🐛 Common Issues and Fixes

### Issue: "Cannot find module 'zod'"
**Fix:** Zod comes with `@langchain/core`, but if missing:
```bash
npm install zod
```

### Issue: "fetch is not defined" (Node < 18)
**Fix:** Install node-fetch:
```bash
npm install node-fetch
```
Then import it:
```typescript
import fetch from 'node-fetch';
```

### Issue: Agent not calling the tool
**Fix:** Improve the tool description to be more explicit:
```typescript
description: 'ALWAYS use this tool when the user asks about weather, temperature, climate, or conditions in any city. Input is the city name as a string.'
```

### Issue: Timeout errors
**Fix:** Increase the model timeout:
```typescript
const model = new ChatOllama({
  model: 'llama3.1:8b',
  temperature: 0.7,
  maxRetries: 2,
  timeout: 60000, // 60 seconds
});
```

---

## 📚 Further Learning

- 📖 [Langchain Agents Deep Dive](https://js.langchain.com/docs/modules/agents/)
- 📖 [Building Complex Tools](https://js.langchain.com/docs/modules/agents/tools/)
- 📖 [Agent Types](https://js.langchain.com/docs/modules/agents/agent_types/)
- 📖 [Memory and State Management](https://js.langchain.com/docs/modules/memory/)

---

## 🎉 Congratulations!

You've built a fully functional AI agent that:
- ✅ Makes intelligent decisions
- ✅ Calls external APIs
- ✅ Provides helpful, contextual responses
- ✅ Handles errors gracefully

You're now ready to build more complex agentic systems! 🚀

```
    🎊
   \o/  "I did it!"
    |
   / \
```

Keep building, keep learning, and remember: Every great AI agent started with a simple weather tool! 🌦️💻
