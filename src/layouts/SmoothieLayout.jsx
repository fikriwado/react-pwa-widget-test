import { Outlet, useNavigate } from 'react-router';
import { UserAuth } from '../providers/AuthProvider';
import { useEffect } from 'react';

const SmoothieLayout = () => {
  const navigate = useNavigate();
  const { session, signOut } = UserAuth();

  const handleSignOut = async (e) => {
    e.preventDefault();

    try {
      await signOut();
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    navigate(session?.user ? '/smoothies' : '/auth/login');
  }, [navigate]);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', border: '1px solid black', padding: '10px 20px' }}>
        <h1>Smoothie Page</h1>

        {session?.user && (
          <div style={{ textAlign: 'right' }}>
            <p style={{ marginBottom: '5px' }}>{session.user.email}</p>
            <button onClick={handleSignOut}>Logout</button>
          </div>
        )}
      </div>

      <div style={{ border: '1px solid black', padding: '20px' }}>
        <Outlet />
      </div>
    </>
  );
};

export default SmoothieLayout;
