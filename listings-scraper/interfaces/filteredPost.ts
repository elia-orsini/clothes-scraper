import { IPost } from "./post";

export default interface IFilteredPost {
  post: IPost;
  noMatches: number;
}
