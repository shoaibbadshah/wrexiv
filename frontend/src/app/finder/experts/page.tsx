import FinderExperts from "@/components/pages/finder/experts/FinderExperts";
import { fetchExperts } from "@/contentful/expert";

const FinderExpersPage = async () => {
  const experts = await fetchExperts();

  return <FinderExperts experts={experts} />;
};

export default FinderExpersPage;
