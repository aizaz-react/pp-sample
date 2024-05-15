const DownloadLogo = ({ width, height }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width || '18'}
      height={height || '18'}
      fill='none'
      viewBox='0 0 18 18'
    >
      <path
        stroke='#429CBD'
        strokeLinecap='round'
        strokeWidth='1.6'
        d='M9 .85v10.286M6.144 8.279L9 11.136M11.857 8.279L9 11.136M17 10.907v5.143c0 .631-.614 1.143-1.371 1.143H2.37C1.614 17.193 1 16.68 1 16.05v-5.143'
      ></path>
    </svg>
  );
};

export default DownloadLogo;
