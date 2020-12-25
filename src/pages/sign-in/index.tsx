/** @jsx jsx */
import Button from '@components/button';
import Icon from '@components/icon';
import TitleBar from '@components/title-bar';
import { signInInstagram } from '@ducks/instagram';
import { css, jsx } from '@emotion/react';
import backgroundPattern from '@static/background-pattern.png';
import logoWithWindows from '@static/logo-with-windows.gif';
import { activeButtonShadow, defaultBoxShadow } from '@styles/mixins';
import { modalContainer, overlay } from '@styles/placeholders';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

interface Props {
  onClickClose: () => void;
}

interface signInFormData {
  username: string;
  password: string;
}

const inputContainerStyle = css`
  width: 75%;
  display: flex;
  align-self: center;
  font-size: 13px;
  justify-items: center;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 5px;

  span {
    width: 36%;
  }
`;

const inputStyle = css`
  flex: 1;
  font-family: W95FA;
  border: none;
  padding: 2.5px;

  &:focus {
    outline: none;
  }
`;

const buttonStyle = css`
  font-size: 12px;
  width: 65px;
  height: 20px;
`;

const SignIn: React.FC<Props> = (props: Props) => {
  const { onClickClose } = props;

  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<signInFormData>();

  const onSubmit = async ({ username, password }: signInFormData) => {
    await dispatch(signInInstagram(username, password));
    props.onClickClose();
  };

  return (
    <React.Fragment>
      <div
        className='Sign-in-page-overlay'
        css={[
          overlay,
          css`
            background-color: rgba(0, 0, 0, 0.7);
          `,
        ]}
      />
      <div
        className='Sign-in-page-container'
        css={[
          defaultBoxShadow(1.6),
          modalContainer,
          css`
            display: flex;
            flex-direction: column;
            width: 80%;

            background-image: url(${backgroundPattern});
          `,
        ]}
      >
        <TitleBar
          displayIcon
          location='Sign-in'
          title='Log On to Instagram'
          onClickClose={onClickClose}
        />
        <Icon
          icon={logoWithWindows}
          customStyle={css`
            height: 80px;
          `}
        />
        <div
          className='Sign-in-page-container__Input'
          css={inputContainerStyle}
        >
          <span>{`User name: `}</span>
          <input
            name='username'
            ref={register({
              required: 'Required',
            })}
            css={[activeButtonShadow(0.8), inputStyle]}
          />
        </div>
        <div
          className='Sign-in-page-container__Input'
          css={inputContainerStyle}
        >
          <span>{`Password: `}</span>
          <input
            name='password'
            type='password'
            ref={register({
              required: 'Required',
            })}
            css={[activeButtonShadow(0.8), inputStyle]}
          />
        </div>
        <div
          className='Sign-in-page-container__Buttons'
          css={css`
            width: 95%;
            display: flex;
            align-self: center;
            margin-top: 5px;
            margin-bottom: 4px;
            justify-content: flex-end;

            .Button + .Button {
              margin-left: 4px;
            }
          `}
        >
          <Button
            id='Ok'
            text='OK'
            onClick={handleSubmit(onSubmit)}
            customStyle={buttonStyle}
          />
          <Button
            id='Cancel'
            text='Cancel'
            onClick={onClickClose}
            customStyle={buttonStyle}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignIn;
