﻿/*
 Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
CKEDITOR.plugins.setLang("a11yhelp", "sr-latn", {
  title: "Uputstva za pomoć",
  contents: "Sadržaji za pomoć. Da bi ste zatvorili diјalog pritisnite ESC.",
  legend: [
    {
      name: "Opšte",
      items: [
        {
          name: "Alatke za uređivanje",
          legend:
            "Pritisnite ${toolbarFocus} da biste prešli na traku sa alatkama. Pređite na sledeću i prethodnu grupu traka sa alatkama pomoću TAB i SHIFT+TAB. Pređite na sledeće i prethodno dugme na traci sa alatkama pomoću STRELICE NADESNO ili STRELICA NALEVO. Pritisnite SPACE ili ENTER da biste aktivirali dugme na traci sa alatkama. Nakon aktiviranja dugmeta na traci sa alatkama, fokus će biti pomeren nazad u oblast za uređivanje.",
        },
        {
          name: "Uređivač dijaloga",
          legend:
            "Unutar dijaloga pritisnite TAB da pređjete na sledeći element dijaloga, pritisnite SHIFT+TAB da pređjete na prethodni element dijaloga, pritisnite ENTER da pošaljete dijalog, pritisnite ESC da otkažete dijalog. Kada dijalog ima više kartica, do liste kartica se može doći ili sa ALT+F10 ili sa TAB kao deo redosleda tabulatora dijaloga. Sa fokusiranom listom kartica, pređjite na sledeću i prethodnu karticu pomoću STRELICE NADESNO, odnosno NALEVO. Pritisnite ESC da odbacite promene i zatvorite dijalog. Fokus će se vratiti na oblast za uređivanje nakon napuštanja dijaloga.",
        },
        {
          name: "Uređivač lokalnog menija",
          legend:
            "Pritisnite  ${contextMenu} ili APPLICATION TASTER za otvaranje lokalnog menija. Zatim sa TAB ili STRELICA DOLE možete preći na sledeću tačku menija.  Prethodnu opciju možete postići sa SHIFT+TAB ili STRELICA GORE. Pritisnite SPACE ili ENTER za odabir tačke menija. Pritisnite SPACE ili ENTER  da bi ste otvorili podmeni trenutne stavke menija. Za povratak u glavni meni pritisnite ESC ili STRELICA DESNO. Zatvorite lokalni meni pomoću tastera ESC.",
        },
        {
          name: "Uređjivač liste",
          legend:
            "Do sledećеg elementa liste možete doći sa TAB ili STERLICA DOLE. Za odabir prethodnog elementa  pritisnite SHIFT+TAB ili STREKICA DOLE. Za odabir elementa pritisnite SPACE ili ENTER. Sa pritiskom ESC zatvarate listu. ",
        },
        {
          name: "Uredjivač trake puta elemenata",
          legend:
            "Pritisnite $ {elementsPathFocus} da bi ste označili traku puta elenementa. Do sledećеg elementa  možete doći sa TAB ili STRELICA DESNO. Do prethodnоg dolazite sa SHIFT+TAB ili STRELICA DESNO. Sa SPACE ili ENTER možete odbrati element u uredjivaču.",
        },
      ],
    },
    {
      name: "Komanda",
      items: [
        { name: "Otkaži komandu", legend: "Pritisni ${undo}" },
        { name: "Prepoznavanje komande", legend: "Pritisni ${redo}" },
        { name: "Podebljana komanda", legend: "Pritisni ${bold}" },
        { name: "Kurziv komanda", legend: "Pritisni ${italic}" },
        { name: "Precrtana komanda", legend: "Pritisni ${underline}" },
        { name: "Link komanda", legend: "Pritisni ${link}" },
        {
          name: "Zatvori traku uredjivača komanda ",
          legend: "Pritisni ${toolbarCollapse}",
        },
        {
          name: "Pristup prethodnom fokus mestu komanda ",
          legend:
            "Pritisni ${accessNextSpace} da bi pristupio najbližem nedostupnom fokus mestu pre znaka hiányjel, na primer: dva susedna HR elementa.Ponovi kombinaciju tastera da pronadješ fokus mesto koje se nalazi dalje.",
        },
        {
          name: "Pristup sledećem fokus mestu komanda ",
          legend:
            "Pritisni ${accessNextSpace} da bi pristupio najbližem nedostupnom fokus mestu posle znaka hiányjel, na primer: dva susedna HR elementa.Ponovi kombinaciju tastera da pronadješ fokus mesto koje se nalazi dalje.",
        },
        { name: "Pomoć pristupačnosti", legend: "Pritisni ${a11yHelp}" },
        {
          name: "Nalepi kao običan tekst",
          legend: "Pritisnite: ${pastetext}",
          legendEdge: "Pritisnite ${pastetext}-t, zatim ${paste}-t",
        },
      ],
    },
  ],
  tab: "Tab",
  pause: "Pause",
  capslock: "Caps Lock",
  escape: "Escape",
  pageUp: "Page Up",
  pageDown: "Page Down",
  leftArrow: "Strelica levo",
  upArrow: "strelica gore",
  rightArrow: "strelica desno",
  downArrow: "strelica dole",
  insert: "Insert",
  leftWindowKey: "levi Windows-taster",
  rightWindowKey: "desni Windows-taster",
  selectKey: "Odabir tastera",
  numpad0: "Tasteri sa brojevima 0",
  numpad1: "Tasteri sa brojevima 1",
  numpad2: "Tasteri sa brojevima 2",
  numpad3: "Tasteri sa brojevima 3",
  numpad4: "Tasteri sa brojevima 4",
  numpad5: "Tasteri sa brojevima 5",
  numpad6: "Tasteri sa brojevima 6",
  numpad7: "Tasteri sa brojevima 7",
  numpad8: "Tasteri sa brojevima 8",
  numpad9: "Tasteri sa brojevima 9",
  multiply: "Množenje",
  add: "Sabiranje",
  subtract: "Oduzimanje",
  decimalPoint: "Decimalna tačka",
  divide: "Deljenjje",
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
  semiColon: "Tačka zarez",
  equalSign: "Znak jednakosti",
  comma: "Zarez",
  dash: "Crtica",
  period: "Tačka",
  forwardSlash: "Kosa crta",
  graveAccent: "Obrnuti znak akcenta",
  openBracket: "Otvorena čoškasta zagrada",
  backSlash: "Obrnuta kosa crta",
  closeBracket: "Zatvorena ćoškasta zagrada",
  singleQuote: "Simpli znak navoda",
});
