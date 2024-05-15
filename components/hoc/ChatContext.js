'use client';
import React, { createContext, useState } from 'react';

export const ChatContext = createContext(null);

const ChatContextProvider = ({ children }) => {
  const [slug, setSlug] = useState('');
  const [folderVaultId, setFolderVaultId] = useState('');

  return (
    <ChatContext.Provider value={{ slug, setSlug, folderVaultId, setFolderVaultId }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
