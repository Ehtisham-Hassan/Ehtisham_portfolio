import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  // title: 'Ehtisham - AI Agent Developer & Automation Expert',
  title: 'Dev2c',
  description: 'I Build Custom AI Agents & Automation Workflows That Work. Specializing in Ollama, n8n, and voice-enabled AI solutions.',
  // description:`Build AI That Powers Your Business`,
  keywords: 'AI Agent, Automation, Ollama, n8n, Voice AI, Chatbot, Developer, Portfolio',
  authors: [{ name: 'Dev2C' }],
  openGraph: {
    title: 'Dev2C - AI Agent Developer & Automation',
    description: 'We Build Custom AI Agents & Automation Workflows That Work',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dev2C - AI Agent Developer & Automation',
    description: 'We Build Custom AI Agents & Automation Workflows That Work',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} bg-dev2c-bg text-dev2c-text antialiased`}>
        {children}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </body>
    </html>
  )
} 