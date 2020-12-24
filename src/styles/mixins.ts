import { css } from '@emotion/react';

export const dividerTopShadow = (width = 1) => css`
  box-shadow: inset 0 ${width * 1}px 0 0 rgba(0, 0, 0, 1),
    inset 0 ${width * 2}px 0 0 rgba(255, 255, 255, 1);
`;

export const dividerBottomShadow = (width = 1) => css`
  box-shadow: inset 0 ${width * -1}px 0 0 rgba(255, 255, 255, 1),
    inset 0 ${width * -2}px 0 0 rgba(0, 0, 0, 1);
`;

export const dividerTopBottomShadow = (width = 1) => css`
  box-shadow: inset 0 ${width * 1}px 0 0 rgba(0, 0, 0, 1),
    inset 0 ${width * 2}px 0 0 rgba(255, 255, 255, 1),
    inset 0 ${width * -1}px 0 0 rgba(255, 255, 255, 1),
    inset 0 ${width * -2}px 0 0 rgba(0, 0, 0, 1);
`;

export const mediaBoxShadow = (width = 1) => css`
  box-shadow: inset 0 ${width * -1}px 0 0 rgba(255, 255, 255, 1),
    inset 0 ${width * 1}px 0 0 rgba(127, 127, 127, 1),
    inset 0 ${width * -2}px 0 0 rgba(224, 224, 224, 1),
    inset 0 ${width * 2}px 0 0 rgba(0, 0, 0, 1);
`;

export const defaultBoxShadow = (width = 1) => css`
  box-shadow: inset ${width * -1}px ${width * -1}px 0 0 rgba(0, 0, 0, 1),
    inset ${width * 1}px ${width * 1}px 0 0 rgba(224, 224, 224, 1),
    inset ${width * -2}px ${width * -2}px 0 0 rgba(127, 127, 127, 1),
    inset ${width * 2}px ${width * 2}px 0 0 rgba(255, 255, 255, 1);
`;

export const scrollableBoxShadow = (width = 1) => css`
  box-shadow: inset ${width * -1}px ${width * -1}px 0 0 rgba(255, 255, 255, 1),
    inset ${width * 1}px ${width * 1}px 0 0 rgba(127, 127, 127, 1),
    inset ${width * -2}px ${width * -2}px 0 0 rgba(224, 224, 224, 1),
    inset ${width * 2}px ${width * 2}px 0 0 rgba(0, 0, 0, 1);
`;

export const defaultButtonShadow = (width = 1) => css`
  box-shadow: inset ${width * -1}px ${width * -1}px 0 0 rgba(0, 0, 0, 1),
    inset ${width * 1}px ${width * 1}px 0 0 rgba(255, 255, 255, 1),
    inset ${width * -2}px ${width * -2}px 0 0 rgba(127, 127, 127, 1),
    inset ${width * 2}px ${width * 2}px 0 0 rgba(224, 224, 224, 1);
`;

export const activeButtonShadow = (width = 1) => css`
  box-shadow: inset ${width * -1}px ${width * -1}px 0 0 rgba(255, 255, 255, 1),
    inset ${width * 1}px ${width * 1}px 0 0 rgba(0, 0, 0, 1),
    inset ${width * -2}px ${width * -2}px 0 0 rgba(224, 224, 224, 1),
    inset ${width * 2}px ${width * 2}px 0 0 rgba(127, 127, 127, 1),
    inset 0 ${width * 3}px 0 0 rgba(255, 255, 255, 1);
`;
