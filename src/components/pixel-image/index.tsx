import { setPixelizedUrl } from '@ducks/instagram';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';

import './index.scss';

interface PixelImageProps {
  type: string;
  source: string;
  pixelized: boolean;
  centered?: boolean;
  pixelPerLine?: number;
  index?: number;

  onClick?: () => void;
}

export type Props = PixelImageProps &
  React.HTMLAttributes<HTMLCanvasElement | HTMLImageElement>;

const PixelImage: React.FC<Props> = (props: Props) => {
  const {
    source,
    pixelized,
    type,
    index,
    centered,
    pixelPerLine: ppl,
    onClick,
    children,
  } = props;

  const dispatch = useDispatch();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  if (pixelized) {
    if (onClick) {
      return (
        <img
          src={source}
          alt=''
          onClick={onClick}
          role='presentation'
          className='Pixel-image'
          onKeyUp={() => {}}
        />
      );
    }

    return <img src={source} alt='' className='Pixel-image' />;
  }

  const image = new Image();
  image.src = source;
  image.crossOrigin = 'Anonymous';
  // pixelize image
  image.onload = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext('2d')!;
    const { width, height } = image;

    const lineLength = centered
      ? Math.min(width, height)
      : Math.max(width, height);
    const diff = Math.abs(width - height) / 2;

    context.canvas.width = lineLength;
    context.canvas.height = lineLength;
    if (centered) {
      context.drawImage(
        image,
        width > height ? diff : 0,
        width > height ? 0 : diff,
        lineLength,
        lineLength,
        0,
        0,
        lineLength,
        lineLength
      );
    } else {
      context.drawImage(
        image,
        width > height ? 0 : -diff,
        width > height ? -diff : 0,
        lineLength,
        lineLength,
        0,
        0,
        lineLength,
        lineLength
      );
    }

    const pixelPerLine = ppl || 100;
    const pixelSize = Math.round(lineLength / pixelPerLine);

    for (let x = 0; x < lineLength; x += pixelSize) {
      for (let y = 0; y < lineLength; y += pixelSize) {
        const rgba = context.getImageData(x, y, 1, 1).data;
        const red = Math.round((rgba[0] * 8) / 255) * 32 - 1;
        const green = Math.round((rgba[1] * 8) / 255) * 32 - 1;
        const blue = Math.round((rgba[2] * 4) / 255) * 64 - 1;
        context.fillStyle = `rgb(${red},${green},${blue})`;
        context.fillRect(x, y, pixelSize, pixelSize);
      }
    }

    const pixelizedMediaUrl = canvas.toDataURL();
    dispatch(setPixelizedUrl(type, pixelizedMediaUrl, index));
  };

  return (
    <canvas className='Pixel-image' ref={canvasRef} onClick={onClick}>
      {children}
    </canvas>
  );
};

export default PixelImage;
