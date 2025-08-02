// Test script to verify Hugging Face integration
const testMessage = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/ask-agent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: "What services do you offer?"
      }),
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    console.log('✅ Success!')
    console.log('Response:', data.response)
    console.log('Model:', data.model)
    console.log('Timestamp:', data.timestamp)
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

// Run the test
testMessage() 

