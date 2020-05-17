//Version 1.8
//Date: May 16, 2020
var verNum = '1.8';
var getPage = location.href;

if(typeof roamHighlighterLoaded !== "undefined" || getPage.includes('roamresearch.com'))
{
    //Variable already present/set so therefore do not need to run again as don't want to duplicate load the Javascript code
    if(roamHighlighterLoaded == 1)
    {
        var divElemMain = document.getElementById("rmHLmain");
        divElemMain.style.display = "block";
    }
}
else
{
    var sameBlock = Number(0);
    var pageTitle = document.title.toString();
    var pageRef = "#[[Roam-Highlights]]";
    var roamHighlighterLoaded = 1;
    //Variable to see if starting by click event (to remove a highlight) OR by a 'cut' event by user adding a highlight
    var clickEvent = 0;
    //Variable to count the total number of highlights selected and also then create SPAN Title to be able to combine same highlight even with linebreaks
    var highlightCtr = 0;

    console.log('Loaded highlighter.js script v' + verNum);

    //-1 = Only for current item you are testing... never leave these permanently
    //0 = [Default] Don't show debug
    //1 = Show all log items marked logLevel = 1
    //2 = Show all log items marked logLevel 1 & 2
    //3 = Show all log items (Full Verbose)
    var debugMode = 0;
    var consoleTabLevel = '';

    //Setup the options/settings menu
    var divElem = document.createElement('div');
        divElem.id = 'rmHLmain';
        divElem.style.cssText = 'position:fixed;bottom:0px;right:3px;width:30%;height:85%;opacity:0.8;z-index:9999';
    var divButtonsElem = document.createElement('div');
        divButtonsElem.id = 'rmHLdivButt';
        divButtonsElem.style.cssText = 'width:100%';
        divElem.appendChild(divButtonsElem);
    var divTextElem = document.createElement('div');
        divTextElem.id = 'rmHLdivText';
        divTextElem.style.cssText = 'width:100%;height:100%;float:right';
        divElem.appendChild(divTextElem);

    var divSetElem = document.createElement('div');
        divSetElem.id = 'rmHLdivSett';
        divSetElem.style.cssText = 'width:50%;height:100%;display:none;float:left';
        divElem.appendChild(divSetElem);

        var formElem = document.createElement('div');
            formElem.id = 'rmHLform';
            formElem.style.cssText = 'width:100%;height:100%;background-color:white;padding:15px;border:1px solid black';
            divSetElem.appendChild(formElem);

            var labelElem = document.createElement('label');
                labelElem.innerHTML = 'Highlighter Link #Tag';
                labelElem.htmlFor = "rmHLtb";
                formElem.appendChild(labelElem);
            formElem.appendChild(document.createElement('br'));
            var tbElem = document.createElement('input');
                tbElem.value = pageRef;
                tbElem.id = 'rmHLtb';
                tbElem.style.cssText = 'padding-left:5px';
                tbElem.name = "rmHLtb";
                tbElem.placeholder = "#[[Roam-Highlights]]";
                formElem.appendChild(tbElem);

            formElem.appendChild(document.createElement('br'));
            formElem.appendChild(document.createElement('br'));
            var labelElem2 = document.createElement('label');
                labelElem2.innerHTML = 'Page Title for Alias Link';
                labelElem2.htmlFor = "rmHLta2";
                formElem.appendChild(labelElem2);
            formElem.appendChild(document.createElement('br'));
            var textElem2 = document.createElement('textarea');
                textElem2.value = pageTitle;
                textElem2.id = 'rmHLta2';
                textElem2.style.cssText = 'width:90%';
                textElem2.rows = 3;
                textElem2.name = "rmHLta2";
                //textElem2.placeholder = "#[[Roam-Highlights]]";
                formElem.appendChild(textElem2);

            //5 Options for handling line breaks within each selected highlight by the user (a few words, or a few paragraphs... whatever user selects as a single highlight)
                //Set to 0 (Default) if you want line breaks (e.g., each paragraph) to create new bullets at same hierarchy/level
                //Set to 1 if you want line breaks (e.g., each paragraph) to create new bullets, but nested underneath the first "paragraph" in the highlight
                //Set to 2 if you want line breaks (e.g., each paragraph) to be in same bullet with Ctrl + Shift "soft line breaks" like Ctrl+Shift+V does in browser pasting
                //Set to 3 if you want line breaks (e.g., each paragraph) to be replaced with a "space" and simply concatenated into a single bullet and without any line breaks
            formElem.appendChild(document.createElement('br'));
            formElem.appendChild(document.createElement('br'));
            var labelElem3 = document.createElement('label');
                labelElem3.innerHTML = 'How to handle Line Breaks within each Highlight';
                labelElem3.htmlFor = "rmHLsel";
                formElem.appendChild(labelElem3);
            formElem.appendChild(document.createElement('br'));
            var selElem = document.createElement('select');
                selElem.options.add( new Option("[DEFAULT] New bullets same level","0", true, true) );
                selElem.options.add( new Option("Nest under first Line Break","1") );
                selElem.options.add( new Option("Ctrl + Shift + V same bullet","2") );
                selElem.options.add( new Option("Replace with single space","3") );
                selElem.options.add( new Option("Remove line breaks","4") );
                selElem.style.cssText = 'padding:3px';
                selElem.id = 'rmHLsel';
                selElem.name = 'rmHLsel';
                formElem.appendChild(selElem);

            formElem.appendChild(document.createElement('br'));
            formElem.appendChild(document.createElement('br'));
            var labelElem4 = document.createElement('label');
                labelElem4.innerHTML = 'Show the Clipboard in:';
                labelElem4.style.cssText = 'margin-right:20px';
                //labelElem4.htmlFor = "rmHLcbType1";
                formElem.appendChild(labelElem4);

            //formElem.appendChild(document.createElement('br'));
            //formElem.appendChild(document.createElement('br'));
            var cbElem1 = document.createElement('input');
                cbElem1.setAttribute("type", "checkbox");
                cbElem1.style.cssText = 'vertical-align:middle';
                cbElem1.id = 'rmHLcbType1';
                cbElem1.name = 'rmHLcbType1';
                cbElem1.checked = true;
                formElem.appendChild(cbElem1);
            var labelElem5 = document.createElement('label');
                labelElem5.innerHTML = 'Plain Text';
                labelElem5.htmlFor = "rmHLcbType1";
                labelElem5.style.cssText = 'margin-left:5px';
                formElem.appendChild(labelElem5);

            var cbElem2 = document.createElement('input');
                cbElem2.setAttribute("type", "checkbox");
                cbElem2.style.cssText = 'vertical-align:middle;margin-left:20px';
                cbElem2.id = 'rmHLcbType2';
                cbElem2.name = 'rmHLcbType2';
                cbElem2.checked = false;
                formElem.appendChild(cbElem2);
            var labelElem6 = document.createElement('label');
                labelElem6.innerHTML = 'HTML';
                labelElem6.htmlFor = "rmHLcbType2";
                labelElem6.style.cssText = 'margin-left:5px';
                formElem.appendChild(labelElem6);

            formElem.appendChild(document.createElement('br'));
            formElem.appendChild(document.createElement('br'));
            var butSave = document.createElement('button');
                butSave.style.cssText = 'background-color:black;color:white;border-color:white';
                butSave.innerHTML = 'Save';
                butSave.id = 'rmHLsave';
                butSave.id = 'rmHLsave';
                formElem.appendChild(butSave);

                butSave.addEventListener("click", function(){
                    var tbElem = document.getElementById("rmHLtb");
                    var textElem2 = document.getElementById("rmHLta2");
                    var selElem = document.getElementById("rmHLsel");
                    var butSave = document.getElementById("rmHLsave");

                    pageRef = tbElem.value;
                    pageTitle = textElem2.value;
                    sameBlock = Number(selElem.value);
                    //console.log(pageRef);
                    //console.log(pageTitle);
                    //console.log(sameBlock);

                    //Force the "cut" event because the clipboardData event setData doesn't work unless activated from a cut/copy event.
                    //We already have the "cut" event listener set to run our code, so this should activate it
                    clickEvent = 1;
                    document.execCommand('cut');
                });

                formElem.appendChild(document.createElement('br'));
                formElem.appendChild(document.createElement('br'));
                var spanElem1 = document.createElement('span');
                    spanElem1.innerHTML = 'Important Links and Resources';
                    spanElem1.style.cssText = 'font-weight:bold;color:red';
                    formElem.appendChild(spanElem1);

                formElem.appendChild(document.createElement('br'));
                formElem.appendChild(document.createElement('br'));
                var link1 = document.createElement('a');
                    link1.innerText = 'Detailed Instructions and Shortcuts';
                    link1.href = 'https://github.com/GitMurf/roam-highlighter#how-to-use-the-highlighter';
                    //link1.style.cssText = 'font-weight:bold;';
                    formElem.appendChild(link1);

                formElem.appendChild(document.createElement('br'));
                var link2 = document.createElement('a');
                    link2.innerText = 'Demos and Videos';
                    link2.href = 'https://github.com/GitMurf/roam-highlighter#note-other-than-demo-5-the-following-were-before-i-implemented-the-side-window-but-still-demonstrate-the-purpose-of-the-roam-highlighter-tool';
                    //link2.style.cssText = 'font-weight:bold;';
                    formElem.appendChild(link2);

                formElem.appendChild(document.createElement('br'));
                var link3 = document.createElement('a');
                    link3.innerText = 'Report a Bug/Issue';
                    link3.href = 'https://github.com/GitMurf/roam-highlighter/issues/new';
                    //link3.style.cssText = 'font-weight:bold;';
                    formElem.appendChild(link3);

                formElem.appendChild(document.createElement('br'));
                var link4 = document.createElement('a');
                    link4.innerText = 'Submit an Idea or Feature Request';
                    link4.href = 'https://github.com/GitMurf/roam-highlighter/issues/new';
                    //link4.style.cssText = 'font-weight:bold;';
                    formElem.appendChild(link4);

                formElem.appendChild(document.createElement('br'));
                var link5 = document.createElement('a');
                    link5.innerText = 'Ask a Question';
                    link5.href = 'https://github.com/GitMurf/roam-highlighter/issues/new';
                    //link5.style.cssText = 'font-weight:bold;';
                    formElem.appendChild(link5);

    var butSett = document.createElement('button');
        butSett.style.cssText = 'float:right;background-color:black;color:white;border-color:white;width:25%';
        butSett.innerHTML = 'Settings';
        butSett.id = 'rmHLsettings';
        divButtonsElem.appendChild(butSett);

        butSett.addEventListener("click", function(){
            var divElemMain = document.getElementById("rmHLmain");
            var divSetElem = document.getElementById("rmHLdivSett");
            var divTextElem = document.getElementById("rmHLdivText");
            var tbElem = document.getElementById("rmHLtb");
            var textElem2 = document.getElementById("rmHLta2");
            var selElem = document.getElementById("rmHLsel");
            var butSett = document.getElementById("rmHLsettings");
            var butMax = document.getElementById("rmHLexpand");
            var butWrap = document.getElementById("rmHLwrap");

            if(divSetElem.style.display == "none")
            {
                divElemMain.style.opacity = "1";
                divTextElem.style.width = "50%";
                divSetElem.style.display = "block";
                tbElem.value = pageRef;
                textElem2.value = pageTitle;
                selElem.value = sameBlock;
                if(butMax.innerHTML == "Expand"){butMax.click();}
            }
            else
            {
                divElemMain.style.opacity = "0.8";
                divTextElem.style.width = "100%";
                divSetElem.style.display = "none";
                //butMax.click();
            }
        });

    var butWrap = document.createElement('button');
        butWrap.style.cssText = 'float:right;background-color:black;color:white;border-color:white;width:25%';
        butWrap.innerHTML = 'Wrap';
        butWrap.id = 'rmHLwrap';
        divButtonsElem.appendChild(butWrap);

        butWrap.addEventListener("click", function(){
            var textInput = document.getElementById("rmHLtextArea");
            var butWrap = document.getElementById("rmHLwrap");

            if(butWrap.innerHTML == "Wrap")
            {
                //textInput.style.whiteSpace = "normal";
                //Changed for firefox compatibility
                textInput.style.whiteSpace = "pre-wrap";
                butWrap.innerHTML = 'Un-Wrap';
            }
            else
            {
                textInput.style.whiteSpace = "pre";
                butWrap.innerHTML = 'Wrap';
            }
        });

    var butHide = document.createElement('button');
        butHide.style.cssText = 'float:right;background-color:black;color:white;border-color:white;width:25%';
        butHide.innerHTML = 'Hide';
        divButtonsElem.appendChild(butHide);

        butHide.addEventListener("click", function(){
            var divElemMain = document.getElementById("rmHLmain");
            divElemMain.style.display = "none";
            //divElemMain.style.display = "block";
        });

    var butMax = document.createElement('button');
        butMax.style.cssText = 'float:right;background-color:black;color:white;border-color:white;width:25%';
        butMax.innerHTML = 'Expand';
        butMax.id = 'rmHLexpand';
        divButtonsElem.appendChild(butMax);

        butMax.addEventListener("click", function(){
            var divElemMain = document.getElementById("rmHLmain");
            var divTextElem = document.getElementById("rmHLdivText");
            var butMax = document.getElementById("rmHLexpand");
            var divSetElem = document.getElementById("rmHLdivSett");

            if(butMax.innerHTML == "Expand")
            {
                divElemMain.style.width = "80%";
                butMax.innerHTML = 'Shrink';
            }
            else
            {
                if(divSetElem.style.display == "block")
                {
                    divElemMain.style.opacity = "0.8";
                    divTextElem.style.width = "100%";
                    divSetElem.style.display = "none";
                }

                divElemMain.style.width = "30%";
                butMax.innerHTML = 'Expand';
            }
        });

    var textInput = document.createElement("textarea");
        textInput.name = "textAreaInput";
        textInput.style.cssText = 'width:100%;height:100%;background-color:white;color:black;font-weight:bold;white-space:pre;float:right;padding-left:5px;padding-right:1px';
        textInput.id = 'rmHLtextArea';
        textInput.value = `
Roam-highlighter Shortcut Keys

*NOTE: For MACs, use "Command" instead of "Ctrl"

[Ctrl + S]

\t- Show/Hide Side Window (OR Click Extension button again)

[Ctrl + X]

\t- Highlights selected text
\t- If no highlights, grabs just the [Page Title](URL)
\t- To remove part of a highlight, select text and press [Ctrl + X]

[Alt + Click]

\t- Removes an entire highlight

[Ctrl + Q]

\t- Remove all highlights on the page

[Double-Click] a Single Word (has to be highlighted already)

\t- Adds [[Double Brackets]] for Roam "Page Linking"

[Hold Alt while Selecting Text] (must already be highlighted)

\t- Adds [[Double Brackets]] around selection for Roam "Page Linking"
`;
        divTextElem.appendChild(textInput);
    document.body.appendChild(divElem);

    function writeToConsole(textString, logLevel = 1, tabLevel = 1, alwaysShow = "no")
    {
        if(alwaysShow == "yes" || (debugMode == -1 && logLevel == -1) || (debugMode == 1 && logLevel == 1) || (debugMode == 2 && logLevel <= 2) || debugMode == 3)
        {
            var finalTextString = textString;
            if(tabLevel != 0){finalTextString = consoleTabLevel + textString;}
            console.log(finalTextString);
        }
    }

    //Remove a highlight based on given element variable
    function removeHighlight(curElement)
    {
        var prevText = "", nextText = "";

        //Check the previous and next siblings (i.e., the element before and after our highlight SPAN)
        if(curElement.previousSibling !== null){prevText = curElement.previousSibling.textContent;}
        if(curElement.nextSibling !== null){nextText = curElement.nextSibling.textContent;}
        if(prevText.length > 0){
            //If there is a previous sibling, then will append the highlighted text to that element to try and get HTML back to way it was before highlighter
            if(nextText.length > 0)
            {
                //If there is ALSO a next sibling then that means the highlight was in the middle of a paragraph etc.
                //We will then want to merge the highlighted text, and the prevoius and next siblings all into one element to get back to way it was before highlighter
                var newText = prevText + curElement.innerText + nextText;
                //console.log('new text: ', newText);
                curElement.previousSibling.textContent = newText;
                curElement.nextSibling.remove();
            }else {
                var newText = prevText + curElement.innerText;
                //console.log('new text: ', newText);
                curElement.previousSibling.textContent = newText;
            }
        }else {
            var newText = curElement.innerText + nextText;
            //console.log('new text: ', newText);
            curElement.nextSibling.textContent = newText;
        }

        // remove the empty element that had the highlights before
        curElement.remove();
    }

    //This function adds Roam markdown formatting based on Element type (e.g., <STRONG> --> **text**)
    function convertFormat(eachHighlight, elemSpan) {
        var parNodeName = elemSpan.parentElement.nodeName;
        var parElemText = elemSpan.parentElement.innerText;

        if(parNodeName == "STRONG" || parNodeName == "B"){eachHighlight = '**' + eachHighlight + '**';}
        if(parNodeName == "EM" || parNodeName == "U"){eachHighlight = '__' + eachHighlight + '__';}
        if(parNodeName == "CODE"){eachHighlight = "`" + eachHighlight + "`";}
        if(eachHighlight == parElemText)
        {
            if(parNodeName == "H1"){eachHighlight = '<h1>' + eachHighlight + '</h1>';}
            if(parNodeName == "H2"){eachHighlight = '<h2>' + eachHighlight + '</h2>';}
            if(parNodeName == "H3"){eachHighlight = '<h3>' + eachHighlight + '</h3>';}
        }

        return eachHighlight;
    }

    //This function looks at current and previous "node" aka highlight aka span element to decide whether it should actually be on the same line or not
    function isSameLine(curNode, prevNode, lastParNodeName) {
        var parNodeName = curNode.parentElement.nodeName;
        var prevSibNode = curNode.previousElementSibling;
            if(prevSibNode == null){var prevSibNodeName = ""}else{var prevSibNodeName = prevSibNode.nodeName;}
        //var lastParNodeName = prevNode.parentElement.nodeName;
        var curHighlight = curNode.textContent;

        writeToConsole('curHighlight: ' + curHighlight);
        writeToConsole('parNodeName: ' + parNodeName);
        writeToConsole(prevNode,1,0);
        writeToConsole('prevSibNodeName: ' + prevSibNodeName);
        writeToConsole('prevNode.innerText: ' + prevNode.innerText);
        writeToConsole('lastParNodeName: ' + lastParNodeName);

        if(
            (
                (
                    (parNodeName == "A" || parNodeName == "CODE" || parNodeName == "EM" || parNodeName == "U" || parNodeName == "G-EMOJI" || parNodeName == "STRONG" || parNodeName == "B")
                    || (prevSibNodeName == "A" || prevSibNodeName == "CODE" || prevSibNodeName == "EM" || prevSibNodeName == "U" || prevSibNodeName == "G-EMOJI" || prevSibNodeName == "STRONG" || prevSibNodeName == "B")
                )
                && (
                    prevNode.innerText.substring(prevNode.innerText.length - 1) == " " || prevNode.innerText.substring(prevNode.innerText.length - 1) == "(" || prevNode.innerText.substring(prevNode.innerText.length - 1) == '"' || prevNode.innerText.substring(prevNode.innerText.length - 1) == '“' || prevNode.innerText.substring(prevNode.innerText.length - 1) == '”'
                )
            )
            || (
                (
                    (lastParNodeName == "A" || lastParNodeName == "CODE" || lastParNodeName == "EM" || lastParNodeName == "U" || lastParNodeName == "G-EMOJI" || lastParNodeName == "STRONG" || lastParNodeName == "B" || lastParNodeName == "SUP")
                    || (parNodeName == "A" || parNodeName == "CODE" || parNodeName == "EM" || parNodeName == "U" || parNodeName == "G-EMOJI" || parNodeName == "STRONG" || parNodeName == "B")
                )
                && (
                    curHighlight.substring(0,1) == " " || curHighlight.substring(0,1) == ")" || curHighlight.substring(0,1) == "." || curHighlight.substring(0,1) == "?" || curHighlight.substring(0,1) == "!" || curHighlight.substring(0,1) == "," || curHighlight.substring(0,1) == ":" || curHighlight.substring(0,1) == ";" || curHighlight.substring(0,1) == '”' || curHighlight.substring(0,1) == '“'
                )
            )
            || parNodeName == "SUP"
        )
        {
            return true;
        }
        else{return false;}
    }

    //This function loops through the elements with the highlighter "class" set by the script and adds to clipboard in Roam format
    function updateClipboard(event) {
        //Get page title and URL and put in Roam format [Page Title](URL)
        var reference = `[${pageTitle}](${location.href}) ${pageRef}`;
        reference = reference.trim();
        writeToConsole('reference: ' + reference);

        var plainConcatHighlights = "";
        var htmlConcatHighlights = "";
        var eachHighlight = "";
        var origHighlight = "";

        //Get all the highlighted elements based off class name roamJsHighlighter
        //var elemHighlights = document.getElementsByClassName("roamJsHighlighter");
        var elemHighlights = document.querySelectorAll(".roamJsHighlighter");
        writeToConsole(elemHighlights,3,0);
        for (var i = 0; i < elemHighlights.length; i++)
        {
            var tempString = "";
            var htmlString = "";
            var plainText = "";
            //title = 'HL:' + highlightCtr;
            var elemTitle = elemHighlights.item(i).title.split(":")[1];
            writeToConsole('elemTitle: ' + elemTitle,3);
            //var elemTabs = elemHighlights.item(i).getAttribute('hltabs');
            var elemSpan = elemHighlights.item(i);
            writeToConsole(elemSpan,3,0);
            eachHighlight = elemSpan.textContent;
            origHighlight = eachHighlight;
            writeToConsole('eachHighlight: ' + eachHighlight,3);
            var parNodeName = elemSpan.parentElement.nodeName;
            writeToConsole(elemSpan.parentElement,1,0);
            writeToConsole('parNodeName: ' + parNodeName,3);
            if(parNodeName == "A")
            {
                var eachLink = elemSpan.parentElement;
                var foundALink = `[${eachLink.innerText}](${eachLink.href})`;
                writeToConsole(`Here: [${eachLink.innerText}](${eachLink.href})`);
                eachHighlight = eachHighlight.replace(eachLink.innerText, foundALink);
            }

            eachHighlight = convertFormat(eachHighlight, elemSpan);

            //Check if the next element is the same "title" which means is the same user selected highlight and should be combined into one bullet/node unless there is legitimate line break
            var lastMainSpanText = origHighlight;
            if(i + 1 < elemHighlights.length)
            {
                var prevNode = elemSpan;
                var lastParNodeName = parNodeName;
                while(elemTitle == elemHighlights.item(i+1).title.split(":")[1])
                {
                    var elemSpan = elemHighlights.item(i+1);
                    writeToConsole('elemSpan.title: ' + elemSpan.title);
                    writeToConsole('prevNode.title: ' + prevNode.title);
                    var newHighlight = elemSpan.textContent;
                    var classFound = elemSpan.className;
                    parNodeName = elemSpan.parentElement.nodeName;

                    writeToConsole('newHighlight: ' + newHighlight,3);
                    writeToConsole('while loop elemSpan.parentElement.nodeName: ' + parNodeName,3)
                    writeToConsole(elemSpan.parentElement,1,0);
                    var bIsSameLine = true;

                    if(classFound == 'roamJsHighlighter pageLink')
                    {
                        bIsSameLine = isSameLine(elemSpan, prevNode, lastParNodeName);
                        lastParNodeName = parNodeName;
                        prevNode = elemSpan;
                        writeToConsole('newHighlight: ' + newHighlight);
                        writeToConsole('lastMainSpanText: ' + lastMainSpanText);
                        //first try to get rid of ** or __ or ` for bold or italics or code since can't format a page link
                        var replaceLastText = lastMainSpanText.replace('**' + newHighlight + '**', newHighlight);
                        replaceLastText = replaceLastText.replace('__' + newHighlight + '__', newHighlight);
                        replaceLastText = replaceLastText.replace('`' + newHighlight + '`', newHighlight);
                        replaceLastText = replaceLastText.replace(newHighlight,`|[|[${newHighlight}|]|]`);
                        writeToConsole('replaceLastText: ' + replaceLastText);
                        writeToConsole('lastMainSpanText: ' + lastMainSpanText);
                        writeToConsole('eachHighlight: ' + eachHighlight);
                        eachHighlight = eachHighlight.replace(lastMainSpanText,replaceLastText);
                        writeToConsole('eachHighlight: ' + eachHighlight);
                        lastMainSpanText = replaceLastText;
                    }
                    else
                    {
                        bIsSameLine = isSameLine(elemSpan, prevNode, lastParNodeName);
                        lastParNodeName = parNodeName;
                        prevNode = elemSpan;
                        newHighlight = convertFormat(newHighlight, elemSpan);

                        if(parNodeName == "A")
                        {
                            var eachLink = elemSpan.parentElement;
                            var foundALink = `[${eachLink.innerText}](${eachLink.href})`;
                            writeToConsole(`HERE2: [${eachLink.innerText}](${eachLink.href})`);
                            newHighlight = newHighlight.replace(eachLink.innerText, foundALink);
                        }

                        if(bIsSameLine){eachHighlight += newHighlight;}else{eachHighlight += '\n' + newHighlight;}
                        lastMainSpanText = newHighlight;
                    }
                    writeToConsole('newHighlight: ' + newHighlight);
                    writeToConsole('eachHighlight: ' + eachHighlight);
                    i++;
                    if(i + 1 >= elemHighlights.length){break;}
                }
            }
            writeToConsole("LINE BREAK OPTION SET TO: " + sameBlock);
            if(sameBlock == 3)
            {
                //Instead of looping through line breaks below, replace line breaks with a SPACE to bring into same block.
                if(eachHighlight.trim().length > 0)
                {
                    tempString = eachHighlight.trim().replace(/(\r\n|\n|\r)/gm," ");
                    tempString = tempString.replace(/\s+/g," ");
                    plainText = `\t- ${tempString.trim()}\n`;
                    htmlString = `<li>${tempString.trim()}</li>`;
                }
            }
            else
            {
                //Loop through each line break within each highlight
                //Even if no line breaks it will still go through loop and have lineBreaks[0] as the only value it loops through
                var lineBreaks = eachHighlight.trim().split(/[\r\n]+/);
                var lineCtr = 0;
                for(var x=0, eachLine; eachLine = lineBreaks[x]; x++)
                {
                    //console.log('Line ',x,': "',eachLine,'"');

                    //Replace all double white spaces with single spaces
                    //NOTE: Do not use this AFTER the loop of each line break as it removes the line breaks needed for each Bullet
                    eachLine = eachLine.replace(/\s+/g," ");
                    //If string is NOT empty, add to variable with a TAB and "-" for bullet
                    if(eachLine.trim().length > 0)
                    {
                        switch (sameBlock)
                        {
                            case 0:
                                plainText += `\t- ${eachLine.trim()}\n`;
                                htmlString += `<li>${eachLine.trim()}</li>`;
                                break;
                            case 1:
                                if(x > 0)
                                {
                                    //Nested under the first bullet/linebreak from the highlight
                                    plainText += `\t\t- ${eachLine.trim()}\n`;
                                    htmlString += `<li>${eachLine.trim()}</li>`;
                                }
                                else
                                {
                                    //First line which will go in parent bullet that the rest of the highlight will go under
                                    plainText += `\t- ${eachLine.trim()}\n`;
                                    if(lineBreaks.length > 1){htmlString += `<li>${eachLine.trim()}<ul>`;}else{htmlString += `<li>${eachLine.trim()}</li>`;}
                                }
                                break;
                            case 2:
                                //Plain text can't handle the Ctrl + Enter "soft line breaks" so just do same as case 1 above nested bullets
                                if(x > 0)
                                {
                                    //Second line and on which is nested in the same bullet replicating ctrl + Enter
                                    plainText += `\t\t- ${eachLine.trim()}\n`;
                                    htmlString += `\n${eachLine.trim()}`;
                                }
                                else
                                {
                                    //First line
                                    plainText += `\t- ${eachLine.trim()}\n`;
                                    if(lineBreaks.length > 1){htmlString += `<li>${eachLine.trim()}`;}else{htmlString += `<li>${eachLine.trim()}</li>`;}
                                }
                                break;
                            default:
                                plainText += `\t- ${eachLine.trim()}\n`;
                                htmlString += `\t- ${eachLine.trim()}\n`;
                        }
                        lineCtr++
                    }
                }

                switch (sameBlock)
                {
                    case 0:
                        break;
                    case 1:
                        if(lineCtr > 1){htmlString += `</ul></li>`;}
                        break;
                    case 2:
                        if(lineCtr > 1){htmlString += `</li>`;}
                        break;
                    default:
                }
            }

            //For some special Roam stuff add single ticks ` around it like :: attributes so it doesn't try to create pages/attributes in Roam when pasted
            //OLD WAY (only first occurence replaced): tempString = tempString.replace("::","`::`").replace("[[","`[[`").replace("]]","`]]`").replace("#","`#`");
            //Using Split/Join allows to replace multiple instances of the characters you are looking to replace

            plainText = plainText.split("::").join("`::`").split("[[").join("`[[`").split("]]").join("`]]`").split("#").join("`#`").split("|[|[").join("[[").split("|]|]").join("]]");
            htmlString = htmlString.split("::").join("`::`").split("[[").join("`[[`").split("]]").join("`]]`").split("#").join("`#`").split("|[|[").join("[[").split("|]|]").join("]]");

            if(plainText.trim().length > 0){plainConcatHighlights += `${plainText}`;}
            if(htmlString.trim().length > 0){htmlConcatHighlights += `${htmlString}`;}
        }

        //Check if no highlights and just want the page name in Roam link format [Page Title](URL)
        if(plainConcatHighlights == "" || htmlConcatHighlights == "")
        {
            plainConcatHighlights = reference;
            htmlConcatHighlights = reference;
        }
        else {
            plainConcatHighlights = '- ' + reference + '\n' + plainConcatHighlights;
            htmlConcatHighlights = '<ul><li>' + reference + '<ul>' + htmlConcatHighlights + '</ul></li></ul>';
        }

        var clipboardDataEvt = event.clipboardData;
        clipboardDataEvt.setData('text/plain', plainConcatHighlights);
        clipboardDataEvt.setData('text/html', htmlConcatHighlights);
        var textInput = document.getElementById("rmHLtextArea");
        writeToConsole("UPDATED THE CLIPBOARD");
        //textInput.value = 'tESTING MAKING empty';
        htmlConcatHighlights = htmlConcatHighlights.split("<ul>").join('\n<ul>').split("<li>").join('\n\t<li>').split("</ul>").join('\n</ul>').split("</li>").join('\n<li>');

        textInput.value = "";
        if(cbElem1.checked)
        {
            textInput.value += '\n'
            textInput.value += plainConcatHighlights;
        }
        if(cbElem2.checked)
        {
            textInput.value += '\n'
            textInput.value += htmlConcatHighlights;
        }

        textInput.value += '\n'
        return;
    }

    //Add listener to "cut" event (CTRL + X on Windows) for highlighting trigger
    document.addEventListener('cut', function (e)
    {
        writeToConsole("start CUT");
        if(clickEvent == 0)
        {
            writeToConsole("INSIDE CLICKEVENT = 0");
            //Variables for parsing selected elements for highlight
            var foundStartOfSelection = 0;
            var foundEnd = 0;
            //Check to see if at least one selection by the user was found to be highlighted (will use to increment the highlightCtr variable later)
            var foundSelection = 0;
            //Get current selected text which will be used to highlight and then later when ready to export to Roam
            var selection = window.getSelection();
            //Create range from selected text
            var range = selection.getRangeAt(0);
            //console.log(range);
            var allWithinRangeParent = range.commonAncestorContainer;

            var startCont = range.startContainer;
            var startOff = range.startOffset;
            var endCont = range.endContainer;
            var endOff = range.endOffset;

            //Other variables
            var tempLogLevel = 1;
            var allTextFound = "";
            var thisIsFirst = 0;

            function createSpanElement(startElemNode, startElemPos, endElemNode, endElemPos, spanClass = "roamJsHighlighter", spanColor = "yellow", spanTitle = "")
            {
                //Create a range to create the new SPAN element from below
                var divTest = document.createRange();
                //Add the start and end points of the range for Highlighter
                divTest.setStart(startElemNode, startElemPos);
                divTest.setEnd(endElemNode, endElemPos);
                //Get the selection text to create from
                var subSelection = divTest;
                var selectedText = subSelection.extractContents();
                //Create new HTML element SPAN and will add the roamJsHighlighter class to loop through later
                var newSpan = document.createElement("span");

                if(foundSelection == 0)
                {
                    foundSelection = 1;
                    highlightCtr++
                }

                if(spanTitle == ""){spanTitle = 'HL:' + highlightCtr;}

                //Adding !important to CSS to account for Dark Theme extensions that override styles... otherwise can't see highlights in dark mode
                newSpan.style.setProperty("background-color", spanColor, "important");
                newSpan.style.setProperty("color", "black", "important");

                //Set class for the new SPAN element so you can loop through the highlights later to copy to clipboard
                newSpan.className = spanClass;
                newSpan.title = spanTitle;

                //Don't think I am using this yet but idea is to be able to indent in Roam under a UL
                if(startElemNode.parentNode.nodeName == 'LI')
                {
                    newSpan.setAttribute("hltabs", "1");
                }

                newSpan.appendChild(selectedText);
                subSelection.insertNode(newSpan);
                writeToConsole("NEW SPAN CREATED: " + newSpan);
                if(thisIsFirst == 1)
                {
                    thisIsFirst = 0;
                }

                return newSpan;
            }

            function findLowestNode(elemInput, hierarchyLevel)
            {
                //Since creating new elements we have to make sure we skip any highlighted because otherwise an infinite loop
                if(elemInput.className == "roamJsHighlighter"){return;}
                var thisHierarchyLevel = hierarchyLevel + ':' + elemInput.nodeName;
                writeToConsole("FIND LOWEST NODE: " + thisHierarchyLevel,3);
                var inputNodeName = elemInput.nodeName;
                writeToConsole("elemInput.childNodes.length: " + elemInput.childNodes.length,3);
                writeToConsole(elemInput.childNodes, 3, 0);
                if(elemInput.childNodes.length > 0)
                {
                    for(var k=0, newElemInput; newElemInput = elemInput.childNodes[k]; k++)
                    {
                        if(selection.containsNode(newElemInput, true))
                        {
                            writeToConsole(`hierarchyLevel: ${thisHierarchyLevel} | k: ${k} | elementText: ${newElemInput.nodeName}`, 3);
                            //thisHierarchyLevel += ':' + newElemInput.nodeName;
                            findLowestNode(newElemInput, thisHierarchyLevel);
                        }
                        else
                        {
                            writeToConsole(`NOT SELECTED: hierarchyLevel: ${thisHierarchyLevel} | k: ${k} | elementText: ${newElemInput.nodeName}`, 3);
                        }
                    }
                }
                else
                {
                    writeToConsole("FIND LOWEST NODE: NO CHILDREN",3);
                    //if(inputNodeName == '#text'){inputNodeText = elemInput.textContent;}else{inputNodeText = elemInput.innerHTML;}
                    if(inputNodeName == '#text'){inputNodeText = elemInput.textContent;}else{inputNodeText = elemInput.innerHTML;}
                    if (typeof inputNodeText == "undefined"){inputNodeText = '';}
                    thisHierarchyLevel += ':' + inputNodeText.trim();
                    if(inputNodeText.trim() != '')
                    {
                        var startPos = 0;
                        var endPos = inputNodeText.length;
                        var resultText = inputNodeText;
                        writeToConsole(`RETURNED hierarchyLevel: ${thisHierarchyLevel}`);
                        if(foundStartOfSelection == 0)
                        {
                            if(startCont.textContent.trim() == inputNodeText.trim())
                            {
                                resultText = startCont.textContent.substring(startOff);
                                allTextFound += resultText;
                                foundStartOfSelection = 1;
                                thisIsFirst = 1;
                                startPos = startOff;
                            }
                        }
                        else
                        {
                            if(endCont.textContent.trim() == inputNodeText.trim())
                            {
                                writeToConsole(`******* FOUND THE END ********`,3);
                                resultText = endCont.textContent.substring(0, endOff);
                                foundEnd = 1;
                                endPos = endOff;
                            }
                            allTextFound += '\n' + resultText;
                        }

                        if(foundStartOfSelection == 1){createSpanElement(elemInput, startPos, elemInput, endPos);}
                    }
                    writeToConsole(`ENDING hierarchyLevel: ${thisHierarchyLevel} | inputNodeName: ${inputNodeName} | inputNodeText: ${inputNodeText}`,3);
                }

                return;
            }

            switch (debugMode)
            {
                case 1:
                    writeToConsole("Show Level 1 Debugging",1);
                    break;
                case 2:
                    writeToConsole("Show Level 1 Debugging",1);
                    writeToConsole("Show Level 2 Debugging",2);
                    break;
                case 3:
                    writeToConsole("Show Level 1 Debugging",1);
                    writeToConsole("Show Level 2 Debugging",2);
                    writeToConsole("Show All Debugging Levels",3);
                    break;
                default:
                    //Don't show any debugging
                    break;
            }

            writeToConsole('range:');
            writeToConsole(range,1,0);
            writeToConsole('startCont: ' + startCont);
            writeToConsole('startOffset: ' + startOff);
            writeToConsole('endCont: ' + endCont);
            writeToConsole('endOffset: ' + endOff);
            writeToConsole('allWithinRangeParent:');
            writeToConsole(allWithinRangeParent,1,0);
            writeToConsole('allWithinRangeParent.childNodes:');
            writeToConsole(allWithinRangeParent.childNodes,1,0);

            var bRemoveHighlights = false;
            //If only one html element selected
            if(allWithinRangeParent.childNodes.length == 0)
            {
                if(allWithinRangeParent.parentElement.className == "roamJsHighlighter" || allWithinRangeParent.parentElement.className == "roamJsHighlighter pageLink")
                {
                    //call function to remove element highlight
                    removeHighlight(allWithinRangeParent.parentElement);
                    bRemoveHighlights = true;
                }
                else
                {
                    if(startCont === endCont && endOff > startOff)
                    {
                        createSpanElement(startCont, startOff, endCont, endOff);
                        //Clear the original user mouse selection
                        document.getSelection().removeAllRanges();
                    }
                }
            }

            //If selected text is part of a previous highlight then the user is trying to remove that highlight
            if(bRemoveHighlights == false)
            {
                //Quickly loop through each selected element to see if any are already highlighted
                for(var i=0, elem; elem = allWithinRangeParent.childNodes[i]; i++)
                {
                    writeToConsole(elem,1,0);
                    writeToConsole('elem.className: ' + elem.className,1);
                    if(selection.containsNode(elem, true))
                    {
                        if (typeof elem.querySelectorAll !== "undefined")
                        {
                            var elemsInSameHighlight = elem.querySelectorAll(".roamJsHighlighter, .roamJsHighlighter pageLink");
                            for(var m = 0; m < elemsInSameHighlight.length; m++)
                            {
                                var newCurElement = elemsInSameHighlight.item(m);
                                writeToConsole(newCurElement,1,0);
                                writeToConsole('newCurElement.className: ' + newCurElement.className,1);
                                if(selection.containsNode(newCurElement, true))
                                {
                                    if(newCurElement.className == "roamJsHighlighter" || newCurElement.className == "roamJsHighlighter pageLink")
                                    {
                                        //Remove highlights
                                        removeHighlight(newCurElement);
                                        bRemoveHighlights = true;
                                    }
                                }else{writeToConsole('NOT SELECTED newCurElement.className: ' + newCurElement,1);}
                            }
                        }
                    }else{writeToConsole('NOT SELECTED elem.className: ' + elem,1);}
                }
            }

            if(bRemoveHighlights)
            {
                //Removed highlights instead of adding new ones
                document.getSelection().removeAllRanges();
            }
            else
            {
                //loop through all of the elements contained in the parent container of the highest common level of selected text
                writeToConsole("Starting loop through all elements contained in the parent container of the highest common level of selected text");
                for (var i=0, elem; elem = allWithinRangeParent.childNodes[i]; i++)
                {
                    consoleTabLevel = '';
                    var elementNodeName = elem.nodeName;
                    writeToConsole(`i: ${i} | Elem: ${elem} | Elem.nodeName: ${elementNodeName}`,2);
                    var elementText = "";
                    if(elementNodeName == '#text'){elementText = elem.textContent;}else{elementText = elem.innerText;}

                    //Set to loglevel 2 if H1, H2, H3, H4 Header elements... otherwise loglevel 3
                    if(elementNodeName == 'H1' || elementNodeName == 'H2' || elementNodeName == 'H3' || elementNodeName == 'H4'){tempLogLevel = 2;}else{tempLogLevel = 3;}
                    writeToConsole(`i: ${i} | elementText: ${elementText}`, tempLogLevel);
                    writeToConsole(`i: ${i} | elementInnerHtml: ${elem.innerHTML}`, 3);

                    //Check to see if the Element is part of the selected text, otherwise skip
                    if(selection.containsNode(elem, true))
                    {
                        consoleTabLevel = '\t';
                        writeToConsole("This element was at least partially found in the Selected Text by the user");
                        writeToConsole(`i: ${i} | Elem: ${elem} | Elem.nodeName: ${elementNodeName}`);
                        writeToConsole(`i: ${i} | elementText: ${elementText}`)

                        //Recursively drill down to the #text value
                        var newCtr = 1;
                        consoleTabLevel = '\t\t';

                        //var findHierarchy = findLowestNode(elem, 'root:' + elementNodeName);
                        findLowestNode(elem, 'root');
                        writeToConsole("foundStart: " + foundStartOfSelection + " foundEnd: " + foundEnd, 3);
                        //If haven't found the beginning of the selection yet then can skip to next item/element in the loop
                        if(foundStartOfSelection == 0){continue;}

                        if(foundEnd == 1)
                        {
                            //Clear the original user mouse selection
                            document.getSelection().removeAllRanges();
                            break;
                        }
                        consoleTabLevel = '\t';
                    }
                    consoleTabLevel = '';
                }

                writeToConsole(`allTextFound: ${allTextFound}`);
                writeToConsole(`Ended i Loop at: ${i}`);
            }
        }

        writeToConsole("BEFORE RUNNING UPDATECLIPBOARD");
        //Run the function to loop through the highlighted elements and copy to the clipboard ready to paste to Roam
        clickEvent = 0;
        updateClipboard(e);
        e.preventDefault();
    }
    );

    //Add listener to "paste" event (CTRL + V on Windows) to bring up option to change way line breaks are handled
    document.addEventListener('keydown', function (evt) {
        var bMatchedKey = false;
        //Need to keep combined each separately or the evt.preventDefault(); will not work properly
        if(evt.ctrlKey || evt.metaKey)
        {
            //Get rid of all highlights on the page
            if(evt.key === 'q')
            {
                removeAllHlOpt = Number(prompt("Do you want to remove all Highlights from this page?\n0 = No\n1 = Yes", 1));
                if(removeAllHlOpt != 0 && removeAllHlOpt != 1){removeAllHl = Number(0);}else{removeAllHl = Number(removeAllHlOpt);}
                if(removeAllHlOpt == 0){return;}
                var prevText = "", nextText = "";
                var elemHighlights = document.querySelectorAll(".roamJsHighlighter");
                for (var i = 0; i < elemHighlights.length; i++)
                {
                    var curElement = elemHighlights.item(i);

                    //Check the previous and next siblings (i.e., the element before and after our highlight SPAN)
                    if(curElement.previousSibling !== null){prevText = curElement.previousSibling.textContent;}
                    if(curElement.nextSibling !== null){nextText = curElement.nextSibling.textContent;}
                    if(prevText.length > 0){
                        //If there is a previous sibling, then will append the highlighted text to that element to try and get HTML back to way it was before highlighter
                        if(nextText.length > 0)
                        {
                            //If there is ALSO a next sibling then that means the highlight was in the middle of a paragraph etc.
                            //We will then want to merge the highlighted text, and the prevoius and next siblings all into one element to get back to way it was before highlighter
                            var newText = prevText + curElement.innerText + nextText;
                            //console.log('new text: ', newText);
                            curElement.previousSibling.textContent = newText;
                            curElement.nextSibling.remove();
                        }else {
                            var newText = prevText + curElement.innerText;
                            //console.log('new text: ', newText);
                            curElement.previousSibling.textContent = newText;
                        }
                    }else {
                        var newText = curElement.innerText + nextText;
                        //console.log('new text: ', newText);
                        curElement.nextSibling.textContent = newText;
                    }

                    // remove the empty element that had the highlights before
                    curElement.remove();
                }
                evt.preventDefault();
            }

            if(evt.key === 's')
            {
                var divElemMain = document.getElementById("rmHLmain");
                if(divElemMain.style.display == "block"){divElemMain.style.display = "none";}else{divElemMain.style.display = "block";}
                evt.preventDefault();
            }
        }
    }
    );

    //Add click event to allow for "erasing" of previous highlights you don't want anymore. Simply click anywhere inside the highlight
    //Or if you selected text then it will try and add page linking for Roam
    //Lastly if you hold ctrl and click then it will add page link for that single word you clicked
    //Going to change the single click to require ctrl to be held down to remove highlights which will allow for double click even to fire for selecting a word
    document.addEventListener('click', function(evt) {
        var curElement = evt.target || evt.srcElement;
        //MACs can't use the ctrl key because that simulates a right click so using Alt for them
        //var specialKeyHeld = evt.shiftKey;
        //var specialKeyHeld = evt.ctrlKey;
        var specialKeyHeld = evt.altKey;
        //var specialKeyHeld = evt.metaKey; //metakey for Macs is Command key
        //console.log(curElement);
        //console.log(curElement.className);
        if(specialKeyHeld || evt.ctrlKey)
        {
            if(curElement.className === "roamJsHighlighter" || curElement.className === "roamJsHighlighter pageLink")
            {
                //console.log(curElement);
                var bSelFound = 0;
                if (typeof window.getSelection != "undefined")
                {
                    var theSelection = window.getSelection();
                    if(theSelection.toString().length > 0){bSelFound = 1;}
                }

                if(bSelFound == 1)
                {
                    //console.log('selection: ', window.getSelection);
                    var theSelection = window.getSelection();
                    if(theSelection.toString().length > 0)
                    {
                        //Create new SPAN element for the page reference highlight
                        var divTest = document.createRange();
                        //divTest = window.getSelection();
                        //console.log(theSelection);
                        divTest.setStart(theSelection.anchorNode, theSelection.anchorOffset);
                        divTest.setEnd(theSelection.focusNode, theSelection.focusOffset);
                        //console.log(divTest);
                        var subSelection = divTest;
                        var selectedText = subSelection.extractContents();
                        //Create new HTML element SPAN
                        var newSpanTag = document.createElement("span");
                        //Adding !important to CSS to account for Dark Theme extensions that override styles... otherwise can't see highlights in dark mode
                        newSpanTag.style.setProperty("background-color", "aqua", "important");
                        newSpanTag.style.setProperty("color", "black", "important");
                        //Set class for the new SPAN element so you can loop through the highlights later to copy to clipboard
                        newSpanTag.className = "roamJsHighlighter pageLink";
                        newSpanTag.title = curElement.title;
                        newSpanTag.appendChild(selectedText);
                        subSelection.insertNode(newSpanTag);
                    }
                }
                else
                {
                    //Remove highlights
                    var titleOfElement = curElement.title;
                    var elemsInSameHighlight = document.querySelectorAll('[title="' + titleOfElement + '"]');

                    for(var i = 0; i < elemsInSameHighlight.length; i++)
                    {
                        curElement = elemsInSameHighlight.item(i);
                        //call function to remove element
                        removeHighlight(curElement);
                    }
                }

                //Force the "cut" event because the clipboardData event setData doesn't work unless activated from a cut/copy event.
                //We already have the "cut" event listener set to run our code, so this should activate it
                clickEvent = 1;
                document.execCommand('cut');
            }
            else
            {
                //Commenting this out because when writing to console it actually prevents a quick highlight after selecting text
                //and trying to use ctrl + x "cut" to trigger a highlight if you do it too quickly because when you highlight you are clicking first
                //console.log('Not previously highlighted');
            }
        }
    });

    //Add Double Click event to allow for page linking to a single word since double click will highlight the word you are clicking already
    document.addEventListener('dblclick', function(evt) {
        var curElement = evt.target || evt.srcElement;
        //console.log(curElement);
        //console.log(curElement.className);
        writeToConsole("****** DOUBLE CLICK *******");
        writeToConsole(curElement,1,0);
        writeToConsole(curElement.className);
        if(curElement.className === "roamJsHighlighter" || curElement.className === "roamJsHighlighter pageLink")
        {
            //console.log(curElement);
            var bSelFound = 0;
            if (typeof window.getSelection != "undefined")
            {
                var theSelection = window.getSelection();
                var theSelectionString = theSelection.toString();
                writeToConsole(theSelectionString);
                writeToConsole(theSelection.anchorNode,1,0);
                writeToConsole(theSelection.anchorOffset);
                writeToConsole(theSelection.focusNode,1,0);
                writeToConsole(theSelection.focusOffset);
                if(theSelectionString.length > 0)
                {
                    var divTest = document.createRange();
                    //If there is a single bolded word on webpage it is its own element and the selection then will extend into next element with double click when adding extra space
                    if(theSelection.anchorNode != theSelection.focusNode)
                    {
                        if(theSelectionString.substring(0,1) == " ")
                        {
                            //Extra space at beginning of word which means the full word should be in the extendNode instead
                            divTest.setStart(theSelection.focusNode, 0);
                            divTest.setEnd(theSelection.focusNode, theSelection.focusOffset);
                        }
                        else
                        {
                            //Extra space at end of word which means the full word should be in the anchorNode
                            divTest.setStart(theSelection.anchorNode, theSelection.anchorOffset);
                            divTest.setEnd(theSelection.anchorNode, theSelection.anchorNode.length);
                        }
                    }
                    else
                    {
                        //Fix the selection in case it extends a character and grabs space character in front or after the word
                        if(theSelectionString.substring(0,1) == " "){var addOffset = 1;}else{var addOffset = 0;}
                        if(theSelectionString.substring(theSelectionString.length - 1) == " "){var subOffset = 1;}else{var subOffset = 0;}
                        divTest.setStart(theSelection.anchorNode, theSelection.anchorOffset + addOffset);
                        divTest.setEnd(theSelection.focusNode, theSelection.focusOffset - subOffset);
                    }
                    document.getSelection().removeAllRanges();
                    document.getSelection().addRange(divTest);
                    bSelFound = 1;
                }
            }

            if(bSelFound == 1)
            {
                theSelection = window.getSelection();
                writeToConsole(theSelection,1,0);
                if(theSelection.toString().length > 0)
                {
                    writeToConsole(theSelection.anchorNode,1,0);
                    writeToConsole(theSelection.anchorOffset);
                    writeToConsole(theSelection.focusNode,1,0);
                    writeToConsole(theSelection.focusOffset);
                    writeToConsole(curElement.title);
                    //Create new SPAN element for the page reference highlight
                    var divTest = document.createRange();
                    //divTest = window.getSelection();
                    //console.log(theSelection);
                    divTest.setStart(theSelection.anchorNode, theSelection.anchorOffset);
                    divTest.setEnd(theSelection.focusNode, theSelection.focusOffset);
                    //console.log(divTest);
                    var subSelection = divTest;
                    var selectedText = subSelection.extractContents();
                    //Create new HTML element SPAN
                    var newSpanTag = document.createElement("span");
                    //Adding !important to CSS to account for Dark Theme extensions that override styles... otherwise can't see highlights in dark mode
                    newSpanTag.style.setProperty("background-color", "aqua", "important");
                    newSpanTag.style.setProperty("color", "black", "important");
                    //Set class for the new SPAN element so you can loop through the highlights later to copy to clipboard
                    newSpanTag.className = "roamJsHighlighter pageLink";
                    newSpanTag.title = curElement.title;
                    newSpanTag.appendChild(selectedText);
                    subSelection.insertNode(newSpanTag);
                }
            }
            //Run the function to loop through the highlighted elements and copy to the clipboard ready to paste to Roam
            //Old Way which wasn't working with clipboardData setData since not called by a cut or copy event
            //updateClipboard();
            //Force the "cut" event because the clipboardData event setData doesn't work unless activated from a cut/copy event.
            //We already have the "cut" event listener set to run our code, so this should activate it
            clickEvent = 1;
            document.execCommand('cut');
        }
        else
        {
            //Commenting this out because when writing to console it actually prevents a quick highlight after selecting text
            //and trying to use ctrl + x "cut" to trigger a highlight if you do it too quickly because when you highlight you are clicking first
            //console.log('Not previously highlighted');
        }
    });
}
