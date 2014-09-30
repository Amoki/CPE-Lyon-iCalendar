CPE Lyon iCalendar
==================


Cette application permet de transformer les excels pas beaux en un ICS importable sur téléphones et agenda électroniques.


* Configuration des filières
Le fichier de configuration est au format json et contient 3 clés:
 - colorToLocation : selectionne un lieu en fonction de la couleur de fond d'une cellule. C'est un dictionnaire avec comme clé le code RGB de la couleur de fond encodée en hexa majuscules avec comme valeur le lieu correspondant à la couleur. Toute couleur non retranscrite dans ce dictionnaire sera considérée comme étant à CPE.
 - timetable : Représente les créneaux horaires des différents lieux de cours.
 - rawLocationToPrettyLocation : Nom à afficher pour le lieu.

exemple:
```json
{
  "timetable" : {
    "cpe": {
      "timeSlot8h": {
        "start": "8h00",
        "end": "10h00"
      },
      "timeSlot10h": {
        "start": "10h15",
        "end": "12h15"
      },
    }
    "afpi": {
      "timeSlot8h": {
        "start": "8h30",
        "end": "10h30"
      }
  },

  "colorToLocation": {
    "FCD5B4": "afpi"
  },

  "rawLocationToPrettyLocation": {
    "afpi": "AFPI 10 boulevard Edmond Michelet, 69008 Lyon",
    "cpe": "3 rue Victor Grignard, 69100 VILLEURBANNE"
  }
}
```
