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
  const [year, setYear] = useState(0)

    const [addYear] = useMutation(ADD_YEAR, {
      refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const setBirthYear = (event) => {
    event.preventDefault()
    addYear({ variables: {name, setBornTo: year}})

    setName('')
    setYear(0)
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
      <h2>Set birthyear</h2>
      <form onSubmit={setBirthYear}>
        <label>
          Name:
          <select onChange={(e) => setName(e.target.value)}>
            {authors.map((a) => 
              <option key={a.name} value={a.name}>{a.name}</option>
            )}
          </select>
          </label>
          <label>
          Year:
          <input value={year} onChange={({ target }) => setYear(Number(target.value))} />
        </label>
        <button type="submit">Add Born Year</button>
      </form>
    </div>
  )
}

export default Authors
