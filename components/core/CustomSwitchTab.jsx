import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material';

export default function CustomSwitchTab(props) {
  const theme = useTheme();
  const { vaultType, setVaultType } = props;
  return (
    <Box
      sx={{
        display: {
          xs: 'flex', // Hide on devices below 600px
          md: 'flex' // Display on medium devices and above
        }
      }}
    >
      <Box
        sx={{
          padding: '5px',
          width: '100%',
          minWidth: '220px',
          textAlign: 'center',
          border: '1px solid #BFBFBF20',
          borderRadius: '8px',
          position: 'relative'
          // background: '#275D7120'
        }}
      >
        {/* Mask */}
        <Box
          sx={{
            width: '100px',
            height: '40px',
            borderRadius: '8px',
            background: '#e39e36',
            position: 'absolute',
            boxShadow: 'none',
            transition: 'all 0.5s ease',
            transform: `translateX(${
              vaultType === 'myVault' ? 0 : '102px'
            }) scaleX(${vaultType === 'myVault' ? 1 : 1.3})`
          }}
        />

        {/* My Vault Button */}
        <Button
          disableRipple
          variant='text'
          sx={{
            ...theme.typography.caption1,
            width: '90px',
            color: vaultType === 'myVault' ? 'black' : 'white',
            height: '40px',
            transition: 'all 0.2s 0.1s ease',
            '&:hover': {
              opacity: 0.8,
              backgroundColor: 'transparent'
            }
          }}
          onClick={() => setVaultType('myVault')}
        >
          My Vault
        </Button>

        {/* Shared Vault Button */}
        <Button
          disableRipple
          variant='text'
          sx={{
            ...theme.typography.caption1,
            width: '115px',
            color: vaultType === 'sharedVault' ? 'black' : 'white',
            height: '40px',
            transition: 'all 0.2s 0.1s ease',
            '&:hover': {
              opacity: 0.8,
              backgroundColor: 'transparent'
            }
          }}
          onClick={() => setVaultType('sharedVault')}
        >
          Shared Vault
        </Button>
      </Box>
    </Box>
  );
}
