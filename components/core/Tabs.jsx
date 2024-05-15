import { Tab, Tabs, Typography, tabsClasses, useTheme } from '@mui/material';

const StyledTabs = ({ tabList, value, onChange, sx }) => {
  const { typography } = useTheme();
  return (
    <Tabs
      value={value}
      onChange={onChange}
      variant='scrollable'
      scrollButtons={false}
      TabIndicatorProps={{ sx: { height: 4, borderRadius: '2px' } }}
      sx={{
        py: 1.5,
        ...typography.display2,
        '& .MuiTabs-flexContainer': {
          gap: '1rem'
        },
        [`& .${tabsClasses.scrollButtons}`]: {
          '&.Mui-disabled': { opacity: 0.3 }
        },
        ...sx
      }}
    >
      {tabList.map((tab, index) => (
        <Tab
          key={index}
          label={
            <Typography
              variant='body1'
              sx={{
                fontSize: '1rem',
                color: value === tab.name ? 'primary' : 'secondary.main',
                textTransform: 'capitalize'
              }}
            >
              {tab.name}
            </Typography>
          }
          value={tab.name}
        />
      ))}
    </Tabs>
  );
};

export default StyledTabs;
