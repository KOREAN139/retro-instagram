import './index.scss';

import React from 'react';

interface PageContainerProps {}

export type Props = PageContainerProps & React.HTMLAttributes<HTMLDivElement>;

const PageContainer: React.FC<Props> = (props: Props) => {
  const { children } = props;
  return <div className='Page-container'>{children}</div>;
};
export default PageContainer;
