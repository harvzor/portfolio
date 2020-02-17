import Page from "../Page";

interface Post extends Page {
    postDate: string
    tags: Array<string>
}

export default Post;
