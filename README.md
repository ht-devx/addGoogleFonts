### addGoogleFonts

A plugin that quickly imports all available styles (such as bold and italic variants) of [Google Fonts](https://fonts.google.com/) by specifying the font name(s).

**Preview / Demo:** [jsfiddle.net/ht_dev/4n8xk2p3](https://jsfiddle.net/ht_dev/4n8xk2p3)\
**Author:** HT ([@ ht-devx](https://github.com/ht-devx))\
**Release date:** 2024-03-08\
**Last updated:** 2024-08-22 4:05PM [GMT-7]

---

#### Table of Contents:
* [About](#addgooglefonts)
* [How to Use](#how-to-use)
* [Usage Notes](#usage-notes)
* [How it Works](#how-it-works)
* [Attribution](#attribution)
* [Troubleshooting](#troubleshooting)
* [Credits](#credits)

---

#### How to use:

Include the following after `<head>`:
```html
<script src="https://cdn.jsdelivr.net/gh/ht-devx/addGoogleFonts/v2/addGoogleFonts.min.js"></script>
<script>
addGoogleFonts("Albert Sans, Bona Nova");
</script>
```
In this example, [Albert Sans](https://fonts.google.com/specimen/Albert+Sans) and [Bona Nova](https://fonts.google.com/specimen/Bona+Nova) are included, thus they will be added to the project.

To apply the fonts, specify the font name as the `font-family` of your component in its CSS:
```css
.your-selector {
    font-family: "Albert Sans", sans-serif;
}

.another-example-selector {
    font-family: "Bona Nova", serif;
}
```
In the above example, `sans-serif` and `serif` are fallbacks in case the intended fonts fail to load properly, or are slow to load.

Preview of how it all comes together:\
[jsfiddle.net/ht_dev/4n8xk2p3](https://jsfiddle.net/ht_dev/4n8xk2p3)

#### Usage notes:
* Feel free to incorporate as many fonts as desired, provided that they are available on [Google Fonts](https://fonts.google.com/).
* Font names should be separated by a comma `,` and should stay within the quotation marks `""`.

:white_check_mark: Correct example:
```js
addGoogleFonts("Albert Sans, Bona Nova");
```

:x: Incorrect example:
```js
addGoogleFonts("Albert Sans", "Bona Nova");
```

---

#### How it Works:
<sub>This explanation is of **version 2 (2024-08-22)**.</sub>  
<sup>For the explanation for **version 1 (2024-03-08)**, please see [this](https://github.com/ht-devx/addGoogleFonts/blob/main/v1/README.md).</sup>
1. This plugin checks if `fonts.googleapis.com` and `fonts.gstatic.com` Google Fonts stylesheets exist on the page, and adds them if they don't already exist.
2. Makes a `fetch` request to `fonts.googleapis.com` API to retrieve a complete object list of available fonts.
3. Scans the object result to check if the specified fonts exist.
4. If the font has an `"axes"` property with `"tag": "wght"`, it is a variable font. Proceed with the [variable range](https://fonts.google.com/knowledge/using_type/loading_variable_fonts_on_the_web) as well as its italic counterpart.
5. Otherwise, the font is not a variable font, each `font-weight` needs to be added separately with its italic counterpart, and can be found under the `"variants"` property.
6. Lastly, combine all fonts' strings together and load them as a single stylesheet.

---

#### Attribution:
No visible credit/attribution is required, but please do not remove the credits situated within the JS file(s). A link to this repository would be greatly appreciated!

---

#### Troubleshooting:
If you need further assistance, please contact me at: [hello.ht.dev@gmail.com](mailto:hello.ht.dev@gmail.com)

---

#### Credits:

Evidently, [Google Fonts](https://fonts.google.com/).

Based on [@rachaelthemes](https://github.com/rachaelthemes)' [customFonts.js](https://rachaelthemes.com/custom-fonts):
> A script that takes a provided font (or fonts) and automatically calls a Google Fonts script to load those fonts.

Special thanks to Rachael for giving me the green light for my `addGoogleFonts` plugin. :white_circle: :white_circle: :green_circle:\
Rachael's script is tailored toward Tumblr theme users, whilst my `addGoogleFonts` is for more general use in web projects.
