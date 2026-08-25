import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'
import { useState } from 'react'
import { useMutation } from '@apollo/client/react'

const ADD_YEAR = gql`
 mutation addYear(
  $name: String
  $setBornTo: Int
 ) {
   editAuthor(name: $name, setBornTo: $setBornTo){
    name
    born
    bookCount
   }
 }
`
const ALL_AUTHORS =gql `
  query {
     allAuthors {
      name
      born
      bookCount
     }
  }
`
const Authors = (props) => {
  if (!props.show) {
    return null
  }
  const [name, setName] = useState('')
  const [born, setBorn] = useState(0)

    const [addYear] = useMutation(ADD_YEAR, {
      refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const setBirthYear = (event) => {
    event.preventDefault()
    addYear({ variables: {name, setBornTo: born}})

    setName('')
    setBorn(0)
  }
 const authors = props.authors
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {props.token && (
        <>
          <h2>Set birthyear</h2>
          <form onSubmit={setBirthYear}>
          <label>
            Name:
            <select name="name" value={name} onChange={(e) => setName(e.target.value)}>
              {authors.map((a) => 
                <option key={a.name} value={a.name}>{a.name}</option>
              )}
            </select>
          </label>
          <label>
            born
            <input value={born} onChange={({ target }) => setBorn(Number(target.value))} />
          </label>
          <button type="submit">update author</button>
        </form>
      </>
      )}
    </div>
  )
}

export default Authors
