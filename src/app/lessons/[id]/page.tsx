"use client";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase/firebase";
import { markLessonComplete } from "@/lib/learning";

export default function LessonPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [lesson, setLesson] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const snap = await getDoc(doc(db, "lessons", id));
      setLesson(snap.exists() ? { id: snap.id, ...snap.data() } : null);
    })();
  }, [id]);

  if (lesson === null) return <div className="p-6">Loading…</div>;
  if (!lesson) return <div className="p-6">Lesson not found.</div>;

  const onComplete = async () => {
    const uid = auth.currentUser?.uid;
    if (!uid) return alert("Please sign in.");
    setSaving(true);
    await markLessonComplete(uid, id);
    setSaving(false);
    alert("Marked complete!");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">{lesson.title}</h1>
        <div className="text-sm text-muted-foreground">
          {lesson.skill} • {lesson.levelTag} • {lesson.durationMin} min
        </div>
      </div>

      {lesson.type === "video" && lesson.videoUrl ? (
        <div className="aspect-video w-full rounded-xl overflow-hidden bg-black">
          <iframe
            src={lesson.videoUrl}
            title={lesson.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <div className="rounded-xl border p-4 whitespace-pre-wrap">{lesson.body || "No content body."}</div>
      )}

      <button onClick={onComplete} disabled={saving} className="px-4 py-2 rounded bg-green-600 text-white">
        {saving ? "Saving…" : "Mark Complete"}
      </button>
    </div>
  );
}
