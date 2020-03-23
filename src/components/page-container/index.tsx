import React from 'react';
import './index.scss';

interface PageContainerProps {
}

export type Props = PageContainerProps & React.HTMLAttributes<HTMLDivElement>;

const PageContainer: React.FC<Props> = (props) => {
  return (
    <div className={'Page-container'}>
      {props.children}
    </div>
  );
}
export default PageContainer;
