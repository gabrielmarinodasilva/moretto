  import { useEffect, useState, useRef } from 'react'
  import api from '../../services/Api'
  import './style.css'
  import Trash from '../../assets/trash.svg'



  function Livros() {
    const [livros, setLivros] = useState([])
    const [autores, setAutores] = useState([])

    const inputTitulo = useRef()
    const inputGenero = useRef()
    const inputAno = useRef()
    const inputPaginas = useRef()
    const selectAutor = useRef()

    // Pega lista de livros
    async function getLivros() {
      const response = await api.get('/livros')
      setLivros(response.data)
    }

    // Pega lista de autores para o select
    async function getAutores() {
      const response = await api.get('/usuarios')
      setAutores(response.data)
    }

    // Cria livro
    async function createLivro() {
      await api.post('/livros', {
        titulo: inputTitulo.current.value,
        genero: inputGenero.current.value,
        ano_publicacao: parseInt(inputAno.current.value, 10),
        numero_paginas: parseInt(inputPaginas.current.value, 10),
        autorId: parseInt(selectAutor.current.value, 10),
      })

      // Limpar campos
      inputTitulo.current.value = ''
      inputGenero.current.value = ''
      inputAno.current.value = ''
      inputPaginas.current.value = ''
      selectAutor.current.value = ''

      getLivros()
    }

    async function deleteLivro(id){

    await api.delete(`/livros/${id}`)
     getLivros()
  }

    useEffect(() => {
      getLivros()
      getAutores()
    }, [])

    return (
      <div className='container'>
        <form >
        <h1>Cadastro de Livro</h1>
        <input placeholder="Título" ref={inputTitulo} />
        <input placeholder="Gênero" ref={inputGenero} />
        <input placeholder="Ano de publicação" type="date" ref={inputAno} />
        <input placeholder="Número de páginas" type="number" ref={inputPaginas} />
        <select ref={selectAutor}>
          <option className='option' value="">Selecione o autor</option>
          {autores.map((autor) => (
            <option key={autor.id_autor} value={autor.id_autor}>
              {autor.nome}
            </option>
          ))}
        </select>
        <button onClick={createLivro}>Cadastrar Livro</button>
        
        </form>
        <h2>Livros cadastrados</h2>
        {livros.map((livro) => (
          <div key={livro.id_livro }className="Card">
            <div>
            <p><b>{livro.titulo}</b> ({livro.ano_publicacao})</p>
            <p>Gênero: {livro.genero}</p>
            <p>Páginas: {livro.numero_paginas}</p>
            <p>Autor: {livro.autor?.nome}</p>
            </div>
            <button onClick={() =>deleteLivro(livro.id_livro)}>
                        <img src={Trash} />
              </button>
          </div>
          
        ))}
      </div>
    )
  }

  export default Livros
