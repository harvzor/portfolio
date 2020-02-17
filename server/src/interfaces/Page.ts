interface Page {
    /**
     * URL path. Something like /about.
     */
    path: string,
    /**
     * Name of the page. ID?
     */
    name: string,
    /**
     * Title of the page which can be printed.
     */
    pageTitle: string,
    /**
     * Group of pages this page belongs to, such as "blog".
     */
    pageGroup: string,
    /**
     * Path to the main content body Markdown file.
     */
    bodyText?: string,
    /**
     * SEO description of the page.
     */
    metaDescription: string,
    /**
     * Code controller name, such as if the controller is "pageController", this value is "page".
     */
    controller: string
    /**
     * If this page should be visible if the site is not in dev mode.
     */
    published: boolean
    /**
     * Child pages.
     */
    children: Array<Page>
}

export default Page;
