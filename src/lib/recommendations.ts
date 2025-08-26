import { listLessonsBySkill } from "./learning";
import { getSkillsProgress } from "./firestore"; // existing helper from your file
import { SkillId } from "./skills";

export async function nextLessonsForUser(uid: string, skills: SkillId[]) {
  const sp = await getSkillsProgress(uid);
  // sort requested skills by lowest level/xp first
  const ordered = [...skills].sort((a,b) => {
    const A = sp.totals?.[a]?.xp ?? 0;
    const B = sp.totals?.[b]?.xp ?? 0;
    return A - B;
  });
  // pick first skill and return the first 3 lessons for that skill
  const target = ordered[0] || "forehand";
  const lessons = await listLessonsBySkill(target as any);
  return lessons.slice(0,3);
}
