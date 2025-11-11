function ProfileCard({ user }) {
  return (
    <div className="bg-[#1a152b] text-[#f1f0f5] rounded-2xl p-6 shadow-lg w-full max-w-sm">
      <h2 className="text-2xl font-semibold text-[#a855f7] mb-2">{user.name}</h2>
      <p className="text-gray-400 mb-3">{user.bio || "No bio yet."}</p>

      <div className="flex flex-wrap gap-2">
        {user.skills && user.skills.length > 0 ? (
          user.skills.map((skill, i) => (
            <span
              key={i}
              className="bg-[#a855f7]/20 text-[#ec4899] px-3 py-1 rounded-full text-sm"
            >
              {skill}
            </span>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No skills listed.</p>
        )}
      </div>
    </div>
  );
}

export default ProfileCard;
