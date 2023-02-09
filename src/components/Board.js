import React from 'react'
import './board.css'
import Die from './Die'
import { nanoid } from 'nanoid'
import Confetti from "react-confetti"

const Board = () => {
    const [dice, setDice] = React.useState(allNewDice()) 
    const [tenzies, setTenzies] = React.useState(false)
    React.useEffect(()=>{
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
            
        }

    },[dice])
    function generateNewDie(){
        return{
            value: Math.ceil(Math.random()*6),
            isHeld: false,
            id : nanoid()
        
        }
    }
    function allNewDice(){
        const NewDice = []
        for(let i  = 0; i<10;i++){
            NewDice.push(generateNewDie())
            
        }
        return NewDice
    }
    const diceElements = dice.map(die => <Die value={die.value} key={die.id} isHeld={die.isHeld} holdDice={()=>holdDice(die.id)}/>)




    function RollDice(){
        if(!tenzies){
        setDice(oldDice => oldDice.map(die => {

            return die.isHeld ?  die :generateNewDie()
        }))
       }else{
        setTenzies(false)
        setDice(allNewDice())
       }
    }



    function holdDice(id){
        setDice(oldDice => oldDice.map(die =>{
            return die.id === id ? {...die, isHeld : !die.isHeld}:die
        }))
    }
  return (
    <main className="board">
        {tenzies && <Confetti />}
        <div className="board--main">
        <h1 className="board--title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice--container">
                {diceElements}
             
            </div>
            <button className="dice--roll" onClick={RollDice}>{tenzies ? "New Game" : "Roll"}</button>

        </div>


    </main>
  )
}

export default Board
