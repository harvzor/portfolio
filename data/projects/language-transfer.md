<img src="/media/projects/language-transfer/language-transfer-pixel-2.png" style="width:300px;">

*You can look at my prototype web app [here](https://languagetransfer.harveywilliams.net/).*

In my eternal quest to improve my German language skills, I'm always looking for better resources to learn from online.

My search led me to an audio course called [Language Transfer](https://www.languagetransfer.org/) which can be listened to on [SoundCloud](https://soundcloud.com/languagetransfer/sets/complete-german-more-on-the). Alternatively the tracks can be downloaded for offline use.

The audio course tries to promote "the thinking method", where rather than just listening, you are required to be a part of the conversation that is happening in the audio. The idea is that when a question is asked, you should give an answer. A small gap is provided in the audio but sometimes this gap isn't long enough, so you are expected to pause the track to have a think.

## UX Issues

I found that using SoundCloud or my phone's music app to listen to the tracks was a UX nightmare. I had a number of issues which made listening to the audio tracks a painful experience.

### Screen turning off

When listening to the course, you are frequently required to pause the track. However, my phone turns off its screen after 30 seconds of inactivity... It can be a pain to go into phone settings to turn this feature off.

### Remembering which track I'm on

When returning to listen to the next track was I wouldn't remember which tracks I had already listened to. This would mean that I would have to relisten to previous tracks before figuring out which one I actually needed to listen to.

### Hard to pause the track

Most audio apps provide buttons to pause and skip which track you're listening to. Since in this audio course I had to pause multiple times over the course of a minute, this means that the play/pause button should be easily accessible (not a stretch to reach) and big enough so no accidental taps could cause the whole track to be skipped.

### Difficult to skip forwards or backwards

It's rare in a song that you will need to skip backwards 5 or 10 seconds to listen again, whereas I would often need to do this while trying to hear what was said in a foreign language.

## Building a prototype web app to fix the UX issues

The issues outlined above annoyed me so much that I figured there had to be a pre-existing solution to them. Looking around the Language Transfer website I could only find links to the SoundCloud website and nothing more.

I decided to take things into my own hands - I wanted to produce a prototype web app to solve the biggest UX issues. I wanted to make sure that the app would be usable to help me with my learning as soon as possible, so I decided to go down the MVP (minimal viable product) route to ensure that no time was wasted building pointless features.

I focused on building the application using normal web technologies and I decided not to built a backend for the app so I wouldn't get bogged down deciding what backend language and framework I was going to use.

By keeping things as simple I managed to built my prototype in just 5 hours.

The web app makes use of ES6, Angular JS (version 1.x), HTML5 Local Storage and SoundCloud APIs.

### SoundCloud APIs

The web app uses data and audio which already exists on SoundCloud. I figured this route would be better as hosting the audio files from a website while also giving the user a good experience (such as buffering of audio) can be difficult and time consuming to implement.

My app is designed to query SoundCloud to get track data. An issue I had was that a client browser cannot make a cross site call like that. Since there was no backend, I decided to call the data from my browser and then save them to the web app as a `.json` file. You can see one of these such files [here](http://lt2.harveywilliams.net/json/playlists/157713757.json). This does mean that if a track is updated, or new ones are created, my data won't reflect this as it is just a static cache.

## Solved UX issues

My prototype web app fixes all of the biggest issues I was having:

- you can force the screen to stay on while you're looking at the web page (implemented using [this plugin](https://github.com/richtr/NoSleep.js))
- you can mark which tracks you have listened to (saved using HTML5 Local Storage)
- main track controls are provided in big buttons, such as pausing and rewinding a set number of seconds

## Moving forward

I got in contact with the creator of the Language Transfer course and let him know about my app. He told me that he had another developer currently trying to build an app, but that my code may help them with development. Current development for the new app is going on [here](https://github.com/LanguageTransfer/language-transfer).

The source code for my prototype is available [on GitHub](https://github.com/HarveyWilliams/LanguageTransfer2).
