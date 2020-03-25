import React, { useRef } from 'react';
import './index.scss';
import { useDispatch } from 'react-redux';
import { setPixelizedUrl } from '../../ducks/instagram';

interface PixelImageProps {
  type: string
  source: string
  pixelized: boolean
  centered?: boolean
  pixelPerLine?: number
  index?: number
}

export type Props = PixelImageProps & React.HTMLAttributes<HTMLCanvasElement>;

const PixelImage: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const {
    source,
    pixelized,
    type,
    index,
    centered,
    pixelPerLine: ppl,
    ...otherProps
  } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  let image = new Image();
  image.src = source;
  image.crossOrigin = 'Anonymous';
  // pixelize image
  image.onload = () => {
    let canvas = canvasRef.current!;
    const context = canvas.getContext('2d')!;
    const { width, height } = image;

    let lineLength = centered ? Math.min(width, height)
                                : Math.max(width, height);
    const diff = Math.abs(width - height) / 2;

    context.canvas.width = lineLength;
    context.canvas.height = lineLength;
    context.drawImage(image,
      centered ? width > height ? diff : 0 : width > height ? 0 : -diff,
      centered ? width > height ? 0 : diff : width > height ? -diff : 0,
      lineLength, lineLength,
      0, 0,
      lineLength, lineLength,
    );

    if (!pixelized) {
      let pixelPerLine = ppl ? ppl : 100;
      let pixelSize = Math.round(lineLength / pixelPerLine);

      for (let x = 0; x < lineLength; x += pixelSize) {
        for (let y = 0; y < lineLength; y += pixelSize) {
          const rgba = context.getImageData(x, y, 1, 1).data;
          const red = Math.round(rgba[0] * 8 / 255) * 32 - 1;
          const green = Math.round(rgba[1] * 8 / 255) * 32 - 1;
          const blue = Math.round(rgba[2] * 4 / 255) * 64 - 1;
          context.fillStyle = `rgb(${red},${green},${blue})`;
          context.fillRect(x, y, pixelSize, pixelSize);
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
