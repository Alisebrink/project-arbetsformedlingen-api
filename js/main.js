// Denna fil ska innehålla er lösning till projektuppgiften.
"use strict";

/*  Delar till ej obligatorisk funktionalitet, som kan ge poäng för högre betyg
*   Radera rader för funktioner du vill visa på webbsidan. */
document.getElementById("search").style.display = "none";      // Radera denna rad för att visa sök
// document.getElementById("shownumrows").style.display = "none"; // Radera denna rad för att visa antal träffar

/* Här under börjar du skriva din JavaScript-kod */


var openAds = document.getElementById("mainnavlist");// skapar en variabel för att kunna göra länen klickbara som hänvisar till ul-taggens tilldelade id
var inputValue = document.getElementById("numrows"); // skapar en variabel för att kunna hämta data från input-rutan med id "numrows"

// Eventhandler för listan med län
openAds.addEventListener("click", function (m) { // bestämmer att den aktiveras när jag klickar och skapar sedan en anonym funktion
    printAds(m.target.id); // i funktionen anropas en funkion som heter printAds som ska köras med idt för det "target" jag klickar på
});

// Eventhandler som aktiveras vid ändring (change) i input-fältet
inputValue.addEventListener("change", function () {
    inputValue = document.getElementById("numrows").value; // hämtar värdet i input-rutan om det ändras och sparar det i en variabel som heter inputValue
});

var xhr = new XMLHttpRequest(); // skapar en variabel som är ett nytt Ajax-anrop

xhr.onload = function () { // on load av min hemsida ska detta ske, den hämtar och skriver ut data från AF-api
    if (xhr.status === 200) { // om det finns något att hämta körs den

        var jsonStr = JSON.parse(xhr.responseText); // parsar datan från databasen till strängar

        var arbetsformedlingen = jsonStr.soklista; // sätter en variabel för json datan
        for (var i = 0; i < arbetsformedlingen.sokdata.length; i++) { // min for-loop som printar listan med län
            document.getElementById("mainnavlist").innerHTML += '<li id="' + // den ska printas som li-element i ett element med id "mainnavlist"
                arbetsformedlingen.sokdata[i].id + '">' + arbetsformedlingen.sokdata[i].namn + " (" + // tilldelar varje li-element ett id
                arbetsformedlingen.sokdata[i].antal_ledigajobb + ")" + "</li>";


        }
        // Ett valfritt tillägg som lägger ut text i textrutan vid inladdning av hemsidan.
        document.getElementById("info").innerHTML = "<article><h3>Välkommen till Arbetsförmedlingens annonssida</h3><p> Tryck på ett län för att se vilka lediga arbeten som finns.</p> <p>Vill du se enbart IT-annonser kan du kryssa i rutan nedanför listan med län <br />och du kan enbart visa max 20 annonser åt gången.</p><p>Idag finns det " + arbetsformedlingen.totalt_antal_ledigajobb + " antal lediga jobb hos oss. </article>";
        // rensar textrutan när du har klickat på ett län så att den kan fyllas på med annonser
        openAds.addEventListener("click", function clearDiv() { document.getElementById("info").innerHTML = ""; });
    }
}

