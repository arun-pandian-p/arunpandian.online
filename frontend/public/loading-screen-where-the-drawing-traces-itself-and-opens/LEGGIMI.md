# Il caricamento del disegno che si traccia e si apre

La pagina è un foglio color carta con una cornice sottile. Al centro il prospetto di una casa moderna comincia a disegnarsi da solo: il terreno, i solai, il volume di sopra che sporge, le vetrate coi montanti, la porta, la scala, gli alberi spogli ai lati, ogni linea in poco più di un secondo e tutte una dopo l’altra nel giro di tre. Intanto, a metà del foglio, una linea arancio sottile si allunga da sinistra col numero in percentuale che corre sulla sua punta: veloce fino al sessanta, poi più piano fino al cento. Sotto, una piccola scheda in monospazio dice «Welcome to Egret» e accende la sua lista di avvio una riga alla volta, con un «ok» arancio che arriva subito dopo. Al cento la linea prende fiato, si ingrossa per un istante e si sdoppia: una metà corre in su, l’altra in giù, con uno scatto che parte piano e arriva di colpo, e diventano grigie, i due bordi del foglio. Fra loro si apre il disegno pieno: cemento a grana, vetri grigi con un riflesso, l’interno scuro dietro la porta e le ombre a tratteggio sotto lo sbalzo e sulla scala. Le linee del disegno di prima passano dal nero al grigio, la scheda sparisce, agli angoli si accendono quattro croci arancio e sul disegno due segni arancio. Al posto della scheda sale il titolo, parola per parola, e in alto «Loading» diventa «Ready». Dopo qualche secondo tutto torna al foglio vuoto e ricomincia; c’è anche il pulsante Replay.

## Come si usa

Apri index.html in un browser. Le librerie arrivano da jsDelivr: in produzione puoi scaricarle e servirle dal tuo dominio.

## Come funziona

- **Ogni linea si traccia da sola.** Ogni tratto del disegno ha un tratteggio lungo quanto lui e uno scostamento uguale, così parte invisibile. GSAP porta lo scostamento a zero in 1,3 secondi con power1.out, e lo stagger con amount 3 distribuisce le partenze di tutte le linee in tre secondi, nell’ordine in cui sono scritte: prima il terreno e i solai, alla fine gli alberi.
- **Due velocità per il caricamento.** Un oggetto va da 0 a 60 in 3 secondi con power2.out e da 60 a 100 in 2,5 con power3.out: la prima parte corre, la seconda rallenta. A ogni passo scrive il numero e una variabile CSS, che allunga la linea con scaleX e sposta il numero sulla sua punta senza farlo uscire dal foglio.
- **Una linea che diventa due bordi.** Le due linee e il ritaglio del disegno pieno dipendono dalla stessa variabile, --apri: la prima sta a 50% meno metà di --apri, la seconda a 50% più metà, e il clip-path inset lascia vedere solo quello che sta fra loro. GSAP porta --apri da 0 a 1 in 0,8 secondi con la curva cubic-bezier(1, 0, 0.44, 1): ferma all’inizio, velocissima alla fine.
- **Lo stesso disegno, due volte.** Le linee sono scritte una volta sola in un elenco e il codice le mette in due disegni sovrapposti: sotto quello che si traccia, sopra quello pieno con le campiture (cemento a motivo, vetri a gradiente, tratteggio a 45 gradi), ritagliato. Così combaciano al pixel.
- **Il titolo nella maschera.** Il titolo è diviso in parole, ognuna dentro una maschera con overflow hidden: le parole salgono da yPercent 105 a 0 in mezzo secondo, due centesimi l’una dopo l’altra, mentre il foglio finisce di aprirsi.

## Valori da cambiare

