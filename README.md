# roam-highlighter

Now you can officially install the Extension from the Chrome Web Store here: [Roam-highlighter Extension](https://chrome.google.com/webstore/detail/roam-highlighter/mcoimieglmhdjdoplhpcmifgplkbfibp)

This Highlighter extension is meant for use with the [Roam Research](https://roamresearch.com/) note taking application to help "clip" web pages by highlighting all the areas you want to save in Roam and then easily copying/pasting into Roam in a Roam friendly format. You also are able to Double Bracket words / phrases with the extension so that they create Page/Link references when pasted into Roam. See below for details on how to use!

Start with this.

Here is a bulleted list:
- One
- Two
  - Two-one
    - Two-one-one
      - Two-one-one-one
    - Two-one-two
  - Two-two
- Three

No More bullets

## Release Notes

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

## How to Use the Highlighter

**Note:** _I am a Windows guy. While I try to document MAC specific shortcuts below, if you have any issues please google the Windows command I list to look for the MAC alternative, and whether it works or not, please open an Issue in Github letting me know what you tried so I can update the instructions accordingly and/or make a fix to the code to include a good MAC alternative. Thanks!_

- Install Chrome Extension from the [Chrome Web Store](https://chrome.google.com/webstore/detail/roam-highlighter/mcoimieglmhdjdoplhpcmifgplkbfibp)
- Press the Highlighter icon in Chrome Extensions toolbar to activate it (only applies to the Tab you click it on)
- **Show/Hide Side Window:** `Ctrl + S` or `Click Extension Icon` to Open and Close the side window view and _Settings_.
- **Make Highlights:** Select text from any webpage and press `Ctrl + X` (_"cut" command_) to highlight.
  - Updates/changes automatically copy to the clipboard anytime you make changes/additions.
  - With the new _Side Window_ you will see changes reflected _Real Time_ to see what it will look like in Roam.
- **Copy Page Title & URL:** For a quick way to grab a _Link_ to a page in the `[` Page title `]` `(`URL`)` format for Roam without any highlights, simply use `Ctrl + X` without any Selection/Highlights and it will copy `[` Page title `]` `(`URL`)` to the clipboard.
- **Removing Highlights**
  - **Single Highlight:** To remove a highlight use `Ctrl + Click` (Windows) or `Alt + Click` (MAC or Windows). This will remove all _"parts"_ (links, bullets, line breaks, etc.) of something you Highlighted.
  - **Part of a Highlight:** If you just want to remove a _"part"_ of a Highlight (e.g., single bullet in a list), you can select the text of that _"part"_ and press `Ctrl + X` (_"cut" command_) to remove it, while preserving the rest of the Highlight.
  - **ALL Highlights:** Pressing `Ctrl + Q` will ask for confirmation to remove all Highlights from the current page.
    - Press `ENTER` to confirm.
    - If you want to abort, press cancel or type `0` in the pop up prompt and press `ENTER`.
- **Adding [[Double Brackets]] for Page Linking/References in Roam**
  - For text that is already highlighted in Yellow, you can have [[Double Brackets]] added for _Page Linking_ in Roam.
  - Anything you choose to have [[Double Brackets]] added to will be highlighted in Blue. See the following:
    - **Single Word:** `Double-Click` a single word to add to Roam like: [[DoubleClickedWord]]
    - **Multiple Words:** Select multiple words from previously highlighted (Yellow) text and press `Ctrl + Click` (Windows) or `Alt + Click` (MAC or Windows) to add to Roam like: [[Multiple Words]]
    - **Removing Linked References:** `Ctrl + Click` (Windows) or `Alt + Click` (MAC or Windows) any of the Blue highlights (page references) to turn it back to Yellow. [[Double Brackets]] will no longer be added.
- **Change Settings:** Open the _Side Window_ with `Ctrl + S` and click the `Settings` button.
  - **Highlighter Link #Tag:** #[[Roam-Highlights]] is the `Default` which is added to the _Parent Block_ as `[` Page title `]` `(`URL`)` **#[[Roam-Highlights]]**
  - **Page Title for Alias Link:** The Browser _Page Title_ is the `Default` which is used in the _Parent Block_ as `[` **Page Title** `]` `(`URL`)`
  - **How to handle Line Breaks within each Highlight**
    - Options for handling `Line Breaks` (e.g., paragraphs, bullets, new line characters, etc.) within a single Highlight (see **Demo #3** below)
    - If you don't like the way `Line Breaks` are handled by default, here are the options you can switch between:
      1. **New bullets same level:** This is the `DEFAULT` Setting. Line breaks will create new bullets at the same hierarchy/level.
      2. **Nest under first Line Break:** Line breaks will create new bullets, but nested underneath the first Line of each Highlight.
      3. **Ctrl + Shift + V same bullet:** Line breaks within a Highlight will stay in the same block/bullet but preserve each Line Break as if you added a _soft line break_ with `Ctrl + Enter` like how pasting with `Ctrl + Shift + V` works in Chrome.
      4. **Replace with single space:** Line breaks are replaced with a _single space_ (i.e., " ") for concatenation into a single block/bullet.
      5. **Remove line breaks:** Line breaks are completely removed and NOT replaced with any characters which concatenates the Highlight into a single block/bullet. __Note:__ _If there isn't already other "white space", this could cause the last word from the first line to be merged with the first word of the second line._

If you have any issues, questions or feedback for improving the instructions, please open a GitHub Issue and post your thoughts. Thanks and enjoy!

## NOTE: Other than Demo #5, the following were before I implemented the "Side Window" (but still demonstrate the purpose of the Roam-highlighter tool)

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

## Contributors

* [GitMurf](https://github.com/GitMurf) - me :)
* @[sai-prasanna](https://github.com/sai-prasanna) - Ported over to Firefox Extension/Add-on... Thanks!

## Acknowledgments

* Thanks to @anthilemoon with [+Roam bookmarklet](https://github.com/anthilemoon/plus-roam)
* Thanks to @ryanguill with his modifications to [+Roam mod](https://github.com/ryanguill/plus-roam/tree/development)
* Thanks to Daniel Wirtz for his Demo on the highlighter he is working on https://twitter.com/wirtzdan/status/1251965560684007424?s=20
