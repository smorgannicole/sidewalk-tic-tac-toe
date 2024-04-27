import React, { useState, useEffect } from "react"
import Square from "./components/Square"
import "./App.css"
import title from "./assets/title.png"
import myTurnOrange from "./assets/my-turn-orange.png"
import yourTurnOrange from "./assets/your-turn-orange.png"
import yourTurnRed from "./assets/your-turn-red.png"
import myTurnRed from "./assets/my-turn-red.png"
import myTurnYellow from "./assets/my-turn-yellow.png"
import yourTurnYellow from "./assets/your-turn-yellow.png"
import yourTurnGreen from "./assets/your-turn-green.png"
import myTurnGreen from "./assets/my-turn-green.png"
import yellowSquig1 from "./assets/yellow-squig1.png"
import redSquig1 from "./assets/red-squig1.png"
import greenSquig1 from "./assets/green-squig1.png"
import organgeSquig1 from "./assets/orange-squig1.png"
import yellowSquig2 from "./assets/yellow-squig2.png"
import redSquig2 from "./assets/red-squig2.png"
import greenSquig2 from "./assets/green-squig2.png"
import organgeSquig2 from "./assets/orange-squig2.png"
import redO from "./assets/red-o.png"
import redX from "./assets/red-x.png"
import orangeX from "./assets/orange-x.png"
import orangeO from "./assets/orange-o.png"
import yellowX from "./assets/yellow-x.png"
import yellowO from "./assets/yellow-o.png"
import greenO from "./assets/green-o.png"
import greenX from "./assets/green-x.png"
import drawnBoard from "./assets/drawn-board.png"
import restartBtn from "./assets/restart.png"
import chooseArrow1 from "./assets/choose-arrow1.png"
import chooseArrow2 from "./assets/choose-arrow2.png"
import chooseColor1 from "./assets/choose-color1.png"
import chooseColor2 from "./assets/choose-color2.png"
import myWins from "./assets/my-wins.png"
import yourWins from "./assets/your-wins.png"
import tally from "./assets/tally.png"

