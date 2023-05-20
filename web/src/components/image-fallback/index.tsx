"use client";

import Image, { ImageProps } from "next/image";
import React from "react";

type Props = ImageProps & {
  fallback?: string;
};

export function ImageFallback({ fallback, src, ...props }: Props) {
  const [source, setSource] = React.useState(src);

  return (
    <Image
      src={source}
      {...props}
      onError={() => {
        if (fallback) {
          setSource(fallback);
        }
      }}
    />
  );
}
