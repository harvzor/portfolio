# https://harveywilliams.net/

This is the source code to my personal blog and website which is hosted at https://harveywilliams.net/.

This website was one of my first forays into building a full website using NodeJS. I chose this runtime rather than one which I'm more comfortable with because it gives me the opportunity to learn something new. Besides, Node is a lot of fun to work with. Please note that the code written here isn't perfect. Copy at your own risk!

## How it's built

I'm not sure there's a conventional way to build a NodeJS but I can assure you that this site is not conventional...

### Data

A majority of the website's page content is stored in the `/data/` directory in HTML or MD files. I started with HTML but soon decided that Markdown would be more future proof as it could easily be ported between websites without much work. Further more, it allows the viewing of the content on GitHub in a pretty way.

All of the meta data regarding pages is stored in the `/server/data.js` file. This is almost like the database of the website except the data is just stored in a JSON blob on a file. I have considered moving the data to a database (such as Mongo), but it adds so much overhead (such as needing to sync development/staging/live database and backing them up) that I have so far decided against it.

### Views

Views are built using EJS. It's not the most pretty but it works on the front end or back end so there's no need to learn two templating engines when I can just learn one. They're all basically the same anyway, right?

### Sass/CSS

SCSS is used to style the website. Susy is used as the grid system to give me full control of the website.

### JS

Nothing fancy here, just standard JS with no frameworks (such as jQuery).

### Gulp

Gulp is used for development. I must warn anyone that the gulpfile got a little out of hand - it's been made pretty by using Blessed to make windows in the terminal window which data is printed to.

Running `gulp --silent` compiles the SCSS, JS and runs the website (for easy development). Make sure to run `npm install` before trying this.

## Misc

### IIS

IIS is used to run the live site as I already have a Windows server. This is done by using IISNode and changing the `/server/config.js` `type` to `iis`.

### Deployments

Deployments are done using Jenkins. Jenkins watches the master branch for changes and deploys to the live site. Since compiled files (such as the CSS and JS) aren't stored in the repo, Jenkins first has to build them using Gulp. 

## Contributing

Found a bug on my site? Thinks there's a feature missing? Found a typo in a blog post? File an issue or send me a pull request!

