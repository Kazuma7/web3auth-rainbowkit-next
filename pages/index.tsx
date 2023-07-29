import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
      }}
    >
      <ConnectButton />
    </div>
  );
}
