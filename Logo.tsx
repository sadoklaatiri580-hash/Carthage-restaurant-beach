type LogoProps = {
  className?: string;
  variant?: "neon" | "solid";
  title?: string;
};

/**
 * Logo officiel CARTHAGE BEACH (enseigne du restaurant) : arche lumineuse,
 * palmette rouge, "CARTHAGE BEACH" et la mention "Restaurant · Bar".
 * Reproduction fidèle — ne pas modifier les proportions ni les couleurs.
 */
export default function Logo({ className, variant = "neon", title = "CARTHAGE BEACH" }: LogoProps) {
  const red = "#E3122B";
  const arc = variant === "neon" ? "#FFFFFF" : "#0E2A47";
  const sub = variant === "neon" ? "#FFE9EC" : "#8A94A6";

  return (
    <svg
      viewBox="0 0 440 158"
      role="img"
      aria-label={title}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="cbGlow" x="-25%" y="-45%" width="150%" height="200%">
          <feGaussianBlur stdDeviation="3.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter={variant === "neon" ? "url(#cbGlow)" : undefined}>
        {/* Arche lumineuse */}
        <path
          d="M22 86 Q220 24 418 86"
          fill="none"
          stroke={arc}
          strokeWidth="11"
          strokeLinecap="round"
        />

        {/* Palmette (emblème) */}
        <g fill={red} transform="translate(220 12)">
          <path d="M0 0 C-9 14 -9 28 0 40 C9 28 9 14 0 0 Z" />
          <path d="M-14 8 C-24 20 -22 34 -10 42 C-5 31 -7 18 -14 8 Z" />
          <path d="M14 8 C24 20 22 34 10 42 C5 31 7 18 14 8 Z" />
          <path d="M-8 42 H8 L6 52 H-6 Z" />
        </g>

        {/* Nom */}
        <text
          x="220"
          y="124"
          textAnchor="middle"
          fill={red}
          fontFamily="var(--font-display), 'Arial Black', Impact, sans-serif"
          fontSize="44"
          fontWeight={900}
          letterSpacing="1.5"
        >
          CARTHAGE BEACH
        </text>

        {/* Mention */}
        <text
          x="220"
          y="148"
          textAnchor="middle"
          fill={sub}
          fontFamily="var(--font-display), Arial, sans-serif"
          fontSize="17"
          fontWeight={700}
          letterSpacing="5"
        >
          RESTAURANT · BAR
        </text>
      </g>
    </svg>
  );
}
