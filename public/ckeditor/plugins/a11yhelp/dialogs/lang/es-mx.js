﻿/*
 Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
CKEDITOR.plugins.setLang("a11yhelp", "es-mx", {
  title: "Instrucciones de accesibilidad",
  contents:
    "Contenidos de ayuda. Para cerrar este cuadro de diálogo presione ESC.",
  legend: [
    {
      name: "General",
      items: [
        {
          name: "Barra de herramientas del editor",
          legend:
            "Presione ${toolbarFocus} para navegar a la barra de herramientas. Desplácese al grupo de barras de herramientas siguiente y anterior con  SHIFT + TAB. Desplácese al botón siguiente y anterior de la barra de herramientas con FLECHA DERECHA o FLECHA IZQUIERDA. Presione SPACE o ENTER para activar el botón de la barra de herramientas.",
        },
        {
          name: "Editor de diálogo",
          legend:
            "Dentro de un cuadro de diálogo, pulse TAB para desplazarse hasta el siguiente elemento de diálogo, pulse MAYÚS + TAB para desplazarse al elemento de diálogo anterior, pulse ENTER para enviar el diálogo, pulse ESC para cancelar el diálogo. Cuando un cuadro de diálogo tiene varias pestañas, se puede acceder a la lista de pestañas con ALT + F10 o con TAB como parte del orden de tabulación del diálogo. Con la lista de tabuladores enfocada, mueva a la pestaña siguiente y anterior con las flechas DERECHA y IZQUIERDA, respectivamente.",
        },
        {
          name: "Menú contextual del editor",
          legend:
            "Presione ${contextMenu} o CLAVE DE APLICACIÓN para abrir el menú contextual. A continuación, vaya a la siguiente opción del menú con TAB o DOWN ARROW. Desplácese a la opción anterior con SHIFT + TAB o FLECHA ARRIBA. Presione SPACE o ENTER para seleccionar la opción del menú. Abra el submenú de la opción actual con ESPACIO o ENTER o FLECHA DERECHA. Vuelva al elemento de menú principal con ESC o FLECHA IZQUIERDA. Cerrar el menú contextual con ESC.",
        },
        {
          name: "Editor de cuadro de lista",
          legend:
            "Dentro de un cuadro de lista, mueva al siguiente elemento de lista con TAB O FLECHA ABAJO. Mueva al elemento anterior de la lista con MAYÚS + TAB o FLECHA ARRIBA. Presione SPACE o ENTER para seleccionar la opción de lista. Presione ESC para cerrar el cuadro de lista.",
        },
        {
          name: "Barra de ruta del elemento del editor",
          legend:
            "Presione ${elementsPathFocus} para navegar a la barra de ruta de elementos. Desplácese al siguiente botón de elemento con TAB o FLECHA DERECHA. Desplácese al botón anterior con SHIFT + TAB o FLECHA IZQUIERDA. Presione SPACE o ENTER para seleccionar el elemento en el editor.",
        },
      ],
    },
    {
      name: "Comandos",
      items: [
        { name: "Comando deshacer", legend: "Presiona ${undo}" },
        { name: "Comando rehacer", legend: "Presiona ${redo}" },
        { name: "Comando negrita", legend: "Presiona ${bold}" },
        { name: "Comando cursiva", legend: "Presiona {italic}" },
        { name: "Comando subrayado", legend: "Presiona ${underline}" },
        { name: "Comando enlace", legend: "Presiona ${link}" },
        {
          name: "Comando colapsar barra de herramientas",
          legend: "Presiona ${toolbarCollapse}",
        },
        {
          name: "Acceda al comando de espacio de enfoque anterior",
          legend:
            "Presione ${accessPreviousSpace} para acceder al espacio de enfoque inaccesible más cercano antes del cursor, por ejemplo: dos elementos HR adyacentes. Repita la combinación de teclas para alcanzar los espacios de enfoque distantes.",
        },
        {
          name: "Acceder al siguiente comando de espacio de enfoque",
          legend:
            "Pulse ${accessNextSpace} para acceder al espacio de enfoque más cercano inaccesible después del cursor, por ejemplo: dos elementos HR adyacentes. Repita la combinación de teclas para alcanzar los espacios de enfoque distantes.",
        },
        { name: "Ayuda de accesibilidad", legend: "Presiona ${a11yHelp}" },
        {
          name: " Paste as plain text",
          legend: "Press ${pastetext}",
          legendEdge: "Press ${pastetext}, followed by ${paste}",
        },
      ],
    },
  ],
  tab: "Tabulador",
  pause: "Pausa",
  capslock: "Mayúsculas",
  escape: "Escape",
  pageUp: "Página arriba",
  pageDown: "Página abajo",
  leftArrow: "Flecha izquierda",
  upArrow: "Flecha arriba",
  rightArrow: "Flecha derecha",
  downArrow: "Flecha abajo",
  insert: "Insertar",
  leftWindowKey: "Tecla izquierda de Windows",
  rightWindowKey: "Tecla derecha de Windows",
  selectKey: "Tecla de selección",
  numpad0: "Teclado numérico 0",
  numpad1: "Teclado numérico 1",
  numpad2: "Teclado numérico 2",
  numpad3: "Teclado numérico 3",
  numpad4: "Teclado numérico 4",
  numpad5: "Teclado numérico 5",
  numpad6: "Teclado numérico 6",
  numpad7: "Teclado numérico 7",
  numpad8: "Teclado numérico 8",
  numpad9: "Teclado numérico 9",
  multiply: "Multiplicar",
  add: "Sumar",
  subtract: "Restar",
  decimalPoint: "Punto decimal",
  divide: "Dividir",
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
  numLock: "Números",
  scrollLock: "Bloqueo de desplazamiento",
  semiColon: "punto y coma",
  equalSign: "Signo igual",
  comma: "Coma",
  dash: "Guión",
  period: "Espacio",
  forwardSlash: "Diagonal",
  graveAccent: "Acento grave",
  openBracket: "Abrir paréntesis",
  backSlash: "Diagonal invertida",
  closeBracket: "Cerrar paréntesis",
  singleQuote: "Comillas simple",
});
