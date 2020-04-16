# Functional design

## Undönered - What should it do?
Met Undönered kan je de beste döner restaurants in de buurt vinden, reviews plaatsen en zien.
## Original design
We hebben een sketches gemaakt in adobe XD en ons hier aan gehouden. Soms zijn we er een beetje van afgeweken omdat het niet mogelijk was of omdat we de functionaliteit ervan niet hebben geïmplementeerd (Zie 'UnDönered versie 3' in de map 'imagesDocument') voor het bestand
Het design hebben we aan twee klasgenoten en aan drie testgebruikers getest om een zo goed mogelijk werkende app te maken. (Voor het onderzoek zie 'feedback unDönered' map 'imagesDocuments')
## Requirements
Requirements die we hebben opgesteld. In het technisch document staan de niet functionele requirements die onder andere zijn opgesteld vanuit school.
### Must
- Een review kunnen plaatsen.
- Een foto bij je review kunnen plaatsen.
- Een lijst van de dichtstbijzijnde restaurants op kunnen halen.
- De beste restaurants in de buurt kunnen zien.
- Reviews van restaurants kunnen zien.
- Reviews kunnen liken en inzien.
- Navigatie naar de restaurants kunnen starten.
### Should
- In kunnen loggen.
- Kunnen registreren.
- Kunnen sorteren op afstand.
- Restaurants en reviews kunnen sorteren op beste reviews.
- Reviews kunnen sorteren op meeste likes.
- Restaurant kunnen sorteren op meeste reviews.
### Could
- Profiel informatie aan kunnen passen.
- Badges kunnen verdienen.
- Een profielfoto kunnen toevoegen.

### Not implemented requirements
We hebben uiteindelijk gekozen om de requirement 'Een profielfoto kunnen toevoegen' en '' niet te implementeren omdat we die requirements altijd zagen als mogelijk extra functionaliteit als we tijd over hadden.
Na de rest van de requirements te hebben geïmplementeerd hebben we eerlijk gekeken hoeveel tijd we nog over en hadden en kwamen er toen achter dat we de rest van het werk niet af zouden krijgen als de alle requirements zouden implementeren.

## Navigating the app
Wanneer een gebruiker is ingelogd komt hij in principe nooit meer op de login of registrer pagina terecht.
### Creating an account
Wanneer de app voor het eerst wordt geopend kom je op de register account pagina terecht.
Om een account aan te maken moet de gebruiker alle velden correct in vullen en op de 'register' knop drukken, hierna komt de gebruiker op de hoofd pagina. Wanner een veld niet of verkeerd is ingevuld wordt de gebruiker daarvan op de hoogte gebracht.
![register](imagesDocuments/register.png)
### Login to an account
Wanneer de gebruiker al een account heeft kan de gebruiker op de register pagina op de 'Go to login' knop drukken. De gebruiker is nu op de login pagina waar er ingelogd kan worden.
![login](imagesDocuments/login.png)
### Posting a review
Om een review van een restaurant achter te laten moet je eerst naar de review pagina komen. Dit doe je door onder aan de pagina op de 'review' knop te drukken zoals aangegeven op het onderstaande afbeelding.
![review - home](imagesDocuments/review1.png)
De camera van de telefoon wordt nu geopend. Na een foto te hebben gemaakt van je broodje kan je een review achterlaten.
![review](imagesDocuments/review.png)
Op bovenstaande plaatje staat met rode nummers aangegeven welke acties allemaal kunnen worden uitgevoerd.
1. Als de foto je niet bevalt kan je op de foto klikken om hem opnieuw te namen.
2. Hier kan een kleine beoordeling van het broodje worden achtergelaten.
3. Hier door middel van sterren een cijfer van het broodje worden achtergelaten.
4. Hier kan een restaurant worden geselecteerd waar jij het broodje hebt gekocht.
5. Bovenstaande acties zijn uitgevoerd kan er op de 'Post' knop worden gedrukt om de review te plaatsen. 
### See restaurants
![home](imagesDocuments/functionality.png)
Wanneer er ingelogd is kom je op de hoofdpagina waar alle restaurants in de buurt zijn te zien.
Op bovenstaande plaatje staat met rode nummers aangegeven welke acties allemaal kunnen worden uitgevoerd.
1. Als je op klikt krijg je alle restaurants in de buurt te zien.
2. Wanneer hier op is gedrukt krijg je alle restaurants van Nederlands te zien. (Max 40)
3. Hier kan er op restaurants gezocht worden. (Alleen als ze in de buurt zijn)
4. Hier kan de afstand worden bepaald waar in je restaurants wilt zoeken.
5. Hier kan er verder gesorteerd worden zoals het dichtstbijzijnde restaurant of het best beoordeelde restaurants.
6. Als er op de kaart wordt gedrukt wordt google maps geopend met navigatie naar het restaurants.
7. Wanneer er op de kaart wordt gedrukt kan je alle reviews van het restaurant zien. 
### See reviews of a restaurants
Om reviews te zien moet er op de hoofpagina op een restaurant gedrukt worden. Hierna kom je op een detail pagina met alle reviews
Op bovenstaande plaatje staat met rode nummers aangegeven welke acties allemaal kunnen worden uitgevoerd.
1. Met de 'back' knop kan er weer naar de hoofd pagina worden gegaan.
2. Hier kunnen reviews gesorteerd worden zoals meest geliked of meest recent.
4. Hier is de review te zien met plaatje, beoordeling, cijfer, naam en likes
4. Met het duimpje kan een review liken of een like verwijderen.
![detail](imagesDocuments/detail_functionality.png)
## See profile
Om naar jouw profiel te gaan kan er op de 'profile' knop worden gedrukt die zich bevindt rechtsonder te pagina.
![profile](imagesDocuments/profile.png)
### Change profile data
Als er informatie van jouw profiel veranderd moet worden kan er rechtsboven op het gereedschapssleutel worden gedrukt.
![profile change](imagesDocuments/profile_change.png)
Hier na zijn de velden te veranderen. Om de wijzigingen op te slaan kan er op de 'save' knop worden gedrukt. Als je toch niks wilt veranderen kan er op de 'Dont save' knop gedrukt worden.
### Look at your reviews
![profile reviews](imagesDocuments/profile_reviews.png)
Onderaan de pagina zijn de door jouw geplaatste reviews te vinden.

