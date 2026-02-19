import React from 'react';
import ReactDOM from 'react-dom/client';
import { PrivyProvider } from '@privy-io/react-auth';
import App from './App';
import './index.css';
import { neuraTestnet } from './network'; // certifique-se de que este arquivo existe

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PrivyProvider
      appId="cmlryv7zk04ox0cjv1hfm2dax"
      config={{
        loginMethods: ['email', 'discord'],
        defaultChain: neuraTestnet,
        supportedChains: [neuraTestnet],
        embeddedWallets: {
          // Cria carteira apenas para usuários que não possuem uma externa
          ethereum: {
            createOnLogin: 'users-without-wallets',
          },
        },
        appearance: {
          theme: 'dark',
          accentColor: '#00ff88',
        },
      }}
    >
      <App />
    </PrivyProvider>
  </React.StrictMode>
);
