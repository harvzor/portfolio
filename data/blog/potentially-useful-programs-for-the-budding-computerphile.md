Below I have collated a short list of some slightly obscure programs that I have installed on just about any computer that I own. You won't find obvious choices such as Firefox or Chrome, but the type of programs that you may not know you needed.. Until now.

## The programs

### Audacity - OSX, Windows, Linux

The obvious choice for any simple audio editing. This can also be used to record your voice. Although I rarely need to edit audio, this program is small enough and bloat-free enough that I won't second guess it on a new machine.

![Audacity](/media/blog/potentially-useful-programs-for-the-budding-computerphile/audacity.png)

[AlternativeTo](http://alternativeto.net/software/audacity/)

[Website](http://www.audacityteam.org/)

Chocolatey: choco install audacity

### BlueScreenView - Windows

Every time a blue screen happens on a Windows machine, a log is created and an event is recorded. Looking at the event doesn't give much information, and the log file is impossible to read, but BlueScreenView allows you to see a little more into what caused the blue screen.

I came across this software when a nearly brand new laptop of mine started BSODing over and over. Using this software, I quickly discovered that there was something wrong with the Windows filesystem, which led me to fixing it.

![BlueScreenView](/media/blog/potentially-useful-programs-for-the-budding-computerphile/bluescreenview.png)

[AlternativeTo](http://alternativeto.net/software/bluescreenview/)

[Website](http://www.nirsoft.net/utils/blue_screen_view.html)

Choco: choco install bluescreenview

### Bulk Rename Utility - Windows

BRU is a god send if you have a bunch of files that need renaming. It's a small light-weight program but doesn't skimp on features.

![Bulk Rename Utility](/media/blog/potentially-useful-programs-for-the-budding-computerphile/bulkrenameutility.png)

[AlternativeTo](http://alternativeto.net/software/bulk-rename-utility/)

[Website](http://www.bulkrenameutility.co.uk/Main_Intro.php)

Choco: choco install bulkrenameutility

### Calibre - OSX, Windows, Linux

Calibre is a great program for managing your book library. Just drop a book file (such as an EPUB or MOBI) into the program and it will slot the book into its file system. Attach an eReader such as a Kindle and with the click of a button, Calibre will (if necessary) convert the file to a type that the reader will understand, and upload it.

![Bulk Rename Utility](/media/blog/potentially-useful-programs-for-the-budding-computerphile/bulkrenameutility.png)

[AlternativeTo](http://alternativeto.net/software/calibre/)

[Website](http://calibre-ebook.com/)

Choco: choco install calibre

### Chocolatey - Windows

Chocolatey is a CLI package manager a little bit like Aptitude except it works on Windows. Chocolatey cuts out the tediousness of downloading an installer and running through the installation wizard, and does this all automatically. Chocolatey can also be used to auto update all of your programs.

One of the best things about Chocolatey is that you can be fairly sure that none of the packages that are available on it will try to install any extra bloat-ware (such as browser toolbars or anti-virus programs). This is because each package is maintained by someone who chooses the best settings for that program. This best settings options can however sometimes be not what you want, especially when a program chooses to install itself somewhere unusual. However, 90% of the time I find that Chocolatey installs the program just fine.

The other great thing about Chocolatey is that you can export all of the programs you have installed via it to a list, and then get Chocolatey to run through that list on another computer. This can be used to replace Ninite when you are setting up a new computer. I find that this process saves me a lot of time - just input the command and Chocolatey will happily install as many programs as you want while you walk away and think about less tedious things.

The main syntax of Chocolatey is easy to learn. "choco search {program-name}" will return a list of programs that match your name. "choco install {program-name} -y" will install a program without asking if you accept the terms and condtions.

![Chocolatey](/media/blog/potentially-useful-programs-for-the-budding-computerphile/chocolatey.png)

[AlternativeTo](http://alternativeto.net/software/chocolatey/)

[Website](https://chocolatey.org/)

### Clover - Windows

Having tabs on a file browser makes as much sense to me as having tabs on your browser. Unfortunately, Windows has yet to implement this feature into even their latest OS. There are alternative file browsers (such as Q-Dir) that you can use instead of the default Explorer, but I find that they don't integrate with Windows as nicely as the default does. Fortunately, there is a program called Clover which adds Chrome-like tabs to your ordinary Explorer. The integration is seamless and works near perfectly.

![Clover](/media/blog/potentially-useful-programs-for-the-budding-computerphile/clover.png)

[AlternativeTo](http://alternativeto.net/software/clover)

[Website](http://ejie.me/)

Choco: choco install clover

### ConEmu - Windows

For those who like Windows, like the terminal but hate the Cmd prompt, there is ConEmu. This program allows for an overwhelming amount of customisation on the terminal including tabs and theming.

![ConEmu](/media/blog/potentially-useful-programs-for-the-budding-computerphile/conemu.png)

[AlternativeTo](http://alternativeto.net/software/conemu/)

[Website](http://conemu.github.io/)

Choco: choco install conemu

### Foobar2000 - Windows

Foobar is a fairly simplistic but highly customizable music player. There is advanced theming for people who can work out how to use that, but for me, I like to use the layout editing mode to get everything where I want.

One simple feature that I like is that the music in your library can be viewed by folder structure, and since I have a organised folder structure this is something which really appeals to me.

![Foobar2000](/media/blog/potentially-useful-programs-for-the-budding-computerphile/foobar2000.png)

[AlternativeTo](http://alternativeto.net/software/foobar2000/)

[Website](http://www.foobar2000.org/)

Choco: choco install foobar2000

### Honeyview - Windows

Honeyview is a fairly configurable image viewer. It is very fast and can view just about any image format, including GIF.

![Honeyview](/media/blog/potentially-useful-programs-for-the-budding-computerphile/honeyview.png)

[AlternativeTo](http://alternativeto.net/software/honeyview/)

[Website](http://www.bandisoft.com/honeyview/en/)

Choco: choco install honeyview

### KeePass2 - OSX, Windows, Linux, Android

KeePass is a program which stores passwords in a locked database. Enter the right master password (or attach the correct keyfile), and the database will open up. This program doesn't store the password file online so unless someone gets your local machine, you can be fairly sure that the passwords are completely safe. KeePass also allows you to generate random password of varying sizes and complexity which I always use now to ensure that my passwords can not be bruteforced.

If you need the passwords file to be accessible, consider uploading the file into the cloud (by using something like Dropbox).

One key feature for me is that password databases can be merged which is very useful for if I make changes to two versions of the same file. Using this feature I can quickly merge the two versions back into one without needing to worry about missing new passwords.

![KeePass](/media/blog/potentially-useful-programs-for-the-budding-computerphile/keepass.png)

[AlternativeTo](http://alternativeto.net/software/keepass/)

[Website](http://keepass.info/)

Choco: choco install keepass

### Launchy - OSX, Windows, Linux

It seems like every time a new a new version of any operating system comes out, they add bloat to the search tool of the OS. With Windows we now have the search looking for files on the computer, doing Bing searches and also looking for programs. 99% of the time all I want to do is get a program open that I don't have in my quick launch bar. Launchy solves this issue by only searching for programs within the OS. It is very fast and can be configured to be opened by a keypress or two. I have left it so it is opened when I press alt-space together. A box then pops up which I can type the name of the program in.

Launchy seems to learn what to search for based on what you have opened before with it. For example, if I type "c" into Launchy, it knows that I want to open up Clover because before I skipped the option that was Control Panel, and went straight for Clover. However, the inbuilt search for Windows never learns that I am more likely to use Clover than the Control Panel.

One of the best things about Launchy is that it's cross platform, which means that regardless of the operating system, I can access my programs fast without needing to learn that systems search.

Something to note is that Launchy can take a couple of minutes to put a program into its index. This means that if I install something, I can either tell Launchy to reindex, or open the program another way. When I next come to using Launchy, the program should then be in the index.

![Launchy](/media/blog/potentially-useful-programs-for-the-budding-computerphile/launchy.png)

[AlternativeTo](http://alternativeto.net/software/launchy/)

[Website](http://www.launchy.net/)

Choco: choco install launchy

### Open Broadcaster Software - OSX, Windows, Linux

OBS can be a little hard to understand if you're new to it, but the main feature which I use it for is screen recording, which it really excels at. It's totally free (including open-source) and has many features including the option to live-stream to other people.

![OBS](/media/blog/potentially-useful-programs-for-the-budding-computerphile/obs.png)

[AlternativeTo](http://alternativeto.net/software/open-broadcaster-software/)

[Website](https://obsproject.com/)

Choco: choco install obs

### Thunderbird - OSX, Windows, Linux

For mail clients, I have to say, Thunderbird is the best of a bad bunch. Email is always slightly dodgy because the technology basically died years ago, and for this reason, Thunderbird does not need to innovate. Instead, Mozilla chooses to push other features onto the mail client that has nothing to do with email (such as a calendar).

However, if you want your email to be quickly accessible (and accessible offline), all in one interface, then Thunderbird will do the trick.

![Thunderbird](/media/blog/potentially-useful-programs-for-the-budding-computerphile/thunderbird.png)

[AlternativeTo](http://alternativeto.net/software/mozilla-thunderbird/)

[Website](https://www.mozilla.org/en-GB/thunderbird/)

Choco: choco install thunderbird

### MPC-HC - Windows

MPC-HC is barely different from VLC, but a lot of nerds will swear by it. These nerds will claim that MPC can render better than VLC and with less glitches.. Or whatever.

For me, I quite like MPC simply because by default, the video player will only show the controls (when in full screen) when the cursor is actually brought over them, rather than whenever the mouse moves. Otherwise, the two programs appear to be basically identical to me.

![MPC-HC](/media/blog/potentially-useful-programs-for-the-budding-computerphile/mpc-hc.png)

[AlternativeTo](http://alternativeto.net/software/mpc-hc/)

[Website](https://mpc-hc.org/)

Choco: choco install mpc-hc

### Mumble - OSX, Windows, Linux, OSX, Android

There are many voice clients that can be used such as Ventrillo or Team Speak, but Mumble works reasonable well for me. It ensures that users set up the sound profile properly before entering any chat rooms which helps keep the chat clean.

The software is opensource, and you can install Murmur (the Mumble server) on any machine you like. Configuration for Murmur is relatively straight forward, but will most likely require port-forwarding if you are running it from a home network.

There is also an Android client which allows you to connect to Murmur, called Plumble. There is a free version of the client which I have only briefly used, but seems to work very well.

![Mumble](/media/blog/potentially-useful-programs-for-the-budding-computerphile/mumble.png)

[AlternativeTo](http://alternativeto.net/software/mumble/)

[Website](http://wiki.mumble.info/wiki/Main_Page)

Choco: choco install mumble

### qBittorrent - OSX, Windows, Linux

While uTorrent is still a very popular client for torrenting, many of the users has started moving away from it because it is shoveling advertisements into its UI. Otehr people instead choose to stay on an older version of uTorrent before it changed its way. However, for me, qBittorrent is a fine replacement. The UI is very familiar and easy to use, and the project is opensource so it's unlikely to go the way of uTorrent. Previously, people had common problems with torrents stalling for ages, but this problem seems to have been fixed.

![qBittorrent](/media/blog/potentially-useful-programs-for-the-budding-computerphile/qbittorrent.png)

[AlternativeTo](http://alternativeto.net/software/qbittorrent/)

[Website](http://www.qbittorrent.org/)

Choco: choco install qbittorrent

### Recuva - Windows

A while ago I accidentally formatted one of my USB drives which meant I lost a couple of useful files. I quickly found myself looking for a program to recover the lost files, and although a lot of programs can do this, a lot will then charge you to actually recover the files. Recuva is an excellent recovery tall made by Piriform that does file recovery without any hassle.

![Recuva](/media/blog/potentially-useful-programs-for-the-budding-computerphile/recuva.png)

[AlternativeTo](http://alternativeto.net/software/recuva/)

[Website](http://www.piriform.com/recuva)

Choco: choco install recuva

### RDCMan - Windows

RDCMan or Remote Desktop Connection Manager is a program much like the Windows inbuilt Remote Desktop Connection except it allows you to save servers into groups for easy management of multiple servers at the same time.

![RDC Man](/media/blog/potentially-useful-programs-for-the-budding-computerphile/rdcman.png)

[AlternativeTo](http://alternativeto.net/software/remote-desktop-connection-manager/)

[Website](https://www.microsoft.com/en-gb/download/details.aspx?id=44989)

Choco: choco install rdcman

### TrueCrypt - OSX, Windows, Linux

Although TrueCrypt has been abandoned by the owners of the project in 2014, it is still a tried and tested solution to drive encryption. The project was large enough that an entirely separate project was instigated to simply test the programs implementation and ensure that the encryption was entirely secure.

![Truecrypt](/media/blog/potentially-useful-programs-for-the-budding-computerphile/truecrypt.png)

[AlternativeTo](http://alternativeto.net/software/truecrypt/)

[Website](https://truecrypt.ch)

Choco: choco install truecrypt

### WinDirStat - Windows

WinDirStat is a simple program that runs through a drive on your computer and finds out the sizes of each of the files within. It then displays a simple UI where each folder and file is visually shown to help you see where space is being used. This can be helpful if you need to free up some space and you want to know where the big culprits are.

One of my colleagues found that about 40GB of their drive had mysteriously gone missing, and they couldn't find it in any of the usual folders. After running WinDirStat for a few minutes, we discovered that a huge portion of the computers drive had been taken up by a log file that had grown excessively large. This log file was being stored in an unusual place in the file system which without WinDirStats visual representation of the file system would have been very hard to find.

![WinDirStat](/media/blog/potentially-useful-programs-for-the-budding-computerphile/windirstat.png)

[AlternativeTo](http://alternativeto.net/software/windirstat/)

[Website](http://windirstat.info/)

Choco: choco install windirstat

## Thoughts and other things

There are probably many good alternatives to the list that I have put up above, but these are the ones that I currently use. One property of a program that I always look out for is if the program is cross-platform and if it is open-source. Generally, only if the program truly excels despite not having these two properties will I then use it. The reason being that if I ever choose to swap operating system then it's important to me that I can use as many of the old programs as possible. As for the open-source issue, it's comforting knowing that even if the main developers dropped support, other developers could continue to keep new releases coming out. Having the source to a program can also help ensure that there is nothing malicious hidden.

Along with all of the programs, I have included a link to AlternativeTo which is a great site that I always check before installing a new program. The program finds alternatives to just about any application or website and can help you find the best tool for your needs. AlternativeTo also allows people to comment, which can help steer you clear of any dodgy programs that may try to install malware.

If you have any other programs you think should belong in this list, comment below and tell us why you think it's great.

