export type BiologicalSex = "male" | "female";

export type BFMethod = "navy" | "pollock3" | "pollock7" | "manual";

export interface UserProfile {
  name: string;
  heightCm: number;
  age: number;
  sex: BiologicalSex;
  cloudSyncUrl?: string; // Optional Supabase/Neon or custom webhook sync URL
}

export interface Circumferences {
  neck?: number;
  shoulders?: number;
  chest?: number;
  armLeft?: number;
  armRight?: number;
  forearm?: number;
  waist?: number;
  abdomen?: number;
  hips?: number;
  thighLeft?: number;
  thighRight?: number;
  calf?: number;
}

export interface Skinfolds {
  chest?: number; // Peitoral (mm)
  abdomen?: number; // Abdominal (mm)
  thigh?: number; // Coxa (mm)
  triceps?: number; // Tríceps (mm)
  subscapular?: number; // Subescapular (mm)
  suprailiac?: number; // Supra-ilíaca (mm)
  midaxillary?: number; // Axilar Média (mm)
}

export interface BodyLog {
  id: string;
  date: string; // YYYY-MM-DD
  weightKg: number;
  bfPercent: number;
  bfMethod: BFMethod;
  lbmKg: number; // Lean Body Mass
  fatMassKg: number; // Fat Mass
  ffmi?: number; // Fat-Free Mass Index
  vTaper?: number; // Shoulders / Waist ratio
  waistToHeight?: number;
  circumferences: Circumferences;
  skinfolds?: Skinfolds;
  notes?: string;
}

export interface ExerciseTemplate {
  id: string;
  name: string;
  muscleGroup: string;
  targetSets: number;
  targetReps: string; // e.g., "8-12"
  restSeconds: number; // e.g., 90
  notes?: string;
}

export interface WorkoutRoutine {
  id: string;
  name: string; // e.g., "Treino A — Push (Peito, Ombro, Tríceps)"
  description: string;
  exercises: ExerciseTemplate[];
}

export interface PerformedSet {
  setNumber: number;
  weightKg: number;
  reps: number;
  completed: boolean;
  isPR?: boolean;
}

export interface PerformedExercise {
  exerciseId: string;
  name: string;
  muscleGroup: string;
  restSeconds: number;
  sets: PerformedSet[];
}

export interface WorkoutSession {
  id: string;
  routineId: string;
  routineName: string;
  date: string; // ISO string or YYYY-MM-DD
  startedAt: number; // timestamp ms
  finishedAt: number; // timestamp ms
  durationSeconds: number;
  totalVolumeKg: number;
  completedSetsCount: number;
  exercises: PerformedExercise[];
  notes?: string;
}

export interface AppDatabase {
  profile: UserProfile;
  bodyLogs: BodyLog[];
  routines: WorkoutRoutine[];
  workoutSessions: WorkoutSession[];
  updatedAt: string;
}
