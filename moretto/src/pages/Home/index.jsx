import { useEffect, useState, useRef } from 'react'
import './style.css'
import Trash from '../../assets/trash.svg'
import api from '../../services/Api'
import teste from '../main/index'
import { Link } from 'react-router-dom'

function Home() {


const [users, setUsers] = useState([])

const inputNome = useRef()
const inputBiografia = useRef()
const inputDataNascimento = useRef()
const inputNacionalidade = useRef()


  


  async function getUsers(){
    const usersFromApi = await api.get('/usuarios')
    
    setUsers(usersFromApi.data)
  }
function formatDate(dateStr) {
  if (!dateStr) return ''
  const [year, month, day] = dateStr.toString().substring(0, 10).split('-')
  return `${day}/${month}/${year}`
}

  async function createUsers(){


    await api.post('/usuarios', {
      
      nome: inputNome.current.value,
      biografia: inputBiografia.current.value,
      data_nascimento: inputDataNascimento.current.value,
      nacionalidade: inputNacionalidade.current.value

    })

    getUsers()

  }

  async function deleteUsers(id){
    await api.delete(`/usuarios/${id}`)
    getUsers()
  }



  useEffect(() => {
      getUsers()
  },  [])
  

  return (

    <div className='container'>
      <form>
        <h1>Cadastro de Autor</h1>
        <input placeholder="Nome " name='nome' ref={inputNome}required />
        <input placeholder="Biografia " name='biografia' ref={inputBiografia} required/>
        <input placeholder="Data Nascimento " type="date" name='data' ref={inputDataNascimento}required />
        <input placeholder="Nacionalidade " name='nacionalidade' ref={inputNacionalidade} required/>

          <button type="Submit" onClick={createUsers}>Cadastrar</button>
          <button type='button'><Link to="/livros" className="botao_opcao">Cadastrar Livro</Link></button>
          <button type='button'><Link to="/home" className='botao_opcao' >Voltar Home</Link></button>

      </form>

      {users.map(user => (
        <div key={user.id_autor} className="Card">
          <div>
            <p>Nome: <span>{user.nome}</span></p>
            <p>Biografia: <span>{user.biografia} </span></p>
            <p>Data nascimento: <span>{formatDate(user.data_nascimento)} </span></p>
            <p>Nacionalidade: <span>{user.nacionalidade} </span></p>
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

export default Home
