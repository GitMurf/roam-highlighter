//Date: October 29, 2020
var verNum = '2.0.1'; //Turn off auto HL by default on update and deactivate when side window is hidden
var getPage = location.href;
var iframeDoc = document;

//Clear storage settings to start fresh for testing
/*
var useBrowser = chrome
useBrowser.storage.local.clear(function() {
    var error = useBrowser.runtime.lastError;
    if (error) {
        console.error(error);
    }
});
*/
//Default settings in case no local storage saved
var sameBlock = Number(0);
var parentTitleArr = 
[
    ['*NONE',''],
    ['*Roam','[{%title%}]({%url%}) #[[Roam-Highlights]]'],
    ['*Obsidian','[{%title%}]({%url%}) [[Obsidian-Highlights]]'],
    ['*All Placeholders','[{%title%}]({%url%}) {%date%} {%time%} ... TRUNCATE TITLE BY ADDING @ followed by character(s) to cutoff at ex. {%title@-%} ... FORMAT DATES ex. {%date@mm-dd-yyyy%} or {%date@day month dd, yyyy%} or Roam date [[{%date@roam%}]]']
];
var parentTitle = parentTitleArr[1][1];
var sideWidth = "20%";
var sideHeight = "30%";
var showWindow = Number(1);
var formatBold = '**';
var formatItalics = '__';
var formatStrike = '~~';
var formatInsert = formatBold;
var formatCode = '`';
var formatBullets = '- ';
var bHeaders = true;
var bIndents = true;
var bLinks = true;
var bAutoHL = false;
var pgRefCase = Number(0);
var elipOpt = Number(0);
//Kindle settings
var kindleNotesAddress = 'read.amazon.com/notebook';
var kindleNotesLoginAddress = 'read.amazon.com/kp/notebook';
var kindleNotesAddressFR = 'lire.amazon.fr/notebook'; //French
var kindleNotesAddressDE = 'lesen.amazon.de/notebook'; //German
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
        writeToConsole("sideWidth: " + sideWidth,-1);
        writeToConsole("sideHeight: " + sideHeight,-1);
        writeToConsole("showWindow: " + showWindow,-1);
        writeToConsole("formatBold: " + formatBold,-1);
        writeToConsole("formatItalics: " + formatItalics,-1);
        writeToConsole("formatCode: " + formatCode,-1);
        writeToConsole("bHeaders: " + bHeaders,-1);
        writeToConsole("formatBullets: " + formatBullets,-1);
        writeToConsole("bIndents: " + bIndents,-1);
        writeToConsole("bLinks: " + bLinks,-1);
        writeToConsole("bAutoHL: " + bAutoHL,-1);
        writeToConsole("pgRefCase: " + pgRefCase,-1);
        writeToConsole("elipOpt: " + elipOpt,-1);
        writeToConsole("parentTitleArr: " + parentTitleArr,-1);
        writeToConsole("parentTitle: " + parentTitle,-1);
        writeToConsole("kindleHLref: " + kindleHLref,-1);
        writeToConsole("bLocation: " + bLocation,-1);
        writeToConsole("bColor: " + bColor,-1);
        writeToConsole("bColorRef: " + bColorRef,-1);
        writeToConsole("kindleHLstructure: " + kindleHLstructure,-1);
    }

    //Array to loop through to get values from browser.storage.local
    var settingsArray = ["sameBlock", "sideWidth", "sideHeight", "showWindow", "formatBold", "formatItalics", "formatCode", "bHeaders", "formatBullets", "bIndents", "bLinks", "bAutoHL", "pgRefCase", "elipOpt", "parentTitleArr", "parentTitle", "kindleHLref", "bLocation", "bColor", "bColorRef", "kindleHLstructure"];

    for(var s = 0; s < settingsArray.length; s++)
    {
        var storageVar = settingsArray[s];
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
            case "bLinks":
                if(varResult !== undefined){bLinks = varResult;}
                setLocalStorageValue("bLinks", bLinks);
                break;
            case "bAutoHL":
                if(varResult !== undefined){bAutoHL = varResult;}
                setLocalStorageValue("bAutoHL", bAutoHL);
                break;
            case "pgRefCase":
                if(varResult !== undefined){pgRefCase = varResult;}
                setLocalStorageValue("pgRefCase", pgRefCase);
                break;
            case "elipOpt":
                if(varResult !== undefined){elipOpt = varResult;}
                setLocalStorageValue("elipOpt", elipOpt);
                break;
            case "parentTitleArr":
                if(varResult !== undefined){parentTitleArr = varResult;}
                /*parentTitleArr = 
                [
                    ['*NONE',''],
                    ['*Roam','[{%title%}]({%url%}) #[[Roam-Highlights]]'],
                    ['*Obsidian','[{%title%}]({%url%}) [[Obsidian-Highlights]]'],
                    ['*All Placeholders','[{%title%}]({%url%}) {%date%} {%time%}']
                ];*/
                setLocalStorageValue("parentTitleArr", parentTitleArr);
                break;
            case "parentTitle":
                if(varResult !== undefined){parentTitle = varResult;}
                //parentTitle = parentTitleArr[1][1];
                setLocalStorageValue("parentTitle", parentTitle);
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
        writeToConsole("sideWidth: " + sideWidth,-1);
        writeToConsole("sideHeight: " + sideHeight,-1);
        writeToConsole("showWindow: " + showWindow,-1);
        writeToConsole("formatBold: " + formatBold,-1);
        writeToConsole("formatItalics: " + formatItalics,-1);
        writeToConsole("formatCode: " + formatCode,-1);
        writeToConsole("bHeaders: " + bHeaders,-1);
        writeToConsole("formatBullets: " + formatBullets,-1);
        writeToConsole("bIndents: " + bIndents,-1);
        writeToConsole("bLinks: " + bLinks,-1);
        writeToConsole("bAutoHL: " + bAutoHL,-1);
        writeToConsole("pgRefCase: " + pgRefCase,-1);
        writeToConsole("elipOpt: " + elipOpt,-1);
        writeToConsole("kindleHLref: " + kindleHLref,-1);
        writeToConsole("bLocation: " + bLocation,-1);
        writeToConsole("bColor: " + bColor,-1);
        writeToConsole("bColorRef: " + bColorRef,-1);
        writeToConsole("kindleHLstructure: " + kindleHLstructure,-1);
    }

    mainFunction();

    var sideWindow = document.getElementById('rmHLiframe');
    if(showWindow == 0){sideWindow.style.setProperty('display', 'none');}
}

startFunction();

