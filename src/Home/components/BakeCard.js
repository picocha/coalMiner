/* eslint-disable react-hooks/exhaustive-deps */
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/system";
import { useLocation } from "react-router-dom";
import Web3 from "web3";

import PriceInput from "../../components/PriceInput";
import { useContractContext } from "../../providers/ContractProvider";
import { useAuthContext } from "../../providers/AuthProvider";
import { useEffect, useState } from "react";
import { config } from "../../config";

const CardWrapper = styled(Card)({
  // background: "rgb(251 241 225)",
  // backgroundImage: "linear-gradient( 135deg, #EEAD92 10%, #6018DC 100%)",
  // backgroundImage: "linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)",
  // background: "rgb(15,42,181)",
  // backgroundImage: "radial-gradient(circle, rgba(15,42,181,1) 0%, rgba(210,19,58,0.4472163865546218) 100%)",
  // background: "linear-gradient(90deg, #FC466B 0%, #3F5EFB 100%)",
  background: "rgb(68,100,120)",
  backgroundImage: "linear-gradient(126deg, rgba(68,100,120,1) 0%, rgba(54,69,64,1) 100%)",

  marginBottom: 24,
});

const ButtonContainer = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    "> div": {
      marginLeft: 0,
      marginRight: 0,
    },
  },
}));

