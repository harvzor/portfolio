Almost every website that I build for a client needs to have some sort of way to contact the outside world; the most common way of doing this is to send an email.

The thing is, developers get lazy when they start making emails. The technology is stuck in the past and it's not a fun front end experience to try and create complicated layouts using tables. All of this together makes creating emails a hack and slash job. Here's the simple way a lot of emails are made:

```
public bool Send()
{
    var mailServer = new SmtpClient();
    var mail = new MailMessage();

    mail.From = new MailAddress("foo.bar@net", "Foo Bar");
    mail.To.Add("bar@foo.net");
    mail.Subject = "Thank you for signing up!";
    mail.IsBodyHtml = true;

    // Don't do this!!
    mail.Body = String.Format("<h2>Dear {0},</h2><p>Thank you for signing up. We value you as a customer etc etc...</p<<p>From the team at {1}.</p>",
        "Bar Foo",
        "foo.bar.net");

    try
    {
        mailServer.Send(mail);
    }
    catch (SmtpException e)
    {
        LogHelper.Error(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType, "Error sending welcome email.", e);
        return false;
    }

    return true;
}
```

The above doesn't look crazy bad, but just wait until the email starts getting complicated. If you want to have real formatting, then it's going to quickly get out of hand.

## Rendering MVC emails with Razor and CSHTML templates

Enough of string formatting! We have a better method now. We're used to using Razor and some sort of MVC to build our ordinary website views. Surely there is some way we can incorporate that into our email design? Well there is!

### The West Wind Toolkit Way

