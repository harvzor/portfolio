With the latest release of Umbraco 7.4, the [Models
Builder](https://github.com/zpqrtbnk/Zbu.ModelsBuilder) has been
included by default with Umbraco. The Models Builder allows us to
strongly link our published content models with what is happening in the
Umbraco backend.

## So?

A common example of code that resides in Umbraco views is:

```
var content = node.GetPropertyValue("content");
```

This is all great until someone removes the content property in Umbraco
and suddenly the view breaks because there isn't a content property type
on the node. The Models Builder helps point out any errors (generally in
the Intellisense or on build) that have occured due to any changes in
Umbraco.

## Using this with the content service to create nodes

Occasionally it is necessary to create nodes in Umbraco
programmatically. You can do this using the ContentService. Here is a
document type that I have created in Umbraco:

![An Umbraco document type that creates a post node](/media/blog/making-umbraco-nodes-with-the-models-builder/umbraco-post-document-type.png)

We can see that there are three properties on my post document type;
postTitle, content and postDate. Without the Models Builder, we would've
created new Umbraco nodes this way:

```
var contentService = ApplicationContext.Current.Services.ContentService;
var parentId = 1053;

// Create the new node.
var post = contentService.CreateContent("My Post", parentId, "post");

// Add content to the node.
post.SetValue("postTitle", "Alternate Title");
post.SetValue("postDate", DateTime.Now);
post.SetValue("content", "<p>...</p>");

// Save and publish the node.
contentService.PublishWithStatus(post);
```

The above works, but it has the age old problem where if the document
type changes in Umbraco, there's no way of knowing what code has become
out of date and needs updating. The below code remedies this by using the
new Models Builder.

```
var contentService = ApplicationContext.Current.Services.ContentService;
var parentId = 1;

// Create the new node.
var post = contentService.CreateContent("My Post", parentId, ContentModels.Post.ModelTypeAlias);

// Add content to the node.
post.SetValue(ContentModels.Post.GetModelPropertyType(x => x.PostTitle).PropertyTypeAlias, "Alternate Title");
post.SetValue(ContentModels.Post.GetModelPropertyType(x => x.PostDate).PropertyTypeAlias, DateTime.Now);
post.SetValue(ContentModels.Post.GetModelPropertyType(x => x.Content).PropertyTypeAlias, "<p>...</p>");

// Save and publish the node.
contentService.PublishWithStatus(post);
```

This updated code might be longer, but it should help with site
maintenance in the long run.