let timeout = null;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function BakeCard() {
  const { contract, wrongNetwork, getBnbBalance, fromWei, toWei, web3 } =
    useContractContext();
  const { address, chainId } = useAuthContext();
  const [contractBNB, setContractBNB] = useState(0);
  const [nativeName, setNativeName] = useState('BNB');
  const [walletBalance, setWalletBalance] = useState({
    bnb: 0,
    beans: 0,
    rewards: 0,
  });
  const [bakeBNB, setBakeBNB] = useState(0);
  const [calculatedBeans, setCalculatedBeans] = useState(0);
  const [loading, setLoading] = useState(false);
  const query = useQuery();

  const fetchContractBNBBalance = () => {
    if (!web3 || wrongNetwork) {
      setContractBNB(0);
      return;
    }
    if (parseInt(chainId) === 56) {
      setNativeName("BNB");
      getBnbBalance(config.BSC.contractAddress).then((amount) => {
        setContractBNB(fromWei(amount));
      });
    } else if (parseInt(chainId) === 3) {
      setNativeName("rETH");
      getBnbBalance(config.ROPSTEN.contractAddress).then((amount) => {
        setContractBNB(fromWei(amount));
      });
    }  else if (parseInt(chainId) === 43114) {
      setNativeName("AVAX");
      getBnbBalance(config.AVAX.contractAddress).then((amount) => {
        setContractBNB(fromWei(amount));
      });
    } else if (parseInt(chainId) === 137) {
      setNativeName("MATIC");
      getBnbBalance(config.POLYGON.contractAddress).then((amount) => {
        setContractBNB(fromWei(amount));
      });
    } else {
      setNativeName("BNB");
      getBnbBalance(config.BSC.contractAddress).then((amount) => {
        setContractBNB(fromWei(amount));
      });
    }
  };

  useEffect(() => {
    if (parseInt(chainId) === 56) {
      setNativeName("BNB");
    } else if (parseInt(chainId) === 3) {
      setNativeName("rETH")
    } else if (parseInt(chainId) === 43114) {
      setNativeName("AVAX")
    } else if (parseInt(chainId) === 137) {
      setNativeName("MATIC")
    } else {
      setNativeName("BNB")
    }
  }, [chainId]);




  const fetchWalletBalance = async () => {
    if (!web3 || wrongNetwork || !address) {
      setWalletBalance({
        bnb: 0,
        beans: 0,
        rewards: 0,
      });
      return;
    }

    try {
      const [bnbAmount, beansAmount, rewardsAmount] = await Promise.all([
        getBnbBalance(address),
        contract.methods
          .getMyMiners(address)
          .call()
          .catch((err) => {
            console.error("myminers", err);
            return 0;
          }),
        contract.methods
          .beanRewards(address)
          .call()
          .catch((err) => {
            console.error("beanrewards", err);
            return 0;
          }),
      ]);
      setWalletBalance({
        bnb: fromWei(`${bnbAmount}`),
        beans: beansAmount,
        rewards: fromWei(`${rewardsAmount}`),
      });
    } catch (err) {
      console.error(err);
      setWalletBalance({
        bnb: 0,
        beans: 0,
        rewards: 0,
      });
    }
  };

  useEffect(() => {
    fetchContractBNBBalance();
  }, [web3, chainId]);

  useEffect(() => {
    fetchWalletBalance();
  }, [address, web3, chainId]);

  const onUpdateBakeBNB = (value) => {
    setBakeBNB(value);
  };

  const getRef = () => {
    const ref = Web3.utils.isAddress(query.get("ref"))
      ? query.get("ref")
      : "0x0000000000000000000000000000000000000000";
    return ref;
  };

  const bake = async () => {
    setLoading(true);

    const ref = getRef();

    try {
      await contract.methods.buyCoals(ref).send({
        from: address,
        value: toWei(`${bakeBNB}`),
      });
    } catch (err) {
      console.error(err);
    }
    fetchWalletBalance();
    fetchContractBNBBalance();
    setLoading(false);
  };

  const reBake = async () => {
    setLoading(true);

    const ref = getRef();

    try {
      await contract.methods.hatchCoals(ref).send({
        from: address,
      });
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const eatBeans = async () => {
    setLoading(true);

    try {
      await contract.methods.sellCoals().send({
        from: address,
      });
    } catch (err) {
      console.error(err);
    }
    fetchWalletBalance();
    fetchContractBNBBalance();
    setLoading(false);
  };

  return (
    <CardWrapper>
      {loading && <LinearProgress color="secondary" />}
      <CardContent>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          mt={3}
        >
          <Typography variant="body1">Contract</Typography>
          <Typography variant="h5">{contractBNB} {nativeName}</Typography>
        </Grid>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          mt={3}
        >
          <Typography variant="body1">Wallet</Typography>
          <Typography variant="h5">{walletBalance.bnb} {nativeName}</Typography>
        </Grid>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          mt={3}
        >
          <Typography variant="body1">Your COAL</Typography>
          <Typography variant="h5">{walletBalance.beans} COAL</Typography>
        </Grid>
        <Box paddingTop={4} paddingBottom={3}>
          <Box>
            <PriceInput
              max={+walletBalance.bnb}
              value={bakeBNB}
              text={nativeName}
              onChange={(value) => onUpdateBakeBNB(value)}
            />
          </Box>
          <Box marginTop={3} marginBottom={3}>
            <Button
              variant="contained"
              color="flare"
              fullWidth
              disabled={wrongNetwork || !address || +bakeBNB === 0 || loading}
              onClick={bake}
            >
              <strong>Fill Coals Cart</strong>
            </Button>
          </Box>
          <Divider />
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            mt={3}
          >
            <Typography variant="body1" fontWeight="bolder">
              Your Rewards
            </Typography>
            <Typography variant="h5" fontWeight="bolder">
              {walletBalance.rewards} {nativeName}
            </Typography>
          </Grid>
          <ButtonContainer container>
            <Grid item flexGrow={1} marginRight={1} marginTop={3}>
              <Button
                variant="contained"
                color="flare"
                fullWidth
                disabled={wrongNetwork || !address || loading}
                onClick={reBake}
              >
                <strong>MINE COAL</strong>
              </Button>
            </Grid>
            <Grid item flexGrow={1} marginLeft={1} marginTop={3}>
              <Button
                variant="contained"
                color="flare"
                fullWidth
                disabled={wrongNetwork || !address || loading}
                onClick={eatBeans}
              >
                <strong>SELL COAL</strong>
              </Button>
            </Grid>
          </ButtonContainer>
        </Box>
      </CardContent>
    </CardWrapper>
  );
}
