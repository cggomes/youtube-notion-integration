# **Youtube & Notion**

The idea of this project is to search for a **YouTube** channel, select a playlist from this channel and create a `page` on **Notion** with the playlist link as a `bookmark` and each video as a `to_do` (checkbox).

You can use it to keep track of playlists for study, games or anything you want. :)

*Read this in other languages: [English][readme_en], [Portuguese][readme_pt_br].*

## **Development Setup**

### **Prerequisites**

- Install [Node.js] which includes [Node Package Manager][npm]

### **Setting Up a Project**

Install dependencies:

```
npm install
```

Create a `.env` file in the root of the project and fill the following properties with your credentials from YouTube and Notion. (Without {})

```
NOTION_API_KEY={YOUR_NOTION_API_KEY}
NOTION_DATABASE={YOUR_NOTION_API_DATABASE}
YOUTUBE_API_KEY={YOUR_YOUTUBE_API_KEY}
ALLOWED_URLS=["{YOUR_DOMAIN}", "https://christiangustavo.github.io"]
```

To learn more about how to generate `NOTION_API_KEY` and `NOTION_DATABASE` check the API documentation from Notion:

https://developers.notion.com/docs/getting-started

To learn more about how to generate `YOUTUBE_API_KEY` check the API documentation from YouTube:

https://cloud.google.com/docs/authentication/api-keys

## **Contributing**

**Feel free to help me improve this project. :)** 

[node.js]: https://nodejs.org/
[npm]: https://www.npmjs.com/get-npm
[readme_en]: README.md
[readme_pt_br]: README.pt-br.md