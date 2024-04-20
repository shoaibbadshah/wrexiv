import { Entry, UnresolvedLink } from "contentful";
import { TypeComponentRichImageSkeleton } from "./types";

type AssetImageEntry = {
  src: string;
};

export function parseAssetImage(
  richImageEntry:
    | Entry<TypeComponentRichImageSkeleton>
    | UnresolvedLink<"Entry">
): AssetImageEntry | null {
  if (
    "sys" in richImageEntry &&
    richImageEntry.sys.type === "Entry" &&
    "fields" in richImageEntry
  ) {
    if (
      "sys" in richImageEntry &&
      richImageEntry.sys.type === "Entry" &&
      "fields" in richImageEntry
    ) {
      const imageAsset = richImageEntry.fields.image;
      if (
        imageAsset &&
        "fields" in imageAsset &&
        imageAsset.fields &&
        "file" in imageAsset.fields
      ) {
        console.log(imageAsset.fields.file);
        const imageUrl =
          typeof imageAsset.fields.file?.url === "string"
            ? imageAsset.fields.file?.url
            : imageAsset.fields.file?.url?.url || "";
        const secureImageUrl = imageUrl.startsWith("//")
          ? `https:${imageUrl}`
          : imageUrl;
        return {
          src: secureImageUrl,
        };
      }
    }
  }

  return null;
}
