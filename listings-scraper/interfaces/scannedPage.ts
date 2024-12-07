import { IPost } from "./post";

export interface IScannedPage {
  noPosts: number;
  noWords: number;
  noLikes: number;
  noComments: number;
  posts: Record<string, IPost>;
}
