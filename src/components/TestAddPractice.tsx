"use client";
import { addPracticeSession } from "@/lib/firestore";
import { auth } from "@/lib/firebase/firebase";
import { useState } from "react";

export default function TestAddPractice() {
  const [loading, setLoading] = useState(false);
  const onClick = async () => {
    const user = auth.currentUser;
    if (!user) return alert("Not signed in");
    setLoading(true);
    try {
      await addPracticeSession(user.uid, {
        date: new Date(),
        skills: [
          { id: "forehand", minutes: 20, rating: 4 },
          { id: "dink", minutes: 10, rating: 3 },
        ],
        notes: "Test entry via button",
      });
      alert("Wrote session + updated skillsProgress");
    } catch (e:any) {
      alert("Error: " + e?.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <button onClick={onClick} disabled={loading} className="px-3 py-2 rounded bg-green-600 text-white">
      {loading ? "Writing..." : "Test: Add Practice Session"}
    </button>
  );
}
