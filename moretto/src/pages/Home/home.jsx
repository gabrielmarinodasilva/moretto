import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/Api'
import '../home/home.css'

function Home() {
  const [autores, setAutores] = useState([])
  const navigate = useNavigate()

  async function getAutores() {
    try {
      const response = await api.get('/autor')
      setAutores(response.data)
    } catch (error) {
      console.error('Erro ao buscar autores:', error)
    }
  }


  useEffect(() => {
    getAutores()
  }, [])

  return (
    <div className='container'>
      <h2>Autores e Livros</h2>

      <button type='button' onClick={() => navigate('/autor')} className='botao_opcao'>
        Cadastrar Autor
      </button>
      <button type='button' onClick={() => navigate('/livros')} className='botao_opcao'>
        Cadastrar Livro
      </button>

      {autores.map((autor) => (
        <div key={autor.id_autor} className='Card'>
          <h3 className='autor-nome'>{autor.nome}</h3>
          <p><strong>Biografia:</strong> {autor.biografia}</p>
          <p><strong>Nascimento:</strong> {autor.nascimento}</p>
          <p><strong>Nacionalidade:</strong> {autor.nacionalidade}</p>
          <p><strong>Livros:</strong></p>
          <ul>
            {autor.livros && autor.livros.length > 0 ? (
                    autor.livros.map((livro) => (
                      <li key={livro.id_livro}>
                        <p><b>{livro.titulo}</b> ({new Date(livro.ano_publicacao).getFullYear()})</p>
                      </li>
                    ))
                  ) : (
                    <li>Nenhum livro cadastrado.</li>
                  )}
          </ul>
        
        </div>
      ))}
    </div>
  )
}

export default Home
