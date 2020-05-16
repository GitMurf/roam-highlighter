var defaultOpt = 0;

function loadOptions() {
	var sameBlockOpt = localStorage["sameBlockOpt"];

	// valid options are 0-3 (shown to user as 1-4)
	if (sameBlockOpt == undefined || (sameBlockOpt != 0 && sameBlockOpt != 1 && sameBlockOpt != 2 && sameBlockOpt != 3)) {
		sameBlockOpt = defaultOpt;
	}

	var select = document.getElementById("linebreaks");
	for (var i = 0; i < select.children.length; i++) {
		var child = select.children[i];
			if (child.value == sameBlockOpt) {
			child.selected = "true";
			break;
		}
	}
}

document.getElementById("saveOptions").addEventListener("click", myFunction);
function myFunction(){
	var select = document.getElementById("linebreaks");
	var sameBlockSel = select.children[select.selectedIndex].value;
	localStorage["sameBlockOpt"] = sameBlockSel;
  	console.log('Set option to: ', sameBlockSel);
}
