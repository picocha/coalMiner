import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";

const BnbInput = styled("input")({
  fontSize: 24,
  fontWeight: 500,
  padding: "12px 90px 12px 16px",
  textAlign: "right",
  borderRadius: 15,
  border: "1px solid #555",
  background: "#FFDD3C",
  // background: "rgb(255,105,97)",
  // backgroundImage: "linear-gradient(172deg, rgba(255,105,98,1) 0%, rgba(255,121,116,1) 25%, rgba(255,153,151,0.4948354341736695) 75%, rgba(255,169,169,1) 100%)",
  width: "100%",
  outline: "none",
  "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
    MozAppearance: "textfield",
  },
});

export default function PriceInput({ value, max, text,onChange = () => {} }) {
  return (
    <Box position="relative">
      <BnbInput
        type="number"
        min={0}
        max={max}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Typography
        fontSize={24}
        position="absolute"
        top={9}
        right={10}
        fontWeight={500}
        color="black"
      >
        {text}
      </Typography>
    </Box>
  );
}
