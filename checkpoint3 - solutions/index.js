window.addEventListener('DOMContentLoaded', () => {
  const resultArea = document.querySelector('.resultArea')
  const form = document.querySelector('.form')
  const titleEl = document.querySelector('.title')
  const yearEl = document.querySelector('.year')
  const authorEl = document.querySelector('.author')
  const img = document.querySelector('.cover')

  form.addEventListener('submit', (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const data = {}

    formData.forEach((value, key) => {
      data[key] = value
    })

    resultArea.innerHTML = ''
    search({ type: data.type, title: data.search })
  })

  function search(searchTerm) {
    const url = `http://openlibrary.org/search.json?${searchTerm.type}=${searchTerm.title.replace(
      ' ',
      '+',
    )}`
    fetch(url)
      .then((raw) => raw.json())
      .then((json) => {
        const books = json.docs.slice(0, 10)

        books.forEach((book) => {
          createBookElement(book, resultArea)
        })
      })
  }
})

function createBookElement(book, parent) {
  const container = createElement('div', null, 'container')
  const titleEl = createElement('h2', book.title)
  const yearEl = createElement('h2', book.first_publish_year)
  const authorEl = createElement('h2', book.author_name[0])
  const imgEl = createElement('img', `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`)

  container.appendChild(titleEl)
  container.appendChild(yearEl)
  container.appendChild(authorEl)
  container.appendChild(imgEl)

  if (parent) {
    parent.appendChild(container)
  }
}

function createElement(tag, content, className = '') {
  const el = document.createElement(tag)
  el.className = className

  if (tag === 'img') {
    el.src = content
  } else {
    el.innerHTML = content
  }

  return el
}
