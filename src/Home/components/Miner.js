import { styled } from "@mui/system";

import Connect from "./Connect";
import Header from "./Header";
import BakeCard from "./BakeCard";
import NutritionFacts from "./NutritionFacts";
import ReferralLink from "./ReferralLink";
import { useAuthContext } from "../../providers/AuthProvider";
import Footer from "./Footer";
import FAQs from "./FAQ";
import TwitterFeed from "./TwitterFeed";

const Wrapper = styled("div")(({ theme }) => ({
  maxWidth: 400,
  margin: "0 auto",
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
  },
}));

export default function Home() {
  const { address } = useAuthContext();

  return (
    <Wrapper>
      <Connect />
      <Header />
      <BakeCard />
      <NutritionFacts />
      <ReferralLink address={address} />
      <FAQs />
      <Footer />
    </Wrapper>
  );
}