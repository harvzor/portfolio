The year has just begun, and using the best packages in your Umbraco installations can help make your experience of using Umbraco much easier and better. I have been working with Umbraco almost three years now. Packages have come and gone, but some have stuck around for longer. Here you can read about the packages with I have used and recommend trying out.

## 301 URL Tracker

https://our.umbraco.org/projects/developer-tools/301-url-tracker/

As of <a href="https://umbraco.com/follow-us/blog-archive/2016/6/15/umbraco-75-beta-out-now/" target="_blank">Umbraco 7.5</a>, the CMS comes with its own 301 redirecter. What this does is when you move or rename a page in Umbraco, the 301 redirecter will put a redirect in place to send the user from the old pages URL to the new one. This helps a lot with SEO as Google hates it when it finds a 404 where a page used to be.

However, the 301 redirecter is not perfect. It is fast but it doesn't allow you to setup your own redirects. This can be a pain if you're migrating from an old site, or you need to set up some more comprehensive redirects. This is where 301 Url Tracker comes in. This package has been around since Umbraco 4. It was actually the inspiration for the built in redirector which was added in 7.5. It also tracks for page changes and automatically adds new redirects, but you can also set up your own redirects, which can also use regular expressions. The package doesn't 100% fit in with the Umbraco aesthetic, and it has some bugs mainly to do with perfomance, but these issues are small and can generally be fixed by upgrading to the latest version of the package.

## Nested Content

https://our.umbraco.org/projects/backoffice-extensions/nested-content/

Nested Content is a package I simply cannot live without when building even the most simple of Umbraco websites. It's a property editor that allows you to create repeatable content in Umbraco on a node using a doc type schema to model the repeatable content. This beats a host of other ideas such as using real nodes because it can be done then and there on a node. It's quick and easy to setup and it supports almost any property type you throw at it. Another great feature is that the data maps straight to `IPublishedContent` so you don't even need to use another library do deal with data.

Another honourable mention is Archtype which offers nearly the same functionality but doesn't use the built in Umbraco doc types which just means that it integrates a little less well. Another plus side of using doc types is that there is instant Models Builder support. I also found that Nested Content allows for nesting of the property in itself a little more smoothly.

## uSync

https://our.umbraco.org/projects/developer-tools/usync/

If you're not using Umbraco Cloud (aka, Umbraco as a Service (UaaS)), then you may need something like uSync to help with managing schema changes in Umbraco between dev/staging/live instances of your website. uSync can output some files which describe an Umbraco website, these files can then be copied to another Umbraco website which can then be used to update that website to be the same as the original website.

This saves anyone from needing to do the tedious work of adding new document types, templates, properties and whatever else to multiple Umbraco instances. Just copy the files over and it's all managed for you.

My original experience with uSync was a bit buggy, but I soon learned that using the packages manual mode to choose what gets synced and when rather than leaving it to be automatic done solved all of my problems.

## Models Builder

https://github.com/zpqrtbnk/Zbu.ModelsBuilder/wiki

Before this package came along, I was writing custom C# models which reflect individual Umbraco nodes. These models would handle getting data out of Umbraco and made managing long lasting websites much easier. However, writing these models is potentially time consuming. This is where the Models Builder comes in. With the click of a button, a DLL or set of automatically generated C# files can be created which does all of this for you. This basically hands you strongly typed models which can be used with Visual Studios Intellisense for a better developing experience. The Models Builder truly has  improved the way which I build websites and saves me time everyday.

This package actually comes built into Umbraco. Generally it is turned on by default, which can be a little confusing if you haven't built with Umbraco before. However, I strongly recommend reading the documenation on this package as it will help you in the long run.

If you're not into having models generated automatically (as this can give you less control over the resultant code), you may want to look into using <a href="https://our.umbraco.org/projects/developer-tools/ditto/" target="_blank">Ditto</a> as it can help speed up the rate which you can write your own models. I have not personally used Ditto as I love the Models Builder, but I think Ditto would have been great otherwise.

## Umbraco Core Property Value Converters

https://our.umbraco.org/projects/developer-tools/umbraco-core-property-value-converters/

This package is a huge helper for anyone who uses the Models Builder as it changes the property types for core property editors in Umbraco from simplistic ones to something more useful. For example, if you use a Content Picker (node picker) in Umbraco, rather than giving you an integer to use in your code, you automatically get an `IPublishedContent` then and there. This saves time as you don't need to manually retreive the document from the Umbraco cache and this also ensures that you can't make any errors in this process.

