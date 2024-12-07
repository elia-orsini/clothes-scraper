import Image from "next/image";
import Link from "next/link";

import { IPost } from "interfaces/post";

const PostPreview: React.FC<{ post: IPost; keys: string[] }> = ({
  post,
  keys,
}) => {
  return (
    <div
      id={post.url}
      className="flex flex-col border border-black block cursor-pointer text-sm"
    >
      <Link href={`/post/${post.url}?keys=${keys.join(",")}`}>
        <div className="relative w-full h-40">
          <Image
            unoptimized={true}
            src={`/archivepdf/${post.images[0]}`}
            alt=""
            fill={true}
            priority={false}
            style={{ objectFit: "contain" }}
            sizes="10vw"
          />
        </div>

        <p className="ml-1 font-mono mt-2">{post.date}</p>

        <p className="text-left text-sm mx-1 mt-2">{post.abstract}</p>
      </Link>
    </div>
  );
};

export default PostPreview;
