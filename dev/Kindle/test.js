//https://read.amazon.com/kp/notebook?ref_=k4w_ms_notebook
//Need to fix the line breaks into ctrl+shift+V using HTML when integrate into roam-highlighter and the clipboard

var divElem = document.createElement('div');
    divElem.id = 'kindleMain';
    divElem.style.display = "block";
    divElem.style.cssText = 'position:fixed;bottom:0px;right:3px;width:50%;height:50%;opacity:1;z-index:9999;font-size:12px;line-height:normal';

var textInput = document.createElement("textarea");
    textInput.name = "kindleTextArea";
    textInput.style.cssText = 'width:100%;height:100%;background-color:white;color:black;font-weight:bold;white-space:pre;float:right;padding-left:5px;padding-right:1px;font-size:12px;line-height:normal;border-color:black;border-width:1px;border-style:solid';
    textInput.id = 'kindleTextArea';

divElem.appendChild(textInput);
document.body.appendChild(divElem);

var myHighlights = document.querySelectorAll('.a-size-base-plus.a-color-base, .kp-notebook-metadata, div#annotations .kp-notebook-cover-image-border');
var textString = "";
var tmpString = "";
var hlLocation = "";
var hlColor = "";
var coverImg = "";
//var titleElem = document.getElementById('');
//var bookTitle = "";
for(var i = 0; i < myHighlights.length; i++)
{
    var curElement = myHighlights.item(i);
    var curText = curElement.innerText.toString().trim();
    curText = curText.trim().replace(/(\r\n|\n|\r)/gm," ");
    if(curText != "" || curElement.nodeName == 'IMG')
    {

        if(curElement.nodeName == 'H3') //Title
        {
            //console.log('Title: ', curElement.innerText.toString().trim());
            textString += 'Title:: ' + curText + '\n';
        }
        if(curElement.nodeName == 'P' && curElement.classList.contains("a-color-secondary")) //Author
        {
            //onsole.log('\tAuthor: ', curElement.innerText.toString().trim());
            textString += 'Author:: ' + curText + '\n';
            textString += coverImg + '\n';
            textString += '#Kindle-highlights\n';
        }
        if(curElement.nodeName == 'IMG' && curElement.classList.contains("kp-notebook-cover-image-border")) //Cover art
        {
            //onsole.log('\tAuthor: ', curElement.innerText.toString().trim());
            coverImg = '![](' + curElement.src + ')';
        }
        if(curElement.id == 'highlight') //Highlight
        {
            //console.log('Highlight: ', curElement.innerText.toString().trim());
            textString += '  - ' + curText + '\n';
            textString += '    - Color: ' + hlColor + '\n';
            textString += '    - ' + hlLocation + '\n';
        }
        if(curElement.id == 'annotationHighlightHeader') //Highlight type and location
        {
            //.split("[")
            //console.log('Highlight: ', curElement.innerText.toString().trim());
            tmpString = curText.split(" | ");
            hlColor = tmpString[0].trim();
            hlLocation = tmpString[1].trim();
        }
        if(curElement.id == 'note') //Note
        {
            //console.log('\tNote: ', curElement.innerText.toString().trim());
            textString += '    - Note: ' + curText + '\n';
        }
    }
}

//console.log(textString);
//window.prompt("Text:",textString);
textInput.value = textString;
