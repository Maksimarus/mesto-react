const Card = ({card, onCardClick}) => {
  const handleClick = () => {
    onCardClick(card);
  };

  return (
    <li className="card">
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="card__description">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-block">
          <button type="button" className="button card__like-button"></button>
          <p className="card__like-count">{card.likes.length}</p>
        </div>
      </div>
      <button type="button" className="button card__delete-button"></button>
    </li>
  );
};

export default Card;
