//Version 1.5
//Date: May 10, 2020

//4 Options for handling line breaks within each selected highlight by the user (a few words, or a few paragraphs... whatever user selects as a single highlight)
//Set to 0 (Default) if you want line breaks (e.g., each paragraph) to create new bullets at same hierarchy/level
//Set to 1 if you want line breaks (e.g., each paragraph) to create new bullets, but nested underneath the first "paragraph" in the highlight
//Set to 2 if you want line breaks (e.g., each paragraph) to be in same bullet with Ctrl + Shift "soft line breaks" like Ctrl+Shift+V does in browser pasting
//Set to 3 if you want line breaks (e.g., each paragraph) to be replaced with a "space" and simply concatenated into a single bullet and without any line breaks
var sameBlock = Number(0);

if(typeof roamHighlighterLoaded !== "undefined")
{
    //Variable already present/set so therefore do not need to run again as don't want to duplicate load the Javascript code
}
else
{
    var roamHighlighterLoaded = 1;
    //Variable to see if starting by click event (to remove a highlight) OR by a 'cut' event by user adding a highlight
    var clickEvent = 0;
    //Variable to count the total number of highlights selected and also then create SPAN Title to be able to combine same highlight even with linebreaks
    var highlightCtr = 0;

    console.log('Loaded highlighter.js script');

    //0 = [Default] Don't show debug
    //1 = Show all log items marked logLevel = 1
    //2 = Show all log items marked logLevel 1 & 2
    //3 = Show all log items (Full Verbose)
    var debugMode = 0;
    var consoleTabLevel = '';

    function writeToConsole(textString, logLevel = 1, tabLevel = 1, alwaysShow = "no")
    {
        if(alwaysShow == "yes" || (debugMode == 1 && logLevel == 1) || (debugMode == 2 && logLevel <= 2) || debugMode == 3)
        {
            var finalTextString = textString;
            if(tabLevel != 0){finalTextString = consoleTabLevel + textString;}
            console.log(finalTextString);
        }
    }

    //This function loops through the elements with the highlighter "class" set by the script and adds to clipboard in Roam format
    function updateClipboard() {
        //Get page title and URL and put in Roam format [Page Title](URL)
        var reference = `[${document.title}](${location.href}) #[[Roam-Highlights]]`;
        var finalString = "";
        var plainConcatHighlights = "";
        var htmlConcatHighlights = "";
        var eachHighlight = "";

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

            eachHighlight = elemHighlights.item(i).textContent;
            writeToConsole('eachHighlight: ' + eachHighlight,3);
            var elemSpan = elemHighlights.item(i);
            writeToConsole(elemSpan,3,0);
            //console.log('main: ',elemSpan.className);
            writeToConsole('elemSpan.parentElement.nodeName: ' + elemSpan.parentElement.nodeName,3);
            if(elemSpan.parentElement.nodeName == "A")
            {
                var eachLink = elemSpan.parentElement;
                var foundALink = `[${eachLink.innerText}](${eachLink.href})`;
                writeToConsole(`Here: [${eachLink.innerText}](${eachLink.href})`);
                eachHighlight = eachHighlight.replace(eachLink.innerText, foundALink);
            }
            writeToConsole(elemSpan.parentElement,1,0);
            var parNodeName = elemSpan.parentElement.nodeName;

            if(parNodeName == "STRONG"){eachHighlight = '**' + eachHighlight + '**';}
            if(parNodeName == "EM"){eachHighlight = '__' + eachHighlight + '__';}
            if(parNodeName == "H1" && eachHighlight == elemSpan.parentElement.innerText){eachHighlight = '<h1>' + eachHighlight + '</h1>';}
            //if(parNodeName == "H2"){eachHighlight = '<h2>' + eachHighlight + '</h2>';}
            if(parNodeName == "H2" && eachHighlight == elemSpan.parentElement.innerText){eachHighlight = '<h2>' + eachHighlight + '</h2>';}
            if(parNodeName == "H3" && eachHighlight == elemSpan.parentElement.innerText){eachHighlight = '<h3>' + eachHighlight + '</h3>';}

            //console.log('Element: ', eachHighlight);
            //Check if the next element is the same "title" which means is the same user selected highlight and should be combined
            var lastMainSpanText = elemSpan.textContent;
            if(i + 1 < elemHighlights.length)
            {
                while(elemTitle == elemHighlights.item(i+1).title.split(":")[1])
                {
                    var elemSpan = elemHighlights.item(i+1);
                    var newHighlight = elemSpan.textContent;
                    var classFound = elemSpan.className;
                    //console.log('main+1: ',classFound);
                    writeToConsole('newHighlight: ' + newHighlight,3);
                    writeToConsole('while loop elemSpan.parentElement.nodeName: ' + elemSpan.parentElement.nodeName,3)
                    parNodeName = elemSpan.parentElement.nodeName;
                    if(parNodeName == "A")
                    {
                        var eachLink = elemSpan.parentElement;
                        var foundALink = `[${eachLink.innerText}](${eachLink.href})`;
                        writeToConsole(`HERE2: [${eachLink.innerText}](${eachLink.href})`);
                        newHighlight = newHighlight.replace(eachLink.innerText, foundALink);
                    }

                    writeToConsole('newHighlight: ' + newHighlight,3);
                    writeToConsole(elemSpan.parentElement,1,0);

                    if(parNodeName == "STRONG"){newHighlight = '**' + newHighlight + '**';}
                    if(parNodeName == "EM"){newHighlight = '__' + newHighlight + '__';}
                    if(parNodeName == "H1" && newHighlight == elemSpan.parentElement.innerText){newHighlight = '<h1>' + newHighlight + '</h1>';}
                    //if(parNodeName == "H2"){newHighlight = '<h2>' + newHighlight + '</h2>';}
                    if(parNodeName == "H2" && newHighlight == elemSpan.parentElement.innerText){newHighlight = '<h2>' + newHighlight + '</h2>';}
                    if(parNodeName == "H3" && newHighlight == elemSpan.parentElement.innerText){newHighlight = '<h3>' + newHighlight + '</h3>';}

                    if(classFound == 'roamJsHighlighter pageLink')
                    {
                        var replaceLastText = lastMainSpanText.replace(newHighlight,`|[|[${newHighlight}|]|]`);
                        eachHighlight = eachHighlight.replace(lastMainSpanText,replaceLastText);
                        lastMainSpanText = replaceLastText;
                    }
                    else
                    {
                        if(((parNodeName == "A" || parNodeName == "CODE" || parNodeName == "EM" || parNodeName == "G-EMOJI" || parNodeName == "STRONG") && (elemHighlights.item(i).innerText.substring(elemHighlights.item(i).innerText.length - 1) == " " || elemHighlights.item(i).innerText.substring(elemHighlights.item(i).innerText.length - 1) == "("))
                         || ((lastParNodeName == "A" || lastParNodeName == "CODE" || lastParNodeName == "EM" || lastParNodeName == "G-EMOJI" || lastParNodeName == "STRONG") && (newHighlight.substring(0,1) == " " || newHighlight.substring(0,1) == ")" || newHighlight.substring(0,1) == "." || newHighlight.substring(0,1) == "?" || newHighlight.substring(0,1) == "!")))
                        {
                            eachHighlight += newHighlight;
                        }else{eachHighlight += '\n' + newHighlight;}
                        lastMainSpanText = elemSpan.textContent;
                    }
                    writeToConsole('eachHighlight: ' + eachHighlight,3);
                    i++;
                    var lastParNodeName = parNodeName;
                    if(i + 1 >= elemHighlights.length){break;}
                }
            }

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
            //console.log('Final string: ', plainConcatHighlights);
        }

        /*console.log('plain');
        console.log(plainText);
        console.log(plainConcatHighlights);
        console.log('html');
        console.log(htmlString);
        console.log(htmlConcatHighlights);*/
/*
        finalString = `<p>${finalString}
        new line here</p><p>new paragraph</p>`;
        //var dataToCopyHTML = new Blob(["Text data"], {type : "text/html"});
                //Add text from variable to #Clipboard
*/

        var clipboardDataEvt = event.clipboardData;
        clipboardDataEvt.setData('text/plain', plainConcatHighlights);
        clipboardDataEvt.setData('text/html', htmlConcatHighlights);
/*
        //OLD method that worked but doesn't work with text/html format (or atleast couldn't figure out how)
        //Add text from variable to #Clipboard
        navigator.clipboard.writeText(finalString)
            .then(() => {
            // Success!
            })
            .catch(err => {
            console.log('Issue adding results to clipboard', err);
            });
*/
        return;
    }

    //Add listener to "cut" event (CTRL + X on Windows) for highlighting trigger
    document.addEventListener('cut', function (e)
    {
        if(clickEvent == 0)
        {
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
            var finalRangeStart = null;
            var finalRangeEnd = null;

            function createSpanElement(startElemNode, startElemPos, endElemNode, endElemPos)
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

                //newSpan.style.backgroundColor = "yellow";
                //Adding !important to CSS to account for Dark Theme extensions that override styles... otherwise can't see highlights in dark mode
                newSpan.style.setProperty("background-color", "yellow", "important");
                newSpan.style.setProperty("color", "black", "important");

                //Set class for the new SPAN element so you can loop through the highlights later to copy to clipboard
                newSpan.className = "roamJsHighlighter";
                newSpan.title = 'HL:' + highlightCtr;

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
                    finalRangeStart = newSpan;
                    thisIsFirst = 0;
                }
                finalRangeEnd = newSpan;

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

            //If only one html element selected
            if(allWithinRangeParent.childNodes.length == 0)
            {
                if(startCont === endCont && endOff > startOff)
                {
                    var theOnlyNode = createSpanElement(startCont, startOff, endCont, endOff);

                    //Clear the original user mouse selection
                    document.getSelection().removeAllRanges();
                    let finalRange = document.createRange();
                    writeToConsole(finalRangeStart,3,0);
                    writeToConsole(finalRangeEnd,3,0);
                    finalRange.setStart(theOnlyNode.childNodes[0], 0);
                    finalRange.setEnd(theOnlyNode.childNodes[0], theOnlyNode.childNodes[0].textContent.length);
                    writeToConsole(finalRange,3,0);
                    //Re-add the user mouse selection based off the range just created/highlighted
                    //Reason is in certain circumstances, the selected text range gets shortened so do this just to make sure
                    //document.getSelection().addRange(finalRange);
                }
            }

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
                        /* ACTUALLY LIKE IDEA OF UNSELECTING THE SELECTION AFTER HIGHLIGHT
                        let finalRange = document.createRange();
                        writeToConsole(finalRangeStart,3,0);
                        writeToConsole(finalRangeEnd,3,0);
                        finalRange.setStart(finalRangeStart.childNodes[0], 0);
                        finalRange.setEnd(finalRangeEnd.childNodes[0], finalRangeEnd.childNodes[0].length);
                        writeToConsole(finalRange,3,0);
                        //Re-add the user mouse selection based off the range just created/highlighted
                        //Reason is in certain circumstances, the selected text range gets shortened so do this just to make sure
                        document.getSelection().addRange(finalRange);
                        */
                        break;
                    }
                    consoleTabLevel = '\t';
                }
                consoleTabLevel = '';
            }

            writeToConsole(`allTextFound: ${allTextFound}`);
            writeToConsole(`Ended i Loop at: ${i}`);
        }

        //Run the function to loop through the highlighted elements and copy to the clipboard ready to paste to Roam
        clickEvent = 0;
        updateClipboard();
        e.preventDefault();
    }
    );

    //Add listener to "paste" event (CTRL + V on Windows) to bring up option to change way line breaks are handled
    document.addEventListener('paste', function (e)
    {
        //localStorage["sameBlockOpt"];
        sameBlockOpt = Number(prompt("0 = [Default] Line breaks create new bullets at same 'level'\n1 = Nest underneath the first 'paragraph' in each highlight\n2 = Line Breaks stay within each bullet (ie. Ctrl + Shift + V)\n3 = Replace line breaks with SPACEs", 1));
        //4 Options for handling line breaks within each selected highlight by the user (a few words, or a few paragraphs... whatever user selects as a single highlight)
        //Set to 0 (Default) if you want line breaks (e.g., each paragraph) to create new bullets at same hierarchy/level
        //Set to 1 if you want line breaks (e.g., each paragraph) to create new bullets, but nested underneath the first "paragraph" in the highlight
        //Set to 2 if you want line breaks (e.g., each paragraph) to be in same bullet with Ctrl + Shift "soft line breaks" like Ctrl+Shift+V does in browser pasting
        //Set to 3 if you want line breaks (e.g., each paragraph) to be replaced with a "space" and simply concatenated into a single bullet and without any line breaks
        if(sameBlockOpt != 0 && sameBlockOpt != 1 && sameBlockOpt != 2 && sameBlockOpt != 3){sameBlock = Number(0);}else{sameBlock = Number(sameBlockOpt);}
        //console.log('sameBlock: ', sameBlock);

        //Run the function to loop through the highlighted elements and copy to the clipboard ready to paste to Roam
        //Force the "cut" event because the clipboardData event setData doesn't work unless activated from a cut/copy event.
        //We already have the "cut" event listener set to run our code, so this should activate it
        clickEvent = 1;
        document.execCommand('cut');
        e.preventDefault();
    }
    );

    //Add click event to allow for "erasing" of previous highlights you don't want anymore. Simply click anywhere inside the highlight
    //Or if you selected text then it will try and add page linking for Roam
    //Lastly if you hold ctrl and click then it will add page link for that single word you clicked
    //Going to change the single click to require ctrl to be held down to remove highlights which will allow for double click even to fire for selecting a word
    document.addEventListener('click', function(evt) {
        var curElement = evt.target || evt.srcElement;
        var controlKeyHeld = evt.ctrlKey;
        //console.log(curElement);
        //console.log(curElement.className);
        if(controlKeyHeld || evt.button == 2)
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
                        //This means the user clicked and dragged to select some text instead of just clicking
                        var selectedTextHl = theSelection.toString();
                        //console.log(selectedTextHl);
                        //Create new SPAN element for the page reference highlight
                        var divTest = document.createRange();
                        //divTest = window.getSelection();
                        //console.log(theSelection);
                        divTest.setStart(theSelection.baseNode, theSelection.baseOffset);
                        divTest.setEnd(theSelection.extentNode, theSelection.extentOffset);
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
                        //Clear the original user mouse selection
                        //document.getSelection().removeAllRanges();
                        //Re-add the user mouse selection based off the range just created/highlighted
                        //Reason is in certain circumstances, the selected text range gets shortened so do this just to make sure
                        //document.getSelection().addRange(divTest);
                    }
                }
                else
                {
                    /*
                    console.log('class: ', curElement.className);
                    console.log('current: ', curElement);
                    console.log('parent: ', curElement.parentNode);
                    console.log('prev sibling: ', curElement.previousSibling);
                    console.log('next sibling: ', curElement.nextSibling);
                    console.log('text: ', curElement.textContent);
                    */
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
        }
    });

    //Add Double Click event to allow for page linking to a single word since double click will highlight the word you are clicking already
    document.addEventListener('dblclick', function(evt) {
        var curElement = evt.target || evt.srcElement;
        //console.log(curElement);
        //console.log(curElement.className);
        if(curElement.className === "roamJsHighlighter" || curElement.className === "roamJsHighlighter pageLink")
        {
            //console.log(curElement);
            var bSelFound = 0;
            if (typeof window.getSelection != "undefined")
            {
                var theSelection = window.getSelection();
                var theSelectionString = theSelection.toString();
                if(theSelectionString.length > 0)
                {
                    //Fix the selection in case it extends a character and grabs space character in front or after the word
                    var divTest = document.createRange();
                    if(theSelectionString.substring(0,1) == " "){var addOffset = 1;}else{var addOffset = 0;}
                    if(theSelectionString.substring(theSelectionString.length - 1) == " "){var subOffset = 1;}else{var subOffset = 0;}
                    divTest.setStart(theSelection.baseNode, theSelection.baseOffset + addOffset);
                    divTest.setEnd(theSelection.extentNode, theSelection.extentOffset - subOffset);
                    document.getSelection().removeAllRanges();
                    document.getSelection().addRange(divTest);
                    bSelFound = 1;
                }
            }

            if(bSelFound == 1)
            {
                //console.log('selection: ', window.getSelection);
                var theSelection = window.getSelection();
                if(theSelection.toString().length > 0)
                {
                    //This means the user clicked and dragged to select some text instead of just clicking
                    var selectedTextHl = theSelection.toString();
                    //console.log(selectedTextHl);
                    //Create new SPAN element for the page reference highlight
                    var divTest = document.createRange();
                    //divTest = window.getSelection();
                    //console.log(theSelection);
                    divTest.setStart(theSelection.baseNode, theSelection.baseOffset);
                    divTest.setEnd(theSelection.extentNode, theSelection.extentOffset);
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
                    //Clear the original user mouse selection
                    //document.getSelection().removeAllRanges();
                    //Re-add the user mouse selection based off the range just created/highlighted
                    //Reason is in certain circumstances, the selected text range gets shortened so do this just to make sure
                    //document.getSelection().addRange(divTest);
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
