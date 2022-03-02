import { useState, useEffect } from "react"
import { TextBox } from "./Presentational"

//helper functions
const regex = /[^A-Za-z0-9]+/g

function turnToArray(str) {
    return str.split(regex).filter(item => item)
}

function countWords(str) {
    return turnToArray(str).length
}

function findRepeatedWords(str) {
    let arr = turnToArray(str).filter(word => word.length > 1)
    let repeatedWords = {}
    for (let i=0; i<arr.length; i++){
        let currentWord = arr[i].toLowerCase()
        let currentWordCount = 1
        if(Object.keys(repeatedWords).indexOf(currentWord) === -1) {
            for (let j=i+1; j<arr.length; j++){
                if(arr[j].toLowerCase()===currentWord){
                    currentWordCount++
                }
            }
            if (currentWordCount > 1) {
                repeatedWords[currentWord] = currentWordCount
            }    
        }
    }
    return repeatedWords
}

//get suggested words
async function getSuggestions(word, fun) {
    const dataMuseUrl = 'https://api.datamuse.com/words?'
    const queryParams = 'rel_syn='
    let wordQuery = word

    const endpoint = dataMuseUrl + queryParams + wordQuery

    try{
        const response =  await fetch(endpoint);
        if(response.ok){
          let jsonResponse = await response.json()
          fun(jsonResponse.map(object => object.word))
        }
      }
      catch(error){
        console.log(error);
      }
}

//main function
export function WordCounter() {
    const [words, setWords] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [queryWord, setQueryWord] = useState('')
    const repeatedWords = findRepeatedWords(words)

    const handleChange = (event) => {
        setSuggestions([])
        setWords(event.target.value)
    }

    useEffect(() => {
        getSuggestions(queryWord, setSuggestions)
    }, [queryWord])

    return (
        <main>
            <h1>Word Counter</h1>
            <TextBox words={words} handleChange={handleChange}/>
            <h2>Total Words: {countWords(words)}</h2>
            <h2>Repeated Words</h2>
            <ul>
                {Object.keys(repeatedWords).map((key, index)=> (<li key={index}>{key}: {repeatedWords[key]}<button onClick={() => setQueryWord(key)}>get suggestions</button></li>))}
            </ul>
            <ul>
                {suggestions.map((item, index )=> (<li key={index}>{item}</li>))}
            </ul>
        </main>
    )
}