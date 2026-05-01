import Navbar from '@/components/Navbar'
import DemoChatbot from '@/components/DemoChatbot'

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-dev2c-bg flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 pb-20 px-8 sm:px-12 lg:px-16 flex flex-col justify-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-[#1B4332] hover:text-green-700 transition tracking-tight">
              Interactive Live Demo
            </h1>
            <p className="text-lg text-dev2c-textmuted max-w-2xl mx-auto">
              Experience the power of our real estate AI agent live. This demo connects directly to our automated backend workflow, qualifying leads and finding listings in real-time.
            </p>
          </div>

          <DemoChatbot />
        </div>
      </main>
    </div>
  )
}
