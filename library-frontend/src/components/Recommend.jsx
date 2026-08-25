import { useQuery } from '@apollo/client/react'
import { ME, ALL_BOOKS_BY_GENRE } from '../queries'

const Recommend = ({ show }) => {
  const userResult = useQuery(ME)

  const genre = userResult.data?.me?.favoriteGenre

  const booksResult = useQuery(ALL_BOOKS_BY_GENRE, {
    variables: { genre },
    skip: !genre
  })

  if (!show) {
    return null
  }

  if (userResult.loading || booksResult.loading) {
    return <div>loading...</div>
  }

  const books = booksResult.data?.allBooks || []

  return (
    <div>
      <h2>recommendations</h2>

      <p>
        books in your favorite genre <strong>{genre}</strong>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>

          {books.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend