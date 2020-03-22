import React, { useRef } from 'react';
import './index.scss';

interface PixelImageProps {
  source: string
}

export type Props = PixelImageProps & React.HTMLAttributes<HTMLCanvasElement>;

const PixelImage: React.FC<Props> = (props) => {
  const { source, ...otherProps } = props;
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
