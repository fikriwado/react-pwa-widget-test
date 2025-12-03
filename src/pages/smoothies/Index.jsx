import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import SmoothieCard from '../../components/SmoothieCard';
import supabase from '../../config/supabase';

const Smoothie = () => {
  const [smoothies, setSmoothies] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase.from('smoothies').select().order('id');

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

  const handleDelete = (id) => {
    setSmoothies((prev) => prev.filter((smoothie) => smoothie.id != id));
  };

  return (
    <>
      <h3>All Data</h3>
      <Link to='create'>Create Smoothie</Link>

      <br />

      {fetchError && <p>{fetchError}</p>}
      {smoothies && (
        <div className='smoothies'>
          {smoothies.map((smoothie, i) => (
            <SmoothieCard key={i} smoothie={smoothie} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </>
  );
};

export default Smoothie;
