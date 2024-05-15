import ChatImageFallBack from '@/assets/CustomIcons/ChatImageFallBack';
import CopyIcon from '@/assets/CustomIcons/CopyIcon';
import DownloadLogo from '@/assets/CustomIcons/DownloadLogo';
import PLogo from '@/assets/CustomIcons/PLogo';
import { getAvatarChar, getModelRole } from '@/utils/globalFuntions';
import { pxToRem } from '@/utils/theme';
import {
  Avatar,
  Box,
  Container,
  IconButton,
  Stack,
  styled,
  Typography,
  useTheme
} from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { memo } from 'react';
import { toast } from 'react-toastify';
import Button from '../core/Button';
import LoadingPage from '../loading';
import MessageFormat from './MessageFormat';

const errorStr =
  'Your prompt contains sensitive data and is not permitted by your organizations data privacy policy.  Please modify your prompt to remove all sensitive elements.';

const Message = (props) => {
  const {
    type,
    text,
    inValid,
    onContinue,
    onEdit,
    id,
    item,
    index,
    slug,
    inferenceTime
  } = props;

  const theme = useTheme();
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(['profile']);
  const handleContinue = () => {
    if (!id) return onContinue(item.post_challange);
    const prevData = queryClient.getQueryData(['conversation', id]);
    const previousData = JSON.parse(JSON.stringify(prevData));
    const { conversation } = previousData;
    const { prompts } = conversation[id].nodes.at(-1);
    const previousList = [...conversation[id].nodes];
    previousList.splice(-1);
    queryClient.setQueryData(['conversation', id], (old) => ({
      ...previousData,
      conversation: {
        ...previousData.conversation,
        [id]: {
          ...previousData.conversation[id],
          nodes: [...previousList]
        }
      }
    }));

    const [last] = prompts.slice(-1);

    const payload = [prompts[0], last];
    onContinue(payload);
  };

  const handleEdit = () => {
    if (!id) return onEdit(item.post_challange);
    const prevData = queryClient.getQueryData(['conversation', id]);
    const previousData = JSON.parse(JSON.stringify(prevData));
    const { conversation } = previousData;
    const { prompts } = conversation[id].nodes.at(-1);
    const previousList = [...conversation[id].nodes];
    previousList.splice(-1);
    queryClient.setQueryData(['conversation', id], (old) => ({
      ...previousData,
      conversation: {
        ...previousData.conversation,
        [id]: {
          ...previousData.conversation[id],
          nodes: [...previousList]
        }
      }
    }));
    onEdit([prompts[0], ...prompts.slice(-1)]);
  };

  const download = (image) => {
    var a = document.createElement('a'); //Create <a>
    a.href = 'data:image/png;base64,' + image; //Image Base64 Goes here
    a.download = 'Image.png'; //File name Here
    a.click(); //Downloaded file
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast.info('Copied to clipboard');
  };
  const styleProps = {
    color: 'background.paper',
    visibility: getModelRole(type) ? 'visible' : 'hidden',
    alignSelf: 'flex-start'
  };
  const Borders = {
    padding: '1rem 0rem',
    border: `1px solid ${theme.palette.divider + 20}`
    // borderBottom: `1px solid ${theme.palette.divider + 20}`
  };

  return (
    <Stack flex={1}>
      <Box>
        {text !== errorStr && text === 'loading' ? (
          <LoadingPage />
        ) : (
          <MessageContainer
            maxWidth={'lg'}
            type={type}
            sx={getModelRole(type) ? Borders : {}}
          >
            <Stack
              direction={'row'}
              sx={{
                gap: pxToRem(20),
                [theme.breakpoints.down('sm')]: {
                  gap: '1rem'
                }
              }}
              width='100%'
            >
              <Box sx={{ alignSelf: 'flex-start' }}>
                {text === errorStr || getModelRole(type) ? (
                  <LogoBox>
                    <PLogo width={pxToRem(27)} height={pxToRem(27)} />
                  </LogoBox>
                ) : (
                  <Avatar
                    alt={data?.profile?.full_name}
                    src={data?.profile?.profile_picture}
                    sx={{
                      width: pxToRem(35),
                      height: pxToRem(35),
                      fontSize: pxToRem(16)
                    }}
                  >
                    {getAvatarChar(data?.profile?.full_name)}
                  </Avatar>
                )}
              </Box>
              <Box
                display={'flex'}
                width={'90%'}
                alignItems={'center'}
                flex={1}
                justifyContent={'space-between'}
                gap={'1rem'}
                sx={{
                  [theme.breakpoints.down('sm')]: {
                    width: '80%'
                  }
                }}
              >
                <>
                  {(slug === 'sdxl' || slug === 'dalle') &&
                  text !== errorStr ? (
                    <>
                      <Image
                        src={'data:image/png;base64, ' + text}
                        variant='square'
                        alt={'prompt image'}
                        sx={{
                          width: '100%',
                          height: '100%',
                          [theme.breakpoints.down('sm')]: {
                            maxWidth: '80%'
                          }
                        }}
                      >
                        <ChatImageFallBack />
                      </Image>
                    </>
                  ) : getModelRole(type) ? (
                    <>
                      <MessageFormat string={text} id={index} />
                    </>
                  ) : (
                    <>
                      <Typography
                        sx={{
                          wordBreak: 'break-word',
                          lineHeight: 1.5,
                          color: '#D1D5DE'
                        }}
                      >
                        {text}
                      </Typography>
                    </>
                  )}
                </>
                {(slug === 'sdxl' || slug === 'dalle') && text !== errorStr ? (
                  <IconButton sx={styleProps} onClick={() => download(text)}>
                    <DownloadLogo width={'1rem'} height={'1rem'} />
                  </IconButton>
                ) : (
                  <Box
                    sx={{
                      wordBreak: 'break-word',
                      lineHeight: 1.5,
                      color: '#DDE1EB',
                      alignSelf: 'flex-start'
                    }}
                  >
                    <IconButton sx={styleProps} onClick={() => copyText(text)}>
                      <CopyIcon />
                    </IconButton>
                  </Box>
                )}
              </Box>
            </Stack>
            {inferenceTime && (
              <InferenceTime>Executed in {inferenceTime}s</InferenceTime>
            )}
            <Stack
              display={!!inValid ? 'flex' : 'none'}
              direction={'row'}
              justifyContent={'center'}
              mt={2}
              gap={pxToRem(12)}
            >
              <Button
                color={'secondary'}
                variant={'contained'}
                sx={{
                  borderRadius: '5px',
                  padding: '0 1.5rem',
                  bgcolor: `${theme.palette.background.paper}` + 30,
                  fontSize: pxToRem(16)
                }}
                onClick={handleContinue}
              >
                Continue
              </Button>
              <Button
                color={'secondary'}
                variant={'outlined'}
                sx={{
                  borderRadius: '5px',
                  fontSize: pxToRem(16),
                  color: 'text.primary'
                }}
                onClick={handleEdit}
              >
                Edit
              </Button>
            </Stack>
            {!!inValid && <Stack height={'70px'}></Stack>}
          </MessageContainer>
        )}
      </Box>
    </Stack>
  );
};

