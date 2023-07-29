import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
import { Web3Auth } from "@web3auth/modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { CHAIN_NAMESPACES, WALLET_ADAPTERS } from "@web3auth/base";

const name = "Web3auth";
const iconUrl =
  "https://res.cloudinary.com/beincrypto/image/upload/v1661461003/logos/ukflgfdxacovx9yzyrr4.png";

export const rainbowWeb3AuthConnector = ({ chains }: any) => {
  // Create Web3Auth Instance
  const chainConfig = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x" + chains[0].id.toString(16),
    rpcTarget: chains[0].rpcUrls.default.http[0],
    displayName: chains[0].name,
    tickerName: chains[0].nativeCurrency?.name,
    ticker: chains[0].nativeCurrency?.symbol,
    blockExplorer: chains[0].blockExplorers?.default.url[0],
  };

  const web3AuthInstance = new Web3Auth({
    clientId: "YOUR_CLIENT_ID",
    chainConfig,
    uiConfig: {
      theme: "light",
      loginMethodsOrder: ["twitter", "google"],
      defaultLanguage: "en",
      appLogo: iconUrl, // Your App Logo Here
      modalZIndex: "2147483647",
      appName: name,
    },
    web3AuthNetwork: "cyan",
    enableLogging: true,
  });

  // Add openlogin adapter for customisations
  const privateKeyProvider = new EthereumPrivateKeyProvider({
    config: { chainConfig },
  });
  const openloginAdapterInstance = new OpenloginAdapter({
    privateKeyProvider,
    adapterSettings: {
      network: "cyan",
      uxMode: "popup",
      whiteLabel: {
        name: "Your app Name",
        logoLight: iconUrl,
        logoDark: iconUrl,
        defaultLanguage: "en",
        dark: true, // whether to enable dark mode. defaultValue: false
      },
    },
  });
  web3AuthInstance.configureAdapter(openloginAdapterInstance);
  return {
    id: "web3auth",
    name,
    iconUrl,
    iconBackground: "#fff",
    createConnector: () => {
      const connector = new Web3AuthConnector({
        chains: chains,
        options: {
          web3AuthInstance,
          modalConfig: {
            [WALLET_ADAPTERS.OPENLOGIN]: {
              loginMethods: {
                google: {
                  name: "google login",
                  logoDark:
                    "url to your custom logo which will shown in dark mode",
                },
                facebook: {
                  // it will hide the facebook option from the Web3Auth modal.
                  name: "facebook login",
                  showOnModal: false,
                },
              },
              label: "Login with Openlogin",
            },
            [WALLET_ADAPTERS.WALLET_CONNECT_V1]: {
              showOnModal: false,
              label: "Login with WalletConnect",
            },
            [WALLET_ADAPTERS.WALLET_CONNECT_V2]: {
              showOnModal: false,
              label: "Login with WalletConnect",
            },
            [WALLET_ADAPTERS.TORUS_EVM]: {
              showOnModal: false,
              label: "Login with Torus",
            },
            [WALLET_ADAPTERS.METAMASK]: {
              showOnModal: false,
              label: "Login with Metamask",
            },
            [WALLET_ADAPTERS.COINBASE]: {
              showOnModal: false,
              label: "Login with Coinbase",
            },
          },
        },
      });
      return {
        connector,
      };
    },
  };
};
