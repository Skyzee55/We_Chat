import { MessageCircle, Users, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"

const NoChatSelect = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 flex items-center justify-center px-6 py-10">
        <div className="relative flex flex-col items-center text-center max-w-md space-y-6">
          {/* Animated Icons */}
          <div className="relative mb-6">
            <div
              className={`transition-all duration-1000 ease-out ${
                isVisible ? "scale-100 opacity-100" : "scale-50 opacity-0"
              }`}
            >
              <div className="relative">
                <MessageCircle size={80} className="text-gray-300 animate-pulse" />
                <Sparkles
                  size={20}
                  className="absolute -top-2 -right-2 text-blue-400 animate-bounce"
                  style={{ animationDelay: "0.5s" }}
                />
                <Sparkles
                  size={16}
                  className="absolute -bottom-1 -left-3 text-purple-400 animate-bounce"
                  style={{ animationDelay: "1s" }}
                />
              </div>
            </div>

            {/* Orbiting Users */}
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: "8s" }}>
              <Users size={24} className="absolute -top-6 left-1/2 -translate-x-1/2 text-green-400" />
            </div>
          </div>

          {/* Title and Text */}
          <div
            className={`space-y-3 transition-all duration-1000 ease-out delay-300 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <h2 className="text-2xl font-semibold text-base-content">Pilih Chat untuk Memulai</h2>
            <p className="text-base-content/60">
              Pilih percakapan dari daftar di sebelah kiri untuk mulai mengirim dan menerima pesan
            </p>
          </div>

          {/* Bouncing dots */}
          <div
            className={`flex space-x-2 mt-6 transition-all duration-1000 ease-out delay-500 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
            <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30 animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl opacity-30 animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>
    </div>
  )
}

export default NoChatSelect