Fortunately there is a tool out there which allows us to easily render a CSHTML view with a model of our choosing. This tool is called the [West Wind Toolkit](https://github.com/RickStrahl/WestwindToolkit). It's opensource and under the MIT license, meaning we can use it in our projects.

The particular part of the toolkit we plan on using is the [view renderer](https://github.com/RickStrahl/WestwindToolkit/blob/master/Westwind.Web.Mvc/Utils/ViewRenderer.cs). Since I didn't want to bloat my project with anything more than necessary, I ripped apart this piece of C\# that West Wind has provided us with, and only kept the core methods in the end result:

```
using System;
using System.Web;
using System.Web.Mvc;
using System.IO;
using System.Web.Routing;

namespace YourNamespace
{
    /// 
    /// Class that renders MVC views to a string using the
    /// standard MVC View Engine to render the view.
    /// 
    /// Requires that ASP.NET HttpContext is present to
    /// work, but works outside of the context of MVC
    /// 
    /// Particularly useful for rendering CSHTML for emails.
    /// 
    /// Code extracted from:
    /// https://github.com/RickStrahl/WestwindToolkit/blob/master/Westwind.Web.Mvc/Utils/ViewRenderer.cs
    /// 
    public class ViewRenderer
    {
        /// 
        /// Required Controller Context
        /// 
        protected ControllerContext Context { get; set; }

        /// 
        /// Initializes the ViewRenderer with a Context.
        /// 
        /// 
        /// If you are running within the context of an ASP.NET MVC request pass in
        /// the controller's context. 
        /// Only leave out the context if no context is otherwise available.
        /// 
        public ViewRenderer(ControllerContext controllerContext = null)
        {
            // Create a known controller from HttpContext if no context is passed
            if (controllerContext == null)
            {
                if (HttpContext.Current != null)
                {
                    controllerContext = CreateController().ControllerContext;
                }
                else
                {
                    throw new InvalidOperationException(
                        "ViewRenderer must run in the context of an ASP.NET " +
                        "Application and requires HttpContext.Current to be present.");
                }
            }

            Context = controllerContext;
        }

        /// 
        /// Renders a partial MVC view to string. Use this method to render
        /// a partial view that doesn't merge with _Layout and doesn't fire
        /// _ViewStart.
        /// 
        /// 
        /// The path to the view to render. Either in same controller, shared by 
        /// name or as fully qualified ~/ path including extension
        /// 
        /// The model to pass to the viewRenderer
        /// Active controller context
        /// String of the rendered view or null on error
        public static string RenderView(string viewPath, object model = null, ControllerContext controllerContext = null)
        {
            var renderer = new ViewRenderer(controllerContext);
            return renderer.RenderViewToString(viewPath, model);
        }

        /// 
        /// Renders a partial MVC view to string. Use this method to render
        /// a partial view that doesn't merge with _Layout and doesn't fire
        /// _ViewStart.
        /// 
        /// 
        /// The path to the view to render. Either in same controller, shared by 
        /// name or as fully qualified ~/ path including extension
        /// 
        /// The model to pass to the viewRenderer
        /// String of the rendered view or null on error
        public string RenderViewToString(string viewPath, object model = null)
        {
            return RenderViewToStringInternal(viewPath, model, true);
        }

        /// 
        /// Internal method that handles rendering of either partial or 
        /// or full views.
        /// 
        /// 
        /// The path to the view to render. Either in same controller, shared by 
        /// name or as fully qualified ~/ path including extension
        /// 
        /// Model to render the view with
        /// Determines whether to render a full or partial view
        /// String of the rendered view
        private string RenderViewToStringInternal(string viewPath, object model, bool partial = false)
        {
            // first find the ViewEngine for this view
            ViewEngineResult viewEngineResult = null;
            if (partial)
                viewEngineResult = ViewEngines.Engines.FindPartialView(Context, viewPath);
            else
                viewEngineResult = ViewEngines.Engines.FindView(Context, viewPath, null);

            //if (viewEngineResult == null || viewEngineResult.View == null)
            //throw new FileNotFoundException(Resources.ViewCouldNotBeFound);

            // get the view and attach the model to view data
            var view = viewEngineResult.View;
            Context.Controller.ViewData.Model = model;

            string result = null;

            using (var sw = new StringWriter())
            {
                var ctx = new ViewContext(Context, view,
                    Context.Controller.ViewData,
                    Context.Controller.TempData,
                    sw);

                view.Render(ctx, sw);
                result = sw.ToString();
            }

            return result;
        }

        /// 
        /// Creates an instance of an MVC controller from scratch 
        /// when no existing ControllerContext is present       
        /// 
        /// Type of the controller to create
        /// Controller Context for T
        /// thrown if HttpContext not available
        public static T CreateController(RouteData routeData = null) where T : Controller, new()
        {
            // create a disconnected controller instance
            T controller = new T();

            // get context wrapper from HttpContext if available
            HttpContextBase wrapper = null;
            if (HttpContext.Current != null)
            {
                wrapper = new HttpContextWrapper(System.Web.HttpContext.Current);
            }
            else
            {
                throw new InvalidOperationException(
                    "Can't create Controller Context if no active HttpContext instance is available.");
            }

            if (routeData == null)
                routeData = new RouteData();

            // add the controller routing if not existing
            if (!routeData.Values.ContainsKey("controller") && !routeData.Values.ContainsKey("Controller"))
            {
                routeData.Values.Add("controller", controller.GetType().Name
                    .ToLower()
                    .Replace("controller", ""));
            }

            controller.ControllerContext = new ControllerContext(wrapper, routeData, controller);
            return controller;
        }
    }

    /// 
    /// Empty MVC Controller instance used to 
    /// instantiate and provide a new ControllerContext
    /// for the ViewRenderer
    /// 
    public class EmptyController : Controller { }
}
```

You can also view the latest version that I will be using in my projects [here](https://gist.github.com/HarveyWilliams/0405edd6719c16171329).

Include this view renderer in your project, and you can use it to render Razor CSHTML views with a model.

### Building the Model

Before we start using the view renderer in our project, we will need to set up a model to use with our view. Below is a very simple one that covers the two properties that our model will need:

```
public class NewSignUpModel
{
    public string Recipient { get; set; }
    public string Team { get; set; }
}
```

### Building the view

Our view will need to reference the model we just made using @model at the top of the template:

```
@model NewSignUpModel
<h2>Dear @(Model.Recipient),</h2>
<p>Thank you for signing up. We value you as a customer etc etc...</p>
<p>From the team at @(Model.Team).</p>
```

The @model reference allows use to then write @(Model.Recipient) where we want the parameter to be shown. But I'm sure you're used to doing this kind of thing by now.

### Updating the mail sending method

Finally, we need to update our original mail send method to use the view renderer. Pass in the path to your view as the first parameter to the ViewRenderer.RenderView method, and the model you intend the view to use as the second:

```
public bool Send()
{
    var mailServer = new SmtpClient();
    var mail = new MailMessage();

    mail.From = new MailAddress("foo.bar@net", "Foo Bar");
    mail.To.Add("bar@foo.net");
    mail.Subject = "Thank you for signing up!";
    mail.IsBodyHtml = true;

    mail.Body = ViewRenderer.RenderView("~/Views/Mail/NewSignUp.cshtml", new NewSignUpModel
    {
        Recipient = "Bar Foo",
        Team = "foo.bar.net"
    });

    try
    {
        mailServer.Send(mail);
    }
    catch (SmtpException e)
    {
        LogHelper.Error(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType, "Error sending welcome email.", e);
        return false;
    }

    return true;
}
```

Using the above method will get an email sent off but with the view that we created as the body of the email.

