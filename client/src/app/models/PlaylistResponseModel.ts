export interface PlaylistResponseModel {
  items: PlaylistItems[];
}

export interface PlaylistItems {
  id: string;
  playlistTitle: string;
  channelTitle: string;
  publishedAt: string;
  thumbnailSrc: string;
}
