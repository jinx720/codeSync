import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Home() {
  const [similarMatches, setSimilarMatches] = useState([]);
  const [complementaryMatches, setComplementaryMatches] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  // 🔁 Define complementary relationships
  const complementaryMap = {
    "react": ["node.js", "express", "mongodb", "postgresql"],
    "node.js": ["react", "next.js", "vue"],
    "frontend": ["backend", "database"],
    "backend": ["frontend", "ui/ux"],
    "python": ["data science", "machine learning"],
    "machine learning": ["python", "tensorflow", "data engineering"],
    "html": ["css", "javascript"],
    "css": ["html", "javascript"],
    "typescript": ["react", "node.js"],
    "django": ["react", "frontend"],
  };

  useEffect(() => {
  const fetchData = async () => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      navigate("/login");
      return;
    }

    const parsedUser = JSON.parse(savedUser);
    setCurrentUser(parsedUser);

    try {
      const res = await api.get(`/match/${parsedUser.id}`);
      setSimilarMatches(res.data.similar);
      setComplementaryMatches(res.data.complementary);
      console.log("Matches:", res.data);
    } catch (err) {
      console.error("Error fetching matches:", err);
    }
  };

  fetchData();
}, [navigate]);



  // 🧩 Reusable card component
  const Card = ({ user, tag }) => (
    <div className="bg-[#1a152b]/80 rounded-xl p-5 shadow-lg shadow-[#a855f7]/10 border border-[#2a2540] hover:shadow-[#ec4899]/20 transition">
      <h3 className="text-lg font-semibold text-[#a855f7]">{user.name}</h3>
      <p className="text-sm text-gray-400 mt-1">{user.bio || "No bio provided"}</p>

      <div className="flex flex-wrap gap-2 mt-3">
        {user.skills?.map((s, i) => (
          <span
            key={i}
            className="text-xs px-3 py-1 rounded-full bg-[#a855f7]/20 text-[#ec4899]"
          >
            {s}
          </span>
        ))}
      </div>

      {user.sharedSkills && user.sharedSkills.length > 0 && (
        <p className="text-xs text-[#a855f7] mt-3">
          Shared skills: {user.sharedSkills.join(", ")}
        </p>
      )}

      <button className="mt-4 w-full bg-linear-to-r from-[#a855f7] to-[#ec4899] text-white py-1.5 rounded-lg text-sm font-semibold hover:opacity-90 transition">
        Connect
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-linear-to-b from-[#0d0b1a] via-[#140c23] to-[#0d0b1a] text-[#f1f0f5]">
      <Navbar currentUser={currentUser} onSearch={() => {}} />

      <main className="px-10 py-10 space-y-12">
        {/* 🟣 Similar Skills */}
        <section>
          <h2 className="text-2xl font-semibold mb-2 bg-linear-to-r from-[#a855f7] to-[#ec4899] text-transparent bg-clip-text">
            Similar Skills
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            Developers who share skills with you
          </p>

          {similarMatches.length === 0 ? (
            <p className="text-gray-500">No similar matches yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarMatches.map((user) => (
                <Card key={user.id} user={user} tag="similar" />
              ))}
            </div>
          )}
        </section>

        {/* 💗 Complementary Skills */}
        <section>
          <h2 className="text-2xl font-semibold mb-2 bg-linear-to-r from-[#ec4899] to-[#a855f7] text-transparent bg-clip-text">
            Complementary Skills
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            Developers whose skills complement yours
          </p>

          {complementaryMatches.length === 0 ? (
            <p className="text-gray-500">No complementary matches yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {complementaryMatches.map((user) => (
                <Card key={user.id} user={user} tag="complementary" />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Home;