function mainFunction()
{
if(typeof roamHighlighterLoaded !== "undefined" || getPage.includes('roamresearch.com'))
{
    //Variable already present/set so therefore do not need to run again as don't want to duplicate load the Javascript code
    if(roamHighlighterLoaded == 1)
    {
        var divElemMain = document.getElementById('rmHLiframe');
        iframeDoc = divElemMain.contentWindow.document;
        if(divElemMain.style.display != "none")
        {
            divElemMain.style.setProperty('display', 'none');
            showWindow = 0;
            setLocalStorageValue("showWindow", showWindow);
        }
        else
        {
            divElemMain.style.setProperty('display', 'block');
            showWindow = 1;
            setLocalStorageValue("showWindow", showWindow);
        }
    }
    else
    {
        //On Roam website so will not load highlighter but need to set this variable so no console error after mainFunction() ran
        showWindow = 1;
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
    var iframeElem = document.createElement('iframe');
        iframeElem.id = 'rmHLiframe';
        iframeElem.style.setProperty('display', 'block');
        iframeElem.style.cssText = 'position:fixed;bottom:3px;right:3px;width:' + sideWidth + ';height:' + sideHeight + ';opacity:0.8;z-index:9999;font-size:12px;line-height:normal;border-bottom:1px solid black;border-top:none;border-left:none;border-right:none;';
        document.body.appendChild(iframeElem);
        iframeDoc = iframeElem.contentWindow.document;
        iframeDoc.body.style.cssText = 'margin:0px;';
    var divElem = iframeDoc.body;
    /*
    var divElem = document.createElement('div');
        divElem.id = 'rmHLmain';
        divElem.style.setProperty('display', 'block');
        divElem.style.cssText = 'position:fixed;bottom:3px;right:3px;width:' + sideWidth + ';height:' + sideHeight + ';opacity:0.8;z-index:9999;font-size:12px;line-height:normal;border-bottom:1px solid black;';
        iframeDoc.body.appendChild(divElem);
    */

    var divButtonsElem = document.createElement('div');
        divButtonsElem.id = 'rmHLdivButt';
        divButtonsElem.style.cssText = 'width:100%;display:flex;height:30px';
        divElem.appendChild(divButtonsElem);

    var divTextElem = document.createElement('div');
        divTextElem.id = 'rmHLdivText';
        divTextElem.style.cssText = 'width:100%;height:calc(100% - 31px);float:right';
        divElem.appendChild(divTextElem);

    var divSetElem = document.createElement('div');
        divSetElem.id = 'rmHLdivSett';
        divSetElem.style.cssText = 'width:50%;height:calc(100% - 31px);display:none;float:left';
        divElem.appendChild(divSetElem);

    //Main settings DIV
    var formElem = document.createElement('div');
        formElem.id = 'rmHLform';
        formElem.style.cssText = 'width:55%;height:calc(100% - 30px);background-color:white;padding:15px;float:left;border-left:1px solid black;border-top:1px solid black';
        divSetElem.appendChild(formElem);

    //Kindle settings DIV
    var divKindle = document.createElement('div');
        divKindle.id = 'rmHLdivKindle';
        divKindle.style.cssText = 'width:45%;height:calc(100% - 30px);background-color:white;padding:15px;float:left;border-top:1px solid black';
        divSetElem.appendChild(divKindle);

    /* Removing as adding new Parent Title format
    var labelElem = createNewElement('label','Highlighter Link #Tag','rmHLtb','font-size:12px;line-height:normal;color:black;font-weight:bold;display:inline-block',formElem,'','');
    */

    var butClearAll = createNewElement('button','Clear All Highlights','','background-color:black;color:white;border-color:white;margin-left:0px;font-size:12px;line-height:normal;border-color:white;border-width:1px;border-style:solid;cursor:pointer;padding:5px;vertical-align:bottom',formElem,'rmHLclear','rmHLclear');

    butClearAll.addEventListener("click", function(){
        removeAllHighlights();
    });

    var labelElemAutoHL = createNewElement('label','Auto Highlight','rmHLcbAutoHL','font-size:12px;line-height:normal;margin-left:15px;color:black;font-weight:bold;display:inline-block',formElem,'','');
    var cbElemAutoHL = createNewElement('checkbox','','','vertical-align:inherit;margin-left:10px;font-size:12px;line-height:normal;cursor:pointer;opacity:1;display:inline-flex;pointer-events:auto',formElem,'rmHLcbAutoHL','rmHLcbAutoHL');
    if(bAutoHL){cbElemAutoHL.checked = true;}else{cbElemAutoHL.checked = false;}

    formElem.appendChild(document.createElement('br'));
    formElem.appendChild(document.createElement('br'));

    var labelElemPT = createNewElement('label','Parent Title Format','rmHLparentTitle','font-size:12px;line-height:normal;color:black;font-weight:bold;display:inline-block',formElem,'','');

    formElem.appendChild(document.createElement('br'));
    var selElemPT = createNewElement('select','','','padding:3px;font-size:12px;line-height:normal;border-color:black;border-width:1px;border-style:solid;cursor:pointer;min-width:225px;max-width:225px;width:225px',formElem,'rmHLparentTitle','rmHLparentTitle');

    var arrLength = parentTitleArr.length;
    for (var i = 0; i < arrLength; i++)
    {
        selElemPT.options.add( new Option(parentTitleArr[i][0],parentTitleArr[i][1]) );
    }
    selElemPT.value = parentTitle;

    selElemPT.addEventListener("change", function(evt){
        var selElemPT = evt.target;
        var textElem2 = iframeDoc.getElementById("rmHLta2");
        textElem2.value = selElemPT.value;
        parentTitle = textElem2.value;
        var butSave = iframeDoc.getElementById("rmHLsave");
        butSave.style.backgroundColor = 'blue';
        butSave.click();
    });

    var butAdd = createNewElement('button','Add','','background-color:grey;color:white;border-color:white;font-size:12px;line-height:normal;border-color:white;border-width:1px;border-style:solid;cursor:default;padding:5px;margin-left:10px;',formElem,'rmHLadd','rmHLadd');

    var butDel = createNewElement('button','Delete','','background-color:crimson;color:white;border-color:white;font-size:12px;line-height:normal;border-color:white;border-width:1px;border-style:solid;cursor:pointer;padding:5px;margin-left:10px;',formElem,'rmHLdel','rmHLdel');

    butAdd.addEventListener("click", function(evt){
        var butAdd = evt.target;
        if(butAdd.style.backgroundColor == 'grey'){return;}
        var textElem2 = iframeDoc.getElementById("rmHLta2");
        var textElem2Val = textElem2.value;
        var selElemPT = iframeDoc.getElementById("rmHLparentTitle");
        parentTitle = textElem2Val;
        //Calling the butSave.click after the prompt was causing issues (probably async related) to where teh 'cut' event wouldn't fire from butSave.click if waited on the prompt for a few seconds.
        var butSave = iframeDoc.getElementById("rmHLsave");
        butSave.style.backgroundColor = 'blue';
        butSave.click();
        var itemDesc = prompt("Enter a short description to save for future.", "New");
        if(itemDesc == '' || itemDesc == null){itemDesc = 'Saved without a name'}
        parentTitleArr.push([itemDesc,textElem2Val]);
        selElemPT.options.add( new Option(itemDesc,textElem2Val) );
        selElemPT.value = textElem2Val;
        butAdd.style.backgroundColor = 'grey';
        butAdd.style.cursor = 'default';
        setLocalStorageValue("parentTitle", parentTitle);
        setLocalStorageValue("parentTitleArr", parentTitleArr);
    });

    butDel.addEventListener("click", function(evt){
        var textElem2 = iframeDoc.getElementById("rmHLta2");
        var selElemPT = iframeDoc.getElementById("rmHLparentTitle");
        var selIndex = selElemPT.selectedIndex;
        if(selIndex <= 3)
        {
            window.alert("Cannot delete default items!");
            return;
        }
        parentTitleArr.splice(selIndex, 1);
        selElemPT.remove(selIndex);
        if(selIndex >= selElemPT.length){selIndex = selElemPT.length - 1};
        selElemPT.selectedIndex = selIndex;
        textElem2.value = selElemPT.value;
        parentTitle = textElem2.value;
        var butSave = iframeDoc.getElementById("rmHLsave");
        butSave.style.backgroundColor = 'blue';
        butSave.click();
    });

    if(getPage.includes(kindleNotesAddress) || getPage.includes(kindleNotesLoginAddress) || getPage.includes(kindleNotesAddressFR) || getPage.includes(kindleNotesAddressDE))
    {
        //Text box for Kindle-highlights tag
        var labelKindle4 = createNewElement('label','Highlights #Tag: ','rmHLkingleTb1','font-size:12px;line-height:normal;color:black;font-weight:bold;display:inline;margin-right:5px;vertical-align:middle;padding:0px',divKindle,'','');
        //divKindle.appendChild(document.createElement('br'));
        var tbKindle1 = createNewElement('input',kindleHLref,'','padding-left:5px;font-size:12px;line-height:normal;border-color:black;border-width:1px;border-style:solid;width:60%',divKindle,'rmHLkingleTb1','rmHLkingleTb1');
        tbKindle1.placeholder = "#[[Kindle-Highlights]]";

        divKindle.appendChild(document.createElement('br'));
        divKindle.appendChild(document.createElement('br'));
        var labelKindle1 = createNewElement('label','Include:','','margin-right:8px;margin-left:0px;font-size:12px;line-height:normal;color:black;font-weight:bold;display:inline-block',divKindle,'','');

        var cbElem4 = createNewElement('checkbox','','','vertical-align:inherit;font-size:12px;line-height:normal;cursor:pointer;opacity:1;display:inline-flex;pointer-events:auto',divKindle,'rmHLcbLoc','rmHLcbLoc');
        if(bLocation){cbElem4.checked = true;}else{cbElem4.checked = false;}

        var labelKindle3 = createNewElement('label','Location','rmHLcbLoc','margin-left:0px;font-size:12px;line-height:normal;color:black;font-weight:bold;display:inline-block',divKindle,'','');

        var cbElem3 = createNewElement('checkbox','','','vertical-align:inherit;font-size:12px;line-height:normal;margin-left:5px;cursor:pointer;opacity:1;display:inline-flex;pointer-events:auto',divKindle,'rmHLcbHlColor','rmHLcbHlColor');
        if(bColor){cbElem3.checked = true;}else{cbElem3.checked = false;}

        var labelKindle2 = createNewElement('label','HL Color','rmHLcbHlColor','margin-left:0px;font-size:12px;line-height:normal;color:black;font-weight:bold;display:inline-block',divKindle,'','');

        var cbElem5 = createNewElement('checkbox','','','vertical-align:inherit;font-size:12px;line-height:normal;margin-left:5px;cursor:pointer;opacity:1;display:inline-flex;pointer-events:auto',divKindle,'rmHLcbHlColorLink','rmHLcbHlColorLink');
        if(bColorRef){cbElem5.checked = true;}else{cbElem5.checked = false;}

        var labelKindle5 = createNewElement('label','Color #[[Ref]]','rmHLcbHlColorLink','margin-left:0px;font-size:12px;line-height:normal;color:black;font-weight:bold;display:inline-block',divKindle,'','');

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

        divKindle.appendChild(document.createElement('br'));
        divKindle.appendChild(document.createElement('br'));
        var butExtractKindle = createNewElement('button','Get Kindle Highlights','','background-color:black;color:white;border-color:white;font-size:12px;line-height:normal;border-color:white;border-width:1px;border-style:solid;cursor:pointer;padding:5px',divKindle,'rmHLkindle','rmHLkindle');

        butExtractKindle.addEventListener("click", function(){
            kindleClickEvent = 1;
            document.execCommand('cut');
        });
    }

    formElem.appendChild(document.createElement('br'));
    formElem.appendChild(document.createElement('br'));
    var labelElem2 = createNewElement('label','Parent Title for Highlights','rmHLta2','font-size:12px;line-height:normal;color:black;font-weight:bold;display:inline-block',formElem,'','');

    var cbElemPgTitle = createNewElement('checkbox','','','vertical-align:inherit;margin-left:10px;font-size:12px;line-height:normal;cursor:pointer;opacity:1;display:inline-flex;pointer-events:auto;display:none',formElem,'rmHLcbPgTitle','rmHLcbPgTitle');
    cbElemPgTitle.checked = true;
    //if(bPgTitle){cbElemPgTitle.checked = true;}else{cbElemPgTitle.checked = false;}

    formElem.appendChild(document.createElement('br'));
    var textElem2 = createNewElement('textarea',parentTitle,'','width:90%;min-height:auto;height:auto;max-height:none;font-size:12px;line-height:normal;border-color:black;border-width:1px;border-style:solid;padding:5px',formElem,'rmHLta2','rmHLta2');
    textElem2.rows = 2;

    textElem2.addEventListener("input", function(evt){
        var butAdd = iframeDoc.getElementById("rmHLadd");
        butAdd.style.backgroundColor = 'green';
        butAdd.style.cursor = 'pointer';
    });

    //5 Options for handling line breaks within each selected highlight by the user (a few words, or a few paragraphs... whatever user selects as a single highlight)
        //Set to 0 (Default) if you want line breaks (e.g., each paragraph) to create new bullets at same hierarchy/level
        //Set to 1 if you want line breaks (e.g., each paragraph) to create new bullets, but nested underneath the first "paragraph" in the highlight
        //Set to 2 if you want line breaks (e.g., each paragraph) to be in same bullet with Ctrl + Shift "soft line breaks" like Ctrl+Shift+V does in browser pasting
        //Set to 3 if you want line breaks (e.g., each paragraph) to be replaced with a "space" and simply concatenated into a single bullet and without any line breaks
    formElem.appendChild(document.createElement('br'));
    formElem.appendChild(document.createElement('br'));
    var labelElem3 = createNewElement('label','How to handle Line Breaks within each Highlight','rmHLsel','font-size:12px;line-height:normal;color:black;font-weight:bold;display:inline-block',formElem,'','');

    formElem.appendChild(document.createElement('br'));
    var selElem = createNewElement('select','','','padding:3px;font-size:12px;line-height:normal;border-color:black;border-width:1px;border-style:solid;cursor:pointer;min-width:225px;max-width:225px;width:225px',formElem,'rmHLsel','rmHLsel');
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

    var tbSizeElem = createNewElement('input',sideWidth,'','padding-left:5px;text-align:center;width:50px;margin-left:5px;margin-right:5px;font-size:12px;line-height:normal;border-color:black;border-width:1px;border-style:solid;display:inline-flex',formElem,'rmHLtbSize','rmHLtbSize');
    tbSizeElem.placeholder = "17%";

    var labelElem9 = createNewElement('label','H:','rmHLtbSize2','font-size:12px;line-height:normal;color:black;font-weight:bold;display:inline-block',formElem,'','');

    var tbSizeElem2 = createNewElement('input',sideHeight,'','padding-left:5px;text-align:center;width:50px;margin-left:5px;font-size:12px;line-height:normal;border-color:black;border-width:1px;border-style:solid;display:inline-flex',formElem,'rmHLtbSize2','rmHLtbSize2');
    tbSizeElem2.placeholder = "20%";

    formElem.appendChild(document.createElement('br'));
    formElem.appendChild(document.createElement('br'));
    var labelElemBold = createNewElement('label','Bold:','rmHLtbBold','font-size:12px;line-height:normal;color:black;font-weight:bold;display:inline-block',formElem,'','');
    var tbElemBold = createNewElement('input',formatBold,'','padding:0px;text-align:center;width:25px;margin-left:5px;margin-right:0px;font-size:12px;line-height:normal;border-color:black;border-width:1px;border-style:solid;display:inline-flex',formElem,'rmHLtbBold','rmHLtbBold');
    //tbElemBold.placeholder = '**';

    var labelElemItalic = createNewElement('label','Italics:','rmHLtbItalic','font-size:12px;line-height:normal;margin-left:5px;color:black;font-weight:bold;display:inline-block',formElem,'','');
    var tbElemItalic = createNewElement('input',formatItalics,'','padding:0px;text-align:center;width:25px;margin-left:5px;font-size:12px;line-height:normal;border-color:black;border-width:1px;border-style:solid;display:inline-flex',formElem,'rmHLtbItalic','rmHLtbItalic');
    //tbElemItalic.placeholder = '__';

    var labelElemCode = createNewElement('label','Code:','rmHLtbCode','font-size:12px;line-height:normal;margin-left:5px;color:black;font-weight:bold;display:inline-block',formElem,'','');
    var tbElemCode = createNewElement('input',formatCode,'','padding:0px;text-align:center;width:25px;margin-left:5px;font-size:12px;line-height:normal;border-color:black;border-width:1px;border-style:solid;display:inline-flex',formElem,'rmHLtbCode','rmHLtbCode');
    //tbElemCode.placeholder = '`';

    var labelElemHeaders = createNewElement('label','Headers:','rmHLcbHeaders','font-size:12px;line-height:normal;margin-left:5px;color:black;font-weight:bold;display:inline-block',formElem,'','');
    var cbElemHeaders = createNewElement('checkbox','','','vertical-align:inherit;margin-left:10px;font-size:12px;line-height:normal;cursor:pointer;opacity:1;display:inline-flex;pointer-events:auto',formElem,'rmHLcbHeaders','rmHLcbHeaders');
    if(bHeaders){cbElemHeaders.checked = true;}else{cbElemHeaders.checked = false;}

    formElem.appendChild(document.createElement('br'));
    formElem.appendChild(document.createElement('br'));
    var labelElemBullet = createNewElement('label','Bullets:','rmHLtbBullet','font-size:12px;line-height:normal;color:black;font-weight:bold;display:inline-block',formElem,'','');
    var tbElemBullet = createNewElement('input',formatBullets,'','padding:0px;text-align:center;width:25px;margin-left:5px;margin-right:0px;font-size:12px;line-height:normal;border-color:black;border-width:1px;border-style:solid;display:inline-flex',formElem,'rmHLtbBullet','rmHLtbBullet');
    //tbElemBullet.placeholder = '- ';

    var labelElemIndents = createNewElement('label','Indent:','rmHLcbIndents','font-size:12px;line-height:normal;margin-left:15px;color:black;font-weight:bold;display:inline-block',formElem,'','');
    var cbElemIndents = createNewElement('checkbox','','','vertical-align:inherit;margin-left:10px;font-size:12px;line-height:normal;cursor:pointer;opacity:1;display:inline-flex;pointer-events:auto',formElem,'rmHLcbIndents','rmHLcbIndents');
    if(bIndents){cbElemIndents.checked = true;}else{cbElemIndents.checked = false;}

    var labelElemLinks = createNewElement('label','Links:','rmHLcbLinks','font-size:12px;line-height:normal;margin-left:15px;color:black;font-weight:bold;display:inline-block',formElem,'','');
    var cbElemLinks = createNewElement('checkbox','','','vertical-align:inherit;margin-left:10px;font-size:12px;line-height:normal;cursor:pointer;opacity:1;display:inline-flex;pointer-events:auto',formElem,'rmHLcbLinks','rmHLcbLinks');
    if(bLinks){cbElemLinks.checked = true;}else{cbElemLinks.checked = false;}

    formElem.appendChild(document.createElement('br'));
    formElem.appendChild(document.createElement('br'));
    var labelElem4 = createNewElement('label','Show the Clipboard in:','','margin-right:20px;font-size:12px;line-height:normal;color:black;font-weight:bold;display:inline-block',formElem,'','');

    var cbElem1 = createNewElement('checkbox','','','vertical-align:inherit;font-size:12px;line-height:normal;cursor:pointer;opacity:1;display:inline-flex;pointer-events:auto',formElem,'rmHLcbType1','rmHLcbType1');
    cbElem1.checked = true;

    var labelElem5 = createNewElement('label','Plain Text','rmHLcbType1','margin-left:5px;font-size:12px;line-height:normal;color:black;font-weight:bold;display:inline-block',formElem,'','');

    var cbElem2 = createNewElement('checkbox','','','vertical-align:inherit;margin-left:20px;font-size:12px;line-height:normal;cursor:pointer;opacity:1;display:inline-flex;pointer-events:auto',formElem,'rmHLcbType2','rmHLcbType2');
    cbElem2.checked = false;

    var labelElem6 = createNewElement('label','HTML','rmHLcbType2','margin-left:5px;font-size:12px;line-height:normal;color:black;font-weight:bold;display:inline-block',formElem,'','');

    formElem.appendChild(document.createElement('br'));
    formElem.appendChild(document.createElement('br'));

    var labelElemDefaults = createNewElement('label','Reset to Defaults','rmHLdefaultsSel','font-size:12px;line-height:normal;color:black;font-weight:bold;display:inline-block;width:115px',formElem,'','');
    var labelElemRefCase = createNewElement('label','Page/Tag Case','rmHLcaseSel','font-size:12px;line-height:normal;color:black;font-weight:bold;display:inline-block;margin-left:15px;width:145px',formElem,'','');
    var labelElemElip = createNewElement('label','Ellipsis','rmHLelip','font-size:12px;line-height:normal;color:black;font-weight:bold;display:inline-block;margin-left:15px;width:85px',formElem,'','');
    formElem.appendChild(document.createElement('br'));

    var selDefaults = createNewElement('select','','','padding:3px;font-size:12px;line-height:normal;border-color:black;border-width:1px;border-style:solid;cursor:pointer;min-width:115px;max-width:115px;width:115px;display:inline-flex',formElem,'rmHLdefaultsSel','rmHLdefaultsSel');
    selDefaults.options.add( new Option("Roam Research","0", true, true) );
    selDefaults.options.add( new Option("Obsidian","1") );

    //var butReset = createNewElement('button','SET','','background-color:black;color:white;border-color:white;margin-left:5px;font-size:12px;line-height:normal;border-color:white;border-width:1px;border-style:solid;cursor:pointer;padding:5px;display:inline-flex',formElem,'rmHLreset','rmHLreset');

    var selPgRefCase = createNewElement('select','','','padding:3px;font-size:12px;line-height:normal;border-color:black;border-width:1px;border-style:solid;cursor:pointer;min-width:145px;max-width:145px;width:145px;margin-left:15px',formElem,'rmHLcaseSel','rmHLcaseSel');
    selPgRefCase.options.add( new Option("As is on page","0", true, true) );
    selPgRefCase.options.add( new Option("Each Word Capitalized","1") );
    selPgRefCase.options.add( new Option("First word capitalized","2") );
    selPgRefCase.options.add( new Option("all lower case","3") );
    selPgRefCase.options.add( new Option("ALL UPPER CASE","4") );
    selPgRefCase.value = pgRefCase;

    var selElip = createNewElement('select','','','padding:3px;font-size:12px;line-height:normal;border-color:black;border-width:1px;border-style:solid;cursor:pointer;min-width:85px;max-width:85px;width:85px;margin-left:15px',formElem,'rmHLelip','rmHLelip');
    selElip.options.add( new Option("None","0", true, true) );
    selElip.options.add( new Option("Front","1") );
    selElip.options.add( new Option("Back","2") );
    selElip.options.add( new Option("Both","3") );
    selElip.value = elipOpt;

    selDefaults.addEventListener("change", function(evt){
        //var divElemMain = iframeDoc.getElementById("rmHLmain");
        var selElemPT = iframeDoc.getElementById("rmHLparentTitle");
        var textElem2 = iframeDoc.getElementById("rmHLta2");
        var selElem = iframeDoc.getElementById("rmHLsel"); 
        var tbSizeW = iframeDoc.getElementById("rmHLtbSize");
        var tbSizeH = iframeDoc.getElementById("rmHLtbSize2");
        var tbElemBold = iframeDoc.getElementById("rmHLtbBold");
        var tbElemItalic = iframeDoc.getElementById("rmHLtbItalic");
        var tbElemCode = iframeDoc.getElementById("rmHLtbCode");
        var cbElemHeaders = iframeDoc.getElementById("rmHLcbHeaders")
        var tbElemBullet = iframeDoc.getElementById("rmHLtbBullet");
        var cbElemIndents = iframeDoc.getElementById("rmHLcbIndents")
        var cbElemLinks = iframeDoc.getElementById("rmHLcbLinks")
        var cbElemAutoHL = iframeDoc.getElementById("rmHLcbAutoHL")
        var cbElem1 = iframeDoc.getElementById("rmHLcbType1")
        var cbElem2 = iframeDoc.getElementById("rmHLcbType2")
        var cbElemPgTitle = iframeDoc.getElementById("rmHLcbPgTitle");
        var selPgRefCase = iframeDoc.getElementById("rmHLcaseSel");
        var selElip = iframeDoc.getElementById("rmHLelip");
        //Kindle settings
        var tbKinHLref = iframeDoc.getElementById("rmHLkingleTb1");
        var cbLoc = iframeDoc.getElementById("rmHLcbLoc");
        var cbCol = iframeDoc.getElementById("rmHLcbHlColor");
        var cbColRef = iframeDoc.getElementById("rmHLcbHlColorLink");
        var selKindle = iframeDoc.getElementById("rmHLkindleSel");
        var selDefaults = iframeDoc.getElementById("rmHLdefaultsSel");

        switch (Number(selDefaults.value))
        {
            case 0:
                //Roam
                tbElemBold.value = '**';
                tbElemItalic.value = '__';
                tbElemCode.value = '`';
                cbElemHeaders.checked = true;
                tbElemBullet.value = '- ';
                cbElemIndents.checked = true;
                cbElemLinks.checked = true;
                cbElemAutoHL.checked = false;
                //Kindle settings
                if(tbKinHLref != null){tbKinHLref.value = '#[[Kindle-Highlights]]';}
                textElem2.value = '[{%title%}]({%url%}) #[[Roam-Highlights]]';
                parentTitle = textElem2.value;
                selElemPT.value = parentTitle;
                break;
            case 1:
                //Obsidian
                tbElemBold.value = '**';
                tbElemItalic.value = '_';
                tbElemCode.value = '`';
                cbElemHeaders.checked = false;
                tbElemBullet.value = '';
                cbElemIndents.checked = false;
                cbElemLinks.checked = true;
                cbElemAutoHL.checked = false;
                //Kindle settings
                if(tbKinHLref != null){tbKinHLref.value = '[[Kindle-Highlights]]';}
                textElem2.value = '[{%title%}]({%url%}) [[Obsidian-Highlights]]';
                parentTitle = textElem2.value;
                selElemPT.value = parentTitle;
                break;
        }

        selElem.value = 0;
        tbSizeW.value = '20%';
        tbSizeH.value = '30%';
        cbElem1.checked = true;
        cbElem2.checked = false;
        selPgRefCase.value = 0;
        selElip.value = 0;
        if(tbKinHLref != null)
        {
            cbLoc.checked = true;
            cbCol.checked = true;
            cbColRef.checked = true;
            selKindle.value = 0;
        }
        cbElemPgTitle.checked = true;

        /*pageTitle = textElem2.value;*/
        sameBlock = Number(selElem.value);
        sideWidth = tbSizeW.value;
        sideHeight = tbSizeH.value;
        formatBold = tbElemBold.value;
        formatItalics = tbElemItalic.value;
        formatCode = tbElemCode.value;
        bHeaders = cbElemHeaders.checked;
        formatBullets = tbElemBullet.value;
        bIndents = cbElemIndents.checked;
        bLinks = cbElemLinks.checked;
        bAutoHL = cbElemAutoHL.checked;
        pgRefCase = Number(selPgRefCase.value);
        elipOpt = Number(selElip.value);
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
        setLocalStorageValue("sameBlock", sameBlock);
        setLocalStorageValue("sideWidth", sideWidth);
        setLocalStorageValue("sideHeight", sideHeight);
        setLocalStorageValue("formatBold", formatBold);
        setLocalStorageValue("formatItalics", formatItalics);
        setLocalStorageValue("formatCode", formatCode);
        setLocalStorageValue("bHeaders", bHeaders);
        setLocalStorageValue("formatBullets", formatBullets);
        setLocalStorageValue("bIndents", bIndents);
        setLocalStorageValue("bLinks", bLinks);
        setLocalStorageValue("bAutoHL", bAutoHL);
        setLocalStorageValue("pgRefCase", pgRefCase);
        setLocalStorageValue("elipOpt", elipOpt);
        //Kindle settings
        setLocalStorageValue("kindleHLref", kindleHLref);
        setLocalStorageValue("bLocation", bLocation);
        setLocalStorageValue("bColor", bColor);
        setLocalStorageValue("bColorRef", bColorRef);
        setLocalStorageValue("kindleHLstructure", kindleHLstructure);
        setLocalStorageValue("parentTitle", parentTitle);
        setLocalStorageValue("parentTitleArr", parentTitleArr);

        //Force the "cut" event because the clipboardData event setData doesn't work unless activated from a cut/copy event.
        //We already have the "cut" event listener set to run our code, so this should activate it
        clickEvent = 1;
        document.execCommand('cut');

        var butSave = iframeDoc.getElementById("rmHLsave");
        butSave.style.backgroundColor = 'grey';
        butSave.style.cursor = 'default';
    });

    formElem.appendChild(document.createElement('br'));
    formElem.appendChild(document.createElement('br'));

    var butSave = createNewElement('button','Save','','background-color:grey;color:white;border-color:white;font-size:12px;line-height:normal;border-color:white;border-width:1px;border-style:solid;cursor:default;padding:5px;margin-left:0px;',formElem,'rmHLsave','rmHLsave');

    formElem.addEventListener("input", function(evt){
        if(evt.target.id != 'rmHLdefaultsSel' && evt.target.id != 'rmHLta2')
        {
            var butSave = iframeDoc.getElementById("rmHLsave");
            butSave.style.backgroundColor = 'blue';
            butSave.style.cursor = 'pointer';
        }
    });

    divKindle.addEventListener("input", function(evt){
        var butSave = iframeDoc.getElementById("rmHLsave");
        butSave.style.backgroundColor = 'blue';
        butSave.style.cursor = 'pointer';
    });

    butSave.addEventListener("click", function(){
        var butSave = iframeDoc.getElementById("rmHLsave");
        if(butSave.style.backgroundColor == 'grey'){return;}
        //var divElemMain = iframeDoc.getElementById("rmHLmain");
        var textElem2 = iframeDoc.getElementById("rmHLta2");
        var selElem = iframeDoc.getElementById("rmHLsel");
        var tbSizeW = iframeDoc.getElementById("rmHLtbSize");
        var tbSizeH = iframeDoc.getElementById("rmHLtbSize2");
        var tbElemBold = iframeDoc.getElementById("rmHLtbBold");
        var tbElemItalic = iframeDoc.getElementById("rmHLtbItalic");
        var tbElemCode = iframeDoc.getElementById("rmHLtbCode");
        var cbElemHeaders = iframeDoc.getElementById("rmHLcbHeaders")
        var tbElemBullet = iframeDoc.getElementById("rmHLtbBullet");
        var cbElemIndents = iframeDoc.getElementById("rmHLcbIndents")
        var cbElemLinks = iframeDoc.getElementById("rmHLcbLinks")
        var cbElemAutoHL = iframeDoc.getElementById("rmHLcbAutoHL")
        var selPgRefCase = iframeDoc.getElementById("rmHLcaseSel");
        var selElip = iframeDoc.getElementById("rmHLelip");
        //Kindle settings
        var tbKinHLref = iframeDoc.getElementById("rmHLkingleTb1");
        var cbLoc = iframeDoc.getElementById("rmHLcbLoc");
        var cbCol = iframeDoc.getElementById("rmHLcbHlColor");
        var cbColRef = iframeDoc.getElementById("rmHLcbHlColorLink");
        var selKindle = iframeDoc.getElementById("rmHLkindleSel");

        butSave.style.backgroundColor = 'grey';
        butSave.style.cursor = 'default';
        parentTitle = textElem2.value;

        sameBlock = Number(selElem.value);
        sideWidth = tbSizeW.value;
            if(sideWidth.indexOf("px") > -1 || sideWidth.indexOf("PX") > -1 || sideWidth.indexOf("Px") > -1 || sideWidth.indexOf("pX") > -1)
            {
                if(parseInt(sideWidth,10) < 300)
                {
                    sideWidth = "300px";
                    tbSizeW.value = "300px";
                }
            }
            if(sideWidth.indexOf("%") > -1)
            {
                if(parseInt(sideWidth,10) < 15)
                {
                    sideWidth = "15%";
                    tbSizeW.value = "15%";
                }
            }
        sideHeight = tbSizeH.value;
            if(sideHeight.indexOf("px") > -1 || sideHeight.indexOf("PX") > -1 || sideHeight.indexOf("Px") > -1 || sideHeight.indexOf("pX") > -1)
            {
                if(parseInt(sideHeight,10) < 200)
                {
                    sideHeight = "200px";
                    tbSizeH.value = "200px";
                }
            }
            if(sideHeight.indexOf("%") > -1)
            {
                if(parseInt(sideHeight,10) < 15)
                {
                    sideHeight = "15%";
                    tbSizeH.value = "15%";
                }
            }
        formatBold = tbElemBold.value;
        formatItalics = tbElemItalic.value;
        formatCode = tbElemCode.value;
        bHeaders = cbElemHeaders.checked;
        formatBullets = tbElemBullet.value;
        bIndents = cbElemIndents.checked;
        bLinks = cbElemLinks.checked;
        bAutoHL = cbElemAutoHL.checked;
        pgRefCase = Number(selPgRefCase.value);
        elipOpt = Number(selElip.value);
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
        setLocalStorageValue("sameBlock", sameBlock);
        setLocalStorageValue("sideWidth", sideWidth);
        setLocalStorageValue("sideHeight", sideHeight);
        setLocalStorageValue("formatBold", formatBold);
        setLocalStorageValue("formatItalics", formatItalics);
        setLocalStorageValue("formatCode", formatCode);
        setLocalStorageValue("bHeaders", bHeaders);
        setLocalStorageValue("formatBullets", formatBullets);
        setLocalStorageValue("bIndents", bIndents);
        setLocalStorageValue("bLinks", bLinks);
        setLocalStorageValue("bAutoHL", bAutoHL);
        setLocalStorageValue("pgRefCase", pgRefCase);
        setLocalStorageValue("elipOpt", elipOpt);
        setLocalStorageValue("parentTitle", parentTitle);
        setLocalStorageValue("parentTitleArr", parentTitleArr);
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
    var link1 = createNewElement('a','Detailed Instructions, Shortcuts, and Features','','font-size:12px;line-height:normal;color:blue',formElem,'','');
    link1.href = 'https://github.com/GitMurf/roam-highlighter#how-to-use-the-highlighter';
    link1.target = '_blank';

    formElem.appendChild(document.createElement('br'));
    var link2 = createNewElement('a','YouTube Tutorial & Demo','','font-size:12px;line-height:normal;color:blue',formElem,'','');
    link2.href = 'https://www.youtube.com/watch?v=UzseaoxaSEM';
    link2.target = '_blank';

    formElem.appendChild(document.createElement('br'));
    var link3 = createNewElement('a','Report a Bug/Issue','','font-size:12px;line-height:normal;color:blue',formElem,'','');
    link3.href = 'https://github.com/GitMurf/roam-highlighter/issues/new';
    link3.target = '_blank';

    formElem.appendChild(document.createElement('br'));
    var link4 = createNewElement('a','Submit an Idea or Feature Request','','font-size:12px;line-height:normal;color:blue',formElem,'','');
    link4.href = 'https://github.com/GitMurf/roam-highlighter/issues/new';
    link4.target = '_blank';

    formElem.appendChild(document.createElement('br'));
    var link5 = createNewElement('a','Ask a Question','','font-size:12px;line-height:normal;color:blue',formElem,'','');
    link5.href = 'https://github.com/GitMurf/roam-highlighter/issues/new';
    link5.target = '_blank';

    formElem.appendChild(document.createElement('br'));
    var link6 = createNewElement('a','Kindle Notes & Highlights','','font-size:12px;line-height:normal;color:blue',formElem,'','');
    link6.href = 'https://read.amazon.com/notebook';
    link6.target = '_blank';

    var butMax = createNewElement('button','Expand','','float:right;background-color:black;color:white;border-color:white;width:25%;font-size:12px;line-height:normal;border-color:white;border-width:1px;border-style:solid;cursor:pointer;padding:5px;height: 100%',divButtonsElem,'rmHLexpand','rmHLexpand');

    butMax.addEventListener("click", function(){
        var divElemMain = document.getElementById('rmHLiframe');
        var divTextElem = iframeDoc.getElementById("rmHLdivText");
        var butMax = iframeDoc.getElementById("rmHLexpand");
        var divSetElem = iframeDoc.getElementById("rmHLdivSett");

        if(butMax.innerHTML == "Expand")
        {
            if(getPage.includes(kindleNotesAddress) || getPage.includes(kindleNotesLoginAddress) || getPage.includes(kindleNotesAddressFR) || getPage.includes(kindleNotesAddressDE))
            {
                divElemMain.style.width = "90%";
                divElemMain.style.height = "80%";
            }
            else
            {
                divElemMain.style.width = "95%";
                divElemMain.style.height = "92%";
            }

            butMax.innerHTML = 'Shrink';
            divElemMain.style.opacity = "1";
        }
        else
        {
            if(divSetElem.style.display == "flex")
            {
                divTextElem.style.width = "100%";
                divSetElem.style.setProperty('display', 'none');
            }

            divElemMain.style.width = sideWidth;
            divElemMain.style.height = sideHeight;

            butMax.innerHTML = 'Expand';
            divElemMain.style.opacity = "0.8";
        }
    });

    var butHide = createNewElement('button','Hide','','float:right;background-color:black;color:white;border-color:white;width:25%;font-size:12px;line-height:normal;border-color:white;border-width:1px;border-style:solid;cursor:pointer;padding:5px;height: 100%',divButtonsElem,'','');

    butHide.addEventListener("click", function(){
        var divElemMain = document.getElementById('rmHLiframe');
        divElemMain.style.setProperty('display', 'none');
        //divElemMain.style.setProperty('display', 'block');
        showWindow = 0;
        setLocalStorageValue("showWindow", showWindow);
    });

    var butWrap = createNewElement('button','Wrap','','float:right;background-color:black;color:white;border-color:white;width:25%;font-size:12px;line-height:normal;border-color:white;border-width:1px;border-style:solid;cursor:pointer;padding:5px;height: 100%',divButtonsElem,'rmHLwrap','rmHLwrap');

    butWrap.addEventListener("click", function(){
        var textInput = iframeDoc.getElementById("rmHLtextArea");
        var butWrap = iframeDoc.getElementById("rmHLwrap");

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

    var butSett = createNewElement('button','Settings','','float:right;background-color:black;color:white;border-color:white;width:25%;font-size:12px;line-height:normal;border-color:white;border-width:1px;border-style:solid;cursor:pointer;padding:5px;height: 100%',divButtonsElem,'rmHLsettings','rmHLsettings');

    butSett.addEventListener("click", function(){
        var divElemMain = document.getElementById('rmHLiframe');
        var divSetElem = iframeDoc.getElementById("rmHLdivSett");
        var divTextElem = iframeDoc.getElementById("rmHLdivText");
        var selElemPT = iframeDoc.getElementById("rmHLparentTitle");
        var textElem2 = iframeDoc.getElementById("rmHLta2");
        var selElem = iframeDoc.getElementById("rmHLsel");
        var butSett = iframeDoc.getElementById("rmHLsettings");
        var butMax = iframeDoc.getElementById("rmHLexpand");
        var butWrap = iframeDoc.getElementById("rmHLwrap");

        if(divSetElem.style.display == "none")
        {
            divElemMain.style.opacity = "1";
            divTextElem.style.width = "50%";
            divSetElem.style.setProperty('display', 'flex');
            selElem.value = sameBlock;
            if(butMax.innerHTML == "Expand"){butMax.click();}
        }
        else
        {
            //divElemMain.style.opacity = "0.8";
            divTextElem.style.width = "100%";
            divSetElem.style.setProperty('display', 'none');
            //butMax.click();
        }
    });

    var textInput = createNewElement('textarea','','','width:100%;max-width:100%;height:100%;max-height:100%;background-color:white;color:black;font-weight:bold;white-space:pre;float:right;padding-left:5px;padding-right:1px;font-size:12px;line-height:normal;border-color:black;border-width:1px;border-style:solid;border-bottom:none',divTextElem,'rmHLtextArea','textAreaInput');
    textInput.value = `
DEMO: youtube.com/watch?v=UzseaoxaSEM
Roam-highlighter Shortcut Keys (v${verNum})

[ALT + X]
\t- Activate Extension and Show/Hide Side Window

[Ctrl + X] (WIN) or [CMD + X] (MAC)
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
        if(pageTitle == 'Kindle: Your Notes and Highlights' || pageTitle == 'Kindle: Ihre Notizen und Markierungen')
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
            var cbElemPgTitle = iframeDoc.getElementById("rmHLcbPgTitle");
            if(iframeDoc.getElementById("rmHLta2").value != ''){cbElemPgTitle.checked = true;}else{cbElemPgTitle.checked = false;}
            if(cbElemPgTitle.checked == false){initIndentAmount = '';}

            var indentAmount = '    ';
            if(bIndents == false)
            {
                indentAmount = '';
                initIndentAmount = '';
            }

            function convertToRoamDate(dateString)
            {
                var newDateString = dateString.replace("st,",",").replace("rd,",",").replace("th,",",").replace("nd,",",")
                var foundDate = new Date(Date.parse(newDateString))
                if(isNaN(foundDate))
                {
                    return dateString
                }
                else
                {
                    //Convert to Roam date page format
                    const nth = function(d) {
                        if (d > 3 && d < 21) return 'th';
                        switch (d % 10) {
                          case 1:  return "st";
                          case 2:  return "nd";
                          case 3:  return "rd";
                          default: return "th";
                        }
                      }
                      const dateStr = foundDate.getDate();
                      const monthStr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][foundDate.getMonth()];
                      
                      return `[[${monthStr} ${dateStr}${nth(dateStr)}, ${foundDate.getFullYear()}]]`;
                }
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

                        textString += initIndentAmount + formatBullets + 'Title: ' + '[[' + curText + ']]' + '\n';
                        htmlString += '<li>Title:: ' + '[[' + curText + ']]' + '</li>';
                    }
                    if(curElement.nodeName == 'P' && curElement.classList.contains("a-color-secondary")) //Author
                    {
                        //lOOP THROUGH EACH AUTHOR
                        var origAuthors = curText;
                        var loopAuthors = curText.split(", and ").join('\r\n').split(", ").join('\r\n');
                        var lineBreaks = loopAuthors.trim().split('\r\n');

                        for(var x=0, eachLine; eachLine = lineBreaks[x]; x++)
                        {
                            var newEachLine = '[[' + eachLine + ']]';
                            origAuthors = origAuthors.replace(eachLine,newEachLine);
                        }

                        curText = origAuthors;

                        textString += initIndentAmount + formatBullets + 'Author: ' + curText + '\n';
                        //textString += initIndentAmount + formatBullets + 'Author: ' + curText + '\n';
                        var lastAccess = document.getElementById('kp-notebook-annotated-date'); //Last accessed date
                        if(lastAccess)
                        {
                            //Put date in Roam format
                            var lastAccessStr = convertToRoamDate(lastAccess.innerText)
                            textString += initIndentAmount + formatBullets + 'Last-Read: ' + lastAccessStr + '\n';
                            htmlString += '<li>Last-Read:: ' + lastAccessStr + '</li>';
                        }

                        textString += initIndentAmount + formatBullets + 'Amazon-store: ' + amazonLink + '\n';
                        textString += initIndentAmount + formatBullets + coverImg + '\n';
                        if(formatBullets == ''){textString += '\n';}

                        htmlString += '<li>Author:: ' + curText + '</li>';
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
            var textInput = iframeDoc.getElementById("rmHLtextArea");
            //htmlConcatHighlights = htmlConcatHighlights.split("<ul>").join('\n<ul>').split("<li>").join('\n\t<li>') //.split("</ul>").join('\n</ul>').split("</li>").join('\n</li>');

            textInput.value = textString;
        }
        else
        {
            window.alert('You are on: "' + pageTitle + '". Not on kindle page. Go to: https://read.amazon.com/notebook');
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
        if(parElemText == null){parElemText = ''}

        var parParNodeName = elemSpan.parentElement.parentElement.nodeName;
        var parParElemText = "";
        if(parParNodeName != 'DIV' && parParNodeName != 'BODY' && parParNodeName != 'ARTICLE'){parParElemText = elemSpan.parentElement.parentElement.innerText;}
        if(parParElemText == null){parParElemText = ''}

        var parParParNodeName = elemSpan.parentElement.parentElement.parentElement.nodeName;
        var parParParElemText = "";
        if(parParParNodeName != 'DIV' && parParParNodeName != 'BODY' && parParParNodeName != 'ARTICLE'){parParParElemText = elemSpan.parentElement.parentElement.parentElement.innerText;}

        var parParParParNodeName = elemSpan.parentElement.parentElement.parentElement.parentElement.nodeName;
        var parParParParElemText = "";
        if(parParParParNodeName != 'DIV' && parParParParNodeName != 'BODY' && parParParParNodeName != 'ARTICLE'){parParParParElemText = elemSpan.parentElement.parentElement.parentElement.parentElement.innerText;}

        if(parNodeName == "A")
        {
            if(elemSpan.parentElement.classList.contains("c-message__sender_link")) //Slack username link
            {
                elemSpan.setAttribute("hlHeader", "1");
            }
        }

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

        //var origEachHighlight = eachHighlight;
        //Adding to default setting to replace line breaks within an element with a space as for the most part, shouldn't have line breaks within a single element.
        if(sameBlock == 0){eachHighlight = eachHighlight.replace(/(\r\n|\n|\r)/gm," ").replace(/\s+/g," ");}

        //Determine whether to add ellipsis later in the code
        var prevElemSib = elemSpan.parentElement.previousElementSibling
        var prevNodeSib = elemSpan.parentElement.previousSibling
        var nextELemSib = elemSpan.parentElement.nextElementSibling
        var nextNodeSib = elemSpan.parentElement.nextSibling
        var nextSibNode = elemSpan.nextSibling
        var nextSibELem = elemSpan.nextElementSibling
        var prevSibNode = elemSpan.previousSibling
        var prevSibElem = elemSpan.previousElementSibling

        if(prevElemSib){var prevElemSibName = prevElemSib.nodeName}else{var prevElemSibName = ""}
        if(prevNodeSib){var prevNodeSibName = prevNodeSib.nodeName}else{var prevNodeSibName = ""}
        if(prevNodeSib){var prevNodeSibText = prevNodeSib.textContent.replace(/\n|\r/g,'').trim()}else{var prevNodeSibText = ""}
        if(nextELemSib){var nextElemSibName = nextELemSib.nodeName}else{var nextElemSibName = ""}
        if(nextNodeSib){var nextNodeSibName = nextNodeSib.nodeName}else{var nextNodeSibName = ""}
        if(nextNodeSib){var nextNodeSibText = nextNodeSib.textContent.replace(/\n|\r/g,'').trim()}else{var nextNodeSibText = ""}
        if(prevSibElem){var prevSibElemName = prevSibElem.nodeName}else{var prevSibElemName = ""}
        if(prevSibElem){var prevSibElemClass = prevSibElem.className}else{var prevSibElemClass = ""}
        if(nextSibELem){var nextSibELemName = nextSibELem.nodeName}else{var nextSibELemName = ""}
        if(prevSibNode){var prevSibNodeText = prevSibNode.textContent.replace(/\n|\r/g,'').trim()}else{var prevSibNodeText = ""}
        if(nextSibNode){var nextSibNodeText = nextSibNode.textContent.replace(/\n|\r/g,'').trim()}else{var nextSibNodeText = ""}

        var tmpEachHighlight = eachHighlight
        if(parNodeName == "STRONG" || parNodeName == "B" || parNodeName == "EM" || parNodeName == "U" || parNodeName == "CODE")
        {
            //Check if start of line (SOL) ; this is used for determining later whether to add ellipsis on front / end
            if(prevNodeSibName == 'BR' || (prevElemSibName == 'BR' && prevNodeSibText == '') || eachHighlight == parParElemText.substring(0,eachHighlight.length)){tmpEachHighlight = '||SOL||' + eachHighlight}
            //Check if end of line (EOL)
            if(nextNodeSibName == 'BR' || (nextElemSibName == 'BR' && nextNodeSibText == '') || eachHighlight == parParElemText.slice(-1*eachHighlight.length)){tmpEachHighlight = tmpEachHighlight + '||EOL||'}
        }
        else
        {
            //Check if start of line (SOL) ; this is used for determining later whether to add ellipsis on front / end
            if(eachHighlight == parElemText.substring(0,eachHighlight.length) || ((prevSibElemName == 'BR' || prevSibElemClass == 'c-mrkdwn__br') && prevSibNodeText == '')){tmpEachHighlight = '||SOL||' + eachHighlight}
            //Check if end of line (EOL)
            if(eachHighlight == parElemText.slice(-1*eachHighlight.length) || (nextSibELemName == 'BR' && nextSibNodeText == '')){tmpEachHighlight = tmpEachHighlight + '||EOL||'}
        }

        eachHighlight = tmpEachHighlight

        if(parNodeName == "STRONG" || parNodeName == "B" || parNodeName == "EM" || parNodeName == "U" || parNodeName == "CODE" || parNodeName == "STRIKE" || parNodeName == "S" || parNodeName == "DEL" || parNodeName == "INS"){eachHighlight = eachHighlight.split("#").join("_")} //Replace hashtag with _ because otherwise later in script we put `#` backticks around it and then formatting won't work around it

        if(parNodeName == "STRONG" || parNodeName == "B"){eachHighlight = formatBold + eachHighlight + formatBold;}
        if(parNodeName == "EM" || parNodeName == "U"){eachHighlight = formatItalics + eachHighlight + formatItalics;}
        if(parNodeName == "CODE"){eachHighlight = formatCode + eachHighlight + formatCode;}
        if(parNodeName == "STRIKE" || parNodeName == "S" || parNodeName == "DEL"){eachHighlight = formatStrike + eachHighlight + formatStrike;}
        if(parNodeName == "INS"){eachHighlight = formatInsert + eachHighlight + formatInsert;}
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
            writeToConsole(curNode.parentElement.parentElement.parentElement,1,0);
            writeToConsole(prevNode,1,0);
            writeToConsole(prevNode.parentElement.parentElement,1,0);
            writeToConsole(prevNode.parentElement.parentElement.parentElement,1,0);
            writeToConsole('prevSibNodeName: ' + prevSibNodeName);
            writeToConsole('prevNode.innerText: ' + prevNode.innerText);
            writeToConsole('prevNode.innerText (last 1 char): "' + prevNode.innerText.substring(prevNode.innerText.length - 1) + '"');
            writeToConsole('prevNode.innerText (last 1 char) MATCH: ' + (prevNode.innerText.substring(prevNode.innerText.length - 1) == '\xa0'));
            writeToConsole('prevNodeParent.innerText: ' + prevNode.parentElement.innerText);
            writeToConsole('lastParNodeName: ' + lastParNodeName);
        }
        //debugMode = 0;

        if(prevNode.parentElement == null || curNode.parentElement == null || prevNode.parentElement.innerText == null || curNode.parentElement.innerText == null){return false}

        if(
            (
                (
                    (parNodeName == "A" || parNodeName == "CODE" || parNodeName == "KBD" || parNodeName == "EM" || parNodeName == "I" || parNodeName == "U" || parNodeName == "G-EMOJI" || parNodeName == "STRONG" || parNodeName == "B" || parNodeName == "DEL" || parNodeName == "STRIKE" || parNodeName == "S" || parNodeName == "INS")
                    || (prevSibNodeName == "A" || prevSibNodeName == "CODE" || prevSibNodeName == "KBD" || prevSibNodeName == "EM" || prevSibNodeName == "I" || prevSibNodeName == "U" || prevSibNodeName == "G-EMOJI" || prevSibNodeName == "STRONG" || prevSibNodeName == "B" || prevSibNodeName == "DEL" || prevSibNodeName == "STRIKE" || prevSibNodeName == "S" || prevSibNodeName == "INS")
                )
                && (
                    prevNode.innerText.substring(prevNode.innerText.length - 1) == " " || prevNode.innerText.substring(prevNode.innerText.length - 1) == '\xa0' || prevNode.innerText.substring(prevNode.innerText.length - 1) == "(" || prevNode.innerText.substring(prevNode.innerText.length - 1) == '"' || prevNode.innerText.substring(prevNode.innerText.length - 1) == '“' || prevNode.innerText.substring(prevNode.innerText.length - 1) == '”' || prevNode.innerText.substring(prevNode.innerText.length - 1) == "[" || prevNode.innerText.substring(prevNode.innerText.length - 1) == "+" || prevNode.innerText.substring(prevNode.innerText.length - 1) == "–" || prevNode.innerText.substring(prevNode.innerText.length - 1) == "-"
                    || (prevNode.parentElement.innerText.substring(prevNode.parentElement.innerText.length - 1) == "[" && prevSibNodeName == "")
                    || (prevNode.parentElement.innerText.substring(prevNode.parentElement.innerText.length - 1) == "(" && prevSibNodeName == "")
                    || (prevNode.parentElement.innerText.substring(prevNode.parentElement.innerText.length - 1) == " " && prevSibNodeName == "")
                    || (prevNode.innerText.substring(prevNode.innerText.length - 1) == "]" && curHighlight.substring(0,1) == "(")
                    || (prevNode.innerText.substring(prevNode.innerText.length - 1) == ")" && curHighlight.substring(0,1) == "#")
                    || ((prevNode.parentElement.innerText.substring(prevNode.parentElement.innerText.length - 1) == " " || prevNode.parentElement.innerText.substring(prevNode.parentElement.innerText.length - 1) == '\xa0') && prevSibNodeName == "")
                    || (prevNode.innerText.substring(prevNode.innerText.length - 1) == ":" && (curHighlight.substring(0,1) == " " || curHighlight.substring(0,1) == '\xa0'))
                    || (prevNode.innerText.substring(prevNode.innerText.length - 1) == ":" && (lastParNodeName == "EM" || lastParNodeName == "I" || lastParNodeName == "STRONG" || lastParNodeName == "B" || lastParNodeName == "DEL" || lastParNodeName == "STRIKE" || lastParNodeName == "S" || lastParNodeName == "INS") && curNode.parentElement.parentElement.innerText.toString().trim() != curHighlight.toString().trim())
                )
                && (parOfparNodeName != "LI" || curHighlight.toString().trim() != curNode.parentElement.parentElement.innerText.toString().trim()) //If an LI item and current matches full text of LI, then you want a new line
                && (parNodeName != "A" || (lastParNodeName != 'H1' && lastParNodeName != 'H2' && lastParNodeName != 'H3'))
            )
            || (
                (
                    (lastParNodeName == "A" || lastParNodeName == "CODE" || lastParNodeName == "KBD" || lastParNodeName == "EM" || lastParNodeName == "I" || lastParNodeName == "U" || lastParNodeName == "G-EMOJI" || lastParNodeName == "STRONG" || lastParNodeName == "B" || lastParNodeName == "SUP" || lastParNodeName == "SUB" || lastParNodeName == "DEL" || lastParNodeName == "STRIKE" || lastParNodeName == "S" || lastParNodeName == "INS")
                    || (parNodeName == "A" || parNodeName == "CODE" || parNodeName == "KBD" || parNodeName == "EM" || parNodeName == "I" || parNodeName == "U" || parNodeName == "G-EMOJI" || parNodeName == "STRONG" || parNodeName == "B" || parNodeName == "DEL" || parNodeName == "STRIKE" || parNodeName == "S" || parNodeName == "INS")
                )
                && (
                    curHighlight.substring(0,1) == " " || curHighlight.substring(0,1) == '\xa0' || curHighlight.substring(0,1) == ")" || curHighlight.substring(0,1) == "." || curHighlight.substring(0,1) == "?" || curHighlight.substring(0,1) == "!" || curHighlight.substring(0,1) == "," || curHighlight.substring(0,1) == ":" || curHighlight.substring(0,1) == ";" || curHighlight.substring(0,1) == '”' || curHighlight.substring(0,1) == '“' || curHighlight.substring(0,1) == ']' || curHighlight.substring(0,1) == '+' || curHighlight.substring(0,1) == "–" || curHighlight.substring(0,1) == "-" || curHighlight.substring(0,1) == "'" || curHighlight.substring(0,1) == '"' ||
                    prevNode.parentElement.parentElement.parentElement.innerText.toString().trim() == curNode.parentElement.innerText.toString().trim()
                )
                && prevNode.getAttribute('hlheader') != 1
                && (parOfparNodeName != "LI" || curHighlight.toString().trim() != curNode.parentElement.parentElement.innerText.toString().trim()) //If an LI item and current matches full text of LI, then you want a new line
            )
            || parNodeName == "SUP" || parOfparNodeName == "SUP" || curHighlight.substring(0,1) == "."
            || parNodeName == "SUB"
            || curNode.parentElement.parentElement.className == "mw-editsection"
            || (lastParNodeName == "A" && parNodeName == "A" && (parOfparNodeName != "LI" || curHighlight.toString().trim() != curNode.parentElement.parentElement.innerText.toString().trim().substring(0,curHighlight.toString().trim().length)) && (curNode.parentElement.parentElement.innerText.toString().trim() != curHighlight.toString().trim() || (curNode.parentElement.parentElement.innerText.toString().trim() == curNode.parentElement.innerText.toString().trim() && curNode.parentElement.parentElement.dataset.sk == 'tooltip_parent')) && (prevNode.parentElement.parentElement.innerText.toString().trim() == curNode.parentElement.parentElement.innerText.toString().trim() || prevNode.parentElement.parentElement.parentElement.innerText.toString().trim() == curNode.parentElement.parentElement.innerText.toString().trim() || prevNode.parentElement.parentElement.parentElement.innerText.toString().trim() == curNode.parentElement.parentElement.parentElement.innerText.toString().trim())) //Was added due to Wikipedia back to back link use case ; adding one more requirement though as created another issue; and another case for Slack
            || (curHighlight.substring(0,1) == " " && prevNode.innerText.substring(prevNode.innerText.length - 1) == " ")
        )
        {
            return true;
        }
        else{return false;}
    }

    function addEllipsis(wholeLine, thisIsHeader, thisIsBullet)
    {
        //* NEW FEATURE from 10-21-20 to add "..." at beginning and/or end of highlights that are mid-sentence
        var tmpwholeLine = wholeLine
        if(thisIsHeader == 0 && thisIsBullet == 0)
        {
            var tmp1 = tmpwholeLine.indexOf('<li>')
            var tmp2 = tmpwholeLine.indexOf('</li>')
            if(tmp1 > -1 && tmp2 > -1)
            {
                var begOfLine = tmpwholeLine.substring(0,tmp1+4)
                var endOfLine = tmpwholeLine.substring(tmp2)
                tmpwholeLine = tmpwholeLine.substring(tmp1 + 4, tmp2)
                var begBold = tmpwholeLine.startsWith(formatBold)
                var endBold = tmpwholeLine.endsWith(formatBold)
                var begItalics = tmpwholeLine.startsWith(formatItalics)
                var endItalics = tmpwholeLine.endsWith(formatItalics)
                if(begBold){tmpwholeLine = tmpwholeLine.substring(formatBold.length)}
                if(endBold){tmpwholeLine = tmpwholeLine.substring(0,tmpwholeLine.length-formatBold.length)}
                if(begItalics){tmpwholeLine = tmpwholeLine.substring(formatItalics.length)}
                if(endItalics){tmpwholeLine = tmpwholeLine.substring(0,tmpwholeLine.length-formatItalics.length)}
            }

            var getFirstChar = tmpwholeLine.substring(0,1)
            var begEllips = false
            var getLastChar = tmpwholeLine.slice(-1)
            var endEllips = false

            switch (elipOpt)
            {
                case 0:
                    //Default
                    break;
                case 1:
                    //Front - Start lower case
                    if((/[a-z]/.test(getFirstChar))){begEllips = true}
                    break;
                case 2:
                    //Back - End with letter, and not a LI bullet
                    if((/[A-Za-z]/.test(getLastChar))){endEllips = true}
                    break;
                case 3:
                    //Both - combine front and back
                    if((/[a-z]/.test(getFirstChar))){begEllips = true}
                    if((/[A-Za-z]/.test(getLastChar))){endEllips = true}
                    break;
            }

            if(tmp1 > -1 && tmp2 > -1)
            {
                if(begItalics){tmpwholeLine = formatItalics + tmpwholeLine}
                if(endItalics){tmpwholeLine = tmpwholeLine + formatItalics}
                if(begBold){tmpwholeLine = formatBold + tmpwholeLine}
                if(endBold){tmpwholeLine = tmpwholeLine + formatBold}
            }

            if(begEllips){tmpwholeLine = '...' + tmpwholeLine}
            if(endEllips){tmpwholeLine = tmpwholeLine + '...'}

            if(tmp1 > -1 && tmp2 > -1)
            {
                tmpwholeLine = begOfLine + tmpwholeLine + endOfLine
            }
        }

        return tmpwholeLine
    }

    function customDate(dateValue, dateFormat = 'mm-dd-yyyy')
    {
        //var dateString = dateValue.toLocaleDateString();
        var dateString = dateFormat.toLowerCase().trim();
        var monthFound = dateValue.getMonth();
        var monthStr = ("0" + (monthFound+1)).slice(-2);

        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
          ]
        var monthNameStr = months[monthFound];

        var dayFound = dateValue.getDate();
        var dayStr = ("0" + dayFound).slice(-2);

        var dayOfWeek = dateValue.getDay();
        const daysOfWeek = [
            'Sun',
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat'
          ]
        var dayOfWeekStr = daysOfWeek[dayOfWeek];

        var yearFound = dateValue.getFullYear();
        var yearStr = yearFound.toString();

        var lookFor = '';
        var replaceWith = '';

        lookFor = 'mm';
        replaceWith = monthStr;
        if(dateString.indexOf(lookFor) > -1)
        {
            dateString = dateString.replace(lookFor,replaceWith);
        }

        lookFor = 'month';
        replaceWith = monthNameStr;
        if(dateString.indexOf(lookFor) > -1)
        {
            dateString = dateString.replace(lookFor,replaceWith);
        }

        lookFor = 'dd';
        replaceWith = dayStr;
        if(dateString.indexOf(lookFor) > -1)
        {
            dateString = dateString.replace(lookFor,replaceWith);
        }

        lookFor = 'day';
        replaceWith = dayOfWeekStr;
        if(dateString.indexOf(lookFor) > -1)
        {
            dateString = dateString.replace(lookFor,replaceWith);
        }

        lookFor = 'yyyy';
        replaceWith = yearStr;
        if(dateString.indexOf(lookFor) > -1)
        {
            dateString = dateString.replace(lookFor,replaceWith);
        }

        lookFor = 'yy';
        replaceWith = yearStr.slice(-2);
        if(dateString.indexOf(lookFor) > -1)
        {
            dateString = dateString.replace(lookFor,replaceWith);
        }

        lookFor = 'roam';
            var itm = 0;
            if (dayFound <= 0) {itm = 4;}
            else if ((dayFound > 3 && dayFound < 21) || dayFound % 10 > 3) {itm = 0;} //% gives you remainder after dividing
            else {itm = dayFound % 10;}
        replaceWith = monthNameStr + ' ' + (dayFound + ['th', 'st', 'nd', 'rd', ''][itm]) + ', ' + yearStr;
        if(dateString.indexOf(lookFor) > -1)
        {
            dateString = dateString.replace(lookFor,replaceWith);
        }
        return dateString;
    }

    function parseParentTitle()
    {
        var textElem2 = iframeDoc.getElementById("rmHLta2");
        var ptDate = new Date();

        //Split by {% and %} placeholder format and loop through
        var delimeters = textElem2.value.split(/({%|%})/)
        var openPlaceholder = false;
        var finalPTstring = '';
        for(var x=0, eachValue; eachValue = delimeters[x]; x++)
        {
            var parsedText = eachValue;
            if(parsedText != '' && parsedText != '%}')
            {
                if(openPlaceholder)
                {
                    var eachValueArr = parsedText.split('@');
                    var eachValueStr = eachValueArr[0];
                    if(eachValueArr[1]){var eachValParam = eachValueArr[1]}else{var eachValParam = ''}

                    switch (eachValueStr.toLowerCase())
                    {
                        case 'title':
                            parsedText = pageTitle;
                            if(eachValParam != ''){parsedText = parsedText.split(eachValParam)[0].trim();}
                            //Since Roam doesn't handle [ ] inside markdown links, replace with ( ) if found in page title
                            parsedText = parsedText.split("[").join("(").split("]").join(")");
                            break;
                        case 'url':
                            parsedText = location.href;
                            break;
                        case 'date':
                            var parsedText = ptDate.toLocaleDateString();
                            if(eachValParam != ''){parsedText = customDate(ptDate, eachValParam);}
                            break;
                        case 'time':
                            var parsedText = ( ("0" + ptDate.getHours()).slice(-2) ) + ":" + ( ("0" + ptDate.getMinutes()).slice(-2) );
                            break;
                    }

                    finalPTstring = finalPTstring + parsedText;
                    openPlaceholder = false;
                }
                else
                {
                    if(eachValue == '{%')
                    {
                        openPlaceholder = true;
                    }
                    else
                    {
                        finalPTstring = finalPTstring + parsedText;
                    }
                }
            }
        }

        return finalPTstring;
    }

    //This function loops through the elements with the highlighter "class" set by the script and adds to clipboard in Roam format
    function updateClipboard(event) {
        var reference = parseParentTitle();
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
                //Replace hashtag # in the markdown link name to No. as they mess with in Roam messing up the link (example is Github Issue # references)
                linkTextToUse = linkTextToUse.split("#").join("No.");
                linkTextToUse = linkTextToUse.trim().replace(/(\r\n|\n|\r)/gm," ");
                var linkHref = eachLink.href;
                //Change # in a link address for now so can replace later in script because otherwise it will auto replace # with `#` and ruin link
                linkHref = linkHref.split("#").join("|HASHTAG|")

                if(linkHref.indexOf("http") > -1 || linkHref.indexOf("www.") > -1)
                {
                    if(eachLink.innerText == eachLink.href || eachLink.innerText == eachLink.href + '/' || eachLink.innerText + '/' == eachLink.href)
                    {
                        var foundALink = linkHref;
                    }
                    else
                    {
                        var foundALink = `[${linkTextToUse}](${linkHref})`;
                    }
                }
                else
                {
                    var foundALink = `[${linkTextToUse}]`;
                }

                foundALink = foundALink.split(")]").join("|)|]");
                if(!bLinks || eachLink.classList.contains("c-message__sender_link") || eachLink.classList.contains("c-member_slug--link")) //Remove link formatting like from Wikipedia as it can be distracting... also slack username links
                {
                    if(eachLink.innerText == eachLink.href || (eachLink.innerText + '/') == eachLink.href || ('http://' + eachLink.innerText) == eachLink.href || ('https://' + eachLink.innerText) == eachLink.href || ('http://' + eachLink.innerText + '/') == eachLink.href || ('https://' + eachLink.innerText + '/') == eachLink.href)
                    {
                        foundALink = eachLink.href;
                        foundALink = foundALink.split("#").join("|HASHTAG|")
                    }
                    else
                    {
                        foundALink = formatItalics + eachLink.innerText.split("#").join("_") + formatItalics;
                    }
                }

                if(debugMode != 0){writeToConsole(`Here: [${eachLink.innerText}](${eachLink.href})`);}
                eachHighlight = eachHighlight.replace(eachLink.innerText, foundALink);
                //Can't just set to foundALink because there could be ||ul-two|| etc. in front of link which would be lost
                //Fixed line breaks in middle of <a> links anyways with the new "default" option to remove line breaks within a single element
                //eachHighlight = foundALink;
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
                            var newHighlightCase = newHighlight.toLowerCase();

                            switch (pgRefCase)
                            {
                                case 0:
                                    //Default as is on page
                                    newHighlightCase = newHighlight;
                                    break;
                                case 1:
                                    //Each Word Capitalized
                                    newHighlightCase = newHighlightCase.replace(/\w\S*/g, function(txt){
                                        return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
                                    });
                                    break;
                                case 2:
                                    //First word capitalized
                                    newHighlightCase = newHighlightCase.charAt(0).toUpperCase() + newHighlightCase.slice(1);
                                    break;
                                case 3:
                                    //all lower
                                    newHighlightCase = newHighlightCase;
                                    break;
                                case 4:
                                    //ALL UPPER
                                    newHighlightCase = newHighlightCase.toUpperCase();
                                    break;
                            }

                            replaceLastText = replaceLastText.replace(newHighlight,`|[|[${newHighlightCase}|]|]`);
                            if(debugMode != 0)
                            {
                                writeToConsole('replaceLastText: ' + replaceLastText);
                                writeToConsole('lastMainSpanText: ' + lastMainSpanText);
                                writeToConsole('eachHighlight: ' + eachHighlight);
                            }
                            eachHighlight = eachHighlight.replace(lastMainSpanText,replaceLastText);
                            eachHighlight = eachHighlight.split(formatBold + "|[|[").join("|[|[").split(formatItalics + "|[|[").join("|[|[").split(formatCode + "|[|[").join("|[|[").split("|]|]" + formatBold).join("|]|]").split("|]|]" + formatItalics).join("|]|]").split("|]|]" + formatCode).join("|]|]");
                            if(debugMode != 0){writeToConsole('eachHighlight: ' + eachHighlight);}
                            lastMainSpanText = replaceLastText;
                        }
                        else
                        {
                            bIsSameLine = isSameLine(elemSpan, prevNode, lastParNodeName);
                            lastParNodeName = parNodeName;
                            prevNode = elemSpan;
                            newHighlight = convertFormat(newHighlight, elemSpan);
                            if(debugMode != 0){writeToConsole('newHighlight: ' + newHighlight);}

                            if(parNodeName == "A")
                            {
                                var eachLink = elemSpan.parentElement;
                                var linkTextToUse = eachLink.innerText;
                                //Account for footnote numbering like [7] because it turns to double brackets then which we don't want
                                linkTextToUse = linkTextToUse.split("[").join("(").split("]").join(")");
                                //Replace hashtag # in the markdown link name to No. as they mess with in Roam messing up the link (example is Github Issue # references)
                                linkTextToUse = linkTextToUse.split("#").join("No.");
                                linkTextToUse = linkTextToUse.trim().replace(/(\r\n|\n|\r)/gm," ");
                                var linkHref = eachLink.href;
                                //Change # in a link address for now so can replace later in script because otherwise it will auto replace # with `#` and ruin link
                                linkHref = linkHref.split("#").join("|HASHTAG|")

                                if(linkHref.indexOf("http") > -1 || linkHref.indexOf("www.") > -1)
                                {
                                    if(eachLink.innerText == eachLink.href || eachLink.innerText == eachLink.href + '/' || eachLink.innerText + '/' == eachLink.href)
                                    {
                                        var foundALink = linkHref;
                                    }
                                    else
                                    {
                                        var foundALink = `[${linkTextToUse}](${linkHref})`;
                                    }
                                }
                                else
                                {
                                    var foundALink = `[${linkTextToUse}]`;
                                }

                                foundALink = foundALink.split(")]").join("|)|]");
                                if(!bLinks || eachLink.classList.contains("c-message__sender_link") || eachLink.classList.contains("c-member_slug--link")) //Remove link formatting like from Wikipedia as it can be distracting... also slack username links
                                {
                                    if(eachLink.innerText == eachLink.href || (eachLink.innerText + '/') == eachLink.href || ('http://' + eachLink.innerText) == eachLink.href || ('https://' + eachLink.innerText) == eachLink.href || ('http://' + eachLink.innerText + '/') == eachLink.href || ('https://' + eachLink.innerText + '/') == eachLink.href)
                                    {
                                        foundALink = eachLink.href;
                                        foundALink = foundALink.split("#").join("|HASHTAG|")
                                    }
                                    else
                                    {
                                        foundALink = formatItalics + eachLink.innerText.split("#").join("_") + formatItalics;
                                    }
                                }

                                if(debugMode != 0){writeToConsole(`HERE2: [${eachLink.innerText}](${eachLink.href})`);}
                                newHighlight = newHighlight.replace(eachLink.innerText, foundALink);
                                //Can't just set to foundALink because there could be ||ul-two|| etc. in front of link which would be lost
                                //Fixed line breaks in middle of <a> links anyways with the new "default" option to remove line breaks within a single element
                                //newHighlight = foundALink;
                            }

                            if(bIsSameLine && elemSpan.getAttribute('hlheader') != 1){eachHighlight += newHighlight;}else{eachHighlight += '\n' + newHighlight;}
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

        var cbElemPgTitle = iframeDoc.getElementById("rmHLcbPgTitle");
        if(iframeDoc.getElementById("rmHLta2").value != ''){cbElemPgTitle.checked = true;}else{cbElemPgTitle.checked = false;}
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
        var lastWasHeader = 0;
        for(var x=0, eachLine; eachLine = lineBreaks[x]; x++)
        {
            //debugMode = 1;
            if(debugMode != 0){writeToConsole(x);}
            if(debugMode != 0){writeToConsole(eachLine);}
            if(debugMode != 0){writeToConsole('indentLevel: ' + indentLevel);}
            if(debugMode != 0){writeToConsole('ulList: ' + ulList);}
            if(debugMode != 0){writeToConsole('rootBullet: ' + rootBullet);}
            if(debugMode != 0){writeToConsole('levelNumber: ' + levelNumber);}
            if(debugMode != 0){writeToConsole('lastLevelNumber: ' + lastLevelNumber);}

            //var elemType = eachLine.substring(0,4);
            //if(elemType == '<h1>' || elemType == '<h2>' || elemType == '<h3>' || elemType == '<h4>' || elemType == '<h5>')
            //{
            var thisIsHeader = 0;
            if(eachLine.substring(0,10) == '<li>||h1||')
            {
                thisIsHeader = 1;
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
                thisIsHeader = 1;
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
                thisIsHeader = 1;
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
                thisIsHeader = 1;
                //In case multi element part line and added manually header H6 for indent, need to remove all <h6></h6> stuff and add on just ends so not multiple
                eachLine = eachLine.split("<h6>").join('').split("</h6>").join('').split("<li>").join('').split("</li>").join('');
                if(bHeaders){eachLine = '<li><h6>' + eachLine + '</h6></li>';}else{eachLine = '<li>' + eachLine + '</li>';}
                if(indentLevel == 0){eachLine = eachLine.replace('</li>','</li><ul>');}else{eachLine = '</ul>' + eachLine.replace('</li>','</li><ul>');}
                indentLevel++;
            }

            //if(eachLine.substring(0,9) == '<li>||ul-')
            var thisIsBullet = 0;
            if(eachLine.indexOf('||ul-') > -1)
            {
                thisIsBullet = 1
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

                if(debugMode != 0){writeToConsole('indentLevel: ' + indentLevel);}
                if(debugMode != 0){writeToConsole('ulList: ' + ulList);}
                if(debugMode != 0){writeToConsole('rootBullet: ' + rootBullet);}
                if(debugMode != 0){writeToConsole('levelNumber: ' + levelNumber);}
                if(debugMode != 0){writeToConsole('lastLevelNumber: ' + lastLevelNumber);}
                if(debugMode != 0){writeToConsole('lastWasHeader: ' + lastWasHeader);}

                if(lastWasHeader == 1 && lastLevelNumber == 0 && levelNumber == 1 && ulList > 0){ulList--} //Accounts for when a header is followed directly by bullet/numbered list so shouldn't have ulList becasue already nested naturally under header
                lastLevelNumber = origLevelNumber;
            }
            else
            {
                levelNumber = 0;
                if(rootBullet == lastLevelNumber)
                {
                    ulList = 0;
                }
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
            eachLine = eachLine.split("  ").join(" ")
            if(elipOpt > 0 && (x > 0 || cbElemPgTitle.checked == false || reference == '')){eachLine = addEllipsis(eachLine, thisIsHeader, thisIsBullet)}
            htmlConcatHighlights = htmlConcatHighlights + eachLine;
            //debugMode = 0;
            lastWasHeader = thisIsHeader;
        }

        if(indentLevel > 0){htmlConcatHighlights = htmlConcatHighlights + '</ul>';}

        while(ulList > 0)
        {
            htmlConcatHighlights = htmlConcatHighlights + '</ul>';
            ulList = ulList - 1;
        }

        if(htmlConcatHighlights.indexOf("<ul>") > -1){htmlConcatHighlights = htmlConcatHighlights + '</ul>';}
        htmlConcatHighlights = htmlConcatHighlights.split("<ul><ul>").join('<ul>');
        htmlConcatHighlights = htmlConcatHighlights.split(")[").join(") ["); //Fixing when two links are back to back next to each other. Need to add a space.
        htmlConcatHighlights = htmlConcatHighlights.split("||SOL||").join("").split("||EOL||").join(""); //start of line and end of line used for ellipsis logic
        htmlConcatHighlights = htmlConcatHighlights.split("<li> ").join("<li>").split(" </li>").join("</li>"); //Fixing when two links are back to back next to each other. Need to add a space.
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
            if(x == 0 && cbElemPgTitle.checked){newPlainText = eachLine + '\n';} //Page link does not need bullet
        }

        if(newPlainText.trim() != ''){plainConcatHighlights = newPlainText.trim();}

        var clipboardDataEvt = event.clipboardData;
        clipboardDataEvt.setData('text/plain', plainConcatHighlights);
        clipboardDataEvt.setData('text/html', htmlConcatHighlights);
        var textInput = iframeDoc.getElementById("rmHLtextArea");
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
        //Scroll to the bottom of the textArea element to see the latest highlights when your window is full
        textInput.scrollTop = textInput.scrollHeight;
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
            var startCont = range.startContainer;
            var startOff = range.startOffset;
            var endCont = range.endContainer;
            var endOff = range.endOffset;

            if(startCont.nodeName != '#text') //Typically means they started their selection in a weird spot outside the text element. Often happens when trying to make sure you don't miss any text.
            {
                if(startCont.textContent == '' && startCont.innerText == '')
                {
                    var loopCtr = 0;
                    do
                    {
                        startCont = startCont.parentElement;
                        startOff = 0;
                        if(startCont.innerText){var foundText = startCont.innerText}else{var foundText = ''}
                        if(foundText != '' && foundText){break;}
                        loopCtr++;
                    }while (loopCtr < 10 && startCont.parentElement.nodeName != 'BODY')
                }
            }

            if(endCont.nodeName != '#text' && endOff == 0) //Typically means user did a triple click selection
            {
                if(startCont.parentElement.lastChild.nodeName == '#text')
                {
                    endCont = startCont.parentElement.lastChild; //Set to the start selection container to be safe and use last child to get entire element
                    endOff = endCont.length;
                }
                else
                {
                    if(startCont.parentElement.lastChild.childNodes[0].nodeName == '#text')
                    {
                        endCont = startCont.parentElement.lastChild.childNodes[0];
                        endOff = endCont.length;
                    }
                }
            }

            range.setStart(startCont, startOff)
            range.setEnd(endCont, endOff)
            var allWithinRangeParent = range.commonAncestorContainer;

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

            function ignoreElementContainer(elemInput)
            {
                //This will stop parsing through any children of an element found so you can add a parent element class instead of having to add all the variations under it like in the ignoreElement function
                //Slack post reactions, timestamps, media etc. + GitHub hidden comments boxes and reaction emoji stuff
                var elemClassCheck = elemInput.className;
                if (typeof elemClassCheck === 'string' || elemClassCheck instanceof String){elemClassCheck = elemClassCheck.trim()}else{elemClassCheck = ''}

                if(
                //Slack messages
                elemClassCheck == 'c-message_kit__attachments' || elemClassCheck == 'toggl-button slack-message min'
                //Github issues
                 || elemClassCheck == 'avatar-parent-child TimelineItem-avatar d-none d-md-block' || elemClassCheck == 'timeline-comment-actions flex-shrink-0' || elemClassCheck == 'd-none d-sm-flex' || elemClassCheck == 'text-normal drag-and-drop hx_drag-and-drop position-relative d-flex flex-justify-between' || elemClassCheck == 'comment-reactions flex-items-center border-top  js-reactions-container' || elemClassCheck == 'js-details-container Details toolbar-commenting d-flex no-wrap flex-items-start flex-wrap px-2 pt-2 pt-lg-0 border-md-top border-lg-top-0' || elemClassCheck == 'js-comment-update' || elemClassCheck == 'js-minimize-comment d-none js-update-minimized-content' || elemClassCheck == 'js-comment-edit-history' || elemClassCheck == 'TimelineItem' || elemClassCheck == 'TimelineItem js-targetable-element')
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }

            function ignoreElement(elemInput)
            {
                //Skipping certain types of elements we don't want to add to highlighter

                //Toggl Tracker hidden svg creates errors
                if(elemInput.parentElement.parentElement.nodeName == 'svg' || elemInput.parentElement.nodeName == 'svg'){return true}

                //Slack post reactions, timestamps, media etc.
                var elemClassCheck = elemInput.parentElement.className.trim();
                var parElemClassCheck = elemInput.parentElement.parentElement.className.trim();
                var parParElemClassCheck = elemInput.parentElement.parentElement.parentElement.className.trim();
                var parElemType = elemInput.parentElement.nodeName;

                if(
                    //Slack
                    elemClassCheck == 'c-reaction__count' || elemClassCheck == 'c-timestamp__label' || elemClassCheck == 'c-message__edited_label' || elemClassCheck == 'c-message_kit__file__meta__text' || elemClassCheck == 'c-message_kit__file__meta' || elemClassCheck == 'c-pillow_file__swap' || elemClassCheck == 'c-pillow_file__title' || elemClassCheck == 'c-pillow_file__slide c-pillow_file__size__action' || parElemClassCheck == 'c-message_kit__file__meta__text' || elemClassCheck == 'c-link--button c-message_kit__labels__link' || parElemClassCheck == 'c-pillow_file__header c-pillow_file__header--tombstone' || elemClassCheck == 'c-message_attachment__author_name' || elemClassCheck == 'c-message_attachment__author c-message_attachment__author--has_subname' || elemClassCheck == 'c-message_attachment__author_subname' || parElemClassCheck == 'c-link c-message_attachment__title_link' || elemClassCheck == 'p-threads_flexpane__separator_count' || elemClassCheck == 'p-threads_view_load_older_message p-threads_view_load_older_message--with-gutter' || elemClassCheck == 'c-link--button c-message_attachment__text_expander' || elemClassCheck == 'c-message_attachment__footer_attribution c-message_attachment__part' || parElemClassCheck == 'c-message_attachment__footer_attribution c-message_attachment__part' || elemClassCheck == 'c-message_attachment__footer_text c-message_attachment__part' || parParElemClassCheck == 'c-message_attachment__footer_text c-message_attachment__part' || parElemClassCheck == 'c-message_attachment__text' || parParElemClassCheck == 'c-message_attachment__text' || elemClassCheck == 'c-message_attachment__footer' || parElemClassCheck == 'c-link--button c-member_link c-message_attachment__author_name' || parElemClassCheck == 'c-message_attachment__footer_text c-message_attachment__part' || parElemClassCheck == 'c-message_attachment__footer_ts c-message_attachment__part' || parElemClassCheck == 'c-message_attachment__part sk_highlight' || elemClassCheck == 'c-message_list__unread_divider__label'
                    //Github issues
                    || parElemType == 'G-EMOJI' || parElemType == 'BUTTON' || parElemType == 'TEXTAREA' || parElemClassCheck == 'comment-form-error comment-show-stale' || parElemClassCheck == 'link-gray js-timestamp')
                {
                    return true;
                }
                else
                {
                    return false;
                }
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
                    //Skip parsing deeper into this element if on ignored list (primarily for Slack where we don't want to dig into Attachments like videos etc.)
                    var skipElement = ignoreElementContainer(elemInput);
                    if(!skipElement)
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
                }
                else
                {
                    if(debugMode != 0){writeToConsole("FIND LOWEST NODE: NO CHILDREN",3);}
                    if(inputNodeName == '#text'){inputNodeText = elemInput.textContent;}else{inputNodeText = elemInput.innerText;}
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
                            if(endCont.textContent.trim() == inputNodeText.trim() && endCont.parentElement == elemInput.parentElement)
                            {
                                if(debugMode != 0){writeToConsole(`******* FOUND THE END ********`);}
                                if(debugMode != 0){writeToConsole(`inputNodeText.trim(): ${inputNodeText.trim()} | endCont.textContent.trim(): ${endCont.textContent.trim()}`);}
                                resultText = endCont.textContent.substring(0, endOff);
                                foundEnd = 1;
                                endPos = endOff;
                            }
                            allTextFound += '\n' + resultText;
                        }

                        if(endOff == 0 && (elemInput.parentElement == endCont || elemInput.parentElement == endCont.parentElement))
                        {
                            if(debugMode != 0){writeToConsole(`******* FOUND THE END here ********`);}
                            foundEnd = 1;
                            endPos = endOff;
                        }
                        else
                        {
                            //Skipping certain types of elements we don't want to add to highlighter like Slack reactions to posts
                            var skipElement = ignoreElement(elemInput);

                            //debugMode = 1;
                            if(debugMode != 0)
                            {
                                writeToConsole('');
                                writeToConsole('skipElement: ' + skipElement);
                                writeToConsole('foundStartOfSelection: ' + foundStartOfSelection);
                                writeToConsole(elemInput,1,0);
                                writeToConsole(elemInput.parentElement,1,0);
                                writeToConsole('elemInput.parentElement.nodeName: ' + elemInput.parentElement.nodeName);
                                writeToConsole('startPos: ' + startPos);
                                writeToConsole('endPos: ' + endPos);
                                writeToConsole('elemInput.parentElement.className: ' + elemInput.parentElement.className);
                            }
                            //debugMode = 0;

                            if(!skipElement)
                            {
                                //if(foundStartOfSelection == 1 && elemInput.parentElement.nodeName != 'STYLE' && elemInput.nodeName != 'TEMPLATEs'){createSpanElement(elemInput, startPos, elemInput, endPos);}
                                if(foundStartOfSelection == 1 && elemInput.parentElement.nodeName != 'STYLE' && elemInput.parentElement.nodeName != 'SVG'){createSpanElement(elemInput, startPos, elemInput, endPos);}
                            }
                        }
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
                        writeToConsole("Selection here found");
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
                            if(debugMode != 0){writeToConsole("Exiting the REAL loop as foundEnd == 1");}
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

    //Add listener for auto highlighting trigger without needing ctrl+X
    document.addEventListener('click', function (evt)
    {
        if(bAutoHL && showWindow == 1)
        {
            if(evt.detail > 1 && evt.detail != 3){return} //Prevents double-click so that if already highlighted then double click still changes to blue which means Roam page link; also allows triple click to work

            if(typeof window.getSelection != "undefined")
            {
                var selectedTextStr = window.getSelection().toString();
                if(selectedTextStr != '')
                {
                    var selectedElement = evt.target;
                    if(selectedElement.className == "roamJsHighlighter" || selectedElement.className == "roamJsHighlighter pageLink"){return} //Exit if already highlighted as need ability to select multi word highlights to turn blue with Alt + Z
                    //Force the "cut" event because the clipboardData event setData doesn't work unless activated from a cut/copy event.
                    //We already have the "cut" event listener set to run our code, so this should activate it
                    clickEvent = 0;
                    document.execCommand('cut');
                }
            }
        }
    });

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
