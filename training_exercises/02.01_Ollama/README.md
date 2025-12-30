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

## 🚀 EXERCISES 🚀

Complete these exercises in order to master local LLM deployment and management!

---

### Exercise 1: Run Llama 3.1 Locally

**📝 Task:**  
Start and use Ollama locally in Docker. Download the `llama3.1:8b` model and chat with it.

**📚 Resources:**  
[Ollama Quickstart Guide](https://docs.ollama.com/quickstart)

**✅ Acceptance Criteria:**
- ✓ You can successfully run `docker exec -it ollama ollama run llama3.1:8b`
- ✓ You can have a conversation with the model in your terminal

---

### Exercise 2: Use the REST API

**📝 Task:**  
Interact with Ollama through its HTTP API interface.

**📚 Resources:**  
[Ollama API Documentation](https://docs.ollama.com/api/introduction#example-request)

**✅ Acceptance Criteria:**
- ✓ Make an HTTP request (using curl or Postman) asking "What is the capital of Slovakia?"
- ✓ Receive a correct answer from the model via the API

---

### Exercise 3: List All Downloaded Models

**📝 Task:**  
Use the Ollama CLI to view all models currently stored on your system.

**✅ Acceptance Criteria:**
- ✓ Successfully list all downloaded models using the terminal
- ✓ Verify that `llama3.1:8b` appears in the list

---

### Exercise 4: Delete a Downloaded Model

**📝 Task:**  
Clean up your local storage by removing a model you no longer need.

**✅ Acceptance Criteria:**
- ✓ Successfully delete a downloaded model using the terminal
- ✓ List all models again to confirm the deletion

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
