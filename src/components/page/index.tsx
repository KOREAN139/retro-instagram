import React from 'react';
import './index.scss';
import Header from '../header';

interface PageProps {
  title: string
}

export type Props = PageProps & React.HTMLAttributes<HTMLDivElement>;

const Page: React.FC<Props> = (props) => {
  return (
    <div className={'Page'}>
      <Header title={props.title} />
      {props.children}
    </div>
  );
};

export default Page;

