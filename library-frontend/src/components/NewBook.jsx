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
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
      genres
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
const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

const [createBook] = useMutation(CREATE_BOOK, {
  refetchQueries: [
    {
      query: ALL_BOOKS,
      variables: { genre: null }
    }
  ],
  awaitRefetchQueries: true,
  onError: (error) => {
    console.log('CREATE BOOK ERROR:', error.message)
  }
})

  if (!props.show) {
    return null
  }

const submit = async (event) => {
  event.preventDefault()

  await createBook({
    variables: {
      title,
      author,
      published: Number(published),
      genres
    }
  })

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
          <label name="title">
            title
            <input
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
        </div>
        <div>
          <label name="author">
            author
            <input
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </div>
        <div>
          <label name="published">
            published
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
