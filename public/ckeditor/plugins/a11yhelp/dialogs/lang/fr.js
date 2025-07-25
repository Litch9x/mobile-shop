﻿/*
 Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
CKEDITOR.plugins.setLang("a11yhelp", "fr", {
  title: "Instructions d'accessibilité",
  contents:
    "Contenu de l'aide. Pour fermer cette fenêtre, appuyez sur la touche Échap.",
  legend: [
    {
      name: "Général",
      items: [
        {
          name: "Barre d'outils de l'éditeur",
          legend:
            "Appuyer sur ${toolbarFocus} pour accéder à la barre d'outils. Se déplacer vers le groupe suivant ou précédent de la barre d'outils avec les touches Tab et Maj+Tab. Se déplacer vers le bouton suivant ou précédent de la barre d'outils avec les touches Flèche droite et Flèche gauche. Appuyer sur la barre d'espace ou la touche Entrée pour activer le bouton de barre d'outils.",
        },
        {
          name: "Fenêtre de l'éditeur",
          legend:
            "Dans une boîte de dialogue, appuyer sur Tab pour passer à l'élément suivant, appuyer sur Maj+Tab pour passer à l'élément précédent, appuyer sur Entrée pour valider, appuyer sur Échap pour annuler. Quand une boîte de dialogue possède des onglets, la liste peut être atteinte avec Alt+F10 ou avec Tab. Dans la liste des onglets, se déplacer vers le suivant et le précédent avec les touches Flèche droite et Flèche gauche respectivement.",
        },
        {
          name: "Menu contextuel de l'éditeur",
          legend:
            "Appuyer sur ${contextMenu} ou sur la touche Menu pour ouvrir le menu contextuel. Se déplacer ensuite vers l'option suivante du menu avec les touches Tab ou Flèche bas. Se déplacer vers l'option précédente avec les touches Maj+Tab ou Flèche haut. Appuyer sur la barre d'espace ou la touche Entrée pour sélectionner l'option du menu. Appuyer sur la barre d'espace, la touche Entrée ou Flèche droite pour ouvrir le sous-menu de l'option sélectionnée. Revenir à l'élément de menu parent avec la touche Échap ou Flèche gauche. Fermer le menu contextuel avec Échap.",
        },
        {
          name: "Zone de liste de l'éditeur",
          legend:
            "Dans une liste en menu déroulant, se déplacer vers l'élément suivant de la liste avec les touches Tab ou Flèche bas. Se déplacer vers l'élément précédent de la liste avec les touches Maj+Tab ou Flèche haut. Appuyer sur la barre d'espace ou sur Entrée pour sélectionner l'option dans la liste. Appuyer sur Échap pour fermer le menu déroulant.",
        },
        {
          name: "Barre du chemin d'éléments de l'éditeur",
          legend:
            "Appuyer sur ${elementsPathFocus} pour naviguer vers la barre du fil d'Ariane des éléments. Se déplacer vers le bouton de l'élément suivant avec les touches Tab ou Flèche droite. Se déplacer vers le bouton précédent avec les touches Maj+Tab ou Flèche gauche. Appuyer sur la barre d'espace ou sur Entrée pour sélectionner l'élément dans l'éditeur.",
        },
      ],
    },
    {
      name: "Commandes",
      items: [
        { name: " Annuler la commande", legend: "Appuyer sur ${undo}" },
        { name: "Commande restaurer", legend: "Appuyer sur ${redo}" },
        { name: " Commande gras", legend: "Appuyer sur ${bold}" },
        { name: " Commande italique", legend: "Appuyer sur ${italic}" },
        { name: " Commande souligné", legend: "Appuyer sur ${underline}" },
        { name: " Commande lien", legend: "Appuyer sur ${link}" },
        {
          name: " Commande enrouler la barre d'outils",
          legend: "Appuyer sur ${toolbarCollapse}",
        },
        {
          name: "Commande d'accès à l'élément sélectionnable précédent",
          legend:
            "Appuyer sur ${accessNextSpace} pour accéder à l'élément sélectionnable inatteignable le plus proche avant le curseur, par exemple : deux lignes horizontales adjacentes. Répéter la combinaison de touches pour atteindre les éléments sélectionnables précédents.",
        },
        {
          name: "Commande d'accès à l'élément sélectionnable suivant",
          legend:
            "Appuyer sur ${accessNextSpace} pour accéder à l'élément sélectionnable inatteignable le plus proche après le curseur, par exemple : deux lignes horizontales adjacentes. Répéter la combinaison de touches pour atteindre les éléments sélectionnables suivants.",
        },
        {
          name: " Aide sur l'accessibilité",
          legend: "Appuyer sur ${a11yHelp}",
        },
        {
          name: "Coller comme texte sans mise en forme",
          legend: "Appuyer sur ${pastetext}",
          legendEdge: "Enfoncez ${pastetext}, suivi par ${paste}",
        },
      ],
    },
  ],
  tab: "Tabulation",
  pause: "Pause",
  capslock: "Verr. Maj.",
  escape: "Échap",
  pageUp: "Page supérieure",
  pageDown: "Page suivante",
  leftArrow: "Flèche gauche",
  upArrow: "Flèche haut",
  rightArrow: "Flèche droite",
  downArrow: "Flèche basse",
  insert: "Inser",
  leftWindowKey: "Touche Windows gauche",
  rightWindowKey: "Touche Windows droite",
  selectKey: "Touche Sélectionner",
  numpad0: "0 du pavé numérique",
  numpad1: "1 du pavé numérique",
  numpad2: "2 du pavé numérique",
  numpad3: "3 du pavé numérique",
  numpad4: "4 du pavé numérique",
  numpad5: "5 du pavé numérique",
  numpad6: "6 du pavé numérique",
  numpad7: "7 du pavé numérique",
  numpad8: "Pavé numérique 8",
  numpad9: "9 du pavé numérique",
  multiply: "Multiplier",
  add: "Plus",
  subtract: "Moins",
  decimalPoint: "Point décimal",
  divide: "Diviser",
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
  numLock: "Verr. Num.",
  scrollLock: "Arrêt défil.",
  semiColon: "Point-virgule",
  equalSign: "Signe égal",
  comma: "Virgule",
  dash: "Tiret",
  period: "Point",
  forwardSlash: "Barre oblique",
  graveAccent: "Accent grave",
  openBracket: "Parenthèse ouvrante",
  backSlash: "Barre oblique inverse",
  closeBracket: "Parenthèse fermante",
  singleQuote: "Apostrophe",
});
