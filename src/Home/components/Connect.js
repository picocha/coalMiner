import Button from "@mui/material/Button";
import { styled } from "@mui/system";

import { useAuthContext } from "../../providers/AuthProvider";

const ConnectButton = styled(Button)(({ theme }) => ({
  position: "fixed",
  right: 48,
  top: 48,
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const SmallScreenConnectButton = styled(Button)(({ theme }) => ({
  display: "none",
  marginTop: -24,
  marginBottom: 48,
  width: "95%",
  marginLeft: "auto",
  marginRight: "auto",
  [theme.breakpoints.down("md")]: {
    display: "block",
  },
}));

export default function Connect({ responsive = true }) {
  const { address, loading, connect, disconnect } = useAuthContext();

  return responsive ? (
    <ConnectButton
      color="flare"
      variant="contained"
      disabled={loading}
      onClick={() => (address ? disconnect() : connect())}
    >
      <strong> {address ? "Disconnect" : "Connect"}</strong>
    </ConnectButton>
  ) : (
    <SmallScreenConnectButton
      color="flare"
      variant="contained"
      disabled={loading}
      onClick={() => (address ? disconnect() : connect())}
    >
      <strong> {address ? "Disconnect" : "Connect"}</strong>
    </SmallScreenConnectButton>
  );
}
