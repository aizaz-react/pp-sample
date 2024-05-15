import React from 'react';

const MessageIcon = ({ width, height }) => {
  return (
    <svg
      width={`${!!width ? width : '54'}`}
      height={`${!!height ? height : '49'}`}
      viewBox='0 0 54 49'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M41.7421 16.6285L30.6376 25.6611C28.5396 27.3261 25.5878 27.3261 23.4898 25.6611L12.2916 16.6285'
        stroke='#FABD2F'
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M39.2595 46.9999C46.8603 47.021 51.983 40.7739 51.983 33.0959V15.925C51.983 8.24707 46.8603 2 39.2595 2H14.7235C7.12272 2 2 8.24707 2 15.925V33.0959C2 40.7739 7.12272 47.021 14.7235 46.9999H39.2595Z'
        stroke='#FABD2F'
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default MessageIcon;
