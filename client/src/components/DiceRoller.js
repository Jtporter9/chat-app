import { useState } from "react"

export default function diceRoller() {
// eslint-disable-next-line react-hooks/rules-of-hooks
const [dieNumber, setDieNumber] = useState(0)
const randomDieRoll = () => Math.floor(Math.random() * 6) + 1
  return (
    <div>
        <button onClick={() => setDieNumber(randomDieRoll())}>Roll Dice</button>
        <p>
            {dieNumber}
        </p>
    </div>
  )
}
