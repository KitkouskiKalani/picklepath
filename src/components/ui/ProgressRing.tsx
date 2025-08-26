import React from "react";
import clsx from "clsx";

type Props = {
  /** minutes completed this week */
  value: number;
  /** weekly minutes goal */
  goal: number;
  /** pixel size of the whole ring */
  size?: number;
  /** stroke width of the ring */
  stroke?: number;
  /** optional extra class on wrapper */
  className?: string;
};

export default function ProgressRing({
  value,
  goal,
  size = 160,
  stroke = 10,
  className,
}: Props) {
  const safeGoal = Math.max(1, goal || 0);
  const pct = Math.max(0, Math.min(100, Math.round((value / safeGoal) * 100)));

  const r = (size - stroke) / 2;      // radius
  const c = 2 * Math.PI * r;          // circumference
  const dash = (pct / 100) * c;

  // Threshold colors
  const color =
    pct >= 100 ? "#22C55E" : pct >= 67 ? "#00BFA6" : pct >= 34 ? "#FACC15" : "#FF5A5F";

  // Motivational sublabel
  const sublabel =
    pct === 0
      ? "Start your first 20 min"
      : pct < 50
      ? "Keep building momentum"
      : pct < 100
      ? "Almost there!"
      : "Goal crushed 🎉";

  // Accessibility label
  const a11y = `Weekly progress: ${pct}% (${value} of ${safeGoal} min)`;

  return (
    <div
      className={clsx("relative flex items-center justify-center", className)}
      style={{ width: size, height: size }}
      role="img"
      aria-label={a11y}
    >
      <svg
        className="progress-ring -rotate-90"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth={stroke}
        />
        {/* Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeWidth={stroke}
          strokeDasharray={`${dash} ${c - dash}`}
          style={{ transition: "stroke-dasharray 600ms ease, stroke 200ms ease" }}
        />
      </svg>

      {/* Center labels with improved visual hierarchy */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="text-center leading-tight">
          {/* Large, bold percentage */}
          <div className="text-3xl sm:text-4xl font-black text-white mb-1">{pct}%</div>
          
          {/* Minutes progress in medium weight */}
          <div className="text-sm font-medium text-ink-body mb-2">
            {value} / {safeGoal} min
          </div>
          
          {/* Motivational subtext in smaller, lighter font */}
          <div className="text-xs text-ink-muted leading-tight max-w-[120px]">
            {sublabel}
          </div>
        </div>
      </div>
    </div>
  );
}
