import React from 'react';
import classnames from 'classnames';
import './index.scss';
import Header from '@components/header';

interface PageProps {
  title: string
  loaded: boolean
  backButton?: boolean
  reloadButton?: boolean
}

export type Props = PageProps & React.HTMLAttributes<HTMLDivElement>;

const Page: React.FC<Props> = (props) => {
  const { title, loaded } = props;

  return (
    <div className={classnames(
      'Page',
      { 'On-loading': !loaded },
    )}>
      <Header {...props} />
      {props.children}
    </div>
  );
};

export default Page;

