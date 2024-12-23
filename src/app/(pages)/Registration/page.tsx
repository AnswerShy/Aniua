'use client';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Section } from '@/components/Shared/SharedComponents';
import { CustomButtonStyles } from '@/components/Shared/SharedComponents';
import { TextField } from '@/components/Shared/SharedComponents';
import { useRouter } from 'next/navigation';

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
          onSubmit={handleSubmit(handleRegistration)}
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
              <TextField
                {...field}
                errorString={errors.username?.message}
                ref={ref}
                type={'username'}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            rules={{
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'invalid email address',
              },
              required: 'Required field',
            }}
            render={({ field: { ref, ...field } }) => (
              <TextField
                {...field}
                errorString={errors.email?.message}
                ref={ref}
                type={'email'}
              />
            )}
          />
          <Controller
            control={control}
            name="password1"
            rules={{
              required: 'Required field',
              minLength: { value: 8, message: 'More than 8 symbols' },
            }}
            render={({ field: { ref, ...field } }) => (
              <TextField
                {...field}
                errorString={errors.password1?.message}
                ref={ref}
                type={'password'}
              />
            )}
          />
          <Controller
            control={control}
            name="password2"
            rules={{
              validate: (val: string) => {
                if (watch('password1') !== val) {
                  return 'Your passwords do no match';
                }
              },
              required: 'Required field',
              minLength: { value: 8, message: 'More than 8 symbols' },
            }}
            render={({ field: { ref, ...field } }) => (
              <TextField
                {...field}
                errorString={errors.password2?.message}
                ref={ref}
                type={'password'}
              />
            )}
          />

          <input
            type="submit"
            className={CustomButtonStyles.button}
            disabled={!isValid}
          />
        </form>
      </Section>
    </>
  );
}
