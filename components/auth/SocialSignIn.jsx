import Button from '@/components/core/Button';
import { useSocialSignIn } from '@/hooks/auth';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

const SocialSignIn = ({ isSignUp }) => {
  const { isLoading } = useSocialSignIn({ isSignUp });

  return (
    <>
      <Button
        variant='outlined'
        loading={isLoading}
        disabled={isLoading}
        onClick={() => {
          signIn('azure-ad');
        }}
        color={'secondary'}
      >
        <Image
          component={'img'}
          src={'/icons/microsoft.svg'}
          width={20}
          height={20}
          alt={'microsoft'}
          priority
        />
      </Button>
    </>
  );
};

export default SocialSignIn;
