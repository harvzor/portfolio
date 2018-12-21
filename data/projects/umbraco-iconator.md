![Icon Picker Dialog](/media/projects/umbraco-iconator/icon-picker-dialog.png)

## What is the purpose of this Umbraco package?

[Iconator](https://our.umbraco.com/packages/backoffice-extensions/iconator/) is an Umbraco package that lets content editors select icons in the backoffice to be displayed on the front end. What makes this package great is that it allows the picking of icons from a CSS file which links to a font file. Classes are setup in the CSS file which specify which icon corresponds to that class. Iconator allows the content editor to pick which icon they want in a visual way that minimises human error (rather than them typing out the class name).

Iconator works by reading the source CSS file, scanning for class names using a regular expression, loading the fonts, and finally displaying the icons to be picked.

All of this required a small amount of configuration to be done in Umbraco:

![Icon Picker Data Type](/media/projects/umbraco-iconator/icon-picker-data-type.png)

## How to install Iconator

I made a video showing how users can install Iconator and configure it:

[How to install Iconator](https://www.youtube.com/watch?v=5AIyf7w47K0)

## Links

- GitHub: https://github.com/harvzor/Iconator
- Umbraco packages: https://our.umbraco.com/packages/backoffice-extensions/iconator/
- NuGet: https://www.nuget.org/packages/Umbraco.Iconator/
