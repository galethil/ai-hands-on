# 🦙 Ollama Local LLM Setup Exercise

```
    ___   _  _
   / _ \ | || | __ _ _ __  _     __ _
  | | | || || |/ _` | '_ \/_ \  / _` |
  | |_| || || | (_| | | | | | || (_| |
   \___/ |_||_|\__,_|_| |_| |_| \__,_|
   
   "Your local AI companion is waiting!"
```

Welcome to the **most empowering AI exercise ever!** 🎉

In this exercise, you'll break free from cloud dependency and run a powerful Large Language Model (LLM) **right on your own machine**. No API keys, no rate limits, no internet required (after download). Just you and your new silicon friend! 🤖💻

---

## EXERCISES

### 1. **RUN Llama 3.1 locally**

Start and use Ollama locally in docker. Download `llama3.1:8b` model and chat with it. [Ollama quickstart](https://docs.ollama.com/quickstart)

**Acceptance criteria**

- When you run `docker exec -it ollama ollama run llama3.1:8b` you can chat with the model.

### 2. **Use Rest API**

Start and use Ollama's API interface. [Ollama API documentation](https://docs.ollama.com/api/introduction#example-request)

- Make an HTPP request (with curl or Postman) that will ask "What is the capital of Slovakia?". You should get an correct answer. 

### 3. **List all downloaded models**

- Use terminal to list all downloaded models in your Ollama

### 4. **Delete downloaded model**

- Use terminal to delete downloaded model.
- List all downloaded models to confirm

---

## 📚 Before you start - reading & setup

Before you embark on this journey to AI independence, arm yourself with knowledge:

### 1. **What is Ollama?**
- A tool that makes running of any open-source LLM locally as easy as `ollama run llama3.1`
- Think Docker, but for AI models 🐳 → 🦙
- 📖 [Ollama Official Website](https://ollama.com/) (optional)

### 2. **Understanding Large Language Models (LLMs)**
- Models like GPT, Llama, Mistral, Gemma
- They understand and generate human-like text
- Size matters: 🔝 Bigger models (70B) are smarter but slower; 👇 smaller models (7B) are faster but less capable
- Find your model here [Ollama models search](https://ollama.com/search)

### 3. **System Requirements**
- 📖 [Ollama System Requirements](https://github.com/ollama/ollama#system-requirements)
- **RAM**: 8GB minimum (16GB+ recommended)
- **Disk Space**: 5-50GB per model (varies by size)
- **CPU/GPU**: Works on both, but GPU is much faster
- docker or native macOS, Linux, and Windows supported

### 4. **REST API Basics**
- Ollama exposes a REST API on `http://localhost:11434`
- You can interact with it via curl, Postman, or programming languages
- Understanding POST requests and JSON payloads

---

## 🎯 Exercise Goal

By the end of this exercise, you will:

1. ✅ **Install Ollama** on your local machine
2. ✅ **Download and run an LLM** (like Llama 3.1)
3. ✅ **Interact with the model** via the command line
4. ✅ **Test the REST API** to understand how applications connect to Ollama
5. ✅ **Understand model management** (listing, removing, updating models)
6. ✅ **Know your way around different models** and their use cases


---

## 🎬 Ready? Let's Go!

Head over to [`99_solution/README.md`](./99_solution/README.md) for the complete walkthrough!

Here you can find [`Additional information`](./ADDITIONAL_INFORMATION.md) about this exercise.

Remember: Every AI expert started by running their first local model. Today is YOUR day! 🦙💪

```
     🦙
    /||\ 
     ||    "Let's do this!"
    /  \
```

---

Happy local AI adventures! 🚀🤖
