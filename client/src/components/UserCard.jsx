import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

function UserCard({ user }) {
  console.log("✅ UserCard rendered", user.name);
  return (
    <Card className="bg-[#1a152b] border-[#2a2540] hover:shadow-[#a855f7]/20 transition">
      <CardHeader>
        <CardTitle className="text-[#a855f7] text-xl">
          {user.name}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-gray-400 text-sm mb-3">
          {user.bio || "No bio yet."}
        </p>

        <div className="flex flex-wrap gap-2">
          {user.skills?.map((s, i) => (
            <span
              key={i}
              className="bg-[#a855f7]/20 text-[#ec4899] px-2 py-1 rounded-full text-xs"
            >
              {s}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default UserCard;
