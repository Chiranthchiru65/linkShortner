import { useState } from "react";

function App() {
  const [longUrl, setLongUrl] = useState<string>();

  return (
    <div className="h-screen flex justify-center items-center ">
      <div className=" bg-white w-2xl h-1/2 rounded-3xl p-6 justify-between flex flex-col">
        <p className="text-3xl font-semibold">Shorten a long link</p>
        <div className="flex gap-2 flex-col">
          <p className="font-semibold text-lg">Paste your long link here</p>
          <input
            className="border p-2 rounded-lg"
            placeholder="enter your long url here..."
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
          />
        </div>
        <button className="text-white p-4 flex items-center gap-2 rounded-2xl bg-black flex-end hover:bg-blue-500">
          Get your link for free
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-arrow-right-icon lucide-arrow-right"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}

export default App;

// what next ? when i give the link it should store somewhere in something like dynamoDB
// so need a proper schema for me to store it
// and i need to generate a short url just before storing it in the DB
