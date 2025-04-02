'use client';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { CustomButtonStyles, TextField, Section } from '@/components/Shared/SharedComponents';
import { useRouter } from 'next/navigation';
import { i18n } from '@/utils/customUtils';

export default function Registration() {
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    watch,
  } = useForm<RegistrationForms>({
    mode: 'all',
  });

  const handleRegistration: SubmitHandler<RegistrationForms> = async (data) => {
    const { username, email, password1, password2 } = data;

    try {
      const res = await fetch('/api/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password1, password2 }),
      });

      if (res.ok) {
        const resJson = await res.json();
        if (resJson.success) {
          localStorage.setItem('isLoggedIn', 'true');
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
        <form onSubmit={handleSubmit(handleRegistration)} className="w-full lg:w-1/4 rounded-xl py-16 px-16 flex flex-col gap-4">
          <Controller
            control={control}
            name="username"
            rules={{
              required: i18n.t('login.Required field'),
              minLength: { value: 2, message: 'More than 2 symbols' },
            }}
            render={({ field: { ref, ...field } }) => <TextField {...field} errorString={errors.username?.message} ref={ref} type={'username'} />}
          />
          <Controller
            control={control}
            name="email"
            rules={{
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'invalid email address',
              },
              required: i18n.t('login.Required field'),
            }}
            render={({ field: { ref, ...field } }) => <TextField {...field} errorString={errors.email?.message} ref={ref} type={'email'} />}
          />
          <Controller
            control={control}
            name="password1"
            rules={{
              required: i18n.t('login.Required field'),
              minLength: { value: 8, message: i18n.t('login.More than', { count: 8 }) },
            }}
            render={({ field: { ref, ...field } }) => <TextField {...field} errorString={errors.password1?.message} ref={ref} type={'password'} />}
          />
          <Controller
            control={control}
            name="password2"
            rules={{
              validate: (val: string) => {
                if (watch('password1') !== val) {
                  return i18n.t('login.No math');
                }
              },
              required: i18n.t('login.Required field'),
              minLength: { value: 8, message: i18n.t('login.More than', { count: 8 }) },
            }}
            render={({ field: { ref, ...field } }) => <TextField {...field} errorString={errors.password2?.message} ref={ref} type={'password'} label={'passwordRepeat'} />}
          />

          <input type="submit" className={CustomButtonStyles.button} disabled={!isValid} value={i18n.t('login.SubmitRegistration')} />
        </form>
      </Section>
    </>
  );
}
