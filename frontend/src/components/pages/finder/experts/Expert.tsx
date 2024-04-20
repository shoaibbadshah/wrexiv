import { Expert as ExpertDetailType } from "@/contentful/expert";
import Link from "next/link";
import Image from "next/image";

const Expert = ({ expert }: { expert: ExpertDetailType }) => {
  return (
    <Link href={`/finder/experts/${expert.id}`}>
      <div className="flex items-center flex-col">
        <div className="relative w-24 h-24">
          <Image
            className="mx-auto h-24 w-24 rounded-full object-cover"
            src={`http:${expert.image?.src}`}
            alt={expert.name}
            fill={true}
          />
        </div>
        <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">
          {expert.name}
        </h3>
        <p className="text-sm leading-6 text-gray-600">{expert.title}</p>
      </div>
    </Link>
  );
};

export default Expert;
