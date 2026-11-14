# La carta che si scioglie

La pagina di un film: un foglio color pietra col titolo enorme, i crediti su righe sottili e due bottoni, e sotto il fotogramma, un faro al tramonto disegnato dallo script con una frase in grande. Il bordo del foglio non è mai dritto: si muove piano da solo, come carta bagnata. Scorrendo il palco resta fermo e il foglio sale sciogliendosi in chiazze e isole, finché resta solo il fotogramma; col puntatore sopra, dove passi la carta si scioglie prima, come se la mordessi.

## Come si usa

Apri index.html in un browser. Le librerie arrivano da jsDelivr: in produzione puoi scaricarle e servirle dal tuo dominio.

## Come funziona

- **Un campo invece di una riga.** Su una griglia di celle da 14 pixel lo script calcola un numero per ogni nodo: (bordo − y) / 105 + rumore × 1,7. Il rumore è a valori in tre dimensioni, x, y e il tempo, con tre ottave (0,6, 0,28 e 0,12 a frequenze 1, 2,1 e 4,3) su chiazze di 190 pixel. Dove il numero è sopra zero c’è carta; lontano dalla fascia il rumore non serve e non si calcola.
- **I quadrati in marcia.** In ogni cella i segni dei quattro angoli danno uno dei sedici casi: dove il segno cambia, il contorno passa sul lato nel punto in cui l’interpolazione lineare dice zero, e nei due casi a sella decide la media del centro. L’anello di nodi fuori dal palco vale sempre meno uno, così ogni contorno si chiude: seguendo i due vicini di ogni punto si scrivono i percorsi.
- **Un clip-path a ogni fotogramma.** I percorsi diventano clip-path: path(evenodd, …) sul foglio, che quindi taglia anche i suoi testi. La regola evenodd fa i buchi dentro la carta e le isole di carta dentro i buchi senza dover orientare i contorni.
- **Scorrere e mordere.** Uno ScrollTrigger dà l’avanzamento della scena, alta 2,6 schermi: il bordo va dall’80% dell’altezza fino a −40%, inseguito a 7 al secondo. Il puntatore scava nel campo una campana larga 80 pixel e profonda 2,4 fasce; la sua forza sale a 5 al secondo e cala a 2,2, la posizione lo segue a 9. Il tempo del rumore avanza di 0,12 al secondo.

## Valori da cambiare

- `PASSO` (script.js, di partenza 14): Il lato di una cella della griglia, in pixel: più piccolo, bordo più fine e più conti.
- `SCALA, BANDA, ONDA` (script.js, di partenza 190, 105, 1.7): Quanto sono grandi le chiazze, quanto è larga la fascia che si sfalda e quanto il rumore sposta il bordo.
- `VITA` (script.js, di partenza 0.12): Quanto in fretta il bordo cambia da solo.
- `MORSO, RAGGIO` (script.js, di partenza 2.4, 80): Quanto è profondo e largo il morso del puntatore.
- `DA, A` (script.js, di partenza 0.8, −0.4): Dove sta il bordo all’inizio e alla fine dello scorrimento, in parte dell’altezza.

## Trappole

- Tanti poligoni accostati, uno per cella, lasciano fili sottili fra una cella e l’altra per colpa dell’antialiasing: i segmenti vanno cuciti in contorni chiusi.
- Senza un anello di nodi sempre vuoti intorno alla griglia, un contorno che tocca il bordo resta aperto e il path si chiude nel posto sbagliato.
- Calcolare il rumore su tutta la griglia a ogni fotogramma costa troppo: lontano dalla fascia il segno lo decide solo il livello.
- Con clip-path: path() vuoto l’elemento si vede tutto: quando la carta è finita il percorso diventa M0 0Z.

---

# The melting sheet

A film page: a stone-coloured sheet with a huge title, credits on thin rules and two buttons, and underneath the still, a lighthouse at sunset drawn by the script with a large sentence. The sheet’s edge is never straight: it moves slowly by itself, like wet paper. As you scroll the stage holds still and the sheet rises, melting into blobs and islands, until only the still is left; with the pointer on it, the paper melts first where you pass, as if you were biting it.

## How to use it

Open index.html in a browser. Libraries load from jsDelivr: in production you can download them and serve them from your own domain.

## How it works

- **A field instead of a line.** On a grid of 14-pixel cells the script computes a number for every node: (edge − y) / 105 + noise × 1.7. The noise is value noise in three dimensions, x, y and time, with three octaves (0.6, 0.28 and 0.12 at frequencies 1, 2.1 and 4.3) on 190-pixel blobs. Where the number is above zero there is paper; far from the band the noise is not needed and not computed.
- **Marching squares.** In each cell the signs of the four corners give one of sixteen cases: where the sign changes, the contour crosses the side at the point where linear interpolation says zero, and in the two saddle cases the average of the centre decides. The ring of nodes outside the stage is always minus one, so every contour closes: following the two neighbours of each point writes the paths.
- **A clip-path every frame.** The paths become clip-path: path(evenodd, …) on the sheet, which therefore also cuts its text. The evenodd rule makes holes inside the paper and paper islands inside the holes without orienting the contours.
- **Scrolling and biting.** A ScrollTrigger gives the progress of the scene, 2.6 screens tall: the edge goes from 80% of the height to −40%, followed at 7 per second. The pointer digs a bell 80 pixels wide and 2.4 bands deep into the field; its strength rises at 5 per second and falls at 2.2, its position follows at 9. The noise’s time advances by 0.12 per second.

## Values to change

- `PASSO` (script.js, default 14): The side of a grid cell, in pixels: smaller means a finer edge and more work.
- `SCALA, BANDA, ONDA` (script.js, default 190, 105, 1.7): How big the blobs are, how wide the fraying band is and how far the noise moves the edge.
- `VITA` (script.js, default 0.12): How fast the edge changes by itself.
- `MORSO, RAGGIO` (script.js, default 2.4, 80): How deep and wide the pointer’s bite is.
- `DA, A` (script.js, default 0.8, −0.4): Where the edge sits at the start and end of the scroll, as a share of the height.

## Pitfalls

- Many adjacent polygons, one per cell, leave thin seams between cells because of antialiasing: segments have to be stitched into closed contours.
- Without a ring of always-empty nodes around the grid, a contour touching the edge stays open and the path closes in the wrong place.
- Computing the noise over the whole grid every frame costs too much: far from the band the level alone decides the sign.
- With an empty clip-path: path() the element shows entirely: when the paper is gone the path becomes M0 0Z.

Animorio, 2026