import React from "react";

const Svg = ({ color }: { color: string }) =>
  color ? (
    <svg
      width="511"
      height="81"
      viewBox="0 0 511 81"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="none"
    >
      <path
        d="M4 11.5L0 1L7.5 0L15 3.5L27 0L36.5 1.5L40.5 1L44.5 3.5L53 0L69 3.5L93 0L107.5 3.5L114.5 1L119.5 3.5L136 0L170 3.5L187.5 0L198.5 3.5L202 1.5L208.5 3.5L213 1.5L306.5 0L324.5 3.5L333.5 1.5L343 3.5L412.5 0L434.5 3.5L446.5 1.5L458 3.5L466.5 0L491 3.5L500.5 0H509L509.5 6.5L508 9.5L507 15L508 21L510.5 29L509 40L505.5 43.5L507 54.5L509.5 60.5L507 65.5L510 75.5L509.5 80L504 78L502 80L494.5 79.5L488.5 80.5C483.667 79.8333 482.2 78 481 78H479.5L470.5 77L466.5 80L440.5 76.5L434.5 80H422.5L406.5 76.5L401.5 78L387.5 80L372 76.5L366 80L360 76.5L345.5 80L296.5 76.5L277.5 80L270.5 76.5L243 80L225.5 76.5L221 80H215L210 76.5L170 80L146.5 76.5L143.5 80H136L100.5 76.5L90 80L36.5 76.5L20 80L9.5 76.5L6 78.5H2L0 74L2 61L3.5 53.5L0 42L2 31L3.5 26L0.5 19L4 11.5Z"
        fill="#389EAF"
        fill-opacity="0.8"
      />
      <path
        d="M506.5 11.5L510.5 1L503 0L495.5 3.5L483.5 0L474 1.5L470 1L466 3.5L457.5 0L441.5 3.5L417.5 0L403 3.5L396 1L391 3.5L374.5 0L340.5 3.5L323 0L312 3.5L308.5 1.5L302 3.5L297.5 1.5L204 0L186 3.5L177 1.5L167.5 3.5L98 0L76 3.5L64 1.5L52.5 3.5L44 0L19.5 3.5L10 0H1.5L1 6.5L2.5 9.5L3.5 15L2.5 21L0 29L1.5 40L5 43.5L3.5 54.5L1 60.5L3.5 65.5L0.5 75.5L1 80L6.5 78L8.5 80L16 79.5L22 80.5C26.8333 79.8333 28.3 78 29.5 78H31L40 77L44 80L70 76.5L76 80H88L104 76.5L109 78L123 80L138.5 76.5L144.5 80L150.5 76.5L165 80L214 76.5L233 80L240 76.5L267.5 80L285 76.5L289.5 80H295.5L300.5 76.5L340.5 80L364 76.5L367 80H374.5L410 76.5L420.5 80L474 76.5L490.5 80L501 76.5L504.5 78.5H508.5L510.5 74L508.5 61L507 53.5L510.5 42L508.5 31L507 26L510 19L506.5 11.5Z"
        fill="#3889AF"
        fill-opacity="0.8"
      />
      <path
        d="M506.5 69L510.5 79.5L503 80.5L495.5 77L483.5 80.5L474 79L470 79.5L466 77L457.5 80.5L441.5 77L417.5 80.5L403 77L396 79.5L391 77L374.5 80.5L340.5 77L323 80.5L312 77L308.5 79L302 77L297.5 79L204 80.5L186 77L177 79L167.5 77L98 80.5L76 77L64 79L52.5 77L44 80.5L19.5 77L10 80.5H1.5L1 74L2.5 71L3.5 65.5L2.5 59.5L0 51.5L1.5 40.5L5 37L3.5 26L1 20L3.5 15L0.5 5L1 0.5L6.5 2.5L8.5 0.5L16 1L22 0C26.8333 0.666664 28.3 2.5 29.5 2.5H31L40 3.5L44 0.5L70 4L76 0.5H88L104 4L109 2.5L123 0.5L138.5 4L144.5 0.5L150.5 4L165 0.5L214 4L233 0.5L240 4L267.5 0.5L285 4L289.5 0.5H295.5L300.5 4L340.5 0.5L364 4L367 0.5H374.5L410 4L420.5 0.5L474 4L490.5 0.5L501 4L504.5 2H508.5L510.5 6.5L508.5 19.5L507 27L510.5 38.5L508.5 49.5L507 54.5L510 61.5L506.5 69Z"
        fill="url(#paint0_linear_1401_3945)"
        fill-opacity="0.8"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1401_3945"
          x1="510.5"
          y1="40.25"
          x2="0"
          y2="40.25"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color={color} />
          <stop offset="1" stop-color="#3870AF" />
        </linearGradient>
      </defs>
    </svg>
  ) : null;

const JaggedCardSmall = ({
  children,
  className = "",
  bgColor,
  shadow = true,
  ...props
}) => {
  return (
    <div
      className="relative w-full px-6 py-4"
      {...props}
      style={{
        filter: shadow ? `drop-shadow(0 0 1rem ${bgColor}80)` : "",
      }}
    >
      <Svg color={bgColor} />
      <div className={`relative z-10 ${className}`}>{children}</div>
    </div>
  );
};

export default JaggedCardSmall;
