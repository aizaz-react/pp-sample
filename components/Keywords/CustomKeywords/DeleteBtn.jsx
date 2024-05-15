import DeleteModal from '@/components/core/modals/DeleteModal';
import { useDeleteCustomKeywords } from '@/hooks/keywords';
import { useCallback, useState } from 'react';
import DeleteLogo from '@/assets/CustomIcons/DeleteLogo';

function DeleteBtn({ id, IconButton }) {
  const [open, setOpen] = useState(false);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);
  const { mutate, isLoading } = useDeleteCustomKeywords(handleClose);
  const handleDelete = () => {
    mutate({ id });
  };
  return (
    <>
      <IconButton disabled={isLoading} onClick={() => setOpen(true)}>
        <DeleteLogo />
      </IconButton>
      <DeleteModal
        open={open}
        handleClose={handleClose}
        title={'Delete List'}
        message={
          'Are you sure you want to delete this custom keywords list? This action cannot be undone.'
        }
        confirm={handleDelete}
        loading={isLoading}
      />
    </>
  );
}

export default DeleteBtn;
