Caching is a great way to reduce server load and reduce client load times. It should be an easy thing to do, but after a little research I found that the standard way of caching most ordinary methods does not work with Web API controllers.

## How to cache standard MVC controllers using the OutputCache attribute

Caching an MVC controller is very easy. All you need to do is shove [OutputCache] before your method (or even class) and it will be cached on the server:

        
```
public class PageController : Umbraco.Web.Mvc.RenderMvcController
{
    // Warning!! Won't work in a UmbracoApiController!!
    [System.Web.Mvc.OutputCache(Duration = 60)]
    public override ActionResult Index(RenderModel model)
    {
        var pageModel = new PageModel(model.Content);

        // some code

        return CurrentTemplate(pageModel);
    }
}
```

The Duration parameter sets how long to cache in seconds.

One way to test to see if this has worked is to set a breakpoint in the code and refresh the page that the controller controls. The first time it will hit the breakpoint, the second (provided that you refresh before the time runs out) it won't! That's because the output has been cached.

However, if you try the same attribute on a controller that inherits from a UmbracoApiController, you will find that it has no effect. [Shame!!](http://shamenun.com/)

This is because the [UmbracoApiController](https://github.com/umbraco/Umbraco-CMS/blob/d50e49ad37fd5ca7bad2fd6e8fc994f3408ae70c/src/Umbraco.Web/WebApi/UmbracoApiController.cs#L14) inherits from the [UmbracoApiControllerBase](https://github.com/umbraco/Umbraco-CMS/blob/d50e49ad37fd5ca7bad2fd6e8fc994f3408ae70c/src/Umbraco.Web/WebApi/UmbracoApiControllerBase.cs#L15) which in turn inherits from the basic ApiController. So? Well, as it turns out, the ApiController does not take notice of our fancy OutputCache. You can read all about it [here](http://stackoverflow.com/questions/17287144/how-to-cache-net-web-api-requests-use-w-angularjs-http).

This is different from the [RenderMvcController](https://github.com/umbraco/Umbraco-CMS/blob/2c63866cb35c59803d5649131438305c56aece38/src/Umbraco.Web/Mvc/RenderMvcController.cs#L15) because it inherits from the [UmbracoController](https://github.com/umbraco/Umbraco-CMS/blob/d50e49ad37fd5ca7bad2fd6e8fc994f3408ae70c/src/Umbraco.Web/Mvc/UmbracoController.cs#L15) which in turn inherits from the basic MVC Controller. This one does take notice of our OutputCache.

## The fix: CacheOutput

Fortunately for us, someone clever has made an alternative - the [CacheOutput](https://github.com/filipw/AspNetWebApi-OutputCache) attribute. This sounds similar, so try not to it with the built in cache attribute.

On your project, install the package "WebApi2" using the NuGet console in VS:

```
PM> Install-Package Strathweb.CacheOutput.WebApi2
```

After the package has successfully installed, you can use the CacheOutput attribute instead of the built in MVC one:

```
public class MySurfaceController : UmbracoApiController
{
    [WebApi.OutputCache.V2.CacheOutput(ClientTimeSpan = 60, ServerTimeSpan = 60)]
    public MyObject Umbraco.Web.WebApi.GetInformation(string someParam)
    {
        var myObject = new MyObject();

        // some code..?

        return myObject;
    }
}
```

Now visiting /umbraco/api/mycontroller/getinformation?someparam=somevalue and running the same breakpoint test as before will show that the CacheOutput attribute has worked.

This time, ClientTimeSpan gets the clients browser to cache the first result - next time a request won't even make it to the target server because the browser will reach into its' own cache and retrieve the data it received before. This should be done with a "200 (cached)" or a "304 Not Modifed" HTTP status if you view the call in your network tools of your browser. Meanwhile, ServerTimeSpan works in the same way as before.

## Wrapping up

As always, be careful with caching. Caching on the server in this basic way will cause the same results to be shown to everyone, so make sure that no user sensitive data is being cached. Caching on the client can be great but can lead to out of date content if the cache period is too long.

## Resources

- [Our Umbraco](https://our.umbraco.org/forum/developers/api-questions/63516-UmbracoApiController-caching)

