import { BiologicalSex, Circumferences, Skinfolds } from "./types";

/**
 * 1. US Navy Body Fat Formula (Hodgdon & Beckett)
 * Uses Height, Neck, Waist (and Hips for females) in cm
 */
export function calculateNavyBF(
  sex: BiologicalSex,
  heightCm: number,
  neckCm: number,
  waistCm: number,
  hipsCm?: number
): number | null {
  if (!heightCm || !neckCm || !waistCm || heightCm <= 0 || neckCm <= 0) {
    return null;
  }

  if (sex === "male") {
    if (waistCm <= neckCm) return null;
    const logAbNeck = Math.log10(waistCm - neckCm);
    const logHeight = Math.log10(heightCm);
    const density = 1.0324 - 0.19077 * logAbNeck + 0.15456 * logHeight;
    const bf = 495 / density - 450;
    return Math.max(2, Math.min(60, Number(bf.toFixed(1))));
  } else {
    if (!hipsCm || waistCm + hipsCm <= neckCm) return null;
    const logWaistHipNeck = Math.log10(waistCm + hipsCm - neckCm);
    const logHeight = Math.log10(heightCm);
    const density = 1.29579 - 0.35004 * logWaistHipNeck + 0.221 * logHeight;
    const bf = 495 / density - 450;
    return Math.max(5, Math.min(65, Number(bf.toFixed(1))));
  }
}

/**
 * 2. Jackson & Pollock 3-Site Skinfold Formula (Adipômetro)
 * Men: Chest (Peitoral), Abdomen (Abdominal), Thigh (Coxa) in mm
 * Women: Triceps, Suprailiac, Thigh in mm
 * Uses Siri Equation: BF% = (495 / BodyDensity) - 450
 */
export function calculatePollock3BF(
  sex: BiologicalSex,
  age: number,
  skinfolds: Skinfolds
): number | null {
  if (!age || age <= 0) return null;

  if (sex === "male") {
    const { chest, abdomen, thigh } = skinfolds;
    if (!chest || !abdomen || !thigh) return null;
    const sum = chest + abdomen + thigh;
    if (sum <= 0) return null;
    const density =
      1.10938 -
      0.0008267 * sum +
      0.0000016 * (sum * sum) -
      0.0002574 * age;
    const bf = 495 / density - 450;
    return Math.max(2, Math.min(60, Number(bf.toFixed(1))));
  } else {
    const { triceps, suprailiac, thigh } = skinfolds;
    if (!triceps || !suprailiac || !thigh) return null;
    const sum = triceps + suprailiac + thigh;
    if (sum <= 0) return null;
    const density =
      1.0994921 -
      0.0009929 * sum +
      0.0000023 * (sum * sum) -
      0.0001392 * age;
    const bf = 495 / density - 450;
    return Math.max(5, Math.min(65, Number(bf.toFixed(1))));
  }
}

/**
 * 3. Jackson & Pollock 7-Site Skinfold Formula (Avaliação Completa)
 * Sites: Chest, Midaxillary, Triceps, Subscapular, Abdomen, Suprailiac, Thigh (mm)
 */
export function calculatePollock7BF(
  sex: BiologicalSex,
  age: number,
  skinfolds: Skinfolds
): number | null {
  if (!age || age <= 0) return null;
  const {
    chest,
    midaxillary,
    triceps,
    subscapular,
    abdomen,
    suprailiac,
    thigh,
  } = skinfolds;

  if (
    !chest ||
    !midaxillary ||
    !triceps ||
    !subscapular ||
    !abdomen ||
    !suprailiac ||
    !thigh
  ) {
    return null;
  }

  const sum =
    chest +
    midaxillary +
    triceps +
    subscapular +
    abdomen +
    suprailiac +
    thigh;

  if (sum <= 0) return null;

  let density: number;
  if (sex === "male") {
    density =
      1.112 -
      0.00043499 * sum +
      0.00000055 * (sum * sum) -
      0.00028826 * age;
  } else {
    density =
      1.097 -
      0.00046971 * sum +
      0.00000056 * (sum * sum) -
      0.00012828 * age;
  }

  const bf = 495 / density - 450;
  return Math.max(2, Math.min(65, Number(bf.toFixed(1))));
}

/**
 * Body Composition Derived Metrics
 */
export function calculateCompositionMetrics(
  weightKg: number,
  bfPercent: number,
  heightCm: number,
  circumferences?: Circumferences
) {
  const fatMassKg = Number(((weightKg * bfPercent) / 100).toFixed(2));
  const lbmKg = Number((weightKg - fatMassKg).toFixed(2));

  // FFMI (Normalized Fat-Free Mass Index)
  const heightM = heightCm / 100;
  const rawFfmi = heightM > 0 ? lbmKg / (heightM * heightM) : 0;
  // Normalized FFMI adjusts to a 1.80m stature
  const normalizedFfmi =
    heightM > 0 ? rawFfmi + 6.1 * (1.8 - heightM) : 0;

  // V-Taper (Shoulders / Waist) - Aesthetic Golden Ratio target ~1.618
  const vTaper =
    circumferences?.shoulders && circumferences?.waist && circumferences.waist > 0
      ? Number((circumferences.shoulders / circumferences.waist).toFixed(3))
      : undefined;

  // Waist-to-Height Ratio (Health risk < 0.50 is optimal)
  const waistToHeight =
    circumferences?.waist && heightCm > 0
      ? Number((circumferences.waist / heightCm).toFixed(3))
      : undefined;

  return {
    lbmKg,
    fatMassKg,
    ffmi: Number(normalizedFfmi.toFixed(1)),
    vTaper,
    waistToHeight,
  };
}

/**
 * Epley 1RM Formula for Strength Progression
 */
export function calculateEstimated1RM(weightKg: number, reps: number): number {
  if (reps <= 0 || weightKg <= 0) return 0;
  if (reps === 1) return weightKg;
  return Number((weightKg * (1 + reps / 30)).toFixed(1));
}

export function getBFCategory(sex: BiologicalSex, bf: number): {
  label: string;
  color: string;
} {
  if (sex === "male") {
    if (bf < 6) return { label: "Essencial / Competição", color: "text-amber-400" };
    if (bf <= 13) return { label: "Atlético / Definido", color: "text-emerald-400" };
    if (bf <= 17) return { label: "Fitness / Estético", color: "text-sky-400" };
    if (bf <= 24) return { label: "Médio / Normal", color: "text-slate-300" };
    return { label: "Acima do Ideal", color: "text-rose-400" };
  } else {
    if (bf < 14) return { label: "Essencial / Competição", color: "text-amber-400" };
    if (bf <= 20) return { label: "Atlético / Definido", color: "text-emerald-400" };
    if (bf <= 24) return { label: "Fitness / Estético", color: "text-sky-400" };
    if (bf <= 31) return { label: "Médio / Normal", color: "text-slate-300" };
    return { label: "Acima do Ideal", color: "text-rose-400" };
  }
}
