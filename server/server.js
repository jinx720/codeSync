import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import db from "./db/db.js"; 


const app = express();
app.use(cors());
app.use(express.json());




app.post("/api/users", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // ✅ Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashedPassword]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating user" });
  }
});




app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = result.rows[0];

    // ✅ Compare with hashed password
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    // ✅ Return clean user data (not full row with password)
    delete user.password;
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error logging in" });
  }
});



// Update profile
app.put("/api/users/:id", async (req, res) => {
  try {
    const { skills, bio } = req.body;
    const { id } = req.params;

    const result = await db.query(
      "UPDATE users SET skills = $1, bio = $2 WHERE id = $3 RETURNING *",
      [skills, bio, id]
    );

    res.json(result.rows[0]); // ✅ this line must exist
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating profile" });
  }
});

app.get("/api/match/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // 1️⃣ Get current user
    const userRes = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    const user = userRes.rows[0];

    if (!user || !user.skills) {
      return res.status(404).json({ error: "User not found or has no skills" });
    }

    // 2️⃣ Similar matches: users with any overlapping skills
    const similarRes = await db.query(
      `SELECT * FROM users
       WHERE id != $1
       AND skills && $2::text[]`,
      [id, user.skills]
    );

    // 3️⃣ Complementary matches
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

    // Build a list of complementary skills for the current user
    const complementList = user.skills
      .flatMap((s) => complementaryMap[s.toLowerCase()] || [])
      .filter((v, i, a) => a.indexOf(v) === i);

    let complementaryRes = { rows: [] };
    if (complementList.length > 0) {
      complementaryRes = await db.query(
        `SELECT * FROM users
         WHERE id != $1
         AND skills && $2::text[]`,
        [id, complementList]
      );
    }

    res.json({
      similar: similarRes.rows,
      complementary: complementaryRes.rows,
    });
  } catch (err) {
    console.error("Error fetching matches:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});



app.listen(5000, () => console.log("✅ Server running on port 5000"));
