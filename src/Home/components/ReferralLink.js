import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

import { styled } from "@mui/system";

const CardWrapper = styled(Card)({
  background: "#FFFDD0",
  // background: "rgb(251 241 225)",
  // background: "rgb(68,100,120)",
  // backgroundImage: "linear-gradient(126deg, rgba(68,100,120,1) 0%, rgba(54,69,64,1) 100%)",
});

const Input = styled("input")(({ theme }) => ({
  fontSize: 10,
  fontWeight: 300,
  padding: "10px 12px",
  borderRadius: 15,
  border: "1px solid #555",
  background: "#FFDD3C",
  width: "100%",
  outline: "none",
  color: theme.palette.primary.main,
}));

export default function ReferralLink({ address }) {
  const link = `${window.origin}?ref=${address}`;

  return (
    <CardWrapper>
      <CardContent style={{ paddingLeft: 8, paddingRight: 8 }}>
        <Typography gutterBottom variant="h5" textAlign="center">
          Referral Link
        </Typography>
        <Input value={address ? link : ""} readOnly />
        <Typography
          textAlign="center"
          variant="body2"
          marginTop={2}
          paddingX={3}
        >
          Earn 8% of the BNB used to mine from anyone who uses your
          referral link
        </Typography>
      </CardContent>
    </CardWrapper>
  );
}
