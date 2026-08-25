import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`
export const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`

export const ALL_BOOKS_BY_GENRE = gql`
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