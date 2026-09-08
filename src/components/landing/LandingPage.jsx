import VideoBackground from './VideoBackground.jsx'

export default function LandingPage({ onGetStarted }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#05060a]">
      {/* video background */}
      <VideoBackground />

      {/* content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 bg-white/5 backdrop-blur border border-white/10 rounded-full px-3 py-1 mb-6">
          Free · No sign-up · Built for ATS
        </span>

        <div className="relative flex items-center justify-center">
          <img
            src="/images/nexus-copy-logo.png"
            alt="Nexus Copy"
            className="w-80 sm:w-96 md:w-[28rem] h-auto drop-shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
          />
        </div>

        <p className="mt-6 max-w-xl text-base sm:text-lg text-white/70 leading-relaxed">
         Build a clean, professional, ATS-friendly CV. Enter your details, organize your experience and export a clean PDF in minutes.
        </p>

        <div className="relative group mt-8">
          <button
            type="button"
            onClick={onGetStarted}
            className="relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
          >
            <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <span className="relative z-10 block px-6 py-3 rounded-xl bg-gray-950">
              <div className="relative z-10 flex items-center space-x-2">
                <span className="transition-all duration-500 group-hover:translate-x-1">
                  Get Started
                </span>
                <svg
                  className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                    fillRule="evenodd"
                  />
                </svg>
              </div>
            </span>
          </button>
        </div>

        <p className="mt-4 font-mono text-[11px] text-white/40">
          Everything stays in your browser.
        </p>
      </div>
    </div >
  )
}