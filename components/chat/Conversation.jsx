import DeleteChatIcon from '@/assets/CustomIcons/DeleteChatIcon';
import EditIcon from '@/assets/CustomIcons/EditIcon';
import { useDeleteConversation, useUpdateConversation } from '@/hooks/chat';
import { pxToRem } from '@/utils/theme';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import {
  Box,
  InputBase,
  Stack,
  styled,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Conversation = ({
  create_ts,
  id,
  title,
  setMobileOpen,
  current,
  product
}) => {
  const [editedId, setEditedId] = useState('');
  const [deletedId, setDeletedId] = useState('');
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const isMobileScreen = useMediaQuery('(max-width:786px)');

  const resetState = () => {
    setEditedId('');
  };
  const { mutate: deleteConversation } = useDeleteConversation(resetState);
  const { mutate } = useUpdateConversation(resetState);

  const formik = useFormik({
    initialValues: {
      title,
      conv_id: id
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      mutate(values);
    }
  });

  const handleSelectEdit = () => {
    setEditedId(id);
    setDeletedId('');
  };

  const handleSelectDelete = () => {
    setEditedId('');
    setDeletedId(id);
  };

  useEffect(() => {
    if (editedId) {
      const input = document.getElementById(id);
      input.focus();
    }
  }, [editedId, id]);
  const handleCloseDrawer = () => {
    if (isMobileScreen) setMobileOpen(false);
    return;
  };

  return (
    <>
      <Stack
        direction={'row'}
        key={id}
        alignItems={'center'}
        sx={{
          py: '1rem',
          px: '0.75rem',
          bgcolor: id === current && 'background.defaultLight',
          height: pxToRem(45),
          borderTop: '1px solid #BFBFBF20',
          '&:hover': {
            backgroundColor: 'background.defaultLight',
            transition: '0.2s ease-in-out'
          },
          '&:hover #edit-chat': {
            opacity: 1
          }
        }}
      >
        <Box sx={{ flex: 1 }}>
          {editedId === id ? (
            <InputBase
              name={'title'}
              id={id}
              value={formik.values.title}
              onChange={formik.handleChange}
              sx={{ fontSize: '1rem' }}
            />
          ) : (
            <Link
              href={`/chat/${id}`}
              className='text-decoration-none'
              onClick={handleCloseDrawer}
            >
              <Title
                sx={{
                  cursor: 'pointer',
                  textDecoration: 'none',
                  color: 'text.primary',
                  maxWidth: '165px'
                }}
                noWrap
                title={title}
              >
                {title}
              </Title>
            </Link>
          )}
        </Box>
        <Stack direction='row' gap='10px'>
          <Stack
            display={deletedId ? 'none' : 'flex'}
            direction={'row'}
            gap={'1rem'}
            alignItems={'center'}
          >
            {editedId === id ? (
              <Stack
                direction={'row'}
                gap={'1rem'}
                alignItems={'center'}
                id='edit-chat'
                sx={{
                  opacity: matches ? 1 : 0
                }}
              >
                <IconWrapper
                  component={'button'}
                  disabled={!formik.dirty}
                  onClick={formik.handleSubmit}
                >
                  <DoneOutlinedIcon
                    sx={{ color: 'secondary.main', fontSize: '1.1rem' }}
                  />
                </IconWrapper>
                <IconWrapper
                  component={'button'}
                  onClick={() => setEditedId('')}
                >
                  <ClearOutlinedIcon
                    sx={{ color: 'secondary.main', fontSize: '1.1rem' }}
                  />
                </IconWrapper>
              </Stack>
            ) : (
              <IconWrapper
                onClick={handleSelectEdit}
                id='edit-chat'
                sx={{
                  opacity: matches ? 1 : 0
                }}
              >
                <EditIcon />
              </IconWrapper>
            )}
          </Stack>

          <Stack
            direction={'row'}
            gap={'1rem'}
            alignItems={'center'}
            display={editedId ? 'none' : 'flex'}
          >
            {deletedId === id ? (
              <Stack
                direction={'row'}
                gap={'1rem'}
                alignItems={'center'}
                id='edit-chat'
                sx={{
                  opacity: matches ? 1 : 0
                }}
              >
                <IconWrapper
                  component={'button'}
                  onClick={() => deleteConversation({ id })}
                >
                  <DoneOutlinedIcon
                    sx={{ color: 'secondary.main', fontSize: '1.1rem' }}
                  />
                </IconWrapper>
                <IconWrapper
                  component={'button'}
                  onClick={() => setDeletedId('')}
                >
                  <ClearOutlinedIcon
                    sx={{ color: 'secondary.main', fontSize: '1.1rem' }}
                  />
                </IconWrapper>
              </Stack>
            ) : (
              <IconWrapper
                onClick={handleSelectDelete}
                id='edit-chat'
                sx={{
                  opacity: matches ? 1 : 0
                }}
              >
                <DeleteChatIcon />
              </IconWrapper>
            )}
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default Conversation;
const Title = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    maxWidth: '155px'
  },
  [theme.breakpoints.down('md')]: {
    maxWidth: '150px'
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100px'
  }
}));
const IconWrapper = styled(Box)(({ theme }) => ({
  cursor: 'pointer',
  border: 'none',
  background: 'transparent'
}));
