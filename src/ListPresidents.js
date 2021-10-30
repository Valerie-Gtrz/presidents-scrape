import {useState} from 'react'
const list = require('./presidents.json')

function ListPresidents(){

const [state, setState] = useState(false)

const allPresies = list.map(({name},index)=> <li key={index}>{name}</li>)

function getPresidents(){
setState(true)
}

return(
    <>
    <button onClick={() => getPresidents()}>See all Presidents</button>
    {state ? <ol>{allPresies}</ol> : null}
    </>
)
}

export default ListPresidents;