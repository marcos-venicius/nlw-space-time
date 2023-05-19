"use client";

import React from "react";

type Props = {
  id?: string;
  accept?: string;
};

export function MediaPicker({ accept, id = "attach-media" }: Props) {
  const [mediaPreview, setMediaPreview] = React.useState<string | null>(null);

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
