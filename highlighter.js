//Version 1.1
//Date: May 6, 2020
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
    //Global variables for parsing selected elements for highlight
    var foundStart = 0;
    var foundEnd = 0;

    console.log('Loaded highlighter.js script');

    //This function loops through the elements with the highlighter "class" set by the script and adds to clipboard in Roam format
    function updateClipboard() {
        //Get page title and URL and put in Roam format [Page Title](URL)
        var reference = `[${document.title}](${location.href}) #[[Roam-Highlights]]`;
        var finalString = "";
        var plainConcatHighlights = "";
        var htmlConcatHighlights = "";
        var eachHighlight = "";

        //4 Options for handling line breaks within each selected highlight by the user (a few words, or a few paragraphs... whatever user selects as a single highlight)
        //Set to 0 (Default) if you want line breaks (e.g., each paragraph) to create new bullets at same hierarchy/level
        //Set to 1 if you want line breaks (e.g., each paragraph) to create new bullets, but nested underneath the first "paragraph" in the highlight
        //Set to 2 if you want line breaks (e.g., each paragraph) to be in same bullet with Ctrl + Shift "soft line breaks" like Ctrl+Shift+V does in browser pasting
        //Set to 3 if you want line breaks (e.g., each paragraph) to be replaced with a "space" and simply concatenated into a single bullet and without any line breaks
        var sameBlock = 0;

        //Get all the highlighted elements based off class name roamJsHighlighter
        var elemHighlights = document.getElementsByClassName("roamJsHighlighter");
        for (var i = 0; i < elemHighlights.length; i++)
        {
            var tempString = "";
            var htmlString = "";
            var plainText = "";
            //title = 'HL:' + highlightCtr;
            var elemTitle = elemHighlights.item(i).title.split(":")[1];
            eachHighlight = elemHighlights.item(i).textContent;
            //console.log('Element: ', eachHighlight);
            //Check if the next element is the same "title" which means is the same user selected highlight and should be combined
            if(i + 1 < elemHighlights.length)
            {
                while(elemTitle == elemHighlights.item(i+1).title.split(":")[1])
                {
                    eachHighlight += '\n' + elemHighlights.item(i+1).textContent;
                    i++;
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
            plainText = plainText.split("::").join("`::`").split("[[").join("`[[`").split("]]").join("`]]`").split("#").join("`#`");
            htmlString = htmlString.split("::").join("`::`").split("[[").join("`[[`").split("]]").join("`]]`").split("#").join("`#`");

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

    //
    function checkSelection(selectionFunc, endContFunc, endOffFunc, childElemFunc)
    {
        newChild = childElemFunc.childNodes[0];
        newOrigElem = childElemFunc;
        var bNewChild = 1;

        if(typeof newChild == 'undefined')
        {
            newChild = newOrigElem;
            bNewChild = 0;
        }

        if(selectionFunc.containsNode(newChild, true) || selectionFunc.containsNode(newOrigElem, true))
        {
            //console.log('new j: ', j);
            //Default length of text to grab from elements is start to end (0 to the length of string)
            var stPos = 0;
            var enPos = newChild.length;

            //Looking for the end of selection range
            if(newChild.textContent == endContFunc.textContent)
            {
                //console.log('Found end');
                foundEnd = 1;
                stPos = 0;
                enPos = endOffFunc;
            }

            //If found the end and already added, then will break from the entire loop and end script
            if(foundEnd == 2)
            {
                return 0;
            }
            //If are currently processing the end of selection, then now set variable to 2 which will end script with above line next loop through
            if(foundEnd == 1){foundEnd = 2;}
            return enPos;
        }
        return 0;
    }

    //Add listener to "cut" event (CTRL + X on Windows) for highlighting trigger
    document.addEventListener('cut', function (e)
    {
        if(clickEvent == 0)
        {
            //Check to see if at least one selection by the user was found to be highlighted (will use to increment the highlightCtr variable later)
            var foundSelection = 0;
            //Get current selected text which will be used to highlight and then later when ready to export to Roam
            var selection = window.getSelection();
            //Create range from selected text
            var range = selection.getRangeAt(0);
            //console.log(range);

            //Test to make sure there is a selection and variable/function is not undefined which would throw error
            var testMultiple = typeof(range.commonAncestorContainer.getElementsByTagName);
            var numOfElem = 0;
            //If the testMultiple variable is not undefined it will return result of 'function' and we know there is selected text and over multiple HTML elements
            if(testMultiple === 'function')
            {
                numOfElem = 2;
                //console.log('common anc: ', range.commonAncestorContainer);
                //console.log('common anc node0: ', range.commonAncestorContainer.childNodes[0]);

                //OLD WAY
                //var allWithinRangeParent = range.commonAncestorContainer.getElementsByTagName("*");
                //NEW WAY
                var allWithinRangeParent = range.commonAncestorContainer;
                //console.log(allWithinRangeParent);
            }

            var startCont = range.startContainer;
            var startOff = range.startOffset;
            var endCont = range.endContainer;
            var endOff = range.endOffset;

            if(startCont === endCont)
            {
                //console.log('Start and end are the same HTML element/container...');
                numOfElem = 1;
            }

            if(numOfElem == 1)
            {
                //If the selection is in the same HTML element/container, it is much simpler and can do the following
                var divTest = document.createRange();
                divTest.setStart(startCont, startOff);
                divTest.setEnd(startCont, endOff);
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
                newSpan.appendChild(selectedText);
                subSelection.insertNode(newSpan);
                //Clear the original user mouse selection
                document.getSelection().removeAllRanges();
                //Re-add the user mouse selection based off the range just created/highlighted
                //Reason is in certain circumstances, the selected text range gets shortened so do this just to make sure
                document.getSelection().addRange(divTest);
            }else
            {
                //console.log('start cont: ', startCont);
                //console.log('end cont: ', endCont);

           /*     //Loop through all elements for testing
                for (var i=0, elem; elem = allWithinRangeParent.childNodes[i]; i++)
                {
                    console.log('i: ', i);
                    console.log('elem: ', elem);
                    console.log('elem text: ', elem.textContent);
                    console.log('elem type: ', elem.nodeName)
                }*/

                foundStart = 0;
                foundEnd = 0;
                var thisIsFirst = 0;

                //Loop through all the child elements of the parent container of the selected text
                for (var i=0, elem; elem = allWithinRangeParent.childNodes[i]; i++)
                {
                    //console.log('new i: ', i);
                    //console.log('new elem: ', elem);
                    //Just in case, add this check to avoid infinite loops
                    if(i > 1000)
                    {
                        console.log('Infinite loop at i: ',i);
                        break;
                    }

                    var noChild = 0;
                    //Check to see if the Element is part of the selected text, otherwise skip
                    if(selection.containsNode(elem, true))
                    {
                        var origElem = elem;
                        //console.log('elem childnode0: ', elem.childNodes[0]);
                        //Check in rare use case that there is text in element but no childNode
                        if(elem.length > 0 && elem.childNodes[0] == null)
                        {
                            //console.log('no children... appending itself');
                            //If this happens, we want to flag this to still be used since it has selected text
                            noChild = 1;
                            //Have to create a "dummy" element that will hold the text to add to highlighter
                            var newElem = document.createElement("span");
                            //Creating a new element so have to add one to the i counter
                            //UPDATE don't need to add one here because delete the created element later
                            //UPDATE UPDATE you DO need this actually!
                            //FINAL update: You cannot have this here and instead added around line 267 when a SPAN is actually being added
                            //i++;
                            newElem.textContent = elem.textContent;
                            //Set the elem variable to this new element and then can delete the "dummy" one we created
                            elem = newElem;
                            newElem.remove();
                        }

                        //Loop through each childNode of each element
                        for(var j=0, childElem; childElem = elem.childNodes[j]; j++)
                        {
                            //Just in case, add this check to avoid infinite loops
                            if(j > 1000)
                            {
                                console.log('Infinite loop at j: ',j);
                                break;
                            }

                            //console.log('childElem: ', childElem);
                            //Have to check against both the current childElem or the origElem to see if contained in selection because of the noChild corner case described above
                            if(selection.containsNode(childElem, true) || selection.containsNode(origElem, true))
                            {
                                //console.log('new j: ', j);
                                //Default length of text to grab from elements is start to end (0 to the length of string)
                                var stPos = 0;
                                var enPos = childElem.length;

                                //If this is the beginning of the selected text, will handle differently because selection likely just partial of the entire HTML element
                                if(childElem.textContent == startCont.textContent && foundStart == 0)
                                {
                                    //console.log('Found start');
                                    foundStart = 1;
                                    stPos = startOff;
                                    enPos = childElem.length;
                                    thisIsFirst = 1;
                                }

                                //Looking for the end of selection range
                                if(childElem.textContent == endCont.textContent)
                                {
                                    //console.log('Found end');
                                    foundEnd = 1;
                                    stPos = 0;
                                    enPos = endOff;
                                }

                                //If haven't found the beginning of the selection yet then can skip to next item/element in the loop
                                if(foundStart == 0){continue;}
                                //If found the end and already added, then will break from the entire loop and end script
                                if(foundEnd == 2){break;}
                                //If are currently processing the end of selection, then now set variable to 2 which will end script with above line next loop through
                                if(foundEnd == 1){foundEnd = 2;}

                                //Check the next i element to see if somethign like <em>, <a>, <pre>, <code> etc. that we can extend to
                                var checkNextEnd = enPos;
                                if(noChild == 1){childElem = origElem;}
                                var childElemEnd = childElem;
                                var whileElem = elem;
                                while(checkNextEnd > 0)
                                {
                                    checkNextEnd = 0;
                                    if(typeof whileElem.childNodes[j+1] == 'undefined')
                                    {
                                        //console.log('i+1');
                                        nextChildElem = allWithinRangeParent.childNodes[i+1];
                                    }
                                    else
                                    {
                                        //console.log('j+1');
                                        nextChildElem = whileElem.childNodes[j+1];
                                    }

                                    if(typeof nextChildElem !== 'undefined')
                                    {
               /* console.log('i: ',i);
                console.log('j: ',j);
                console.log('childElem: ',childElem);
                console.log('childElemType: ',childElem.nodeName);
                console.log('childElemEnd: ',childElemEnd);
                console.log('childElemEndType: ',childElemEnd.nodeName);
                console.log('nextChildElem: ',nextChildElem);
                console.log('nextChildElemType: ',nextChildElem.nodeName);
                console.log('nextChildElemNode: ',nextChildElem.childNodes[0]);
console.log('length: ',nextChildElem.textContent.trim().length);
console.log('length: ',nextChildElem.textContent.trim().length);
*/
                                        if(nextChildElem.textContent.trim().length > 0 && (nextChildElem.nodeName == 'EM' || nextChildElem.nodeName == 'G-EMOJI' || nextChildElem.nodeName == 'A' || (nextChildElem.nodeName == '#text' && childElemEnd.nodeName == '#text')))
                                        {
                                            /*
                                            console.log('in-i: ',i);
                                            console.log('in-j: ',j);
                                            console.log('curItem: ',childElem);
                                            console.log('curItemType: ',childElem.nodeName);
                                            console.log('nextChildElem: ',nextChildElem);
                                            console.log('nextChildElemType: ',nextChildElem.nodeName);
                                            console.log('nextChildElemNode: ',nextChildElem.childNodes[0]);*/
                                            checkNextEnd = checkSelection(selection, endCont, endOff, nextChildElem);
                                            //console.log('checkNextEnd: ',checkNextEnd);
                                            if(checkNextEnd > 0)
                                            {
                                                enPos = checkNextEnd;
                                                if(typeof nextChildElem.childNodes[0] == 'undefined'){childElemEnd = nextChildElem;}else{childElemEnd = nextChildElem.childNodes[0];}

                                                if(typeof whileElem.childNodes[j+1] == 'undefined')
                                                {
                                                    //console.log('now');
                                                    i++;
                                                    whileElem = allWithinRangeParent.childNodes[i];
                                                }
                                                else
                                                {
                                                     //console.log('now2');
                                                    j++;
                                                }
                                            }
                                             //console.log('now3');
                                        }
                                    }
                                }
      /*  console.log('here i: ',i);
        console.log('here j: ',j);
        console.log('here childElem: ',childElemEnd);*/
                                //console.log('cur i: ', i);
                                //console.log('new j: ', j);

                                //This should weed out "empty" items
                                if(enPos > 0)
                                {
                                    if(noChild == 1)
                                    {
                                        //console.log('nochild: ',elem);
                                        //noChild explained above
                                        childElem = origElem;
                                        elem.remove();
                                    }
                                    //console.log('stPos: ', stPos);
                                    //console.log('enPos: ', enPos);

                                    if(childElem.textContent.trim().length > 0)
                                    {
                                        if(noChild == 1){i++;}
                                        //Create a range to create the new SPAN element from below
                                        var divTest = document.createRange();
                                        //Add teh start and end of the range for Highlighter
                                        divTest.setStart(childElem, stPos);
                                        divTest.setEnd(childElemEnd, enPos);
/*
foundEnd = 1;
console.log(childElem);
stPos++
console.log(stPos);
console.log(childElemEnd);
enPos--
console.log(enPos);
document.getSelection().removeAllRanges();
document.getSelection().addRange(divTest);
//var selec = window.getSelection();
//selec.addRange(divTest);
break;
*/
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
                                        newSpan.appendChild(selectedText);
                                        subSelection.insertNode(newSpan);
                                        //console.log('new span created: ', newSpan);
                                        if(thisIsFirst == 1)
                                        {
                                            var finalRangeStart = newSpan;
                                            thisIsFirst = 0;
                                        }
                                    }

                                    //Have to jump ahead one more in the loop because just added an element
                                    j++;
                                    //i++;
                                }
                            }else{
                                //console.log('not found in childnode selection');
                            }
                        }

                        if(foundEnd == 2)
                        {
                            //Clear the original user mouse selection
                            document.getSelection().removeAllRanges();
                            let finalRange = document.createRange();
                            finalRange.setStart(finalRangeStart.childNodes[0], 0);
                            //break;
                            var childNodeLength = newSpan.childNodes.length;
                            finalRange.setEnd(newSpan.childNodes[childNodeLength-1], newSpan.childNodes[childNodeLength-1].length);
                            //console.log('length: ',newSpan.childNodes[0].length);
                            //console.log('length: ',newSpan.length);

                            //Re-add the user mouse selection based off the range just created/highlighted
                            //Reason is in certain circumstances, the selected text range gets shortened so do this just to make sure
                            document.getSelection().addRange(finalRange);
                            //console.log('Selected original text again...');
                            break;
                        }
                    }else
                    {
                        //console.log('not found in selection');
                    }

                    //Loop through the current element to see if it has any child descendents as need to add i++ for each
                    //Reason is that otherwise we will loop through this element child nodes / text and then will also loop through
                    //the descendent child elements later in the i++ loop which is causing duplication. Especially important for emojis, <br>, etc.
                    /* LOOKS LIKE WE DON'T NEED THIS ANYMORE NOW THAT WE ARE JUST GOING STRAIGHT FROM THE PARENT WITH allWithinRangeParent = range.commonAncestorContainer
                    var ancestor = elem;
                    var ifFunction = typeof(ancestor.getElementsByTagName);
                    if(ifFunction === 'function')
                    {
                        var descendents = ancestor.getElementsByTagName('*');
                            // gets all descendent of ancestor
                        for (var k = 0; k < descendents.length; k++) {
                            console.log('skipping descendent: ', descendents[k]);
                            //i++;
                        }
                    }
                    */
                }
            }
        }

        //Run the function to loop through the highlighted elements and copy to the clipboard ready to paste to Roam
        clickEvent = 0;
        updateClipboard();
        e.preventDefault();
    }
    );

    //Add click event to allow for "erasing" of previous highlights you don't want anymore. Simply click anywhere inside the highlight
    document.addEventListener('click', function(e) {
        var curElement = e.target || e.srcElement;
        if(curElement.className === "roamJsHighlighter")
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
