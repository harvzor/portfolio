The year has just begun, and using the best packages in your Umbraco installations can help make your experience of using Umbraco much easier and better. I have been working with Umbraco almost three years now. Packages have come and gone, but some have stuck around for longer. Here you can read about the packages with I have used and recommend trying out.

## 301 URL Tracker

https://our.umbraco.org/projects/developer-tools/301-url-tracker/

As of <a href="https://umbraco.com/follow-us/blog-archive/2016/6/15/umbraco-75-beta-out-now/" target="_blank">Umbraco 7.5</a>, the CMS comes with its own 301 redirecter. What this does is when you move or rename a page in Umbraco, the 301 redirecter will put a redirect in place to send the user from the old pages URL to the new one. This helps a lot with SEO as Google hates it when it finds a 404 where a page used to be.

However, the 301 redirecter is not perfect. It is fast but it doesn't allow you to setup your own redirects. This can be a pain if you're migrating from an old site, or you need to set up some more comprehensive redirects. This is where 301 Url Tracker comes in. This package has been around since Umbraco 4. It was actually the inspiration for the built in redirector which was added in 7.5. It also tracks for page changes and automatically adds new redirects, but you can also set up your own redirects, which can also use regular expressions. The package doesn't 100% fit in with the Umbraco aesthetic, and it has some bugs mainly to do with perfomance, but these issues are small and can generally be fixed by upgrading to the latest version of the package.

## Models Builder

https://github.com/zpqrtbnk/Zbu.ModelsBuilder/wiki

Before this package came along, I was writing custom C# models which reflect individual Umbraco nodes. These models would handle getting data out of Umbraco and made managing long lasting websites much easier. However, writing these models is potentially time consuming. This is where the Models Builder comes in. With the click of a button, a DLL or set of automatically generated C# files can be created which does all of this for you. This basically hands you strongly typed models which can be used with Visual Studios Intellisense for a better developing experience. The Models Builder truly has  improved the way which I build websites and saves me time everyday.

This package actually comes built into Umbraco. Generally it is turned on by default, which can be a little confusing if you haven't built with Umbraco before. However, I strongly recommend reading the documenation on this package as it will help you in the long run.

If you're not into having models generated automatically (as this can give you less control over the resultant code), you may want to look into using <a href="https://our.umbraco.org/projects/developer-tools/ditto/" target="_blank">Ditto</a> as it can help speed up the rate which you can write your own models. I have not personally used Ditto as I love the Models Builder, but I think Ditto would have been great otherwise.

## uSync

https://our.umbraco.org/projects/developer-tools/usync/

If you're not using Umbraco Cloud (aka, Umbraco as a Service (UaaS)), then you may need something like uSync to help with managing schema changes in Umbraco between dev/staging/live instances of your website. uSync can output some files which describe an Umbraco website, these files can then be copied to another Umbraco website which can then be used to update that website to be the same as the original website.

This saves anyone from needing to do the tedious work of adding new document types, templates, properties and whatever else to multiple Umbraco instances. Just copy the files over and it's all managed for you.

My original experience with uSync was a bit buggy, but I soon learned that using the packages manual mode to choose what gets synced and when rather than leaving it to be automatic done solved all of my problems.

## Umbraco Forms (Contour)

https://our.umbraco.org/projects/developer-tools/umbraco-forms/

I have written about Umbraco Forms <a href="https://growcreate.co.uk/blog/umbraco-review-2017-developing-websites-with-umbraco/" target="_blank">before</a>, but would just like to reitterate for anyone else that this package is really quite nice. Umbraco Forms allows content editors in Umbraco to create forms of their liking which can then be added to the front end. This is great as it saves developers from needing to add or remove fields in the long run - the content editor can do all this as they need.

Umbraco Forms also saves form submissions into a database table which can all be accessed through the backoffice. This is great because if your SMTP details on a website suddenly stop working (it's happened before and I guarantee it will happen again), form submissions will still be saved in an easy to reach place.

The only downside of this package is that it costs 129 euros per a domain. However, for this price, the functionality is great and any client should be able to see the benefits.