const App = () => {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [showAlerts, setShowAlerts] = useState(true)
  const [player1Marker, setPlayer1Marker] = useState(greenX)
  const [player2Marker, setPlayer2Marker] = useState(redO)
  const [player1Tally, setPlayer1Tally] = useState(0)
  const [player2Tally, setPlayer2Tally] = useState(0)
  const [player1Color, setPlayer1Color] = useState(greenSquig1)
  const [player2Color, setPlayer2Color] = useState(redSquig1)
  const [player1TurnImage, setPlayer1TurnImage] = useState(myTurnGreen)
  const [player2TurnImage, setPlayer2TurnImage] = useState(yourTurnRed)
  const [currentPlayer, setCurrentPlayer] = useState(1)
  const [whoseTurn, setWhoseTurn] = useState(myTurnOrange)
  const [myTurn, setMyTurn] = useState(null)
  const [yourTurn, setYourTurn] = useState(null)
  const [color1Chosen, setColor1Chosen] = useState(false)
  const [color2Chosen, setColor2Chosen] = useState(false)

  useEffect(() => {
    const isItNull = squares.find((value) => value === null)
    if (isItNull === undefined && showAlerts === true) {
      setTimeout(() => {
        alert("Cat's game!")
        restart()
      }, 200)
    }
  }, [squares, showAlerts])

  const handleGamePlay = (index) => {
    const updatedBoard = [...squares]
    if (squares[index] === null) {
      const marker =
        currentPlayer === 1 ? (
          <img src={markerImages[player1Color].x} alt="player 1 marker" />
        ) : (
          <img src={markerImages[player2Color].o} alt="player 2 marker" />
        )
      updatedBoard[index] = marker
      setSquares(updatedBoard)
      setWhoseTurn(currentPlayer === 1 ? yourTurn : myTurn)
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1)
    } else {
      alert("Already occupied!")
    }
    winningSquares(updatedBoard)
  }

  const markers = [greenSquig1, redSquig1, organgeSquig1, yellowSquig1]

  const markers2 = [greenSquig2, redSquig2, organgeSquig2, yellowSquig2]

  const markerImages = {
    [greenSquig1]: { x: greenX, o: greenO },
    [redSquig1]: { x: redX, o: redO },
    [organgeSquig1]: { x: orangeX, o: orangeO },
    [yellowSquig1]: { x: yellowX, o: yellowO },
    [greenSquig2]: { x: greenX, o: greenO },
    [redSquig2]: { x: redX, o: redO },
    [organgeSquig2]: { x: orangeX, o: orangeO },
    [yellowSquig2]: { x: yellowX, o: yellowO },
  }

  const winningSquares = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    lines.forEach((value, index) => {
      const [a, b, c] = lines[index]
      const srcA = squares[a]?.props?.src
      const srcB = squares[b]?.props?.src
      const srcC = squares[c]?.props?.src
      console.log(srcA && srcA === srcB && srcA === srcC)

      if (srcA && srcA === srcB && srcA === srcC) {
        setWhoseTurn("")
        setShowAlerts(false)
        setTimeout(() => {
          const winner = currentPlayer === 1 ? "Player 1" : "Player 2"
          const winnerMarker = currentPlayer === 1 ? "I won" : "You won"
          alert(`${winnerMarker}`)
          currentPlayer === 1
            ? setPlayer1Tally(player1Tally + 1)
            : setPlayer2Tally(player2Tally + 1)
          restart()
        }, "200")
      }
      return null
    })
  }

  const restart = () => {
    setSquares(Array(9).fill(null))
    setCurrentPlayer(1)
    setWhoseTurn(myTurn)
    setPlayer1Marker(greenX)
    setPlayer2Marker(redO)
    setPlayer1TurnImage(myTurnGreen)
    setPlayer2TurnImage(yourTurnRed)
    setColor1Chosen(false)
    setColor2Chosen(false)
  }

  useEffect(() => {
    if (player1Color && player2Color) {
      setMyTurn(
        player1Color === greenSquig1 || player1Color === greenSquig2
          ? myTurnGreen
          : player1Color === redSquig1 || player1Color === redSquig2
          ? myTurnRed
          : player1Color === organgeSquig1 || player1Color === organgeSquig2
          ? myTurnOrange
          : player1Color === yellowSquig1 || player1Color === yellowSquig2
          ? myTurnYellow
          : null
      )

      setYourTurn(
        player2Color === greenSquig1 || player2Color === greenSquig2
          ? yourTurnGreen
          : player2Color === redSquig1 || player2Color === redSquig2
          ? yourTurnRed
          : player2Color === organgeSquig1 || player2Color === organgeSquig2
          ? yourTurnOrange
          : player2Color === yellowSquig1 || player2Color === yellowSquig2
          ? yourTurnYellow
          : null
      )
    }
  }, [player1Color, player2Color])

  const handlePlayer1Choose = (value) => {
    setPlayer1Color(value)
    setColor1Chosen(true)
  }

  const handlePlayer2Choose = (value) => {
    setPlayer2Color(value)
    setColor2Chosen(true)
  }

  const ifTheyDidntChoose = () => {
    setColor2Chosen(true)
    setColor1Chosen(true)
  }

  return (
    <>
      <div className="center">
        <div className="my-wins-cont">
          <img
            src={myWins}
            className="my-wins"
            alt="white, chalk drawn text reading my wins"
          />
          <div className="tally-cont">
            {Array.from({ length: player1Tally }).map((_, index) => (
              <img
                key={index}
                src={tally}
                alt="tally mark drawn in white chalk"
                className="tally"
              />
            ))}
          </div>
        </div>
        <div className="your-wins-cont">
          <img
            src={yourWins}
            className="your-wins"
            alt="white, chalk drawn text reading your wins"
          />
          <div className="tally-cont-your">
            {Array.from({ length: player2Tally }).map((_, index) => (
              <img
                key={index}
                src={tally}
                alt="tally mark drawn in white chalk"
                className="tally"
              />
            ))}
          </div>
        </div>
        <div className="title-cont">
          <img
            className="title"
            src={title}
            alt="chalk written words reading: sidewalk tic tac toe"
          />
        </div>
        {color1Chosen && color2Chosen && (
          <img
            className={currentPlayer === 1 ? "your-turn-img" : "my-turn-img"}
            src={currentPlayer === 1 ? myTurn : yourTurn}
            alt="chalk written whose turn"
          />
        )}
        {!color1Chosen && (
          <>
            <img
              src={chooseColor1}
              alt="white, chalk drawn text reading choose color"
              className="choose-color-1"
            />
            <img
              src={chooseArrow1}
              alt="white, chalk drawn arrow pointing to chalk options"
              className="choose-arrow-1"
            />
            <div className="player-1-squigs">
              {markers.map((value, index) => {
                return (
                  <div>
                    <img
                      key={index}
                      onClick={() => handlePlayer1Choose(value)}
                      src={value}
                      alt="player's marker"
                      className="squig-img"
                    />
                  </div>
                )
              })}
            </div>
          </>
        )}
        {!color2Chosen && color1Chosen && (
          <>
            <img
              src={chooseColor2}
              alt="white, chalk drawn text reading choose color"
              className="choose-color-2"
            />
            <img
              src={chooseArrow2}
              alt="white, chalk drawn arrow pointing to chalk options"
              className="choose-arrow-2"
            />
            <div className="player-2-squigs">
              {markers2.map((value, index) => {
                return (
                  <div>
                    {
                      <img
                        key={index}
                        onClick={() => handlePlayer2Choose(value)}
                        src={value}
                        alt="player's marker"
                        className="squig-img"
                      />
                    }
                  </div>
                )
              })}
            </div>
          </>
        )}
        {/* <ScoreBoard player1Tally={player1Tally} player2Tally={player2Tally} /> */}
        <div className="centerbutton">
          <img
            onClick={restart}
            src={restartBtn}
            alt="white, chalk-drawn restart symbol"
            className="restart-btn"
          />
        </div>
        <div className="boardwrapper">
          <div className="board">
            <img
              src={drawnBoard}
              alt="white chalk drawn board"
              className="drawn-board"
            />
            {squares.map((nullSquare, index) => {
              return (
                <Square
                  handleGamePlay={handleGamePlay}
                  index={index}
                  key={index}
                  nullSquare={nullSquare}
                  ifTheyDidntChoose={ifTheyDidntChoose}
                />
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
