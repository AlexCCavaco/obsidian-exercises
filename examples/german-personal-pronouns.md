
# Personal Pronouns

|          |     | **Nom** | **Acc**  | **Dat**   |
| -------- | --- | --- | ---- | ----- |
| Singular | 1st | ich | mich | mir   |
|          | 2nd | du  | dich | dir   |
|          |     | Sie | Sie  | Ihnen |
|          | 3rd | er  | ihn  | ihm   |
|          |     | sie | sie  | ihr   |
|          |     | es  | es   | ihm   |
| ——       | ——  | ——  | ——   | ——    |
| Plural   | 1st | wir | uns  | uns   |
|          | 2nd | ihr | euch | euch  |
|          |     | Sie | Sie  | Ihnen |
|          | 3rd | sie | sie  | Ihnen |

## Cases

| **Case**   | **Role**        | **Description**                  |
| ---------- | --------------- | -------------------------------- |
| nominative | subject         | takes action                     |
| accusative | direct object   | receives action                  |
| dative     | indirect object | to/for whom action is taken      |
| genitive   | possessive      | indicates owner of someone/thing |

## Exercises

```exercise
$match{Ich=>I, Wie=>We, Er=>He, Es=>It, Sie=>She}
```

### Choose the correct personal pronoun

```exercise
$select:rc{*Ich, Du, Er, Sie, Wir, Ihr} esse gern Schokolade.
Hat $select{du, *dir, dich} der Film gefallen?
$select{*Ihr, euch} versteht $select{ich, mir, *mich} doch, oder?
Vielleicht kann $select{wir, *uns} Paul am Bahnhof abholen.
```

```exercise
Seit Tagen hat $select{*er,sie,wie,it} sich schon auf den Besuch seiner Oma gefreut.
$select{sie,*wir,ihr,es} lieben uns und werden uns immer lieben.
$select{er,*sie,wir,du} ist das schnellste Mädchen der Schule.
$select{*es,sie,ich,du} regnet schon den ganzen Tag.
Meine Freundin und ich fahren in den Urlaub. $select{sie,ich,ihr,*wir} fahren mit meinem Auto.
Meine Schwester ist zwölf. $select{er,*sie,wir,du} ist meine jüngste Schwester.
$select{wir,ihr,*sie,du} ist 22 Jahre alt.
Hast $select{ich,*du,er,sie} ein Geschenk für mich?
Wollt $select{du,wir,*ihr,sie} uns nicht besuchen kommen?
$select{du,er,sie,*ich} habe mich verlaufen. $select{*ihr,du,er,ich} Könntet mir helfen?
$select{er,*sie,es,ihr} wohnen in Deutschland, $select{er,*wir,du,ich} wohnen in England.
$select{*er,du,wir,sie} ist der Bruder, $select{du,er,ich,*sie} ist die Schwester.
$select{ich,*du,er,sie} bist langsam, $select{du,er,*ich,sie} bin schnell.
```

### Complete the gaps with the correct form of the personal pronouns (nominative, dative or accusative)

```exercise
Der Mann hat (du) $input{dich} etwas gefragt.
Die Freunde haben (ich) $input{mir} geholfen.
Wo hat Gerda (er) $input{ihn} kennengelernt?
Was haben (sie) $input{sie} gemacht?
Kann ich mit (ihr) $input{euch} zum Einkaufen fahren?
```

### Rewrite the sentences, replacing the underlined sections with pronouns

```exercise
*Das Kind* zählt *die Äpfel*. $line{"Es zählt sie."}
*Der Chef* dankt *der Mitarbeiterin*. $line{"Er dankt ihr."}
*Die Touristen* hören *dem Reiseleiter* zu. $line{"Sie hören ihm zu."}
*Der Junge* lernt *das Gedicht*. $line{"Er lernt es."}
*Die Lehrerin* erklärt *den Schülern* *den Satzbau*. $line{"Sie erklärt ihn ihnen."}
```
