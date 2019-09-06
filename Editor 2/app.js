var tabla = $("#tablazat").html();
var szintaktika = '<tr>\n<td>\n<input type="text" class="felkesz alma">\n</td>\n<td>\n<input type="text" class="felkesz alma">\n</td>\n<td>\n<input type="text" class="felkesz alma">\n</td>\n</tr>';
var adatok = new Array();
var magyar = new Array();
var angol = new Array();
var masikSzo = new Array();
var hossz;
var text;
var d = new Date();
var ev = d.getFullYear();
var honap = d.getMonth() + 1;
var nap = d.getDate();
var ido = ev + "-" + honap + "-" + nap;  // Más formátum

function sorHozzaAdasa() {
    $("#tablazat").html(tabla + szintaktika);
    tabla = $("#tablazat").html();
}

function kesz() {
    text = {last_updated: ido};
    text.words = [];
    for (i = 0; i < hossz; i++) {
        switch (i % 3) {
            case 0:
                text.words.push([]);
                text.words[Math.floor(i / 3)][0] = magyar[Math.floor(i / 3)];
                break;
            case 1:
                text.words[Math.floor(i / 3)][1] = angol[Math.floor(i / 3)];
                break;
            case 2:
                text.words[Math.floor(i / 3)][2] = masikSzo[Math.floor(i / 3)];
                break;
            default:
                console.error("Sorry my program isn't working " + Math.random() * Math.sqrt(Math.PI)*500505365);

        }
    }
    var myJSON = JSON.stringify(text);
    var kuldes = "download.html?filename=alma&text=" + myJSON;
    window.open(kuldes);
}

function kiolvasas() {
    hossz = $(".felkesz").length;
    for (let i = 0; i < hossz; i++) {
        adatok[i] = $(".felkesz:first").val();
        switch(i % 3) {
            case 0:
                magyar[Math.floor(i / 3)] = $(".felkesz:first").val();
                break;
            case 1:
                angol[Math.floor(i / 3)] = $(".felkesz:first").val();
                break;
            case 2:
                masikSzo[Math.floor(i / 3)] = $(".felkesz:first").val();
                break;
            default:
                console.error("Sorry my program isn't working " + Math.random() * Math.sqrt(Math.PI)*500505365);
        }
        $(".felkesz:first").removeClass("felkesz");
    }
    $("input").addClass("felkesz");
    kesz();
}