//Date: May 31, 2020
var verNum = '1.9.7.1';
var getPage = location.href;

//Default settings in case no local storage saved
var sameBlock = Number(0);
var pageRef = "#[[Roam-Highlights]]";
var sideWidth = "20%";
var sideHeight = "30%";
var showWindow = Number(1);
var formatBold = '**';
var formatItalics = '__';
var formatCode = '`';
var formatBullets = '- ';
var bHeaders = true;
var bIndents = true;
var pageTruncate = '';
//Kindle settings
var kindleHLref = "#[[Kindle-Highlights]]";
var bLocation = true;
var bColor = true;
var bColorRef = true;
var kindleHLstructure = Number(0);

var pageTitle = document.title.toString();
var roamHighlighterLoaded;
var veryFirstRun = 1;

//-1 = Only for current item you are testing... never leave these permanently
//0 = [Default] Don't show debug
//1 = Show all log items marked logLevel = 1
//2 = Show all log items marked logLevel 1 & 2
//3 = Show all log items (Full Verbose)
var debugMode = 0;
var consoleTabLevel = '';

function writeToConsole(textString, logLevel = 1, tabLevel = 1, alwaysShow = "no")
{
    if(alwaysShow == "yes" || (debugMode == -1 && logLevel == -1) || (debugMode == 1 && logLevel == 1) || (debugMode == 2 && logLevel <= 2) || debugMode == 3)
    {
        var finalTextString = textString;
        if(tabLevel != 0){finalTextString = consoleTabLevel + textString;}
        console.log(finalTextString);
    }
}

//See if using Chrome or Firefox
if(typeof userAgentString === "undefined")
{
    writeToConsole('userAgentString loaded',-1);
    var userAgentString = navigator.userAgent;
    var chromeAgent = userAgentString.indexOf("Chrome") > -1;
    if(chromeAgent){var useBrowser = chrome}else{var useBrowser = browser}
}

async function getLocalStorageValue(varName)
{
    return new Promise((resolve, reject) => {
        try
        {
            useBrowser.storage.local.get(varName, function (value){resolve(value);})
        }
        catch(ex)
        {
            reject(ex);
        }
    });
}

function setLocalStorageValue(varName, varValue)
{
    useBrowser.storage.local.set({[varName]:varValue}, function(){});
}

async function startFunction()
{
    if(debugMode != 0)
    {
        writeToConsole("sameBlock: " + sameBlock,-1);
        writeToConsole("pageRef: " + pageRef,-1);
        writeToConsole("sideWidth: " + sideWidth,-1);
        writeToConsole("sideHeight: " + sideHeight,-1);
        writeToConsole("showWindow: " + showWindow,-1);
        writeToConsole("formatBold: " + formatBold,-1);
        writeToConsole("formatItalics: " + formatItalics,-1);
        writeToConsole("formatCode: " + formatCode,-1);
        writeToConsole("bHeaders: " + bHeaders,-1);
        writeToConsole("formatBullets: " + formatBullets,-1);
        writeToConsole("bIndents: " + bIndents,-1);
        writeToConsole("pageTruncate: " + pageTruncate,-1);
        writeToConsole("kindleHLref: " + kindleHLref,-1);
        writeToConsole("bLocation: " + bLocation,-1);
        writeToConsole("bColor: " + bColor,-1);
        writeToConsole("bColorRef: " + bColorRef,-1);
        writeToConsole("kindleHLstructure: " + kindleHLstructure,-1);
    }

    //Array to loop through to get values from browser.storage.local
    var settingsArray = ["sameBlock", "pageRef", "sideWidth", "sideHeight", "showWindow", "formatBold", "formatItalics", "formatCode", "bHeaders", "formatBullets", "bIndents", "pageTruncate", "kindleHLref", "bLocation", "bColor", "bColorRef", "kindleHLstructure"];

    for(var s = 0; s < settingsArray.length; s++)
    {
        var storageVar = settingsArray[s];
        var storResult = await getLocalStorageValue(storageVar);
        var storResult = await getLocalStorageValue(storageVar);
        var varResult = storResult[Object.keys(storResult)[0]];
        if(debugMode != 0)
        {
            writeToConsole("storageVar: " + storageVar,-1);
            writeToConsole("localStorageResult: " + varResult,-1);
        }

        switch(storageVar)
        {
            case "sameBlock":
                if(varResult !== undefined){sameBlock = varResult;}
                setLocalStorageValue("sameBlock", sameBlock);
                break;
            case "pageRef":
                if(varResult !== undefined){pageRef = varResult;}
                setLocalStorageValue("pageRef", pageRef);
                break;
            case "sideWidth":
                if(varResult !== undefined){sideWidth = varResult;}
                setLocalStorageValue("sideWidth", sideWidth);
                break;
            case "sideHeight":
                if(varResult !== undefined){sideHeight = varResult;}
                setLocalStorageValue("sideHeight", sideHeight);
                break;
            case "showWindow":
                if(varResult !== undefined){showWindow = varResult;}
                setLocalStorageValue("showWindow", showWindow);
                break;
            case "formatBold":
                if(varResult !== undefined){formatBold = varResult;}
                setLocalStorageValue("formatBold", formatBold);
                break;
            case "formatItalics":
                if(varResult !== undefined){formatItalics = varResult;}
                setLocalStorageValue("formatItalics", formatItalics);
                break;
            case "formatCode":
                if(varResult !== undefined){formatCode = varResult;}
                setLocalStorageValue("formatCode", formatCode);
                break;
            case "bHeaders":
                if(varResult !== undefined){bHeaders = varResult;}
                setLocalStorageValue("bHeaders", bHeaders);
                break;
            case "formatBullets":
                if(varResult !== undefined){formatBullets = varResult;}
                setLocalStorageValue("formatBullets", formatBullets);
                break;
            case "bIndents":
                if(varResult !== undefined){bIndents = varResult;}
                setLocalStorageValue("bIndents", bIndents);
                break;
            case "pageTruncate":
                if(varResult !== undefined){pageTruncate = varResult;}
                setLocalStorageValue("pageTruncate", pageTruncate);
                break;
            case "kindleHLref":
                if(varResult !== undefined){kindleHLref = varResult;}
                setLocalStorageValue("kindleHLref", kindleHLref);
                break;
            case "bLocation":
                if(varResult !== undefined){bLocation = varResult;}
                setLocalStorageValue("bLocation", bLocation);
                break;
            case "bColor":
                if(varResult !== undefined){bColor = varResult;}
                setLocalStorageValue("bColor", bColor);
                break;
            case "bColorRef":
                if(varResult !== undefined){bColorRef = varResult;}
                setLocalStorageValue("bColorRef", bColorRef);
                break;
            case "kindleHLstructure":
                if(varResult !== undefined){kindleHLstructure = varResult;}
                setLocalStorageValue("kindleHLstructure", kindleHLstructure);
                break;
        }
    }

    if(debugMode != 0)
    {
        writeToConsole("sameBlock: " + sameBlock,-1);
        writeToConsole("pageRef: " + pageRef,-1);
        writeToConsole("sideWidth: " + sideWidth,-1);
        writeToConsole("sideHeight: " + sideHeight,-1);
        writeToConsole("showWindow: " + showWindow,-1);
        writeToConsole("formatBold: " + formatBold,-1);
        writeToConsole("formatItalics: " + formatItalics,-1);
        writeToConsole("formatCode: " + formatCode,-1);
        writeToConsole("bHeaders: " + bHeaders,-1);
        writeToConsole("formatBullets: " + formatBullets,-1);
        writeToConsole("bIndents: " + bIndents,-1);
        writeToConsole("pageTruncate: " + pageTruncate,-1);
        writeToConsole("kindleHLref: " + kindleHLref,-1);
        writeToConsole("bLocation: " + bLocation,-1);
        writeToConsole("bColor: " + bColor,-1);
        writeToConsole("bColorRef: " + bColorRef,-1);
        writeToConsole("kindleHLstructure: " + kindleHLstructure,-1);
    }

    mainFunction();

    var sideWindow = document.getElementById("rmHLmain");
    if(showWindow == 0){sideWindow.style.display = "none";}
}

startFunction();

