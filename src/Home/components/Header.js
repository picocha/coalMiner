import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import logo from "../../assets/CoalLogo.png";
import Connect from "./Connect";

const Wrapper = styled("div")(({ theme }) => ({
  textAlign: "center",
  paddingBottom: 24,
  [theme.breakpoints.down("md")]: {
    h5: {
      fontSize: 20,
      margin: 0,
    },
  },
}));

export default function Header() {
  return (
    <Wrapper>
      <img src={logo} alt="" width={"100%"} style={{ marginTop: -64 }} />
      <Connect responsive={false} />
      <Typography variant="h6" marginTop={-3}>
        <strong>The world's 1st multi-chain and sustainable reward pool. (BSC/Polygon/AVAX)</strong>
      </Typography>
    </Wrapper>
  );
}
