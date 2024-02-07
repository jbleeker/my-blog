/*
includeHTML() is bedoeld om HTML bestanden in te kunnen voegen in andere HTML bestanden
Het werkt wel iets anders dan de include() functie binnen PHP.
Je roept includeHTML() één keer aan (aan het einde van je pagina) waarna 
de hele pagina doorzocht wordt op HTML tags met daarin de property include-html="bestandsnaam".
De naam van het genoemde bestand wordt opgehaald en de inhoud van het bestand
wordt dan in de betreffende HTML tag ingevoegd.
*/

function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      /*search for elements with a certain atrribute:*/
      file = elmnt.getAttribute("include-html");
      if (file) {
          /*make an HTTP request using the attribute value as the file name:*/
          xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function () {
              if (this.readyState == 4) {
                  if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                  if (this.status == 404) { elmnt.innerHTML = ""; }
                  /*remove the attribute, and call this function once more:*/
                  elmnt.removeAttribute("include-html");
                  includeHTML();
              }
          }
          xhttp.open("GET", file, true);
          xhttp.send();
          /*exit the function:*/
          return;
      }
  }
};
