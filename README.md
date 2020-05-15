# roam-highlighter

Now you can officially install the Extension from the Chrome Web Store here: [Roam-highlighter Extension](https://chrome.google.com/webstore/detail/roam-highlighter/mcoimieglmhdjdoplhpcmifgplkbfibp)

This Highlighter extension is meant for use with the Roam Research note taking application to help "clip" web pages by highlighting all the areas you want to save in Roam and then easily copying/pasting into Roam in a Roam friendly format. You also are able to Double Bracket words / phrases with the extension so that they create Page/Link references when pasted into Roam. See below for details on how to use!

## How to Use the Highlighter

- Install Chrome Extension from the [Chrome Web Store](https://chrome.google.com/webstore/detail/roam-highlighter/mcoimieglmhdjdoplhpcmifgplkbfibp)
- Press the Highlighter icon in Chrome Extensions toolbar to activate it (only applies to the Tab you click it on)
- Select text in an article you want to highlight and press `Ctrl + X` ("cut" command on Windows) to highlight.
- If you just want a quick way to grab a Link to the page in the `[` Page title `]` `(`URL`)` format for Roam without having to highlight anything, simply use `Ctrl + X` without any text selected or Highlights and it will just copy that to the clipboard for you.
- `Ctrl + Click` (will not work for MACs) or `Alt + Click` (MACs or Windows) text already highlighted if you want to remove it later.
- Double-Click a word that is already highlighted for it to turn Blue which means will be pasted to roam as page reference [[Clicked-Word]]
- `Ctrl or Alt + Select Text` that is already highlighted will allow for multi word page reference in Roam [[Multiple Word Page Names]]
- Everything auto updates and copies to clipboard anytime you make any changes.
- Paste into Roam and the formatting will do the work for you.
- If you don't like the way it handles Line Breaks by default, there are 4 options to quickly switch between.
- Simple go back to your webpage and press `Ctrl + V` ("paste" command on windows) to bring up an options input.
- Four Options for handling line breaks within each selected highlight by the user (see Demo #3 below)
  1. `Set to 0` (Default) if you want line breaks (e.g., each paragraph) to create new bullets at same hierarchy/level
  2. `Set to 1` if you want line breaks (e.g., each paragraph) to create new bullets, but nested underneath the first "paragraph" in the highlight
  3. `Set to 2` if you want line breaks (e.g., each paragraph) to be in same bullet with `Ctrl + Enter` "soft line breaks" like `Ctrl + Shift + V` does in browser pasting
  4. `Set to 3` if you want line breaks (e.g., each paragraph) to be replaced with a "space" and simply concatenated into a single bullet and without any line breaks

Note: if you highlight something it will turn to yellow... then if you Ctrl + Click (or Alt + Click) any highlight, it will remove it... BUT now if you select text (instead of just clicking) within a yellow Highlight while holding Ctrl or Alt, it will turn it Blue and will now tag/link that piece in Double Brackets [[selection]] so that when pasted into Roam it creates a backlink/page/tag!! So  you can pre tag/link stuff straight from webpages. If you Ctrl + Click (or Alt + Click) any of the Blue highlights, it will remove it from being tagged and turn it back to Yellow.

## Demo 1 (real quick/simple)

![](https://user-images.githubusercontent.com/64155612/81344586-e2408100-906b-11ea-9601-5b6082c6de5f.gif)

## Demo 2

![](https://user-images.githubusercontent.com/64155612/81142339-4b1ce180-8f24-11ea-908b-add409f0c7d4.gif)

## Demo 3 (showing options for handling line breaks)

![](https://user-images.githubusercontent.com/64155612/81344530-c3da8580-906b-11ea-9696-3abce1d0a912.gif)

## Demo 4 (Select word(s) within a highlight to mark for [[page linking]])

![KfZJYsYBuJ](https://user-images.githubusercontent.com/64155612/81620376-8d20aa00-93a0-11ea-8a6a-55d4d427f27c.gif)

## Demo 5 (New "side window" that shows Highlighter clipboard and allows you to change settings)

![](https://user-images.githubusercontent.com/64155612/82017697-91ff8b00-9638-11ea-81a4-14608213e6cd.gif)

## Getting Started

Install the extenstion from the Chrome Web Store at: [Roam-highlighter Extension](https://chrome.google.com/webstore/detail/roam-highlighter/mcoimieglmhdjdoplhpcmifgplkbfibp)

[Roam-highlighter Extension](https://chrome.google.com/webstore/detail/roam-highlighter/mcoimieglmhdjdoplhpcmifgplkbfibp) testing this link.

## Acknowledgments

* Thanks to @anthilemoon with [+Roam bookmarklet](https://github.com/anthilemoon/plus-roam)
* Thanks to @ryanguill with his modifications to [+Roam mod](https://github.com/ryanguill/plus-roam/tree/development)
* Thanks to Daniel Wirtz for his Demo on the highlighter he is working on https://twitter.com/wirtzdan/status/1251965560684007424?s=20
