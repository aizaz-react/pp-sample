import React from 'react';

const PLogo = ({ width, height }) => {
  return (
    <svg
      width={width || '57'}
      height={height || '72'}
      viewBox='0 0 57 72'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M15.79 31.09H40.9V53.32L15.79 31.09Z' fill='#429CBD' />
      <path
        d='M56.29 23.8C56.29 11.1 47.92 0.52002 32.71 0.52002H0.709961V71.4H13.49V11.9901H30.99C38.16 11.9901 43.27 16.67 43.27 23.8C43.3236 26.4292 42.4847 28.999 40.89 31.09H55.29C55.9762 28.7216 56.3131 26.2658 56.29 23.8Z'
        fill='white'
      />
    </svg>
  );
};

export default PLogo;
