// Write your code here
import {useState, useEffect} from 'react'
import './index.css'

const DigitalTimer = () => {
  const [timerLimit, setTimerLimit] = useState(25) // Timer limit in minutes
  const [timeLeft, setTimeLeft] = useState(25 * 60) // Time left in seconds
  const [isRunning, setIsRunning] = useState(false)
  const [timerStatus, setTimerStatus] = useState('Paused')
  const [intervalId, setIntervalId] = useState(null)

  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      setIsRunning(false)
      setTimerStatus('Paused')
      clearInterval(intervalId)
    }
  }, [timeLeft, isRunning, intervalId])

  const startPauseHandler = () => {
    if (isRunning) {
      clearInterval(intervalId)
      setIsRunning(false)
      setTimerStatus('Paused')
    } else {
      const id = setInterval(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
      setIntervalId(id)
      setIsRunning(true)
      setTimerStatus('Running')
    }
  }

  const resetHandler = () => {
    clearInterval(intervalId)
    setIsRunning(false)
    setTimeLeft(timerLimit * 60) // Reset timeLeft based on timerLimit
    setTimerStatus('Paused')
  }

  const incrementHandler = () => {
    if (!isRunning) {
      setTimerLimit(prev => prev + 1) // Increment timer limit by 1 minute
      setTimeLeft(prev => prev + 60) // Increment time left by 60 seconds
    }
  }

  const decrementHandler = () => {
    if (!isRunning && timerLimit > 1) {
      // Ensure timer limit doesn't go below 1 minute
      setTimerLimit(prev => prev - 1) // Decrement timer limit by 1 minute
      setTimeLeft(prev => prev - 60) // Decrement time left by 60 seconds
    }
  }

  const formatTime = timeInSec => {
    const minutes = Math.floor(timeInSec / 60)
    const seconds = timeInSec % 60
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0',
    )}`
  }

  return (
    <div className="timer-container">
      <h1>Digital Timer</h1>
      <div className="timer1">
        <div className="timer">
          <div className="time-container">
            <h1 className="time">
              {formatTime(
                isRunning || timerStatus === 'Paused'
                  ? timeLeft
                  : timerLimit * 60,
              )}
            </h1>
            <p className="status">{timerStatus}</p>
          </div>
        </div>
        <div className="btns">
          <div className="actions">
            <button
              type="button"
              onClick={startPauseHandler}
              className="start-pause"
            >
              <img
                src={`https://assets.ccbp.in/frontend/react-js/${
                  isRunning ? 'pause' : 'play'
                }-icon-img.png`}
                alt={`${isRunning ? 'pause' : 'play'} icon`}
              />
              {isRunning ? 'Pause' : 'Start'}
            </button>
            <button type="button" onClick={resetHandler} className="reset">
              <img
                src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                alt="reset icon"
              />
              Reset
            </button>
          </div>
          <div className="controls">
            <p className="limit">Set Timer limit</p>
            <div className="buttons">
              <button
                type="button"
                onClick={incrementHandler}
                disabled={isRunning} // Disable button while timer is running
              >
                +
              </button>
              <p className="timer-limit">{timerLimit}</p>{' '}
              {/* Show timer limit in minutes */}
              <button
                type="button"
                onClick={decrementHandler}
                disabled={isRunning} // Disable button while timer is running
              >
                -
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DigitalTimer
