import { useEffect, useState, useRef } from 'react'
import api from '../../services/Api'
import './livro.css'
import { Link } from 'react-router-dom'

function Livros() {
  const [livros, setLivros] = useState([])
  const [autores, setAutores] = useState([])
  const [editando, setEditando] = useState(false)
  const [livroEditandoId, setLivroEditandoId] = useState(null)

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
    const response = await api.get('/autor')
    setAutores(response.data)
  }

  // Cria livro
  async function createLivro() {
    const numeroPaginas = inputPaginas.current.value
    console.log('Valor do campo páginas:', numeroPaginas)
    console.log('Valor parseado:', parseInt(numeroPaginas, 10))
    
    const dadosLivro = {
      titulo: inputTitulo.current.value,
      genero: inputGenero.current.value,
      ano_publicacao: parseInt(inputAno.current.value, 10),
      numero_paginas: parseInt(numeroPaginas, 10) || null,
      id_autor: parseInt(selectAutor.current.value, 10),
    }
    
    console.log('Dados enviados:', dadosLivro)
    
    await api.post('/livros', dadosLivro)

    limparCampos()
    getLivros()
  }

  // Atualiza livro
  async function updateLivro() {
    const numeroPaginas = inputPaginas.current.value
    console.log('Valor do campo páginas (edição):', numeroPaginas)
    console.log('Valor parseado (edição):', parseInt(numeroPaginas, 10))
    
    const dadosLivro = {
      titulo: inputTitulo.current.value,
      genero: inputGenero.current.value,
      ano_publicacao: parseInt(inputAno.current.value,10),
      numero_paginas: parseInt(inputPaginas.current.value,10),
      id_autor: parseInt(selectAutor.current.value, 10),
    }
    
    console.log('Dados enviados (edição):', dadosLivro)
    
    await api.put(`/livros/${livroEditandoId}`, dadosLivro)

    limparCampos()
    setEditando(false)
    setLivroEditandoId(null)
    getLivros()
  }

  // Preenche o formulário para edição
  function editarLivro(livro) {
    inputTitulo.current.value = livro.titulo
    inputGenero.current.value = livro.genero
    inputAno.current.value = livro.ano_publicacao
    inputPaginas.current.value = livro.numero_paginas
    selectAutor.current.value = livro.id_autor
    
    setEditando(true)
    setLivroEditandoId(livro.id_livro)
    
    // Scroll para o formulário
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Cancela a edição
  function cancelarEdicao() {
    limparCampos()
    setEditando(false)
    setLivroEditandoId(null)
  }

  // Limpa os campos do formulário
  function limparCampos() {
    inputTitulo.current.value = ''
    inputGenero.current.value = ''
    inputAno.current.value = ''
    inputPaginas.current.value = ''
    selectAutor.current.value = ''
  }

  async function deleteLivro(id) {
    await api.delete(`/livros/${id}`)
    getLivros()
  }

  useEffect(() => {
    getLivros()
    getAutores()
  }, [])

  return (
    <div className='container'>
      <form>
        <h1>{editando ? 'Editar Livro' : 'Cadastro de Livro'}</h1>
        <input placeholder="Título" ref={inputTitulo} required/>
        <input placeholder="Gênero" ref={inputGenero} required/>
        <input placeholder="Ano de publicação" type="number" min = "1000" max ="9999" ref={inputAno} required/>
        <input placeholder="Número de páginas" type="number" min="1" ref={inputPaginas} required />
        <select ref={selectAutor}required>
          <option className='option' value="">Selecione o autor</option>
          {autores.map((Autor) => (
            <option key={Autor.id_autor} value={Autor.id_autor}>
              {Autor.nome}
            </option>
          ))}
        </select>
        
        {editando ? (
          <>
            <button type='submit' onClick={updateLivro}>Salvar alteração</button>
            <button type='button' onClick={cancelarEdicao}>Cancelar edição</button>
          </>
        ) : (
          <button type='submit' onClick={createLivro}>Cadastrar Livro</button>
        )}
        
        <Link to="/Home" className="botao_opcao">Voltar para home</Link>
      </form>
      
      <h2>Livros cadastrados</h2>
      {livros.map((livro) => (
        <div key={livro.id_livro} className="Card">
          <div>
            <p><b>{livro.titulo}</b> ({livro.ano_publicacao})</p>
            <p>Gênero: {livro.genero}</p>
            <p>Páginas: {livro.numero_paginas}</p>
            <p>Autor: {livro.Autor?.nome}</p>
          </div>
            <div className='botoes'>
              
              <button className='excluir'onClick={() => deleteLivro(livro.id_livro)}>
                Excluir
              </button>
              <button className='editar'onClick={() => editarLivro(livro)}>
                Editar
              </button>
            </div>
        </div>
      ))}
    </div>
  )
}

export default Livros