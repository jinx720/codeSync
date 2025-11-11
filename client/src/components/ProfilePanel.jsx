import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

function ProfilePanel({ user, onClose }) {
  const [profile, setProfile] = useState(user || null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      const saved = localStorage.getItem("user");
      if (saved) setProfile(JSON.parse(saved));
    }
  }, [user]);

  function handleLogout() {
    localStorage.removeItem("user");
    onClose(); // close the panel
    navigate("/login");
  }

  if (!profile) return null;

  return (
    <div className="fixed top-0 right-0 h-full w-[20%] min-w-[300px] bg-[#1a152b]/95 backdrop-blur-xl border-l border-[#2a2540] shadow-2xl shadow-[#a855f7]/20 z-50 p-6 flex flex-col justify-between animate-slideIn">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-[#a855f7]">Profile</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-[#ec4899] transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* User Info */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-16 h-16 bg-linear-to-br from-[#a855f7] to-[#ec4899] rounded-full flex items-center justify-center text-white text-2xl font-bold">
          {profile?.name?.[0]?.toUpperCase() || "U"}
        </div>
        <h3 className="mt-3 text-lg font-semibold">{profile?.name || "Unknown"}</h3>
        <p className="text-sm text-gray-400">{profile?.email}</p>
      </div>

      <div className="border-t border-[#2a2540] pt-4 flex-1 overflow-y-auto">
        <p className="text-gray-400 text-sm mb-1">Bio</p>
        <p className="text-[#f1f0f5] text-sm mb-4">{profile?.bio || "No bio yet."}</p>

        <p className="text-gray-400 text-sm mb-1">Location</p>
        <p className="text-[#f1f0f5] text-sm mb-4">
          {profile?.location || "Not specified"}
        </p>

        <p className="text-gray-400 text-sm mb-2">Skills</p>
        <div className="flex flex-wrap gap-2">
          {profile?.skills?.length > 0 ? (
            profile.skills.map((s, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full bg-[#a855f7]/20 text-[#ec4899] text-xs"
              >
                {s}
              </span>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No skills listed</p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 mt-6">
        <button
          onClick={handleLogout}
          className="w-full py-2 border border-[#a855f7]/50 rounded-lg text-[#a855f7] hover:bg-[#a855f7]/10 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfilePanel;
