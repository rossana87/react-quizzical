import { useEffect, useState } from 'react'
import axios from 'axios'
// import { nanoid } from 'nanoid'
import { decode } from 'html-entities'
import Welcome from './components/Welcome'


const App = () => {

  const [startQuiz, setStartQuiz] = useState(true)
  const [questions, setQuestions] = useState([])
  const [correctAnswers, setCorrectAnswers] = useState([])
  const [selectedAnswers, setSelectedAnswers] = useState([])
  const [score, setScore] = useState(0)
  const [playAgain, setPlayAgain] = useState(false)


  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple')
        // console.log(response.data.results)
        //const data = response.data.results
        setQuestions(() => {
          const records = response.data.results
          const results = records.map((record, index) => ({
            ...record,
            id: Date.now() + '' + index,
          }))
          return results
        })
      } catch (error) {
        console.log(error)
      }
    }
    if (startQuiz === false){
      getData()
    }

  },[startQuiz])

  useEffect(() => {
    const res = questions.map(question => question.correct_answer)
    setCorrectAnswers(res)
  }, [questions.length, setCorrectAnswers])

  const handleStart = () => {
    setStartQuiz(false)
  }

  // const shuffleArray = (array) => {
  //   const shuffledArray = [...array] // [1,2]
  //   for (let i = shuffledArray.length - 1 /* 1*/; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1)); // 1
  
  //     [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
  //   }
  //   return shuffledArray
  // }
  


  return (
    <>
      <main className='container'>
        {questions.length > 0 ? (
          questions.map((quiz) => {
            // eslint-disable-next-line camelcase
            const { id, question, correct_answer, incorrect_answers } = quiz
            // eslint-disable-next-line camelcase
            const mixedOptions = [...incorrect_answers, correct_answer]
            return (
              <div key={id}>
                <h2>{decode(question)}</h2>
                <div className='answers'>
                  {mixedOptions.map((answer, i) => (
                    <label className='btn-answers' key={i}>
                      <input
                        type='radio'
                        name={`answer_${id}`}
                        value={answer}
                        checked={selectedAnswers[i] === answer}
                        
                      />
                      {decode(answer)}
                    </label>
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
