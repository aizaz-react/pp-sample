import ArrowBackOutLinedIcon from '@/assets/CustomIcons/ArrowBackOutLinedIcon';
import InfoIconFIlled from '@/assets/CustomIcons/InfoIconFIlled';
import Button from '@/components/core/Button';
import OutlinedInput from '@/components/core/OutlinedInput';
import { ChatContext } from '@/components/hoc/ChatContext';
import { HyperParametersContext } from '@/components/hoc/HyperParametersContext';
import {
  CustomSlider,
  CustomSwitch,
  CustomTooltip
} from '@/components/styled/core';
import {
  defaultParameters,
  useGetHyperParameters,
  useUpdateParameters
} from '@/hooks/hyperParameter';
import { getDirtyValues, imageModel } from '@/utils/globalFuntions';
import {
  Box,
  Divider,
  Popover,
  Stack,
  styled,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useFormik } from 'formik';
import { useParams } from 'next/navigation';
import { useContext, useMemo, useState } from 'react';

function handleKeyPress(event) {
  const keyCode = event.keyCode || event.which;
  const keyValue = String.fromCharCode(keyCode);
  if (!/^\d+$/.test(keyValue)) {
    event.preventDefault();
  }
}

const HyperParameterModal = ({ open, anchorEl, handleClose }) => {
  const theme = useTheme();
  const params = useParams();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  const { data } = useGetHyperParameters({ id: params?.id });
  const { mutateAsync: update, isLoading } = useUpdateParameters({
    id: params?.id,
    callback: handleClose
  });
  const { data: result } = useGetHyperParameters({
    id: null
  });
  const { slug } = useContext(ChatContext);
  const { updateValues } = useContext(HyperParametersContext);
  const [saveLoading, setSaveLoading] = useState(false);

  const initialValues = !data
    ? result?.hyper_parameters
    : data.hyper_parameters;

  const default_context_chaining = imageModel(slug) ? false : true;

  const formik = useFormik({
    initialValues: {
      ...initialValues
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      setSaveLoading(true);
      await update({ hyper_parameters: values });
    }
  });

  const {
    context_chaining,
    chain_limit,
    temperature,
    token_limit,
    top_k,
    top_p
  } = formik.values;

  const isDirty = useMemo(() => {
    const data = getDirtyValues(formik.values, defaultParameters);
    return !Object.keys(data).length;
  }, [formik.values]);

  const onChangeParameter = (name, value) => {
    formik.setFieldValue(name, value);
    if (!params?.id) {
      updateValues(name, value);
    }
  };

  const handleReset = () => {
    setSaveLoading(false);
    update({
      hyper_parameters: {
        ...result?.hyper_parameters,
        context_chaining: default_context_chaining
      }
    });
  };
  const boxShadow = '2px 2px 25px 0px rgba(255, 255, 255, 0.10)';
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      sx={{
        '.MuiPopover-paper': {
          background:
            'linear-gradient(180deg, rgba(14, 40, 51, 0.50) 0%, rgba(39, 93, 113, 0.00) 100%), #0E2833',
          borderRadius: '10px',
          top: matches ? ' 150px !important' : ' 100px !important'
        }
      }}
    >
      <Stack
        sx={{ width: 250 }}
        component={'form'}
        onSubmit={formik.handleSubmit}
      >
        <PopoverLayout>
          <Stack
            direction={'row'}
            justifyContent='space-between'
            alignItems='center'
          >
            <Typography variant={'body1'}>Hyperparameters</Typography>
            <Stack
              onClick={handleClose}
              justifyContent={'center'}
              sx={{ cursor: 'pointer' }}
            >
              <ArrowBackOutLinedIcon />
            </Stack>
          </Stack>
        </PopoverLayout>
        <Divider />
        <PopoverLayout gap='0.5rem'>
          <Stack
            direction={'row'}
            justifyContent='space-between'
            alignItems='center'
          >
            <Stack direction={'row'} alignItems='center' gap={'0.5rem'}>
              <Typography variant={'body2'}>Context Chaining</Typography>
            </Stack>
            <Stack justifyContent={'center'}>
              <CustomSwitch
                disabled={imageModel(slug)}
                checked={imageModel(slug) ? false : context_chaining}
                onChange={(e) =>
                  onChangeParameter('context_chaining', e.target.checked)
                }
                sx={{
                  width: 32,
                  height: 16,
                  '& .MuiSwitch-switchBase': {
                    transitionDuration: '300ms',
                    '&.Mui-checked': {
                      transform: 'translateX(16px)'
                    }
                  },
                  '& .MuiSwitch-thumb': {
                    boxSizing: 'border-box',
                    width: 12,
                    height: 12
                  }
                }}
              />
            </Stack>
          </Stack>
          <Stack
            direction={'row'}
            justifyContent='space-between'
            alignItems='center'
            gap='1rem'
          >
            <Stack
              direction={'row'}
              justifyContent='space-between'
              alignItems='center'
              gap='.5rem'
              width={'100%'}
            >
              <Typography variant={'body2'}>0</Typography>
              <CustomSlider
                disabled={!context_chaining || imageModel(slug)}
                value={chain_limit || 0}
                onChange={(e) =>
                  onChangeParameter('chain_limit', e.target.value)
                }
                max={5}
                min={0}
                sx={{ flex: 1 }}
              />
              <Typography variant={'body2'}>5</Typography>
            </Stack>
            <Box>
              <OutlinedInput
                disabled={!context_chaining || imageModel(slug)}
                inputStyle={{
                  paddingRight: '0rem',
                  paddingLeft: '0rem',
                  '&.MuiInputBase-root': {
                    border: `1px solid ${theme.palette.secondary.main}`,
                    width: '3rem'
                  },
                  '& input': {
                    padding: '0.2rem .5rem',
                    width: '100%',
                    ...theme.typography.body2
                  }
                }}
                value={chain_limit}
                onChange={(e) => {
                  onChangeParameter(
                    'chain_limit',
                    e.target.value > 5 ? 5 : e.target.value
                  );
                }}
                onKeyPress={handleKeyPress}
              />
            </Box>
          </Stack>
          <Stack
            direction={'row'}
            justifyContent='space-between'
            alignItems='center'
            mt={1.5}
          >
            <Stack direction={'row'} alignItems='center' gap={'0.5rem'}>
              <Typography variant={'body2'}>Temperature</Typography>
              <CustomTooltip
                title={
                  'Temperature controls the degree of randomness in token selection. Lower temperatures are good for prompts that expect a true or correct response, while higher temperatures can lead to more diverse or unexpected results. A temperature of 0 is deterministic: the highest probability token is always selected. For most use cases, try starting with a temperature of 2.'
                }
                placement='top'
                color={theme.palette.background.default}
                shadow={boxShadow}
              >
                <Typography>
                  <InfoIconFIlled />
                </Typography>
              </CustomTooltip>
            </Stack>
          </Stack>
          <Stack
            direction={'row'}
            justifyContent='space-between'
            alignItems='center'
            gap='1rem'
          >
            <Stack
              direction={'row'}
              justifyContent='space-between'
              alignItems='center'
              gap='.5rem'
              width={'100%'}
            >
              <Typography variant={'body2'}>0</Typography>
              <CustomSlider
                value={(temperature || 0) * 10}
                onChange={(e) =>
                  onChangeParameter('temperature', (e.target.value || 0) / 10)
                }
                max={10}
                min={0}
                sx={{ flex: 1 }}
              />
              <Typography variant={'body2'}>1</Typography>
            </Stack>
            <Box>
              <OutlinedInput
                value={temperature}
                onChange={(e) =>
                  onChangeParameter(
                    'temperature',
                    e.target.value < 1
                      ? e.target.value
                      : (e.target.value || 0) / 10
                  )
                }
                onKeyPress={handleKeyPress}
                inputStyle={{
                  paddingRight: '0rem',
                  paddingLeft: '0rem',
                  '&.MuiInputBase-root': {
                    border: `1px solid ${theme.palette.secondary.main}`,
                    width: '3rem'
                  },
                  '& input': {
                    padding: '0.2rem .5rem',
                    width: '100%',
                    ...theme.typography.body2
                  }
                }}
              />
            </Box>
          </Stack>
          <Stack
            direction={'row'}
            justifyContent='space-between'
            alignItems='center'
            mt={1.5}
          >
            <Stack direction={'row'} alignItems='center' gap={'0.5rem'}>
              <Typography variant={'body2'}>Token Limit</Typography>
              <CustomTooltip
                title={
                  'Token limit determines the maximum amount of text output from one prompt. A token is approximately four characters. The default value is 256.'
                }
                placement='top'
                color={theme.palette.background.default}
                shadow={boxShadow}
                tooltippadding={'1rem'}
              >
                <Typography>
                  <InfoIconFIlled />
                </Typography>
              </CustomTooltip>
            </Stack>
          </Stack>
          <Stack
            direction={'row'}
            justifyContent='space-between'
            alignItems='center'
            gap='1rem'
          >
            <Stack
              direction={'row'}
              justifyContent='space-between'
              alignItems='center'
              gap='.5rem'
              width={'100%'}
            >
              <Typography variant={'body2'}>0</Typography>
              <CustomSlider
                defaultValue={10}
                value={token_limit || 0}
                onChange={(e) =>
                  onChangeParameter('token_limit', e.target.value)
                }
                max={1024}
                min={0}
                sx={{ flex: 1 }}
              />
              <Typography variant={'body2'}>1024</Typography>
            </Stack>
            <Box>
              <OutlinedInput
                value={token_limit || 0}
                onChange={(e) =>
                  onChangeParameter(
                    'token_limit',
                    e.target.value > 1024 ? 1024 : e.target.value
                  )
                }
                onKeyPress={handleKeyPress}
                inputStyle={{
                  paddingRight: '0rem',
                  paddingLeft: '0rem',
                  '&.MuiInputBase-root': {
                    border: `1px solid ${theme.palette.secondary.main}`,
                    width: '3rem'
                  },
                  '& input': {
                    padding: '0.2rem .5rem',
                    width: '100%',
                    ...theme.typography.body2
                  }
                }}
              />
            </Box>
          </Stack>
          <Stack
            direction={'row'}
            justifyContent='space-between'
            alignItems='center'
            mt={1.5}
          >
            <Stack direction={'row'} alignItems='center' gap={'0.5rem'}>
              <Typography variant={'body2'}>Top-K</Typography>
              <CustomTooltip
                title={
                  'Top-k changes how the model selects tokens for output. A top-k of 1 means the selected token is the most probable among all tokens in the model’s vocabulary (also called greedy decoding), while a top-k of 3 means that the next token is selected from among the 3 most probable tokens (using temperature). The default top-k value is 40.'
                }
                placement='top'
                color={theme.palette.background.default}
                shadow={boxShadow}
                tooltippadding={'1rem'}
              >
                <Typography>
                  <InfoIconFIlled />
                </Typography>
              </CustomTooltip>
            </Stack>
          </Stack>
          <Stack
            direction={'row'}
            justifyContent='space-between'
            alignItems='center'
            gap='1rem'
          >
            <Stack
              direction={'row'}
              justifyContent='space-between'
              alignItems='center'
              gap='.5rem'
              width={'100%'}
            >
              <Typography variant={'body2'}>0</Typography>
              <CustomSlider
                defaultValue={10}
                value={top_k || 0}
                onChange={(e) => onChangeParameter('top_k', e.target.value)}
                max={40}
                min={0}
                sx={{ flex: 1 }}
              />
              <Typography variant={'body2'}>40</Typography>
            </Stack>
            <Box>
              <OutlinedInput
                value={top_k}
                onChange={(e) =>
                  onChangeParameter(
                    'top_k',
                    e.target.value > 40 ? 40 : e.target.value
                  )
                }
                onKeyPress={handleKeyPress}
                inputStyle={{
                  paddingRight: '0rem',
                  paddingLeft: '0rem',
                  '&.MuiInputBase-root': {
                    border: `1px solid ${theme.palette.secondary.main}`,
                    width: '3rem'
                  },
                  '& input': {
                    padding: '0.2rem .5rem',
                    width: '100%',
                    ...theme.typography.body2
                  }
                }}
              />
            </Box>
          </Stack>
          <Stack
            direction={'row'}
            justifyContent='space-between'
            alignItems='center'
            mt={1.5}
          >
            <Stack direction={'row'} alignItems='center' gap={'0.5rem'}>
              <Typography variant={'body2'}>Top-P</Typography>
              <CustomTooltip
                title={
                  'Top-p changes how the model selects tokens for output. Tokens are selected from most probable to least until the sum of their probabilities equals the top-p value. For example, if tokens A, B, and C have a probability of .3, .2, and .1 and the top-p value is .5, then the model will select either A or B as the next token (using temperature). The default top-p value is .8.'
                }
                placement='top'
                color={theme.palette.background.default}
                shadow={boxShadow}
                tooltippadding={'1rem'}
              >
                <Typography>
                  <InfoIconFIlled />
                </Typography>
              </CustomTooltip>
            </Stack>
          </Stack>
          <Stack
            direction={'row'}
            justifyContent='space-between'
            alignItems='center'
            gap='1rem'
          >
            <Stack
              direction={'row'}
              justifyContent='space-between'
              alignItems='center'
              gap='.5rem'
              width={'100%'}
            >
              <Typography variant={'body2'}>0</Typography>
              <CustomSlider
                value={(top_p || 0) * 10}
                onChange={(e) =>
                  onChangeParameter('top_p', (e.target.value || 0) / 10)
                }
                max={10}
                min={0}
                sx={{ flex: 1 }}
              />
              <Typography variant={'body2'}>1</Typography>
            </Stack>
            <Box>
              <OutlinedInput
                value={top_p}
                onChange={(e) =>
                  onChangeParameter(
                    'top_p',
                    e.target.value < 1
                      ? e.target.value
                      : (e.target.value || 0) / 10
                  )
                }
                onKeyPress={handleKeyPress}
                inputStyle={{
                  paddingRight: '0rem',
                  paddingLeft: '0rem',
                  '&.MuiInputBase-root': {
                    border: `1px solid ${theme.palette.secondary.main}`,
                    width: '3rem'
                  },
                  '& input': {
                    padding: '0.2rem .5rem',
                    width: '100%',
                    ...theme.typography.body2
                  }
                }}
              />
            </Box>
          </Stack>
        </PopoverLayout>
        {!!params?.id && (
          <Stack
            direction='row'
            gap='0.5rem'
            py={1}
            px={1.5}
            sx={{
              background:
                'linear-gradient(180deg, rgba(14, 40, 51, 0.50) 0%, rgba(39, 93, 113, 0.00) 100%), #0E2833'
            }}
          >
            <Button
              variant={'contained'}
              sx={{ flex: 0.6, borderRadius: '5px' }}
              disabled={!formik.dirty}
              loading={saveLoading && isLoading}
              type={'submit'}
              loadingSize={21}
            >
              <Typography variant='body2'>Save</Typography>
            </Button>
            <Button
              variant={'outlined'}
              sx={{
                flex: 1,
                borderRadius: '5px',
                border: 'none',
                outline: `1px solid ${theme.palette.secondary.main}`,
                '&:hover': {
                  border: 'none',
                  outline: `1px solid ${theme.palette.secondary.main}`
                },
                '&:disabled': {
                  border: 'none',
                  outline: `none`
                }
              }}
              color={'secondary'}
              onClick={handleReset}
              // disabled={isDirty || formik.dirty}
              loading={!saveLoading && isLoading}
              type={'button'}
              loadingSize={21}
            >
              <Typography variant='body2'>Reset Parameters</Typography>
            </Button>
          </Stack>
        )}
      </Stack>
    </Popover>
  );
};

export default HyperParameterModal;

const PopoverLayout = styled(Stack)(({ theme }) => ({
  padding: '0.6rem 0.69rem'
}));
