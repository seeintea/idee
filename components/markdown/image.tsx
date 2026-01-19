import NextImage, { type ImageProps as NextImageProps } from "next/image";
import { twMerge } from "tailwind-merge";

const cdnPrefix = "https://seeintea.github.io/static/images";

interface ImageProps extends NextImageProps {
  container?: string;
  cdn?: boolean;
}

export function Image({ container, cdn, src, ...rest }: ImageProps) {
  const imageUrl = cdn ? `${cdnPrefix}${src}` : src;

  return (
    <div className={twMerge("relative not-prose", "aspect-square", container)}>
      <NextImage
        {...rest}
        src={imageUrl}
        fill
        loading="eager"
        className={twMerge(rest.className, "object-cover")}
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
}
