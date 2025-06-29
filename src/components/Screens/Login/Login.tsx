'use client';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { CustomButton } from '@/components/UI/UIComponents';
import { TextField } from '@/components/UI/UIComponents';
import { useRouter } from 'next/navigation';
import { getTranslatedText } from '@/utils';
import toast from 'react-hot-toast';
import FetchServiceInstance from '@/app/api/index';
import useUserProfile from '@/hooks/useUserProfile';
import { userAPIConstant } from '@/constants/api-endpoints.constant';

function Login() {
  const router = useRouter();
  const { fetchUserProfile, setLoginState } = useUserProfile();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<LoginForms>({
    mode: 'onSubmit',
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const handleLogin: SubmitHandler<LoginForms> = async (data) => {
    try {
      const res = await FetchServiceInstance.fetchHelper(userAPIConstant['login'], {
        to: 'self',
        method: 'POST',
        body: {
          username: data.username,
          password: data.password,
        },
      });

      if (!res) {
        toast.error(getTranslatedText('toast.fetchLoginError'));
        return;
      }

      if (res?.success == true) {
        await fetchUserProfile();
        toast.success(getTranslatedText('toast.LoginSuccess'));
        router.push('/');
        setLoginState(true);
      } else {
        toast.error(getTranslatedText('toast.LoginFailedUser'));
        return { success: false };
      }
    } catch (e) {
      toast.error(getTranslatedText('toast.ServerError'));
      console.error(e);
    }
  };
  return (
    <form onSubmit={handleSubmit(handleLogin)} className="w-full rounded-xl flex flex-col gap-5">
      <Controller
        control={control}
        name="username"
        rules={{
          required: getTranslatedText('login.Required field'),
          minLength: { value: 2, message: getTranslatedText('login.More than', { count: 2 }) },
        }}
        render={({ field: { ref, value, ...field } }) => (
          <TextField
            {...field}
            value={value}
            errorString={errors.username?.message}
            label={getTranslatedText('login.username')}
            ref={ref}
            type={'login'}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        rules={{
          required: getTranslatedText('login.Required field'),
          minLength: { value: 8, message: getTranslatedText('login.More than', { count: 8 }) },
        }}
        render={({ field: { ref, value, ...field } }) => (
          <TextField
            {...field}
            value={value}
            errorString={errors.password?.message}
            label={getTranslatedText('login.password')}
            ref={ref}
            type={'password'}
          />
        )}
      />
      <CustomButton type="submit" variant="primary" disabled={!isValid}>
        {getTranslatedText('login.SubmitLogin') || 'Submit'}
      </CustomButton>
    </form>
  );
}

export default Login;
