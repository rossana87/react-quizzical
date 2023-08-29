import { useEffect, useState } from 'react'
import axios from 'axios'
import { nanoid } from 'nanoid'
import { decode } from 'html-entities'
import Welcome from './components/Welcome'


const App = () => {

  const [startQuiz, setStartQuiz] = useState(true)
  const [questions, setQuestions] = useState([])
  const [selectedAnswers, setSelectedAnswers] = useState([])
  const [score, setScore] = useState(0)
  const [playAgain, setPlayAgain] = useState(false)


  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple')
        console.log(response.data.results)
        //const data = response.data.results
        setQuestions(response.data.results)
      } catch (error) {
        console.log(error)
      }
    }
    if (startQuiz === false){
      getData()
    }

  },[startQuiz])

  const handleStart = () => {
    setStartQuiz(false)
  }

  const shuffleArray = (array) => {
    const shuffledArray = [...array]
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
    }
    return shuffledArray
  }

  const mixAnswers = (correctAnswer, incorrectAnswers) => {
    const mixedAnswers = shuffleArray([correctAnswer, ...incorrectAnswers])
    return mixedAnswers
  }
  


  return (
    <>
      <main className='container'>
        {questions.length > 0 ? (
          questions.map((quiz) => {
            // eslint-disable-next-line camelcase
            const { nanoid, question, correct_answer, incorrect_answers } = quiz
            const mixedOptions = mixAnswers(correct_answer, incorrect_answers)
            return (
              <div key={nanoid}>
                <h2>{decode(question)}</h2>
                <div className='answers'>
                  {mixedOptions.map((answer, i) => (
                    <button className='btn-answers' key={i}>{decode(answer)}</button>
                  ))}
                </div>
              </div>
            )
          })
        ) : (
          <Welcome 
            handleStart={handleStart}
          /> 
        )}
      </main>
    </>
  )
}

export default App
