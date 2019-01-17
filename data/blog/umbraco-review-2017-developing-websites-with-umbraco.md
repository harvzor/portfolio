This blog post has also been published to [GrowCreate's blog](https://growcreate.co.uk/blog/umbraco-review-2017-developing-websites-with-umbraco/).

## The learning curve

When I first started using Umbraco at [GrowCreate](https://growcreate.co.uk/), I only had experience with the PHP stack, so trying to learn ASP.NET and C# was a big hurdle for me. It took me quite a few months to understand the new stack including the use of the MS SQL database, IIS, and Visual Studio. This was not an easy time, although looking back on my days of PHP I can say that using ASP.NET feels far more structured.

As a developer it can be hard to get started with Umbraco; luckily I had someone helping me through the basics. From a developer and a content editor’s point of view, Umbraco is very usable. The near perfectly built Angular interface of Umbraco 7 is quick and seamless to interact with and feels modern compared to other content management systems.

## Features

Umbraco comes packed full of features that allow for most designs to be completed without requiring any extra packages (add-ons). This is great because you don’t have to rely on support outside of Umbraco HQ which means fewer dependencies and an easier upgrade path in the future. Below I have outlined some of the features that come with Umbraco:

### Front end freedom

One reason why we chose Umbraco as our CMS is that it doesn’t impose any kind of restriction on what kind of markup you have to write. This means that you can have the front end built as an entirely different step to the Umbraco implementation. This appears to differ to perhaps a Wordpress site, where everyone I have seen has tons of junk in the HTML which increases page weight and impacts performance. Umbraco takes a different approach by giving you a blank slate and with it the freedom to design and code whatever you want.

### Media

![Umbraco media backend](/media/blog/umbraco-review-2017-developing-websites-with-umbraco/umbraco-media-backend.jpg)

The media section of Umbraco is one of the most obvious features. Simply put, it allows content editors to upload images and files that can then be referenced from other parts of the website.

The media section over the years has received a number of improvements despite holding the same core functionality. The beauty of the media section is that it can be changed as per the developer's ideas much like the rest of the templates can within the implementation. It’s all built using the same system, so no extra learning is required.

### Members

Umbraco still has the member section which hasn’t changed much since Umbraco 4. This area of the back office allows the administration of members (users) of the site. New members can be created here, or old ones edited. You can also quite easily programmatically create members whenever one signs up using the methods and classes provided by the Umbraco installation.
The grid

The grid has been around since Umbraco 7.2. It allows content editors to create a more custom template with a column layout. The editor can create multi-column layouts to display content on the front end.

> Our clients love the grid

My personal experience developing with the grid has been pretty bad. When it first came out there were a number of bugs and not much documentation and this meant a lot of time faffing around. The code you have to write isn’t pretty and given the choice I would not develop with the grid, but there’s one big problem; our clients love the grid!

The grid really does allow a lot of freedom to the content editor. This means you have to code for a wide array of uses and this can take a long time. I guess as long as clients keep requesting the grid we will work to build better implementations until we’re grid masters.

### Umbraco Forms

![Umbraco forms backend](/media/blog/umbraco-review-2017-developing-websites-with-umbraco/umbraco-forms-backend.jpg)

Although technically not included in Umbraco, the [Forms](https://umbraco.com/products-and-support/forms/) (previously called ~~Courier~~ Contour) package is maintained by Umbraco HQ and costs 99 euros per domain or is free for Umbraco Gold Partners.

Umbraco Forms allows content editors to create custom forms which can then be placed on the website. The package works well for simple forms and can be extended to do more complicated things. Form submissions are automatically stored in the back office which editors can easily view, which ensures that if an email doesn’t get sent, there’s always a record of the submission.

Personally, I love the Forms package because it cuts down on work for the developer when content editors want to add or remove a field from a form or have it send the email to someone else. While this functionality could be custom built into Umbraco, it’s not worth the effort. For the price, Umbraco Forms covers a lot of use cases.

### Models Builder

![Visual Studio C# models](/media/blog/umbraco-review-2017-developing-websites-with-umbraco/visual-studio-models.jpg)

The [Models Builder](https://github.com/zpqrtbnk/Zbu.ModelsBuilder/wiki) is a purely technical feature of Umbraco that developers can utilise to speed up Umbraco development. Umbraco is not a code first CMS (although there are some packages out there which can make it code first), this means that the code has to be written to mirror the data the CMS contains. As a C# developer, this may mean writing models which reflect the data. However, with the Models Builder, this step can be automated meaning at a click of a button, a DLL or some C# files can be generated. Personally, I love this, even if it can be a little buggy.

### The open source aspect

This may be an obvious thing for some people, but I just want to iterate this. Umbraco being open source is a massive feature. Unlike some other CMS platforms (*cough*, Sitecore), I can look at the Umbraco source code and know where the code needs improvement. You may be asking, “Why would I want to see the ugly code?” Well, being able to know where a CMS needs improvement allows me to really get comfortable with the CMS. All software has warts and bugs, but if they’re in plain sight, I can at least improve the code or avoid using it altogether.

Even better, if I find a bug in Umbraco which I can’t avoid, I can find it in the code base and try to fix it myself, or I can point out the issue to someone else (either the community or Umbraco HQ) who can then fix it for me. This is something I love about Umbraco. In fact, I could probably write another paragraph about how awesome the Umbraco community is, but you really have to experience that yourself.

### Easily extendable

It’s fair to say that extending Umbraco is a breeze. That’s not to say a little more documentation wouldn’t be handy, but with a little knowledge of how to use the (reasonably well documented) [Umbraco surface controller API](https://our.umbraco.org/documentation/reference/routing/surface-controllers), and a quick and dirty understanding of how the front end works with Angular, you can create new dashboards and sections in Umbraco.

At GrowCreate, we have built integrations into Umbraco with SharePoint, Salesforce, and MS Dynamics. We have even built our own packages such as [Pipeline CRM](https://our.umbraco.org/projects/backoffice-extensions/pipeline-crm/) and [Iconator](https://our.umbraco.org/projects/backoffice-extensions/iconator/). I think being able to extend Umbraco is one of it’s greatest strengths.

## The future

The future of Umbraco is bright. And I’m not just saying this because GrowCreate main sale is Umbraco integrations. I genuinely believe it.

Despite packing more features, Umbraco itself seems to be getting faster with every release. And with the release of Umbraco 8 in the coming year (hopefully early 2017), we can expect some tremendous improvements, such as:

- [cache improvements](https://www.zpqrtbnk.net/posts/step-by-step-little-by-little-3) (moving away from an XML cache to an in-memory cache, much faster!);
- using GUIDs (unique IDs) rather than standard IDs allowing for easier syncing of data between Umbraco instances;
- cutting down of the Umbraco code base (if I remember from Code Garden, the cut down may be as large as 30%);
- the latest minor version of Angular (better experience developing packages for Umbraco).

You can read up on the status of Umbraco 8 [here](https://our.umbraco.org/contribute/releases/800).

On the ASP.NET site of things, Microsoft appears to be moving towards open sourcing and making their technologies cross-platform. This includes:

- the release of [.NET Core](https://www.microsoft.com/net/core/platform) (a newly rebuilt version of .NET which is 100% cross platform, Umbraco HQ hopes to get Umbraco 9 built on .NET Core which would allow Umbraco websites to be hosted on a Linux server)
- the release of [SQL Server 2016](https://www.microsoft.com/en-gb/sql-server/sql-server-2016) which can be run on Linux (beta now available)
- the release of different types of Windows Servers, including [Nano Server](https://technet.microsoft.com/en-us/windows-server-docs/get-started/getting-started-with-nano-server) which is a massively cut down version of Windows (weighing around 1GB and comes without a GUI) which is perfect for hosting small websites or for building lightweight Docker containers

## Conclusion

Umbraco has plenty of features which, if you can get past the development learning curve, can be extremely flexible and a joy to program with. The fact that the technology is open source and backed by a profitable company and an amazing community only sweetens the deal. Finally, the future of Umbraco looks very promising, and I can’t wait for the following releases of the .NET technology stack along with newer versions of Umbraco.
