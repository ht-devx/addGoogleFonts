### addGoogleFonts

A plugin that quickly imports all available styles (such as bold and italic variants) of [Google Fonts](https://fonts.google.com/) by specifying the font name(s).

**Preview / Demo:** [jsfiddle.net/ht_dev/4n8xk2p3](https://jsfiddle.net/ht_dev/4n8xk2p3)\
**Author:** HT ([@ ht-devx](https://github.com/ht-devx))\
**Release date:** 2024-03-08\
**Last updated:** 2024-03-08 3:08PM [GMT-8]

---

#### Table of Contents:
* [About](#addgooglefonts)
* [How to Use](#how-to-use)
* [Usage Notes](#usage-notes)
* [Attribution](#attribution)
* [Troubleshooting](#troubleshooting)
* [Credits](#credits)

---

#### How to use:

Include the following after `<head>`:
```html
<script src="https://cdn.jsdelivr.net/gh/ht-devx/addGoogleFonts/addGoogleFonts.min.js"></script>
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
