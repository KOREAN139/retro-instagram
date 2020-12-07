import React from 'react';

import './index.scss';

interface PageContainerProps {}

export type Props = PageContainerProps & React.HTMLAttributes<HTMLDivElement>;

const PageContainer: React.FC<Props> = (props: Props) => {
  const { children } = props;
  return <div className='Page-container'>{children}</div>;
};
export default PageContainer;
