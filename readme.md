# https://harveywilliams.net/

This is the source code to my personal blog and website which is hosted at https://harveywilliams.net/.

This website was one of my first forays into building a full website using NodeJS. I chose this runtime rather than one which I'm more comfortable with because it gives me the opportunity to learn something new. Besides, Node is a lot of fun to work with. Please note that the code written here isn't perfect. Copy at your own risk!

## How it's built

I'm not sure there's a conventional way to build a NodeJS but I can assure you that this site is not conventional...

### Data

A majority of the website's page content is stored in the `/data/` directory in HTML or MD files. I started with HTML but soon decided that Markdown would be more future proof as it could easily be ported between websites without much work. Further more, it allows the viewing of the content on GitHub in a pretty way.

The `/data/` folder also contains `JSON` files which describe the pages that there are. For examaple, `blog.json` looks something like this:

```
{
    "path": "/blog",
    "name": "blog",
    "pageTitle": "Blog",
    "pageGroup": "blog",
    "metaDescription": "Read about my latest thoughts and experiences in the world of web development.",
    "controller": "blogs"
}
```

This file defines that if the website is visited at `/blog/`, then a page will be returned using the `blogs` controller.

This approach of storing the data in JSON files in a file structure means that for now I can avoid using a database (and all of the overhead that comes with that, including development/staging/live databases and backing them up).

The benefits of this approach include that the JSON files can simply be indexed into a Mongo-like database in the future.

### Views

Views are built using EJS. It's not the most pretty but it works on the front end or back end so there's no need to learn two templating engines when I can just learn one. They're all basically the same anyway, right?

### Sass/CSS

SCSS is used to style the website. Susy is used as the grid system to give me full control of the website.

### JS

Nothing fancy here, just standard JS with no frameworks (such as jQuery).

### Gulp

Gulp is used for development. I must warn anyone that the gulpfile got a little out of hand - it's been made pretty by using Blessed to make windows in the terminal window which data is printed to.

Running `npm start` (which in turn runs `gulp --silent`) compiles the SCSS, JS and runs the website (for easy development). Make sure to run `npm install` before trying this.

## Misc

### IIS

IIS is used to run the live site as I already have a Windows server. This is done by using IISNode and changing the `/server/config.js` `type` to `iis`.

I actually have a whole blog post on how you can setup IIS to run NodeJS websites using NodeJS: https://harveywilliams.net/blog/installing-iisnode

## Contributing

Found a bug on my site? Think there's a feature missing? Found a typo in a blog post? File an issue or send me a pull request!
