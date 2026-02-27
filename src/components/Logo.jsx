import React from 'react';

const Logo = ({ className = "h-10 w-auto" }) => {
    return (
        <svg
            viewBox="0 0 150 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-label="Zen Car Logo"
        >
            <defs>
                <clipPath id="logoClip">
                    {/* Inset shape slightly to accommodate stroke within bounds */}
                    <rect x="1" y="1" width="148" height="46" rx="23" />
                </clipPath>
            </defs>

            {/* Main Content Group clipped to pill shape */}
            <g clipPath="url(#logoClip)">
                {/* Full White Background (base for right side) */}
                <rect width="150" height="48" fill="white" />

                {/* Blue Shape (Left side with custom wave) */}
                {/*
           Curve logic: Adjusted to accommodate larger italic text.
           Increased rightward shift to ensure "ZEN" stays on blue.
        */}
                <path
                    d="M 0 0 L 82 0 C 98 12 62 36 78 48 L 0 48 Z"
                    fill="#2563EB"
                />
            </g>

            {/* Outer Border */}
            <rect x="1" y="1" width="148" height="46" rx="23" stroke="#2563EB" strokeWidth="2" fill="none" />

            {/* ZEN Text - White on Blue */}
            <text
                x="36"
                y="33"
                fontFamily="Inter, system-ui, sans-serif"
                fontWeight="800"
                fontSize="28"
                fontStyle="italic"
                fill="white"
                textAnchor="middle"
            >
                ZEN
            </text>

            {/* CAR Text - Blue on White */}
            <text
                x="114"
                y="33"
                fontFamily="Inter, system-ui, sans-serif"
                fontWeight="800"
                fontSize="28"
                fontStyle="italic"
                fill="#2563EB"
                textAnchor="middle"
            >
                CAR
            </text>
        </svg>
    );
};

export default Logo;
