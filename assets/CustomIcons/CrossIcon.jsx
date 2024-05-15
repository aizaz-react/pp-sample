import React from 'react';

function CrossIcon({ color }) {
  return (
    <svg
      width='15'
      height='15'
      viewBox='0 0 15 15'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M13.5 1.83337L7.66669 7.66671L13.5 13.5'
        stroke={color || '#429CBD'}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M1.83335 1.83337L7.66669 7.66671L1.83335 13.5'
        stroke={color || '#429CBD'}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

export default CrossIcon;
