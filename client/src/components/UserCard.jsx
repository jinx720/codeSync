function UserCard({ user }) {
  return (
    <div className="bg-[#1a152b] text-[#f1f0f5] rounded-2xl p-4 shadow-md hover:shadow-[#a855f7]/20 transition w-full">
      <h3 className="text-xl font-semibold text-[#a855f7]">{user.name}</h3>
      <p className="text-gray-400 text-sm mt-1">{user.bio || "No bio yet."}</p>
      <div className="flex flex-wrap gap-2 mt-2">
        {user.skills && user.skills.map((s, i) => (
          <span key={i} className="bg-[#a855f7]/20 text-[#ec4899] px-2 py-1 rounded-full text-xs">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

export default UserCard;
