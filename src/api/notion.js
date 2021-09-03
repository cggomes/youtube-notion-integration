const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });

class NotionAPI {

  async createNewToDoPlaylist({ playlistData, videos }) {
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
                content: `${playlistData.channelTitle} - ${playlistData.playlistTitle}`
              }
            }
          ]
        }
      }
    });

    const notionToDoVideos = videos.map(video => {
      return {
        type: 'to_do',
        to_do: {
          text: [
            {
              text: { content: `${video.position + 1} - ${video.videoTitle}` },
            }
          ],
          checked: false,
        }
      };
    })

    await notion.blocks.children.append({
      block_id: id,
      children: notionToDoVideos
    });
  }

}

module.exports = NotionAPI;