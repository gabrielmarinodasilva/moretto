import { useEffect, useState, useRef } from 'react'
import './style.css'
import api from '../../services/Api'
import { Link } from 'react-router-dom'

function Autor() {
  const [Autor, setAutor] = useState([])
  const [editando, setEditando] = useState(false)
  const [autorEditandoId, setAutorEditandoId] = useState(null)

  const inputNome = useRef()
  const inputBiografia = useRef()
  const inputDataNascimento = useRef()
  const inputNacionalidade = useRef()

  useEffect(() => {
    getAutor()
  }, [])

  async function getAutor() {
    const AutorFromApi = await api.get('/Autor')
    setAutor(AutorFromApi.data)
  }

  function formatDate(dateStr) {
    const [year, month, day] = dateStr.toString().substring(0, 10).split('-')
    return ${day}/${month}/${year}
  }

  async function createAutor() {
    await api.post('/Autor', {
      nome: inputNome.current.value,
      biografia: inputBiografia.current.value,
      data_nascimento: inputDataNascimento.current.value,
      nacionalidade: inputNacionalidade.current.value,
    })
    limparCampos()
    getAutor()
  }

async function updateAutor(e) {
  e.preventDefault(); // ✅ Impede reload da página

  await api.put(/Autor/${autorEditandoId}, {
    nome: inputNome.current.value,
    biografia: inputBiografia.current.value,
    data_nascimento: inputDataNascimento.current.value,
    nacionalidade: inputNacionalidade.current.value,
  });

  limparCampos();
  setEditando(false);
  setAutorEditandoId(null);
  getAutor();
}


  function editarAutor(autor) {
    inputNome.current.value = autor.nome
    inputBiografia.current.value = autor.biografia
    inputDataNascimento.current.value = autor.data_nascimento
    inputNacionalidade.current.value = autor.nacionalidade

    setEditando(true)
    setAutorEditandoId(autor.id_autor)

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function cancelarEdicao() {
    limparCampos()
    setEditando(false)
    setAutorEditandoId(null)
  }

  function limparCampos() {
    inputNome.current.value = ''
    inputBiografia.current.value = ''
    inputDataNascimento.current.value = ''
    inputNacionalidade.current.value = ''
  }

  return (
    <div className='container'>
      <form onSubmit={editando ? updateAutor : createAutor}>
        <h1>{editando ? 'Editar Autor' : 'Cadastro de Autor'}</h1>
        <input placeholder="Nome" name='nome' ref={inputNome} required />
        <input placeholder="Biografia" name='biografia' ref={inputBiografia} required />
        <input placeholder="Data Nascimento" type="date" name='data' ref={inputDataNascimento} required />
        <input placeholder="Nacionalidade" name='nacionalidade' ref={inputNacionalidade} required />

        <button type="submit">
          {editando ? 'Salvar Alterações' : 'Cadastrar'}
        </button>

        {editando && (
          <button type='button' onClick={cancelarEdicao}>
            Cancelar edição
          </button>
        )}

        <button type='button'><Link to="/livros" className="botao_opcao">Cadastrar Livro</Link></button>
        <button type='button'><Link to="/home" className='botao_opcao'>Voltar Home</Link></button>
      </form>

      {Autor.map(autor => (
        <div key={autor.id_autor} className="Card">
          <div>
            <p>Nome: <span>{autor.nome}</span></p>
            <p>Biografia: <span>{autor.biografia}</span></p>
            <p>Data nascimento: <span>{formatDate(autor.data_nascimento)}</span></p>
            <p>Nacionalidade: <span>{autor.nacionalidade}</span></p>
          </div>
          <div className='botoes'>
            <button className='excluir' onClick={() => deleteAutor(autor.id_autor)}>Excluir</button>
            <button className='editar' onClick={() => editarAutor(autor)}>Editar</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Autor