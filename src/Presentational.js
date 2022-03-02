export function TextBox ({ words, handleChange }) {
    return (
        <textarea
            name="text"
            placeholder="Write your text here"
            value={words}
            onChange={handleChange}
        />
    )
}

export function singleWordDisplayer ({ word, getPrev, getNext }) {
    return (
        <><button onClick={() => getPrev()}>prev</button>{word}<button onClick={() => getNext()}>next</button></>
    )
}