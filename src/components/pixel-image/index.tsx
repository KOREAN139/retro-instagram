import React, { useRef } from 'react';
import './index.scss';
import { useDispatch } from 'react-redux';
import { setPixelizedUrl } from '../../ducks/instagram';

interface PixelImageProps {
  type: string
  source: string
  pixelized: boolean
  index?: number
}

export type Props = PixelImageProps & React.HTMLAttributes<HTMLCanvasElement>;

const PixelImage: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const { source, pixelized, type, index, ...otherProps } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  let image = new Image();
  image.src = source;
  image.crossOrigin = 'Anonymous';
  // pixelize image
  image.onload = () => {
    let canvas = canvasRef.current!;
    const context = canvas.getContext('2d')!;
    const { width, height } = image;
    context.canvas.width = height;
    context.canvas.height = height;
    const sx = (width - height) / 2;
    context.drawImage(image,
      sx, 0,
      height, height,
      0, 0,
      height, height,
    );

    if (!pixelized) {
      for (let x = 0; x < width; x += 5) {
        for (let y = 0; y < height; y += 5) {
          const rgba = context.getImageData(x, y, 1, 1).data;
          const red = Math.round(rgba[0] * 8 / 255) * 32 - 1;
          const green = Math.round(rgba[1] * 8 / 255) * 32 - 1;
          const blue = Math.round(rgba[2] * 4 / 255) * 64 - 1;
          context.fillStyle = `rgb(${red},${green},${blue})`;
          context.fillRect(x, y, 5, 5);
        }
      }

      const pixelizedMediaUrl = canvas.toDataURL();
      dispatch(setPixelizedUrl(type, pixelizedMediaUrl, index));
    }
  };

  return (
    <canvas
      className={'Pixel-image'}
      ref={canvasRef}
      {...otherProps}
    >
      {props.children}
    </canvas>
  );
};

export default PixelImage;
