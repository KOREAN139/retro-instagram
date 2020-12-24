import { css } from '@emotion/react';

export const scrollableBoxContainer = () => css`
  display: flex;
  flex-direction: column;
  font-size: 0;
  height: 0;
`;

export const scrollableBoxVertical = () => css`
  flex: 1;
  overflow-y: scroll;
`;
