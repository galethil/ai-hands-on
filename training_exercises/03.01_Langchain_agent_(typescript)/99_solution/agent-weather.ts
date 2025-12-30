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

const run = async (weatherQuery: string) => {
  console.log('🌦️ Weather Agent is ready!\n');
  
  console.log(`User: ${weatherQuery}\n`);
  
  const response = await agent.invoke({
    messages: weatherQuery,
  });
  
  console.log('Agent:', response);
};

run("What's the weather like in Paris?");
