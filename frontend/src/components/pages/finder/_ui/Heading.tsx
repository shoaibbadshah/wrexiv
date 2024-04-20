import Link from "next/link";

type HeadingProps = {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  link?: string;
};

export default function Heading(props: HeadingProps) {
  const { level, children, link } = props;

  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

  const getClassName = (level: number) => {
    switch (level) {
      case 1:
        return "text-6xl font-bold tracking-tight text-gray-900 sm:text-7xl";
      case 2:
        return "text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl";
      case 3:
        return "text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl";
      case 4:
        return "text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl";
      case 5:
        return "text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl";
      case 6:
        return "text-xl font-bold tracking-tight text-gray-900 sm:text-2xl";
      default:
        return "";
    }
  };

  const className = getClassName(level);

  return (
    <HeadingTag className={className}>
      {link ? (
        <Link href={link} passHref>
          {children}
        </Link>
      ) : (
        children
      )}
    </HeadingTag>
  );
}
