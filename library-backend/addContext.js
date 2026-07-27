const addContext = async () => {
    // 1. Lisää authorit
  const authors = await Author.insertMany([
    { name: "Robert Martin", born: 1952 },
    { name: "Martin Fowler", born: 1963 },
    { name: "Fyodor Dostoevsky", born: 1821 },
    { name: "Joshua Kerievsky" },
    { name: "Sandi Metz" }
  ])

  // 2. Luo kartta: nimi → ObjectId
  const authorMap = {}
  authors.forEach(a => {
    authorMap[a.name] = a._id
  })

  // 3. Lisää kirjat käyttäen ObjectId‑viittauksia
  await Book.insertMany([
    {
      title: "Clean Code",
      published: 2008,
      author: authorMap["Robert Martin"],
      genres: ["refactoring"],
    },
    {
      title: "Agile software development",
      published: 2002,
      author: authorMap["Robert Martin"],
      genres: ["agile", "patterns", "design"],
    },
    {
      title: "Refactoring, edition 2",
      published: 2018,
      author: authorMap["Martin Fowler"],
      genres: ["refactoring"],
    },
    {
      title: "Refactoring to patterns",
      published: 2008,
      author: authorMap["Joshua Kerievsky"],
      genres: ["refactoring", "patterns"],
    },
    {
      title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
      published: 2012,
      author: authorMap["Sandi Metz"],
      genres: ["refactoring", "design"],
    },
    {
      title: "Crime and punishment",
      published: 1866,
      author: authorMap["Fyodor Dostoevsky"],
      genres: ["classic", "crime"],
    },
    {
      title: "Demons",
      published: 1872,
      author: authorMap["Fyodor Dostoevsky"],
      genres: ["classic", "revolution"],
    },
  ])
}