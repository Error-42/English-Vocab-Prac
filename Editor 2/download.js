var a = window.document.createElement('a');
a.href = window.location.href;
var params = new URLSearchParams(a.search);
var filename = params.get("filename");
var text = params.get("text");
a.style.display = "none";

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);

    setTimeout(function(){ window.close(); }, 100);
}

download(filename + '.json', text);