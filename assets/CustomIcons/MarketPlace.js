import React from 'react';
import { useTheme } from '@mui/material';

const MarketPlace = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='18'
      height='16'
      viewBox='0 0 18 16'
      fill='none'
    >
      <g clipPath='url(#clip0_2210_338)'>
        <path
          d='M4.37917e-05 5.78543H1.2876V13.3734C1.26993 13.4769 1.27718 13.5832 1.30875 13.6833C1.34032 13.7835 1.3953 13.8747 1.46913 13.9493C1.54297 14.024 1.63353 14.08 1.73332 14.1127C1.83312 14.1454 1.93926 14.1539 2.04297 14.1374H15.9657C16.0679 14.152 16.1722 14.1425 16.2701 14.1095C16.3679 14.0766 16.4567 14.0212 16.5293 13.9478C16.602 13.8743 16.6563 13.7849 16.6881 13.6866C16.7199 13.5884 16.7283 13.4841 16.7125 13.382V2.03436C16.7283 1.93231 16.7199 1.82796 16.6881 1.72971C16.6563 1.63146 16.602 1.54203 16.5293 1.4686C16.4567 1.39516 16.3679 1.33975 16.2701 1.30683C16.1722 1.2739 16.0679 1.26437 15.9657 1.27899H2.0258C1.92505 1.26615 1.8227 1.2767 1.72668 1.30983C1.63067 1.34295 1.54358 1.39775 1.47218 1.46998C1.40078 1.54222 1.34699 1.62993 1.31498 1.72632C1.28297 1.82271 1.2736 1.92518 1.2876 2.02577V3.8541H16.0601V5.1159H0.763998C0.659996 5.13198 0.553669 5.12332 0.453642 5.09061C0.353616 5.05791 0.262711 5.00208 0.188297 4.92766C0.113882 4.85325 0.0580547 4.76235 0.0253485 4.66232C-0.00735775 4.56229 -0.0160327 4.45596 4.37917e-05 4.35196V1.96569C-0.00829849 1.70192 0.0375099 1.43923 0.134635 1.19385C0.231761 0.948462 0.378147 0.725597 0.564757 0.538988C0.751366 0.352378 0.974244 0.205986 1.21963 0.10886C1.46501 0.0117346 1.72769 -0.0340738 1.99147 -0.0257315H16.0086C16.2723 -0.0365603 16.5354 0.00725181 16.7813 0.102953C17.0273 0.198654 17.2508 0.344178 17.4378 0.530383C17.6248 0.716587 17.7713 0.939454 17.868 1.18498C17.9648 1.4305 18.0097 1.69339 18.0001 1.95711V13.4078C18.0097 13.6715 17.9648 13.9344 17.868 14.1799C17.7713 14.4254 17.6248 14.6483 17.4378 14.8345C17.2508 15.0207 17.0273 15.1662 16.7813 15.2619C16.5354 15.3576 16.2723 15.4014 16.0086 15.3906H1.99147C1.72736 15.4002 1.46411 15.3553 1.21815 15.2586C0.972194 15.1619 0.748806 15.0156 0.561934 14.8287C0.375062 14.6418 0.228718 14.4184 0.132042 14.1725C0.0353661 13.9265 -0.00956957 13.6633 4.37917e-05 13.3992V5.75968V5.78543Z'
          fill={'currentColor'}
        />
        <path
          d='M4.49794 6.42063V5.79401H5.78549V6.42063H7.05588V7.69101H4.57519C4.48533 7.68269 4.39471 7.69311 4.30908 7.7216C4.22345 7.7501 4.14466 7.79606 4.0777 7.85656C4.01074 7.91707 3.95707 7.99081 3.92007 8.07312C3.88307 8.15543 3.86355 8.24454 3.86274 8.33478C3.86355 8.42503 3.88307 8.51414 3.92007 8.59645C3.95707 8.67876 4.01074 8.7525 4.0777 8.81301C4.14466 8.87351 4.22345 8.91947 4.30908 8.94797C4.39471 8.97646 4.48533 8.98688 4.57519 8.97856C5.0988 8.97856 5.6224 8.97855 6.13742 9.02147C6.58372 9.09721 6.98822 9.33006 7.27786 9.67795C7.56751 10.0258 7.7232 10.4658 7.71682 10.9185C7.71365 11.368 7.55305 11.8023 7.26294 12.1457C6.97283 12.4891 6.57154 12.7201 6.12884 12.7983L5.79408 12.8498V13.4678H4.50652V12.8412H3.22755V11.5451H5.74258C5.83138 11.551 5.92046 11.5385 6.00418 11.5083C6.08789 11.478 6.16444 11.4308 6.22897 11.3695C6.2935 11.3082 6.34462 11.2342 6.3791 11.1521C6.41357 11.07 6.43065 10.9817 6.42927 10.8927C6.42715 10.8059 6.40748 10.7204 6.37145 10.6414C6.33542 10.5624 6.28377 10.4914 6.21962 10.4329C6.15546 10.3744 6.08013 10.3294 5.99814 10.3007C5.91616 10.2721 5.82923 10.2603 5.74258 10.2661C5.22799 10.2962 4.71209 10.2962 4.19751 10.2661C3.72578 10.2 3.29648 9.95801 2.99563 9.5887C2.69477 9.2194 2.5446 8.75005 2.57519 8.27469C2.60481 7.80613 2.80262 7.36402 3.13223 7.02968C3.46184 6.69534 3.90109 6.49125 4.36918 6.45495L4.49794 6.42063Z'
          fill={'currentColor'}
        />
        <path
          d='M8.36914 10.2661V9.00427H15.4078V10.2661H8.36914Z'
          fill={'currentColor'}
        />
        <path
          d='M8.36914 12.8412V11.5794H15.4164V12.8412H8.36914Z'
          fill={'currentColor'}
        />
        <path
          d='M11.5536 1.93994V3.20175H5.79395V1.93994H11.5536Z'
          fill={'currentColor'}
        />
        <path
          d='M9.65674 7.691V6.4292H15.4164V7.691H9.65674Z'
          fill={'currentColor'}
        />
        <path
          d='M1.94873 1.93134H3.20195V3.20173H1.94873V1.93134Z'
          fill={'currentColor'}
        />
        <path
          d='M5.13289 1.93994V3.20175H3.87109V1.93994H5.13289Z'
          fill='#FABD2F'
        />
      </g>
      <defs>
        <clipPath id='clip0_2210_338'>
          <rect width='18' height='15.4249' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};

export default MarketPlace;