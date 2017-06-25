Recently I came across a problem where I needed to get the length for a group of MP3 files in a folder. Windows displays the length in hours, minutes and seconds, but I purely needed the length of each file in only seconds. Originally my plan was to get the length of the files using a calculator, but this was error prone, time consuming and also.. I mean, I'm a programmer. Surely there's a simple script that can do this for me?

Judging from [this Stack Overflow thread](http://stackoverflow.com/questions/119404/time-length-of-an-mp3-file), it was very easy to do using Python, but I don't have Python installed (although I should probably find some time to actually learn the languages basics). I do however have NodeJS installed.

After discovering and installing [this package](https://www.npmjs.com/package/mp3-duration) that can find the length of a single MP3 file, the next step was easy. Simply get all of the files in a folder, and get the length of each file:

```
const mp3Duration = require('mp3-duration');
const fs = require('fs');

const folder = './mp3s/';

fs.readdir(folder, (err, files) => {
    if (err) {
        return console.log(err.message);
    }

    for (let file of files) {
        mp3Duration(folder + file, (err, duration) => {
            if (err) {
                return console.log(err.message);
            }

            console.log(file + ' is ' + duration + ' seconds long');
        });
    }
});
```

After running this script and waiting a couple of seconds, the console began to spit out of all of data I needed:

```
...
37.mp3 is 366.733 seconds long
05.mp3 is 372.297 seconds long
29.mp3 is 379.376 seconds long
28.mp3 is 380.735 seconds long
19.mp3 is 413.022 seconds long
11.mp3 is 420.206 seconds long
12.mp3 is 424.751 seconds long
20.mp3 is 426.632 seconds long
03.mp3 is 437.316 seconds long
01.mp3 is 445.1 seconds long
26.mp3 is 457.822 seconds long
06.mp3 is 466.495 seconds long
07.mp3 is 466.625 seconds long
18.mp3 is 462.785 seconds long
32.mp3 is 481.176 seconds long
24.mp3 is 470.518 seconds long
...
```

Hurrah! Oh wait, the files aren't quite in order here. I wanted the files to be read in alphabetical order. Obviously a race condition was occuring. Generally the shortest file was being printed at the top, and the longest at the bottom.

A quick change ensured that each file would be read in the correct order:


```
const mp3Duration = require('mp3-duration');
const fs = require('fs');

const folder = './mp3s/';

const readFiles = (files, index) => {
    let file = files[index];

    mp3Duration(folder + file, (err, duration) => {
        if (err) {
            return console.log(err.message);
        }

        console.log(file + ' is ' + duration + ' seconds long');

        if (files.length != index + 1) {
            readFiles(files, index + 1);
        }
    });
};

fs.readdir(folder, (err, files) => {
    if (err) {
        return console.log(err.message);
    }

    readFiles(files, 0);
});
```

This causes this output:

```
01.mp3 is 445.1 seconds long
02.mp3 is 320.183 seconds long
03.mp3 is 437.316 seconds long
04.mp3 is 356.415 seconds long
05.mp3 is 372.297 seconds long
06.mp3 is 466.495 seconds long
07.mp3 is 466.625 seconds long
08.mp3 is 357.982 seconds long
09.mp3 is 585.117 seconds long
10.mp3 is 344.842 seconds long
11.mp3 is 420.206 seconds long
12.mp3 is 424.751 seconds long
...
```

This script is significantly slower than the last, because the program waits until each files length is figured out before reading the next file.

My challenge was now complete, but still, I wanted to produce the fastest script I could. The `Promise` API is really useful for this:

```
const mp3Duration = require('mp3-duration');
const fs = require('fs');

const folder = './mp3s/';

const promises = [];
const results = [];

fs.readdir(folder, (err, files) => {
    if (err) {
        return console.log(err.message);
    }

    for (let file of files) {
        promises.push(new Promise((resolve, reject) => {
            mp3Duration(folder + file, (err, duration) => {
                if (err) {
                    reject(err.message);
                }

                results.push(file + ' is ' + duration + ' seconds long');

                resolve();
            });
        }));
    }

    Promise.all(promises).then(() => {
        console.log(results.sort());
    }).catch((err) => {
        console.log('error:', err);
    });
});
```

After a few seconds of waiting, this outputs an array of sorted values:

```
[ '01.mp3 is 445.1 seconds long',   
  '02.mp3 is 320.183 seconds long', 
  '03.mp3 is 437.316 seconds long', 
  '04.mp3 is 356.415 seconds long', 
  '05.mp3 is 372.297 seconds long', 
  '06.mp3 is 466.495 seconds long', 
  '07.mp3 is 466.625 seconds long', 
  '08.mp3 is 357.982 seconds long', 
  '09.mp3 is 585.117 seconds long', 
  '10.mp3 is 344.842 seconds long', 
  '11.mp3 is 420.206 seconds long', 
  ...]
```

## Conclusion

I'm sure that there's an even faster way of getting the length in seconds of a group of MP3 files, but for my purposes this worked great. However, writing this saved me time, it's reusable for the next time I need to do it and as always, writing anything with JS is a lot of fun for me.

