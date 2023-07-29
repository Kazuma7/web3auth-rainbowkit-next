import "@rainbow-me/rainbowkit/styles.css";

import {
  connectorsForWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { createConfig, WagmiConfig, configureChains } from "wagmi";
import { mainnet, polygon } from "wagmi/chains";
import {
  walletConnectWallet,
  metaMaskWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { rainbowWeb3AuthConnector } from "@/libs/RainbowWeb3authConnector";
import { AppProps } from "next/app";

const { chains, publicClient } = configureChains(
  [mainnet, polygon],
  [
    alchemyProvider({ apiKey: "7wSu45FYTMHUO4HJkHjQwX4HFkb7k9Ui" }),
    alchemyProvider({ apiKey: "fGXusgBUDC-OPy6XI8IFRvu1i7sbWsYj" }),
    publicProvider(),
  ]
);
const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      walletConnectWallet({ chains }),
      metaMaskWallet({ chains }),
      rainbowWeb3AuthConnector({ chains }) as any,
    ],
  },
]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
