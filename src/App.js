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
        // data.map((item) => ({
        //   id: nanoid(),
        //   question: item.question,
        //   correctAnswer: item.correct_answer,
        //   incorrectAnswer: item.incorrect_answers,
        //   selectedAnswer: '',
        //   checked: false,
        // }))
        
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


  return (
    <>
      <main className='container'>
        {questions.length > 0 ? ( 
          questions.map((quiz) => {
            const { id, question, answers } = quiz
            return (
              <div key={id}>
                <h2>{decode(quiz.question)}</h2>
                <p>{answers}</p>
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
