﻿/*
 Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
CKEDITOR.plugins.setLang("a11yhelp", "sk", {
  title: "Inštrukcie prístupnosti",
  contents: "Pomocný obsah. Pre zatvorenie tohto okna, stlačte ESC.",
  legend: [
    {
      name: "Všeobecne",
      items: [
        {
          name: "Lišta nástrojov editora",
          legend:
            "Stlačením ${toolbarFocus} prejdete na panel nástrojov. Medzi ďalšou a predchádzajúcou skupinou sa pohybujete s TAB a SHIFT+TAB. Medzi ďalším a predchádzajúcim tlačidlom na panelu nástrojov sa pohybujete s ŠÍPKA VPRAVO a ŠÍPKA VĽAVO. Stlačte medzerník alebo ENTER pre aktiváciu tlačidla lišty nástrojov. Po aktivácii tlačidla sa fókus presunie späť do editačnej oblasti.",
        },
        {
          name: "Editorový dialóg",
          legend:
            "V dialógovom okne stlačte TAB pre presun na ďalší prvok, SHIFT+TAB pre presun na predchádzajúci prvok, ENTER pre odoslanie, ESC pre zrušenie. Keď má dialógové okno viacero kariet, zoznam kariet dosiahnete buď stlačením ALT+F10 alebo s TAB v príslušnom poradí kariet. So zameraným zoznamom kariet sa pohybujte k ďalšej alebo predchádzajúcej karte cez PRAVÚ a ĽAVÚ ŠÍPKU.",
        },
        {
          name: "Editorové kontextové menu",
          legend:
            "Stlačte ${contextMenu} alebo APPLICATION KEY pre otvorenie kontextového menu. Potom sa presúvajte na ďalšie možnosti menu s TAB alebo dolnou šípkou. Presunte sa k predchádzajúcej možnosti s SHIFT+TAB alebo hornou šípkou. Stlačte medzerník alebo ENTER pre výber možnosti menu. Otvorte pod-menu danej možnosti s medzerníkom, alebo ENTER, alebo pravou šípkou. Vráťte sa späť do položky rodičovského menu s ESC alebo ľavou šípkou. Zatvorte kontextové menu s ESC.",
        },
        {
          name: "Editorov box zoznamu",
          legend:
            "V boxe zoznamu, presuňte sa na ďalšiu položku v zozname s TAB alebo dolnou šípkou. Presuňte sa k predchádzajúcej položke v zozname so SHIFT+TAB alebo hornou šípkou. Stlačte medzerník alebo ENTER pre výber možnosti zoznamu. Stlačte ESC pre zatvorenie boxu zoznamu.",
        },
        {
          name: "Editorove pásmo cesty prvku",
          legend:
            "Stlačte ${elementsPathFocus} pre navigovanie na pásmo cesty elementu. Presuňte sa na tlačidlo ďalšieho prvku s TAB alebo pravou šípkou. Presuňte sa k predchádzajúcemu tlačidlu s SHIFT+TAB alebo ľavou šípkou. Stlačte medzerník alebo ENTER pre výber prvku v editore.",
        },
      ],
    },
    {
      name: "Príkazy",
      items: [
        { name: "Vrátiť príkazy", legend: "Stlačte ${undo}" },
        { name: "Nanovo vrátiť príkaz", legend: "Stlačte ${redo}" },
        { name: "Príkaz na stučnenie", legend: "Stlačte ${bold}" },
        { name: "Príkaz na kurzívu", legend: "Stlačte ${italic}" },
        { name: "Príkaz na podčiarknutie", legend: "Stlačte ${underline}" },
        { name: "Príkaz na odkaz", legend: "Stlačte ${link}" },
        {
          name: "Príkaz na zbalenie lišty nástrojov",
          legend: "Stlačte ${toolbarCollapse}",
        },
        {
          name: "Prejsť na predchádzajúcu zamerateľnú medzeru príkazu",
          legend:
            "Stlačte ${accessPreviousSpace} pre prístup na najbližšie nedosiahnuteľné zamerateľné medzery pred vsuvkuo. Napríklad: dve za sebou idúce horizontálne čiary. Opakujte kombináciu klávesov pre dosiahnutie vzdialených zamerateľných medzier.",
        },
        {
          name: "Prejsť na ďalší ",
          legend:
            "Stlačte ${accessNextSpace} pre prístup na najbližšie nedosiahnuteľné zamerateľné medzery po vsuvke. Napríklad: dve za sebou idúce horizontálne čiary. Opakujte kombináciu klávesov pre dosiahnutie vzdialených zamerateľných medzier.",
        },
        { name: "Pomoc prístupnosti", legend: "Stlačte ${a11yHelp}" },
        {
          name: "Vložiť ako čistý text",
          legend: "Stlačte ${pastetext}",
          legendEdge: "Stlačte ${pastetext} a potom ${paste}",
        },
      ],
    },
  ],
  tab: "Tab",
  pause: "Pause",
  capslock: "Caps Lock",
  escape: "Escape",
  pageUp: "Stránka hore",
  pageDown: "Stránka dole",
  leftArrow: "Šípka naľavo",
  upArrow: "Šípka hore",
  rightArrow: "Šípka napravo",
  downArrow: "Šípka dole",
  insert: "Insert",
  leftWindowKey: "Ľavé Windows tlačidlo",
  rightWindowKey: "Pravé Windows tlačidlo",
  selectKey: "Tlačidlo Select",
  numpad0: "Numpad 0",
  numpad1: "Numpad 1",
  numpad2: "Numpad 2",
  numpad3: "Numpad 3",
  numpad4: "Numpad 4",
  numpad5: "Numpad 5",
  numpad6: "Numpad 6",
  numpad7: "Numpad 7",
  numpad8: "Numpad 8",
  numpad9: "Numpad 9",
  multiply: "Násobenie",
  add: "Sčítanie",
  subtract: "Odčítanie",
  decimalPoint: "Desatinná čiarka",
  divide: "Delenie",
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
  numLock: "Num Lock",
  scrollLock: "Scroll Lock",
  semiColon: "Bodkočiarka",
  equalSign: "Rovná sa",
  comma: "Čiarka",
  dash: "Pomĺčka",
  period: "Bodka",
  forwardSlash: "Lomítko",
  graveAccent: "Zdôrazňovanie prízvuku",
  openBracket: "Hranatá zátvorka otváracia",
  backSlash: "Backslash",
  closeBracket: "Hranatá zátvorka zatváracia",
  singleQuote: "Jednoduché úvodzovky",
});
