var myHighlights = document.querySelectorAll('.a-size-base-plus.a-color-base, .kp-notebook-metadata');
var textString = "";
var tmpString = "";
var hlLocation = "";
var hlColor = "";
//var titleElem = document.getElementById('');
//var bookTitle = "";
for(var i = 0; i < myHighlights.length; i++)
{
    var curElement = myHighlights.item(i);
    var curText = curElement.innerText.toString().trim();
    if(curText != "")
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
            textString += '#Highlights\n';
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
window.prompt("Text:",textString);
