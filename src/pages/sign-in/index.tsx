import React from 'react';
import './index.scss';
import { useForm } from 'react-hook-form';
import TitleBar from '../../components/title-bar';
import Button from '../../components/button';

interface Props {
  onClickClose: () => void
  onSubmit?: () => void
}

const SignIn: React.FC<Props> = (props) => {
  const { onClickClose } = props;

  const { register } = useForm();

  return (
    <>
      <div className={'Sign-in-page-overlay'} />
      <div className={'Sign-in-page-container'}>
        <TitleBar
          location={'Sign-in'}
          title={'Log On to Instagram'}
          onClickClose={onClickClose}
        />
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
            onClick={onClickClose}
          />
          <Button
            location={'Sign-in'}
            text={'Cancel'}
            onClick={onClickClose}
          />
        </div>
      </div>
    </>
  );
};

export default SignIn;
