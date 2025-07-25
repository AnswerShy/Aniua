'use client';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { CustomButton } from '@/components/UI/UIComponents';
import { TextField } from '@/components/UI/UIComponents';
import { useRouter } from 'next/navigation';
import { getTranslatedText } from '@/utils';
import FetchServiceInstance from '@/app/api/index';
import useUserProfile from '@/hooks/useUserProfile';
import { userAPIConstant } from '@/constants/api-endpoints.constant';
import toast from 'react-hot-toast';

function Registration() {
  const router = useRouter();
  const { fetchUserProfile } = useUserProfile();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    watch,
  } = useForm<RegistrationForms>({
    mode: 'onSubmit',
  });

  const handleRegistration: SubmitHandler<RegistrationForms> = async (data) => {
    try {
      const res = await FetchServiceInstance.fetchHelper(userAPIConstant['registration'], {
        to: 'self',
        method: 'POST',
        body: {
          username: data.username,
          email: data.email,
          password1: data.password1,
          password2: data.password2,
        },
      });

      if (res?.success == true) {
        await fetchUserProfile();
        router.push('/');
      } else {
        toast.error(getTranslatedText('toast.RegistrationFailedUser'));
      }
    } catch (error) {
      toast.error(getTranslatedText('toast.fetchRegistrationError'));
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleRegistration)}
      className="w-full rounded-xl flex flex-col gap-5"
    >
      <Controller
        control={control}
        name="username"
        rules={{
          required: getTranslatedText('login.Required field'),
          minLength: { value: 2, message: 'More than 2 symbols' },
        }}
        render={({ field: { ref, value, ...field } }) => (
          <TextField
            {...field}
            value={value}
            label={getTranslatedText('login.username')}
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
          required: getTranslatedText('login.Required field'),
        }}
        render={({ field: { ref, value, ...field } }) => (
          <TextField
            {...field}
            value={value}
            label={getTranslatedText('login.email')}
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
          required: getTranslatedText('login.Required field'),
          minLength: { value: 8, message: getTranslatedText('login.More than', { count: 8 }) },
        }}
        render={({ field: { ref, value, ...field } }) => (
          <TextField
            {...field}
            value={value}
            label={getTranslatedText('login.password')}
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
              return getTranslatedText('login.No math');
            }
          },
          required: getTranslatedText('login.Required field'),
          minLength: { value: 8, message: getTranslatedText('login.More than', { count: 8 }) },
        }}
        render={({ field: { ref, value, ...field } }) => (
          <TextField
            {...field}
            value={value}
            label={getTranslatedText('login.passwordRepeat')}
            errorString={errors.password2?.message}
            ref={ref}
            type={'password'}
          />
        )}
      />
      <CustomButton type="submit" variant="primary" disabled={!isValid}>
        {getTranslatedText('login.SubmitRegistration')}
      </CustomButton>
    </form>
  );
}

export default Registration;
