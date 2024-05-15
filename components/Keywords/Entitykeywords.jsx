'use client';
import CustomRadio from '@/components/core/Radio';
import { useGetKeywords, useUpdateSecuritylevel } from '@/hooks/keywords';
import { pxToRem } from '@/utils/theme';
import {
  Box,
  CircularProgress,
  Skeleton,
  Stack,
  styled,
  Typography,
  useTheme
} from '@mui/material';
import { useState } from 'react';
import Button from '../core/Button';
import SearchInput from '../core/SearchInput';

const securityLevel = [
  {
    text: 'None',
    value: 0
  },
  {
    text: 'Low',
    value: 1
  },
  {
    text: 'Medium',
    value: 2
  },
  {
    text: 'High',
    value: 3
  }
];

export default function EntityKeywords() {
  const theme = useTheme();
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [search, setSearch] = useState('');

  const { data, isLoading } = useGetKeywords();
  const { mutate: updateLevel, isLoading: loading } = useUpdateSecuritylevel();

  const convertData = (data) => {
    if (!data?.keywords) return null;
    const result = data?.keywords?.reduce((acc, curr) => {
      if (!acc[curr.category]) {
        acc[curr.category] = curr;
      }
      return acc;
    }, {});
    return !!result[data?.security_level]
      ? result[data?.security_level]?.keywords?.filter((keyword) =>
          keyword.toString().toLowerCase().includes(search.toLowerCase())
        )
      : [];
  };

  const handleChange = (value) => {
    if (value === data?.security_level) return;
    setSelectedLevel(value);
    updateLevel({ security_level: value });
  };

  return (
    <Stack width={'100%'}>
      <Stack
        direction={'row'}
        width={'100%'}
        alignItems={'center'}
        justifyContent={'space-between'}
        gap={'1rem'}
      >
        <LeftSection>
          <Typography
            component={'h1'}
            variant='subHeading1'
            color={'text.primary'}
          >
            Entities
          </Typography>
          <SearchInput
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </LeftSection>
      </Stack>
      <TableWrapper mt={3}>
        <Typography variant='subHeading2' color='text.primary'>
          Choose your security level:
        </Typography>
        <LevelSection>
          {securityLevel.map(({ text, value }, index) => (
            <Button
              key={index}
              color={'secondary'}
              sx={{
                background: `${theme.palette.background.paper}20`,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                minWidth: '10rem',
                ...theme.typography.body1,
                [theme.breakpoints.down('lg')]: {
                  minWidth: '6.5rem'
                },

                [theme.breakpoints.down('sm')]: {
                  minWidth: '100%',
                  justifyContent: 'flex-start'
                }
              }}
              disabled={selectedLevel === value && loading}
              onClick={() => handleChange(value)}
            >
              <CustomRadio
                borderStyle={{
                  border: `${
                    value === data?.security_level ? '2px' : '1px'
                  } solid #fff`,
                  width: '1rem',
                  height: '1rem'
                }}
                checkedStyle={{
                  bgcolor:
                    value === data?.security_level
                      ? 'primary.main'
                      : 'transparent'
                }}
              />
              {text}
              {selectedLevel === value && loading && (
                <CircularProgress size={20} />
              )}
            </Button>
          ))}
        </LevelSection>
        <Stack>
          <Stack direction={'row'} flexWrap={'wrap'} gap={'1rem'} mt={'1rem'}>
            {convertData(data)?.map((text, index) => (
              <Button
                key={index}
                color={'secondary'}
                disableRipple
                sx={{
                  background: `${theme.palette.background.paper}20`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'text.primary'
                }}
              >
                {text}
              </Button>
            ))}
          </Stack>
          <Stack direction={'row'} flexWrap={'wrap'} gap={'1rem'} mt={'1rem'}>
            {isLoading &&
              new Array(4)
                .fill('')
                .map((text, index) => (
                  <Skeleton
                    key={index}
                    variant='rectangular'
                    width={'10rem'}
                    height={'2rem'}
                  />
                ))}
          </Stack>
        </Stack>
      </TableWrapper>
    </Stack>
  );
}

const TableWrapper = styled(Box)(({ theme }) => ({
  borderRadius: '16px',
  background: `${theme.palette.background.paper}20`,
  border: `1px solid ${theme.palette.divider}30`,
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  maxHeight: '75vh',
  overflow: 'auto',
  padding: pxToRem(20),
  gap: '1rem',
  marginTop: '2rem'
}));

const LevelSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '1rem',
  alignItems: 'center',
  [theme.breakpoints.down('lg')]: {
    gap: '1.5rem'
  },
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start'
  }
}));

const LeftSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '1rem',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%'
  }
}));

const InputSection = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  }
}));
