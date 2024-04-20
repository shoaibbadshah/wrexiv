import Image from "next/image";

export default function ImageSection() {
  return (
    <div className="mt-32 sm:mt-40 xl:mx-auto xl:max-w-7xl xl:px-8">
      <Image
        src="/japan/japan6.jpg"
        alt=""
        className="aspect-[5/2] w-full object-cover xl:rounded-3xl"
        width={2832}
        height={1416}
      />
    </div>
  );
}
