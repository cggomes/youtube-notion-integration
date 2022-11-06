export interface PlaylistResponseModel {
  items: PlaylistItem[];
}

export interface PlaylistItem {
  id: string;
  playlistTitle: string;
  channelTitle: string;
  publishedAt: string;
  thumbnailSrc: string;
}
