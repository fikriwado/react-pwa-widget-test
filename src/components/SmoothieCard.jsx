import { Link } from 'react-router';
import supabase from '../config/supabase';

const SmoothieCard = ({ smoothie, onDelete }) => {
  const handleDelete = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.from('smoothies').delete().eq('id', smoothie.id).select();

    if (error) {
      console.log(error);
    }

    if (data) {
      console.log(data);
      onDelete(smoothie.id);
    }
  };

  return (
    <div className='smoothie-card'>
      <h3 className='title'>{smoothie.title}</h3>
      <p>{smoothie.method}</p>
      <div className='rating'>{smoothie.rating}</div>

      <div className='actions'>
        <Link to={`/smoothies/${smoothie.id}`} className='me-5'>
          Edit
        </Link>
        <a href='#' onClick={handleDelete}>
          Delete
        </a>
      </div>
    </div>
  );
};

export default SmoothieCard;
