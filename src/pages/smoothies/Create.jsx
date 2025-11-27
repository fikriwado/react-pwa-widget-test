import { useState } from 'react';
import { useImmer } from 'use-immer';
import supabase from '../../config/supabase';
import { Link, useNavigate } from 'react-router';

const initialSmoothie = {
  title: '',
  method: '',
  rating: ''
};

const Create = () => {
  const navigate = useNavigate();
  const [smoothie, setSmoothie] = useImmer(initialSmoothie);
  const [formError, setFormError] = useState('');

  const setFormItem = (e) => {
    const { id: name, value } = e.target;
    setSmoothie((draf) => {
      draf[name] = value;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isEmpty = Object.values(smoothie).some((v) => !v.trim());

    if (isEmpty) {
      return setFormError('Please fill in all the field correctly!');
    }

    const { data, error } = await supabase
      .from('smoothies')
      .insert([{ ...smoothie }])
      .select();

    if (error) {
      console.log(error);
      return setFormError('Please fill in all the field correctly!');
    }

    if (data) {
      setFormError(null);
      navigate('/');
    }
  };

  return (
    <div>
      <h1>Create Data</h1>
      <Link to='/smoothies'>All Smoothies</Link>

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

        <div>
          <button type='submit'>Create Smoothie</button>
        </div>

        {formError && <p className='error'>{formError}</p>}
      </form>
    </div>
  );
};

export default Create;