function printAds(id) { // när funktionen printAds kör tar den det id som skickas in från min eventListener som aktiveras vid "click"

    var xhr = new XMLHttpRequest(); // funktionen nedan är likadan som den vid onload med undantaget för vad som printas

    xhr.onload = function () {
        if (xhr.status === 200) {

            var jsonStr = JSON.parse(xhr.responseText);
            var arbetsformedlingen = jsonStr.matchningslista;
            if (document.getElementById("onlyit").checked == false) { // om min ruta inte är ikryssad ska denna kod köras

                for (var i = 0; i < arbetsformedlingen.matchningdata.length; i++) { // loop som loopar ut allt i en array
                    let data = "<article>"; // jag skapar en variabel och döper den till data, i den bygger jag sedan min output
                    data += "<h3>" + arbetsformedlingen.matchningdata[i].annonsrubrik + "</h3>";
                    data += "<h4>" + arbetsformedlingen.matchningdata[i].yrkesbenamning + ', ' +
                        arbetsformedlingen.matchningdata[i].arbetsplatsnamn + ', ' +
                        arbetsformedlingen.matchningdata[i].kommunnamn + "</h4>";
                    data += "<p>";
                    data += "<strong>Anställningstyp: </strong>" + arbetsformedlingen.matchningdata[i].anstallningstyp + "<br />";
                    data += "<strong>Publiceringsdatum: </strong>" + arbetsformedlingen.matchningdata[i].publiceraddatum + "<br />";
                    data += "<strong>Sista ansökningsdag: </strong>" + arbetsformedlingen.matchningdata[i].sista_ansokningsdag;
                    data += "</p>";
                    data += '<p> <a href="' + arbetsformedlingen.matchningdata[i].annonsurl + '" target="_blank" class="btn">Läs mer</a></p>';
                    data += "</article>";

                    document.getElementById("info").innerHTML += data; // Här skriver jag ut min variabel som heter data
                }
            }
            else if (document.getElementById("onlyit").checked == true) { // om rutan för IT-tjänster är ikryssad ska denna kod istället köras

                xhr.onload = function () {
                    if (xhr.status === 200) {

                        var jsonStr = JSON.parse(xhr.responseText);
                        var arbetsformedlingen = jsonStr.matchningslista;

                        for (var i = 0; i < arbetsformedlingen.matchningdata.length; i++) {
                            let data = "<article>"; // jag skapar en variabel och döper den till data, i den bygger jag sedan min output
                            data += "<h3>" + arbetsformedlingen.matchningdata[i].annonsrubrik + "</h3>";
                            data += "<h4>" + arbetsformedlingen.matchningdata[i].yrkesbenamning + ', ' +
                                arbetsformedlingen.matchningdata[i].arbetsplatsnamn + ', ' +
                                arbetsformedlingen.matchningdata[i].kommunnamn + "</h4>";
                            data += "<p>";
                            data += "<strong>Anställningstyp: </strong>" + arbetsformedlingen.matchningdata[i].anstallningstyp + "<br />";
                            data += "<strong>Publiceringsdatum: </strong>" + arbetsformedlingen.matchningdata[i].publiceraddatum + "<br />";
                            data += "<strong>Sista ansökningsdag: </strong>" + arbetsformedlingen.matchningdata[i].sista_ansokningsdag;
                            data += "</p>";
                            data += '<p> <a href="' + arbetsformedlingen.matchningdata[i].annonsurl + '" target="_blank" class="btn">Läs mer</a></p>';
                            data += "</article>";

                            document.getElementById("info").innerHTML += data; // Här skriver jag ut min variabel som heter data
                        }
                    }
                }

                // Här rensar jag mitt textfält när jag klickar på ett län, den rensar min div som har id "info" och ersätter det med "ingenting"
                openAds.addEventListener("click", function clearDiv() { document.getElementById("info").innerHTML = ""; });

                // bestämmer vart i AF api min JS-fil ska läsa från och säger att den ska hämta den
                var inputValue = document.getElementById("numrows").value; // läser in värdet från input-boxen från början 
                xhr.open('GET', 'http://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?lanid=' + id + '&yrkesomradeid=3&antalrader=' + inputValue, true); // anropet till servern konkateneras med inputValue från inputfältet
                xhr.send(null);
            }
        }
    }

    // Här rensar jag mitt textfält när jag klickar på ett län, den rensar min div som har id "info" och ersätter det med "ingenting"
    openAds.addEventListener("click", function clearDiv() { document.getElementById("info").innerHTML = ""; });

    // bestämmer vart i AF api min JS-fil ska läsa från och säger att den ska hämta den
    var inputValue = document.getElementById("numrows").value; // läser in värdet från input-boxen från början 
    xhr.open('GET', 'http://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?lanid=' + id + '&antalrader=' + inputValue, true);
    xhr.send(null);
}

// bestämmer vart i AF api min JS-fil ska läsa från och säger att den ska hämta den
xhr.open('GET', 'http://api.arbetsformedlingen.se/af/v0/platsannonser/soklista/lan', true);
xhr.send(null);