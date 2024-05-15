import ChatContextProvider from '@/components/hoc/ChatContext';
import HyperParametersProvider from '@/components/hoc/HyperParametersContext';
import Provider from '@/components/hoc/provider';
import localFont from 'next/font/local';
import '../styles/main.css';

export const ProximaNova = localFont({
  src: [
    { path: '../assets/fonts/Proxima.otf', weight: '300' },
    { path: '../assets/fonts/Proxima.otf', weight: '400' }
  ]
});

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body suppressHydrationWarning={true} className={ProximaNova.className}>
        <HyperParametersProvider>
          <ChatContextProvider>
            <Provider>{children}</Provider>
          </ChatContextProvider>
        </HyperParametersProvider>
      </body>
    </html>
  );
}
