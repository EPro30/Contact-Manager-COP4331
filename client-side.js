let loaded = sessionStorage.getItem("loaded");
if (!loaded)
{
	sessionStorage.setItem("fontSize", 20);
	sessionStorage.setItem("loaded", true);
	loaded = sessionStorage.getItem("loaded");
	console.log(loaded);
	setFontSize();
}

function increaseFontSize() {
	txt = document.getElementsByClassName('siteFont');
	console.log(txt);
	style = window.getComputedStyle(document.getElementById('siteFont'), null).getPropertyValue('font-size');
	currentSize = parseFloat(style);
	console.log(currentSize);
	if (currentSize >= 32)
	{
		return;
	}
	
	else
	{
		currentSize = currentSize + 4;
		for (let i = 0; i < txt.length; ++i)
		{
			style = window.getComputedStyle(txt[i], null).getPropertyValue('font-size');
			txt[i].style.fontSize = (parseInt(txt[i].style.fontSize) + 4) + 'px';
		}
		sessionStorage.setItem("fontSize", currentSize);
		console.log(sessionStorage.getItem("fontSize"));
		document.getElementById("selectFontSize").innerHTML = "Font: " + currentSize + "px";
	}
}

function decreaseFontSize() {
	txt = document.getElementsByClassName('siteFont');
	console.log(txt);
	style = window.getComputedStyle(document.getElementById('siteFont'), null).getPropertyValue('font-size');
	currentSize = parseFloat(style);
	console.log(currentSize);
	if (currentSize <= 20)
	{
		return;
	}
	
	else
	{
		currentSize = currentSize - 4;
		for (let i = 0; i < txt.length; ++i)
		{
			style = window.getComputedStyle(txt[i], null).getPropertyValue('font-size');
			txt[i].style.fontSize = (parseInt(txt[i].style.fontSize) - 4) + 'px';
		}
		sessionStorage.setItem("fontSize", currentSize);
		console.log(sessionStorage.getItem("fontSize"));
		document.getElementById("selectFontSize").innerHTML = "Font: " + currentSize + "px";
	}
}

function setFontSize() 
{
	if (!loaded)
	{
		return;
	}
	
	else
	{
		let selectedFont = sessionStorage.getItem("fontSize");
		txt = document.getElementsByClassName('siteFont');
		console.log(selectedFont);
		for (let i = 0; i < txt.length; ++i)
		{
			style = window.getComputedStyle(txt[i], null).getPropertyValue('font-size');
			txt[i].style.fontSize = (selectedFont) + 'px';
		}
		
		let headings = $(":header");
		console.log(headings);
		
		for (let i = 0; i < headings.length; ++i)
		{
			style = window.getComputedStyle(headings[i], null).getPropertyValue('font-size');
			headings[i].style.fontSize = (parseInt(selectedFont) + 8) + 'px';
			console.log(headings[i].style.fontSize);
		}
		
		document.getElementById("selectFontSize").innerHTML = "Font: " + selectedFont + "px";
	}
}