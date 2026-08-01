export type BgmTrack = {
  title: string;
  artist: string;
  src: string;
};

// 把有公开播放权的音频放进 public/audio，再在这里登记。
// 例：{ title: "Ice Lake", artist: "Jason", src: "/audio/ice-lake.mp3" }
export const bgmTracks: BgmTrack[] = [];
