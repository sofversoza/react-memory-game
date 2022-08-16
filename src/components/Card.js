import './Card.css'

function Card({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card)
    }
  }
  
  return (
		<div className='card'>
			<div className={flipped ? 'flipped' : ''}>
				<img 
          className='front' 
          src={card.src} 
          alt='card front' 
        />
				<img 
          className='back' 
          src='/img/cover-1.jpeg' 
          alt='card back' 
          onClick={handleClick} 
        />
			</div>
		</div>
	)
}

export default Card