A note on using this package - it's best not to add it after a site has been built as it will change what the Models Builder outputs. This means that if your code expects a integer and is instead now being handed an `IPublishedContent` then your code will error!

## Umbraco Forms (Contour)

https://our.umbraco.org/projects/developer-tools/umbraco-forms/

I have written about Umbraco Forms <a href="https://growcreate.co.uk/blog/umbraco-review-2017-developing-websites-with-umbraco/" target="_blank">before</a>, but would just like to reitterate for anyone else that this package is really quite nice. Umbraco Forms allows content editors in Umbraco to create forms of their liking which can then be added to the front end. This is great as it saves developers from needing to add or remove fields in the long run - the content editor can do all this as they need.

Umbraco Forms also saves form submissions into a database table which can all be accessed through the backoffice. This is great because if your SMTP details on a website suddenly stop working (it's happened before and I guarantee it will happen again), form submissions will still be saved in an easy to reach place.

The only downside of this package is that it costs 129 euros per a domain. However, you can test it on a localhost for free before you buy.

## Iconator

https://our.umbraco.org/projects/backoffice-extensions/iconator/

No article would be complete without some shameless self-promoting... That's why I'm sharing my own personal package called Iconator with you. It's a simple package which scans a CSS file for icon classes (using a regex) and allows a backend user to select the icon they want in a friendly and visual way.

I've used this package on a number of client websites as it solves an everyday problem. If you're not sure about icon fonts, you can see why they're great <a href="https://css-tricks.com/examples/IconFont/">here</a>.

## Multi Url Picker

https://our.umbraco.org/projects/backoffice-extensions/multi-url-picker/

Multi Url Picker is another package which never misses an Umbraco installation for me. It's a simple property editor that allows you to pick either an internal Umbraco node or input a link to another website. This is great because it allows for a lot of functionality in a single without you ever needing to worry about what it is the Umbraco user is supplying. The backend user can also supply a name for the picked link (which is great for putting in an anchor) and whether the link should open in a new tab.

A DLL is supplied with this package which gives you a model which you can cast the data to. This actually works really well as it just supplies you with a URL to print onto the page, no need to use the `UmbracoHelper` to get an `IPublishedContent` - it's all done for you.

## Documento

https://our.umbraco.org/projects/backoffice-extensions/documento/

This package made by GrowCreate isn't a must have, but it's nice to have regardless. It replaces the standard dashboard when you login to your Umbraco website with a slightly more helpful one which lists out all of the document types that have been setup in Umbraco, with some information about what each field does. It's pretty and it includes a link to an Umbraco editor manual which can be useful for new Umbraco editors.

## Umbraco v6 MVC Razor Cheatsheets

https://our.umbraco.org/projects/developer-tools/umbraco-v6-mvc-razor-cheatsheets

This package is perhaps a little outdated by now but it's still quite relevent to Umbraco 7 since Umbraco 6 is archtecturally very similar. This package is just a PDF cheatsheet which lists out all of the methods that are available to an Umbraco developer. I can remember referring to this sheet many times when I first got started with Umbraco and C#, and I would still recommend it to newer members of the community who aren't yet used to the ASP.NET stack.

## Doc Type Grid Editor

https://our.umbraco.org/projects/backoffice-extensions/doc-type-grid-editor

I unfortunately haven't had the time to properly test this package, but I can't wait to crack it open and explore. The idea of the package is simple yet revolutionary as it allows you to use Umbraco document types, much like Nested Content, except inside of the Umbraco Grid. This is great because adding functionality to the Grid can be a slow and cumbersome process. This package makes the process much quicker and cleaner by uniting different components of the backoffice together. Next time you work with the Grid and you need to output something a little more than a few columns (and you want to avoid the soon to be deprecated macro), then this package may fill a hole for you.

## uComponents (Umbraco 6)

https://our.umbraco.org/projects/backoffice-extensions/ucomponents

If you're lucky enough to be supporting an Umbraco 6 (or even Umbraco 4!) website then uComponents adds a bunch of functionality to the backoffice including my favourite pre-Umbraco 7 property editor called 'DataType Grid'. This property allows for repeatable content (a little like Nested Content but a lot less pretty and less developer friendly) in Umbraco.

I won't dwell on this package as it's back from the dark days. It's definitely worth noting that there is no clear path for upgrading a website from Umbraco 6 to Umbraco 7 when the data is stored in uCompontents data types. You must either manually migrate the data or figure out some programmatic route. Either way, it can take some time.

