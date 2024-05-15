import { renderResponse } from '@/utils/globalFuntions';
import { Box, useTheme } from '@mui/material';
import { memo, useEffect } from 'react';
import { copyToClipboard } from '../../utils/globalFuntions';

const MessageFormat = ({ string, id }) => {
  const theme = useTheme();
  const content = renderResponse({ id, string, theme });

  const updateHeight = () => {
    const codes = document.querySelectorAll('code');
    codes.forEach((code) => {
      (code.parentElement.style.height = code.clientHeight + 30 + 'px'),
        (code.parentElement.dataset.highlighted = 'yes');
    });
  };
  useEffect(() => {
    let isMounted = true;
    if (isMounted) updateHeight();
    return () => {
      isMounted = false;
    };
  }, [content]);
  
  useEffect(() => {
    window.addEventListener('resize', updateHeight);
    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []);
  window.handleClick = (codeBlockId) => {
    const element = document.getElementById(codeBlockId);
    copyToClipboard(element.innerText);
  };
  return (
    <Box
      sx={{
        wordBreak: 'break-word',
        width: '90%',
        lineHeight: 1.5,
        color: '#DDE1EB'
      }}
      dangerouslySetInnerHTML={{
        __html: content
      }}
    />
  );
};

MessageFormat.displayName = 'MessageFormat';

export default memo(MessageFormat);
