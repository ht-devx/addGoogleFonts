#### Version 2 (2024-08-21)

##### How it Works:
1. This plugin checks if `fonts.googleapis.com` and `fonts.gstatic.com` Google Fonts stylesheets exist on the page, and adds them if they don't already exist.
2. Makes a `fetch` request to `fonts.googleapis.com` API to retrieve a complete object list of available fonts.
3. Scans the object result to check if the specified fonts exist.
4. If the font has an `"axes"` property with `"tag": "wght"`, it is a variable font. Proceed with the [variable range](https://fonts.google.com/knowledge/using_type/loading_variable_fonts_on_the_web) as well as its italic counterpart.
5. Otherwise, the font is not a variable font, each `font-weight` needs to be added separately with its italic counterpart, and can be found under the `"variants"` property.
6. Lastly, combine all fonts' strings together and load them as a single stylesheet.
