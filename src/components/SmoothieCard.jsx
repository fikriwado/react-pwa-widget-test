import { Link } from 'react-router';

const SmoothieCard = ({ smoothie }) => {
  return (
    <div className='smoothie-card'>
      <h3 className='title'>{smoothie.title}</h3>
      <p>{smoothie.method}</p>
      <div className='rating'>{smoothie.rating}</div>

      <div className='actions'>
        <Link to={`/smoothies/${smoothie.id}`}>Edit</Link>
      </div>
    </div>
  );
};

export default SmoothieCard;
