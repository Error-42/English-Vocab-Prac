function start() {
    const URL = window.location.href;
    const a = window.document.createElement('a');
    a.href = URL;
    let params = new URLSearchParams(a.search);
    var jsonLoaded = JSON.parse(params.get("load"));
    console.log(jsonLoaded);

    switch (jsonLoaded.version) {
        case "1.0":
                loadValues1_0(jsonLoaded);
            break;
    
        default:
            console.log("incorrect version");
            break;
    }
}
function loadValues1_0(json) {
    if(json.name !== null) {
        document.getElementById("nameInput").value = json.name;
    }
    if(json.description !== null) {
        document.getElementById("descriptionInput").value = json.description;
    }
    if(json.language_from !== null) {
        document.getElementById("languageFromInput").value = json.language_from;
    }
    if(json.language_to !== null) {
        document.getElementById("languageToInput").value = json.language_to;
    }
}