import { useEffect, useState } from 'react'
import axios from 'axios'
import { nanoid } from 'nanoid'
import Welcome from './components/Welcome'


const App = () => {

  const [startQuiz, setStartQuiz] = useState(true)
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple')
        console.log(response.data.results)
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


  return (
    <>
      <main className='container'>
        {questions.length > 0 ? ( 
          questions.map((quiz) => {
            const { id, question, answers } = quiz
            return (
              <div key={id}>
                <h2>{question}</h2>
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
