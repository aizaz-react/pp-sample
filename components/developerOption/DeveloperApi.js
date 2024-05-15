'use client';
import { CustomSwitch } from '@/components/styled/core';
import {
  Box,
  CircularProgress,
  Container,
  Skeleton,
  Stack,
  Typography,
  styled,
  useTheme
} from '@mui/material';
import Button from '../core/Button';
import ApiKeyModal from '../core/modals/ApiKeyModal';
import { useCallback, useState } from 'react';
import {
  useActivateDeveloperOption,
  useDeleteDeveloperOption,
  useGetMyDeveloperOption,
  useRegenerateApi
} from '@/hooks/developerOption';
import Link from 'next/link';
import { pxToRem } from '@/utils/theme';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import DeleteModal from '../core/modals/DeleteModal';
import NoKeyIcon from '@/assets/CustomIcons/NoKeyIcon';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import EyeOffIcon from '@/assets/CustomIcons/EyeOffIcon';
import CopyWhiteIcon from '@/assets/CustomIcons/CopyWhiteIcon';
import { Visibility } from '@mui/icons-material';
import { getUserDetails } from '@/utils/globalFuntions';

export default function DeveloperKey() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedTenantId, setCopiedTenantId] = useState(false);
  const [show, setShow] = useState(false);
  const [showTenantId, setShowTenantId] = useState(false);

  const user = getUserDetails();

  const { mutate: updateDeveloperOption, isLoading: updateLoading } =
    useActivateDeveloperOption();

  const toggleShow = () => setShow((prev) => !prev);
  const toggleShowTenantId = () => setShowTenantId((prev) => !prev);

  const { data, isLoading } = useGetMyDeveloperOption();
  const { mutate: regenerate, isLoading: regenLoading } = useRegenerateApi();

  const handleCloseDelete = useCallback(() => {
    setOpenDelete(false);
  }, []);

  const { mutate: deleteApi, isLoading: deleteLoading } =
    useDeleteDeveloperOption(handleCloseDelete);

  const handleCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(data?.api_key);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const handleCopyTenantId = () => {
    setCopiedTenantId(true);
    navigator.clipboard.writeText(user?.tenant_id);
    setTimeout(() => {
      setCopiedTenantId(false);
    }, 1000);
  };

  const handleOpen = () => setOpen(true);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleDelete = () => {
    deleteApi();
  };

  return (
    <Stack gap='2rem'>
      <Toolbar>
        <LeftToolbar>
          <Typography
            component={'h1'}
            variant='subHeading1'
            color={'text.primary'}
          >
            Developer Options
          </Typography>
          <InputWrapper>
            <CustomSwitch
              sx={{ m: 1 }}
              checked={!!data?.is_developer && !!data?.api_status}
              onChange={() => updateDeveloperOption()}
              disabled={updateLoading || !data?.api_status}
            />

            <Stack direction={'row'} gap={'1rem'}>
              <Typography
                variant='caption1'
                component={'p'}
                textTransform={'uppercase'}
                color={!!data?.is_developer ? 'primary' : 'secondary'}
              >
                {!!data?.is_developer && !!data?.api_status
                  ? 'Enabled'
                  : 'Disabled'}
              </Typography>

              {updateLoading && <CircularProgress size={20} />}
            </Stack>
          </InputWrapper>
        </LeftToolbar>
        {!data?.api_key ? (
          <ButtonWrapper direction={'row'} justifyContent={'flex-end'}>
            <Button
              variant={'contained'}
              sx={{ padding: '.4rem 1rem' }}
              onClick={handleOpen}
              disabled={
                !data?.is_developer || updateLoading || !data?.api_status
              }
            >
              <Typography variant='body2' component={'span'}>
                Create API Key
              </Typography>
            </Button>
          </ButtonWrapper>
        ) : (
          <Link href={'/dashboard/developer-option/docs'} legacyBehavior>
            <Typography
              component={'a'}
              variant='body1'
              className='pointer'
              color={'primary'}
            >
              See Docs
            </Typography>
          </Link>
        )}
      </Toolbar>
      {isLoading ? (
        <ApiKeyWrapper>
          <ApiKeySection maxWidth={'md'}>
            <Skeleton
              variant='rounded'
              width={pxToRem(180)}
              height={pxToRem(30)}
            />
            <Skeleton variant='rounded' width={'100%'} height={pxToRem(45)} />
            <Stack
              direction={'row'}
              gap={'1rem'}
              width={'100%'}
              justifyContent={'flex-start'}
            >
              <Skeleton
                variant='rounded'
                width={'10rem'}
                height={pxToRem(30)}
                sx={{ borderRadius: '20px' }}
              />
              <Skeleton
                variant='rounded'
                width={'10rem'}
                height={pxToRem(30)}
                sx={{ borderRadius: '20px' }}
              />
            </Stack>
          </ApiKeySection>
        </ApiKeyWrapper>
      ) : data?.api_key ? (
        <ApiKeyWrapper>
          <ApiKeySection maxWidth={'md'}>
            <ApiKeyName>{data?.api_name}</ApiKeyName>

            <Stack width={'100%'} gap={'0.4rem'}>
              <Typography variant='body1'>Api Key:</Typography>
              <ApiKeyBox sx={{ flex: 1 }}>
                {show ? (
                  <Typography noWrap>{data?.api_key}</Typography>
                ) : (
                  <ApiKeyValue>
                    {new Array(35).fill('').map((_, index) => (
                      <AcUnitIcon key={index} sx={{ fontSize: '0.5rem' }} />
                    ))}
                  </ApiKeyValue>
                )}
                <Stack direction={'row'} gap={'.2rem'}>
                  <IconWrapper
                    component={'button'}
                    disabled={!data?.is_developer || !data?.api_status}
                    onClick={toggleShow}
                  >
                    {show ? (
                      <Visibility
                        sx={{ fontSize: '1.1rem', color: 'text.primary' }}
                      />
                    ) : (
                      <EyeOffIcon color={!data?.is_developer && '#D9D9D9'} />
                    )}
                  </IconWrapper>
                  <IconWrapper
                    component={'button'}
                    disabled={!data?.is_developer || !data?.api_status}
                    onClick={handleCopy}
                  >
                    {copied ? (
                      <TaskAltIcon
                        sx={{ fontSize: '1.15rem', color: 'text.primary' }}
                      />
                    ) : (
                      <CopyWhiteIcon color={!data?.is_developer && '#D9D9D9'} />
                    )}
                  </IconWrapper>
                </Stack>
              </ApiKeyBox>
            </Stack>
            <Stack width={'100%'} gap={'0.4rem'}>
              <Typography variant='body1'>Tenant Id:</Typography>
              <ApiKeyBox sx={{ flex: 1 }}>
                {showTenantId ? (
                  <Typography noWrap>{user?.tenant_id}</Typography>
                ) : (
                  <ApiKeyValue>
                    {new Array(35).fill('').map((_, index) => (
                      <AcUnitIcon key={index} sx={{ fontSize: '0.5rem' }} />
                    ))}
                  </ApiKeyValue>
                )}
                <Stack direction={'row'} gap={'.2rem'}>
                  <IconWrapper
                    component={'button'}
                    disabled={!data?.is_developer || !data?.api_status}
                    onClick={toggleShowTenantId}
                  >
                    {showTenantId ? (
                      <Visibility
                        sx={{ fontSize: '1.1rem', color: 'text.primary' }}
                      />
                    ) : (
                      <EyeOffIcon color={!data?.is_developer && '#D9D9D9'} />
                    )}
                  </IconWrapper>
                  <IconWrapper
                    component={'button'}
                    disabled={!data?.is_developer || !data?.api_status}
                    onClick={handleCopyTenantId}
                  >
                    {copiedTenantId ? (
                      <TaskAltIcon
                        sx={{ fontSize: '1.15rem', color: 'text.primary' }}
                      />
                    ) : (
                      <CopyWhiteIcon color={!data?.is_developer && '#D9D9D9'} />
                    )}
                  </IconWrapper>
                </Stack>
              </ApiKeyBox>
            </Stack>
            <Stack direction={'row'} gap={'1rem'}>
              {data?.api_key && (
                <Button
                  sx={{
                    padding: '.5rem 1.5rem',
                    bgcolor: theme.palette.background.paper + '30'
                  }}
                  variant={'contained'}
                  color='secondary'
                  onClick={() => setOpenDelete(true)}
                  disabled={!data?.is_developer || !data?.api_status}
                >
                  <Typography variant='body1'>Delete</Typography>
                </Button>
              )}
              <Button
                sx={{ padding: '.3rem 0', borderRadius: '50px', width: '7rem' }}
                variant='contained'
                onClick={regenerate}
                loading={regenLoading}
                loadingSize={16}
                disabled={!data?.is_developer || !data?.api_status}
              >
                <Typography component={'span'} variant='body1'>
                  Regenerate
                </Typography>
              </Button>
            </Stack>
          </ApiKeySection>
        </ApiKeyWrapper>
      ) : (
        <ApiKeyWrapper
          sx={{
            minHeight: '70vh',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <NoKeyIcon />
          <Typography variant={'body1'}>API key not found</Typography>
        </ApiKeyWrapper>
      )}
      <ApiKeyModal open={open} handleClose={handleClose} selected={null} />
      <DeleteModal
        open={openDelete}
        handleClose={handleCloseDelete}
        title={'Delete Api Key'}
        message={'Are you sure you want to delete Api Key?'}
        confirm={handleDelete}
        loading={deleteLoading}
      />
    </Stack>
  );
}

const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: '0.5rem',
  border: 'none',
  background: 'none',
  '&:hover': {
    borderRadius: '5px',
    backgroundColor: theme.palette.divider + '10',
    padding: '.5rem'
  }
}));

const ApiKeySection = styled(Container)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '1rem'
}));

const ApiKeyBox = styled(Box)(({ theme }) => ({
  width: '100%',
  border: '1px solid ' + theme.palette.secondary.main,
  userSelect: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderRadius: '5px',
  padding: '.5rem'
}));

const ApiKeyName = styled(Typography)(({ theme }) => ({
  ...theme.typography.heading3
}));

const ApiKeyValue = styled(Typography)(({ theme }) => ({
  fontSize: '30px',
  userSelect: 'none',
  display: 'flex',
  overflow: 'hidden'
}));

const ApiKeyWrapper = styled(Box)(({ theme }) => ({
  borderRadius: '16px',
  border: `1px solid ${theme.palette.divider}30`,
  padding: pxToRem(40),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1rem',
  minHeight: '70vh',
  [theme.breakpoints.down('lg')]: {
    padding: pxToRem(16)
  }
}));

const Toolbar = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    paddingRight: '0.5rem'
  }
}));

const LeftToolbar = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  flex: 1,
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    '& p': {
      flex: 1
    }
  }
}));

const InputWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flex: 0,
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    '& p': {
      display: 'none'
    }
  }
}));

const ButtonWrapper = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  }
}));
