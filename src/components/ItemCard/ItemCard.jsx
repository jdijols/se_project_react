import "./ItemCard.css";

function ItemCard({ data, onCardClick }) {
  function handleOpenCard() {
    onCardClick(data);
  }

  return (
    <li className="card" onClick={handleOpenCard}>
      <h2 className="card__title">{data.name}</h2>
      <img src={data.imageUrl} alt={data.name} className="card__image" />
    </li>
  );
}

export default ItemCard;
