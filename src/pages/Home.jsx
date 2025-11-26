import { useEffect, useState } from 'react';
import supabase from '../config/supabase';
import SmoothieCard from '../components/SmoothieCard';

const Home = () => {
  const [smoothies, setSmoothies] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase.from('smoothies').select();

      if (error) {
        setSmoothies(null);
        setFetchError('Could not fetch the smoothies');
        console.log(error);
      }

      if (data) {
        setSmoothies(data);
        setFetchError(null);
        console.log(data);
      }
    };

    fetchSmoothies();
  }, []);

  return (
    <>
      <h1>Home Page</h1>
      {fetchError && <p>{fetchError}</p>}
      {smoothies && (
        <div className='smoothies'>
          {smoothies.map((smoothie, i) => (
            <SmoothieCard key={i} smoothie={smoothie} />
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
