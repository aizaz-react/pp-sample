import React, { useState } from 'react';
import OutlinedInput, { HelperText } from '@/components/core/OutlinedInput';
import CustomSelect from '@/components/core/CustomSelect';
import { getAvatarChar, getFileUrl } from '@/utils/globalFuntions';
import {
  Box,
  Divider,
  Stack,
  styled,
  TextareaAutosize,
  Typography,
  useTheme,
  IconButton,
  Avatar,
  CircularProgress
} from '@mui/material';
import AddCategoryIcon from '@/assets/CustomIcons/AddCategoryIcon';
import CategoryModal from '@/components/core/modals/CategoryModal';

const UploadStackBox = (props) => {
  const {
    logo,
    fileUploadOnChange,
    title,
    handleChange,
    touchedTitle,
    errorTitle,

    vault,
    touchedVault,
    errorVault,

    description,
    touchedDescription,
    errorDescription,

    data,

    products,
    handleChangeChoice,
    touchedProducts,
    errorProducts,

    categories,
    category,
    touchedCategory,
    errorCategory
  } = props;

  const theme = useTheme();
  const [openCategory, setOpenCategory] = useState(false);
  const inputs = [
    {
      label: 'Title',
      value: title,
      error: touchedTitle && !!errorTitle,
      helperText: touchedTitle && errorTitle,
      required: true
    },
    {
      label: 'Vault',
      value: vault,
      error: touchedVault && !!errorVault,
      helperText: touchedVault && errorVault,
      required: false
    }
  ];
  return (
    <>
      {/* Upload Stack  */}
      <UploadStack className='UploadStack'>
        <RowStack>
          <ImageSection>
            <StyledAvatar
              variant='rounded'
              src={!!logo ? getFileUrl(logo) : ''}
              alt={'P'}
            >
              {getAvatarChar(title) || (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='19'
                  height='25'
                  viewBox='0 0 19 25'
                  fill='none'
                >
                  <path
                    d='M9.5 0C6.225 0 3.5625 2.6625 3.5625 5.9375C3.5625 9.15 6.075 11.75 9.35 11.8625C9.45 11.85 9.55 11.85 9.625 11.8625H9.7125C11.2492 11.8112 12.7057 11.1643 13.7741 10.0586C14.8425 8.95292 15.439 7.47505 15.4375 5.9375C15.4375 2.6625 12.775 0 9.5 0Z'
                    fill='white'
                  />
                  <path
                    d='M15.85 15.1871C12.3625 12.8621 6.67501 12.8621 3.16251 15.1871C1.57501 16.2496 0.700012 17.6871 0.700012 19.2246C0.700012 20.7621 1.57501 22.1871 3.15001 23.2371C4.90001 24.4121 7.20001 24.9996 9.50001 24.9996C11.8 24.9996 14.1 24.4121 15.85 23.2371C17.425 22.1746 18.3 20.7496 18.3 19.1996C18.2875 17.6621 17.425 16.2371 15.85 15.1871Z'
                    fill='white'
                  />
                </svg>
              )}
            </StyledAvatar>
            <Typography
              variant='body1'
              component={'label'}
              htmlFor='file-input'
              color='secondary.main'
              sx={{
                textDecoration: 'underline',
                textDecorationThickness: '1px',
                cursor: 'pointer'
              }}
            >
              Upload icon file
            </Typography>

            <input
              type='file'
              id='file-input'
              hidden
              accept='image/png, image/jpeg'
              onChange={(e) => fileUploadOnChange(e)}
            />
          </ImageSection>
        </RowStack>
        {inputs.map((input, index) => (
          <Box
            key={index}
            sx={{
              width: '100%',
              maxWidth: '601px',
              [theme.breakpoints.down('md')]: {
                width: '100%',
                minWidth: '100%',
                maxWidth: 'unset'
              }
            }}
          >
            <OutlinedInput
              isAbsolute
              required={input.required}
              label={input.label}
              placeholder={input.label}
              name={input.label.toLowerCase()}
              value={input.value}
              onChange={handleChange}
              error={input.error}
              helperText={input.helperText}
              inputStyle={{
                '&.MuiInputBase-root': {
                  border: '0.5px solid #BFBFBF' // Set your custom color here
                },
                '&.MuiInputBase-root:focus-within': {
                  border: `0.5px solid #BFBFBF` // Set your custom focus color here
                }
              }}
            />
          </Box>
        ))}

        <Stack
          gap='8px'
          className='DescriptionBox'
          sx={{
            width: '100%',
            maxWidth: '601px',
            borderRadius: '4px',
            [theme.breakpoints.down('md')]: {
              maxWidth: '100%',
              minWidth: '100%'
            }
          }}
        >
          <Typography variant='body1'>Description</Typography>
          <TextArea
            className='DesctiptionTextBox'
            aria-label='empty textarea'
            placeholder='Enter a prompt description here'
            minRows={5}
            maxRows={5}
            sx={{
              overflowY: 'auto',
              width: '600px',
              border: '0.5px solid #BFBFBF',
              borderRadius: '4px',
              [theme.breakpoints.down('md')]: {
                maxWidth: '100%',
                minWidth: '100%'
              }
            }}
            name='description'
            label='Description'
            value={description}
            onChange={handleChange}
            error={touchedDescription && Boolean(errorDescription)}
          />
          <HelperText
            isAbsolute
            helperText={touchedDescription && errorDescription}
          />
        </Stack>

        <RowStack
          className='RowStack'
          flexWrap={'wrap'}
          sx={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'flex-start',
            gap: '2rem',
            width: '100%'
          }}
        >
          <SelectWrapper className='SelectWrapperOne'>
            <Typography variant='body1'>
              Model&nbsp;
              <Typography component={'span'} color={'primary.main'}>
                *
              </Typography>
            </Typography>
            <CustomSelect
              list={
                !!data?.result?.length
                  ? data?.result?.map((product) => ({
                      name: product.title,
                      value: product.id
                    }))
                  : []
              }
              value={products}
              onChange={handleChangeChoice('products')}
              width={'100%'}
              border={theme.palette.divider}
              multiple
              sx={{
                border: '0.5px solid #BFBFBF',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderWidth: '1px !important',
                  borderColor: '#BFBFBF !important'
                },

                '& .Mui-focused .Mui-disabled .MuiOutlinedInput-notchedOutline':
                  {
                    borderColor: '#BFBFBF !important'
                  },
                '& .MuiSvgIcon-root ': {
                  fill: 'white !important'
                }
              }}
            />
            <HelperText helperText={touchedProducts && errorProducts} />
          </SelectWrapper>
          <SelectWrapper className='SelectWrapperTwo'>
            <Box
              className='AddCategoryTextStack'
              display={'flex'}
              alignItems={'flex-start'}
              justifyContent={'space-between'}
            >
              <Typography variant='body1'>
                Select Category&nbsp;
                <Typography component={'span'} color={'primary.main'}>
                  *
                </Typography>
              </Typography>
              <IconButton
                sx={{ padding: '0px' }}
                onClick={() => setOpenCategory(true)}
              >
                <AddCategoryIcon />
              </IconButton>
            </Box>
            <CustomSelect
              list={
                categories?.results?.map((item) => ({
                  name: item.title,
                  value: item.id
                })) || []
              }
              name={'category'}
              value={category}
              onChange={handleChangeChoice('category')}
              width={'100%'}
              border={theme.palette.divider}
              sx={{
                border: '0.5px solid #BFBFBF',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderWidth: '1px !important',
                  borderColor: '#BFBFBF !important'
                },

                '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#BFBFBF !important'
                }
              }}
            />
            <HelperText helperText={touchedCategory && errorCategory} />
          </SelectWrapper>
        </RowStack>
      </UploadStack>

      <CategoryModal
        open={openCategory}
        handleClose={() => setOpenCategory(false)}
      />
    </>
  );
};

export default UploadStackBox;

const UploadStack = styled(Stack)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: '2rem',
  paddingBottom: '60px',
  paddingTop: '2rem'
}));

const RowStack = styled(Stack)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
  gap: '1rem'
}));

const ImageSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '1rem',
  alignItems: 'flex-end',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start'
  }
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: '#275D71',
  height: '45px',
  width: '45px',
  ...theme.typography.heading1
}));

const TextArea = styled(TextareaAutosize)(({ theme }) => ({
  fontFamily: theme.typography.body1.fontFamily,
  width: '320px',
  maxWidth: '100%',
  minWidth: '100%',
  maxHeight: '240px',
  fontSize: '0.875rem',
  fontWeight: '400',
  lineHeight: '1.5',
  padding: '12px',
  borderRadius: '12px 12px 0 12px',
  color: '#afb8c1',
  background: '#275D7133',
  border: '1px solid #424a53',
  resize: 'none',
  // firefox
  '&:focus-visible': {
    outline: '0'
  }
}));

const SelectWrapper = styled(Stack)(({ theme }) => ({
  width: '200px',
  gap: '.5rem',
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  }
}));
