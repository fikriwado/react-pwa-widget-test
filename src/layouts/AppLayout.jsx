import { Outlet } from 'react-router';

const AppLayout = () => {
  return (
    <>
      <div style={{ backgroundColor: 'red', padding: '4px 8px' }}>
        <h1>This is Header</h1>
      </div>
      <div style={{ border: '1px solid #ddd', margin: '24px 0', padding: '4px' }}>
        <Outlet />
      </div>
      <div style={{ backgroundColor: 'yellow', padding: '4px 8px' }}>
        <p>This is Footer</p>
      </div>
    </>
  );
};

export default AppLayout;
