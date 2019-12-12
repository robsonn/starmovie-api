## Intro

Api que cadastra planetas referentes ao filme star wars e busca os filmes que eles pareceram.

## Tecnologias

Linguagem principal - NodeJs

Bibliotecas auxiliares:
-   **body-parser** - auxilia nas requests json
-   **cors** - auxilia no header das requests para melhor comunicação no servidor
-   **express** - auxilia requests da api
-   **nodemon** - auxilia no debug da api em modo dev
-   **morgan** - auxilia no log em modo dev
-   **axios** - auxilia requests para api
-   **mongoose** - auxila a modelagem de dados no mongodb
-   **mongoose-paginate-v2** - auxilia a criar paginacao nas requisicoes http que utilizam o mongo
-   **chai** - testes em modo dev
-   **mocha** - testes em modo dev
-   **chai-http** - testes em modo dev



## API - funcionalidades
-   Boas Vindas - GET ${url}:${config.port}/api/
-   Listar Planetas - GET ${url}:${config.port}/api/planet
-   Listar Planeta por nome em query - GET ${url}:${config.port}/api/planet?name=${planeta}
-   Listar Planeta por id em query - GET ${url}:${config.port}/api/planet?id=${id}
-   Listar Planeta por id em params - GET ${url}:${config.port}/api/planet/${id}
-   Salvar Planeta - POST ${url}:${config.port}/api/planet
- body {
      	"name":  ${name},
	     "climate": ${climate}
          "terrain": ${terrain}
    }
-   Atualizar Planeta - PUT $url:${config.port}/api/planet/${id}
- body {
      	"name":  ${name},
	     "climate": ${climate}
          "terrain": ${terrain}
    }
-   Deletar Planeta - DELETE - $url:${config.port}/api/planet/${id}    


## Testes

Os testes foram criados para testar as requisicoes e seus retornos


Foram utilizados as bibliotecas abaixo:
-   chai
-   chai-http
-   axios
-   mocha

Comando para executar:
npm test