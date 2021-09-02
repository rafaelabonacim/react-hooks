import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'

function Profile() {
  const {usuario = 'rafabonacim'} = useParams();
  const [profile, setProfile] = useState({});
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
      setShowProfile(true)
      console.log(profile)
  },[profile])
  useEffect(() => {
    fetch(`https://api.github.com/users/${usuario}`,{
        headers: {
            'Authorization': `token ${process.env.REACT_APP_TOKEN}`
        }
    })
    .then(resposta => resposta.json())
    .then(resposta => setProfile(resposta))
    .catch(error => window.alert('travou'));
},[usuario])

  return (
    <main>
      {!showProfile &&
        (
          <div className="d-flex justify-content-center align-items-center">
            <div class="spinner-grow" role="status">
              <span class="visually-hidden">Carregando...</span>
            </div>
          </div>
        )
      }
      {showProfile &&
        (
          <>
            <h1>{profile.login}</h1>
            <p>Meus dados aqui</p>
            <img src={profile.avatar_url} alt="" />
          </>
        )
      }
    </main>
  )
}

export default Profile;