import { Expert as ExpertType } from "@/contentful/expert";
import Expert from "./Expert";

type FinderSingleExpertType = {
  expert: ExpertType;
};
const FinderSingleExpert = ({ expert }: FinderSingleExpertType) => {
  return (
    <div className="flex justify-center mt-12">
      <Expert expert={expert} />
    </div>
  );
};

export default FinderSingleExpert;
