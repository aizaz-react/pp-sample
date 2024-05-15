import { getAvatarChar, getUserDetails } from '@/utils/globalFuntions';
import {
  Avatar,
  Box,
  Skeleton,
  Stack,
  Typography,
  styled,
  useMediaQuery,
  useTheme
} from '@mui/material';
import React from 'react';
import Button from '../core/Button';
import Image from 'next/image';
import { useGetCompany } from '@/hooks/company';
import { useRouter } from 'next/navigation';
import { useGetProfile } from '@/hooks/profile';
import Link from 'next/link';

const CompanyCard = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetCompany();
  const { data: userData } = useGetProfile();

  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const router = useRouter();

  const user = getUserDetails();

  if (isLoading)
    return (
      <Card bordertype={!!data?.company_is_active ? 'solid' : 'dashed'}>
        <Skeleton variant='circular' width={80} height={80} />
        <Stack alignItems={'center'}>
          <Skeleton variant='text' width={100} height={30} />
          <Skeleton variant='text' width={120} height={45} />
        </Stack>
        <Skeleton variant='text' width={100} height={65} />

        <Stack direction={'row'} gap={'11px'} width={'100%'}>
          <Skeleton variant='rounded' width={'100%'} height={45} />
          <Skeleton variant='rounded' width={'100%'} height={45} />
        </Stack>
      </Card>
    );

  if (!user?.schema_context)
    return (
      <Card
        bordertype={'dashed'}
        sx={{ justifyContent: 'center', gap: '2rem', cursor: 'pointer' }}
      >
        <Box
          component={'img'}
          sx={{ width: '100px' }}
          src={'/icons/Add.svg'}
          alt={'add company'}
        />
        <Typography
          component={'p'}
          variant='subHeading2'
          color={'text.primary'}
        >
          Add Company
        </Typography>
      </Card>
    );

  return (
    <Card bordertype={!!data?.company_is_active ? 'solid' : 'dashed'}>
      <Avatar
        src={data?.company_logo}
        sx={{ width: 80, height: 80, fontSize: '2.2rem' }}
      >
        {getAvatarChar(data?.company_name) || 'P'}
      </Avatar>
      <Stack textAlign={'center'}>
        <Typography
          component={'p'}
          variant='subHeading2'
          color={'text.primary'}
        >
          {data?.company_name || userData?.profile?.full_name}
        </Typography>
      </Stack>
      <Typography component={'p'} variant='subHeading1' color={'primary.main'}>
        {data?.is_manager ? 'Manager' : 'User'}
      </Typography>
      <Stack direction={'row'} gap={'11px'} width={'100%'}>
        {matches && data?.is_manager && (
          <Link
            href={
              data?.is_manager && data?.company_type === 2
                ? '/dashboard/users'
                : '/dashboard/keywords'
            }
            className='d-flex text-decoration-none w-100'
          >
            <Button
              fullWidth
              variant={'contained'}
              sx={{
                borderRadius: '6px',
                fontSize: theme.typography.caption1,
                display: 'flex',
                gap: '.5rem',
                alignItems: 'center'
              }}
            >
              <Typography component={'span'}>
                {data?.is_manager && data?.company_type === 2
                  ? 'User Panel'
                  : 'Manage'}
              </Typography>
            </Button>
          </Link>
        )}
        <Link href='/chat' style={{ textDecoration: 'none', width: '100%' }}>
          <Button
            fullWidth
            variant={'outlined'}
            color={'secondary'}
            sx={{
              borderRadius: '6px',
              fontSize: theme.typography.caption1,
              display: 'flex',
              gap: '.5rem',
              alignItems: 'center'
            }}
          >
            <Image
              width={10}
              height={10}
              src={'/icons/chat.svg'}
              alt={'add company'}
            />
            <Typography component={'span'}>Chat</Typography>
          </Button>
        </Link>
      </Stack>
    </Card>
  );
};

export default CompanyCard;

const Card = styled(Box)(({ theme, bordertype }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '20px 10px 10px',
  height: '320px',
  minWidth: '270px',
  background: 'linear-gradient(299.99deg, #275D71 -162.66%, #041218 93.6%)',
  border: `2px ${bordertype} ${theme.palette.background.paper}`,
  borderRadius: '15px',
  '&:hover': {
    border: `2px solid ${theme.palette.background.paper}`,
    color: theme.palette.primary.main
  },
  [theme.breakpoints.down('sm')]: {
    width: 'auto'
  }
}));
