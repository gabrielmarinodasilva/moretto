import { useEffect, useState, useRef } from 'react'
import './style.css'
import Trash from '../../assets/trash.svg'
import api from '../../services/Api'

function Home() {


const [users, setUsers] = useState([])

const inputNome = useRef()
const inputBiografia = useRef()
const inputIdade = useRef()
const inputNacionalidade = useRef()


  


  async function getUsers(){
    const usersFromApi = await api.get('/usuarios')
    
    setUsers(usersFromApi.data)
  }

  async function createUsers(){
const idadeStr = inputIdade.current.value.trim()
const idade = parseInt(idadeStr, 10)

    await api.post('/usuarios', {
      
      nome: inputNome.current.value,
      biografia: inputBiografia.current.value,
      idade: idade, // ✅ Agora é um número
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
        <input placeholder="Nome " name='nome' ref={inputNome}/>
        <input placeholder="Biografia " name='biografia' ref={inputBiografia}/>
        <input placeholder="Idade " type="number" name='idade' ref={inputIdade}/>
        <input placeholder="Nacionalidade " name='nacionalidade' ref={inputNacionalidade}/>
        <button type="button" onClick={createUsers}>Cadastrar</button>
      </form>

      {users.map(user => (
        <div key={user.id} className="Card">
          <div>
            <p>Nome: <span>{user.nome}</span></p>
            <p>Biografia: <span>{user.biografia} </span></p>
            <p>Idade: <span>{user.idade} </span></p>
            <p>Nacionalidade: <span>{user.nacionalidade} </span></p>
          </div>
          <button onClick={() =>deleteUsers(user.id)}>
            <img src={Trash} />
          </button>
          </div>

        ))}

      </div>

  )
}

export default Home
