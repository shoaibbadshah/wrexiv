import Heading from "./Heading";

type DescriptionProps = {
  children: string;
};
const Description = (props: DescriptionProps) => {
  return (
    <p className="mt-2 text-lg leading-8 text-gray-600">{props.children}</p>
  );
};
export default Description;
