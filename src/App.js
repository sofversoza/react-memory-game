import { useState } from 'react'
import './App.css'
import Card from './components/Card'

const cardImages = [
	{ src: '/img/cheshire.webp' },
	{ src: '/img/felix.webp' },
	{ src: '/img/garfield.png' },
	{ src: '/img/hellokitty.png' },
	{ src: '/img/marie.webp' },
	{ src: '/img/snowball.webp' },
	{ src: '/img/sylvester.jpeg' },
	{ src: '/img/tom.webp' },
]

function App() {
	const [cards, setCards] = useState([])
	const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)


	// this function will: 1) take all of the cat obj imgs, duplicate them, & put them all inside a new array
	// 2) sort the imgs & shuffle them using the salt method
	// 3) add an id for each img card using the map method
	const shuffleCards = () => {
		const shuffledCards = [...cardImages, ...cardImages]
			.sort(() => Math.random() - 0.5)
			.map((card) => ({ ...card, id: Math.random() }))

		setCards(shuffledCards)
		setTurns(0)
	}
	
  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // reset chpices & increase turn
  const resetTurns = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
  }

	return (
		<div className='App'>
			<h1>Magic Match</h1>
			<button onClick={shuffleCards}>New Game</button>

			<div className='card-grid'>
				{cards.map((card) => (
					<Card 
            key={card.id} 
            card={card} 
            handleChoice={handleChoice}
          />
				))}
			</div>
		</div>
	)
}

export default App
