import React from 'react';
import { Stack, Typography, useTheme } from '@mui/material';
import Button from '@/components/core/Button';
import OutlinedInput from '@/components/core/OutlinedInput';
import { RoundedDialog } from '../../styled/core';
import { useFormik } from 'formik';
import * as yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import { useAddKeywordList, useUpdateKeywordList } from '@/hooks/keywords';
import { toast } from 'react-toastify'

const validationSchema = yup.object({
  name: yup
    .string('Enter list name')
    .max(50, 'List name must be maximun 50 characters long.')
    .required('List name is required')
});

const KeywordModal = (props) => {
  const { selected } = props;
  const theme = useTheme();

  const callBack = () => {
    formik.resetForm();
    props.handleClose();
  };

  const { mutate: addList, isLoading: loading } = useAddKeywordList(callBack);
  const { mutate: updateList, isLoading: updateLoading } =
    useUpdateKeywordList(callBack);

  const onClose = () => {
    props.handleClose();
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      name: selected?.name || '',
      keyword: '',
      keywords: selected?.keywords || []
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const { name, keywords } = values;
      if (!!selected) return updateList({ id: selected.id, name, keywords });
      addList({ name, keywords });
    }
  });

  const handleAddKeywords = (e) => {
    const { key } = e;
    const { keywords, keyword } = formik.values;
    if (key !== 'Enter') return;
    if (!keyword) return;
    const newList = new Set([...keywords, keyword]);
    formik.setFieldValue('keywords', [...newList]);
    formik.setFieldValue('keyword', '');
  };

  const removeKeyword = (value) => {
    const filterList = formik.values.keywords.filter(
      (keyword) => keyword !== value
    );
    formik.setFieldValue('keywords', filterList);
  };

  function readCommaSeparatedFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const fileContent = event.target.result;
        const lines = fileContent.split('\n');
        const contentList = lines.reduce((result, line) => {
          const items = line.split(',');
          result.push(...items);
          return result;
        }, []);
        const keywords = contentList.filter((keyword) => keyword !== '');
        resolve(keywords);
      };

      reader.onerror = (event) => {
        reject(event.target.error);
      };

      reader.readAsText(file);
    });
  }

  const handleFileUpload = async ({ target }) => {
    const [file] = target.files;
    if (file) {
      if (file.name.endsWith('.txt')) {
        target.value = '';
        const keywords = await readCommaSeparatedFile(file);
        const mergeData = new Set(formik.values.keywords.concat(keywords));
        const unique = [...mergeData];
        formik.setFieldValue('keywords', unique);
      } else {
        toast.error("Only '.txt' files are allowed.");
      }
    }
  };

  return (
    <RoundedDialog
      open={props.open}
      onClose={onClose}
      maxWidth={'sm'}
      PaperProps={{
        sx: {
          borderRadius: 2
        }
      }}
    >
      <Stack component={'form'} gap='1.5rem' onSubmit={formik.handleSubmit}>
        <Stack spacing='10px' marginBottom='10px'>
          <Typography variant='heading1' component={'h1'}>
            {!!selected ? 'Update' : 'Add'} Keywords
          </Typography>
          <Typography variant='body1' component={'p'}>
            Create your own custom keywords list
          </Typography>
        </Stack>
        <Stack gap={'1rem'} marginBottom='20px'>
          <OutlinedInput
            label={'List Name'}
            placeholder='Internet Network Keywords'
            name='name'
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            inputStyle={{
              border: '1px solid #275D71',
              color: 'secondary',
              borderColor: 'secondary'
            }}
          />
          <OutlinedInput
            label={
              <Stack
                component={'span'}
                direction={'row'}
                justifyContent={'space-between'}
                alignItems={'flex-end'}
              >
                <Typography>{'Keyword'}</Typography>
                <>
                  <Typography
                    type={'button'}
                    component='label'
                    htmlFor='file-input'
                    color={'primary'}
                    sx={{ cursor: 'pointer' }}
                  >
                    Upload
                  </Typography>
                  <input
                    type='file'
                    id='file-input'
                    hidden
                    accept='.txt'
                    onChange={handleFileUpload}
                  />
                </>
              </Stack>
            }
            placeholder='SSN'
            name='keyword'
            value={formik.values.keyword}
            onChange={formik.handleChange}
            error={formik.touched.keyword && Boolean(formik.errors.keyword)}
            helperText={formik.touched.keyword && formik.errors.keyword}
            endAdornment={
              <Button
                varient='text'
                color={'primary'}
                type={'button'}
                onClick={() => handleAddKeywords({ key: 'Enter' })}
              >
                Add
              </Button>
            }
            onKeyUp={handleAddKeywords}
            inputStyle={{
              border: '1px solid #275D71',
              color: 'secondary',
              borderColor: 'secondary'
            }}
          />
        </Stack>
        <Stack
          maxHeight={'200px'}
          overflow={'auto'}
          direction={'row'}
          flexWrap={'wrap'}
          gap={'1rem'}
        >
          {formik?.values?.keywords?.map((text, index) => (
            <Button
              key={index}
              color={'secondary'}
              disableRipple
              type='button'
              sx={{
                background: `${theme.palette.background.paper}20`,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'text.primary',
                cursor: 'default'
              }}
            >
              {text}
              <CloseIcon
                fontSize='small'
                sx={{ cursor: 'pointer' }}
                onClick={() => removeKeyword(text)}
              />
            </Button>
          ))}
        </Stack>
        <Stack direction='row' gap={'20px'} marginBottom='5px'>
          <Button
            variant='contained'
            type={'button'}
            padding='10px 0px'
            color='secondary'
            sx={{
              flex: 1,
              backgroundColor: `${theme.palette.secondary.main}30`
            }}
            onClick={onClose}
          >
            <Typography variant='subHeading3' sx={{ color: 'white' }}>
              Cancel
            </Typography>
          </Button>
          <Button
            variant='contained'
            type={'button'}
            sx={{ flex: 1 }}
            padding='10px 0px'
            loading={loading || updateLoading}
            onClick={() => formik.handleSubmit()}
          >
            <Typography variant='subHeading3'>
              {!!selected ? 'Update' : 'Save'}
            </Typography>
          </Button>
        </Stack>
      </Stack>
    </RoundedDialog>
  );
};

export default KeywordModal;
