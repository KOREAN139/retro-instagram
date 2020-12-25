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

export const overlay = () => css`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 39;
`;

export const modalContainer = () => css`
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 6px;
  transform: translate(-50%, -50%);
  z-index: 139;
`;
