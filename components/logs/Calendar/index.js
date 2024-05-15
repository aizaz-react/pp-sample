import 'flatpickr/dist/themes/material_green.css';

import { Box, Stack, styled, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import '../../../styles/flatpickr.css';

function Calendar({ title, handleDateChange, value, field }) {
  const [positionElement, setPositionElement] = useState(null);
  const positionElementRef = useRef(null);
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setPositionElement(positionElementRef.current);
    }
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <Stack gap='.2rem' position='relative'>
      <PositionElement ref={positionElementRef}></PositionElement>
      <Typography variant='body1'>{title}</Typography>
      <Flatpickr
        onFocus={() => {
          setPositionElement(positionElementRef.current);
        }}
        onChange={(date) => {
          handleDateChange(date, field);
        }}
        options={{
          mode: 'single',
          dateFormat: 'Y-m-d h:i K',
          enableTime: true,
          maxDate: new Date(),
          position: 'below left',
          positionElement,
          defaultDate: new Date(value ? value * 1000 : ''),
          disableMobile: true
        }}
      />
    </Stack>
  );
}
const PositionElement = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '307px',
  left: '-21rem',
  top: '-160px',
  zIndex: '-1',
  [theme.breakpoints.down('sm')]: {
    left: '-10px',
    top: '63px'
  }
}));
export default Calendar;
