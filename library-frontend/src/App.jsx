import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'
import { gql } from '@apollo/client'
import LoginForm from './components/LoginForm'
import Notify from './components/Notify'
import { useApolloClient, useQuery } from '@apollo/client/react'

const ALL_AUTHORS =gql `
  query {
     allAuthors {
      name
      born
      bookCount
     }
  }
`
const ALL_BOOKS = gql`
  query allBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`


const App = () => {
  const client = useApolloClient()
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(localStorage.getItem('library-user-token'))
  const [errorMessage, setErrorMessage] = useState(null)
  const [genre, setGenre] = useState(null)



  const result = useQuery(ALL_AUTHORS)
  const {
    data: bookData,
    loading: booksLoading,
    refetch
  } = useQuery(ALL_BOOKS, {
    variables: { genre }
  })
  if (result.loading || booksLoading) {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

    const onLogout = () => {
    setToken(null)
    localStorage.removeItem('library-user-token')
    client.resetStore()
  }
  if (!token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>
        <Notify message={errorMessage} />
        <div>
        <Authors show={page === 'authors'} authors={result.data.allAuthors} token={token}/>
        <Books show={page === 'books'} books={bookData.allBooks} setGenre={setGenre} refetch={refetch} />
        <LoginForm show={page === 'login'} setToken={setToken} setError={notify} />
        </div>
      </div>
    )
  }
  

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token ? <button onClick={onLogout}>logout</button> : <button onClick={() => setPage('login')}>login</button>}
        <button onClick={() => setPage('recommend')}>recommend</button>
      </div>

      <Authors show={page === 'authors'} authors={result.data.allAuthors} token={token}/>

      <Books show={page === 'books'} books={bookData.allBooks} setGenre={setGenre} refetch={refetch} genre={genre} />

      <NewBook show={page === 'add'} />
      <Recommend show={page === 'recommend'} />
    </div>
  )
}

export default App
