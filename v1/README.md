#### Version 1 (2024-03-08)

##### How it Works:
1. This plugin checks if `fonts.googleapis.com` and `fonts.gstatic.com` Google Fonts stylesheets exist on the page, and adds them if they don't already exist.
2. Makes a `fetch` request to `fonts.googleapis.com` to check if the fonts specified by the user exist.
3. Once verified, make a `fetch` request for each `font-weight` (`100, 200, 300, 400, 500, 600, 700, 800, 900`), regardless if that particular font has it or not. For example, the [Itim](https://fonts.google.com/specimen/Itim) font only has `400` available, so it will return a negative value for all other weights it does not have.
4. If the font only has one `font-weight` available, add it as well as its italic counterpart.
5. If the font has multiple `font-weight` options available, make another `fetch` request for a [variable font weight range](https://fonts.google.com/knowledge/using_type/loading_variable_fonts_on_the_web).\
— If it succeeds, that font is a variable font. Proceed with the variable range as well as its italic counterpart.\
— If it fails, that font is not a variable font and each `font-weight` needs to be loaded separately (along with its italic counterpart) rather than specifying a range.
7. Lastly, combine all fonts' strings together and load them as a single stylesheet.
