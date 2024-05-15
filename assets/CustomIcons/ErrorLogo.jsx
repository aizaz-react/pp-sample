const ErrorLogo = ({ width, height }) => {
  return (
    <>
      <svg
        width={width || '75'}
        height={height || '75'}
        viewBox='0 0 90 90'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <rect width='89.9982' height='90' rx='20' fill='#0E2833' />
        <path
          d='M33.954 48.1729H55.6391V67.3707L33.954 48.1729Z'
          fill='#429CBD'
        />
        <path
          d='M68.999 34.1047C68.999 23.1369 61.7707 14 48.6353 14H21V75.2121H32.0369V23.9055H47.1499C53.3419 23.9055 57.7549 27.9472 57.7549 34.1047C57.8013 36.3753 57.0767 38.5945 55.6995 40.4003H68.1354C68.7281 38.355 69.019 36.2341 68.999 34.1047Z'
          fill='white'
        />
      </svg>
    </>
  );
};

export default ErrorLogo;
