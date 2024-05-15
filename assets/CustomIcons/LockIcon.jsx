const LockIcon = ({ width, height }) => {
  return (
    <svg
      width={`${!!width ? width : '42'}`}
      height={`${!!height ? height : '50'}`}
      viewBox='0 0 42 50'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M32.1577 18.951V13.6664C32.1577 7.48099 27.1381 2.46471 20.9487 2.46471C14.7592 2.43763 9.71996 7.4293 9.69287 13.6172V13.6664V18.951'
        stroke='#FABD2F'
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M30.3357 47.9999H11.5161C6.35864 47.9999 2.17651 43.823 2.17651 38.6664V28.1095C2.17651 22.953 6.35864 18.776 11.5161 18.776H30.3357C35.4932 18.776 39.6753 22.953 39.6753 28.1095V38.6664C39.6753 43.823 35.4932 47.9999 30.3357 47.9999Z'
        stroke='#FABD2F'
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M20.9255 30.655V36.1217'
        stroke='#FABD2F'
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default LockIcon;
