"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function PhotoUpload() {
  const [photos, setPhotos] = useState<File[]>([]);
  const [urls, setUrls] = useState<{ url: string; key: string }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const urlsRef = useRef<string[]>([]);

  useEffect(() => {
    return () => urlsRef.current.forEach((url) => URL.revokeObjectURL(url));
  }, []);

  const rebuildUrls = (files: File[]) => {
    urlsRef.current = files.map((f) => URL.createObjectURL(f));
    setUrls(
      files.map((f, i) => ({
        url: urlsRef.current[i],
        key: `${f.name}-${f.lastModified}`,
      }))
    );
  };

  const pick = (files: FileList | null) => {
    if (!files) return;
    const next = [...photos, ...Array.from(files)];
    setPhotos(next);
    rebuildUrls(next);
  };

  const remove = (key: string) => {
    const idx = urls.findIndex((u) => u.key === key);
    if (idx >= 0) URL.revokeObjectURL(urls[idx].url);
    const next = photos.filter((_, i) => i !== idx);
    setPhotos(next);
    rebuildUrls(next);
  };

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = "copy";
        }}
        onDrop={(e) => {
          e.preventDefault();
          pick(e.dataTransfer.files);
        }}
        className="cursor-pointer rounded border-2 border-dashed border-zinc-400 bg-white p-6 text-center outline-none transition focus:border-blue-700"
      >
        <p className="text-sm font-medium text-zinc-700">
          Drop photos here or click to browse
        </p>
        <p className="mt-1 text-xs text-zinc-500">You can select multiple images</p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => pick(e.target.files)}
      />
      {photos.length > 0 && (
        <p className="mt-2 text-sm text-zinc-600">
          {photos.length} {photos.length === 1 ? "photo" : "photos"} selected
        </p>
      )}
      {urls.length > 0 && (
        <div className="mt-4 grid grid-cols-4 gap-2">
          {urls.map(({ url, key }) => (
            <div key={key} className="relative aspect-square">
              <Image
                src={url}
                alt="Selected vehicle photo"
                width={160}
                height={160}
                className="h-full w-full rounded border border-zinc-200 object-cover"
              />
              <button
                type="button"
                onClick={() => remove(key)}
                aria-label="Remove photo"
                className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900 text-sm leading-none text-white shadow transition hover:bg-red-600"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}