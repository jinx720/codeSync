import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import UserCard from "../components/UserCard";


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




  return (
    <div className="min-h-screen bg-linear-to-b from-[#0d0b1a] via-[#140c23] to-[#0d0b1a] text-[#f1f0f5]">
      <Navbar currentUser={currentUser} onSearch={() => {}} />

      <main className="px-10 py-10 space-y-12">
        
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
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          )}
        </section>

        
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
                <UserCard key={user.id} user={user} />
              ))}

            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Home;
