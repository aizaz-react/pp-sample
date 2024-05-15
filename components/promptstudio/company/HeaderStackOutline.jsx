import React from 'react'
import BackButton from '@/assets/CustomIcons/BackButton';
import {
    Box,
    Divider,
    Stack,
    styled,
    TextareaAutosize,
    Typography,
    useTheme, IconButton, Avatar, CircularProgress
} from '@mui/material';

const HeaderStackOutline = (props) => {
    const { isEditMode, handleGoBack} = props;

  return (
    <HeaderStack>
    <RowStack>
        <ImageContainer sx={{ borderRadius: '8px', background: '#0E2833' }} onClick={handleGoBack}>
            <BackButton />
        </ImageContainer>
        {isEditMode ? (<>
            <Typography variant='subHeading2'>Edit Prompt </Typography>
        </>) : (<>
            <Typography variant='subHeading2'> Add Prompt </Typography>
        </>)}
    </RowStack>

    <Typography variant="heading1" marginTop='1rem'> General </Typography>
    <Typography variant='body1'> Please include general information within the Prompt Studio.  </Typography>
</HeaderStack>

  )
}

export default HeaderStackOutline

const HeaderStack = styled(Stack)(({ theme }) => ({
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: '1rem',
    marginBottom: '1rem'
}));

const ImageContainer = styled(IconButton)(({ theme }) => ({
    borderRadius: '50%',
    height: '36px',
    width: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const RowStack = styled(Stack)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: '1rem'
}));