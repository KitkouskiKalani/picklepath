"use client";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";

export async function seedLessonsAndTracks() {
  const trackId = "foundation-25";
  await setDoc(doc(db, "tracks", trackId), {
    title: "Level 2.5 – Foundation Builder",
    description: "Build your base: serve, dink, footwork, volley.",
    skill: "mixed",
    lessonIds: [],
    visible: true,
  }, { merge: true });

  const lessons = [
    { id:"serve-basics",  title:"Basic Serve Technique", skill:"serve",    levelTag:"2.5", durationMin:8,  type:"video", order:1, trackId },
    { id:"dink-basics",   title:"Basic Dink Shot",       skill:"dink",     levelTag:"2.5", durationMin:10, type:"video", order:2, trackId },
    { id:"forehand-gs",   title:"Forehand Groundstroke", skill:"forehand", levelTag:"2.5", durationMin:9,  type:"video", order:3, trackId },
    { id:"nvz-position",  title:"Kitchen Line Position", skill:"strategy", levelTag:"2.5", durationMin:7,  type:"video", order:4, trackId },
  ];

  for (const l of lessons) {
    await setDoc(doc(db, "lessons", l.id), l);
  }

  await setDoc(doc(db, "tracks", trackId), {
    lessonIds: lessons.sort((a,b)=>a.order-b.order).map(l => l.id),
  }, { merge: true });

  return { trackId, count: lessons.length };
}
