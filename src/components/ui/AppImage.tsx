"use client";
import Image from "next/image";
import { useState } from "react";

interface AppImageProps {
  src: string;
  alt?: string;
  title?: string;
  className?: string;
  height: number;
  width: number;
}

const AppImage: React.FC<AppImageProps> = ({
  src,
  alt = "image",
  title = undefined,
  className,
  height,
  width,
}) => {
  const placeholderSrc = "https://cdn.add.app/static/placeholder.webp";
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const isImageUrl = /\.(jpg|jpeg|png|gif|bmp|webp|avif|svg)$/.test(src);

  const handleError = () => {
    setImgSrc(placeholderSrc);
    setIsLoaded(true);
    setHasError(true);
  };

  return (
    <Image
      src={isImageUrl ? imgSrc : placeholderSrc}
      alt={alt}
      title={title}
      height={height}
      width={width}
      onError={handleError}
      className={` ${className || ""} transition-all duration-300 ease-in-out ${
        isLoaded ? "blur-0" : "blur-2xl"
      } ${hasError ? "opacity-50" : ""} `}
      blurDataURL={placeholderSrc}
      placeholder="blur"
      style={{
        opacity: isLoaded ? 1 : 0,
      }}
      onLoad={() => {
        setImgSrc(src);
        setIsLoaded(true);
        setHasError(false);
      }}
    />
  );
};

export default AppImage;
