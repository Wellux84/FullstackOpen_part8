const Books = ({ show, books, setGenre, refetch, genre }) => {
  
    const selectGenre = (genre) => {
    setGenre(genre)
    refetch({ genre })
  }

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      {genre && <p>in genre <strong>{genre}</strong></p>}

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
            <th>genres</th>
          </tr>
          {books.map((a, index) => (
            <tr key={index}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
              <td>{a.genres.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => selectGenre('crime')}>
        crime
      </button>

      <button onClick={() => selectGenre('refactoring')}>
        refactoring
      </button>

      <button onClick={() => selectGenre(null)}>
        all genres
      </button>

      <button onClick={() => selectGenre('agile')}>
        agile
      </button>

      <button onClick={() => selectGenre('patterns')}>
        patterns
      </button>

      <button onClick={() => selectGenre('design')}>
        design
      </button>

      <button onClick={() => selectGenre('classic')}>
        classic
      </button>

      <button onClick={() => selectGenre('revolution')}>
        revolution
      </button>
    </div>
  )
}

export default Books
