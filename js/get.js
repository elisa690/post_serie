//Manipulação - DOM
const resposta = document.querySelector('#resposta');
const lista = document.querySelector('#lista-series');
const modelo = document.querySelector('#modelo-serie');

const apiKey = 'cv_y0bXQ24o8wsqjX5wFWIOQVTVmZ-DEE3Xg9aPaCALXrsLK6KKH96DAc8VoVIe00A2';

const apiUrl = 'https://api-ds.codeverse.dev.br/api/series';

//Funcao que busca todos os herois da API

async function buscarSeries() {
    resposta.textContent = 'Carregando séries...';

    try {
        //Fazer uma requisicao GET para buscar os herois
        const retorno = await fetch(apiUrl, {
            method: 'GET',
            headers: { 'x-api-key': apiKey },
        });

        if (!retorno.ok) {
            throw new Error('Nao foi possivel buscar as series');
        }

        //converter para JSON
        const resultado = await retorno.json();



        //Percorrer todos os series e montar o serie.

        for (const serie of resultado.data) {
            const card = modelo.content.cloneNode(true);

            card.querySelector('.nome').textContent = serie.title;
            card.querySelector('.genero').textContent = serie.genero;
            card.querySelector('.ano').textContent = serie.ano_lancamento;
            card.querySelector('.plataforma').textContent = serie.plataforma;

            const imagem = card.querySelector('img');

            if (serie.imageUrl) {
                imagem.src = serie.imageUrl;
                imagem.alt = serie.title;
            } else {
                imagem.remove();
            }

            lista.appendChild(card);
        }

        resposta.textContent = '';
    } catch (error) {
        resposta.textContent = 'Não foi possivel carregar as series. Tente novamente!';
        console.error(error);
    }
}
//executo a funcao
buscarSeries();
