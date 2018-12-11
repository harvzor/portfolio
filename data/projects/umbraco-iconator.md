![Icon Picker Dialog](/media/projects/umbraco-iconator/IconPickerDialog.png)

Iconator is an Umbraco package that lets content editors select icons in the backoffice to be displayed on the front end. What makes this package great is that it allows the picking of icons from a CSS file which links to a font file. Classes are setup in the CSS file which specify which icon corresponds to that class. Iconator allows the content editor to pick which icon they want in a visual way that minimises human error (rather than them typing out the class name).

Iconator works by reading the source CSS file, scanning for class names using a regular expression, loading the fonts, and finally displaying the icons to be picked.

All of this required a small amount of configuration to be done in Umbraco.

![Icon Picker Data Type](/media/projects/umbraco-iconator/IconPickerDataType.png)

Iconator is available on GitHub: https://github.com/HarveyWilliams/Iconator
