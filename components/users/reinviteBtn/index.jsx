import ReSend from '@/assets/CustomIcons/ReSend';
import { useReInviteUser } from '@/hooks/users';
import { CircularProgress, IconButton } from '@mui/material';
function ReInviteBtn({ userId }) {
  const { mutate: reInviteUser, isLoading: isReInviting } = useReInviteUser();

  return (
    <IconButton
      disabled={isReInviting}
      color='secondary'
      onClick={() => {
        reInviteUser({ target_user: userId });
      }}
    >
      {isReInviting ? (
        <CircularProgress size='16px' color='secondary' />
      ) : (
        <ReSend />
      )}
    </IconButton>
  );
}

export default ReInviteBtn;
