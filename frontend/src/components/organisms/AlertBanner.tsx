import Link from "next/link";

const AleartBanner = () => {
  return (
    <div className="flex bg-secondary h-10 items-center justify-center">
      <Link href="/marketplace">
        <p className="text-white text-center">
          {`Do you need a MVP urgently? If so, let's find an existing one from the
          marketplace.`}
        </p>
      </Link>
    </div>
  );
};

export default AleartBanner;
