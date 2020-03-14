import React from 'react';
import './index.scss';
import { useForm } from 'react-hook-form';
import TitleBar from '../../components/title-bar';
import Button from '../../components/button';

interface Props {
  onSubmit?: () => void
}

const SignIn: React.FC<Props> = (props) => {
  const { onSubmit } = props;

  const { register } = useForm();

  return (
    <>
      <div className={'Sign-in-page-overlay'} />
      <div className={'Sign-in-page-container'}>
        <TitleBar />
        <div className={'Sign-in-page-container__Logo'} />
        <div className={'Sign-in-page-container__Input'}>
          <span>
            {`User name: `}
          </span>
          <input
            name={'username'}
            ref={register({
              required: 'Required',
            })}
          />
        </div>
        <div className={'Sign-in-page-container__Input'}>
          <span>
            {`Password: `}
          </span>
          <input
            name={'password'}
            type={'password'}
            ref={register({
              required: 'Required',
            })}
          />
        </div>
        <div className={'Sign-in-page-container__Buttons'}>
          <Button
            location={'Sign-in'}
            text={'OK'}
            onClick={onSubmit}
          />
          <Button
            location={'Sign-in'}
            text={'Cancel'}
            onClick={onSubmit}
          />
        </div>
      </div>
    </>
  );
};

export default SignIn;
