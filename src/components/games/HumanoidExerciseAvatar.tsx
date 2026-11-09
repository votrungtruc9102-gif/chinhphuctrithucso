import React from 'react';
import { AnatomicalGroup } from '../../data/exerciseGameData';

export type AvatarGender = 'male' | 'female';

interface HumanoidExerciseAvatarProps {
  gender: AvatarGender;
  movementGroup: AnatomicalGroup;
  movementName: string;
  isExercising: boolean;
  currentReps: number;
  targetReps: number;
}

export const HumanoidExerciseAvatar: React.FC<HumanoidExerciseAvatarProps> = ({
  gender,
  movementGroup,
  movementName,
  isExercising,
  currentReps,
  targetReps
}) => {
  // Color palette for  Physical Education uniform (Navy Blue + White + Emerald trim)
  const hairColor = gender === 'male' ? '#1e293b' : '#331e18';
  const skinColor = '#fed7aa';
  const shirtColor = '#0284c7'; // Sky / Navy blue PE shirt
  const pantsColor = '#0f172a'; // Deep navy track pants
  const shoeColor = '#ffffff';

  // Group label
  const groupLabels: Record<AnatomicalGroup, string> = {
    neck: '1. Vùng Khớp Cổ (C1 - C7)',
    shoulder: '2. Khớp Vai & Khối Cơ Ngực',
    elbow_arm: '3. Khuỷu Tay & Bắp Tay',
    wrist_hand: '4. Khớp Cổ Tay & Ngón Tay',
    torso_waist: '5. Khối Cơ Thân & Cột Sống Thắt Lưng',
    hip: '6. Khớp Háng & Khung Chậu',
    knee_leg: '7. Khớp Gối & Cơ Tứ Đầu Đùi',
    ankle_foot: '8. Khớp Cổ Chân & Bắp Chân'
  };

  return (
    <div className="relative w-full max-w-sm mx-auto flex flex-col items-center select-none">
      {/* Target Joint Focus Badge */}
      <div className="mb-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-[11px] font-bold text-emerald-300 flex items-center gap-1.5 shadow-sm">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span>Tập trung khớp: {groupLabels[movementGroup]}</span>
      </div>

      {/* SVG Canvas for Anatomical Humanoid Model */}
      <div className="relative w-64 h-72 sm:w-72 sm:h-80 flex items-center justify-center bg-gradient-to-b from-slate-900/60 via-slate-900/90 to-slate-950 rounded-3xl border border-slate-800 shadow-inner overflow-hidden">
        {/* Soft Background Grid / Floor */}
        <div className="absolute inset-x-4 bottom-4 h-12 rounded-full bg-emerald-500/10 blur-xl pointer-events-none" />
        <div className="absolute bottom-6 w-44 h-4 rounded-full bg-slate-950/80 border border-slate-700/50 shadow-md" />

        <svg
          viewBox="0 0 240 300"
          className="w-full h-full drop-shadow-2xl overflow-visible"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="peShirtGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>
            <linearGradient id="pePantsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <radialGradient id="jointGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#34d399" stopOpacity="1" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Embedded Dynamic CSS for Anatomical Joint Articulation */}
          <style>{`
            /* 1. NECK: Head tilts and nods gently */
            @keyframes neckMove {
              0%, 100% { transform: rotate(0deg) translateY(0px); }
              25% { transform: rotate(14deg) translateY(2px); }
              50% { transform: rotate(0deg) translateY(4px); }
              75% { transform: rotate(-14deg) translateY(2px); }
            }
            .animate-joint-neck {
              transform-origin: 120px 85px;
              animation: ${isExercising ? 'neckMove 2.4s ease-in-out infinite' : 'none'};
            }

            /* 2. SHOULDER: Arms rotate and roll */
            @keyframes shoulderLeft {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(-35deg) translateY(-8px); }
            }
            @keyframes shoulderRight {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(35deg) translateY(-8px); }
            }
            .animate-joint-shoulder-l {
              transform-origin: 90px 105px;
              animation: ${isExercising ? 'shoulderLeft 1.8s ease-in-out infinite' : 'none'};
            }
            .animate-joint-shoulder-r {
              transform-origin: 150px 105px;
              animation: ${isExercising ? 'shoulderRight 1.8s ease-in-out infinite' : 'none'};
            }

            /* 3. ELBOW / FOREARM: Bicep curls and extensions */
            @keyframes elbowCurlLeft {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(-70deg) translate(5px, -5px); }
            }
            @keyframes elbowCurlRight {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(70deg) translate(-5px, -5px); }
            }
            .animate-joint-elbow-l {
              transform-origin: 80px 145px;
              animation: ${isExercising ? 'elbowCurlLeft 1.4s ease-in-out infinite' : 'none'};
            }
            .animate-joint-elbow-r {
              transform-origin: 160px 145px;
              animation: ${isExercising ? 'elbowCurlRight 1.4s ease-in-out infinite' : 'none'};
            }

            /* 4. WRISTS: Hands rotating and waving */
            @keyframes wristRotateLeft {
              0%, 100% { transform: rotate(-15deg); }
              50% { transform: rotate(35deg); }
            }
            @keyframes wristRotateRight {
              0%, 100% { transform: rotate(15deg); }
              50% { transform: rotate(-35deg); }
            }
            .animate-joint-wrist-l {
              transform-origin: 75px 185px;
              animation: ${isExercising ? 'wristRotateLeft 0.8s ease-in-out infinite' : 'none'};
            }
            .animate-joint-wrist-r {
              transform-origin: 165px 185px;
              animation: ${isExercising ? 'wristRotateRight 0.8s ease-in-out infinite' : 'none'};
            }

            /* 5. TORSO: Waist twists laterally */
            @keyframes torsoTwist {
              0%, 100% { transform: rotate(0deg) skewX(0deg); }
              25% { transform: rotate(7deg) skewX(3deg); }
              75% { transform: rotate(-7deg) skewX(-3deg); }
            }
            .animate-joint-torso {
              transform-origin: 120px 170px;
              animation: ${isExercising ? 'torsoTwist 2.2s ease-in-out infinite' : 'none'};
            }

            /* 6. HIPS: Pelvis circular shift */
            @keyframes hipCircle {
              0%, 100% { transform: translate(0px, 0px); }
              25% { transform: translate(-4px, 2px); }
              50% { transform: translate(0px, 4px); }
              75% { transform: translate(4px, 2px); }
            }
            .animate-joint-hip {
              animation: ${isExercising ? 'hipCircle 2.0s ease-in-out infinite' : 'none'};
            }

            /* 7. KNEES / SQUAT: Knees flex and torso drops into squat */
            @keyframes kneeSquatBody {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(22px); }
            }
            @keyframes kneeFlexLeft {
              0%, 100% { transform: scaleY(1); }
              50% { transform: scaleY(0.85) skewX(4deg); }
            }
            @keyframes kneeFlexRight {
              0%, 100% { transform: scaleY(1); }
              50% { transform: scaleY(0.85) skewX(-4deg); }
            }
            .animate-joint-squat-body {
              animation: ${isExercising ? 'kneeSquatBody 2.0s ease-in-out infinite' : 'none'};
            }
            .animate-joint-knee-l {
              transform-origin: 105px 235px;
              animation: ${isExercising ? 'kneeFlexLeft 2.0s ease-in-out infinite' : 'none'};
            }
            .animate-joint-knee-r {
              transform-origin: 135px 235px;
              animation: ${isExercising ? 'kneeFlexRight 2.0s ease-in-out infinite' : 'none'};
            }

            /* 8. ANKLES: Heels lift up on tiptoes */
            @keyframes ankleHeelRaise {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-12px); }
            }
            .animate-joint-ankle-whole {
              animation: ${isExercising ? 'ankleHeelRaise 1.6s ease-in-out infinite' : 'none'};
            }
          `}</style>

          {/* Root Group for whole body movements (Squat / Calf raise) */}
          <g
            className={
              movementGroup === 'knee_leg'
                ? 'animate-joint-squat-body'
                : movementGroup === 'ankle_foot'
                ? 'animate-joint-ankle-whole'
                : ''
            }
          >
            {/* LOWER BODY: Hips & Legs */}
            <g id="lower-body" className={movementGroup === 'hip' ? 'animate-joint-hip' : ''}>
              {/* Left Leg */}
              <g className={movementGroup === 'knee_leg' ? 'animate-joint-knee-l' : ''}>
                {/* Thigh (Đùi trái) */}
                <path
                  d="M 104 170 L 98 220 L 112 220 L 114 170 Z"
                  fill="url(#pePantsGrad)"
                  stroke="#334155"
                  strokeWidth="1.5"
                />
                {/* Calf & Shin (Bắp & Cẳng chân trái) */}
                <path
                  d="M 98 220 L 95 260 L 110 260 L 112 220 Z"
                  fill="url(#pePantsGrad)"
                  stroke="#334155"
                  strokeWidth="1.5"
                />
                {/* Left Shoe */}
                <path
                  d="M 88 260 L 112 260 C 114 266 110 270 98 270 L 84 270 C 82 265 84 260 88 260 Z"
                  fill={shoeColor}
                  stroke="#0284c7"
                  strokeWidth="2"
                />
              </g>

              {/* Right Leg */}
              <g className={movementGroup === 'knee_leg' ? 'animate-joint-knee-r' : ''}>
                {/* Thigh (Đùi phải) */}
                <path
                  d="M 126 170 L 128 220 L 142 220 L 136 170 Z"
                  fill="url(#pePantsGrad)"
                  stroke="#334155"
                  strokeWidth="1.5"
                />
                {/* Calf & Shin (Bắp & Cẳng chân phải) */}
                <path
                  d="M 128 220 L 130 260 L 145 260 L 142 220 Z"
                  fill="url(#pePantsGrad)"
                  stroke="#334155"
                  strokeWidth="1.5"
                />
                {/* Right Shoe */}
                <path
                  d="M 128 260 L 152 260 C 156 265 158 270 146 270 L 132 270 C 128 270 126 266 128 260 Z"
                  fill={shoeColor}
                  stroke="#0284c7"
                  strokeWidth="2"
                />
              </g>

              {/* Pelvis / Shorts Band */}
              <rect
                x="98"
                y="160"
                width="44"
                height="18"
                rx="4"
                fill="#0f172a"
                stroke="#38bdf8"
                strokeWidth="1"
              />
            </g>

            {/* UPPER BODY: Torso, Arms & Head */}
            <g
              id="upper-body"
              className={movementGroup === 'torso_waist' ? 'animate-joint-torso' : ''}
            >
              {/* Torso / PE Shirt */}
              <path
                d="M 94 105 L 146 105 L 142 165 L 98 165 Z"
                fill="url(#peShirtGrad)"
                stroke="#0369a1"
                strokeWidth="2"
              />
              {/* White PE Stripe on Chest */}
              <path
                d="M 96 125 L 144 125 L 143 133 L 97 133 Z"
                fill="#ffffff"
                opacity="0.9"
              />
              {/* School Logo Crest  */}
              <circle cx="108" cy="118" r="5" fill="#facc15" />
              <text
                x="108"
                y="120"
                fontSize="5"
                fontWeight="bold"
                textAnchor="middle"
                fill="#1e293b"
              >
                MH
              </text>

              {/* LEFT ARM (Vai -> Khuỷu -> Cổ tay) */}
              <g className={movementGroup === 'shoulder' ? 'animate-joint-shoulder-l' : ''}>
                {/* Upper Arm Left */}
                <path
                  d="M 94 105 L 80 145 L 90 148 L 102 110 Z"
                  fill="#0284c7"
                />
                {/* Forearm & Hand Left */}
                <g className={movementGroup === 'elbow_arm' ? 'animate-joint-elbow-l' : ''}>
                  <path
                    d="M 80 145 L 75 185 L 85 186 L 90 148 Z"
                    fill={skinColor}
                  />
                  {/* Left Wrist & Hand */}
                  <g className={movementGroup === 'wrist_hand' ? 'animate-joint-wrist-l' : ''}>
                    <circle cx="80" cy="192" r="7" fill={skinColor} />
                    <rect x="76" y="194" width="7" height="6" rx="2" fill={skinColor} />
                  </g>
                </g>
              </g>

              {/* RIGHT ARM (Vai -> Khuỷu -> Cổ tay) */}
              <g className={movementGroup === 'shoulder' ? 'animate-joint-shoulder-r' : ''}>
                {/* Upper Arm Right */}
                <path
                  d="M 146 105 L 160 145 L 150 148 L 138 110 Z"
                  fill="#0284c7"
                />
                {/* Forearm & Hand Right */}
                <g className={movementGroup === 'elbow_arm' ? 'animate-joint-elbow-r' : ''}>
                  <path
                    d="M 160 145 L 165 185 L 155 186 L 150 148 Z"
                    fill={skinColor}
                  />
                  {/* Right Wrist & Hand */}
                  <g className={movementGroup === 'wrist_hand' ? 'animate-joint-wrist-r' : ''}>
                    <circle cx="160" cy="192" r="7" fill={skinColor} />
                    <rect x="157" y="194" width="7" height="6" rx="2" fill={skinColor} />
                  </g>
                </g>
              </g>

              {/* NECK & HEAD GROUP */}
              <g className={movementGroup === 'neck' ? 'animate-joint-neck' : ''}>
                {/* Neck */}
                <rect x="114" y="88" width="12" height="18" rx="3" fill={skinColor} />

                {/* Face & Head */}
                <ellipse cx="120" cy="65" rx="18" ry="22" fill={skinColor} />

                {/* Haircut (Male vs Female) */}
                {gender === 'male' ? (
                  // Male student short smart haircut
                  <path
                    d="M 102 62 C 102 44 112 40 120 40 C 128 40 138 44 138 62 C 134 50 128 48 120 48 C 112 48 106 52 102 62 Z"
                    fill={hairColor}
                  />
                ) : (
                  // Female student neat PE ponytail / bob hair
                  <g>
                    <path
                      d="M 100 64 C 100 42 110 38 120 38 C 130 38 140 42 140 64 C 136 50 128 48 120 48 C 112 48 104 50 100 64 Z"
                      fill={hairColor}
                    />
                    {/* Ponytail side strands */}
                    <path
                      d="M 136 58 C 145 65 146 78 142 85 C 138 78 138 68 136 58 Z"
                      fill={hairColor}
                    />
                    {/* Hair tie */}
                    <circle cx="138" cy="62" r="3" fill="#f43f5e" />
                  </g>
                )}

                {/* Friendly Eyes */}
                <ellipse cx="114" cy="64" rx="2" ry="2.5" fill="#0f172a" />
                <ellipse cx="126" cy="64" rx="2" ry="2.5" fill="#0f172a" />
                <circle cx="115" cy="63" r="0.8" fill="#ffffff" />
                <circle cx="127" cy="63" r="0.8" fill="#ffffff" />

                {/* Cheerful Smile */}
                <path
                  d="M 116 73 Q 120 78 124 73"
                  stroke="#ea580c"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Eyebrows */}
                <path d="M 111 60 Q 114 58 117 60" stroke="#334155" strokeWidth="1.2" fill="none" />
                <path d="M 123 60 Q 126 58 129 60" stroke="#334155" strokeWidth="1.2" fill="none" />
              </g>
            </g>

            {/* ANATOMICAL JOINT HIGHLIGHT GLOWS (Points of interest) */}
            {movementGroup === 'neck' && (
              <circle cx="120" cy="95" r="14" fill="url(#jointGlow)" className="animate-pulse" />
            )}
            {movementGroup === 'shoulder' && (
              <>
                <circle cx="94" cy="106" r="12" fill="url(#jointGlow)" className="animate-pulse" />
                <circle cx="146" cy="106" r="12" fill="url(#jointGlow)" className="animate-pulse" />
              </>
            )}
            {movementGroup === 'elbow_arm' && (
              <>
                <circle cx="80" cy="146" r="12" fill="url(#jointGlow)" className="animate-pulse" />
                <circle cx="160" cy="146" r="12" fill="url(#jointGlow)" className="animate-pulse" />
              </>
            )}
            {movementGroup === 'wrist_hand' && (
              <>
                <circle cx="78" cy="188" r="11" fill="url(#jointGlow)" className="animate-pulse" />
                <circle cx="162" cy="188" r="11" fill="url(#jointGlow)" className="animate-pulse" />
              </>
            )}
            {movementGroup === 'torso_waist' && (
              <circle cx="120" cy="145" r="18" fill="url(#jointGlow)" className="animate-pulse" />
            )}
            {movementGroup === 'hip' && (
              <circle cx="120" cy="170" r="16" fill="url(#jointGlow)" className="animate-pulse" />
            )}
            {movementGroup === 'knee_leg' && (
              <>
                <circle cx="104" cy="225" r="13" fill="url(#jointGlow)" className="animate-pulse" />
                <circle cx="136" cy="225" r="13" fill="url(#jointGlow)" className="animate-pulse" />
              </>
            )}
            {movementGroup === 'ankle_foot' && (
              <>
                <circle cx="100" cy="262" r="11" fill="url(#jointGlow)" className="animate-pulse" />
                <circle cx="140" cy="262" r="11" fill="url(#jointGlow)" className="animate-pulse" />
              </>
            )}
          </g>
        </svg>

        {/* Live Rep Counter Overlay */}
        <div className="absolute top-3 right-3 px-3 py-1.5 rounded-2xl bg-slate-950/85 border border-emerald-500/50 backdrop-blur-md shadow-lg text-right">
          <div className="text-[10px] text-slate-400 font-medium">Nhịp vận động</div>
          <div className="text-base font-black text-emerald-400">
            {currentReps} <span className="text-xs text-slate-300">/ {targetReps}</span>
          </div>
        </div>

        {/* Movement Name Pill */}
        <div className="absolute bottom-2 inset-x-3 py-1 px-2.5 rounded-xl bg-slate-950/85 border border-slate-700/60 backdrop-blur-md text-center">
          <span className="text-[11px] font-bold text-slate-200 truncate block">
            {movementName}
          </span>
        </div>
      </div>
    </div>
  );
};
