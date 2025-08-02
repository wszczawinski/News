import type { Post } from "@/types";
import { FormattedDate } from "./FormattedDate";
import { BackButton } from "./BackButton";

export const SinglePost = ({ post }: { post: Post }) => {

    return (
        <div className="space-y-3">
            <span className="flex flex-row justify-between">
                <h4 className="text-xl font-semibold tracking-tight sm:text-2xl">{post.title}</h4>
                <BackButton />
            </span>

            <FormattedDate date={post.createdAt} />

            <div className="flex flex-col gap-2 text-sm text-justify" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
    )
}
