import { useEffect, useState } from 'react';
import { useImmer } from 'use-immer';
import { Link, useNavigate, useParams } from 'react-router';
import supabase from '../../config/supabase';

const initialSmoothie = {
  title: '',
  method: '',
  rating: ''
};

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [smoothie, setSmoothie] = useImmer(initialSmoothie);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const fetchSmoothie = async () => {
      const { data, error } = await supabase.from('smoothies').select().eq('id', id).single();

      if (error) navigate('/', { replace: true });

      if (data) {
        setSmoothie({ ...data });
      }
    };

    fetchSmoothie();
  }, [id, navigate]);

  const setFormItem = (e) => {
    const { id: name, value } = e.target;
    setSmoothie((draf) => {
      draf[name] = value;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(smoothie);
    const isEmpty = Object.values(smoothie).some((v) => !String(v).trim());

    if (isEmpty) {
      return setFormError('Please fill in all the field correctly!');
    }

    const { data, error } = await supabase
      .from('smoothies')
      .update({ ...smoothie })
      .eq('id', id)
      .select();

    if (error) {
      console.log(error);
      return setFormError('Please fill in all the field correctly!');
    }

    if (data) {
      console.log(data);
      setFormError(null);
      navigate('/');
    }
  };

  return (
    <div>
      <h1>Update Data</h1>
      <Link to='/'>All Smoothies</Link>

      <br />
      <br />

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='title'>Title</label>
          <input id='title' type='text' value={smoothie.title} onChange={setFormItem} />
        </div>

        <div>
          <label htmlFor='method'>Method</label>
          <input id='method' type='text' value={smoothie.method} onChange={setFormItem} />
        </div>

        <div>
          <label htmlFor='rating'>Rating</label>
          <input id='rating' type='number' value={smoothie.rating} onChange={setFormItem} />
        </div>

        <div className='mt-5'>
          <button type='submit'>Update Smoothie</button>
        </div>

        {formError && <p className='error'>{formError}</p>}
      </form>
    </div>
  );
};

export default Update;
