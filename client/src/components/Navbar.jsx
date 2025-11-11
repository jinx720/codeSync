import { useState } from "react";
import { MessageSquare } from "lucide-react";
import ProfilePanel from "./ProfilePanel";

function Navbar({ onSearch, currentUser }) {
  const [query, setQuery] = useState("");
  const [showProfile, setShowProfile] = useState(false);

  function handleSearch(e) {
    setQuery(e.target.value);
    onSearch(e.target.value);
  }

  return (
    <>
      <nav className="w-full bg-[#1a152b]/95 backdrop-blur-md text-[#f1f0f5] sticky top-0 z-50 border-b border-[#2a2540]">
        <div className="flex items-center justify-between w-full px-8 py-4">
          {/* Left: Logo */}
          <h1 className="text-2xl font-bold text-[#a855f7] tracking-wide select-none">
            CodeSync
          </h1>

          {/* Middle: Search */}
          <div className="flex-1 flex justify-center mx-6">
            <input
              type="text"
              value={query}
              onChange={handleSearch}
              placeholder="Search developers by skill..."
              className="w-full max-w-md bg-[#0d0b1a] text-[#f1f0f5] border border-[#a855f7]/50 rounded-full px-6 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ec4899] placeholder:text-gray-400 transition-all"
            />
          </div>

          {/* Right: Messages + Profile */}
          <div className="flex items-center gap-6">
            <button className="text-gray-300 hover:text-[#a855f7] transition">
              <MessageSquare className="w-6 h-6" />
            </button>

            <div
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-3 cursor-pointer hover:opacity-90"
            >
              <div className="w-10 h-10 bg-[#a855f7] rounded-full flex items-center justify-center text-white font-semibold shadow-md hover:shadow-[#a855f7]/30 transition">
                {currentUser?.name?.[0]?.toUpperCase() || "U"}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Profile Panel */}
      {showProfile && (
        <ProfilePanel user={currentUser} onClose={() => setShowProfile(false)} />
      )}
    </>
  );
}

export default Navbar;
