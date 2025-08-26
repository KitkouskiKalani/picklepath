"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getTrack, getCompletedLessonIds } from "@/lib/learning";
import { auth } from "@/lib/firebase/firebase";

export default function TrackDetail({ params }: { params: { trackId: string } }) {
  const { trackId } = params;
  const [data, setData] = useState<{ track: any; lessons: any[] } | null>(null);
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  useEffect(() => {
    (async () => {
      const t = await getTrack(trackId);
      setData(t);
      const uid = auth.currentUser?.uid;
      if (uid) setCompleted(await getCompletedLessonIds(uid));
    })();
  }, [trackId]);

  if (!data) return <div className="p-6">Loading…</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">{data.track.title}</h1>
        <p className="text-sm text-muted-foreground mt-1">{data.track.description}</p>
      </div>

      <ol className="space-y-3">
        {data.lessons.map((l) => {
          const done = completed.has(l.id);
          return (
            <li key={l.id} className="flex items-center justify-between rounded-xl border p-4">
              <div>
                <div className="font-medium">{l.title}</div>
                <div className="text-xs text-muted-foreground">
                  {l.skill} • {l.levelTag} • {l.durationMin} min
                </div>
              </div>
              <div className="flex items-center gap-3">
                {done && <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700">Completed</span>}
                <Link href={`/lessons/${l.id}`} className="px-3 py-2 rounded bg-primary text-primary-foreground">
                  Start
                </Link>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
