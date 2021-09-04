# **Youtube & Notion**

A ideia desse projeto é procurar por um canal do **YouTube**, selecionar uma playlist desse canal, e criar uma `page` no **Notion** com o link da playlist como um `bookmark` e cada vídeo como um `to_do` (checkbox).


Você pode utilizar para manter o controle sobre playlists para estudo, jogos ou qualquer outro assunto que você quiser. **:)**

*Leia em outros idiomas: [English][readme_en], [Portuguese][readme_pt_br].*

## **Setup de Desenvolvimento**

### **Pré-requisitos**

- Instale o [Node.js] que já inclui o [Node Package Manager][npm]

### **Executando o projeto**

Instalando as dependências:

```
npm install
```

Crie um arquivo `.env` na raiz do projeto e preencha as seguintes propriedades com as credenciais do YouTube e do Notion. (Sem {})

```
NOTION_API_KEY={SUA_NOTION_API_KEY}
NOTION_DATABASE={SUA_NOTION_API_DATABASE}
YOUTUBE_API_KEY={SUA_YOUTUBE_API_KEY}
```

Para saber mais sobre como gerar `NOTION_API_KEY` e `NOTION_DATABASE` verifique a documentação da API do Notion:

https://developers.notion.com/docs/getting-started

Para saber mais sobre como gerar `YOUTUBE_API_KEY` verifique a documentação da API do YouTube:

https://cloud.google.com/docs/authentication/api-keys

## **Contribuindo**

**Sinta-se à vontade para me ajudar a melhorar esse projeto. :)** 

[node.js]: https://nodejs.org/
[npm]: https://www.npmjs.com/get-npm
[readme_en]: README.md
[readme_pt_br]: README.pt-br.md