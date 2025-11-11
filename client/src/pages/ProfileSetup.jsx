import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../services/api";

function ProfileSetup() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const navigate = useNavigate();

  const skillOptions = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "PostgreSQL",
    "Python",
    "Django",
    "Tailwind CSS",
    "TypeScript",
  ];

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [bio, setBio] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });

  function toggleSkill(skill) {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  }

    async function handleSubmit(e) {
  e.preventDefault();
  try {
    // ✅ Convert skills to a proper array format for PostgreSQL
    const formattedSkills = selectedSkills.map((s) => s.trim());

    const payload = { skills: formattedSkills, bio };

    const res = await api.put(`/users/${id}`, payload);

    // ✅ Save updated user data to local storage
    localStorage.setItem("user", JSON.stringify(res.data));

    setMessage({ text: "Profile updated successfully!", type: "success" });
    setTimeout(() => navigate("/home"), 1000);
  } catch (err) {
    console.error(err);
    setMessage({
      text: "Error updating profile. Try again.",
      type: "error",
    });
  }
}



  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d0b1a] text-[#f1f0f5] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1a152b] p-8 rounded-2xl shadow-xl w-full max-w-md flex flex-col gap-6"
      >
        <h2 className="text-2xl font-semibold text-center text-[#a855f7]">
          Complete Your Profile
        </h2>

        <textarea
          name="bio"
          placeholder="Write a short bio..."
          rows="3"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          required
          className="p-2.5 rounded-lg bg-[#0d0b1a] border border-gray-700 focus:border-[#a855f7] outline-none resize-none"
        ></textarea>

        <div>
          <p className="mb-2 font-medium text-[#a855f7] text-center">Select Your Skills</p>
          <div className="flex flex-wrap justify-center gap-2">
            {skillOptions.map((skill) => (
              <button
                type="button"
                key={skill}
                onClick={() => toggleSkill(skill)}
                className={`px-3 py-1.5 rounded-full border transition ${
                  selectedSkills.includes(skill)
                    ? "bg-[#a855f7] text-white border-[#a855f7]"
                    : "bg-[#0d0b1a] border-gray-700 text-gray-300 hover:border-[#a855f7]"
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        {message.text && (
          <p
            className={`text-center text-sm font-medium ${
              message.type === "success" ? "text-green-400" : "text-red-400"
            }`}
          >
            {message.text}
          </p>
        )}

        <button
          type="submit"
          className="bg-[#a855f7] hover:bg-[#ec4899] text-white font-semibold py-2.5 rounded-lg transition"
        >
          Save & Continue
        </button>
      </form>
    </div>
  );
}

export default ProfileSetup;