Message.displayName = 'Message';

export default memo(Message);

const MessageContainer = styled(Container)(({ theme, type }) => ({
  padding: '1rem !important',
  borderRadius: '16px',
  background: getModelRole(type)
    ? ' linear-gradient(180deg, rgba(39, 93, 113, 0.10) 0%, rgba(39, 93, 113, 0.10) 100%)'
    : '',
  [theme.breakpoints.down('sm')]: {
    padding: '1rem 0.5rem !important'
  }
}));

const Image = styled(Avatar)(({ theme }) => ({
  maxWidth: '400px',
  background: 'transparent',
  '& img': {
    borderRadius: '16px'
  },
  objectFit: 'cover',
  paddingBlock: '1rem'
}));
const LogoBox = styled(Box)(({ theme }) => ({
  width: '35px',
  height: '35px',
  placeContent: 'center',
  display: 'grid',
  [theme.breakpoints.down('sm')]: {
    width: '26.25px',
    height: '26.25px'
  }
}));
const InferenceTime = styled(Typography)(({ theme }) => ({
  fontSize: '12px',
  fontStyle: 'italic',
  textAlign: 'right',
  color: theme.palette.text.secondary,
  lineHeight: '15px',
  [theme.breakpoints.down(475)]: {
    fontSize: '10px'
  }
}));
