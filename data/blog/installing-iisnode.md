This website is was my first website which I built in Node.js. It started out being just a static website because I knew I would be the only maintainer, and I'm happy to dive into code to change some content. However, I quickly found that the site was getting out of hand as more pages were created - to make even a small change to any common element meant copy and pasting accross each page.

## The solution? Node.js!

I decided that I had to add some backend logic to piece together my pages. First I questioned if PHP was the answer, but I've always found that PHP would also get out of hand with bits of code getting lost in places. I asked my coworker from GrowCreate for their oponion, and they said that I should try building in Node.

## The problem

Developing Node applications on Windows is very simple. All you have to do is just open up a cmd window (after installing Node) and type "node server.js", where server.js is your server configuration file. However, doing this on a live Windows server was impractical. Having a cmd window open to host the website all the time would be a bad idea. Intead, I wanted my site to be hosted through IIS, as it meant that all of my sites would be clearly visible from one applicaion on my server. Currently, only way to do this is by installing IISNode.

Getting IISNode running is easy once you've done it before, but understanding the steps required to get there can be a little difficult.

## Getting started

I suggest doing this on your development machine before doing this on a server. Below is a list of things you will need already set up before you can get IISNode set up.

- IIS7/8 installed
- Node installed

## Installing IISNode

I accidentally went down the path of trying to build IISNode from source which can be pain if you've never done that sort of thing before. As it turns out, you can download a compiled install file from [here](https://github.com/azure/iisnode/wiki/iisnode-releases). Choose the correct build for your system (either 64bit or 32bit). I will be using v0.2.11 as it is the latest version at the time of writing.

After downloading this file, install it!

### Testing IISNode

If you want to test that IISNode installed correctly, you can use the setupsamples.bat script to create an instance of IISNode. To run this file, you will need to open up an administrator window of cmd and cd to either "C:\\Program Files\\iisnode" (or "C:\\Program Files (x86)\\iisnode" if you installed the 32bit version). Type "setupsamples.bat" into the cmd prompt and the script should run. Read the output to check if the script ran successfully. The output should be similar to the one below.

![](/media/blog/installing-iisnode/setupsamples.png)

Now provided that you have the "Default Web Site" running, you should be able to go to [localhost/node"](http://localhost/node) in your browser. If your browser just tells you that it is unable to connect to this, then it's likely that the "Default Web Site" is not running. If it gives you an "HTTP Error 404.0 - Not Found", then the script did not run correctly. Otherwise you should be on a page similar to the one below.

![](/media/blog/installing-iisnode/localhost.png)

Clicking on the first link "helloworld" will show you a running example of a Node site running in IISNode. You can actually see the source code for this in "C:\\Program Files\\iisnode\\www".

## URL Rewriting

In "localhost:8080/node" try navigating to the "urlrewrite" part of the site by following the link. If you get an error on the page, then Url Rewriting has not been installed. This is going to be necessary if you want to run an Express site. You can download URL Rewrite from Microsoft [here](http://www.iis.net/downloads/microsoft/url-rewrite). Click on the "Install this extension" button and download the file. After downloading the file, run it. It should bring up a Web Platform Installer which will guide you through the simple installation procedure.

Once URL Rewriting is installed, go back to the page on your localhost and refresh to test if it's working.

## Express

If you want to get Express working with IISNode, you will only need to create two files; a JS file which will control your server, and a web.config for IIS.

### server.js

Your server.js has to be tweaked just a little bit to make it work with IISNode. Notice the past line where the app has to listen using "process.env.PORT". This port is decided by IIS.

```
var express = require('express');

var app = express();

app.get('/', function (req, res) {
    res.send('Express is working on IISNode!');
});

app.listen(process.env.PORT);
```

I found that many other tutorials said that "var app = express.createServer();" was the correct line to use, but I found that this just created an error. This may be due to the other tutorials using an older version of Express.

### web.config

The web.config file is the configuration for this website. A handler is required to specify that the application is handled by IISNode. The rewrite allows the server.js deal with incoming connections rather than IIS.

```
<configuration>
    <system.webServer>

        <!-- indicates that the server.js file is a node.js application
        to be handled by the iisnode module -->

        <handlers>
            <add name="iisnode" path="server.js" verb="*" modules="iisnode" />
        </handlers>

        <rewrite>
            <rules>
                <rule name="sendToNode">
                    <match url="/*" />
                    <action type="Rewrite" url="server.js" />
                </rule>
            </rules>
        </rewrite>

    </system.webServer>
</configuration>
```

### Install the Express module

You will also need to install the express module before this Node server will work. Open a cmd prompt and cd to your folder (which has the server.js and web.config files) and type "npm install express".

## Adding your site to IIS.

The last step is adding your site to IIS Manager. Open up the program and on your Sites, right click and select "Add Website...". Fill out the details and link it to your folder with the server.js and web.config files inside of it.

![](/media/blog/installing-iisnode/iismanager.png)

After adding your host name to your systems hosts file, navigate to the url in a web browser and see the result.

![](/media/blog/installing-iisnode/expressrunning.png)

## Resources

- [IISNode GitHub](https://github.com/azure/iisnode/wiki/iisnode-releases)

