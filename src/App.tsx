import { useEffect, useState } from 'react';
import { Botao } from './components/Botao';
import { CardFilme } from './components/CardFilme';
import { api } from './services/api';


import './styles/global.scss';
import './styles/sidebar.scss';
import './styles/conteudo.scss';

interface PropsGeneroResponse {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface PropsFilmes {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}


function App() {
  const [selectedGeneroId, setSelectedGeneroId] = useState(1);
  const [generos, setGeneros] = useState<PropsGeneroResponse[]>([]);
  const [filmes, setFilmes] = useState<PropsFilmes[]>([]);
  const [selectedGenero, setSelectedGenero] = useState<PropsGeneroResponse>({} as PropsGeneroResponse);

  useEffect(() => {
    api.get<PropsGeneroResponse[]>('genres').then(response => {
      setGeneros(response.data);
    })
  }, []);

  useEffect(() => {
    api.get<PropsFilmes[]>(`movies/?Genre_id=${selectedGeneroId}`).then(response => {
      setFilmes(response.data);
    });

    api.get<PropsGeneroResponse>(`genres/${selectedGeneroId}`).then(response => {
      setSelectedGenero(response.data);
    })
  }, [selectedGeneroId]);

  function handleClickButton(id: number) {
    setSelectedGeneroId(id);
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <nav className="sidebar">
        <span>
          Watch <p>Me</p>
        </span>
        <div className="buttons-container">
          {generos.map(genero => (
            <Botao
              key={String(genero.id)}
              title={genero.title}
              iconName={genero.name}
              onClick={() => handleClickButton(genero.id)}
              selected={selectedGeneroId === genero.id}
            />
          ))}
        </div>
      </nav>

      <div className="container">
        <header>
          <span>
            Categoria: <span>{selectedGenero.title}</span>
          </span>
        </header>
        <main>
          <div className="movies-list">
            {filmes.map(filme => (
              <CardFilme
                key={filme.imdbID}
                title={filme.Title}
                poster={filme.Poster}
                runtime={filme.Runtime}
                rating={filme.Ratings[0].Value}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
