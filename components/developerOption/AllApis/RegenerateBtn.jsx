import RegenerateIcon from '@/assets/CustomIcons/RegenerateIcon';
import { useRegenerateApiKey } from '@/hooks/developerOption';
import { CircularProgress, IconButton } from '@mui/material';
function RegenerateBtn({ user }) {
  const { mutate, isLoading } = useRegenerateApiKey();
  return (
    <IconButton
      disabled={isLoading}
      color='primary'
      sx={{ alignItems: 'center' }}
      onClick={() => mutate({ target_user: user })}
    >
      {isLoading ? (
        <CircularProgress size='16px' color='primary' />
      ) : (
        <RegenerateIcon fontSize='small' />
      )}
    </IconButton>
  );
}

export default RegenerateBtn;
