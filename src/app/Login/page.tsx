'use client';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Section } from '@/components/Shared/SharedComponents';
import { CustomButtonStyles } from '@/components/Shared/SharedComponents';
import { TextField } from '@/components/Shared/SharedComponents';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<LoginForms>({
    mode: 'all',
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
          document.cookie = `authToken=${resJson.user_token}; max-age=${7 * 24 * 60 * 60}; Secure; SameSite=Strict; Path=/;`;
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
              required: 'Required field',
              minLength: { value: 2, message: 'More than 2 symbols' },
            }}
            render={({ field: { ref, ...field } }) => (
              <TextField {...field} errorString={errors.username?.message} ref={ref} type={'login'} />
            )}
          />
          <Controller
            control={control}
            name="password"
            rules={{
              required: 'Required field',
              minLength: { value: 8, message: 'More than 8 symbols' },
            }}
            render={({ field: { ref, ...field } }) => (
              <TextField {...field} errorString={errors.password?.message} ref={ref} type={'password'} />
            )}
          />

          <input type="submit" className={CustomButtonStyles.button} disabled={!isValid} />
        </form>
      </Section>
    </>
  );
}
