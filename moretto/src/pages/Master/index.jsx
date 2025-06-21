import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/Api'
import Trash from '../../assets/trash.svg'
import Lapis from '../../assets/lapis.svg'
import './style.css'

function Home() {
  const [livros, setLivros] = useState([])
  const navigate = useNavigate()

  async function getLivros() {
    try {
      const response = await api.get('/livros')
      setLivros(response.data)
    } catch (error) {
      console.error('Erro ao buscar livros:', error)
    }
  }

  async function deleteLivro(id) {
    try {
      await api.delete(`/livros/${id}`)
      getLivros()
    } catch (error) {
      console.error('Erro ao deletar livro:', error)
    }
  }

  function editarLivro(livro) {
    // Redireciona para /livros enviando o livro para edição
    navigate('/livros', { state: { livro } })
  }

  useEffect(() => {
    getLivros()
  }, [])

  return (
    <div className='container'>
      <h2>Lista de Livros</h2>

      {/* Botões para ir para cadastro de autor e livros */}
      <button type='button' onClick={() => navigate('/autor')} className='botao_opcao'>
        Cadastrar Autor
      </button>
      <button type='button' onClick={() => navigate('/livros')} className='botao_opcao'>
        Cadastrar Livro
      </button>

      {/* Lista de livros */}
      {livros.map((livro) => (
        <div key={livro.id_livro} className='Card'>
          <div>
            <p>
              <b>{livro.titulo}</b> ({livro.ano_publicacao})
            </p>
            <p>Gênero: {livro.genero}</p>
            <p>Páginas: {livro.numero_paginas}</p>
            <p>Autor: {livro.Autor?.nome}</p>
          </div>

                <div className='botoes'>
                    
                    <button className='excluir'onClick={() => deleteLivro(livro.id_livro)}>
                      Excluir
                    </button>
                    <button className='editar'onClick={() => editarLivro(livro.id_livro)}>
                      Editar
                    </button>
                  </div>
        </div>
      ))}
    </div>
  )
}

export default Home
