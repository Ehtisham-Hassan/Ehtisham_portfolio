import os
from openai import OpenAI

# Initialize the OpenAI client with Hugging Face configuration
client = OpenAI(
    base_url="https://router.huggingface.co/v1",
    api_key=os.environ["HF_TOKEN"],
)

def chat_with_hf_model(message):
    """
    Send a message to the Hugging Face model and get a response
    """
    try:
        completion = client.chat.completions.create(
            model="meta-llama/Llama-3.1-8B-Instruct:novita",
            messages=[
                {
                    "role": "user",
                    "content": message
                }
            ],
        )
        
        return completion.choices[0].message.content
    except Exception as e:
        print(f"Error: {e}")
        return None

if __name__ == "__main__":
    # Example usage
    response = chat_with_hf_model("What is the capital of France?")
    print(f"Response: {response}") 