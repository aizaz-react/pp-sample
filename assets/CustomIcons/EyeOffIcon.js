import React from 'react';

const EyeOffIcon = ({ color }) => {
  return (
    <svg
      width='18'
      height='18'
      viewBox='0 0 18 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M15.1876 15.7501C15.1137 15.7502 15.0405 15.7357 14.9723 15.7074C14.904 15.6791 14.8421 15.6376 14.79 15.5852L2.41495 3.21019C2.31392 3.10384 2.25842 2.96223 2.2603 2.81555C2.26218 2.66887 2.32128 2.52873 2.42501 2.42501C2.52873 2.32128 2.66887 2.26218 2.81555 2.2603C2.96223 2.25842 3.10384 2.31392 3.21019 2.41495L15.5852 14.79C15.6638 14.8686 15.7173 14.9688 15.739 15.0779C15.7607 15.187 15.7496 15.3 15.707 15.4028C15.6645 15.5055 15.5924 15.5934 15.4999 15.6552C15.4075 15.717 15.2988 15.75 15.1876 15.7501ZM8.71882 11.1042L6.89808 9.28343C6.88765 9.27308 6.87423 9.26627 6.85973 9.26393C6.84522 9.2616 6.83035 9.26387 6.8172 9.27043C6.80405 9.27698 6.79328 9.2875 6.78641 9.30048C6.77954 9.31347 6.77692 9.32829 6.7789 9.34284C6.85241 9.81521 7.0742 10.252 7.41224 10.59C7.75027 10.928 8.18704 11.1498 8.65941 11.2234C8.67397 11.2253 8.68878 11.2227 8.70177 11.2158C8.71476 11.209 8.72527 11.1982 8.73182 11.1851C8.73838 11.1719 8.74065 11.157 8.73832 11.1425C8.73599 11.128 8.72917 11.1146 8.71882 11.1042ZM9.28132 6.89597L11.1049 8.71882C11.1153 8.72931 11.1287 8.73626 11.1433 8.73867C11.1579 8.74109 11.1729 8.73884 11.1861 8.73227C11.1993 8.72569 11.2101 8.71511 11.217 8.70203C11.2239 8.68895 11.2265 8.67404 11.2244 8.65941C11.1511 8.1864 10.9291 7.74899 10.5907 7.41053C10.2522 7.07207 9.8148 6.85011 9.34179 6.77679C9.32714 6.77453 9.31216 6.77696 9.29897 6.78372C9.28578 6.79049 9.27507 6.80125 9.26837 6.81447C9.26166 6.82768 9.2593 6.84268 9.26163 6.85732C9.26396 6.87196 9.27085 6.88548 9.28132 6.89597Z'
        fill={color || 'white'}
      />
      <path
        d='M17.2617 9.61031C17.3781 9.42763 17.4396 9.21539 17.439 8.99878C17.4384 8.78217 17.3756 8.57029 17.2582 8.38828C16.328 6.94969 15.1211 5.72766 13.7682 4.85402C12.2695 3.88652 10.6172 3.375 8.98875 3.375C8.13027 3.37618 7.27763 3.51615 6.46383 3.78949C6.44105 3.79707 6.42059 3.81035 6.4044 3.82807C6.38821 3.84579 6.37682 3.86736 6.37132 3.89072C6.36582 3.91409 6.3664 3.93847 6.37299 3.96155C6.37958 3.98463 6.39197 4.00564 6.40898 4.02258L8.06976 5.68336C8.08702 5.70064 8.10847 5.71314 8.13202 5.71961C8.15557 5.72608 8.1804 5.72631 8.20406 5.72027C8.767 5.58309 9.35578 5.59314 9.91371 5.74946C10.4716 5.90579 10.9799 6.20312 11.3896 6.61282C11.7993 7.02253 12.0967 7.53082 12.253 8.08875C12.4093 8.64668 12.4194 9.23546 12.2822 9.7984C12.2762 9.82201 12.2765 9.84677 12.2829 9.87025C12.2894 9.89373 12.3019 9.91512 12.3191 9.93234L14.708 12.323C14.7328 12.3479 14.7661 12.3625 14.8012 12.3641C14.8364 12.3657 14.8708 12.354 14.8978 12.3314C15.8174 11.5476 16.6142 10.6304 17.2617 9.61031ZM9 12.375C8.48909 12.375 7.98484 12.2591 7.52527 12.0358C7.0657 11.8126 6.66281 11.488 6.34697 11.0864C6.03113 10.6848 5.81058 10.2168 5.70196 9.71753C5.59334 9.2183 5.59948 8.70093 5.71992 8.20441C5.72589 8.1808 5.72563 8.15604 5.71916 8.13256C5.71269 8.10908 5.70023 8.08769 5.68301 8.07047L3.33316 5.71957C3.30825 5.69462 3.27487 5.67995 3.23964 5.67845C3.20441 5.67695 3.16991 5.68874 3.14297 5.71148C2.28551 6.44309 1.49062 7.33324 0.763943 8.37352C0.636743 8.55608 0.566688 8.77235 0.562682 8.99482C0.558676 9.2173 0.620898 9.43594 0.741443 9.62297C1.66992 11.076 2.86453 12.2998 4.1966 13.1614C5.69742 14.1328 7.30969 14.625 8.98875 14.625C9.85589 14.6227 10.7174 14.4857 11.5425 14.2189C11.5655 14.2116 11.5862 14.1985 11.6026 14.1808C11.6191 14.1632 11.6307 14.1416 11.6364 14.1181C11.6421 14.0947 11.6416 14.0702 11.6351 14.0469C11.6286 14.0237 11.6162 14.0026 11.5991 13.9855L9.93023 12.317C9.91301 12.2998 9.89162 12.2873 9.86814 12.2808C9.84466 12.2744 9.8199 12.2741 9.79629 12.2801C9.53557 12.3433 9.26826 12.3751 9 12.375Z'
        fill={color || 'white'}
      />
    </svg>
  );
};

export default EyeOffIcon;