- `DRAW` (script.js, di partenza 1.3): In quanti secondi si disegna ogni linea.
- `DRAW_SPREAD` (script.js, di partenza 3): In quanti secondi partono tutte le linee, dalla prima all’ultima.
- `LOAD_FIRST` (script.js, di partenza 3): In quanti secondi il caricamento arriva al sessanta.
- `LOAD_SECOND` (script.js, di partenza 2.5): In quanti secondi va dal sessanta al cento.
- `SPLIT` (script.js, di partenza 0.8): In quanti secondi la linea si sdoppia e apre il disegno.
- `BOOT_STAGGER` (script.js, di partenza 0.3): Il ritmo della lista di avvio, fra una riga e l’altra.
- `HOLD` (script.js, di partenza 4.5): Quanti secondi resta il disegno aperto prima di ripartire.
- `ACCENT` (script.js, di partenza #f15534): Il colore della linea, delle croci e dei segni.
- `SPEED` (script.js, di partenza 1): Velocità di tutto: 2 il doppio, 0.5 la metà.

## Trappole

- Il tratteggio e il suo scostamento sono nelle unità del disegno: con vector-effect: non-scaling-stroke le linee si tratteggerebbero in pixel dello schermo e si disegnerebbero a metà. Lo spessore resta di un pixel ricalcolando stroke-width sulla larghezza del foglio, al resize.
- Linee e ritaglio usano la stessa variabile in percento: al resize, anche a metà apertura, restano attaccati senza ricalcolare niente.
- Il numero in percentuale si sposta con left alla punta e translateX di meno la stessa frazione: all’inizio sta a destra dello zero, alla fine a sinistra del cento, e non esce mai dal foglio.

---

# The loading screen where the drawing traces itself and opens

The page is a paper-coloured sheet with a thin frame. In the middle the elevation of a modern house starts drawing itself: the ground, the slabs, the upper volume cantilevering out, the glazing with its mullions, the door, the stairs, the bare trees at the sides, each line in just over a second and all of them one after another within three. Meanwhile, halfway down the sheet, a thin orange line grows from the left with the percentage running at its tip: fast up to sixty, then slower up to one hundred. Below, a small monospaced card says “Welcome to Egret” and lights up its start-up list one line at a time, each followed by an orange “ok”. At one hundred the line takes a breath, thickens for an instant and splits: one half runs up, the other down, with a snap that starts slow and arrives all at once, and they turn grey, the two edges of the sheet. Between them the full drawing opens: grainy concrete, grey glass with a reflection, the dark inside behind the door and hatched shadows under the cantilever and on the stairs. The lines of the first drawing go from black to grey, the card disappears, four orange crosses light up at the corners and two orange marks on the drawing. In the card’s place the title rises word by word, and at the top “Loading” becomes “Ready”. After a few seconds everything goes back to the empty sheet and plays again; there is a Replay button too.

## How to use it

Open index.html in a browser. Libraries load from jsDelivr: in production you can download them and serve them from your own domain.

## How it works

- **Every line draws itself.** Each stroke of the drawing gets a dash as long as itself and an equal offset, so it starts invisible. GSAP brings the offset to zero in 1.3 seconds with power1.out, and a stagger with amount 3 spreads the starts of all the lines over three seconds, in the order they are written: the ground and the slabs first, the trees last.
- **Two speeds for the loading.** An object goes from 0 to 60 in 3 seconds with power2.out and from 60 to 100 in 2.5 with power3.out: the first part runs, the second slows down. At each step it writes the number and a CSS variable, which stretches the line with scaleX and moves the number along its tip without letting it leave the sheet.
- **One line becomes two edges.** The two lines and the crop of the full drawing depend on the same variable, --apri: the first sits at 50% minus half of --apri, the second at 50% plus half, and the clip-path inset only shows what lies between them. GSAP takes --apri from 0 to 1 in 0.8 seconds with the curve cubic-bezier(1, 0, 0.44, 1): still at the start, very fast at the end.
- **The same drawing, twice.** The lines are written once in a list and the code puts them in two stacked drawings: underneath the one that traces itself, on top the full one with its fills (patterned concrete, gradient glass, hatching at 45 degrees), cropped. So they match to the pixel.
- **The title in its mask.** The title is split into words, each inside a mask with overflow hidden: the words rise from yPercent 105 to 0 in half a second, two hundredths apart, while the sheet finishes opening.

## Values to change

- `DRAW` (script.js, default 1.3): How many seconds each line takes to draw itself.
- `DRAW_SPREAD` (script.js, default 3): Over how many seconds all the lines start, from the first to the last.
- `LOAD_FIRST` (script.js, default 3): How many seconds the loading takes to reach sixty.
- `LOAD_SECOND` (script.js, default 2.5): How many seconds it takes from sixty to one hundred.
- `SPLIT` (script.js, default 0.8): How many seconds the line takes to split and open the drawing.
- `BOOT_STAGGER` (script.js, default 0.3): The pace of the start-up list, between one line and the next.
- `HOLD` (script.js, default 4.5): How many seconds the open drawing stays before it plays again.
- `ACCENT` (script.js, default #f15534): The colour of the line, the crosses and the marks.
- `SPEED` (script.js, default 1): Speed of everything: 2 twice as fast, 0.5 half as fast.

## Pitfalls

- The dash and its offset are in the drawing’s units: with vector-effect: non-scaling-stroke the lines would be dashed in screen pixels and only draw halfway. The width stays at one pixel by recalculating stroke-width from the sheet’s width, on resize.
- The lines and the crop use the same variable in percent: on resize, even halfway through opening, they stay together without recalculating anything.
- The percentage moves with left at the tip and translateX of minus the same fraction: at the start it sits right of zero, at the end left of one hundred, and it never leaves the sheet.

Animorio, 2026