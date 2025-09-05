import Calculator from '@/components/Calculator'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Scientific Calculator</h1>
          <p className="text-gray-400">Advanced mathematical operations with scientific functions</p>
          <div className="mt-4 text-sm text-gray-500">
            <p>• Click MODE to toggle between basic and scientific calculator</p>
            <p>• Switch between degrees and radians for trigonometric functions</p>
            <p>• Memory functions: MS (store), MR (recall), MC (clear)</p>
          </div>
        </div>
        <div className="flex justify-center">
          <Calculator />
        </div>
      </div>
    </main>
  )
}