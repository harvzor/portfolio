![Web Extensions - Why Google Wants to Break Adblock](/media/blog/why-google-wants-to-break-adblock/web-extensions-why-google-wants-to-break-adblock-ascii.png)

*A note to non-technical readers* - an API (application programming interface) allows developers to hook into code which has been provided to them. For example, a phone may have an camera API which allows developers to interact with the camera of that phone.

**If you're short on time** - skip to [But now Google wants to deprecate another API](#but-now-google-wants-to-deprecate-another-api).

## Change is... good?

Back in Firefox 57 (released late 2017), [Mozilla deprecated their older legacy extensions API](https://developer.mozilla.org/en-US/docs/Archive/Add-ons/Legacy_add_ons) in favour of the newer `WebExtensions` API. The legacy API gave developers a huge amount of control over the browser which allowed them to completely change how the browser looked and behaved, but the new API was not nearly as capable.

Users and developers were furious as some addons simply couldn't be ported over to the newer API.

However, Mozilla had some very good reasons for doing this, namely, the newer API:

- was much easier to use
- had cross platform support, so an extension written for Firefox would mostly work with Chrome (and didn't need a full rewrite)

Also the legacy API also had some big issues:

- it perhaps gave too much control to developers (making Firefox unstable)
- **but most importantly, it was not compatible with "e10s" (multiprocess) Firefox**

## Firefox was slower

The Firefox codebase had been partially rewritten to support multiprocessing - this allows Firefox to be a noticeably faster.

Firefox was losing a lot of users because it was painfully slow when compared to Chrome, a browser which had multiprocessing from the start.

**Mozilla had to make a hard decision** - either remove the legacy API (hurting a small number of power users), or keep the API and watch as the browser became comparatively slower (hurting all users). **Although I miss the old extensions which improved the browsing experience, I think they made the right choice.**

These days, public sentiment towards Firefox has changed a lot. To me, the browser feels noticeably faster and less buggy. In fact, Chrome is often stated to be a resource hog, as it eats RAM like there's no tomorrow. There's even memes about it:

![Google Chrome Eating RAM](/media/blog/why-google-wants-to-break-adblock/google-chrome-ram.jpg)

Further reading: [the differences between multiprocessing in Firefox and Chrome, and why Chrome eats RAM in favour of stability and speed](https://www.extremetech.com/internet/250930-firefox-54-finally-supports-multithreading-claims-higher-ram-efficiency-chrome)

## But now Google wants to deprecate another API

Recently there have been discussions about Chrome removing support for the `webRequest` API, in favour of the `declaritiveNetRequest` API.

The current API allows developers to make a request to any website on the web, on your behalf. They can even steal cookie information, so if you've just logged into your banking website, a malicious addon could secretly tell the website to transfer funds out of your account.

I myself have made an extension which actively uses cookie information to authenticate with a website to make web requests on the users behalf (non-maliciously of course) - it's not hard to do.

### Would this affect me?

uBlock Origin is one of the most popular content blocking extensions available today. If you haven't heard of it, it's like an adblocker, but it doesn't just block ads, it blocks anything that could harm your privacy.

In short, the newer API doesn't have the level of control the older API has, so uBlock would be severely neutered in its capabilities.

#### But I use Opera/Brave/Vivaldi/Microsoft Edge

Opera, Brave, Vivaldi (and [soon Microsoft Edge](https://blogs.windows.com/windowsexperience/2018/12/06/microsoft-edge-making-the-web-better-through-more-open-source-collaboration/)), are all based on Chromium, which is an open source version of Chrome. Basically, anything which happens in Chrome, will likely happen in Chromium based browsers too.

#### But I use Firefox

Firefox and Chrome would prefer to keep their `WebExtensions` API similar so the extensions can be easily ported between the platforms. And there's a good reason for Mozilla to go along with Google - it improves security...

## Security

Here's the thing. When a developer makes a change to an extension, they can publish that change to both the Firefox addon store, and the Chrome extension store. Once it's published, any user who currently has that addon would then get the updated version.

**But that developer could update their extension to include malicious code.** The extension would then be stealing passwords without anyone realising for days.

There's one key difference between publishing on Firefox and Chrome:

**Publishing to the Firefox store takes less than minute** - Mozilla do a quick automated check then releases the extension.

**Publishing to the Chrome store can take days** - Chrome also does automated tests, but they seem to actually have a real person look over the code to check that nothing dangerous is going on.

With my personal extension, I find that publishing a new version to the Chrome store tends to take about 5 days (because I'm asking for these specific permissions that give me full access to everything).

## Cost

Since Google has to pay a real person to look over the code, this becomes quite costly. I can see why Google is interested in removing this potentially dangerous feature. Not only would it protect their users, but also it would save them a lot of time and money.

## My verdict

Most other articles on this topic only mention that this would stop adblockers such as uBlock from working (which is of course in Google's interest), but they don't mention how insecure extensions really are.

Based on the fact that Mozilla deprecated their legacy extensions API knowing that it would hurt some users, I think Google will also change their extensions API in order to protect the user from malicious extensions.

## The final problem

I just want to wrap up here and say that the `WebExtensions` API, to my surprise, is **[not a W3C standard](https://www.w3.org/community/browserext/)**.

This means as a developer, I'm constantly finding small differences between the Chrome and Firefox `WebExtensions`. It seems they can't quite agree on how things should be implemented, and means that they're free to make changes how they want.

My hope is that this API can become an open standard in the future.
