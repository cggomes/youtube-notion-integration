const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });

class NotionAPI {

  async createNewPlaylist() {
    const { id } = await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_DATABASE
      },
      properties: {
        Status: { select: { id: '1' } },
        Name: {
          title: [
            {
              text: {
                content: 'API Test Started'
              }
            }
          ]
        }
      }
    });

    await notion.blocks.children.append({
      block_id: id,
      children: [
        {
          type: 'to_do',
          to_do: {
            text: [
              {
                text: { content: '1 - TODO Test' },
              }
            ],
            checked: false,
            children: []
          }
        }
      ]
    });
  }

}

module.exports = NotionAPI;