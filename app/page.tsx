import Calculator from '@/components/Calculator'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Calculator</h1>
          <p className="text-gray-400">Simple arithmetic operations with a clean interface</p>
        </div>
        <Calculator />
      </div>
    </main>
  )
}