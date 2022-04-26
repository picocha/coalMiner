import Grid from "@mui/material/Grid";

import { config } from "../../config";
import esIcon2 from "../assets/ESIcon.png";
import tgIcon from "../assets/TGIcon.png";
import twIcon from "../assets/TWIcon.png";
import discordIcon from "../assets/discord.svg";
import twitterIcon from "../assets/twitter.svg";
import esIcon from "../assets/es.svg"
import { useAuthContext } from "../../providers/AuthProvider";
import { useEffect, useState } from "react";


export default function Footer() {
  
  const [scanner, setScanner] = useState('');

  const { address, chainId } = useAuthContext();
  useEffect(() => {
    if (parseInt(chainId) === 56) {
      setScanner(config.BSC.scanLink)
    } else if (parseInt(chainId) === 3) {
      setScanner(config.ROPSTEN.scanLink)
    } else if (parseInt(chainId) === 43114) {
      setScanner(config.AVAX.scanLink)
    } else if (parseInt(chainId) === 137) {
      setScanner(config.POLYGON.scanLink)
    } else {
      setScanner(config.BSC.scanLink)
    }
  }, [chainId]);




  return (
    <Grid container justifyContent="center" spacing={2} marginTop={4}>
      <Grid item>
        <a href={scanner} target="__blank">
          <img src={esIcon} alt="" width={48} height={48} />
        </a>
      </Grid>
      <Grid item>
        <a href="https://discord.gg/yQVBpPjb" target="__blank">
          <img src={discordIcon} alt="" width={48} height={48} />
        </a>
      </Grid>
      <Grid item>
        <a href="https://twitter.com/coalminer_io" target="__blank">
          <img src={twitterIcon} alt="" width={48} height={48} />
        </a>
      </Grid>
    </Grid>
  );
}