import { Document as RichTextDocument } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { ReactNode } from "react";
import Image from "next/image";

type RichTextProps = {
  document: RichTextDocument | null;
};

const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_node: any, children: ReactNode) => (
      <p className="text-lg my-1 whitespace-pre-wrap break-words">{children}</p>
    ),
    [BLOCKS.HEADING_2]: (_node: any, children: ReactNode) => (
      <h2 className="text-2xl border-l-primary mt-10 mb-5">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (_node: any, children: ReactNode) => (
      <h3 className="text-xl mt-8">{children}</h3>
    ),
    [BLOCKS.UL_LIST]: (_node: any, children: ReactNode) => (
      <ul className="list-disc pl-8">{children}</ul>
    ),
    [BLOCKS.LIST_ITEM]: (_node: any, children: ReactNode) => {
      return <li className="text-lg p-2 w-full">{children}</li>;
    },
    [BLOCKS.OL_LIST]: (_node: any, children: ReactNode) => (
      <ol className="list-decimal pl-8">{children}</ol>
    ),
    [INLINES.HYPERLINK]: (node: any, children: ReactNode) => {
      return (
        <a
          href={node.data.uri}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          {children}
        </a>
      );
    },
    [BLOCKS.EMBEDDED_ENTRY]: (node: any) => {
      return (
        <div className="w-full my-4">
          <Image
            alt={node.data.target.fields.image.fields.title}
            src={"https:" + node.data.target.fields.image.fields.file.url}
            width="1500"
            height="1500"
            objectFit="contain"
            style={{ objectFit: "contain" }}
          />
        </div>
      );
    },
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      const src = "https:" + node.data.target.fields.file.url;
      const height = node.data.target.fields.file.details.height;
      const width = node.data.target.fields.file.details.width;
      return <img src={src} width={width} height={height} />;
    },
  },
};

function RichText({ document }: RichTextProps) {
  if (!document) {
    return null;
  }

  return <>{documentToReactComponents(document, options)}</>;
}

export default RichText;
