import React from 'react';
import classnames from 'classnames';
import './index.scss';
import Header from '../header';

interface PageProps {
  title: string
  loaded: boolean
}

export type Props = PageProps & React.HTMLAttributes<HTMLDivElement>;

const Page: React.FC<Props> = (props) => {
  const { title, loaded } = props;

  return (
    <div className={classnames(
      'Page',
      { 'On-loading': !loaded },
    )}>
      <Header title={title} />
      {props.children}
    </div>
  );
};

export default Page;

