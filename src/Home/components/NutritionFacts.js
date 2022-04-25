import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { styled } from "@mui/system";

const CardWrapper = styled(Card)({
  // background: "rgb(255 252 248)",
  background: "#FFFDD0",
  // background: "rgb(68,100,120)",
  // backgroundImage: "linear-gradient(126deg, rgba(68,100,120,1) 0%, rgba(54,69,64,1) 100%)",
  marginBottom: 24,
});

const nutritionFacts = [
  {
    label: "Max Daily Return",
    value: 7,
  },
  {
    label: "APR",
    value: "2,555",
  },
  {
    label: "Deposit Fee",
    value: 3,
  },
  {
    label: "Withdrawal Fee",
    value: 6,
  },
];

export default function NutritionFacts() {
  return (
    <CardWrapper>
      <CardContent>
        <Typography variant="h5" borderBottom="6px solid" paddingBottom={1}>
          Extraction Stats
        </Typography>
        <Box paddingTop={2}>
          {nutritionFacts.map((f) => (
            <Grid container key={f.label} justifyContent="space-between">
              <Typography variant="body1" gutterBottom>
                {f.label}
              </Typography>
              <Typography gutterBottom>{f.value}%</Typography>
            </Grid>
          ))}
        </Box>
      </CardContent>
    </CardWrapper>
  );
}
