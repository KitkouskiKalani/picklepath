import { Timestamp, doc, setDoc, getDoc, getDocs, collection, query, where, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";

export type SkillId =
  | "serve" | "forehand" | "backhand" | "dink" | "volley"
  | "thirdshot" | "footwork" | "strategy" | "matches";

export type Lesson = {
  id: string;
  title: string;
  skill: SkillId;
  levelTag: "Beginner" | "2.5" | "3.0" | "3.5" | "4.0+";
  durationMin: number;
  type: "video" | "drill" | "article";
  videoUrl?: string;
  body?: string;
  order: number;
  trackId?: string;
};

export type Track = {
  id: string;
  title: string;
  description: string;
  skill: SkillId | "mixed";
  lessonIds: string[];
  visible: boolean;
};

export async function getTrack(trackId: string) {
  const snap = await getDoc(doc(db, "tracks", trackId));
  if (!snap.exists()) return null;
  const track = { id: snap.id, ...(snap.data() as any) } as Track;
  // fetch lessons without ordering to avoid index requirement
  const lessonsSnap = await getDocs(
    query(collection(db, "lessons"), where("trackId","==",trackId))
  );
  const lessons = lessonsSnap.docs.map(d => ({ id: d.id, ...(d.data() as any) })) as Lesson[];
  // sort lessons by order in JavaScript
  lessons.sort((a, b) => a.order - b.order);
  return { track, lessons };
}

export async function listTracksVisible() {
  const qs = await getDocs(query(collection(db, "tracks"), where("visible","==", true)));
  return qs.docs.map(d => ({ id: d.id, ...(d.data() as any) })) as Track[];
}

export async function listLessonsBySkill(skill: SkillId) {
  const qs = await getDocs(query(collection(db, "lessons"), where("skill","==", skill)));
  const lessons = qs.docs.map(d => ({ id: d.id, ...(d.data() as any) })) as Lesson[];
  // sort lessons by order in JavaScript
  lessons.sort((a, b) => a.order - b.order);
  return lessons;
}

export async function markLessonComplete(uid: string, lessonId: string, rating?: 1|2|3|4|5, notes?: string) {
  const key = `${uid}_${lessonId}`;
  await setDoc(doc(db, "lessonCompletions", key), {
    uid, lessonId, rating: rating ?? null, notes: notes ?? "",
    completedAt: Timestamp.now(),
  }, { merge: true });
}

export async function getCompletedLessonIds(uid: string) {
  const qs = await getDocs(query(collection(db, "lessonCompletions"), where("uid","==", uid)));
  return new Set(qs.docs.map(d => (d.data() as any).lessonId as string));
}
