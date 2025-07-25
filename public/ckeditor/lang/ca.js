﻿/*
Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license/
*/
CKEDITOR.lang["ca"] = {
  application: "Rich Text Editor",
  editor: "Editor de text enriquit",
  editorPanel: "Panell de l'editor de text enriquit",
  common: {
    editorHelp: "Premeu ALT 0 per ajuda",
    browseServer: "Veure servidor",
    url: "URL",
    protocol: "Protocol",
    upload: "Puja",
    uploadSubmit: "Envia-la al servidor",
    image: "Imatge",
    form: "Formulari",
    checkbox: "Casella de verificació",
    radio: "Botó d'opció",
    textField: "Camp de text",
    textarea: "Àrea de text",
    hiddenField: "Camp ocult",
    button: "Botó",
    select: "Camp de selecció",
    imageButton: "Botó d'imatge",
    notSet: "<no definit>",
    id: "Id",
    name: "Nom",
    langDir: "Direcció de l'idioma",
    langDirLtr: "D'esquerra a dreta (LTR)",
    langDirRtl: "De dreta a esquerra (RTL)",
    langCode: "Codi d'idioma",
    longDescr: "Descripció llarga de la URL",
    cssClass: "Classes del full d'estil",
    advisoryTitle: "Títol consultiu",
    cssStyle: "Estil",
    ok: "D'acord",
    cancel: "Cancel·la",
    close: "Tanca",
    preview: "Previsualitza",
    resize: "Arrossegueu per redimensionar",
    generalTab: "General",
    advancedTab: "Avançat",
    validateNumberFailed: "Aquest valor no és un número.",
    confirmNewPage:
      "Els canvis en aquest contingut que no es desin es perdran. Esteu segur que voleu carregar una pàgina nova?",
    confirmCancel:
      "Algunes opcions s'han canviat. Esteu segur que voleu tancar el quadre de diàleg?",
    options: "Opcions",
    target: "Destí",
    targetNew: "Nova finestra (_blank)",
    targetTop: "Finestra superior (_top)",
    targetSelf: "Mateixa finestra (_self)",
    targetParent: "Finestra pare (_parent)",
    langDirLTR: "D'esquerra a dreta (LTR)",
    langDirRTL: "De dreta a esquerra (RTL)",
    styles: "Estil",
    cssClasses: "Classes del full d'estil",
    width: "Amplada",
    height: "Alçada",
    align: "Alineació",
    left: "Ajusta a l'esquerra",
    right: "Ajusta a la dreta",
    center: "Centre",
    justify: "Justificat",
    alignLeft: "Alinea a l'esquerra",
    alignRight: "Alinea a la dreta",
    alignCenter: "Align Center",
    alignTop: "Superior",
    alignMiddle: "Centre",
    alignBottom: "Inferior",
    alignNone: "Cap",
    invalidValue: "Valor no vàlid.",
    invalidHeight: "L'alçada ha de ser un número.",
    invalidWidth: "L'amplada ha de ser un número.",
    invalidLength:
      'Value specified for the "%1" field must be a positive number with or without a valid measurement unit (%2).',
    invalidCssLength:
      'El valor especificat per als "%1" camps ha de ser un número positiu amb o sense unitat de mesura vàlida de CSS (px, %, in, cm, mm, em, ex, pt o pc).',
    invalidHtmlLength:
      'El valor especificat per als "%1" camps ha de ser un número positiu amb o sense unitat de mesura vàlida d\'HTML (px o %).',
    invalidInlineStyle:
      "El valor especificat per l'estil en línia ha de constar d'una o més tuples amb el format \"name: value\", separats per punt i coma.",
    cssLengthTooltip:
      "Introduïu un número per un valor en píxels o un número amb una unitat vàlida de CSS (px, %, in, cm, mm, em, ex, pt o pc).",
    unavailable: '%1<span class="cke_accessibility">, no disponible</span>',
    keyboard: {
      8: "Retrocés",
      13: "Intro",
      16: "Majúscules",
      17: "Ctrl",
      18: "Alt",
      32: "Space",
      35: "Fi",
      36: "Inici",
      46: "Eliminar",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      124: "F13",
      125: "F14",
      126: "F15",
      127: "F16",
      128: "F17",
      129: "F18",
      130: "F19",
      131: "F20",
      132: "F21",
      133: "F22",
      134: "F23",
      135: "F24",
      224: "Command",
    },
    keyboardShortcut: "Keyboard shortcut",
    optionDefault: "Default",
  },
  versionCheck: {
    notificationMessage:
      'This CKEditor %current version is not secure. Consider <a target="_blank" href="%link">upgrading to the latest one</a>, %latest.',
    consoleMessage:
      "This CKEditor %current version is not secure. Consider upgrading to the latest one, %latest: %link",
    aboutDialogInsecureMessage:
      'This CKEditor %current version is not secure.<br>Consider upgrading to the latest one, %latest:<br><a target="_blank" href="%link">%link</a>',
    aboutDialogUpgradeMessage:
      'Consider upgrading to the latest editor version, %latest:<br><a target="_blank" href="%link">%link</a>',
  },
  about: {
    copy: "Copyright &copy; $1. Tots els drets reservats.",
    dlgTitle: "Quant al CKEditor 4",
    moreInfo: "Per informació sobre llicències visiteu el nostre lloc web:",
  },
  basicstyles: {
    bold: "Negreta",
    italic: "Cursiva",
    strike: "Ratllat",
    subscript: "Subíndex",
    superscript: "Superíndex",
    underline: "Subratllat",
  },
  bidi: {
    ltr: "Direcció del text d'esquerra a dreta",
    rtl: "Direcció del text de dreta a esquerra",
  },
  blockquote: { toolbar: "Bloc de cita" },
  notification: { closed: "Notificació tancada." },
  toolbar: {
    toolbarCollapse: "Redueix la barra d'eines",
    toolbarExpand: "Amplia la barra d'eines",
    toolbarGroups: {
      document: "Document",
      clipboard: "Clipboard/Undo",
      editing: "Editing",
      forms: "Forms",
      basicstyles: "Basic Styles",
      paragraph: "Paragraph",
      links: "Links",
      insert: "Insert",
      styles: "Styles",
      colors: "Colors",
      tools: "Tools",
    },
    toolbars: "Editor de barra d'eines",
  },
  clipboard: {
    copy: "Copiar",
    copyError:
      "La configuració de seguretat del vostre navegador no permet executar automàticament les operacions de copiar. Si us plau, utilitzeu el teclat (Ctrl/Cmd+C).",
    cut: "Retallar",
    cutError:
      "La configuració de seguretat del vostre navegador no permet executar automàticament les operacions de retallar. Si us plau, utilitzeu el teclat (Ctrl/Cmd+X).",
    paste: "Enganxar",
    pasteNotification:
      "Press %1 to paste. Your browser doesn‘t support pasting with the toolbar button or context menu option.",
    pasteArea: "Àrea d'enganxat",
    pasteMsg: "Paste your content inside the area below and press OK.",
    fileFormatNotSupportedNotification:
      "The ${formats} file format(s) are not supported.",
    fileWithoutFormatNotSupportedNotification:
      "The file format is not supported.",
  },
  colorbutton: {
    auto: "Automàtic",
    bgColorTitle: "Color de Fons",
    colors: {
      "000": "Negre",
      800000: "Grana",
      "8B4513": "Marró sella",
      "2F4F4F": "Gris pissarra fosca",
      "008080": "Blau xarxet",
      "000080": "Blau marí",
      "4B0082": "Indi",
      696969: "Gris Fosc",
      B22222: "Foc Maó",
      A52A2A: "Marró",
      DAA520: "Solidago",
      "006400": "Verd Fosc",
      "40E0D0": "Turquesa",
      "0000CD": "Blau 1/2",
      800080: "Lila",
      808080: "Gris",
      F00: "Vermell",
      FF8C00: "Taronja Fosc",
      FFD700: "Or",
      "008000": "Verd",
      "0FF": "Cian",
      "00F": "Blau",
      EE82EE: "Violat",
      A9A9A9: "Gris clar",
      FFA07A: "Salmó clar",
      FFA500: "Taronja",
      FFFF00: "Groc",
      "00FF00": "Verd Llima",
      AFEEEE: "Turquesa Pàl·lid",
      ADD8E6: "Blau Clar",
      DDA0DD: "Pruna",
      D3D3D3: "Gris Clar",
      FFF0F5: "Lavanda rosat",
      FAEBD7: "Blanc Antic",
      FFFFE0: "Groc Clar",
      F0FFF0: "Verd Pàl·lid",
      F0FFFF: "Atzur",
      F0F8FF: "Cian pàlid",
      E6E6FA: "Lavanda",
      FFF: "Blanc",
      "1ABC9C": "Strong Cyan",
      "2ECC71": "Emerald",
      "3498DB": "Bright Blue",
      "9B59B6": "Amethyst",
      "4E5F70": "Grayish Blue",
      F1C40F: "Vivid Yellow",
      "16A085": "Dark Cyan",
      "27AE60": "Dark Emerald",
      "2980B9": "Strong Blue",
      "8E44AD": "Dark Violet",
      "2C3E50": "Desaturated Blue",
      F39C12: "Orange",
      E67E22: "Carrot",
      E74C3C: "Pale Red",
      ECF0F1: "Bright Silver",
      "95A5A6": "Light Grayish Cyan",
      DDD: "Light Gray",
      D35400: "Pumpkin",
      C0392B: "Strong Red",
      BDC3C7: "Silver",
      "7F8C8D": "Grayish Cyan",
      999: "Dark Gray",
    },
    more: "Més Colors...",
    panelTitle: "Colors",
    textColorTitle: "Color del Text",
  },
  colordialog: {
    clear: "Neteja",
    highlight: "Destacat",
    options: "Opcions del color",
    selected: "Color Seleccionat",
    title: "Seleccioni el color",
  },
  templates: {
    button: "Plantilles",
    emptyListMsg: "(No hi ha plantilles definides)",
    insertOption: "Reemplaça el contingut actual",
    options: "Opcions de plantilla",
    selectPromptMsg:
      "Seleccioneu una plantilla per usar a l'editor<br>(per defecte s'elimina el contingut actual):",
    title: "Plantilles de contingut",
  },
  contextmenu: { options: "Opcions del menú contextual" },
  copyformatting: {
    label: "Copy Formatting",
    notification: {
      copied: "Formatting copied",
      applied: "Formatting applied",
      canceled: "Formatting canceled",
      failed:
        "Formatting failed. You cannot apply styles without copying them first.",
    },
  },
  div: {
    IdInputLabel: "Id",
    advisoryTitleInputLabel: "Títol de guia",
    cssClassInputLabel: "Classes de la fulla d'estils",
    edit: "Edita la Capa",
    inlineStyleInputLabel: "Estil en línia",
    langDirLTRLabel: "D'esquerra a dreta (LTR)",
    langDirLabel: "Direcció de l'idioma",
    langDirRTLLabel: "De dreta a esquerra (RTL)",
    languageCodeInputLabel: " Codi d'idioma",
    remove: "Elimina la Capa",
    styleSelectLabel: "Estil",
    title: "Crea una Capa Contenidora",
    toolbar: "Crea una Capa Contenidora",
  },
  elementspath: { eleLabel: "Ruta dels elements", eleTitle: "%1 element" },
  exportpdf: {
    documentReady: "Document is ready!",
    error: "Error occurred.",
    processingDocument: "Processing PDF document...",
    toolbar: "Export to PDF",
  },
  filetools: {
    loadError: "S'ha produït un error durant la lectura del fitxer.",
    networkError:
      "S'ha produït un error de xarxa durant la càrrega del fitxer.",
    httpError404:
      "S'ha produït un error HTTP durant la càrrega del fitxer (404: Fitxer no trobat).",
    httpError403:
      "S'ha produït un error HTTP durant la càrrega del fitxer (403: Permís denegat).",
    httpError:
      "S'ha produït un error HTTP durant la càrrega del fitxer (estat d'error: %1).",
    noUrlError: "La URL de càrrega no està definida.",
    responseError: "Resposta incorrecte del servidor",
  },
  find: {
    find: "Cerca",
    findOptions: "Opcions de Cerca",
    findWhat: "Cerca el:",
    matchCase: "Distingeix majúscules/minúscules",
    matchCyclic: "Coincidència cíclica",
    matchWord: "Només paraules completes",
    notFoundMsg: "El text especificat no s'ha trobat.",
    replace: "Reemplaça",
    replaceAll: "Reemplaça-ho tot",
    replaceSuccessMsg: "%1 ocurrència/es reemplaçada/es.",
    replaceWith: "Reemplaça amb:",
    title: "Cerca i reemplaça",
  },
  font: {
    fontSize: {
      label: "Mida",
      voiceLabel: "Mida de la lletra",
      panelTitle: "Mida de la lletra",
    },
    label: "Tipus de lletra",
    panelTitle: "Tipus de lletra",
    voiceLabel: "Tipus de lletra",
  },
  fakeobjects: {
    anchor: "Àncora",
    hiddenfield: "Camp ocult",
    iframe: "IFrame",
    unknown: "Objecte desconegut",
  },
  forms: {
    button: {
      title: "Propietats del botó",
      text: "Text (Valor)",
      type: "Tipus",
      typeBtn: "Botó",
      typeSbm: "Transmet formulari",
      typeRst: "Reinicia formulari",
    },
    checkboxAndRadio: {
      checkboxTitle: "Propietats de la casella de verificació",
      radioTitle: "Propietats del botó d'opció",
      value: "Valor",
      selected: "Seleccionat",
      required: "Necessari",
    },
    form: {
      title: "Propietats del formulari",
      menu: "Propietats del formulari",
      action: "Acció",
      method: "Mètode",
      encoding: "Codificació",
    },
    hidden: { title: "Propietats del camp ocult", name: "Nom", value: "Valor" },
    select: {
      title: "Propietats del camp de selecció",
      selectInfo: "Info",
      opAvail: "Opcions disponibles",
      value: "Valor",
      size: "Mida",
      lines: "Línies",
      chkMulti: "Permet múltiples seleccions",
      required: "Necessari",
      opText: "Text",
      opValue: "Valor",
      btnAdd: "Afegeix",
      btnModify: "Modifica",
      btnUp: "Amunt",
      btnDown: "Avall",
      btnSetValue: "Selecciona per defecte",
      btnDelete: "Elimina",
    },
    textarea: {
      title: "Propietats de l'àrea de text",
      cols: "Columnes",
      rows: "Files",
    },
    textfield: {
      title: "Propietats del camp de text",
      name: "Nom",
      value: "Valor",
      charWidth: "Amplada",
      maxChars: "Nombre màxim de caràcters",
      required: "Necessari",
      type: "Tipus",
      typeText: "Text",
      typePass: "Contrasenya",
      typeEmail: "Correu electrònic",
      typeSearch: "Cercar",
      typeTel: "Número de telèfon",
      typeUrl: "URL",
    },
  },
  format: {
    label: "Format",
    panelTitle: "Format",
    tag_address: "Adreça",
    tag_div: "Normal (DIV)",
    tag_h1: "Encapçalament 1",
    tag_h2: "Encapçalament 2",
    tag_h3: "Encapçalament 3",
    tag_h4: "Encapçalament 4",
    tag_h5: "Encapçalament 5",
    tag_h6: "Encapçalament 6",
    tag_p: "Normal",
    tag_pre: "Formatejat",
  },
  horizontalrule: { toolbar: "Insereix línia horitzontal" },
  iframe: {
    border: "Mostra la vora del marc",
    noUrl: "Si us plau, introdueixi la URL de l'iframe",
    scrolling: "Activa les barres de desplaçament",
    title: "Propietats de l'IFrame",
    toolbar: "IFrame",
    tabindex: "Remove from tabindex",
  },
  image: {
    alt: "Text alternatiu",
    border: "Vora",
    btnUpload: "Envia-la al servidor",
    button2Img:
      "Voleu transformar el botó d'imatge seleccionat en una simple imatge?",
    hSpace: "Espaiat horit.",
    img2Button: "Voleu transformar la imatge seleccionada en un botó d'imatge?",
    infoTab: "Informació de la imatge",
    linkTab: "Enllaç",
    lockRatio: "Bloqueja les proporcions",
    menu: "Propietats de la imatge",
    resetSize: "Restaura la mida",
    title: "Propietats de la imatge",
    titleButton: "Propietats del botó d'imatge",
    upload: "Puja",
    urlMissing: "Falta la URL de la imatge.",
    vSpace: "Espaiat vert.",
    validateBorder: "La vora ha de ser un nombre enter.",
    validateHSpace: "HSpace ha de ser un nombre enter.",
    validateVSpace: "VSpace ha de ser un nombre enter.",
  },
  indent: { indent: "Augmenta el sagnat", outdent: "Redueix el sagnat" },
  smiley: {
    options: "Opcions d'emoticones",
    title: "Insereix una icona",
    toolbar: "Icona",
  },
  language: { button: "Definir l'idioma", remove: "Eliminar idioma" },
  link: {
    acccessKey: "Clau d'accés",
    advanced: "Avançat",
    advisoryContentType: "Tipus de contingut consultiu",
    advisoryTitle: "Títol consultiu",
    anchor: {
      toolbar: "Insereix/Edita àncora",
      menu: "Propietats de l'àncora",
      title: "Propietats de l'àncora",
      name: "Nom de l'àncora",
      errorName: "Si us plau, escriviu el nom de l'ancora",
      errorWhitespace: "Anchor name cannot contain space characters",
      remove: "Remove Anchor",
    },
    anchorId: "Per Id d'element",
    anchorName: "Per nom d'àncora",
    charset: "Conjunt de caràcters font enllaçat",
    cssClasses: "Classes del full d'estil",
    download: "Force Download",
    displayText: "Text a mostrar",
    emailAddress: "Adreça de correu electrònic",
    emailBody: "Cos del missatge",
    emailSubject: "Assumpte del missatge",
    id: "Id",
    info: "Informació de l'enllaç",
    langCode: "Direcció de l'idioma",
    langDir: "Direcció de l'idioma",
    langDirLTR: "D'esquerra a dreta (LTR)",
    langDirRTL: "De dreta a esquerra (RTL)",
    menu: "Edita l'enllaç",
    name: "Nom",
    noAnchors: "(No hi ha àncores disponibles en aquest document)",
    noEmail: "Si us plau, escrigui l'adreça correu electrònic",
    noUrl: "Si us plau, escrigui l'enllaç URL",
    noTel: "Please type the phone number",
    other: "<altre>",
    phoneNumber: "Phone number",
    popupDependent: "Depenent (Netscape)",
    popupFeatures: "Característiques finestra popup",
    popupFullScreen: "Pantalla completa (IE)",
    popupLeft: "Posició esquerra",
    popupLocationBar: "Barra d'adreça",
    popupMenuBar: "Barra de menú",
    popupResizable: "Redimensionable",
    popupScrollBars: "Barres d'scroll",
    popupStatusBar: "Barra d'estat",
    popupToolbar: "Barra d'eines",
    popupTop: "Posició dalt",
    rel: "Relació",
    selectAnchor: "Selecciona una àncora",
    styles: "Estil",
    tabIndex: "Index de Tab",
    target: "Destí",
    targetFrame: "<marc>",
    targetFrameName: "Nom del marc de destí",
    targetPopup: "<finestra emergent>",
    targetPopupName: "Nom finestra popup",
    title: "Enllaç",
    toAnchor: "Àncora en aquesta pàgina",
    toEmail: "Correu electrònic",
    toUrl: "URL",
    toPhone: "Phone",
    toolbar: "Insereix/Edita enllaç",
    type: "Tipus d'enllaç",
    unlink: "Elimina l'enllaç",
    upload: "Puja",
  },
  list: { bulletedlist: "Llista de pics", numberedlist: "Llista numerada" },
  liststyle: {
    bulletedTitle: "Bulleted List Properties",
    circle: "Circle",
    decimal: "Decimal (1, 2, 3, etc.)",
    disc: "Disc",
    lowerAlpha: "Lower Alpha (a, b, c, d, e, etc.)",
    lowerRoman: "Lower Roman (i, ii, iii, iv, v, etc.)",
    none: "None",
    notset: "<not set>",
    numberedTitle: "Numbered List Properties",
    square: "Square",
    start: "Start",
    type: "Type",
    upperAlpha: "Upper Alpha (A, B, C, D, E, etc.)",
    upperRoman: "Upper Roman (I, II, III, IV, V, etc.)",
    validateStartNumber: "List start number must be a whole number.",
  },
  magicline: { title: "Insereix el paràgraf aquí" },
  maximize: { maximize: "Maximitza", minimize: "Minimitza" },
  newpage: { toolbar: "Nova pàgina" },
  pagebreak: { alt: "Salt de pàgina", toolbar: "Insereix salt de pàgina" },
  pastetext: {
    button: "Enganxa com a text no formatat",
    pasteNotification:
      "Press %1 to paste. Your browser doesn‘t support pasting with the toolbar button or context menu option.",
    title: "Enganxa com a text no formatat",
  },
  pastefromword: {
    confirmCleanup:
      "El text que voleu enganxar sembla provenir de Word. Voleu netejar aquest text abans que sigui enganxat?",
    error:
      "No ha estat possible netejar les dades enganxades degut a un error intern",
    title: "Enganxa des del Word",
    toolbar: "Enganxa des del Word",
  },
  preview: { preview: "Visualització prèvia" },
  print: { toolbar: "Imprimeix" },
  removeformat: { toolbar: "Elimina Format" },
  save: { toolbar: "Desa" },
  selectall: { toolbar: "Selecciona-ho tot" },
  showblocks: { toolbar: "Mostra els blocs" },
  sourcearea: { toolbar: "Codi font" },
  specialchar: {
    options: "Opcions de caràcters especials",
    title: "Selecciona el caràcter especial",
    toolbar: "Insereix caràcter especial",
  },
  scayt: {
    btn_about: "Quant a l'SCAYT",
    btn_dictionaries: "Diccionaris",
    btn_disable: "Deshabilita SCAYT",
    btn_enable: "Habilitat l'SCAYT",
    btn_langs: "Idiomes",
    btn_options: "Opcions",
    text_title: "Spell Check As You Type",
  },
  stylescombo: {
    label: "Estil",
    panelTitle: "Estils de format",
    panelTitle1: "Estils de bloc",
    panelTitle2: "Estils incrustats",
    panelTitle3: "Estils d'objecte",
  },
  table: {
    border: "Mida vora",
    caption: "Títol",
    cell: {
      menu: "Cel·la",
      insertBefore: "Insereix abans",
      insertAfter: "Insereix després",
      deleteCell: "Suprimeix",
      merge: "Fusiona",
      mergeRight: "Fusiona a la dreta",
      mergeDown: "Fusiona avall",
      splitHorizontal: "Divideix horitzontalment",
      splitVertical: "Divideix verticalment",
      title: "Propietats de la cel·la",
      cellType: "Tipus de cel·la",
      rowSpan: "Expansió de files",
      colSpan: "Expansió de columnes",
      wordWrap: "Ajustar al contingut",
      hAlign: "Alineació Horizontal",
      vAlign: "Alineació Vertical",
      alignBaseline: "A la línia base",
      bgColor: "Color de fons",
      borderColor: "Color de la vora",
      data: "Dades",
      header: "Capçalera",
      columnHeader: "Column Header",
      rowHeader: "Row Header",
      yes: "Sí",
      no: "No",
      invalidWidth: "L'amplada de cel·la ha de ser un nombre.",
      invalidHeight: "L'alçada de cel·la ha de ser un nombre.",
      invalidRowSpan: "L'expansió de files ha de ser un nombre enter.",
      invalidColSpan: "L'expansió de columnes ha de ser un nombre enter.",
      chooseColor: "Trieu",
    },
    cellPad: "Encoixinament de cel·les",
    cellSpace: "Espaiat de cel·les",
    column: {
      menu: "Columna",
      insertBefore: "Insereix columna abans de",
      insertAfter: "Insereix columna darrera",
      deleteColumn: "Suprimeix una columna",
    },
    columns: "Columnes",
    deleteTable: "Suprimeix la taula",
    headers: "Capçaleres",
    headersBoth: "Ambdues",
    headersColumn: "Primera columna",
    headersNone: "Cap",
    headersRow: "Primera fila",
    heightUnit: "height unit",
    invalidBorder: "El gruix de la vora ha de ser un nombre.",
    invalidCellPadding: "L'encoixinament de cel·la  ha de ser un nombre.",
    invalidCellSpacing: "L'espaiat de cel·la  ha de ser un nombre.",
    invalidCols: "El nombre de columnes ha de ser un nombre major que 0.",
    invalidHeight: "L'alçada de la taula  ha de ser un nombre.",
    invalidRows: "El nombre de files ha de ser un nombre major que 0.",
    invalidWidth: "L'amplada de la taula  ha de ser un nombre.",
    menu: "Propietats de la taula",
    row: {
      menu: "Fila",
      insertBefore: "Insereix fila abans de",
      insertAfter: "Insereix fila darrera",
      deleteRow: "Suprimeix una fila",
    },
    rows: "Files",
    summary: "Resum",
    title: "Propietats de la taula",
    toolbar: "Taula",
    widthPc: "percentatge",
    widthPx: "píxels",
    widthUnit: "unitat d'amplada",
  },
  undo: { redo: "Refés", undo: "Desfés" },
  widget: { move: "Clicar i arrossegar per moure", label: "%1 widget" },
  uploadwidget: {
    abort: "Pujada cancel·lada per l'usuari.",
    doneOne: "Fitxer pujat correctament.",
    doneMany: "%1 fitxers pujats correctament.",
    uploadOne: "Pujant fitxer ({percentage}%)...",
    uploadMany:
      "Pujant fitxers, {current} de {max} finalitzats ({percentage}%)...",
  },
};
