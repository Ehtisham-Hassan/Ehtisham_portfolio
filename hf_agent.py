import os
import json
from openai import OpenAI
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
print(os.environ["HF_TOKEN"])
# Initialize the OpenAI client with Hugging Face configuration
client = OpenAI(
    base_url="https://router.huggingface.co/v1",
    api_key=os.environ["HF_TOKEN"],
)

# System prompt for the AI agent
SYSTEM_PROMPT = """You are Ehtisham's AI assistant on his portfolio website. You help visitors learn about his services and expertise only you donot tell.about other you responce should be around 50 words MAx.

Key Information about Ehtisham:
- AI Agent Developer and Automation Expert
- Specializes in custom AI agents, workflow automation, and voice interfaces
- Uses technologies like Ollama, n8n, FastAPI, Next.js, and Web Speech API
- Offers services in AI agent development, workflow automation, and API solutions
- Provides free consultancy calls for potential clients

Your role:
- Answer questions about Ehtisham's services and expertise Only
- Help visitors understand AI agents and automation
- Be helpful, professional, and concise
- Encourage booking a free consultancy call if someone shows interest
- Keep responses under 50 words unless more detail is specifically requested

Always be friendly and professional. If someone asks about booking a call or shows interest in services, mention the free consultancy option."""

def chat_with_hf_model(user_message):
    """
    Send a message to the Hugging Face model and get a response
    """
    try:
        # Prepare the full conversation with system prompt
        messages = [
            {
                "role": "system",
                "content": SYSTEM_PROMPT
            },
            {
                "role": "user",
                "content": user_message
            }
        ]
        
        completion = client.chat.completions.create(
            model="meta-llama/Llama-3.1-8B-Instruct:novita",
            messages=messages,
            max_tokens=100,
            temperature=0.6,
        )
        
        return {
            "success": True,
            "response": completion.choices[0].message.content,
            "model": "meta-llama/Llama-3.1-8B-Instruct:novita"
        }
    except Exception as e:
        print(f"Error: {e}")
        return {
            "success": False,
            "error": str(e),
            "response": "I'm sorry, I'm having trouble connecting to my AI brain right now. Please try again in a moment!"
        }

def main():
    """
    Main function for testing the chat functionality
    """
    print("🤖 Ehtisham's AI Assistant (Hugging Face Model)")
    print("Type 'quit' to exit")
    print("-" * 50)
    
    while True:
        user_input = input("\nYou: ").strip()
        
        if user_input.lower() in ['quit', 'exit', 'bye']:
            print("Goodbye! 👋")
            break
            
        if not user_input:
            continue
            
        print("\n🤖 Assistant: ", end="")
        result = chat_with_hf_model(user_input)
        
        if result["success"]:
            print(result["response"])
        else:
            print(f"Error: {result['error']}")

if __name__ == "__main__":
    main() 