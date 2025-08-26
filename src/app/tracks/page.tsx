"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { listTracksVisible } from "@/lib/learning";

export default function TracksPage() {
  const [tracks, setTracks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const t = await listTracksVisible();
      setTracks(t);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Training Tracks</h1>
      {loading ? <p>Loading…</p> : (
        <div className="grid gap-4 sm:grid-cols-2">
          {tracks.map(t => (
            <Link key={t.id} href={`/tracks/${t.id}`} className="block rounded-xl border p-4 hover:shadow">
              <div className="text-lg font-medium">{t.title}</div>
              <p className="text-sm text-muted-foreground mt-1">{t.description}</p>
            </Link>
          ))}
          {tracks.length === 0 && <p>No tracks yet.</p>}
        </div>
      )}
    </div>
  );
}
