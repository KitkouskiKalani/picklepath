import { 
  collection, 
  addDoc, 
  doc, 
  getDoc, 
  setDoc, 
  serverTimestamp,
  Timestamp,
  query,
  where,
  orderBy,
  onSnapshot,
  runTransaction,
  getDocs,
  limit
} from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import { SkillId, minutesToXp, xpToLevel } from './skills';

export interface Session {
  uid: string;
  date: Date;
  minutes: number;
  focus: 'drills' | 'matches' | 'serves' | 'dinks' | 'footwork' | 'strategy';
  issues: string[];
  wentWell: string[];
  notes: string[];
}

export interface UserProfile {
  displayName?: string;
  createdAt: Timestamp;
}

export interface CourseProgress {
  [courseId: string]: boolean;
}

// New types for skills system
export type SessionSkillEntry = { id: SkillId; minutes: number; rating: 1|2|3|4|5; notes?: string; }
export type PracticeSessionInput = { date: Date; skills: SessionSkillEntry[]; notes?: string; }

export async function addSession(sessionData: Omit<Session, 'date'> & { date: Date }): Promise<string> {
  try {
    const sessionWithTimestamp = {
      ...sessionData,
      date: Timestamp.fromDate(sessionData.date)
    };
    
    const docRef = await addDoc(collection(db, 'sessions'), sessionWithTimestamp);
    return docRef.id;
  } catch (error) {
    console.error('Error adding session:', error);
    throw error;
  }
}

export async function getUserPublicProfile(uid: string): Promise<UserProfile | null> {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
}

export async function upsertCourseProgress(uid: string, courseId: string, completed: boolean): Promise<void> {
  try {
    const userDocRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      const currentProgress = userDoc.data()?.courseProgress || {};
      const updatedProgress = {
        ...currentProgress,
        [courseId]: completed
      };
      
      await setDoc(userDocRef, { courseProgress: updatedProgress }, { merge: true });
    } else {
      // Create user document if it doesn't exist
      await setDoc(userDocRef, {
        courseProgress: { [courseId]: completed },
        createdAt: serverTimestamp()
      });
    }
  } catch (error) {
    console.error('Error updating course progress:', error);
    throw error;
  }
}

export function subscribeToUserSessions(
  uid: string,
  callback: (sessions: Session[]) => void,
  dateRange?: { start: Date; end: Date }
) {
  let q = query(
    collection(db, 'sessions'),
    where('uid', '==', uid),
    orderBy('date', 'desc')
  );
  
  if (dateRange) {
    q = query(
      collection(db, 'sessions'),
      where('uid', '==', uid),
      where('date', '>=', Timestamp.fromDate(dateRange.start)),
      where('date', '<=', Timestamp.fromDate(dateRange.end)),
      orderBy('date', 'desc')
    );
  }
  
  return onSnapshot(q, (snapshot) => {
    const sessions = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        date: data.date.toDate(),
        id: doc.id
      } as Session & { id: string };
    });
    callback(sessions);
  });
}

// New skills system functions
export async function addPracticeSession(uid: string, input: PracticeSessionInput): Promise<string> {
  try {
    const result = await runTransaction(db, async (transaction) => {
      // Read the current skills progress inside the transaction
      const skillsProgressRef = doc(db, 'skillsProgress', uid);
      const skillsProgressDoc = await transaction.get(skillsProgressRef);
      const currentTotals = skillsProgressDoc.exists() ? skillsProgressDoc.data()?.totals || {} : {};
      
      // Calculate total minutes
      const totalMinutes = input.skills.reduce((sum, skill) => sum + skill.minutes, 0);
      
      // Create session document
      const sessionRef = doc(collection(db, 'sessions'));
      const sessionData = {
        uid,
        date: Timestamp.fromDate(input.date),
        minutes: totalMinutes,
        skills: input.skills,
        notes: input.notes,
        createdAt: serverTimestamp()
      };
      transaction.set(sessionRef, sessionData);
      
      // Update skills progress
      const updatedTotals: Partial<Record<SkillId, { xp: number; minutes: number; level: number }>> = {};
      
      // Initialize all skills if they don't exist
      for (const skill of input.skills) {
        const current = currentTotals[skill.id] || { xp: 0, minutes: 0, level: 1 };
        const newXp = current.xp + minutesToXp(skill.minutes, skill.rating);
        const newMinutes = current.minutes + skill.minutes;
        const { level } = xpToLevel(newXp);
        
        updatedTotals[skill.id] = { xp: newXp, minutes: newMinutes, level };
      }
      
      // Keep existing skills that weren't updated
      Object.keys(currentTotals).forEach(skillId => {
        if (!updatedTotals[skillId as SkillId]) {
          updatedTotals[skillId as SkillId] = currentTotals[skillId as SkillId];
        }
      });
      
      transaction.set(skillsProgressRef, {
        totals: updatedTotals as Record<SkillId, { xp: number; minutes: number; level: number }>,
        updatedAt: serverTimestamp()
      }, { merge: true });
      
      return sessionRef.id;
    });
    
    return result;
  } catch (error) {
    console.error('Error adding practice session:', error);
    throw error;
  }
}

export async function getSkillsProgress(uid: string): Promise<{ totals: Partial<Record<SkillId, { xp: number; minutes: number; level: number }>>; updatedAt: Timestamp | null }> {
  try {
    const skillsProgressDoc = await getDoc(doc(db, 'skillsProgress', uid));
    if (skillsProgressDoc.exists()) {
      const data = skillsProgressDoc.data();
      return {
        totals: data.totals || {},
        updatedAt: data.updatedAt || null
      };
    }
    return { totals: {}, updatedAt: null };
  } catch (error) {
    console.error('Error getting skills progress:', error);
    return { totals: {}, updatedAt: null };
  }
}

export async function listSessions(uid: string, take = 20): Promise<Array<{ id: string; uid: string; date: Date; minutes: number; skills: SessionSkillEntry[]; notes?: string; createdAt: Timestamp }>> {
  try {
    const q = query(
      collection(db, 'sessions'),
      where('uid', '==', uid),
      orderBy('date', 'desc'),
      limit(take)
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        uid: data.uid,
        date: data.date.toDate(),
        minutes: data.minutes,
        skills: data.skills || [],
        notes: data.notes,
        createdAt: data.createdAt
      };
    });
  } catch (error) {
    console.error('Error listing sessions:', error);
    throw error;
  }
}

