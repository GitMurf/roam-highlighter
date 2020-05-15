# roam-highlighter

Now you can officially install the Extension from the Chrome Web Store here: [Roam-highlighter Extension](https://chrome.google.com/webstore/detail/roam-highlighter/mcoimieglmhdjdoplhpcmifgplkbfibp)

This Highlighter extension is meant for use with the Roam Research note taking application to help "clip" web pages by highlighting all the areas you want to save in Roam and then easily copying/pasting into Roam in a Roam friendly format. You also are able to Double Bracket words / phrases with the extension so that they create Page/Link references when pasted into Roam. See below for details on how to use!

## How to Use the Highlighter

- Install Chrome Extension from the [Chrome Web Store](https://chrome.google.com/webstore/detail/roam-highlighter/mcoimieglmhdjdoplhpcmifgplkbfibp)
- Press the Highlighter icon in Chrome Extensions toolbar to activate it (only applies to the Tab you click it on)
- **Make Highlights:** Select text in an article you want to highlight and press `Ctrl + X` ("cut" command on Windows) to highlight.
  - Updates/changes automatically copy to the clipboard anytime you make any changes.
  - With the new _Side Window_ (see below) you will see changes reflected _Real Time_.
- **Copy Page Title & URL:** If you just want a quick way to grab a Link to the page in the `[` Page title `]` `(`URL`)` format for Roam without having to highlight anything, simply use `Ctrl + X` without any Highlights made and it will copy `[` Page title `]` `(`URL`)` to the clipboard.
- **Remove a Highlight:** `Ctrl + Click` (Windows) or `Alt + Click` (MACs and Windows) previously highlighted text to remove it. **Note:** This will remove all parts of a single Highlight. If you just want to remove just a "piece" of a Highlight like a single bullet in a list, you can select that "piece" and press `Ctrl + X` to remove it.
- **Remove ALL Highlights:** `Ctrl + Q` will ask for confirmation to remove all Highlights from the current page. Press `ENTER` to confirm.
- **Link Pages (Single Word):** `Double-Click` a word that is already highlighted in Yellow to turn it Blue, which means will paste into Roam as page reference [[DoubleClickedWord]]
- **Link Pages (Multi Word):** Select previously highlighted (Yellow) text and `Ctrl + Click` (Windows) or `Alt + Click` (MACs and Windows) which will turn it to Blue, which will look like this in Roam: [[Multiple Word Page Names]]
- **Remove Linked Pages:** `Ctrl + Click` (Windows) or `Alt + Click` (MACs and Windows) any of the Blue highlights (page links) to remove the [[Double Brackets]] and turn it back to Yellow (still preserving the Highlight).
- **Show/Hide Side Window:** `Ctrl + S` or `Click Extension Icon` to Open and Close the side window view and _Settings_.
- **Change Settings:** Open the _Side Window_ with `Ctrl + S` and click the `Settings` button.
  - **Highlighter Link #Tag:** `Default` is #[[Roam-Highlights]] which will be added to the _Parent Block_ as `[` Page title `]` `(`URL`)` #[[Roam-Highlights]]
  - **Page Title for Alias Link:** `Default` is the Browser _Page Title_. Used in the _Parent Block_ as `[` Page title `]` `(`URL`)`
  - **How to handle Line Breaks within each Highlight**
    - Options for handling `Line Breaks` (e.g., paragraphs, bullets, new line characters, etc.) within a single Highlight (see Demo #3 below)
    - If you don't like the way `Line Breaks` are handled by default, here are the options you can switch between:
      1. **New bullets same level:** This is the `DEFAULT` Setting. Line breaks will create new bullets at the same hierarchy/level.
      2. **Nest under first Line Break:** Line breaks will create new bullets, but nested underneath the first Line of each Highlight.
      3. **Ctrl + Shift + V same bullet:** Line breaks within a Highlight will stay in the same block/bullet but preserves each Line Break as if you added a _soft line break_ with `Ctrl + Enter` like how pasting with `Ctrl + Shift + V` does from Chrome.
      4. **Replace with single space:** Line breaks are replaced with a _single space_ (i.e., " ") for concatenation into a single block/bullet, with minor identification of where the line breaks were (_single space_).
      5. **Remove line breaks:** Line breaks are completely removed and NOT replaced with any characters which concatenates the Highlight into a single block/bullet without any identification of where the previous line breaks were.

## Demo 1 (real quick/simple)

![](https://user-images.githubusercontent.com/64155612/81344586-e2408100-906b-11ea-9601-5b6082c6de5f.gif)

## Demo 2

![](https://user-images.githubusercontent.com/64155612/81142339-4b1ce180-8f24-11ea-908b-add409f0c7d4.gif)

## Demo 3 (showing options for handling line breaks)

![](https://user-images.githubusercontent.com/64155612/81344530-c3da8580-906b-11ea-9696-3abce1d0a912.gif)

## Demo 4 (Select word(s) within a highlight to mark for [[page linking]])

![KfZJYsYBuJ](https://user-images.githubusercontent.com/64155612/81620376-8d20aa00-93a0-11ea-8a6a-55d4d427f27c.gif)

## Demo 5 (New "side window" showing Highlighter clipboard & Settings)

![](https://user-images.githubusercontent.com/64155612/82017697-91ff8b00-9638-11ea-81a4-14608213e6cd.gif)

## Getting Started

Install the extenstion from the Chrome Web Store at: [Roam-highlighter Extension](https://chrome.google.com/webstore/detail/roam-highlighter/mcoimieglmhdjdoplhpcmifgplkbfibp)

[Roam-highlighter Extension](https://chrome.google.com/webstore/detail/roam-highlighter/mcoimieglmhdjdoplhpcmifgplkbfibp) testing this link.

## Acknowledgments

* Thanks to @anthilemoon with [+Roam bookmarklet](https://github.com/anthilemoon/plus-roam)
* Thanks to @ryanguill with his modifications to [+Roam mod](https://github.com/ryanguill/plus-roam/tree/development)
* Thanks to Daniel Wirtz for his Demo on the highlighter he is working on https://twitter.com/wirtzdan/status/1251965560684007424?s=20
