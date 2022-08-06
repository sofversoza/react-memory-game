import { useEffect, useState } from 'react'
import './App.css'
import Card from './components/Card'

const cardImages = [
	{ src: '/img/cheshire.webp', matched: false },
	{ src: '/img/felixthecat.png', matched: false },
	{ src: '/img/garfield-1.webp', matched: false },
	{ src: '/img/hellokitty.png', matched: false },
	{ src: '/img/marie-2.png', matched: false },
	{ src: '/img/snowball.webp', matched: false },
	{ src: '/img/sylvester.png', matched: false },
	{ src: '/img/tomthecat.png', matched: false },
]

function App() {
	const [cards, setCards] = useState([])
	const [turns, setTurns] = useState(0)
	const [choiceOne, setChoiceOne] = useState(null)
	const [choiceTwo, setChoiceTwo] = useState(null)
	const [disabled, setDisabled] = useState(false)

	// this function will: 1) take all of the cat obj imgs, duplicate them, & put them all inside a new array
	// 2) sort the imgs & shuffle them using the salt method
	// 3) add an id for each img card using the map method
	const shuffleCards = () => {
		const shuffledCards = [...cardImages, ...cardImages]
			.sort(() => Math.random() - 0.5)
			.map((card) => ({ ...card, id: Math.random() }))

    setChoiceOne(null)
    setChoiceTwo(null)  
		setCards(shuffledCards)
		setTurns(0)
	}

	// handle a choice
	const handleChoice = (card) => {
		choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
	}

	// compare 2 selected cards
	useEffect(() => {
		// do we have a value for both choices?
		if (choiceOne && choiceTwo) {
			setDisabled(true)

			// if both choices match
			if (choiceOne.src === choiceTwo.src) {
				setCards((prevCards) => {
					// were returning a new array of cards with new value for matched
					return prevCards.map((card) => {
						// if the card's src match the user's choice src, we could've also used choiceTwo to compare srcs
						if (card.src === choiceOne.src) {
							return { ...card, matched: true }
						} else {
							return card
						}
					})
				})
				resetTurn()
			} else {
				// wait 1sec before running resetTurn so we can see the 2nd choice card flip when they don't match
				setTimeout(() => resetTurn(), 1000)
			}
		}
	}, [choiceOne, choiceTwo])

	console.log(cards)

	// reset choices & increase turn
	const resetTurn = () => {
		setChoiceOne(null)
		setChoiceTwo(null)
		setTurns((prevTurns) => prevTurns + 1)
		setDisabled(false)
	}

  // start a new game automatically
  useEffect(() => {
    shuffleCards()
  }, [])

	return (
		<div className='App'>
			<h1>Match the Cats!</h1>
			<button onClick={shuffleCards}>New Game</button>

			<div className='card-grid'>
				{cards.map((card) => (
					<Card
						key={card.id}
						card={card}
						handleChoice={handleChoice}
						flipped={card === choiceOne || card === choiceTwo || card.matched}
						disabled={disabled}
					/>
				))}
			</div>
      <br />
      <p>TURNS: {turns}</p>
		</div>
	)
}

export default App
