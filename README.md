# Roam-highlighter

For any **_Issues, Questions, Ideas, or Requests_** please use the GitHub Issue tracker: [Submit an Issue](https://github.com/GitMurf/roam-highlighter/issues/new)

Install the Extension from the Chrome Web Store here: [Roam-highlighter Extension](https://chrome.google.com/webstore/detail/roam-highlighter/mcoimieglmhdjdoplhpcmifgplkbfibp).

For Firefox, see the [Getting Started](https://github.com/GitMurf/roam-highlighter/blob/master/README.md#getting-started) section below...

This Highlighter extension is meant for use with the [Roam Research](https://roamresearch.com/) note taking application to help "clip" web pages by highlighting all the areas you want to save in Roam and then easily copying/pasting into Roam in a Roam friendly format. You also are able to Double Bracket words / phrases with the extension so that they create Page/Link references when pasted into Roam. See below for details on how to use it!

# How to Use the Highlighter

First and foremost, here are three YouTube walkthroughs / Demos of how to use the Roam-highlighter:
- [Roam-highlighter QUICK Demo - YouTube](https://www.youtube.com/watch?v=UzseaoxaSEM&feature=youtu.be) (4:43)
- [Roam-highlighter SHORT Demo - YouTube](https://www.youtube.com/watch?v=VoO1H6p9dwc&feature=youtu.be) (9:36)
- [Roam-highlighter FULL Demo - YouTube](https://www.youtube.com/watch?v=mU4Yf7Kgku4&feature=youtu.be) (24:56)

**Note:** _I am a Windows guy but have tried my best to test on Macs as well. The shortcuts should be compatible with both Windows and Mac, as well as Chrome and Firefox. If by chance there is an issue, you can modify the shortcuts to whatever you prefer in both Firefox and Chrome in their respective Extension settings pages._ (see [Demo 9 - Customizing Shortcuts](https://github.com/GitMurf/roam-highlighter/blob/master/README.md#demo-9---customize-shortcut-keys-in-chrome-and-firefox))

- Press the Highlighter icon (or `Alt + X`) in the Extensions toolbar to activate it (only applies to the Tab you click it on)
- **Show/Hide Side Window:** `Alt + X` to Open and Close the side window view and _Settings_.
- **Make Highlights:** Select text from any webpage and press `Ctrl + X` (_"cut" command_) to highlight.
  - Updates and changes automatically copy to the clipboard.
  - With the new _Side Window_ you will see changes reflected _Real Time_ to see what it will look like in Roam.
  - [Demo 1](https://github.com/GitMurf/roam-highlighter#demo-1---activate-the-highlighter-extension-and-perform-a-simple-highlight)
- **Copy Page Title & URL:** For a quick way to grab a _Link_ to a page in the `[` Page title `]` `(`URL`)` format for Roam without any highlights, simply use `Ctrl + X` without any Selection/Highlights and it will copy `[` Page title `]` `(`URL`)` to the clipboard.
  - Additionally, when you first activate the Highlighter with `Alt + X` or by `Clicking` the Extension Icon, by default the `[` Page title `]` `(`URL`)` will be saved to your clipboard for quick/easy pasting into Roam.
- **Headers, Bullets, and nesting**
  - [Demo 6](https://github.com/GitMurf/roam-highlighter#demo-6---auto-indents-bulleted-lists-and-headers) - Headers and Bulleted/Numbered Lists auto nest/indent.
  - [Demo 7](https://github.com/GitMurf/roam-highlighter#demo-7---manually-add-header-to-nest-under) - Manually add "header" by selecting a highlight and pressing `Alt + A` which nests bullets after it.
- **Removing Highlights**
  - **Single Highlight:** To remove a highlight use `Ctrl + Click` (Windows) or `Alt + Click` (MAC or Windows). This will remove all _"parts"_ (links, bullets, line breaks, etc.) of a section you Highlighted.
  - **Part of a Highlight:** If you just want to remove a _"part"_ of a Highlight (e.g., single bullet in a list), you can select the text of that _"part"_ and press `Ctrl + X` (_"cut" command_) to remove it, while preserving the rest of the Highlight.
  - **ALL Highlights:** Pressing `Alt + Q` will ask for confirmation to remove all Highlights from the current page. Or use the button from the _Settings_ window.
  - [Demo 2](https://github.com/GitMurf/roam-highlighter#demo-2---removing-highlights)
- **Adding [[Double Brackets]] for Page Linking/References in Roam**
  - For text that is already highlighted in Yellow, you can have [[Double Brackets]] added for _Page Linking_ in Roam.
  - Anything you choose to have [[Double Brackets]] added to will be highlighted in Blue. See the following:
    - **Single Word:** `Double-Click` a single word to add to Roam like: [[DoubleClickedWord]]
    - **Multiple Words:** Select multiple words from previously highlighted (Yellow) text and press `Alt + Z` to add to Roam like: [[Multiple Words]]
    - **Removing Linked References:** `Ctrl + Click` (Windows) or `Alt + Click` (MAC or Windows) any of the Blue highlights (page references) to turn it back to Yellow. [[Double Brackets]] will no longer be added.
  - [Demo 4](https://github.com/GitMurf/roam-highlighter#demo-4---selecting-words-from-a-highlight-for-roam-page-linking)
- **Change Settings:** Open the _Side Window_ with `Alt + X` and click the `Settings` button.
  - [Demo 5](https://github.com/GitMurf/roam-highlighter#demo-5---side-window-settings)
  - **Highlighter Link #Tag:** #[[Roam-Highlights]] is the `Default` which is added to the _Parent Block_ as `[` Page title `]` `(`URL`)` **#[[Roam-Highlights]]**
  - **Page Title for Alias Link:** The Browser _Page Title_ is the `Default` which is used in the _Parent Block_ as `[` **Page Title** `]` `(`URL`)`
  - **How to handle Line Breaks within each Highlight**: [Demo 3](https://github.com/GitMurf/roam-highlighter/blob/master/README.md#demo-3-need-to-record---options-for-handling-line-breaks-in-a-highlight)
    - Options for handling `Line Breaks` (e.g., paragraphs, bullets, new line characters, etc.) within a single Highlight (see **Demo #3** below)
    - If you don't like the way `Line Breaks` are handled by default, here are the options you can switch between:
      1. **New bullets same level:** This is the `DEFAULT` Setting. Line breaks will create new bullets at the same hierarchy/level.
      2. **Nest under first Line Break:** Line breaks will create new bullets, but nested underneath the first Line of each Highlight.
      3. **Ctrl + Shift + V same bullet:** Line breaks within a Highlight will stay in the same block/bullet but preserve each Line Break as if you added a _soft line break_ with `Ctrl + Enter` like how pasting with `Ctrl + Shift + V` works in Chrome.
      4. **Replace with single space:** Line breaks are replaced with a _single space_ (i.e., " ") for concatenation into a single block/bullet.
      5. **Remove line breaks:** Line breaks are completely removed and NOT replaced with any characters which concatenates the Highlight into a single block/bullet. __Note:__ _If there isn't already other "white space", this could cause the last word from the first line to be merged with the first word of the second line._
- **Kindle Notes & Highlights Extraction:** [Demo 8](https://github.com/GitMurf/roam-highlighter#demo-8---extract-highlights-and-notes-from-kindle)

If you have any issues, questions or feedback for improving the instructions, please [Open a GitHub Issue](https://github.com/GitMurf/roam-highlighter/issues/new) and post your thoughts. Thanks and enjoy!

## Demo 1 - Activate the Highlighter Extension and perform a simple Highlight

![](https://user-images.githubusercontent.com/64155612/82860191-b297d280-9ecd-11ea-9e4a-aebe906391c7.gif)

## Demo 2 - Removing highlights

![](https://user-images.githubusercontent.com/64155612/82860651-28e90480-9ecf-11ea-8c59-81ebc50a1687.gif)

## Demo 3 (Need to Record) - Options for handling Line Breaks in a Highlight

![]()

## Demo 4 - Selecting words from a highlight for Roam "page linking"

![](https://user-images.githubusercontent.com/64155612/82860891-e542ca80-9ecf-11ea-9242-652caad48673.gif)

## Demo 5 - "Side Window" Settings

![](https://user-images.githubusercontent.com/64155612/82861224-d7da1000-9ed0-11ea-9457-e10d76876908.gif)

## Demo 6 - Auto indents bulleted lists and Headers

![](https://user-images.githubusercontent.com/64155612/82862301-26d57480-9ed4-11ea-886a-1e42f5e83a0b.gif)

## Demo 7 - Manually add "Header" to nest under

![](https://user-images.githubusercontent.com/64155612/82862528-b418c900-9ed4-11ea-9c92-5e1b9fa70dbe.gif)

## Demo 8 - Extract highlights and notes from Kindle

![](https://user-images.githubusercontent.com/64155612/82861292-12dc4380-9ed1-11ea-9df0-f218e9354ac9.gif)

## Demo 9 - Customize shortcut keys in Chrome and Firefox

![](https://user-images.githubusercontent.com/64155612/82953227-3ea60a80-9f5f-11ea-83d9-09c316725e34.gif)
![](https://user-images.githubusercontent.com/64155612/82953429-9e9cb100-9f5f-11ea-8122-e0c125b6053e.gif)

## Release Notes

v1.9.7.1

- Fixed issue when triple clicking paragraph to select entire paragraph to highlight (now works nicely)
- Added dropdown selection for how to handle page links/refs "Case" (lower, upper, capitalize all words, capitalize first word, as is on page)
- Fixed window size positioning that was cutting off the side window on smaller screens
- Fixed handling of outlook webmail bullets

v1.9.7

- Obsidian settings added (see [forum](https://forum.obsidian.md/t/web-clipper-highlighter-and-kindle-highlights-notes-extraction-extension/852))
- double brackets around author for kindle highlights.
- Checkbox next to page title in case you only want highlights and don’t want/need the title/URL link at top.
- truncate option to put character(s) in textbox to shorten page title to location of first occurrence (e.g., “- “ to remove stuff after)
- clear out formatting boxes like bold, italics, etc. and uncheck Headers to just bring in text results without any formatting (nesting/indents for headers still applies).
- For Kindle extraction un-checking the page title checkbox will remove the first bullet nesting under the title of the book and just start with the attributes in root of page/bullets
- When activating highlighter the page/URL is auto added to clipboard to use for quick grab of “bookmark” without any highlights.
- Fixed some other random issues identified by folks.

v1.9.5

- Implemented auto indenting/nesting for Bullets/Lists
- Kindle highlights/notes extraction
- Customizable shortcut keys now through Chrome and Firefox native settings - [DEMO 9](https://github.com/GitMurf/roam-highlighter/blob/master/README.md#demo-9---customize-shortcut-keys-in-chrome-and-firefox)
- Fixed a few issues with wikipedia / wikiquotes
- Side window view now shows tabs/headers/nested etc. so you know exactly what your paste into Roam will look like

v1.9 released to the Chrome Store. I thought I would tell you what all was updated! I pretty much implemented everyone's requests/features/fixes from the past week, so If I missed any, please let me know. Hopefully you guys will really like the new stuff!

- Changes to settings will now save from Tab to Tab and Session to Session!
- Instructions/shortcuts in side window on startup
- Links in Settings page for resources/instructions/DEMOs (Github)
- Only show "Plaintext" and hide HTML clipboard data (checkbox available to see both)
- Command + S for MACs now works for show/hide of side window
- Change width/height of the Side Window
- If you Hide the side window, it will say hidden at startup until you choose to show it again
- Button add in Settings to remove all highlights on page
- Added line break setting #5 to replace line breaks with blank "" (similar to Option 4 with " " spaces)
- If there is a "Header" (e.g., `<H1>`) element in your Highlight, the highlights after it will auto nest under it until the next Header
- You can add your own "headers" to indent under but selecting a highlight and doing `Alt + Right-Click` (text will turn red). Then bullets after will indent under it until the next `<H1>`, `<H2>`, etc. header on page OR until you select another section to `Alt + Right-Click` as a new header to indent under.
- Fixed removal of [[Page Reference]] blue highlights so it doesn't remove the entire highlight
- Fixed handling of Footnotes (e.g., on Wikipedia)
- Updated some of the Side Window formatting
- Remove [ ] brackets when in Links as they mess/ruine the [](URL) format in Roam
- Tweaked/fixed some additional other obscure HTML element issues discovered by users.

## Getting Started

There are both Chrome and Firefox Extensions of the Roam-highlighter. For the time being, Firefox has to be installed "manually" (see below for details).

- Chrome Web Store: [Roam-highlighter Extension](https://chrome.google.com/webstore/detail/roam-highlighter/mcoimieglmhdjdoplhpcmifgplkbfibp)
- Firefox won't let us upload a public Extension until Roam is open Beta, so I created a private Extension you have to download directly:
  - Here is the link to find the newest Firefox Extension: [Firefox Extension Newest Version](https://github.com/GitMurf/roam-highlighter/tree/master/Firefox%20temp%20Add-on)
  - Click the "Firefox Extension Newest Version" link
  - Download the .xpi file
  - Choose to "Open" and choose "Firefox" as the program to open with
  - This process works for Windows (and I assume Macs as well)

## Contributors

* [GitMurf](https://github.com/GitMurf) - me :)
* @[sai-prasanna](https://github.com/sai-prasanna) - Ported over to Firefox Extension/Add-on... Thanks!

## Acknowledgments

* Thanks to @anthilemoon with [+Roam bookmarklet](https://github.com/anthilemoon/plus-roam)
* Thanks to @ryanguill with his modifications to [+Roam mod](https://github.com/ryanguill/plus-roam/tree/development)
* Thanks to Daniel Wirtz for his Demo on the highlighter he is working on https://twitter.com/wirtzdan/status/1251965560684007424?s=20
