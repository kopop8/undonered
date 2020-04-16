# Technical document

## Non functional requirements
### School requirements
Your app must meet the coding standards set by the used framework.
- Your app must run on both iOS and Android.
- Your app must be documented well so that new developers can join in easily.
- Your app must persist data, such as settings, etc.
- Your app must use an online REST resource (protip: This could be your own API you build in BD!).
- Your app must include automated tests for unit tests and/or UI tests.
- The linter your app uses must pass without errors or warnings.
- Your app must give proper feedback when a user-made error has been made (for example, wrong user
input).
- Your app must do online resource (error) code validation / handling.
- Your app must be ready for deployment. This means no hardcoded URLs, usernames, passwords, etc.
- Your app should use different build environments to differentiate builds (production, test, development,
etc.).
- Your app could use native functionality, such as the Camera or GPS.
- Your project could use CI/CD to automate building and testing of your application

## Why Vue with Quasar
In de eerste paar weken hebben we opdrachten gemaakt waar we verschillende hybride frameworks hebben vergeleken. In de rubrieken besloten we in plaats van Ionic Quasar te vergelijken omdat we daar al ervaring mee hadden en Quasar een veel uitgebreidere en ondersteunde framework vonden. Na de rubrieken beoordeeld te hebben kwam React Native en Quasar als beste uit de test. Hierna gingen we voor React native en Quasar een mini opdracht maken om ze te vergelijken. De uitkomst hiervan staat in het bestand 'Quasar vs React Native' in de map 'imagesDocuments'. Uiteindelijk is gebleken dat Quasar het beste werkten voor ons idee.

## Project structure
We hebben de standaard Quasar + Vue project structuur gebruikt.
- src
    - assets (Alle afbeeldingen en iconen die we gebruiken)
    - boot (Bij het opstarten van de app worden deze configuraties uitgevoerd)
        - axios (Hier zetten we de base url en zorgen we ervoor dat de gebruiker opnieuw moet inloggen als de jwt ongeldig is)
    - components (Alle herbruikbare vue componenten staan hierin)
    - css (Globale css en quasar variabelen zoals kleur)
    - layouts (Staan alle lay-outs waar pagina’s in kunnen worden geladen)
    - pages (Alle pagina’s)
    - router (Alle routes en authenticatie checks)
    - store (De vuex store)
        - modules mappen (Alle modules die we hebben)
        - index (Configuratie van de store + plugin configuratie)
- src-cordova (build die Cordova produceert. hier staan ook de plugins in)
- test (Alle testen)
    - cypress (Map waar de configuratie en testen instaan die we hebben gemaakt voor cypress)
- quasar.conf.js (hierin staat de configuratie van quasar. bijvoorbeeld van de plugins die we gebruiken van Quasar)
## Vuex store
De Vuex store wordt gebruikt om data op te slaan er te hergebruiken. Hier wordt account informatie, reviews, restaurants, likes en geselecteerde opties opgeslagen. Bij het navigeren naar een nieuwe pagina wordt er gekeken of bijvoorbeeld restaurants al een keer zijn opgehaald als dat niet zo is doet de store een api call naar de server. Data blijft ook consistent over verschillende componenten omdat het een seintje geeft aan de property als de data is veranderd.
### Vuex persist data
Om ervoor te zorgen dat data blijft bestaan als de app wordt afgesloten hebben we van de een plugin voor Vuex gebruikt genaamd Vuex-persist-data wat ervoor zorgt dat modules van de store kan worden opgeslagen in de local storage. Cordova zorgt ervoor dat alles in de local storage op de mobiel blijft bestaan bij het afsluiten van de app. Hierdoor blijven gebruikers ingelogd en onthoudt de app opties zoals afstand en geselecteerde tab.

## Comments
We hebben inline commentaar geplaatst om de code overdraagbaar te maken aan nieuwe developers.
## Cordova
We gebruiken Cordova om van onze web app een mobiele app te maken. Ook gebruiken we Cordova voor gps en camera functionaliteit. Als een van de functionaliteiten nodig is wordt er toegang gevraagd (dit is eenmalig).
Door Quasar kunnen we tijdens het programmeren van de app al gebruik maken van de functionaliteiten die Cordova biedt, in plaats van het eerst te builden en op de 'onDeviceReady' te wachten. Quasar wacht hier al onder water op.

### Testing om mobile
Door Cordova, Chrome en Quasar kunnen we ook op mobile de foutmeldingen en console zien. Door in Chrome naar de pagina 'chrome://inspect/#devices' te gaan kan er naar de chrome console van jouw mobiel worden gekeken. 

