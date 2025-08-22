import type { Post } from "@/types";
import { FormattedDate } from "./FormattedDate";
import { BackButton } from "./BackButton";

import news_img_4 from "@/images/news_img_4.png";
import news_img_5 from "@/images/news_img_5.png";
import { GalleryDialog } from "./GalleryDialog";
import { Button } from "./ui/button";

export const SinglePost = ({ post }: { post: Post }) => {
  const newsImages = [
    news_img_4,
    news_img_5,
    news_img_4,
    news_img_5,
    news_img_4,
    news_img_5,
    news_img_4,
    news_img_5,
  ];

  return (
    <div className="space-y-3">
      <span className="flex flex-row justify-between">
        <h4 className="text-xl font-semibold tracking-tight sm:text-2xl">
          {post.title}
        </h4>

        <div className="flex justify-center gap-4">
          <Button variant="default" size="sm">
            <GalleryDialog images={newsImages} title={post.title} />
          </Button>
          <BackButton />
        </div>
      </span>

      <FormattedDate date={post.createdAt} />

      <div
        className="flex flex-col gap-2 text-sm text-justify"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
};
