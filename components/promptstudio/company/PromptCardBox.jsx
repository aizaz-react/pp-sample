import DeleteIcon from '@/assets/CustomIcons/DeleteIcon';
import EditIcon from '@/assets/CustomIcons/EditIcon';
import CustomSelect from '@/components/core/CustomSelect';
import ActionButton from '@/components/core/buttons/ActionButton';
import {
  Box,
  Divider,
  IconButton,
  Stack,
  TextareaAutosize,
  Typography,
  styled,
  useTheme
} from '@mui/material';

const PromptCardBox = (props) => {
  const {
    item,
    index,
    editAddedPromptIconHandler,
    deleteIconHandler,
    roleOnChange,
    editTextHandler
  } = props;

  const theme = useTheme();

  return (
    <>
      <Box key={item.id}>
        <DividerX />
        <PromptCard className='PromptCard' padding={'1rem 0rem'}>
          <Stack
            direction={'row'}
            width={'100%'}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Typography variant='subHeading1'>Prompt {index + 1}</Typography>
            <Stack className='ImageStack' direction={'row'} gap='1rem'>
              <ActionButton
                action='edit'
                onClick={() => editAddedPromptIconHandler(index)}
              >
                {!item.editable && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      marginInline: 'auto',
                      backgroundColor: theme.palette.secondary.main,
                      width: '2px',
                      height: '20px',
                      borderRadius: '16px',
                      transform: 'translate(-50%, -50%) rotate(315deg)'
                    }}
                  ></span>
                )}
              </ActionButton>

              <ActionButton
                action='delete'
                onClick={() => deleteIconHandler(index)}
              />
            </Stack>
          </Stack>

          <TextArea
            className='PromptCardTextArea'
            name={`promptsArr[${index}]`}
            disabled={!item.editable}
            sx={{
              overflowY: 'auto',
              width: '100%',
              border: '1px solid #BFBFBF',
              borderRadius: '4px'
            }}
            onChange={(e) => editTextHandler(e, index)}
            minRows={7}
            maxRows={7}
          >
            {item.content}
          </TextArea>

          {/* Role Display */}
          <CustomSelect
            list={[
              { name: 'System', value: 'system' },
              { name: 'User', value: 'user' }
            ]}
            name='addedRole'
            value={item.role}
            onChange={(e) => roleOnChange(e, index)}
            width={'100%'}
            border={theme.palette.divider}
            disabled={!item.editable}
            sx={{
              maxWidth: '25%',
              [theme.breakpoints.down('sm')]: {
                minWidth: '100%'
              },
              border: '0.5px solid #BFBFBF',
              '& .MuiOutlinedInput-notchedOutline': {
                borderWidth: '1px',
                borderColor: '#BFBFBF'
              },

              '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#BFBFBF'
              },
              '& .MuiSvgIcon-root.Mui-disabled': {
                fill: 'white'
              }
            }}
          />
        </PromptCard>
      </Box>
    </>
  );
};

export default PromptCardBox;

const ImageContainer = styled(IconButton)(({ theme }) => ({
  borderRadius: '50%',
  height: '36px',
  width: '36px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& svg': {
    width: 16,
    height: 'auto'
  }
}));

const PromptCard = styled(Stack)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: '2rem',
  minHeight: '50px',
  width: '100%'
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
  '&:hover': {},

  '&:focus ': {},
  // firefox
  '&:focus-visible': {
    outline: '0'
  }
}));

const DividerX = styled(Divider)(({ theme }) => ({
  border: '0.51px solid #BFBFBF30'
}));
