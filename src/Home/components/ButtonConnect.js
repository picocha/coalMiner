import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";

import { styled } from "@mui/system";
import { Button } from "@mui/material";
import Miner from "./Miner";
import { useState } from "react";

const CardWrapper = styled(Card)({
  // background: "rgb(255 252 248)",
  background: "rgb(68,100,120)",
  backgroundImage: "linear-gradient(126deg, rgba(68,100,120,1) 0%, rgba(54,69,64,1) 100%)",
  marginBottom: 24,
});

export default function ButtonConnect({chain}) {
  const [active, setActive] = useState(false);
  return (
		  <Button onClick={() => setActive(active => !active)}>
      <Link to="/Restaurant" className="home_button">View Menu</Link>
			<Typography variant="h5" borderBottom="6px solid" paddingBottom={1}>
				{chain}
			</Typography>
      { active ? <Miner></Miner> : null }
		  </Button>
  );
}