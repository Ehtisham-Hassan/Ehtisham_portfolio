import { NextRequest, NextResponse } from 'next/server'
import { OpenAI } from 'openai'

const HF_TOKEN = process.env.HF_TOKEN
const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL

// Initialize the OpenAI client with Hugging Face configuration
const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: HF_TOKEN,
})

// System prompt for the AI agent
const SYSTEM_PROMPT = `You are the Dev2c AI assistant on our portfolio website. You help visitors learn about our services and expertise. Your response should be around 50 words MAx.

Key Information about Dev2c:
- AI Agent Developers and Automation Experts
- Specializes in custom AI agents, workflow automation, and voice interfaces
- Uses technologies like Ollama, n8n, FastAPI, Next.js, and Web Speech API
- Offers services in AI agent development, workflow automation, and API solutions
- Provides free consultancy calls for potential clients

Your role:
- Answer questions about Dev2c's services and expertise Only
- Help visitors understand AI agents and automation
- Be helpful, professional, and concise
- Encourage booking a free consultancy call if someone shows interest
- Keep responses under 50 words unless more detail is specifically requested

Always be friendly and professional. If someone asks about booking a call or shows interest in services, mention the free consultancy option.`

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      )
    }

    // Prepare the prompt for Ollama
    const fullPrompt = `${SYSTEM_PROMPT}

User: ${message}
Assistant:`

    // Call Hugging Face API
    const completion = await client.chat.completions.create({
      model: "meta-llama/Llama-3.1-8B-Instruct:novita",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT
        },
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 100,
      temperature: 0.6,
    })

    const aiResponse = completion.choices[0].message.content || "I'm sorry, I couldn't generate a response right now."

    // Send to n8n webhook if configured (optional)
    if (N8N_WEBHOOK_URL) {
      try {
        await fetch(N8N_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userMessage: message,
            aiResponse: aiResponse,
            timestamp: new Date().toISOString(),
            userAgent: request.headers.get('user-agent'),
            ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
          }),
        })
      } catch (webhookError) {
        console.error('Failed to send to n8n webhook:', webhookError)
        // Don't fail the request if webhook fails
      }
    }

    return NextResponse.json({
      response: aiResponse,
      model: 'meta-llama/Llama-3.1-8B-Instruct:novita',
      timestamp: new Date().toISOString(),
    })

  } catch (error) {
    console.error('Error in ask-agent API:', error)
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        response: "I'm sorry, I'm having trouble connecting to my AI brain right now. Please try again in a moment!"
      },
      { status: 500 }
    )
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
} 