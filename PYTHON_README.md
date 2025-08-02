# Python Setup for Hugging Face AI Agent

This directory contains Python scripts that use the Hugging Face model instead of Ollama for the AI agent functionality.

## Setup Instructions

### 1. Virtual Environment Setup

The virtual environment is already created. To activate it:

**Windows (PowerShell):**
```powershell
.venv\Scripts\Activate.ps1
```

**Windows (Command Prompt):**
```cmd
.venv\Scripts\activate.bat
```

**Linux/Mac:**
```bash
source .venv/bin/activate
```

### 2. Install Dependencies

All dependencies are already installed. If you need to reinstall:

```bash
pip install -r requirements.txt
```

### 3. Environment Variables

1. Copy the environment template:
   ```bash
   copy python.env.example .env
   ```

2. Edit `.env` and add your Hugging Face token:
   ```
   HF_TOKEN=your_actual_hugging_face_token_here
   ```

3. Get your Hugging Face token from: https://huggingface.co/settings/tokens

### 4. Testing the AI Agent

Run the interactive chat script:
```bash
python hf_agent.py
```

Or test the basic functionality:
```bash
python hf_chat.py
```

## Files Overview

- `hf_agent.py` - Complete AI agent with system prompt and interactive chat
- `hf_chat.py` - Basic chat functionality
- `requirements.txt` - Python dependencies
- `python.env.example` - Environment variables template

## Integration with Next.js

To integrate this with your Next.js project, you can:

1. Create a Python API endpoint that your Next.js app can call
2. Use the `chat_with_hf_model()` function from `hf_agent.py`
3. Return JSON responses that your Next.js frontend can consume

## Model Information

- **Model**: `meta-llama/Llama-3.1-8B-Instruct:novita`
- **Provider**: Hugging Face Inference API
- **Base URL**: `https://router.huggingface.co/v1`

## Troubleshooting

1. **Token Issues**: Make sure your HF_TOKEN is valid and has the necessary permissions
2. **Network Issues**: Ensure you have internet connectivity to access Hugging Face API
3. **Virtual Environment**: Always activate the virtual environment before running scripts 