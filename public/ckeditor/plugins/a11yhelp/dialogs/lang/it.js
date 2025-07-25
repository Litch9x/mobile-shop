﻿/*
 Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
CKEDITOR.plugins.setLang("a11yhelp", "it", {
  title: "Istruzioni di Accessibilità",
  contents: "Contenuti di Aiuto. Per chiudere questa finestra premi ESC.",
  legend: [
    {
      name: "Generale",
      items: [
        {
          name: "Barra degli strumenti Editor",
          legend:
            "Premi ${toolbarFocus} per accedere alla barra degli strumenti. Passa al gruppo di barre degli strumenti successivo o precedente con TAB o MAIUSC+TAB. Passa al pulsante della barra degli strumenti successivo o precedente con FRECCIA DESTRA o FRECCIA SINISTRA. Premi SPAZIO o INVIO per attivare il pulsante della barra degli strumenti. Lo stato attivo verrà riportato all'area di modifica dopo l'attivazione del pulsante della barra degli strumenti.",
        },
        {
          name: "Finestra Editor",
          legend:
            "All'interno di una finestra di dialogo, premi TAB per passare all'elemento della finestra di dialogo successivo, premi MAIUSC+TAB per passare all'elemento della finestra di dialogo precedente, premi INVIO per inviare la finestra di dialogo, premi ESC per annullare la finestra di dialogo. Quando una finestra di dialogo ha più schede, l'elenco delle schede può essere raggiunto con ALT+F10 o con TAB come parte dell'ordine di tabulazione della finestra di dialogo. Mentre l'elenco delle schede è attivo, passa alla scheda successiva o precedente rispettivamente con FRECCIA DESTRA o SINISTRA. Premi ESC per annullare le modifiche e chiudere la finestra di dialogo. Lo stato attivo verrà spostato nuovamente all'area di modifica dopo aver lasciato la finestra di dialogo.",
        },
        {
          name: "Menù contestuale Editor",
          legend:
            "Premi ${contextMenu} o TASTO APPLICAZIONE per aprire il menu contestuale. Dunque muoviti all'opzione successiva del menu con il tasto TAB o con la Freccia Sotto. Muoviti all'opzione precedente con  MAIUSC+TAB o con Freccia Sopra. Premi SPAZIO o INVIO per scegliere l'opzione di menu. Apri il sottomenu dell'opzione corrente con SPAZIO o INVIO oppure con la Freccia Destra. Torna indietro al menu superiore con ESC oppure Freccia Sinistra. Chiudi il menu contestuale con ESC.",
        },
        {
          name: "Box Lista Editor",
          legend:
            "All'interno di un elenco di opzioni, per spostarsi all'elemento successivo premere TAB oppure FRECCIA GIÙ. Per spostarsi all'elemento precedente usare SHIFT+TAB oppure FRECCIA SU. Premere SPAZIO o INVIO per selezionare l'elemento della lista. Premere ESC per chiudere l'elenco di opzioni.",
        },
        {
          name: "Barra percorso elementi editor",
          legend:
            "Premere ${elementsPathFocus} per passare agli elementi della barra del percorso. Usare TAB o FRECCIA DESTRA per passare al pulsante successivo. Per passare al pulsante precedente premere MAIUSC+TAB o FRECCIA SINISTRA. Premere SPAZIO o INVIO per selezionare l'elemento nell'editor.",
        },
      ],
    },
    {
      name: "Comandi",
      items: [
        { name: " Annulla comando", legend: "Premi ${undo}" },
        { name: " Ripeti comando", legend: "Premi ${redo}" },
        { name: " Comando Grassetto", legend: "Premi ${bold}" },
        { name: " Comando Corsivo", legend: "Premi ${italic}" },
        { name: " Comando Sottolineato", legend: "Premi ${underline}" },
        { name: " Comando Link", legend: "Premi ${link}" },
        {
          name: " Comando riduci barra degli strumenti",
          legend: "Premi ${toolbarCollapse}",
        },
        {
          name: "Comando di accesso al precedente spazio di focus",
          legend:
            "Premi ${accessPreviousSpace} per accedere il più vicino spazio di focus non raggiungibile prima del simbolo caret, per esempio due elementi HR adiacenti. Ripeti la combinazione di tasti per raggiungere spazi di focus distanti.",
        },
        {
          name: "Comando di accesso al prossimo spazio di focus",
          legend:
            "Premi ${accessNextSpace} per accedere il più vicino spazio di focus non raggiungibile dopo il simbolo caret, per esempio due elementi HR adiacenti. Ripeti la combinazione di tasti per raggiungere spazi di focus distanti.",
        },
        { name: " Aiuto Accessibilità", legend: "Premi ${a11yHelp}" },
        {
          name: "Incolla come testo semplice",
          legend: "Premi ${pastetext}",
          legendEdge: "Premi ${pastetext}, seguito da ${paste}",
        },
      ],
    },
  ],
  tab: "Tab",
  pause: "Pausa",
  capslock: "Bloc Maiusc",
  escape: "Esc",
  pageUp: "Pagina sù",
  pageDown: "Pagina giù",
  leftArrow: "Freccia sinistra",
  upArrow: "Freccia su",
  rightArrow: "Freccia destra",
  downArrow: "Freccia giù",
  insert: "Ins",
  leftWindowKey: "Tasto di Windows sinistro",
  rightWindowKey: "Tasto di Windows destro",
  selectKey: "Tasto di selezione",
  numpad0: "0 sul tastierino numerico",
  numpad1: "1 sul tastierino numerico",
  numpad2: "2 sul tastierino numerico",
  numpad3: "3 sul tastierino numerico",
  numpad4: "4 sul tastierino numerico",
  numpad5: "5 sul tastierino numerico",
  numpad6: "6 sul tastierino numerico",
  numpad7: "7 sul tastierino numerico",
  numpad8: "8 sul tastierino numerico",
  numpad9: "9 sul tastierino numerico",
  multiply: "Moltiplicazione",
  add: "Più",
  subtract: "Sottrazione",
  decimalPoint: "Punto decimale",
  divide: "Divisione",
  f1: "F1",
  f2: "F2",
  f3: "F3",
  f4: "F4",
  f5: "F5",
  f6: "F6",
  f7: "F7",
  f8: "F8",
  f9: "F9",
  f10: "F10",
  f11: "F11",
  f12: "F12",
  numLock: "Bloc Num",
  scrollLock: "Bloc Scorr",
  semiColon: "Punto-e-virgola",
  equalSign: "Segno di uguale",
  comma: "Virgola",
  dash: "Trattino",
  period: "Punto",
  forwardSlash: "Barra",
  graveAccent: "Accento grave",
  openBracket: "Parentesi quadra aperta",
  backSlash: "Barra rovesciata",
  closeBracket: "Parentesi quadra chiusa",
  singleQuote: "Apostrofo",
});
