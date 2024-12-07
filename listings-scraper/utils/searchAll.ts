import filteredPost from "interfaces/filteredPost";
import { parseSpecialCharacters } from "./parseSpecialCharacters";
import { allPages } from "../constants/dataConstants";

/**
 * @description search throughout all the posts using multiple keywords
 * @author elia
 */
const searchAll = (
  keys: string[],
  orderMostRecent: boolean | undefined,
  orderByLikes: boolean | undefined
) => {
  const filteredPosts: filteredPost[] = [];

  allPages.map((project: any) => {
    Object.keys(project.posts).map((url: string) => {
      const post = project.posts[url];

      const parsedCaption = parseSpecialCharacters(post.caption);

      let noMatches = 0;

      const regexes = keys.map(
        (key) => new RegExp(`\\b${parseSpecialCharacters(key)}\\b`, "gi")
      );

      if (regexes.every((regex) => regex.test(parsedCaption))) {
        for (let i = 0; i < regexes.length; i++) {
          const matches = parseSpecialCharacters(post.caption).match(
            regexes[i]
          );

          if (matches) {
            noMatches += matches.length;
          }
        }
      }

      if (noMatches) {
        filteredPosts.push({
          post,
          noMatches: 0,
        });
      }
    });
  });

  if (orderMostRecent) {
    filteredPosts.reverse();
  }

  if (orderByLikes) {
    filteredPosts.sort((a, b) => b.post.likes - a.post.likes);
  }
  
  if (orderByLikes === false) {
    filteredPosts.sort((a, b) => a.post.likes - b.post.likes);
  }

  return filteredPosts;
};

export default searchAll;
