import { Link, useNavigate } from 'react-router';
import { UserAuth } from '../../providers/AuthProvider';
import { useImmer } from 'use-immer';
import { useState } from 'react';

const initialUser = { email: '', password: '' };

const Login = () => {
  const navigate = useNavigate();
  const { signIn } = UserAuth();
  const [forms, setForms] = useImmer(initialUser);
  const [formError, setFormError] = useState(null);

  const setFormItem = (e) => {
    const { name, value } = e.target;
    setForms((draft) => {
      draft[name] = value;
    });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    const isEmpty = Object.values(forms).some((v) => !String(v).trim());

    if (!isEmpty) setFormError(null);
    else return setFormError('Please fill in all the field correctly!');

    try {
      const result = await signIn(forms.email, forms.password);
      if (!result.success) return setFormError(result.error);
      navigate('/');
    } catch {
      setFormError('an error occurred');
    }
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSignIn}>
        <div>
          <label htmlFor='email'>E-mail</label>
          <br />
          <input type='email' id='email' name='email' value={forms.email} onChange={setFormItem} placeholder='mail@example.com' />
        </div>

        <br />

        <div>
          <label htmlFor='password'>Password</label>
          <br />
          <input type='password' id='password' name='password' value={forms.password} onChange={setFormItem} />
        </div>

        <br />

        <div style={{ display: 'flex', gap: '10px' }}>
          <button type='submit'>Sign In</button>
          <Link to='/auth/register'>Register account</Link>
        </div>

        {formError && <p className='error'>{formError}</p>}
      </form>
    </>
  );
};

export default Login;
