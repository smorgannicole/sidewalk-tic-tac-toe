import React from "react"

const Square = ({ handleGamePlay, index, nullSquare, ifTheyDidntChoose }) => {
  const handleClick = () => {
    handleGamePlay(index)
    ifTheyDidntChoose()
  }
  return (
    <div className="square" onClick={handleClick}>
      {nullSquare}
    </div>
  )
}
export default Square
