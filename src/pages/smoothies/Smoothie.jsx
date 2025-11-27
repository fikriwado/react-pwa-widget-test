import { useEffect, useState } from 'react';
import supabase from '../../config/supabase';
import SmoothieCard from '../../components/SmoothieCard';
import { Link } from 'react-router';

const Smoothie = () => {
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
      }
    };

    fetchSmoothies();
  }, []);

  return (
    <>
      <h1>Smoothie Page</h1>
      <Link to='create'>Create Smoothie</Link>

      <br />
      <br />

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

export default Smoothie;
