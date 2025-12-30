# 🎯 Step-by-Step Ollama Installation Guide

This guide will walk you through installing Ollama and running your first local LLM. 🦙💪

---

## 📋 What We'll Accomplish

By the end of this guide, you'll have:
1. ✅ Ollama installed on your system
2. ✅ Ollama service running
3. ✅ Your first model downloaded and tested
4. ✅ Confidence to use Ollama in projects

---

## 🖥️ Step 1: Install Ollama (Choose Your OS/method)

### Option A: run in Docker 🐳

1. **Download the docker engine:**
   - E.g. Visit [https://rancherdesktop.io/](https://rancherdesktop.io/)
   - Download installer, install it and start it

2. **Start Ollama in Docker**
   - Run command

```bash
docker run -d -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama
```

### Option B: macOS 🍎

**Method 1: Homebrew (Recommended)**

```bash
# Install via Homebrew
brew install ollama
```

**Method 2: Download Installer**

1. Visit [https://ollama.ai/download](https://ollama.ai/download)
2. Download the macOS installer
3. Open the `.dmg` file
4. Drag Ollama to Applications
5. Launch Ollama from Applications

**Verify installation:**
```bash
ollama --version
```

You should see something like: `ollama version is 0.1.x`

---

### Option C: Windows 🪟

1. **Download the installer:**
   - Visit [https://ollama.ai/download](https://ollama.ai/download)
   - Download `OllamaSetup.exe`

2. **Run the installer:**
   - Double-click `OllamaSetup.exe`
   - Follow the installation wizard
   - Ollama will start automatically

3. **Verify installation:**
   Open PowerShell or Command Prompt:
   ```powershell
   ollama --version
   ```

**Note:** On Windows, Ollama runs as a system service in the background.

---

## 🚀 Step 2: Start the Ollama Service

### macOS & Windows
Ollama should start automatically. If not:

**docker:**
```bash
docker run -d -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama
```

**macOS:**
```bash
ollama serve
```

**Windows:**
- Ollama runs as a background service automatically
- Check the system tray for the Ollama icon


**Verify the service is running:**
```bash
# This should return the Ollama version
curl http://localhost:11434/
```

Expected output:
```
Ollama is running
```

---

## 📦 Step 3: Pull Your First Model

Let's download **Llama 3.1 8B** - the perfect balance of quality and performance!

```bash
# in Docker 🐳
docker exec -it ollama ollama pull llama3.1:8b
```

```bash
# in native apps
ollama pull llama3.1:8b
```

**What's happening?**
- Ollama downloads the model from the Ollama library
- Size: ~4.7GB (this will take a few minutes)
- Models are stored in `~/.ollama/models`

**Other popular models you can try:**
```bash
# Smaller, faster models
ollama pull llama3.2:3b          # 2GB - Very fast
ollama pull gemma2:2b            # 1.6GB - Tiny but capable

# Similar size alternatives
ollama pull mistral:7b           # 4.1GB - Great reasoning
ollama pull gemma2:9b            # 5.4GB - Creative

# Specialized models
ollama pull codellama:7b         # Code generation
ollama pull llama3.2-vision:11b  # Can analyze images!

# Larger, more powerful (needs 48GB+ RAM)
ollama pull llama3.1:70b         # 40GB - Near GPT-4 quality
```

**Pro tip:** You can specify quantization levels:
```bash
ollama pull llama3.1:8b-q4_K_M  # Smaller, faster, slightly lower quality
ollama pull llama3.1:8b-q8_0    # Larger, slower, higher quality
```

---

## 💬 Step 4: Chat with Your Model

Now for the fun part - talk to your AI! 🎉

```bash
# in Docker 🐳
docker exec -it ollama ollama run llama3.1:8b
```

```bash
# native apps
ollama run llama3.1:8b
```

You'll enter an interactive chat session:

```
>>> Hello! Who are you?

I'm Llama, an AI assistant. I'm here to help answer your questions, provide 
information, and have a conversation with you. I'm a large language model 
trained on a massive dataset of text, which allows me to understand and 
respond to a wide range of topics and questions.

>>> What's the capital of France?

The capital of France is Paris.

>>> Write a haiku about coding

Code flows through the night
Bugs flee from the debugger
Coffee fuels the mind

>>> /bye
```

**Useful chat commands:**
- `/bye` - Exit the chat
- `/clear` - Clear conversation history
- `/set parameter temperature 0.8` - Adjust settings
- `/show info` - Display model information
- `/help` - Show all commands

---

## 🧪 Step 5: Test the REST API

Ollama exposes a REST API that your applications can use. Let's test it!

**Method 1: Using curl (Terminal)**

```bash
curl http://localhost:11434/api/generate -d '{
  "model": "llama3.1:8b",
  "prompt": "Why is the sky blue?",
  "stream": false
}'
```

**Method 2: Using curl with streaming**

```bash
curl http://localhost:11434/api/generate -d '{
  "model": "llama3.1:8b",
  "prompt": "Tell me a short joke",
  "stream": true
}'
```

**Method 3: Chat API (maintains conversation context)**

```bash
curl http://localhost:11434/api/chat -d '{
  "model": "llama3.1:8b",
  "messages": [
    {
      "role": "user",
      "content": "What is 2+2?"
    }
  ],
  "stream": false
}'
```

**API Response Structure:**
```json
{
  "model": "llama3.1:8b",
  "created_at": "2025-12-30T12:34:56.789Z",
  "response": "The sky appears blue because...",
  "done": true,
  "total_duration": 1234567890,
  "load_duration": 12345678,
  "prompt_eval_count": 15,
  "eval_count": 87
}
```

---

## 🛠️ Step 6: Model Management

Now that you're running models, let's learn to manage them!

### List Installed Models
```bash
ollama list
```

Output example:
```
NAME              ID            SIZE    MODIFIED
llama3.1:8b       a1b2c3d4e5    4.7 GB  2 hours ago
mistral:7b        f6g7h8i9j0    4.1 GB  1 day ago
gemma2:2b         k1l2m3n4o5    1.6 GB  3 days ago
```

### Show Model Details
```bash
ollama show llama3.1:8b
```

Shows detailed information including:
- Architecture
- Parameters
- Quantization level
- Template
- License

### Remove a Model
```bash
ollama rm mistral:7b
```

**Why remove models?**
- Free up disk space (each model is several GB)
- Keep your system clean
- Models can always be re-downloaded

### Update a Model
```bash
ollama pull llama3.1:8b
```

If a new version exists, it will download and replace the old one.

### Copy/Rename a Model
```bash
ollama cp llama3.1:8b my-custom-model
```

Useful for creating model variants with custom configurations.

---

## 🎨 Step 7: Advanced Configuration

### Customize Model Parameters

Create a `Modelfile` to customize behavior:

```bash
# Create a Modelfile
cat > Modelfile << 'EOF'
FROM llama3.1:8b

# Set the temperature (creativity level)
PARAMETER temperature 0.8

# Set the context window
PARAMETER num_ctx 4096

# System prompt
SYSTEM """
You are a helpful coding assistant. You provide clear, concise code examples
and explain concepts in simple terms. Always format code with proper syntax.
"""
EOF

# Create your custom model
ollama create my-coding-assistant -f Modelfile

# Use it
ollama run my-coding-assistant
```

**Common parameters:**
- `temperature`: 0.0 (deterministic) to 2.0 (very creative)
- `top_p`: 0.0 to 1.0 (nucleus sampling)
- `num_ctx`: Context window size (e.g., 2048, 4096, 8192)
- `num_predict`: Max tokens to generate
- `repeat_penalty`: Reduce repetition (1.0 = no penalty)

---

## 🌐 Step 8: Using Ollama in Code

### Python Example

```python
import requests
import json

def chat_with_ollama(prompt, model="llama3.1:8b"):
    url = "http://localhost:11434/api/generate"
    
    payload = {
        "model": model,
        "prompt": prompt,
        "stream": False
    }
    
    response = requests.post(url, json=payload)
    result = response.json()
    
    return result["response"]

# Use it
answer = chat_with_ollama("Explain quantum computing in simple terms")
print(answer)
```

### Node.js/TypeScript Example

```typescript
async function chatWithOllama(prompt: string, model = "llama3.1:8b") {
  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      prompt,
      stream: false,
    }),
  });
  
  const data = await response.json();
  return data.response;
}

// Use it
const answer = await chatWithOllama("What is TypeScript?");
console.log(answer);
```

### Using Langchain with Ollama

```typescript
import { ChatOllama } from '@langchain/ollama';

const model = new ChatOllama({
  model: "llama3.1:8b",
  temperature: 0.7,
});

const response = await model.invoke("Tell me a joke about programming");
console.log(response);
```

---

## 🐛 Troubleshooting Common Issues

### Issue 1: "Connection refused" or "Cannot connect to Ollama"

**Solution:**
```bash
# Check if Ollama is running
curl http://localhost:11434/

# If not, start it
ollama serve
```

### Issue 2: "Model not found"

**Solution:**
```bash
# List your models
ollama list

# Pull the model if missing
ollama pull llama3.1:8b
```

### Issue 3: "Out of memory" or system freezing

**Solutions:**
1. Use a smaller model:
   ```bash
   ollama pull llama3.2:3b
   ```

2. Close other applications

3. Adjust context window:
   ```bash
   ollama run llama3.1:8b
   >>> /set parameter num_ctx 2048
   ```

### Issue 4: "Port 11434 already in use"

**Solution:**
```bash
# Find and kill the process using port 11434
lsof -ti:11434 | xargs kill -9

# Or on Windows
netstat -ano | findstr :11434
taskkill /PID <PID> /F

# Restart Ollama
ollama serve
```

### Issue 5: Model downloads are slow

**Solutions:**
1. Check your internet connection
2. Use a smaller quantization:
   ```bash
   ollama pull llama3.1:8b-q4_K_M
   ```
3. Try a different mirror if available

### Issue 6: GPU not being used (if you have one)

**Check GPU usage:**
```bash
# macOS
ollama run llama3.1:8b
# Look for "metal" in the startup message

# Linux with NVIDIA GPU
nvidia-smi

# Windows
nvidia-smi  # or Task Manager → Performance
```

**Solution:**
- Ollama automatically uses GPU if available
- Make sure GPU drivers are up to date
- On Linux, install nvidia-container-toolkit for Docker

---

## 📊 Performance Tips

### Speed Up Inference

1. **Use GPU acceleration** (automatic if available)
2. **Choose appropriate quantization:**
   - Q4_K_M: Fastest, good quality
   - Q5_K_M: Balanced
   - Q8_0: Slower, best quality

3. **Reduce context window:**
   ```bash
   /set parameter num_ctx 2048
   ```

4. **Adjust temperature** (lower = faster):
   ```bash
   /set parameter temperature 0.3
   ```

### Save Memory

1. **Unload models when not in use:**
   ```bash
   # Models auto-unload after 5 minutes of inactivity
   # Or force unload:
   curl http://localhost:11434/api/unload -d '{"model": "llama3.1:8b"}'
   ```

2. **Use smaller models:**
   - llama3.2:3b instead of llama3.1:8b
   - gemma2:2b for simple tasks

3. **Limit concurrent models**

---

## 🎓 Understanding Model Variants

### Model Naming Convention

```
llama3.1:8b-q4_K_M
   ↓      ↓    ↓
  name  size quant
```

- **Name**: llama3.1, mistral, gemma2
- **Size**: 3b, 7b, 8b, 70b (billion parameters)
- **Quantization**: q4_K_M, q5_K_M, q8_0

### Quantization Explained

| Level | Quality | Size | Speed | Use Case |
|-------|---------|------|-------|----------|
| Q4_K_M | Good | Smallest | Fastest | Most tasks |
| Q5_K_M | Better | Medium | Fast | Balanced |
| Q6_K | Great | Large | Moderate | High quality |
| Q8_0 | Best | Largest | Slowest | Critical tasks |

**Recommendation:** Start with Q4_K_M, upgrade if needed.

---

## 🚀 Next Steps

Congratulations! You now have Ollama running locally! 🎉

### What to do next:

1. **Experiment with different models:**
   ```bash
   ollama pull mistral:7b
   ollama pull gemma2:9b
   ollama run mistral:7b
   ```

2. **Build something:**
   - Create a chatbot
   - Build a code assistant
   - Make a document analyzer
   - Create custom AI tools

3. **Integrate with your projects:**
   - Use in your TypeScript/Python apps
   - Connect to Langchain agents
   - Build REST API wrappers

4. **Join the community:**
   - [Ollama Discord](https://discord.gg/ollama)
   - [Reddit r/LocalLLaMA](https://reddit.com/r/LocalLLaMA)
   - Share your projects!

---

## 📚 Additional Resources

### Official Documentation
- [Ollama Documentation](https://github.com/ollama/ollama/tree/main/docs)
- [Model Library](https://ollama.ai/library)
- [API Documentation](https://github.com/ollama/ollama/blob/main/docs/api.md)

### Tutorials & Guides
- [Awesome Ollama](https://github.com/jmorganca/awesome-ollama) - Curated list
- [Ollama Blog](https://ollama.ai/blog) - Updates and tutorials
- [YouTube Tutorials](https://www.youtube.com/results?search_query=ollama+tutorial)

### Tools & Integrations
- **Web UIs:**
  - [Open WebUI](https://github.com/open-webui/open-webui) - ChatGPT-like interface
  - [Ollama WebUI](https://github.com/ollama-webui/ollama-webui)
  
- **IDE Integration:**
  - [Continue.dev](https://continue.dev/) - VS Code/JetBrains plugin
  - [Ollama Copilot](https://github.com/bernardo-bruning/ollama-copilot)

- **Mobile:**
  - [Enchanted](https://github.com/AugustDev/enchanted) - iOS app
  - [LLocal](https://github.com/Joshuah143/LLocal) - Android app

---

## 🎉 You Did It!

You're now part of the local AI revolution! 🦙🚀

```
    ★ ★ ★
   ★     ★
  ★  🦙  ★
   ★     ★
    ★ ★ ★
    
 "You're now a
  local AI master!"
```

Remember:
- 🔒 Your data stays private
- 💰 Zero API costs
- ⚡ Lightning-fast responses
- 🎮 Full control over your AI

Now go build something amazing! 💪💻

---

## 🤔 Quick Reference Card

```bash
# Essential Commands
ollama --version          # Check version
ollama serve              # Start Ollama
ollama list               # List models
ollama pull <model>       # Download model
ollama run <model>        # Start chat
ollama rm <model>         # Remove model
ollama show <model>       # Model details

# Chat Commands (inside ollama run)
/bye                      # Exit
/clear                    # Clear history
/set parameter <name> <value>  # Adjust setting
/help                     # Show help

# API Endpoints
POST http://localhost:11434/api/generate   # Generate
POST http://localhost:11434/api/chat       # Chat
GET  http://localhost:11434/api/tags       # List models
```

Keep this guide bookmarked - you'll reference it often! 📖
