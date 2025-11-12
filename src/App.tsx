import { useState } from "react";
import { Link, Copy, Check, Sparkles } from "lucide-react";

function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShortenUrl = async () => {
    if (!longUrl.trim()) {
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(
        "https://d7kxe3kn49.execute-api.ap-south-1.amazonaws.com/shorten",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ longUrl }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setShortUrl(data.shortUrl);
      } else {
        alert("Something went wrong: " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to the server");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleKeyPress = (e: { key: string }) => {
    if (e.key === "Enter" && !isLoading) {
      handleShortenUrl();
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div
          className="absolute top-40 right-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-16 sm:h-16 bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6 shadow-lg">
            <Link className="w-8 h-8 sm:w-6 sm:h-6 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
            URL Shortener
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-md mx-auto px-4">
            Transform your long links into short, shareable URLs in seconds
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl shadow-indigo-200/50 p-6 sm:p-8 lg:p-10 border border-white/20">
          <div className="space-y-6">
            {/* Input Section */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Paste your long URL
              </label>
              <div className="relative">
                <input
                  type="url"
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 pr-12 border-2 border-gray-200 rounded-xl sm:rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200 text-sm sm:text-base"
                  placeholder="https://example.com/your-very-long-url..."
                  value={longUrl}
                  onChange={(e) => setLongUrl(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                {longUrl && (
                  <button
                    onClick={() => setLongUrl("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Result Section */}
            {shortUrl && (
              <div className="bg-linear-to-br from-indigo-50 to-purple-50 border-2 border-indigo-100 rounded-xl sm:rounded-2xl p-4 sm:p-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-600 mb-2">
                      Your shortened link
                    </p>
                    <a
                      href={shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-700 font-semibold break-all transition-colors text-sm sm:text-base"
                    >
                      {shortUrl}
                    </a>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="shrink-0 p-2 sm:p-2.5 bg-white hover:bg-indigo-50 rounded-lg sm:rounded-xl border border-indigo-200 transition-all duration-200 hover:scale-105 active:scale-95"
                    title="Copy to clipboard"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Button */}
            <button
              onClick={handleShortenUrl}
              disabled={isLoading || !longUrl.trim()}
              className="w-full bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 sm:py-4 px-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 sm:gap-3 group text-sm sm:text-base"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Shortening...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  Shorten URL
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs sm:text-sm text-gray-600 mt-6 sm:mt-8 px-4">
          No registration required. All links are generated instantly.
        </p>
      </div>
    </div>
  );
}

export default App;
