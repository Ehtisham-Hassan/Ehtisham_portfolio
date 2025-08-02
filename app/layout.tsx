import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ehtisham - AI Agent Developer & Automation Expert',
  description: 'I Build Custom AI Agents & Automation Workflows That Work. Specializing in Ollama, n8n, and voice-enabled AI solutions.',
  keywords: 'AI Agent, Automation, Ollama, n8n, Voice AI, Chatbot, Developer, Portfolio',
  authors: [{ name: 'Ehtisham' }],
  openGraph: {
    title: 'Ehtisham - AI Agent Developer & Automation Expert',
    description: 'I Build Custom AI Agents & Automation Workflows That Work',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ehtisham - AI Agent Developer & Automation Expert',
    description: 'I Build Custom AI Agents & Automation Workflows That Work',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  
                  if (theme === 'dark' || (!theme && systemPrefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>
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