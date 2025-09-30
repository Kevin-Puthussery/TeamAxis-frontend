import React from 'react';

/**
 * Renders a Horizontal Progress Bar with a percentage tooltip.
 * @param {object} props - The component props.
 * @param {number} props.progress - The percentage value to display (0-100).
 * @param {string} [props.barHeight='16px'] - The CSS height for the progress bar.
 * @param {string} [props.fillColor='bg-blue-600'] - Tailwind class for the filled part's color.
 * @param {string} [props.trackColor='bg-gray-200'] - Tailwind class for the background track's color.
 */
const HorizontalProgressBar = ({
  progress = 75,
  barHeight = '16px',
  fillColor = 'bg-blue-600',
  trackColor = 'bg-gray-200',
}) => {
  // Ensure progress is within 0-100 bounds
  const safeProgress = Math.max(0, Math.min(100, progress));

  // Calculate the position for the tooltip: safeProgress minus a small offset 
  // to center the tooltip above the end of the blue bar.
  const tooltipPosition = safeProgress;

  return (
    <div 
      className={`w-full relative ${trackColor} rounded-sm overflow-hidden`} 
      style={{ height: barHeight }}
    >
      {/* 1. Progress Fill Bar */}
      <div
        className={`${fillColor} h-full transition-all duration-500 ease-out`}
        style={{ width: `${safeProgress}%` }}
      />

      {/* 2. Tooltip Container */}
      {/* Tooltip is absolutely positioned and translated based on the progress value */}
      <div 
        className="absolute top-0 right-0 transform -translate-y-full"
        style={{ left: `${tooltipPosition}%` }} // Position the tooltip anchor
      >
        <div 
          className="relative bg-gray-800 text-white text-xs font-semibold py-1 px-2 rounded-md shadow-lg"
          style={{ transform: 'translateX(-50%)' }} // Center the tooltip itself
        >
          {`${safeProgress}%`}
          
          {/* Tooltip Triangle/Pointer */}
          <svg className="absolute text-gray-800 h-2 w-full left-0 top-full transform -translate-y-px" x="0px" y="0px" viewBox="0 0 255 255">
            <polygon className="fill-current" points="0,0 127.5,127.5 255,0"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default HorizontalProgressBar;