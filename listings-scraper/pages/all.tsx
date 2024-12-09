import AllListings from "@components/AllListings";
import { useRouter } from "next/router";

const IndexPage: React.FC = () => {
  return (
    <div className="my-10">
      <AllListings />
    </div>
  );
};

export default IndexPage;
