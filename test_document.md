# Test document
Voor het testen gebruiken we een end-to-end testing framework genaamd cypress.
Het grote verschil tussen cypress de andere e2e frameworks, is dat cypress niet gebouwd is op Selenium maar een eigen gebouwde architectuur gebruikt.

Om te testen moet de test database aanstaan.
## Tests
Voor dat cypress begint met testen wordt de database schoongemaakt.
Als u de testen uitvoert zult u zien dat ze allemaal goed gaan.
### Register
Hier staan alle testen met betrekking tot registreren.
#### Wrong register
Input: Druk op de post knop zonder wat in te vullen.
Verwachte uitkomst: Alle input-velden zijn rood.
#### Wrong register 2
Input: Focus twee inputvelden.
Verwachte uitkomst: De gefocuste inputvelden zijn rood.
#### Register (Not repeated password)
Input: Vul alle inputvelden correct in maar herhaal het wachtwoord verkeerd.
Verwachte uitkomst: Het repeat-password veld is rood met een foutmelding.
#### Register
Input: Vul alle inputvelden correct in.
Verwachte uitkomst: Statuscode 201 en op de homepagina zijn.
#### Register two times with the same stuff
Input: Vul alle inputvelden in met dezelfde dat als de vorige keer.
Verwachte uitkomst: Statuscode 409.
#### Go to login
Input: Klik op de 'go to login' knop.
Verwachte uitkomst: Je bevindt je nu op de login pagina.
### Login
Hier staan alle testen met betrekking tot login.
#### Wrong login empty
Input: Vul niks in en klik op de login knop.
Verwachte uitkomst: de inputvelden zijn rood en je bevindt je nog op de inlogpagina.
#### Wrong login
Input: Vul een account in wat niet bestaat.
Verwachte uitkomst: Statuscode 404 en je bevindt je nog op de inlogpagina.
#### Login
Input: Vul een bestaand account in.
Verwachte uitkomst: Statuscode 201 en je bevindt je nu op de hoofdpagina.
### Restaurants
Hier staan alle testen met betrekking tot login.
Voor dat er een test wordt uitgevoerd wordt er ingelogd
#### Go to restaurant
Input: Er wordt ingelogd klik op het eerste restaurants.
Verwachte uitkomst: Restaurants worden opgehaald met statuscode 201 en wanneer er op een restaurant is gedrukt wordt je verwezen na de detailpagina en worden reviews opgehaald met statuscode 201.
#### Go to restaurant MAPS
Input: Er wordt op het plaatje van een restaurant gedrukt.
Verwachte uitkomst: De google pagina of app wordt geopend.
#### Go to all
Input: Er wordt op de 'all' tab gedrukt.
Verwachte uitkomst: Er wordt opnieuw restaurants opgehaald met de boundingbox van Nederland met statuscode 200.
#### Search empty
Input: Er wordt gezoekt op iets wat niet bestaat.
Verwachte uitkomst: Er zijn geen restaurants gevonden.
#### Search for 1
Input: Er wordt specifiek op 1 restaurant gezocht.
Verwachte uitkomst: Er is maar 1 restaurant te zien.
### Reviews
Hier staan alle testen met betrekking op profiel.
Er wordt eerst ingelogd en gedrukt op de Review tab om naar de profielpagina te gaan.
#### Post review
Input: Er wordt een review geplaatst.
Verwachte uitkomst: Statuscode 200 en nu op de hoofdpagina bevinden.
### Profile
Hier staan alle testen met betrekking op profiel.
Er wordt eerst ingelogd en gedrukt op de Profile tab om naar de profielpagina te gaan.
#### Change profile info
Input: Er wordt op de gereedschap icoon gedrukt en data word veranderd waarna er op de save knop wordt gedrukt.
Verwachte uitkomst: Statuscode 202 en de data is veranderd.
#### Logout
Input: Er wordt gedrukt op de logout knop.
Verwachte uitkomst: Je bevindt je nu op de loginpagina.

