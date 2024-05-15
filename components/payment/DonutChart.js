import { colors, generateColor } from '@/utils/constants/';
import { ProximaNova } from '@/utils/theme';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import dynamic from 'next/dynamic';
import { memo } from 'react';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false
});

const DonutChart = (props) => {
  const theme = useTheme();
  const mergedArray = !!props.stats
    ? props.stats?.results.map((item, index) => ({
        ...item,
        color: !!colors[index] ? colors[index] : generateColor()
      }))
    : [];

  const usedTokensPercentages = mergedArray.map((result) => {
    const percentageString = result.used_tokens_percentage;
    const numericValue = parseFloat(percentageString.replace('%', ''));
    return numericValue;
  });

  const state = {
    series: usedTokensPercentages || []
  };
  const options = {
    chart: {
      type: 'donut'
    },
    colors: props.stats ? mergedArray?.map(({ color }) => color) : [],
    labels: props.stats
      ? mergedArray?.map(({ product__title }) => product__title)
      : [],
    stroke: {
      width: 0
    },

    tooltip: {
      fillSeriesColor: true,
      marker: {
        show: false
      },
      fixed: {
        enabled: true,
        position: 'bottomRight',
        offsetX: 300
      },
      style: {
        fontSize: '16px'
      },

      y: {
        formatter: function (val) {
          const newValue = val + '%';
          return newValue;
        }
      }
    },

    legend: {
      show: true,
      offsetX: -10,
      // offsetY: 0,
      position: 'right',
      fontSize: '12px',
      fontFamily: ProximaNova.style.fontFamily,
      fontWeight: '400',
      labels: {
        colors: '#fff'
      },
      markers: {
        offsetY: 0,
        offsetX: -10
      },
      onItemHover: {
        highlightDataSeries: true
      }
    },

    plotOptions: {
      pie: {
        donut: {
          size: '50%',
          background: 'transparent'
        },
        labels: {
          show: true
        }
      }
    },

    dataLabels: {
      enabled: true,

      formatter: function (val) {
        const newValue = parseFloat(val.toFixed(1)) + '%';
        return newValue;
      }
    },
    responsive: [
      {
        breakpoint: 400,
        options: {
          chart: {
            width: 300
          }
        }
      },

      {
        breakpoint: 600,
        options: {
          legend: {
            position: 'bottom',
            itemMargin: {
              horizontal: 10
            },
            markers: {
              offsetY: 0
            }
          },
          chart: {
            width: 350
          }
        }
      },

      {
        breakpoint: 2600,
        options: {
          legend: {
            offsetY: -10
          },
          chart: {
            width: 350
          }
        }
      }
    ]
  };

  return (
    <Stack
      direction={'column'}
      sx={{
        fontFamily: ProximaNova.style.fontFamily,
        alignItems: { xs: 'center', md: 'flex-start' },
        minWidth: { sm: 350 }
      }}
    >
      <Box
        sx={{
          minHeight: { xs: 264, sm: 160 },
          display: 'grid',
          placeContent: 'center'
        }}
      >
        <ReactApexChart
          options={options}
          series={state.series}
          width={300}
          height={250}
          type='donut'
          id='payment-chart'
        />
      </Box>
      <Typography variant='caption2' sx={{ textAlign: 'center' }}>
        <span style={{ color: theme.palette.secondary.main }}>Note:</span>{' '}
        <span style={{ color: theme.palette.divider }}>
          This pie chart displays data from last month.
        </span>
      </Typography>
    </Stack>
  );
};

export default memo(DonutChart);
