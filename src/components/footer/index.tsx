import React from 'react';
import './index.scss';
import Button from '../../components/button';

interface FooterProps {
}

export type Props = FooterProps & React.HTMLAttributes<HTMLDivElement>;

const Footer: React.FC<Props> = (props) => {
  return (
    <div className={'Footer'}>
      <div className={'Footer__Pages'}>
        <Button
          location={'Footer'}
        />
        <Button
          location={'Footer'}
        />
        <Button
          location={'Footer'}
        />
        <Button
          location={'Footer'}
        />
        <Button
          location={'Footer'}
        />
      </div>
    </div>
  );
};

export default Footer;

