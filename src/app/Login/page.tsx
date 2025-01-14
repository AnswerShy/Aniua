'use client';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Section } from '@/components/Shared/SharedComponents';
import { CustomButtonStyles } from '@/components/Shared/SharedComponents';
import { TextField } from '@/components/Shared/SharedComponents';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/store';
import { i18n } from '@/utils/customUtils';

export default function Login() {
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<LoginForms>({
    mode: 'onBlur',
  });

  const handleLogin: SubmitHandler<LoginForms> = async (data) => {
    const { username, password } = data;

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const resJson = await res.json();
        if (resJson.success) {
          useUserStore.getState().setLoginState(true);
          router.push('/');
        }
      } else {
        console.error('Login failed');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Section typeOfSection={'center'}>
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="w-full lg:w-1/4 rounded-xl py-16 px-16 flex flex-col gap-4"
        >
          <Controller
            control={control}
            name="username"
            rules={{
              required: i18n.t('login.Required field'),
              minLength: { value: 2, message: i18n.t('login.More than', { count: 2 }) },
            }}
            render={({ field: { ref, ...field } }) => (
              <TextField {...field} errorString={errors.username?.message} ref={ref} type={'login'} />
            )}
          />
          <Controller
            control={control}
            name="password"
            rules={{
              required: i18n.t('login.Required field'),
              minLength: { value: 8, message: i18n.t('login.More than', { count: 8 }) },
            }}
            render={({ field: { ref, ...field } }) => (
              <TextField {...field} errorString={errors.password?.message} ref={ref} type={'password'} />
            )}
          />

          <input
            type="submit"
            className={CustomButtonStyles.button}
            disabled={!isValid}
            value={i18n.t('login.SubmitLogin')}
          />
        </form>
      </Section>
    </>
  );
}
