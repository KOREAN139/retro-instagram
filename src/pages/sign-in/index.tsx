import Button from '@components/button';
import TitleBar from '@components/title-bar';
import { signInInstagram } from '@ducks/instagram';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import './index.scss';

interface Props {
  onClickClose: () => void;
}

interface signInFormData {
  username: string;
  password: string;
}

const SignIn: React.FC<Props> = (props: Props) => {
  const { onClickClose } = props;

  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<signInFormData>();

  const onSubmit = async ({ username, password }: signInFormData) => {
    await dispatch(signInInstagram(username, password));
    props.onClickClose();
  };

  return (
    <>
      <div className='Sign-in-page-overlay' />
      <div className='Sign-in-page-container'>
        <TitleBar
          displayIcon
          location='Sign-in'
          title='Log On to Instagram'
          onClickClose={onClickClose}
        />
        <div className='Sign-in-page-container__Logo' />
        <div className='Sign-in-page-container__Input'>
          <span>{`User name: `}</span>
          <input
            name='username'
            ref={register({
              required: 'Required',
            })}
          />
        </div>
        <div className='Sign-in-page-container__Input'>
          <span>{`Password: `}</span>
          <input
            name='password'
            type='password'
            ref={register({
              required: 'Required',
            })}
          />
        </div>
        <div className='Sign-in-page-container__Buttons'>
          <Button id='Ok' text='OK' onClick={handleSubmit(onSubmit)} />
          <Button id='Cancel' text='Cancel' onClick={onClickClose} />
        </div>
      </div>
    </>
  );
};

export default SignIn;
