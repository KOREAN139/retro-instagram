/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/react';
import backgroundPattern from '@static/background-pattern.png';
import pointerCursor from '@static/cursor-pointer.png';
import { activeButtonShadow, defaultButtonShadow } from '@styles/mixins';
import React, { useRef } from 'react';

interface ButtonProps {
  id?: string;
  selected?: boolean;
  disabled?: boolean;
  text?: string;
  customStyle?: SerializedStyles;
  onClick?: () => void;
}

export type Props = ButtonProps & React.HTMLAttributes<HTMLDivElement>;

const Button: React.FC<Props> = (props: Props) => {
  const {
    id,
    selected,
    text,
    disabled,
    customStyle,
    onClick,
    children,
  } = props;
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    buttonRef.current!.focus();
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      className='Button'
      id={id}
      role='button'
      tabIndex={0}
      ref={buttonRef}
      onClick={handleClick}
      onKeyUp={() => {}}
      css={[
        defaultButtonShadow(),
        css`
          display: flex;
          cursor: url(${pointerCursor}), pointer;
          align-items: center;
          justify-content: center;
          background-image: url(${backgroundPattern});

          &:focus {
            outline: 1px dotted black;
            outline-offset: -4px;
          }

          &:active {
            ${!disabled && [
              activeButtonShadow(),
              `
              background-color: white;
              background-image:
                linear-gradient(45deg, #bdbdbd 25%, transparent 25%),
                linear-gradient(-45deg, #bdbdbd 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, #bdbdbd 75%),
                linear-gradient(-45deg, transparent 75%, #bdbdbd 75%);
              background-size: 2px 2px;
            `,
            ]}
          }

          ${!disabled &&
          selected && [
            activeButtonShadow(),
            `
              background-color: white;
              background-image:
                linear-gradient(45deg, #bdbdbd 25%, transparent 25%),
                linear-gradient(-45deg, #bdbdbd 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, #bdbdbd 75%),
                linear-gradient(-45deg, transparent 75%, #bdbdbd 75%);
              background-size: 2px 2px;
            `,
          ]}
        `,
        customStyle,
      ]}
    >
      {children}
      {text}
    </div>
  );
};

export default Button;