function mainFunction()
{
if(typeof roamHighlighterLoaded !== "undefined" || getPage.includes('roamresearch.com'))
{
    //Variable already present/set so therefore do not need to run again as don't want to duplicate load the Javascript code
    if(roamHighlighterLoaded == 1)
    {
        var divElemMain = document.getElementById("rmHLmain");
        if(divElemMain.style.display != "none")
        {
            divElemMain.style.display = "none";
            showWindow = 0;
            setLocalStorageValue("showWindow", showWindow);
        }
        else
        {
            divElemMain.style.display = "block";
            showWindow = 1;
            setLocalStorageValue("showWindow", showWindow);
        }
    }
}
else
{
    roamHighlighterLoaded = 1;
    //Variable to see if starting by click event (to remove a highlight) OR by a 'cut' event by user adding a highlight
    var clickEvent = 0;
    var kindleClickEvent = 0;
    //Variable to count the total number of highlights selected and also then create SPAN Title to be able to combine same highlight even with linebreaks
    var highlightCtr = 0;

    console.log('Loaded highlighter.js script v' + verNum);

    function createNewElement(fElemType,fElemVal,fElemFor,fElemCss,fAppendTo,fElemId,fElemName)
    {
        if(fElemType != 'checkbox'){var fElem = document.createElement(fElemType);}

        switch (fElemType)
        {
            case 'label':
                fElem.innerHTML = fElemVal;
                fElem.htmlFor = fElemFor;
                break;
            case 'textarea':
                fElem.value = fElemVal;
                fElem.id = fElemId;
                fElem.name = fElemName;
                break;
            case 'select':
                fElem.id = fElemId;
                fElem.name = fElemName;
                break;
            case 'input':
                fElem.value = fElemVal;
                fElem.id = fElemId;
                fElem.name = fElemName;
                break;
            case 'checkbox':
                var fElem = document.createElement('input');
                fElem.setAttribute("type", "checkbox");
                fElem.id = fElemId;
                fElem.name = fElemName;
                break;
            case 'span':
                fElem.innerHTML = fElemVal;
                fElem.htmlFor = fElemFor;
                break;
            case 'a':
                fElem.innerText = fElemVal;
                break;
            case 'button':
                fElem.innerHTML = fElemVal;
                fElem.id = fElemId;
                fElem.name = fElemName;
                break;
        }

        fElem.style.cssText = fElemCss;
        fAppendTo.appendChild(fElem);

        return fElem;
    }

    //Setup the options/settings menu
    /* TEMPLATE ELEMENTS TO CREATE
        var butExtractKindle = createNewElement('label','INNER_HTML','FOR','CSS',divKindle,'','');
        var butExtractKindle = createNewElement('textarea','TEXT','','CSS',divKindle,'ID','NAME');
        var butExtractKindle = createNewElement('select','','','CSS',divKindle,'ID','NAME');
        var butExtractKindle = createNewElement('button','TEXT','','CSS',divKindle,'ID','NAME');
        var butExtractKindle = createNewElement('input','TEXT','','CSS',divKindle,'ID','NAME');
        var butExtractKindle = createNewElement('checkbox','','','CSS',divKindle,'ID','NAME');
        var butExtractKindle = createNewElement('span','TEXT','','CSS',divKindle,'ID','NAME');
        var butExtractKindle = createNewElement('a','TEXT','','CSS',divKindle,'ID','NAME');
    */
    var divElem = document.createElement('div');
        divElem.id = 'rmHLmain';
        divElem.style.display = "block";
        divElem.style.cssText = 'position:fixed;bottom:0px;right:3px;width:' + sideWidth + ';height:' + sideHeight + ';opacity:0.8;z-index:9999;font-size:12px;line-height:normal';
        document.body.appendChild(divElem);

    var divButtonsElem = document.createElement('div');
        divButtonsElem.id = 'rmHLdivButt';
        divButtonsElem.style.cssText = 'width:100%;display:flex';
        divElem.appendChild(divButtonsElem);

    var divTextElem = document.createElement('div');
        divTextElem.id = 'rmHLdivText';
        divTextElem.style.cssText = 'width:100%;height:100%;float:right';
        divElem.appendChild(divTextElem);

    var divSetElem = document.createElement('div');
        divSetElem.id = 'rmHLdivSett';
        divSetElem.style.cssText = 'width:50%;height:100%;display:none;float:left';
        divElem.appendChild(divSetElem);

    //Main settings DIV
    var formElem = document.createElement('div');
        formElem.id = 'rmHLform';
        formElem.style.cssText = 'width:55%;height:100%;background-color:white;padding:15px;float:left;border-left:1px solid black;border-top:1px solid black';
        divSetElem.appendChild(formElem);

    //Kindle settings DIV
    var divKindle = document.createElement('div');
        divKindle.id = 'rmHLdivKindle';
        divKindle.style.cssText = 'width:45%;height:100%;background-color:white;padding:15px;float:left;border-top:1px solid black';
        divSetElem.appendChild(divKindle);

    var labelElem = createNewElement('label','Highlighter Link #Tag','rmHLtb','font-size:12px;line-height:normal;color:black;font-weight:bold;display:inline-block',formElem,'','');

    if(getPage.includes('read.amazon.com/notebook'))
    {
        var butExtractKindle = createNewElement('button','Get Kindle Highlights','','background-color:black;color:white;border-color:white;margin-left:10px;font-size:12px;line-height:normal;border-color:white;border-width:1px;border-style:solid;cursor:pointer;padding:5px;float:right',formElem,'rmHLkindle','rmHLkindle');

        butExtractKindle.addEventListener("click", function(){
            kindleClickEvent = 1;
            document.execCommand('cut');
        });
    }

    var butClearAll = createNewElement('button','Clear All Highlights','','background-color:black;color:white;border-color:white;margin-left:15px;font-size:12px;line-height:normal;border-color:white;border-width:1px;border-style:solid;cursor:pointer;padding:5px;float:right',formElem,'rmHLclear','rmHLclear');

    butClearAll.addEventListener("click", function(){
        removeAllHighlights();
    });

    formElem.appendChild(document.createElement('br'));
    var tbElem = createNewElement('input',pageRef,'','padding-left:5px;font-size:12px;line-height:normal;border-color:black;border-width:1px;border-style:solid',formElem,'rmHLtb','rmHLtb');
    tbElem.placeholder = "#[[Roam-Highlights]]";

    if(getPage.includes('read.amazon.com/notebook'))
    {
        //Text box for Kindle-highlights tag
        var labelKindle4 = createNewElement('label','Highlights #Tag: ','rmHLkingleTb1','font-size:12px;line-height:normal;color:black;font-weight:bold;display:inline;margin-right:5px;vertical-align:middle;padding:0px',divKindle,'','');
        //divKindle.appendChild(document.createElement('br'));
        var tbKindle1 = createNewElement('input',kindleHLref,'','padding-left:5px;font-size:12px;line-height:normal;border-color:black;border-width:1px;border-style:solid;width:60%',divKindle,'rmHLkingleTb1','rmHLkingleTb1');
        tbKindle1.placeholder = "#[[Kindle-Highlights]]";

        divKindle.appendChild(document.createElement('br'));
        divKindle.appendChild(document.createElement('br'));
        var labelKindle1 = createNewElement('label','Include:','','margin-right:10px;margin-left:0px;font-size:12px;line-height:normal;color:black;font-weight:bold;display:inline-block',divKindle,'','');

        var cbElem4 = createNewElement('checkbox','','','vertical-align:inherit;font-size:12px;line-height:normal;cursor:pointer',divKindle,'rmHLcbLoc','rmHLcbLoc');
        if(bLocation){cbElem4.checked = true;}else{cbElem4.checked = false;}

        var labelKindle3 = createNewElement('label','Location','rmHLcbLoc','margin-left:5px;font-size:12px;line-height:normal;color:black;font-weight:bold;display:inline-block',divKindle,'','');

        var cbElem3 = createNewElement('checkbox','','','vertical-align:inherit;font-size:12px;line-height:normal;margin-left:15px;cursor:pointer',divKindle,'rmHLcbHlColor','rmHLcbHlColor');
        if(bColor){cbElem3.checked = true;}else{cbElem3.checked = false;}

        var labelKindle2 = createNewElement('label','HL Color','rmHLcbHlColor','margin-left:5px;font-size:12px;line-height:normal;color:black;font-weight:bold;display:inline-block',divKindle,'','');

        var cbElem5 = createNewElement('checkbox','','','vertical-align:inherit;font-size:12px;line-height:normal;margin-left:15px;cursor:pointer',divKindle,'rmHLcbHlColorLink','rmHLcbHlColorLink');
        if(bColorRef){cbElem5.checked = true;}else{cbElem5.checked = false;}

        var labelKindle5 = createNewElement('label','HL Color #[[Ref]]','rmHLcbHlColorLink','margin-left:5px;font-size:12px;line-height:normal;color:black;font-weight:bold;display:inline-block',divKindle,'','');

        //Selection combobox for where to have the HL Color in relation to the actual highlight
        divKindle.appendChild(document.createElement('br'));
        divKindle.appendChild(document.createElement('br'));
        var labelKindle6 = createNewElement('label','Structure of Highlights, Color, Location and Notes','rmHLkindleSel','font-size:12px;line-height:normal;color:black;font-weight:bold;display:inline-block',divKindle,'','');
        divKindle.appendChild(document.createElement('br'));

        var selKindle = createNewElement('select','','','padding:3px;font-size:12px;line-height:normal;border-color:black;border-width:1px;border-style:solid;cursor:pointer',divKindle,'rmHLkindleSel','rmHLkindleSel');
        selKindle.options.add( new Option("HL > -Color -Loc -Note","0", true, true) );
        selKindle.options.add( new Option("HL #Color > -Loc -Note","1") );
        selKindle.options.add( new Option("Color > -HL -Loc -Note","2") );
        selKindle.options.add( new Option("Color > HL > -Loc -Note","3") );
        selKindle.value = kindleHLstructure;

        divKindle.appendChild(document.createElement('br'));
        divKindle.appendChild(document.createElement('br'));
        var labelKindle7 = createNewElement('label','HL = Highlights from Kindle<br>> = Nesting child bullet<br>- = Bullet/block<br>#Color --> Example: #[[Yellow highlight]]','','font-size:12px;line-height:normal;color:black;font-weight:normal;display:inline-block',divKindle,'','');

        divKindle.appendChild(document.createElement('br'));
        var labelKindle8 = createNewElement('label','*Must Save changes before "Getting Highlights"','','font-size:12px;line-height:normal;color:red;font-weight:bold;display:inline-block',divKindle,'','');
    }

    formElem.appendChild(document.createElement('br'));
    formElem.appendChild(document.createElement('br'));
    var labelElem2 = createNewElement('label','Page Title for Alias Link','rmHLta2','font-size:12px;line-height:normal;color:black;font-weight:bold;display:inline-block',formElem,'','');

    var cbElemPgTitle = createNewElement('checkbox','','','vertical-align:inherit;margin-left:10px;font-size:12px;line-height:normal;cursor:pointer',formElem,'rmHLcbPgTitle','rmHLcbPgTitle');
    cbElemPgTitle.checked = true;
    //if(bPgTitle){cbElemPgTitle.checked = true;}else{cbElemPgTitle.checked = false;}

    var tbElemPgTrunc = createNewElement('input',pageTruncate,'','padding-left:0px;text-align:center;width:15px;margin-left:20%;margin-right:0px;margin-bottom:2px;font-size:12px;line-height:normal;border-color:black;border-width:1px;border-style:solid',formElem,'rmHLtbPgTrunc','rmHLtbPgTrunc');
    var labelElemPgTruncate = createNewElement('label','Truncate','rmHLtbPgTrunc','font-size:12px;line-height:normal;color:black;font-weight:bold;display:inline-block;margin-left:5px',formElem,'','');

    formElem.appendChild(document.createElement('br'));
    var textElem2 = createNewElement('textarea',pageTitle,'','width:90%;font-size:12px;line-height:normal;border-color:black;border-width:1px;border-style:solid;padding:5px',formElem,'rmHLta2','rmHLta2');
    textElem2.rows = 3;

    //5 Options for handling line breaks within each selected highlight by the user (a few words, or a few paragraphs... whatever user selects as a single highlight)
        //Set to 0 (Default) if you want line breaks (e.g., each paragraph) to create new bullets at same hierarchy/level
        //Set to 1 if you want line breaks (e.g., each paragraph) to create new bullets, but nested underneath the first "paragraph" in the highlight
        //Set to 2 if you want line breaks (e.g., each paragraph) to be in same bullet with Ctrl + Shift "soft line breaks" like Ctrl+Shift+V does in browser pasting
        //Set to 3 if you want line breaks (e.g., each paragraph) to be replaced with a "space" and simply concatenated into a single bullet and without any line breaks
    formElem.appendChild(document.createElement('br'));
    formElem.appendChild(document.createElement('br'));
    var labelElem3 = createNewElement('label','How to handle Line Breaks within each Highlight','rmHLsel','font-size:12px;line-height:normal;color:black;font-weight:bold;display:inline-block',formElem,'','');

    formElem.appendChild(document.createElement('br'));
    var selElem = createNewElement('select','','','padding:3px;font-size:12px;line-height:normal;border-color:black;border-width:1px;border-style:solid;cursor:pointer',formElem,'rmHLsel','rmHLsel');
    selElem.options.add( new Option("[DEFAULT] New bullets same level","0", true, true) );
    selElem.options.add( new Option("Nest under first Line Break","1") );
    selElem.options.add( new Option("Ctrl + Shift + V same bullet","2") );
    selElem.options.add( new Option("Replace with single space","3") );
    selElem.options.add( new Option("Remove line breaks","4") );
    selElem.value = sameBlock;

    formElem.appendChild(document.createElement('br'));
    formElem.appendChild(document.createElement('br'));
    var labelElem7 = createNewElement('label','Side Window Size (width minimum: 300px or 15%)','','font-size:12px;line-height:normal;color:black;font-weight:bold;display:inline-block',formElem,'','');

    formElem.appendChild(document.createElement('br'));
    var labelElem8 = createNewElement('label','W:','rmHLtbSize','font-size:12px;line-height:normal;color:black;font-weight:bold;display:inline-block',formElem,'','');

    var tbSizeElem = createNewElement('input',sideWidth,'','padding-left:5px;text-align:center;width:50px;margin-left:5px;margin-right:5px;font-size:12px;line-height:normal;border-color:black;border-width:1px;border-style:solid',formElem,'rmHLtbSize','rmHLtbSize');
    tbSizeElem.placeholder = "17%";

    var labelElem9 = createNewElement('label','H:','rmHLtbSize2','font-size:12px;line-height:normal;color:black;font-weight:bold;display:inline-block',formElem,'','');

    var tbSizeElem2 = createNewElement('input',sideHeight,'','padding-left:5px;text-align:center;width:50px;margin-left:5px;font-size:12px;line-height:normal;border-color:black;border-width:1px;border-style:solid',formElem,'rmHLtbSize2','rmHLtbSize2');
    tbSizeElem2.placeholder = "20%";

    formElem.appendChild(document.createElement('br'));
    formElem.appendChild(document.createElement('br'));
    var labelElemBold = createNewElement('label','Bold:','rmHLtbBold','font-size:12px;line-height:normal;color:black;font-weight:bold;display:inline-block',formElem,'','');
    var tbElemBold = createNewElement('input',formatBold,'','padding-left:0px;text-align:center;width:25px;margin-left:5px;margin-right:0px;font-size:12px;line-height:normal;border-color:black;border-width:1px;border-style:solid',formElem,'rmHLtbBold','rmHLtbBold');
    //tbElemBold.placeholder = '**';

    var labelElemItalic = createNewElement('label','Italics:','rmHLtbItalic','font-size:12px;line-height:normal;margin-left:5px;color:black;font-weight:bold;display:inline-block',formElem,'','');
    var tbElemItalic = createNewElement('input',formatItalics,'','padding-left:0px;text-align:center;width:25px;margin-left:5px;font-size:12px;line-height:normal;border-color:black;border-width:1px;border-style:solid',formElem,'rmHLtbItalic','rmHLtbItalic');
    //tbElemItalic.placeholder = '__';

    var labelElemCode = createNewElement('label','Code:','rmHLtbCode','font-size:12px;line-height:normal;margin-left:5px;color:black;font-weight:bold;display:inline-block',formElem,'','');
    var tbElemCode = createNewElement('input',formatCode,'','padding-left:0px;text-align:center;width:25px;margin-left:5px;font-size:12px;line-height:normal;border-color:black;border-width:1px;border-style:solid',formElem,'rmHLtbCode','rmHLtbCode');
    //tbElemCode.placeholder = '`';

    var labelElemHeaders = createNewElement('label','Headers:','rmHLcbHeaders','font-size:12px;line-height:normal;margin-left:5px;color:black;font-weight:bold;display:inline-block',formElem,'','');
    var cbElemHeaders = createNewElement('checkbox','','','vertical-align:inherit;margin-left:10px;font-size:12px;line-height:normal;cursor:pointer',formElem,'rmHLcbHeaders','rmHLcbHeaders');
    if(bHeaders){cbElemHeaders.checked = true;}else{cbElemHeaders.checked = false;}

    formElem.appendChild(document.createElement('br'));
    formElem.appendChild(document.createElement('br'));
    var labelElemBullet = createNewElement('label','Bullets:','rmHLtbBullet','font-size:12px;line-height:normal;color:black;font-weight:bold;display:inline-block',formElem,'','');
    var tbElemBullet = createNewElement('input',formatBullets,'','padding-left:0px;text-align:center;width:25px;margin-left:5px;margin-right:0px;font-size:12px;line-height:normal;border-color:black;border-width:1px;border-style:solid',formElem,'rmHLtbBullet','rmHLtbBullet');
    //tbElemBullet.placeholder = '- ';

    var labelElemIndents = createNewElement('label','Indent:','rmHLcbIndents','font-size:12px;line-height:normal;margin-left:15px;color:black;font-weight:bold;display:inline-block',formElem,'','');
    var cbElemIndents = createNewElement('checkbox','','','vertical-align:inherit;margin-left:10px;font-size:12px;line-height:normal;cursor:pointer',formElem,'rmHLcbIndents','rmHLcbIndents');
    if(bIndents){cbElemIndents.checked = true;}else{cbElemIndents.checked = false;}

    formElem.appendChild(document.createElement('br'));
    formElem.appendChild(document.createElement('br'));
    var labelElem4 = createNewElement('label','Show the Clipboard in:','','margin-right:20px;font-size:12px;line-height:normal;color:black;font-weight:bold;display:inline-block',formElem,'','');

    var cbElem1 = createNewElement('checkbox','','','vertical-align:inherit;font-size:12px;line-height:normal;cursor:pointer',formElem,'rmHLcbType1','rmHLcbType1');
    cbElem1.checked = true;

    var labelElem5 = createNewElement('label','Plain Text','rmHLcbType1','margin-left:5px;font-size:12px;line-height:normal;color:black;font-weight:bold;display:inline-block',formElem,'','');

    var cbElem2 = createNewElement('checkbox','','','vertical-align:inherit;margin-left:20px;font-size:12px;line-height:normal;cursor:pointer',formElem,'rmHLcbType2','rmHLcbType2');
    cbElem2.checked = false;

    var labelElem6 = createNewElement('label','HTML','rmHLcbType2','margin-left:5px;font-size:12px;line-height:normal;color:black;font-weight:bold;display:inline-block',formElem,'','');

    formElem.appendChild(document.createElement('br'));
    formElem.appendChild(document.createElement('br'));

    var labelElemDefaults = createNewElement('label','Reset to Default Settings for:','rmHLdefaultsSel','font-size:12px;line-height:normal;color:black;font-weight:bold;display:inline-block',formElem,'','');
    formElem.appendChild(document.createElement('br'));

    var selDefaults = createNewElement('select','','','padding:3px;font-size:12px;line-height:normal;border-color:black;border-width:1px;border-style:solid;cursor:pointer',formElem,'rmHLdefaultsSel','rmHLdefaultsSel');
    selDefaults.options.add( new Option("Roam Research","0", true, true) );
    selDefaults.options.add( new Option("Obsidian","1") );

    var butReset = createNewElement('button','SET','','background-color:black;color:white;border-color:white;margin-left:5px;font-size:12px;line-height:normal;border-color:white;border-width:1px;border-style:solid;cursor:pointer;padding:5px',formElem,'rmHLreset','rmHLreset');

    butReset.addEventListener("click", function(){
        var divElemMain = document.getElementById("rmHLmain");
        var tbElem = document.getElementById("rmHLtb");
        var textElem2 = document.getElementById("rmHLta2");
        var selElem = document.getElementById("rmHLsel");
        var tbSizeW = document.getElementById("rmHLtbSize");
        var tbSizeH = document.getElementById("rmHLtbSize2");
        var tbElemBold = document.getElementById("rmHLtbBold");
        var tbElemItalic = document.getElementById("rmHLtbItalic");
        var tbElemCode = document.getElementById("rmHLtbCode");
        var cbElemHeaders = document.getElementById("rmHLcbHeaders")
        var tbElemBullet = document.getElementById("rmHLtbBullet");
        var cbElemIndents = document.getElementById("rmHLcbIndents")
        var cbElem1 = document.getElementById("rmHLcbType1")
        var cbElem2 = document.getElementById("rmHLcbType2")
        var tbElemPgTrunc = document.getElementById("rmHLtbPgTrunc");
        var cbElemPgTitle = document.getElementById("rmHLcbPgTitle");
        //Kindle settings
        var tbKinHLref = document.getElementById("rmHLkingleTb1");
        var cbLoc = document.getElementById("rmHLcbLoc");
        var cbCol = document.getElementById("rmHLcbHlColor");
        var cbColRef = document.getElementById("rmHLcbHlColorLink");
        var selKindle = document.getElementById("rmHLkindleSel");

        var selDefaults = document.getElementById("rmHLdefaultsSel");

        switch (Number(selDefaults.value))
        {
            case 0:
                //Roam
                tbElem.value = '#[[Roam-Highlights]]';
                tbElemBold.value = '**';
                tbElemItalic.value = '__';
                tbElemCode.value = '`';
                cbElemHeaders.checked = true;
                tbElemBullet.value = '- ';
                cbElemIndents.checked = true;
                //Kindle settings
                if(tbKinHLref != null){tbKinHLref.value = '#[[Kindle-Highlights]]';}
                break;
            case 1:
                //Obsidian
                tbElem.value = '[[Obsidian-Highlights]]';
                tbElemBold.value = '**';
                tbElemItalic.value = '_';
                tbElemCode.value = '`';
                cbElemHeaders.checked = false;
                tbElemBullet.value = '';
                cbElemIndents.checked = false;
                //Kindle settings
                if(tbKinHLref != null){tbKinHLref.value = '[[Kindle-Highlights]]';}
                break;
        }

        selElem.value = 0;
        tbSizeW.value = '20%';
        tbSizeH.value = '30%';
        cbElem1.checked = true;
        cbElem2.checked = false;
        tbElemPgTrunc.value = '';
        if(tbKinHLref != null)
        {
            cbLoc.checked = true;
            cbCol.checked = true;
            cbColRef.checked = true;
            selKindle.value = 0;
        }
        cbElemPgTitle.checked = true;

        pageRef = tbElem.value;
        pageTitle = textElem2.value;
        sameBlock = Number(selElem.value);
        sideWidth = tbSizeW.value;
        sideHeight = tbSizeH.value;
        formatBold = tbElemBold.value;
        formatItalics = tbElemItalic.value;
        formatCode = tbElemCode.value;
        bHeaders = cbElemHeaders.checked;
        formatBullets = tbElemBullet.value;
        bIndents = cbElemIndents.checked;
        pageTruncate = tbElemPgTrunc.value;
        //Kindle settings
        if(tbKinHLref != null)
        {
            kindleHLref = tbKinHLref.value;
            bLocation = cbLoc.checked;
            bColor = cbCol.checked;
            bColorRef = cbColRef.checked;
            kindleHLstructure = Number(selKindle.value);
        }

        //Save to local storage to keep persistent
        setLocalStorageValue("pageRef", pageRef);
        setLocalStorageValue("sameBlock", sameBlock);
        setLocalStorageValue("sideWidth", sideWidth);
        setLocalStorageValue("sideHeight", sideHeight);
        setLocalStorageValue("formatBold", formatBold);
        setLocalStorageValue("formatItalics", formatItalics);
        setLocalStorageValue("formatCode", formatCode);
        setLocalStorageValue("bHeaders", bHeaders);
        setLocalStorageValue("formatBullets", formatBullets);
        setLocalStorageValue("bIndents", bIndents);
        setLocalStorageValue("pageTruncate", pageTruncate);
        //Kindle settings
        setLocalStorageValue("kindleHLref", kindleHLref);
        setLocalStorageValue("bLocation", bLocation);
        setLocalStorageValue("bColor", bColor);
        setLocalStorageValue("bColorRef", bColorRef);
        setLocalStorageValue("kindleHLstructure", kindleHLstructure);

        //Force the "cut" event because the clipboardData event setData doesn't work unless activated from a cut/copy event.
        //We already have the "cut" event listener set to run our code, so this should activate it
        clickEvent = 1;
        document.execCommand('cut');
    });

    formElem.appendChild(document.createElement('br'));
    formElem.appendChild(document.createElement('br'));

    var butSave = createNewElement('button','Save','','background-color:Blue;color:white;border-color:white;font-size:12px;line-height:normal;border-color:white;border-width:1px;border-style:solid;cursor:pointer;padding:5px',formElem,'rmHLsave','rmHLsave');

    butSave.addEventListener("click", function(){
        var divElemMain = document.getElementById("rmHLmain");
        var tbElem = document.getElementById("rmHLtb");
        var textElem2 = document.getElementById("rmHLta2");
        var selElem = document.getElementById("rmHLsel");
        var tbSizeW = document.getElementById("rmHLtbSize");
        var tbSizeH = document.getElementById("rmHLtbSize2");
        var tbElemBold = document.getElementById("rmHLtbBold");
        var tbElemItalic = document.getElementById("rmHLtbItalic");
        var tbElemCode = document.getElementById("rmHLtbCode");
        var cbElemHeaders = document.getElementById("rmHLcbHeaders")
        var tbElemBullet = document.getElementById("rmHLtbBullet");
        var cbElemIndents = document.getElementById("rmHLcbIndents")
        var tbElemPgTrunc = document.getElementById("rmHLtbPgTrunc");
        //Kindle settings
        var tbKinHLref = document.getElementById("rmHLkingleTb1");
        var cbLoc = document.getElementById("rmHLcbLoc");
        var cbCol = document.getElementById("rmHLcbHlColor");
        var cbColRef = document.getElementById("rmHLcbHlColorLink");
        var selKindle = document.getElementById("rmHLkindleSel");

        var butSave = document.getElementById("rmHLsave");

        pageRef = tbElem.value;
        pageTitle = textElem2.value;
        sameBlock = Number(selElem.value);
        sideWidth = tbSizeW.value;
        sideHeight = tbSizeH.value;
        formatBold = tbElemBold.value;
        formatItalics = tbElemItalic.value;
        formatCode = tbElemCode.value;
        bHeaders = cbElemHeaders.checked;
        formatBullets = tbElemBullet.value;
        bIndents = cbElemIndents.checked;
        pageTruncate = tbElemPgTrunc.value;
        //Kindle settings
        if(tbKinHLref != null)
        {
            kindleHLref = tbKinHLref.value;
            bLocation = cbLoc.checked;
            bColor = cbCol.checked;
            bColorRef = cbColRef.checked;
            kindleHLstructure = Number(selKindle.value);
        }

        //Save to local storage to keep persistent
        setLocalStorageValue("pageRef", pageRef);
        setLocalStorageValue("sameBlock", sameBlock);
        setLocalStorageValue("sideWidth", sideWidth);
        setLocalStorageValue("sideHeight", sideHeight);
        setLocalStorageValue("formatBold", formatBold);
        setLocalStorageValue("formatItalics", formatItalics);
        setLocalStorageValue("formatCode", formatCode);
        setLocalStorageValue("bHeaders", bHeaders);
        setLocalStorageValue("formatBullets", formatBullets);
        setLocalStorageValue("bIndents", bIndents);
        setLocalStorageValue("pageTruncate", pageTruncate);
        //Kindle settings
        setLocalStorageValue("kindleHLref", kindleHLref);
        setLocalStorageValue("bLocation", bLocation);
        setLocalStorageValue("bColor", bColor);
        setLocalStorageValue("bColorRef", bColorRef);
        setLocalStorageValue("kindleHLstructure", kindleHLstructure);

        //Force the "cut" event because the clipboardData event setData doesn't work unless activated from a cut/copy event.
        //We already have the "cut" event listener set to run our code, so this should activate it
        clickEvent = 1;
        document.execCommand('cut');
    });

    formElem.appendChild(document.createElement('br'));
    formElem.appendChild(document.createElement('br'));
    var spanElem1 = createNewElement('span','Important Links and Resources (v' + verNum + ')','','font-weight:bold;color:red;font-size:12px;line-height:normal;display:inline-block',formElem,'','');

    formElem.appendChild(document.createElement('br'));
    formElem.appendChild(document.createElement('br'));
    var link1 = createNewElement('a','Detailed Instructions and Shortcuts','','font-size:12px;line-height:normal',formElem,'','');
    link1.href = 'https://github.com/GitMurf/roam-highlighter#how-to-use-the-highlighter';

    formElem.appendChild(document.createElement('br'));
    var link2 = createNewElement('a','Demos and Videos','','font-size:12px;line-height:normal',formElem,'','');
    link2.href = 'https://github.com/GitMurf/roam-highlighter#demo-1---activate-the-highlighter-extension-and-perform-a-simple-highlight';

    formElem.appendChild(document.createElement('br'));
    var link3 = createNewElement('a','Report a Bug/Issue','','font-size:12px;line-height:normal',formElem,'','');
    link3.href = 'https://github.com/GitMurf/roam-highlighter/issues/new';

    formElem.appendChild(document.createElement('br'));
    var link4 = createNewElement('a','Submit an Idea or Feature Request','','font-size:12px;line-height:normal',formElem,'','');
    link4.href = 'https://github.com/GitMurf/roam-highlighter/issues/new';

    formElem.appendChild(document.createElement('br'));
    var link5 = createNewElement('a','Ask a Question','','font-size:12px;line-height:normal',formElem,'','');
    link5.href = 'https://github.com/GitMurf/roam-highlighter/issues/new';

    formElem.appendChild(document.createElement('br'));
    var link6 = createNewElement('a','Kindle Notes & Highlights','','font-size:12px;line-height:normal',formElem,'','');
    link6.href = 'https://read.amazon.com/notebook';

    var butMax = createNewElement('button','Expand','','float:right;background-color:black;color:white;border-color:white;width:25%;font-size:12px;line-height:normal;border-color:white;border-width:1px;border-style:solid;cursor:pointer;padding:5px',divButtonsElem,'rmHLexpand','rmHLexpand');

    butMax.addEventListener("click", function(){
        var divElemMain = document.getElementById("rmHLmain");
        var divTextElem = document.getElementById("rmHLdivText");
        var butMax = document.getElementById("rmHLexpand");
        var divSetElem = document.getElementById("rmHLdivSett");

        if(butMax.innerHTML == "Expand")
        {
            divElemMain.style.width = "90%";
            divElemMain.style.height = "80%";
            butMax.innerHTML = 'Shrink';
            divElemMain.style.opacity = "1";
        }
        else
        {
            if(divSetElem.style.display == "flex")
            {
                divTextElem.style.width = "100%";
                divSetElem.style.display = "none";
            }

            divElemMain.style.width = sideWidth;
            divElemMain.style.height = sideHeight;

            butMax.innerHTML = 'Expand';
            divElemMain.style.opacity = "0.8";
        }
    });

    var butHide = createNewElement('button','Hide','','float:right;background-color:black;color:white;border-color:white;width:25%;font-size:12px;line-height:normal;border-color:white;border-width:1px;border-style:solid;cursor:pointer;padding:5px',divButtonsElem,'','');

    butHide.addEventListener("click", function(){
        var divElemMain = document.getElementById("rmHLmain");
        divElemMain.style.display = "none";
        //divElemMain.style.display = "block";
        showWindow = 0;
        setLocalStorageValue("showWindow", showWindow);
    });

    var butWrap = createNewElement('button','Wrap','','float:right;background-color:black;color:white;border-color:white;width:25%;font-size:12px;line-height:normal;border-color:white;border-width:1px;border-style:solid;cursor:pointer;padding:5px',divButtonsElem,'rmHLwrap','rmHLwrap');

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

    var butSett = createNewElement('button','Settings','','float:right;background-color:black;color:white;border-color:white;width:25%;font-size:12px;line-height:normal;border-color:white;border-width:1px;border-style:solid;cursor:pointer;padding:5px',divButtonsElem,'rmHLsettings','rmHLsettings');

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
            divSetElem.style.display = "flex";
            tbElem.value = pageRef;
            textElem2.value = pageTitle;
            selElem.value = sameBlock;
            if(butMax.innerHTML == "Expand"){butMax.click();}
        }
        else
        {
            //divElemMain.style.opacity = "0.8";
            divTextElem.style.width = "100%";
            divSetElem.style.display = "none";
            //butMax.click();
        }
    });

    var textInput = createNewElement('textarea','','','width:100%;height:100%;background-color:white;color:black;font-weight:bold;white-space:pre;float:right;padding-left:5px;padding-right:1px;font-size:12px;line-height:normal;border-color:black;border-width:1px;border-style:solid',divTextElem,'rmHLtextArea','textAreaInput');
    textInput.value = `
Roam-highlighter Shortcut Keys (v${verNum})
*All settings are now saved tab to tab, session to session

[ALT + X]

\t- Activate Extension and Show/Hide Side Window

[Ctrl + X]

\t- Highlights selected text
\t- To remove part of a highlight, select text and press [Ctrl + X]

[Alt + Click]

\t- Removes an entire highlight

[ALT + Q]

\t- Remove all highlights on the page

[ALT + A]

\t- Makes selected highlighted a "header"; highlights following will nest until another highlight is selected as a "header"

[Double-Click] a Single Word (has to be highlighted already)

\t- Adds [[Double Brackets]] for Roam "Page Linking"

[ALT + Z] (must already be highlighted)

\t- Adds [[Double Brackets]] around selection for Roam "Page Linking"
`;

    function getKindleHighlights(event)
    {
        if(pageTitle == 'Kindle: Your Notes and Highlights')
        {
            //window.alert('Ready to extract notes');

            var myHighlights = document.querySelectorAll('.a-size-base-plus.a-color-base, .kp-notebook-metadata, div#annotations .kp-notebook-cover-image-border');
            var textString = "";
            var htmlString = "";
            var tmpString = "";
            var hlLocation = "";
            var hlColor = "";
            var coverImg = "";
            var amazonLink = "";
            var hlCtr = 0;

            var initIndentAmount = '    ';
            var cbElemPgTitle = document.getElementById("rmHLcbPgTitle");
            if(cbElemPgTitle.checked == false){initIndentAmount = '';}

            var indentAmount = '    ';
            if(bIndents == false)
            {
                indentAmount = '';
                initIndentAmount = '';
            }
            //var titleElem = document.getElementById('');
            //var bookTitle = "";
            for(var i = 0; i < myHighlights.length; i++)
            {
                var curElement = myHighlights.item(i);
                var curText = curElement.innerText.toString().trim();
                //curText = curText.trim().replace(/(\r\n|\n|\r)/gm," ");
                if(curText != "" || curElement.nodeName == 'IMG')
                {
                    if(curElement.nodeName == 'H3') //Title
                    {
                        //Hack right now until get a real checkbox for kindle specific nesting in parent title
                        if(cbElemPgTitle.checked)
                        {
                            if(bIndents){textString += curText + '\n';}
                            htmlString += '<li>' + curText + '</li><ul>';
                        }
                        else
                        {
                            htmlString += '<ul>';
                        }

                        textString += initIndentAmount + formatBullets + 'Title: ' + curText + '\n';
                        htmlString += '<li>Title:: ' + curText + '</li>';
                    }
                    if(curElement.nodeName == 'P' && curElement.classList.contains("a-color-secondary")) //Author
                    {
                        textString += initIndentAmount + formatBullets + 'Author: ' + '[[' + curText + ']]' + '\n';
                        //textString += initIndentAmount + formatBullets + 'Author: ' + curText + '\n';
                        textString += initIndentAmount + formatBullets + 'Amazon-store: ' + amazonLink + '\n';
                        textString += initIndentAmount + formatBullets + coverImg + '\n';
                        if(formatBullets == ''){textString += '\n';}

                        htmlString += '<li>Author:: ' + '[[' + curText + ']]' + '</li>';
                        //htmlString += '<li>Author:: ' + curText + '</li>';
                        htmlString += '<li>Amazon-store:: ' + amazonLink + '</li>';
                        htmlString += '<li>' + coverImg + '</li>';

                        if(kindleHLref != '')
                        {
                            textString += initIndentAmount + formatBullets + kindleHLref + '\n';
                            if(formatBullets == ''){textString += '\n';}
                            htmlString += '<li>' + kindleHLref + '</li><ul>';
                        }
                    }
                    if(curElement.nodeName == 'IMG' && curElement.classList.contains("kp-notebook-cover-image-border")) //Cover art
                    {
                        coverImg = '![](' + curElement.src + ')';
                        //Get Amazon store link
                        var amazonLinkElem = curElement.parentElement.parentElement;
                        if(amazonLinkElem.nodeName == 'A'){amazonLink = amazonLinkElem.href;}else{amazonLink = "";}
                    }
                    if(curElement.id == 'highlight') //Highlight
                    {
                        if(hlCtr > 0)
                        {
                            if(kindleHLstructure == 3){htmlString += '</ul></ul>';}else{htmlString += '</ul>';}
                            if(formatBullets == ''){textString += '\n';}
                        }

                        switch (kindleHLstructure)
                        {
                            case 0:
                                textString += initIndentAmount + indentAmount + formatBullets + curText + '\n';
                                if(bColor){textString += initIndentAmount + indentAmount + indentAmount + formatBullets + hlColor + '\n';}
                                if(bLocation){textString += initIndentAmount + indentAmount + indentAmount + formatBullets + hlLocation + '\n';}
                                htmlString += '<li>' + curText + '</li><ul>';
                                if(bColor){htmlString += '<li>' + hlColor + '</li>';}
                                if(bLocation){htmlString += '<li>' + hlLocation + '</li>';}
                                break;
                            case 1:
                                textString += initIndentAmount + indentAmount + formatBullets + curText
                                if(bColor){textString += ' ' + hlColor + '\n';}else{textString += '\n';}
                                if(bLocation){textString += initIndentAmount + indentAmount + indentAmount + formatBullets + hlLocation + '\n';}
                                htmlString += '<li>' + curText + ' ' + hlColor + '</li><ul>';
                                if(bLocation){htmlString += '<li>' + hlLocation + '</li>';}
                                break;
                            case 2:
                                textString += initIndentAmount + indentAmount + formatBullets + hlColor + '\n';
                                textString += initIndentAmount + indentAmount + indentAmount + formatBullets + curText + '\n';
                                if(bLocation){textString += initIndentAmount + indentAmount + indentAmount + formatBullets + hlLocation + '\n';}
                                htmlString += '<li>' + hlColor + '</li><ul>';
                                htmlString += '<li>' + curText + '</li>';
                                if(bLocation){htmlString += '<li>' + hlLocation + '</li>';}
                                break;
                            case 3:
                                textString += initIndentAmount + indentAmount + formatBullets + hlColor + '\n';
                                textString += initIndentAmount + indentAmount + indentAmount + formatBullets + curText + '\n';
                                if(bLocation){textString += initIndentAmount + indentAmount + indentAmount + indentAmount + formatBullets + hlLocation + '\n';}
                                htmlString += '<li>' + hlColor + '</li><ul>';
                                htmlString += '<li>' + curText + '</li><ul>';
                                if(bLocation){htmlString += '<li>' + hlLocation + '</li>';}
                                break;
                        }

                        hlCtr++;
                    }
                    if(curElement.id == 'annotationHighlightHeader') //Highlight type and location
                    {
                        //.split("[")
                        tmpString = curText.split(" | ");
                        hlColor = tmpString[0].trim();
                        if(bColorRef){hlColor = '[[' + hlColor + ']]';}
                        hlLocation = tmpString[1].trim();
                    }
                    if(curElement.id == 'note') //Note
                    {
                        if(kindleHLstructure == 3)
                        {
                            textString += initIndentAmount + indentAmount + indentAmount + indentAmount + formatBullets + 'Note: ' + curText + '\n';
                            htmlString += '<li>Note: ' + curText + '</li>';
                        }
                        else
                        {
                            textString += initIndentAmount + indentAmount + indentAmount + formatBullets + 'Note: ' + curText + '\n';
                            htmlString += '<li>Note: ' + curText + '</li>';
                        }
                    }
                }
            }

            if(kindleHLstructure == 3){htmlString += '</ul></ul></ul></ul>';}else{htmlString += '</ul></ul></ul>';}
            var clipboardDataEvt = event.clipboardData;
            clipboardDataEvt.setData('text/plain', textString);
            clipboardDataEvt.setData('text/html', htmlString);
            var textInput = document.getElementById("rmHLtextArea");
            //htmlConcatHighlights = htmlConcatHighlights.split("<ul>").join('\n<ul>').split("<li>").join('\n\t<li>') //.split("</ul>").join('\n</ul>').split("</li>").join('\n</li>');

            textInput.value = textString;
        }
        else
        {
            window.alert('Not on kindle page. Go to: https://read.amazon.com/notebook');
        }
    }

    function removeAllHighlights()
    {
        var prevText = "", nextText = "";
        var elemHighlights = document.querySelectorAll(".roamJsHighlighter");
        for (var i = 0; i < elemHighlights.length; i++)
        {
            var curElement = elemHighlights.item(i);

            //Check the previous and next siblings (i.e., the element before and after our highlight SPAN)
            if(curElement.previousSibling !== null){prevText = curElement.previousSibling.textContent;}
            if(curElement.nextSibling !== null){nextText = curElement.nextSibling.textContent;}
            if(prevText.length > 0)
            {
                //If there is a previous sibling, then will append the highlighted text to that element to try and get HTML back to way it was before highlighter
                if(nextText.length > 0)
                {
                    //If there is ALSO a next sibling then that means the highlight was in the middle of a paragraph etc.
                    //We will then want to merge the highlighted text, and the prevoius and next siblings all into one element to get back to way it was before highlighter
                    var newText = prevText + curElement.innerText + nextText;
                    curElement.previousSibling.textContent = newText;
                    curElement.nextSibling.remove();
                }else {
                    var newText = prevText + curElement.innerText;
                    curElement.previousSibling.textContent = newText;
                }
            }
            else
            {
                var newText = curElement.innerText + nextText;
                curElement.nextSibling.textContent = newText;
            }

            // remove the empty element that had the highlights before
            curElement.remove();
        }

        //Force the "cut" event because the clipboardData event setData doesn't work unless activated from a cut/copy event.
        //We already have the "cut" event listener set to run our code, so this should activate it
        clickEvent = 1;
        document.execCommand('cut');
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
                curElement.previousSibling.textContent = newText;
                curElement.nextSibling.remove();
            }else {
                var newText = prevText + curElement.innerText;
                curElement.previousSibling.textContent = newText;
            }
        }else {
            var newText = curElement.innerText + nextText;
            curElement.nextSibling.textContent = newText;
        }

        // remove the empty element that had the highlights before
        curElement.remove();
    }

    //This function adds Roam markdown formatting based on Element type (e.g., <STRONG> --> **text**)
    function convertFormat(eachHighlight, elemSpan) {
        var parNodeName = elemSpan.parentElement.nodeName;
        var parElemText = elemSpan.parentElement.innerText;

        var parParNodeName = elemSpan.parentElement.parentElement.nodeName;
        var parParElemText = "";
        if(parParNodeName != 'DIV' && parParNodeName != 'BODY' && parParNodeName != 'ARTICLE'){parParElemText = elemSpan.parentElement.parentElement.innerText;}

        var parParParNodeName = elemSpan.parentElement.parentElement.parentElement.nodeName;
        var parParParElemText = "";
        if(parParParNodeName != 'DIV' && parParParNodeName != 'BODY' && parParParNodeName != 'ARTICLE'){parParParElemText = elemSpan.parentElement.parentElement.parentElement.innerText;}

        var parParParParNodeName = elemSpan.parentElement.parentElement.parentElement.parentElement.nodeName;
        var parParParParElemText = "";
        if(parParParParNodeName != 'DIV' && parParParParNodeName != 'BODY' && parParParParNodeName != 'ARTICLE'){parParParParElemText = elemSpan.parentElement.parentElement.parentElement.parentElement.innerText;}

        var foundHeader = elemSpan.getAttribute('hlheader'); //Red text selected by user
        var bFoundHeader = false;
        var bFoundUlBullet = false;
        //debugMode = 1;
        if(debugMode != 0)
        {
            writeToConsole('');
            writeToConsole('eachHighlight: ' + eachHighlight);
            writeToConsole('parNodeName: ' + parNodeName);
            writeToConsole('parElemText: ' + parElemText);
            writeToConsole('parParNodeName: ' + parParNodeName);
            writeToConsole('parParElemText: ' + parParElemText);
            writeToConsole('parParParNodeName: ' + parParParNodeName);
            writeToConsole('parParParElemText: ' + parParParElemText);
            writeToConsole('parParParParNodeName: ' + parParParParNodeName);
            writeToConsole('parParParParElemText: ' + parParParParElemText);
        }
        //debugMode = 0;

        var origEachHighlight = eachHighlight;

        if(parNodeName == "STRONG" || parNodeName == "B"){eachHighlight = formatBold + eachHighlight + formatBold;}
        if(parNodeName == "EM" || parNodeName == "U"){eachHighlight = formatItalics + eachHighlight + formatItalics;}
        if(parNodeName == "CODE"){eachHighlight = formatCode + eachHighlight + formatCode;}
        //if(origEachHighlight == parElemText || origEachHighlight == parParElemText || origEachHighlight == parParParElemText)
        //{
            if(parNodeName == "H1" || parNodeName == "H2" || parNodeName == "H3" || parParNodeName == "H1" || parParNodeName == "H2" || parParNodeName == "H3" || parParParNodeName == "H1" || parParParNodeName == "H2" || parParParNodeName == "H3")
            {
                bFoundHeader = true;
                if(parNodeName == "H1" || parParNodeName == "H1" || parParParNodeName == "H1"){eachHighlight = '||h1||' + eachHighlight;}
                if(parNodeName == "H2" || parParNodeName == "H2" || parParParNodeName == "H2"){eachHighlight = '||h2||' + eachHighlight;}
                if(parNodeName == "H3" || parParNodeName == "H3" || parParParNodeName == "H3"){eachHighlight = '||h3||' + eachHighlight;}
            }
        //}

        //Adding indent for bullet list sub bullets when there is no "other" element directly around text like Bold/Italics etc.
        if(parNodeName == 'LI' && (parParNodeName == 'UL' || parParNodeName == 'OL'))
        {
            bFoundUlBullet == true;
            var parParParParParNodeName = elemSpan.parentElement.parentElement.parentElement.parentElement.parentElement.nodeName;
            var parParParParParParNodeName = elemSpan.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.nodeName;

            var newParElement = elemSpan.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
            if(newParElement != null)
            {
                var parParParParParParParNodeName = newParElement.nodeName;

                newParElement = elemSpan.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
                if(newParElement != null)
                {
                    var parParParParParParParParNodeName = newParElement.nodeName;
                    newParElement = elemSpan.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
                    if(newParElement != null){var parParParParParParParParParNodeName = newParElement.nodeName;}else{var parParParParParParParParParNodeName = "NULL";}
                }
                else
                {
                    var parParParParParParParParNodeName = "NULL";
                    var parParParParParParParParParNodeName = "NULL";
                }
            }
            else
            {
                var parParParParParParParNodeName = "NULL";
                var parParParParParParParParNodeName = "NULL";
                var parParParParParParParParParNodeName = "NULL";
            }

            var levelsDeep = 1;
            if(parParParNodeName == 'LI' && (parParParParNodeName == 'UL' || parParParParNodeName == 'OL')){levelsDeep = 2;}
            if(parParParParParNodeName == 'LI' && (parParParParParParNodeName == 'UL' || parParParParParParNodeName == 'OL')){levelsDeep = 3;}
            if(parParParParParParParNodeName == 'LI' && (parParParParParParParParNodeName == 'UL' || parParParParParParParParNodeName == 'OL')){levelsDeep = 4;}
            //Outlook webmail
            if((parParNodeName == 'UL' || parParNodeName == 'OL') && (parParParNodeName == 'UL' || parParParNodeName == 'OL'))
            {
                levelsDeep = 2;
                if(parParParParNodeName == 'UL' || parParParParNodeName == 'OL')
                {
                    levelsDeep = 3;
                    if(parParParParParNodeName == 'UL' || parParParParParNodeName == 'OL')
                    {
                        levelsDeep = 4;
                    }
                }
            }

            switch (levelsDeep)
            {
                case 1:
                    eachHighlight = '||ul-one||' + eachHighlight;
                    break;
                case 2:
                    eachHighlight = '||ul-two||' + eachHighlight;
                    break;
                case 3:
                    eachHighlight = '||ul-three||' + eachHighlight;
                    break;
                case 4:
                    eachHighlight = '||ul-four||' + eachHighlight;
                    break;
                default:
                    eachHighlight = '||ul-four||' + eachHighlight;
                    break;
            }
        }else if(parParNodeName == 'LI' && (parParParNodeName == 'UL' || parParParNodeName == 'OL') && parNodeName != 'LI') //Adding indent for bullet list sub bullets when there is Bold/Italics etc. around text (one level deeper of parent elements to access)
        {
            bFoundUlBullet == true;
            var parParParParParNodeName = elemSpan.parentElement.parentElement.parentElement.parentElement.parentElement.nodeName;
            var parParParParParParNodeName = elemSpan.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.nodeName;

            var newParElement = elemSpan.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
            if(newParElement != null)
            {
                var parParParParParParParNodeName = newParElement.nodeName;

                newParElement = elemSpan.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
                if(newParElement != null)
                {
                    var parParParParParParParParNodeName = newParElement.nodeName;
                    newParElement = elemSpan.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
                    if(newParElement != null){var parParParParParParParParParNodeName = newParElement.nodeName;}else{var parParParParParParParParParNodeName = "NULL";}
                }
                else
                {
                    var parParParParParParParParNodeName = "NULL";
                    var parParParParParParParParParNodeName = "NULL";
                }
            }
            else
            {
                var parParParParParParParNodeName = "NULL";
                var parParParParParParParParNodeName = "NULL";
                var parParParParParParParParParNodeName = "NULL";
            }

            var levelsDeep = 1;
            if(parParParParNodeName == 'LI' && (parParParParParNodeName == 'UL' || parParParParParNodeName == 'OL')){levelsDeep = 2;}
            if(parParParParParParNodeName == 'LI' && (parParParParParParParNodeName == 'UL' || parParParParParParParNodeName == 'OL')){levelsDeep = 3;}
            if(parParParParParParParParNodeName == 'LI' && (parParParParParParParParParNodeName == 'UL' || parParParParParParParParParNodeName == 'OL')){levelsDeep = 4;}
            //Outlook webmail
            if((parParParNodeName == 'UL' || parParParNodeName == 'OL') && (parParParParNodeName == 'UL' || parParParParNodeName == 'OL'))
            {
                levelsDeep = 2;
                if(parParParParParNodeName == 'UL' || parParParParParNodeName == 'OL')
                {
                    levelsDeep = 3;
                    if(parParParParParParNodeName == 'UL' || parParParParParParNodeName == 'OL')
                    {
                        levelsDeep = 4;
                    }
                }
            }

            switch (levelsDeep)
            {
                case 1:
                    eachHighlight = '||ul-one||' + eachHighlight;
                    break;
                case 2:
                    eachHighlight = '||ul-two||' + eachHighlight;
                    break;
                case 3:
                    eachHighlight = '||ul-three||' + eachHighlight;
                    break;
                case 4:
                    eachHighlight = '||ul-four||' + eachHighlight;
                    break;
                default:
                    eachHighlight = '||ul-four||' + eachHighlight;
                    break;
            }
        }

        if(foundHeader == 1 && bFoundHeader == false && bFoundUlBullet == false){eachHighlight = '<h6>' + eachHighlight + '</h6>';}

        return eachHighlight;
    }

    //This function looks at current and previous "node" aka highlight aka span element to decide whether it should actually be on the same line or not
    function isSameLine(curNode, prevNode, lastParNodeName) {
        var parNodeName = curNode.parentElement.nodeName;
        var parOfparNodeName = curNode.parentElement.parentElement.nodeName;
        var prevSibNode = curNode.previousElementSibling;
            if(prevSibNode == null){var prevSibNodeName = ""}else{var prevSibNodeName = prevSibNode.nodeName;}
        //var lastParNodeName = prevNode.parentElement.nodeName;
        var curHighlight = curNode.textContent;
        //debugMode = 1;
        if(debugMode != 0)
        {
            writeToConsole('curHighlight: ' + curHighlight);
            writeToConsole('curHighlight (1st char): "' + curHighlight.substring(0,1) + '"');
            writeToConsole(curNode,1,0);
            writeToConsole('parNodeName: ' + parNodeName);
            writeToConsole('parOfparNodeName: ' + parOfparNodeName);
            writeToConsole(curNode.parentElement.parentElement,1,0);
            writeToConsole(prevNode,1,0);
            writeToConsole('prevSibNodeName: ' + prevSibNodeName);
            writeToConsole('prevNode.innerText: ' + prevNode.innerText);
            writeToConsole('prevNode.innerText (last 1 char): "' + prevNode.innerText.substring(prevNode.innerText.length - 1) + '"');
            writeToConsole('prevNode.innerText (last 1 char) MATCH: ' + (prevNode.innerText.substring(prevNode.innerText.length - 1) == '\xa0'));
            writeToConsole('prevNodeParent.innerText: ' + prevNode.parentElement.innerText);
            writeToConsole('lastParNodeName: ' + lastParNodeName);
        }
        //debugMode = 0;

        if(
            (
                (
                    (parNodeName == "A" || parNodeName == "CODE" || parNodeName == "KBD" || parNodeName == "EM" || parNodeName == "I" || parNodeName == "U" || parNodeName == "G-EMOJI" || parNodeName == "STRONG" || parNodeName == "B")
                    || (prevSibNodeName == "A" || prevSibNodeName == "CODE" || prevSibNodeName == "KBD" || prevSibNodeName == "EM" || prevSibNodeName == "I" || prevSibNodeName == "U" || prevSibNodeName == "G-EMOJI" || prevSibNodeName == "STRONG" || prevSibNodeName == "B")
                )
                && (
                    prevNode.innerText.substring(prevNode.innerText.length - 1) == " " || prevNode.innerText.substring(prevNode.innerText.length - 1) == '\xa0' || prevNode.innerText.substring(prevNode.innerText.length - 1) == "(" || prevNode.innerText.substring(prevNode.innerText.length - 1) == '"' || prevNode.innerText.substring(prevNode.innerText.length - 1) == '“' || prevNode.innerText.substring(prevNode.innerText.length - 1) == '”' || prevNode.innerText.substring(prevNode.innerText.length - 1) == "[" || prevNode.innerText.substring(prevNode.innerText.length - 1) == "+" || prevNode.innerText.substring(prevNode.innerText.length - 1) == "–" || prevNode.innerText.substring(prevNode.innerText.length - 1) == "-"
                    || (prevNode.parentElement.innerText.substring(prevNode.parentElement.innerText.length - 1) == "[" && prevSibNodeName == "")
                    || (prevNode.innerText.substring(prevNode.innerText.length - 1) == "]" && curHighlight.substring(0,1) == "(")
                    || (prevNode.innerText.substring(prevNode.innerText.length - 1) == ")" && curHighlight.substring(0,1) == "#")
                    || ((prevNode.parentElement.innerText.substring(prevNode.parentElement.innerText.length - 1) == " " || prevNode.parentElement.innerText.substring(prevNode.parentElement.innerText.length - 1) == '\xa0') && prevSibNodeName == "")
                    || (prevNode.innerText.substring(prevNode.innerText.length - 1) == ":" && (curHighlight.substring(0,1) == " " || curHighlight.substring(0,1) == '\xa0'))
                    || (prevNode.innerText.substring(prevNode.innerText.length - 1) == ":" && (lastParNodeName == "EM" || lastParNodeName == "I" || lastParNodeName == "STRONG" || lastParNodeName == "B"))
                )
                && (parOfparNodeName != "LI" || curHighlight.toString().trim() != curNode.parentElement.parentElement.innerText.toString().trim()) //If an LI item and current matches full text of LI, then you want a new line
            )
            || (
                (
                    (lastParNodeName == "A" || lastParNodeName == "CODE" || lastParNodeName == "KBD" || lastParNodeName == "EM" || lastParNodeName == "I" || lastParNodeName == "U" || lastParNodeName == "G-EMOJI" || lastParNodeName == "STRONG" || lastParNodeName == "B" || lastParNodeName == "SUP")
                    || (parNodeName == "A" || parNodeName == "CODE" || parNodeName == "KBD" || parNodeName == "EM" || parNodeName == "I" || parNodeName == "U" || parNodeName == "G-EMOJI" || parNodeName == "STRONG" || parNodeName == "B")
                )
                && (
                    curHighlight.substring(0,1) == " " || curHighlight.substring(0,1) == '\xa0' || curHighlight.substring(0,1) == ")" || curHighlight.substring(0,1) == "." || curHighlight.substring(0,1) == "?" || curHighlight.substring(0,1) == "!" || curHighlight.substring(0,1) == "," || curHighlight.substring(0,1) == ":" || curHighlight.substring(0,1) == ";" || curHighlight.substring(0,1) == '”' || curHighlight.substring(0,1) == '“' || curHighlight.substring(0,1) == ']' || curHighlight.substring(0,1) == '+' || curHighlight.substring(0,1) == "–" || curHighlight.substring(0,1) == "-" || curHighlight.substring(0,1) == "'" || curHighlight.substring(0,1) == '"'
                )
                && (parOfparNodeName != "LI" || curHighlight.toString().trim() != curNode.parentElement.parentElement.innerText.toString().trim()) //If an LI item and current matches full text of LI, then you want a new line
            )
            || parNodeName == "SUP" || parOfparNodeName == "SUP" || curHighlight.substring(0,1) == "."
            || curNode.parentElement.parentElement.className == "mw-editsection"
        )
        {
            return true;
        }
        else{return false;}
    }

    //This function loops through the elements with the highlighter "class" set by the script and adds to clipboard in Roam format
    function updateClipboard(event) {
        var pageTitle2 = pageTitle;
        if(pageTruncate != '')
        {
            pageTitle2 = pageTitle2.split(pageTruncate)[0].trim();
        }
        //Get page title and URL and put in Roam format [Page Title](URL)
        pageTitle2 = pageTitle2.split("[").join("(").split("]").join(")");
        var reference = `[${pageTitle2}](${location.href}) ${pageRef}`;
        reference = reference.trim();
        if(debugMode != 0){writeToConsole('reference: ' + reference);}

        var plainConcatHighlights = "";
        var htmlConcatHighlights = "";
        var eachHighlight = "";
        var origHighlight = "";

        //Get all the highlighted elements based off class name roamJsHighlighter
        //var elemHighlights = document.getElementsByClassName("roamJsHighlighter");
        var elemHighlights = document.querySelectorAll(".roamJsHighlighter");
        if(debugMode != 0){writeToConsole(elemHighlights,3,0);}
        for (var i = 0; i < elemHighlights.length; i++)
        {
            var tempString = "";
            var htmlString = "";
            var plainText = "";
            //title = 'HL:' + highlightCtr;
            var elemTitle = elemHighlights.item(i).title.split(":")[1];
            if(debugMode != 0){writeToConsole('elemTitle: ' + elemTitle,3);}
            //var elemTabs = elemHighlights.item(i).getAttribute('hltabs');
            var elemSpan = elemHighlights.item(i);
            if(debugMode != 0){writeToConsole(elemSpan,3,0);}
            eachHighlight = elemSpan.textContent;
            origHighlight = eachHighlight;
            if(debugMode != 0){writeToConsole('eachHighlight: ' + eachHighlight,3);}
            var parNodeName = elemSpan.parentElement.nodeName;
            if(debugMode != 0){writeToConsole(elemSpan.parentElement,1,0);}
            if(debugMode != 0){writeToConsole('parNodeName: ' + parNodeName,3);}
            if(parNodeName == "A")
            {
                var eachLink = elemSpan.parentElement;
                var linkTextToUse = eachLink.innerText;
                //Account for footnote numbering like [7] because it turns to double brackets then which we don't want
                linkTextToUse = linkTextToUse.split("[").join("(").split("]").join(")");
                var linkHref = eachLink.href;
                //Change # in a link for now so can replace later in script because otherwise it will auto replace # with `#` and ruin link
                linkHref = linkHref.split("#").join("|HASHTAG|")

                if(linkHref.indexOf("http") > -1 || linkHref.indexOf("www.") > -1)
                {
                    var foundALink = `[${linkTextToUse}](${linkHref})`;
                }
                else
                {
                    var foundALink = `[${linkTextToUse}]`;
                }

                foundALink = foundALink.split(")]").join("|)|]");

                if(debugMode != 0){writeToConsole(`Here: [${eachLink.innerText}](${eachLink.href})`);}
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
                    if(elemSpan.parentElement.parentElement.className == "mw-editsection")
                    {}
                    else
                    {
                        if(debugMode != 0)
                        {
                            writeToConsole('elemSpan.title: ' + elemSpan.title);
                            writeToConsole('prevNode.title: ' + prevNode.title);
                        }
                        var newHighlight = elemSpan.textContent;
                        var classFound = elemSpan.className;
                        parNodeName = elemSpan.parentElement.nodeName;
                        if(debugMode != 0)
                        {
                            writeToConsole('newHighlight: ' + newHighlight,3);
                            writeToConsole('while loop elemSpan.parentElement.nodeName: ' + parNodeName,3)
                            writeToConsole(elemSpan.parentElement,1,0);
                        }
                        var bIsSameLine = true;

                        if(classFound == 'roamJsHighlighter pageLink')
                        {
                            bIsSameLine = isSameLine(elemSpan, prevNode, lastParNodeName);
                            lastParNodeName = parNodeName;
                            prevNode = elemSpan;
                            if(debugMode != 0)
                            {
                                writeToConsole('newHighlight: ' + newHighlight);
                                writeToConsole('lastMainSpanText: ' + lastMainSpanText);
                            }
                            //first try to get rid of ** or __ or ` for bold or italics or code since can't format a page link
                            var replaceLastText = lastMainSpanText.replace(formatBold + newHighlight + formatBold, newHighlight);
                            replaceLastText = replaceLastText.replace(formatItalics + newHighlight + formatItalics, newHighlight);
                            replaceLastText = replaceLastText.replace(formatCode + newHighlight + formatCode, newHighlight);
                            replaceLastText = replaceLastText.replace(newHighlight,`|[|[${newHighlight}|]|]`);
                            if(debugMode != 0)
                            {
                                writeToConsole('replaceLastText: ' + replaceLastText);
                                writeToConsole('lastMainSpanText: ' + lastMainSpanText);
                                writeToConsole('eachHighlight: ' + eachHighlight);
                            }
                            eachHighlight = eachHighlight.replace(lastMainSpanText,replaceLastText);
                            if(debugMode != 0){writeToConsole('eachHighlight: ' + eachHighlight);}
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
                                var linkTextToUse = eachLink.innerText;
                                //Account for footnote numbering like [7] because it turns to double brackets then which we don't want
                                linkTextToUse = linkTextToUse.split("[").join("(").split("]").join(")");
                                var linkHref = eachLink.href;
                                //Change # in a link for now so can replace later in script because otherwise it will auto replace # with `#` and ruin link
                                linkHref = linkHref.split("#").join("|HASHTAG|")

                                if(linkHref.indexOf("http") > -1 || linkHref.indexOf("www.") > -1)
                                {
                                    var foundALink = `[${linkTextToUse}](${linkHref})`;
                                }
                                else
                                {
                                    var foundALink = `[${linkTextToUse}]`;
                                }

                                foundALink = foundALink.split(")]").join("|)|]");

                                if(debugMode != 0){writeToConsole(`HERE2: [${eachLink.innerText}](${eachLink.href})`);}
                                newHighlight = newHighlight.replace(eachLink.innerText, foundALink);
                            }

                            if(bIsSameLine){eachHighlight += newHighlight;}else{eachHighlight += '\n' + newHighlight;}
                            lastMainSpanText = newHighlight;
                        }
                        if(debugMode != 0){writeToConsole('newHighlight: ' + newHighlight);}
                        if(debugMode != 0){writeToConsole('eachHighlight: ' + eachHighlight);}
                    }
                    i++;
                    if(i + 1 >= elemHighlights.length){break;}
                }
            }
            if(debugMode != 0){writeToConsole("LINE BREAK OPTION SET TO: " + sameBlock);}
            if(sameBlock == 3)
            {
                //Instead of looping through line breaks below, replace line breaks with a SPACE to bring into same block.
                if(eachHighlight.trim().length > 0)
                {
                    tempString = eachHighlight.trim().replace(/(\r\n|\n|\r)/gm," ");
                    tempString = tempString.replace(/\s+/g," ");
                    plainText = `\t${formatBullets}${tempString.trim()}\n`;
                    htmlString = `<li>${tempString.trim()}</li>`;
                }
            }
            else if(sameBlock == 4)
            {
                //Instead of looping through line breaks below, replace line breaks with NOTHING to bring into same block (may merge words).
                if(eachHighlight.trim().length > 0)
                {
                    tempString = eachHighlight.trim().replace(/(\r\n|\n|\r)/gm,"");
                    tempString = tempString.replace(/\s+/g,"");
                    plainText = `\t${formatBullets}${tempString.trim()}\n`;
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
                    //Replace all double white spaces with single spaces
                    //NOTE: Do not use this AFTER the loop of each line break as it removes the line breaks needed for each Bullet
                    eachLine = eachLine.replace(/\s+/g," ");
                    //If string is NOT empty, add to variable with a TAB and "-" for bullet
                    if(eachLine.trim().length > 0)
                    {
                        switch (sameBlock)
                        {
                            case 0:
                                plainText += `\t${formatBullets}${eachLine.trim()}\n`;
                                htmlString += `<li>${eachLine.trim()}</li>`;
                                break;
                            case 1:
                                if(x > 0)
                                {
                                    //Nested under the first bullet/linebreak from the highlight
                                    plainText += `\t\t${formatBullets}${eachLine.trim()}\n`;
                                    htmlString += `<li>${eachLine.trim()}</li>`;
                                }
                                else
                                {
                                    //First line which will go in parent bullet that the rest of the highlight will go under
                                    plainText += `\t${formatBullets}${eachLine.trim()}\n`;
                                    if(lineBreaks.length > 1){htmlString += `<li>${eachLine.trim()}<ul>`;}else{htmlString += `<li>${eachLine.trim()}</li>`;}
                                }
                                break;
                            case 2:
                                //Plain text can't handle the Ctrl + Enter "soft line breaks" but still want to show like that in the side window
                                if(x > 0)
                                {
                                    //Second line and on which is nested in the same bullet replicating ctrl + Enter
                                    plainText += `${eachLine.trim()}\n`;
                                    htmlString += `\n${eachLine.trim()}`;
                                }
                                else
                                {
                                    //First line
                                    plainText += `\t${formatBullets}${eachLine.trim()}\n`;
                                    if(lineBreaks.length > 1){htmlString += `<li>${eachLine.trim()}`;}else{htmlString += `<li>${eachLine.trim()}</li>`;}
                                }
                                break;
                            default:
                                plainText += `\t${formatBullets}${eachLine.trim()}\n`;
                                htmlString += `\t${formatBullets}${eachLine.trim()}\n`;
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
            plainText = plainText.split(")]]").join("^)^]^");
            htmlString = htmlString.split(")]]").join("^)^]^");
            //Account for a parenthesis after a [page](URL) which causes a double )) which we replace below to avoid block references in Roam
            if(htmlString.indexOf("((") == -1 && htmlString.indexOf("))") > -1)
            {
                plainText = plainText.split("))").join("^)^)^");
                htmlString = htmlString.split("))").join("^)^)^");
            }

            plainText = plainText.split("::").join("`::`").split("[[").join("[").split("]]").join("]").split("#").join("`#`").split("|[|[").join("[[").split("|]|]").join("]]").split("|HASHTAG|").join("#").split(")]").join(")").split("))").join(")").split("((").join("(").split("|)|]").join(")]").split("||h1||").join("<h1>").split("||h2||").join("<h2>").split("||h3||").join("<h3>").split("^)^]^").join(")]]").split("||ul-one||").join("").split("||ul-two||").join("").split("||ul-three||").join("").split("||ul-four||").join("").split(":**__").join(":** __").split(":****").join(":** **").split("^)^)^").join("))");
            htmlString = htmlString.split("::").join("`::`").split("[[").join("[").split("]]").join("]").split("#").join("`#`").split("|[|[").join("[[").split("|]|]").join("]]").split("|HASHTAG|").join("#").split(")]").join(")").split("))").join(")").split("((").join("(").split("|)|]").join(")]").split("<H1>").join("<`H1`>").split("<H2>").join("<`H2`>").split("<H3>").join("<`H3`>").split("<h1>").join("<`h1`>").split("<h2>").join("<`h2`>").split("<h3>").join("<`h3`>").split("^)^]^").join(")]]").split(":**__").join(":** __").split(":****").join(":** **").split("^)^)^").join("))");

            if(plainText.trim().length > 0){plainConcatHighlights += `${plainText}`;}
            if(htmlString.trim().length > 0){htmlConcatHighlights += `${htmlString}`;}
        }

        var cbElemPgTitle = document.getElementById("rmHLcbPgTitle");
        //Check if no highlights and just want the page name in Roam link format [Page Title](URL)
        if(plainConcatHighlights == "" || htmlConcatHighlights == "")
        {
            var bOnlyPageRef = true;
            plainConcatHighlights = reference;
            htmlConcatHighlights = reference;
        }
        else
        {
            var bOnlyPageRef = false;

            if(cbElemPgTitle.checked)
            {
                plainConcatHighlights = formatBullets + reference + '\n' + plainConcatHighlights;
                htmlConcatHighlights = '<li>' + reference + '</li><ul>' + htmlConcatHighlights;
            }
            else
            {
                htmlConcatHighlights = '<ul>' + htmlConcatHighlights;
            }
        }

        //lOOP THROUGH EACH LINE LOOKING FOR HEADER ROWS TO INDENT UNDER
        //htmlConcatHighlights = htmlConcatHighlights.split("<ul>").join('\n<ul>').split("<li>").join('\n<li>').split("<h1>").join('\n<h1>').split("<h2>").join('\n<h2>').split("<h3>").join('\n<h3>') //.split("<h4>").join('\n<h4>').split("<h5>").join('\n<h5>') //.split("<h6>").join('\n<h6>')
        htmlConcatHighlights = htmlConcatHighlights.split("<ul>").join('\r\n<ul>').split("<li>").join('\r\n<li>').split("<h1>").join('\r\n<h1>').split("<h2>").join('\r\n<h2>').split("<h3>").join('\r\n<h3>')
        var lineBreaks = htmlConcatHighlights.trim().split('\r\n');

        var indentLevel = 0;
        var ulList = 0;
        var levelNumber = 0;
        var lastLevelNumber = 0;
        var rootBullet = 0;
        var htmlConcatHighlights = "";
        for(var x=0, eachLine; eachLine = lineBreaks[x]; x++)
        {
            //debugMode = 1;
            if(debugMode != 0){writeToConsole(x);}
            if(debugMode != 0){writeToConsole(eachLine);}
            //var elemType = eachLine.substring(0,4);
            //if(elemType == '<h1>' || elemType == '<h2>' || elemType == '<h3>' || elemType == '<h4>' || elemType == '<h5>')
            //{
            if(eachLine.substring(0,10) == '<li>||h1||')
            {
                eachLine = eachLine.split("||h1||").join('').split("<li>").join('').split("</li>").join('');
                //if(indentLevel == 0){eachLine = eachLine.replace('</li>','</li><ul>');}else{eachLine = '</ul>' + eachLine.replace('</li>','</li><ul>');}
                if(bHeaders)
                {
                    if(indentLevel == 0){eachLine = '<li><h1>' + eachLine + '</h1></li><ul>';}else{eachLine = '</ul><li><h1>' + eachLine + '</h1></li><ul>';}
                }
                else
                {
                    if(indentLevel == 0){eachLine = '<li>' + eachLine + '</li><ul>';}else{eachLine = '</ul><li>' + eachLine + '</li><ul>';}
                }
                indentLevel++;
            }
            if(eachLine.substring(0,10) == '<li>||h2||')
            {
                eachLine = eachLine.split("||h2||").join('').split("<li>").join('').split("</li>").join('');
                //if(indentLevel == 0){eachLine = eachLine.replace('</li>','</li><ul>');}else{eachLine = '</ul>' + eachLine.replace('</li>','</li><ul>');}
                if(bHeaders)
                {
                    if(indentLevel == 0){eachLine = '<li><h2>' + eachLine + '</h2></li><ul>';}else{eachLine = '</ul><li><h2>' + eachLine + '</h2></li><ul>';}
                }
                else
                {
                    if(indentLevel == 0){eachLine = '<li>' + eachLine + '</li><ul>';}else{eachLine = '</ul><li>' + eachLine + '</li><ul>';}
                }
                indentLevel++;
            }
            if(eachLine.substring(0,10) == '<li>||h3||')
            {
                eachLine = eachLine.split("||h3||").join('').split("<li>").join('').split("</li>").join('');
                //if(indentLevel == 0){eachLine = eachLine.replace('</li>','</li><ul>');}else{eachLine = '</ul>' + eachLine.replace('</li>','</li><ul>');}
                if(bHeaders)
                {
                    if(indentLevel == 0){eachLine = '<li><h3>' + eachLine + '</h3></li><ul>';}else{eachLine = '</ul><li><h3>' + eachLine + '</h3></li><ul>';}
                }
                else
                {
                    if(indentLevel == 0){eachLine = '<li>' + eachLine + '</li><ul>';}else{eachLine = '</ul><li>' + eachLine + '</li><ul>';}
                }
                indentLevel++;
            }

            if(eachLine.substring(0,8) == '<li><h6>')
            {
                //In case multi element part line and added manually header H6 for indent, need to remove all <h6></h6> stuff and add on just ends so not multiple
                eachLine = eachLine.split("<h6>").join('').split("</h6>").join('').split("<li>").join('').split("</li>").join('');
                if(bHeaders){eachLine = '<li><h6>' + eachLine + '</h6></li>';}else{eachLine = '<li>' + eachLine + '</li>';}
                if(indentLevel == 0){eachLine = eachLine.replace('</li>','</li><ul>');}else{eachLine = '</ul>' + eachLine.replace('</li>','</li><ul>');}
                indentLevel++;
            }

            //if(eachLine.substring(0,9) == '<li>||ul-')
            if(eachLine.indexOf('||ul-') > -1)
            {
                if(debugMode != 0){writeToConsole(eachLine.substring(0,9));}
                /*
                if(eachLine.substring(0,12) == '<li>||ul-one'){levelNumber = 1;}
                if(eachLine.substring(0,12) == '<li>||ul-two'){levelNumber = 2;}
                if(eachLine.substring(0,12) == '<li>||ul-thr'){levelNumber = 3;}
                if(eachLine.substring(0,12) == '<li>||ul-fou'){levelNumber = 4;}
                */

                if(eachLine.indexOf('||ul-one') > -1){levelNumber = 1;}
                if(eachLine.indexOf('||ul-two') > -1){levelNumber = 2;}
                if(eachLine.indexOf('||ul-thr') > -1){levelNumber = 3;}
                if(eachLine.indexOf('||ul-fou') > -1){levelNumber = 4;}
                var origLevelNumber = levelNumber;

                //First item under the page reference / link and opening UL so if it is bullet, then move the levels back one because it is now "root"
                if(x == 2)
                {
                    rootBullet = levelNumber;
                    lastLevelNumber = levelNumber;
                    ulList = levelNumber;
                }

                if(levelNumber < rootBullet)
                {
                    levelNumber = rootBullet;
                    rootBullet = origLevelNumber;
                    ulList = origLevelNumber;
                }

                //In case multi element part line and added UL for indent, need to remove all ||ul|| stuff and add on just ends so not multiple
                eachLine = eachLine.split("||ul-one||").join('').split("||ul-two||").join('').split("||ul-three||").join('').split("||ul-four||").join('').split("<li>").join('').split("</li>").join('');

                if(levelNumber - lastLevelNumber > 0)
                {
                    eachLine = '<ul><li>' + eachLine + '</li>'
                    ulList++;
                }

                if(levelNumber - lastLevelNumber < 0)
                {
                    eachLine = '</ul><li>' + eachLine + '</li>'
                    ulList--;

                    while(ulList > levelNumber)
                    {
                        eachLine = '</ul>' + eachLine
                        ulList--;
                    }
                }

                if(levelNumber - lastLevelNumber == 0)
                {
                    eachLine = '<li>' + eachLine + '</li>';
                }

                lastLevelNumber = origLevelNumber;
            }
            else
            {
                levelNumber = 0;
                rootBullet = 0;
                if(levelNumber - lastLevelNumber < 0)
                {
                    while(ulList > 0)
                    {
                        eachLine = '</ul>' + eachLine
                        ulList--;
                    }
                }
                lastLevelNumber = levelNumber;
            }

            if(debugMode != 0){writeToConsole(eachLine);}
            htmlConcatHighlights = htmlConcatHighlights + eachLine;
            //debugMode = 0;
        }

        if(indentLevel > 0){htmlConcatHighlights = htmlConcatHighlights + '</ul>';}

        while(ulList > 0)
        {
            htmlConcatHighlights = htmlConcatHighlights + '</ul>';
            ulList = ulList - 1;
        }

        if(htmlConcatHighlights.indexOf("<ul>") > -1){htmlConcatHighlights = htmlConcatHighlights + '</ul>';}
        htmlConcatHighlights = htmlConcatHighlights.split("<ul><ul>").join('<ul>');
        if(debugMode != 0){writeToConsole(htmlConcatHighlights);}

        //lOOP THROUGH EACH LINE OF HTML TO MAKE THE PLAIN TEXT INDENT LIKE IT
        var loopHtml = htmlConcatHighlights.split("<ul>").join('\r\n<ul>').split("<li>").join('\r\n<li>').split("</ul>").join('\r\n</ul>')
        var lineBreaks = loopHtml.trim().split('\r\n');

        var newPlainText = "";
        var indentAmount = '    ';
        if(bIndents == false){indentAmount = '';}
        var indentCtr = 0;
        for(var x=0, eachLine; eachLine = lineBreaks[x]; x++)
        {
            if(x > 0 || cbElemPgTitle.checked){if(eachLine.substring(0,4) == '<ul>'){indentCtr++;}}
            if(eachLine.substring(0,5) == '</ul>'){indentCtr--;}
            if(eachLine.substring(0,4) == '<li>')
            {
                eachLine = eachLine.split("<li>").join('').split("</li>").join('');
                var indentSpaces = "";
                var tmpIndentCtr = indentCtr;
                while(tmpIndentCtr > 0)
                {

                    indentSpaces = indentSpaces + indentAmount;
                    tmpIndentCtr--;
                }
                newPlainText += '\n' + indentSpaces + formatBullets + eachLine;
                if(formatBullets == ''){newPlainText += '\n';}
            }
        }

        if(newPlainText.trim() != ''){plainConcatHighlights = newPlainText.trim();}

        var clipboardDataEvt = event.clipboardData;
        clipboardDataEvt.setData('text/plain', plainConcatHighlights);
        clipboardDataEvt.setData('text/html', htmlConcatHighlights);
        var textInput = document.getElementById("rmHLtextArea");
        if(debugMode != 0){writeToConsole("UPDATED THE CLIPBOARD");}
        //textInput.value = 'tESTING MAKING empty';
        htmlConcatHighlights = htmlConcatHighlights.split("<ul>").join('\n<ul>').split("<li>").join('\n\t<li>') //.split("</ul>").join('\n</ul>').split("</li>").join('\n</li>');

        //If just activating extension, no highlights yet, and just want the page title and URL then don't update textarea as want to keep instructions in window
        if(bOnlyPageRef == false || veryFirstRun == 0)
        {
            textInput.value = "";
            if(cbElem1.checked)
            {
                //textInput.value += '\n'
                textInput.value += plainConcatHighlights;
            }
            if(cbElem2.checked)
            {
                textInput.value += '\n'
                textInput.value += htmlConcatHighlights;
            }

            textInput.value += '\n'
        }

        veryFirstRun = 0;
        return;
    }

    //Add listener to "cut" event (CTRL + X on Windows) for highlighting trigger
    document.addEventListener('cut', function (e)
    {
        if(debugMode != 0){writeToConsole("start CUT");}

        if(kindleClickEvent == 1)
        {
            getKindleHighlights(e);
        }
        else if(clickEvent == 0)
        {
            if(debugMode != 0){writeToConsole("INSIDE CLICKEVENT = 0");}
            //Variables for parsing selected elements for highlight
            var foundStartOfSelection = 0;
            var foundEnd = 0;
            //Check to see if at least one selection by the user was found to be highlighted (will use to increment the highlightCtr variable later)
            var foundSelection = 0;
            //Get current selected text which will be used to highlight and then later when ready to export to Roam
            var selection = window.getSelection();
            //Create range from selected text
            var range = selection.getRangeAt(0);
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
                if(debugMode != 0){writeToConsole("NEW SPAN CREATED: " + newSpan);}
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
                if(debugMode != 0){writeToConsole("FIND LOWEST NODE: " + thisHierarchyLevel,3);}
                var inputNodeName = elemInput.nodeName;
                if(debugMode != 0)
                {
                    writeToConsole("elemInput.childNodes.length: " + elemInput.childNodes.length,3);
                    writeToConsole(elemInput.childNodes, 3, 0);
                }
                if(elemInput.childNodes.length > 0)
                {
                    for(var k=0, newElemInput; newElemInput = elemInput.childNodes[k]; k++)
                    {
                        if(selection.containsNode(newElemInput, true))
                        {
                            if(debugMode != 0){writeToConsole(`hierarchyLevel: ${thisHierarchyLevel} | k: ${k} | elementText: ${newElemInput.nodeName}`, 3);}
                            //thisHierarchyLevel += ':' + newElemInput.nodeName;
                            findLowestNode(newElemInput, thisHierarchyLevel);
                        }
                        else
                        {
                            if(debugMode != 0){writeToConsole(`NOT SELECTED: hierarchyLevel: ${thisHierarchyLevel} | k: ${k} | elementText: ${newElemInput.nodeName}`, 3);}
                        }
                    }
                }
                else
                {
                    if(debugMode != 0){writeToConsole("FIND LOWEST NODE: NO CHILDREN",3);}
                    //if(inputNodeName == '#text'){inputNodeText = elemInput.textContent;}else{inputNodeText = elemInput.innerHTML;}
                    if(inputNodeName == '#text'){inputNodeText = elemInput.textContent;}else{inputNodeText = elemInput.innerHTML;}
                    if (typeof inputNodeText == "undefined"){inputNodeText = '';}
                    thisHierarchyLevel += ':' + inputNodeText.trim();
                    if(inputNodeText.trim() != '')
                    {
                        var startPos = 0;
                        var endPos = inputNodeText.length;
                        var resultText = inputNodeText;
                        if(debugMode != 0){writeToConsole(`RETURNED hierarchyLevel: ${thisHierarchyLevel}`);}
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
                                if(debugMode != 0){writeToConsole(`******* FOUND THE END ********`,3);}
                                resultText = endCont.textContent.substring(0, endOff);
                                foundEnd = 1;
                                endPos = endOff;
                            }
                            allTextFound += '\n' + resultText;
                        }

                        if(foundStartOfSelection == 1){createSpanElement(elemInput, startPos, elemInput, endPos);}
                    }
                    if(debugMode != 0){writeToConsole(`ENDING hierarchyLevel: ${thisHierarchyLevel} | inputNodeName: ${inputNodeName} | inputNodeText: ${inputNodeText}`,3);}
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

            if(debugMode != 0)
            {
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
            }

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
                    if(elem == endCont && endOff == 0)
                    {
                        //This typically occurs if you triple click a paragraph to select it all and the selection bleeds over into the next element but zero offset
                        if(debugMode != 0){writeToConsole("Exiting the PRE loop as came to the EndContainer of Range and it has endOffset of 0");}
                        break;
                    }
                    if(debugMode != 0)
                    {
                        writeToConsole(elem,1,0);
                        writeToConsole('elem.className: ' + elem.className,1);
                    }
                    if(selection.containsNode(elem, true))
                    {
                        if (typeof elem.querySelectorAll !== "undefined")
                        {
                            var elemsInSameHighlight = elem.querySelectorAll(".roamJsHighlighter, .roamJsHighlighter pageLink");
                            var m = 0;
                            for(var m = 0; m < elemsInSameHighlight.length; m++)
                            {
                                var newCurElement = elemsInSameHighlight.item(m);
                                if(debugMode != 0)
                                {
                                    writeToConsole(newCurElement,1,0);
                                    writeToConsole('newCurElement.className: ' + newCurElement.className,1);
                                }
                                if(selection.containsNode(newCurElement, true))
                                {
                                    if(newCurElement.className == "roamJsHighlighter" || newCurElement.className == "roamJsHighlighter pageLink")
                                    {
                                        //Remove highlights
                                        removeHighlight(newCurElement);
                                        bRemoveHighlights = true;
                                    }
                                }else{if(debugMode != 0){writeToConsole('NOT SELECTED newCurElement.className: ' + newCurElement,1);}}
                            }
                            //If the current element itself is a highlight, then remove
                            if(m == 0 && (elem.className == "roamJsHighlighter" || elem.className == "roamJsHighlighter pageLink"))
                            {
                                //Remove highlights
                                removeHighlight(elem);
                                bRemoveHighlights = true;
                            }
                        }
                    }else{if(debugMode != 0){writeToConsole('NOT SELECTED elem.className: ' + elem,1);}}
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
                if(debugMode != 0){writeToConsole("Starting loop through all elements contained in the parent container of the highest common level of selected text");}
                for (var i=0, elem; elem = allWithinRangeParent.childNodes[i]; i++)
                {
                    if(elem == endCont && endOff == 0)
                    {
                        //This typically occurs if you triple click a paragraph to select it all and the selection bleeds over into the next element but zero offset
                        if(debugMode != 0){writeToConsole("Exiting the REAL loop as came to the EndContainer of Range and it has endOffset of 0");}
                        //Clear the original user mouse selection
                        document.getSelection().removeAllRanges();
                        break;
                    }
                    consoleTabLevel = '';
                    var elementNodeName = elem.nodeName;
                    if(debugMode != 0){writeToConsole(`i: ${i} | Elem: ${elem} | Elem.nodeName: ${elementNodeName}`,2);}
                    var elementText = "";
                    if(elementNodeName == '#text'){elementText = elem.textContent;}else{elementText = elem.innerText;}

                    //Set to loglevel 2 if H1, H2, H3, H4 Header elements... otherwise loglevel 3
                    if(elementNodeName == 'H1' || elementNodeName == 'H2' || elementNodeName == 'H3' || elementNodeName == 'H4'){tempLogLevel = 2;}else{tempLogLevel = 3;}
                    if(debugMode != 0)
                    {
                        writeToConsole(`i: ${i} | elementText: ${elementText}`, tempLogLevel);
                        writeToConsole(`i: ${i} | elementInnerHtml: ${elem.innerHTML}`, 3);
                    }

                    //Check to see if the Element is part of the selected text, otherwise skip
                    if(selection.containsNode(elem, true))
                    {
                        consoleTabLevel = '\t';
                        if(debugMode != 0)
                        {
                            writeToConsole("This element was at least partially found in the Selected Text by the user");
                            writeToConsole(`i: ${i} | Elem: ${elem} | Elem.nodeName: ${elementNodeName}`);
                            writeToConsole(`i: ${i} | elementText: ${elementText}`)
                        }

                        //Recursively drill down to the #text value
                        var newCtr = 1;
                        consoleTabLevel = '\t\t';

                        //var findHierarchy = findLowestNode(elem, 'root:' + elementNodeName);
                        findLowestNode(elem, 'root');
                        if(debugMode != 0){writeToConsole("foundStart: " + foundStartOfSelection + " foundEnd: " + foundEnd, 3);}
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
                if(debugMode != 0)
                {
                    writeToConsole(`allTextFound: ${allTextFound}`);
                    writeToConsole(`Ended i Loop at: ${i}`);
                }
            }
        }

        writeToConsole("BEFORE RUNNING UPDATECLIPBOARD");
        //Run the function to loop through the highlighted elements and copy to the clipboard ready to paste to Roam
        clickEvent = 0;
        if(kindleClickEvent != 1){updateClipboard(e);}
        kindleClickEvent = 0;
        e.preventDefault();
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
        if(specialKeyHeld || evt.ctrlKey)
        {
            if(curElement.className === "roamJsHighlighter" || curElement.className === "roamJsHighlighter pageLink")
            {
                var bSelFound = 0;
                if(typeof window.getSelection != "undefined") //If there is selected text
                {
                    var theSelection = window.getSelection();
                    if(theSelection.toString().length > 0){bSelFound = 1;}
                }

                if(bSelFound == 1)
                {
                    var theSelection = window.getSelection();
                    if(theSelection.toString().length > 0)
                    {
                        //Create new SPAN element for the page reference highlight
                        var divTest = document.createRange();
                        //divTest = window.getSelection();
                        divTest.setStart(theSelection.anchorNode, theSelection.anchorOffset);
                        divTest.setEnd(theSelection.focusNode, theSelection.focusOffset);
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
                    if(curElement.className == 'roamJsHighlighter pageLink')
                    {
                        removeHighlight(curElement);
                    }
                    else
                    {
                        var elemsInSameHighlight = document.querySelectorAll('[title="' + titleOfElement + '"]');

                        for(var i = 0; i < elemsInSameHighlight.length; i++)
                        {
                            curElement = elemsInSameHighlight.item(i);
                            //call function to remove element
                            removeHighlight(curElement);
                        }
                    }
                }

                evt.preventDefault();
                //Force the "cut" event because the clipboardData event setData doesn't work unless activated from a cut/copy event.
                //We already have the "cut" event listener set to run our code, so this should activate it
                clickEvent = 1;
                document.execCommand('cut');
            }
            else
            {
                //Commenting this out because when writing to console it actually prevents a quick highlight after selecting text
                //and trying to use ctrl + x "cut" to trigger a highlight if you do it too quickly because when you highlight you are clicking first
            }
        }
    });

    document.addEventListener('contextmenu', function(evt) {
        var curElement = evt.target || evt.srcElement;
        var specialKeyHeld = evt.altKey;
        if(specialKeyHeld || evt.ctrlKey)
        {
            if(curElement.className === "roamJsHighlighter" || curElement.className === "roamJsHighlighter pageLink")
            {
                var titleOfElement = curElement.title;
                var elemsInSameHighlight = document.querySelectorAll('[title="' + titleOfElement + '"]');

                for(var i = 0; i < elemsInSameHighlight.length; i++)
                {
                    eachElement = elemsInSameHighlight.item(i);
                    eachElement.setAttribute("hlHeader", "1");
                    eachElement.style.setProperty("color", "red", "important");
                }
                evt.preventDefault();
                //Force the "cut" event because the clipboardData event setData doesn't work unless activated from a cut/copy event.
                //We already have the "cut" event listener set to run our code, so this should activate it
                clickEvent = 1;
                document.execCommand('cut');
            }
        }
    });

    //Add Double Click event to allow for page linking to a single word since double click will highlight the word you are clicking already
    document.addEventListener('dblclick', function(evt) {
        var curElement = evt.target || evt.srcElement;

        if(debugMode != 0)
        {
            writeToConsole("****** DOUBLE CLICK *******");
            writeToConsole(curElement,1,0);
            writeToConsole(curElement.className);
        }

        if(curElement.className === "roamJsHighlighter" || curElement.className === "roamJsHighlighter pageLink")
        {
            var bSelFound = 0;
            if (typeof window.getSelection != "undefined")
            {
                var theSelection = window.getSelection();
                var theSelectionString = theSelection.toString();
                if(debugMode != 0)
                {
                    writeToConsole(theSelectionString);
                    writeToConsole(theSelection.anchorNode,1,0);
                    writeToConsole(theSelection.anchorOffset);
                    writeToConsole(theSelection.focusNode,1,0);
                    writeToConsole(theSelection.focusOffset);
                }
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
                    if(debugMode != 0)
                    {
                        writeToConsole(theSelection.anchorNode,1,0);
                        writeToConsole(theSelection.anchorOffset);
                        writeToConsole(theSelection.focusNode,1,0);
                        writeToConsole(theSelection.focusOffset);
                        writeToConsole(curElement.title);
                    }
                    //Create new SPAN element for the page reference highlight
                    var divTest = document.createRange();
                    //divTest = window.getSelection();
                    divTest.setStart(theSelection.anchorNode, theSelection.anchorOffset);
                    divTest.setEnd(theSelection.focusNode, theSelection.focusOffset);
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
        }
    });

    useBrowser.runtime.onMessage.addListener(function(request, sender, sendResponse){
        if(request.callFunction === 'removeAllHighlights')
        {
            if(confirm("Remove all highlights from the current page?")){removeAllHighlights();}
        }

        if(request.callFunction === 'addDoubleBrackets')
        {
            var theSelection = window.getSelection();
            var curElement = theSelection.anchorNode.parentElement;
            if(theSelection.toString().length > 0)
            {
                if(curElement.className === "roamJsHighlighter")
                {
                    //Create new SPAN element for the page reference highlight
                    var divTest = document.createRange();
                    //divTest = window.getSelection();
                    divTest.setStart(theSelection.anchorNode, theSelection.anchorOffset);
                    divTest.setEnd(theSelection.focusNode, theSelection.focusOffset);
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
                    document.getSelection().removeAllRanges();

                    //Force the "cut" event because the clipboardData event setData doesn't work unless activated from a cut/copy event.
                    //We already have the "cut" event listener set to run our code, so this should activate it
                    clickEvent = 1;
                    document.execCommand('cut');
                }
            }
        }

        if(request.callFunction === 'convertToHeader')
        {
            var theSelection = window.getSelection();
            var curElement = theSelection.anchorNode.parentElement;

            if(curElement.className === "roamJsHighlighter" || curElement.className === "roamJsHighlighter pageLink")
            {
                var titleOfElement = curElement.title;
                var elemsInSameHighlight = document.querySelectorAll('[title="' + titleOfElement + '"]');

                for(var i = 0; i < elemsInSameHighlight.length; i++)
                {
                    eachElement = elemsInSameHighlight.item(i);
                    eachElement.setAttribute("hlHeader", "1");
                    eachElement.style.setProperty("color", "red", "important");
                }

                //Clear the original user mouse selection
                document.getSelection().removeAllRanges();

                //Force the "cut" event because the clipboardData event setData doesn't work unless activated from a cut/copy event.
                //We already have the "cut" event listener set to run our code, so this should activate it
                clickEvent = 1;
                document.execCommand('cut');
            }
        }
    });

    //Run during initial activation of highlighter in order to have by default the [Page Title](URL)
    //Force the "cut" event because the clipboardData event setData doesn't work unless activated from a cut/copy event.
    //We already have the "cut" event listener set to run our code, so this should activate it
    clickEvent = 1;
    document.execCommand('cut');
}
}

/* TEST/SAMPLE/TROUBLESHOOTING CODE

    ******************************
    CODE TO PASTE IN HTML TEXT YOU WANT ADDED TO THE CLIPBOARD TO TEST IMPORT INTO ROAM
    ******************************
        document.addEventListener('cut', function (e)
        {
            var clipboardDataEvt = e.clipboardData;
            plainConcatHighlights = 'blah';

            clipboardDataEvt.setData('text/plain', plainConcatHighlights);
            clipboardDataEvt.setData('text/html', htmlConcatHighlights);
            e.preventDefault();
        });


        htmlConcatHighlights =
        `<ul>
        	<li>[GitMurf/roam-highlighter: Chrome highlighter that quickly and easily puts your highlights into Roam format for easy pasting into your notes.](https://github.com/GitMurf/roam-highlighter#roam-highlighter) #[[Roam-Highlights]]
        <ul>
        	<li><h1>roam-highlighter</h1><ul>
        </li>
        	<li>Now you can officially install the Extension from the Chrome Web Store here: [Roam-highlighter Extension](https://chrome.google.com/webstore/detail/roam-highlighter/mcoimieglmhdjdoplhpcmifgplkbfibp)
        </li>
        	<li>This Highlighter extension is meant for use with the [Roam Research](https://roamresearch.com/) note taking application to help "clip" web pages by highlighting all the areas you want to save in Roam and then easily copying/pasting into Roam in a Roam friendly format. You also are able to Double Bracket words / phrases with the extension so that they create Page/Link references when pasted into Roam. See below for details on how to use!
        </li>
        	</ul><li><h2>How to Use the Highlighter</h2><ul>
        </li>
        	<li>**Note:**__I am a Windows guy. While I try to document MAC specific shortcuts below, if you have any issues please google the Windows command I list to look for the MAC alternative, and whether it works or not, please open an Issue in Github letting me know what you tried so I can update the instructions accordingly and/or make a fix to the code to include a good MAC alternative. Thanks!__
        </li>
        	<li>Install Chrome Extension from the [Chrome Web Store](https://chrome.google.com/webstore/detail/roam-highlighter/mcoimieglmhdjdoplhpcmifgplkbfibp)
        </li></ul>
        </ul>
        </li>
        </ul>
        `;

*/
