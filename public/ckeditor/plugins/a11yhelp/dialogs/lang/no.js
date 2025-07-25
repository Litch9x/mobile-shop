﻿/*
 Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
CKEDITOR.plugins.setLang("a11yhelp", "no", {
  title: "Instruksjoner for tilgjengelighet",
  contents: "Innhold for hjelp. Trykk ESC for å lukke denne dialogen.",
  legend: [
    {
      name: "Generelt",
      items: [
        {
          name: "Verktøylinje for editor",
          legend:
            "Trykk ${toolbarFocus} for å navigere til verktøylinjen. Flytt til neste og forrige verktøylinjegruppe med TAB og SHIFT+TAB. Flytt til neste og forrige verktøylinjeknapp med HØYRE PILTAST og VENSTRE PILTAST. Trykk MELLOMROM eller ENTER for å aktivere verktøylinjeknappen.",
        },
        {
          name: "Dialog for editor",
          legend:
            "Inside a dialog, press TAB to navigate to the next dialog element, press SHIFT+TAB to move to the previous dialog element, press ENTER to submit the dialog, press ESC to cancel the dialog. When a dialog has multiple tabs, the tab list can be reached either with ALT+F10 or with TAB as part of the dialog tabbing order. With tab list focused, move to the next and previous tab with RIGHT and LEFT ARROW, respectively. Press ESC to discard changes and close the dialog. The focus will be moved back to the editing area upon leaving the dialog.",
        },
        {
          name: "Kontekstmeny for editor",
          legend:
            "Trykk ${contextMenu} eller MENYKNAPP for å åpne kontekstmeny. Gå til neste alternativ i menyen med TAB eller PILTAST NED. Gå til forrige alternativ med SHIFT+TAB eller PILTAST OPP. Trykk MELLOMROM eller ENTER for å velge menyalternativet. Åpne undermenyen på valgt alternativ med MELLOMROM eller ENTER eller HØYRE PILTAST. Gå tilbake til overordnet menyelement med ESC eller VENSTRE PILTAST. Lukk kontekstmenyen med ESC.",
        },
        {
          name: "Listeboks for editor",
          legend:
            "I en listeboks, gå til neste alternativ i listen med TAB eller PILTAST NED. Gå til forrige alternativ i listen med SHIFT+TAB eller PILTAST OPP. Trykk MELLOMROM eller ENTER for å velge alternativet i listen. Trykk ESC for å lukke listeboksen.",
        },
        {
          name: "Verktøylinje for elementsti",
          legend:
            "Trykk ${elementsPathFocus} for å navigere til verktøylinjen som viser elementsti. Gå til neste elementknapp med TAB eller HØYRE PILTAST. Gå til forrige elementknapp med SHIFT+TAB eller VENSTRE PILTAST. Trykk MELLOMROM eller ENTER for å velge elementet i editoren.",
        },
      ],
    },
    {
      name: "Kommandoer",
      items: [
        { name: "Angre", legend: "Trykk ${undo}" },
        { name: "Gjør om", legend: "Trykk ${redo}" },
        { name: "Fet tekst", legend: "Trykk ${bold}" },
        { name: "Kursiv tekst", legend: "Trykk ${italic}" },
        { name: "Understreking", legend: "Trykk ${underline}" },
        { name: "Link", legend: "Trykk ${link}" },
        { name: "Skjul verktøylinje", legend: "Trykk ${toolbarCollapse}" },
        {
          name: "Gå til forrige fokusområde",
          legend:
            "Trykk ${accessPreviousSpace} for å komme til nærmeste fokusområde før skrivemarkøren som ikke kan nås på vanlig måte, for eksempel to tilstøtende HR-elementer. Gjenta tastekombinasjonen for å komme til fokusområder lenger unna i dokumentet.",
        },
        {
          name: "Gå til neste fokusområde",
          legend:
            "Trykk ${accessNextSpace} for å komme til nærmeste fokusområde etter skrivemarkøren som ikke kan nås på vanlig måte, for eksempel to tilstøtende HR-elementer. Gjenta tastekombinasjonen for å komme til fokusområder lenger unna i dokumentet.",
        },
        { name: "Hjelp for tilgjengelighet", legend: "Trykk ${a11yHelp}" },
        {
          name: "Lim inn som ren tekst",
          legend: "Press ${pastetext}",
          legendEdge: "Press ${pastetext}, followed by ${paste}",
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
  leftArrow: "Left Arrow",
  upArrow: "Up Arrow",
  rightArrow: "Right Arrow",
  downArrow: "Down Arrow",
  insert: "Insert",
  leftWindowKey: "Left Windows key",
  rightWindowKey: "Right Windows key",
  selectKey: "Select key",
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
  multiply: "Multiply",
  add: "Add",
  subtract: "Subtract",
  decimalPoint: "Decimal Point",
  divide: "Divide",
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
  semiColon: "Semikolon",
  equalSign: "Likhetstegn",
  comma: "Komma",
  dash: "Bindestrek",
  period: "Punktum",
  forwardSlash: "Forward Slash",
  graveAccent: "Grave Accent",
  openBracket: "Open Bracket",
  backSlash: "Backslash",
  closeBracket: "Close Bracket",
  singleQuote: "Enkelt anførselstegn",
});
