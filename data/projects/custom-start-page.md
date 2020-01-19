![Custom Start Page Index](/media/projects/custom-start-page/index.jpg)

## What is the purpose of this website?

Released in early 2020, [Custom Start Page](https://customstart.page) is a website which collects custom built startpages and allows users to customise and use them.

## Why?

Browsers come with a default homepage but some users like to have something a bit different. There's a subreddit devoted to this ([r/startpages](https://www.reddit.com/r/startpages)).

But in order to design one of these, you'd need web development knowledge. My site aims to make it possible for anyone to have a nice homepage.

## How?

I used a specification called [JSON Schema](https://json-schema.org/) to define what is customisable on the page. A React component (called [React JSON Schema](https://github.com/rjsf-team/react-jsonschema-form)) then uses this schema to generate a user friendly form.

The result ends out like this:

![Custom Start Page Edit Page](/media/projects/custom-start-page/edit.png)

## Future features

The MVP project only allowed users to customise existing startpages and store custom data in their browser's local storage.

Features I'd like to implement are:

- allow user sign up
- store customisation server side
- allow users to upload their own startpages
- allow other users to use and configure uploaded start pages
- startpage rankings and ratings
