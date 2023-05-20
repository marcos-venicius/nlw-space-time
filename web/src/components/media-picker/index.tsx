"use client";

import React from "react";

type Props = {
  id?: string;
  accept?: string;
  initialMedia?: string;
};

export function MediaPicker({
  accept,
  id = "attach-media",
  initialMedia,
}: Props) {
  const [mediaPreview, setMediaPreview] = React.useState<string | null>(
    initialMedia || null
  );

  function onMediaSelected(event: React.ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;

    if (!!files && files.length > 0) {
      const mediaBlobUrl = URL.createObjectURL(files[0]);

      setMediaPreview(mediaBlobUrl);
    }
  }

  return (
    <>
      <input
        hidden
        type="file"
        name={id}
        id={id}
        accept={accept}
        onChange={onMediaSelected}
      />

      {mediaPreview && (
        <img
          src={mediaPreview}
          alt=""
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}
    </>
  );
}
