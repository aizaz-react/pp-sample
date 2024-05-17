'use client';
import UsersIcon from '@/assets/CustomIcons/UsersIcon';
import Button from '@/components/core/Button';
import UtilityCard from '@/components/overview/UtilityCard';
import { CardWrapper } from '@/components/styled/core';
import {
  currentDates,
  nextDates,
  previousDates,
  renderDates
} from '@/utils/globalFuntions';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import {
  Box,
  IconButton,
  Skeleton,
  Stack,
  styled,
  Typography,
  useTheme
} from '@mui/material';
import moment from 'moment';
import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import { ProximaNova } from '@/utils/theme';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const getStartOfMonth = () => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  return moment(startOfMonth).format('yyyy-MM-DD');
};

const getEndOfMonth = () => {
  const now = new Date();
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return moment(endOfMonth).format('yyyy-MM-DD');
};

const OverView = () => {
  const theme = useTheme();
  const [chartView, setChartView] = useState('Month');
  const [dates, setDates] = useState({
    startDate: getStartOfMonth(),
    endDate: getEndOfMonth()
  });

  const updateDates = ({ start, end }) => {
    setDates({
      startDate: moment(start).format('yyyy-MM-DD'),
      endDate: moment(end).format('yyyy-MM-DD')
    });
  };

  const previousDate = () => {
    const prevDate = previousDates[chartView](new Date(dates.startDate));
    updateDates({ ...prevDate });
  };

  const getNextDate = () => {
    const startDate = new Date(dates.startDate);
    const nextDate = nextDates[chartView](startDate);
    updateDates({ ...nextDate });
  };

  const options = {
    chart: {
      height: 350,
      type: 'line',
      background: 'transparent',
      toolbar: {
        show: false
      }
    },
    colors: ['#ff6d00', '#c77dff', '#D9D9D9', '#275D71', '#FABD2F', '#041218'],
    grid: {
      show: false
    },
    theme: {
      mode: 'dark'
    },
    stroke: {
      width: 2,
      curve: 'smooth'
    },
    xaxis: {
      type: 'datetime'
    },
    title: {
      show: false
    },
    legend: {
      fontFamily: ProximaNova.style.fontFamily
    }
  };

  const {
    series,
    cards = []
  } = useMemo(() => {
    const seriesData = [];
    for (let i = 1; i <= 2; i++) {
      const seriesName = `${i === 1 ? 'Active' : 'Paid'} Users`;
      const series = [];
      const startDate = new Date();
      for (let j = 0; j < 12; j++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(currentDate.getDate() + j);
        const randomY = Math.floor(Math.random() * 100);
        series.push({ x: currentDate, y: randomY });
      }
      series.sort((a, b) => a.x.getTime() - b.x.getTime());
      seriesData.push({ name: seriesName, data: series });
    }

    return {
      series: seriesData,
      cards: [65570, 36990]
    };
  }, []);

  const changeView = (view) => () => {
    const prevDate = currentDates[view]();
    setChartView(view);
    updateDates({ ...prevDate });
  };
  
  return (
    <Main gap={'2rem'}>
      <CardWrapper
        sx={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}
      >
        {cards?.map((_, i) => (
          <UtilityCard
            key={i}
            cardValue={_}
            icon={<UsersIcon />}
            color={i % 2 === 0 ? 'primary' : 'secondary'}
            title={i % 2 === 0 ? 'Active Users' : 'Paid Users'}
          />
        ))}
      </CardWrapper>
      <ChartSection gap={'2rem'}>
        <ChartToolbar>
          <Typography variant='heading2' whiteSpace='nowrap'>
            Insights
          </Typography>
          <ActionBox>
            <Stack direction={'row'} alignItems={'center'}>
              <IconButton color={'secondary'} onClick={previousDate}>
                <ChevronLeft />
              </IconButton>
              <Typography
                variant='body1'
                sx={{
                  userSelect: 'none',
                  whiteSpace: 'nowrap'
                }}
              >
                {renderDates[chartView]({ ...dates })}
              </Typography>
              <IconButton color={'secondary'} onClick={getNextDate}>
                <ChevronRight />
              </IconButton>
            </Stack>
            <Stack direction={'row'} alignItems={'center'} gap='.5rem'>
              {['Week', 'Month', 'Year'].map((view, i) => {
                const isSelectedChartView = chartView === view;
                return (
                  <Button
                    key={i}
                    disableRipple
                    sx={{
                      padding: '.3rem 1rem',
                      border: `1px solid ${
                        isSelectedChartView
                          ? theme.palette.primary.main
                          : '#fff'
                      }`,
                      '&:hover': {
                        border: `1px solid ${
                          isSelectedChartView ? 'transparent' : '#fff'
                        }`
                      }
                    }}
                    color={isSelectedChartView ? 'primary' : 'inherit'}
                    variant={isSelectedChartView ? 'contained' : 'outlined'}
                    onClick={changeView(view)}
                  >
                    <Typography
                      variant='body1'
                      sx={{ lineHeight: 'normal !important' }}
                    >
                      {view}
                    </Typography>
                  </Button>
                );
              })}
            </Stack>
          </ActionBox>
        </ChartToolbar>
        <Chart
          options={options}
          series={series}
          type='line'
          height='350'
          width={'100%'}
        />
      </ChartSection>
    </Main>
  );
};

export default OverView;

const Main = styled(Stack)(({ theme }) => ({
  width: 'calc(100vw - 300px)',
  padding: '2rem',
  [theme.breakpoints.down('md')]: {
    padding: '2rem 1rem',
    width: '100%'
  }
}));

const ChartSection = styled(Stack)(({ theme }) => ({
  padding: '2rem',
  border: `1px solid ${theme.palette.text.secondary}50`,
  borderRadius: '1rem',
  '& .apexcharts-svg': { background: 'none !important' }
}));

const ChartToolbar = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  [theme.breakpoints.down('lg')]: {
    gap: '0.5rem',
    flexDirection: 'column'
  }
}));

const ActionBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '.5rem',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column'
  }
}));
const SkeletonWrapper = styled(Stack)(({ theme }) => ({
  padding: '1rem',
  borderRadius: '12px',
  background: `linear-gradient(180deg, ${theme.palette.background.paper} -123.94%, ${theme.palette.background.default} 134.51%)`
}));

const SkeletonTile = () => (
  <SkeletonWrapper direction={'row'} alignItems={'center'}>
    <Stack gap={'10px'} flex={1}>
      <Skeleton variant='text' sx={{ fontSize: '3.5rem', width: '4rem' }} />
      <Skeleton variant='text' sx={{ fontSize: '3.5rem', width: '2rem' }} />
    </Stack>
    <Skeleton variant='circular' width={40} height={40} />
  </SkeletonWrapper>
);
