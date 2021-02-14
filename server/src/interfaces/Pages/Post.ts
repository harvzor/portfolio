import Page from "../Page";

interface Post extends Page {
    title: string
    canonical: boolean
    postDate: string
    tags: Array<string>
}

export default Post;
