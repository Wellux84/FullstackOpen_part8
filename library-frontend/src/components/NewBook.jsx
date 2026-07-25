import { useState } from 'react'
import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client/react'

const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]
  ) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      title
      author
      published
      genres
    }
  }
  `

  const ALL_BOOKS = gql `
  query {
    allBooks {
      title
      author
      published
    }
  }
`
const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }]
})

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    createBook({ variables: {title, author, published: Number(published), genres}})
    console.log('add book...')

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <label name="title">
            <input
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
        </div>
        <div>
          author
          <label name="author">
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </div>
        <div>
          published
          <label name="published">
            <input
              type="number"
              value={published}
              onChange={({ target }) => setPublished(target.value)}
            />
          </label>
        </div>
        <div>
          <label name="genre">
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
          </label>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
