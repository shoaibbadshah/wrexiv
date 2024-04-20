import Description from "../_ui/Description";
import Heading from "../_ui/Heading";
import { Expert as ExpertType } from "@/contentful/expert";
import Expert from "./Expert";

type FinderExpertsProps = {
  experts: ExpertType[];
};
const FinderExperts = ({ experts }: FinderExpertsProps) => {
  return (
    <div className="mt-12 max-w-3xl mx-auto">
      <Heading level={2} link="/finder/experts">
        Experts
      </Heading>
      <Description>
        Sit facilis neque ab nulla vel. Cum eos in laudantium. Temporibus eos
        totam in dolorum. Nemo vel facere repellendus ut eos dolores similique.
      </Description>

      <ul
        role="list"
        className="mx-auto mt-20 max-w-2xl grid grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
      >
        {experts.map(expert => (
          <li key={expert.id}>
            <Expert expert={expert} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FinderExperts;
