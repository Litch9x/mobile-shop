﻿/*
 Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
CKEDITOR.dialog.add("specialchar", function (h) {
  var f,
    n = h.lang.specialchar,
    k,
    l,
    p,
    d,
    e,
    q;
  l = function (c) {
    var b;
    c = c.data ? c.data.getTarget() : new CKEDITOR.dom.element(c);
    "a" == c.getName() &&
      (b = c.getChild(0).getHtml()) &&
      (c.removeClass("cke_light_background"),
      f.hide(),
      (c = h.document.createElement("span")),
      c.setHtml(b),
      h.insertText(c.getText()));
  };
  p = CKEDITOR.tools.addFunction(l);
  e = function (c, b) {
    var a;
    b = b || c.data.getTarget();
    "span" == b.getName() && (b = b.getParent());
    if ("a" == b.getName() && (a = b.getChild(0).getHtml())) {
      k && d(null, k);
      var e = f.getContentElement("info", "htmlPreview").getElement();
      f.getContentElement("info", "charPreview").getElement().setHtml(a);
      e.setHtml(CKEDITOR.tools.htmlEncode(a));
      b.getParent().addClass("cke_light_background");
      k = b;
    }
  };
  d = function (c, b) {
    b = b || c.data.getTarget();
    "span" == b.getName() && (b = b.getParent());
    "a" == b.getName() &&
      (f
        .getContentElement("info", "charPreview")
        .getElement()
        .setHtml("\x26nbsp;"),
      f
        .getContentElement("info", "htmlPreview")
        .getElement()
        .setHtml("\x26nbsp;"),
      b.getParent().removeClass("cke_light_background"),
      (k = void 0));
  };
  q = CKEDITOR.tools.addFunction(function (c) {
    c = new CKEDITOR.dom.event(c);
    var b = c.getTarget(),
      a;
    a = c.getKeystroke();
    var r = "rtl" == h.lang.dir;
    switch (a) {
      case 38:
        if ((a = b.getParent().getParent().getPrevious()))
          (a = a.getChild([b.getParent().getIndex(), 0])),
            a.focus(),
            d(null, b),
            e(null, a);
        c.preventDefault();
        break;
      case 40:
        (a = b.getParent().getParent().getNext()) &&
          (a = a.getChild([b.getParent().getIndex(), 0])) &&
          1 == a.type &&
          (a.focus(), d(null, b), e(null, a));
        c.preventDefault();
        break;
      case 32:
        l({ data: c });
        c.preventDefault();
        break;
      case r ? 37 : 39:
        if ((a = b.getParent().getNext()))
          (a = a.getChild(0)),
            1 == a.type
              ? (a.focus(), d(null, b), e(null, a), c.preventDefault(!0))
              : d(null, b);
        else if ((a = b.getParent().getParent().getNext()))
          (a = a.getChild([0, 0])) && 1 == a.type
            ? (a.focus(), d(null, b), e(null, a), c.preventDefault(!0))
            : d(null, b);
        break;
      case r ? 39 : 37:
        (a = b.getParent().getPrevious())
          ? ((a = a.getChild(0)),
            a.focus(),
            d(null, b),
            e(null, a),
            c.preventDefault(!0))
          : (a = b.getParent().getParent().getPrevious())
            ? ((a = a.getLast().getChild(0)),
              a.focus(),
              d(null, b),
              e(null, a),
              c.preventDefault(!0))
            : d(null, b);
    }
  });
  return {
    title: n.title,
    minWidth: 430,
    minHeight: 280,
    buttons: [CKEDITOR.dialog.cancelButton],
    charColumns: 17,
    onLoad: function () {
      for (
        var c = this.definition.charColumns,
          b = h.config.specialChars,
          a = CKEDITOR.tools.getNextId() + "_specialchar_table_label",
          d = [
            '\x3ctable role\x3d"listbox" aria-labelledby\x3d"' +
              a +
              '" style\x3d"width: 320px; height: 100%; border-collapse: separate;" align\x3d"center" cellspacing\x3d"2" cellpadding\x3d"2" border\x3d"0"\x3e',
          ],
          e = 0,
          f = b.length,
          g,
          m;
        e < f;

      ) {
        d.push('\x3ctr role\x3d"presentation"\x3e');
        for (var k = 0; k < c; k++, e++)
          if ((g = b[e])) {
            g instanceof Array
              ? ((m = g[1]), (g = g[0]))
              : ((m = g.replace("\x26", "").replace(";", "").replace("#", "")),
                (m = n[m] || g));
            var l =
              "cke_specialchar_label_" +
              e +
              "_" +
              CKEDITOR.tools.getNextNumber();
            d.push(
              '\x3ctd class\x3d"cke_dark_background" style\x3d"cursor: default" role\x3d"presentation"\x3e\x3ca href\x3d"javascript: void(0);" role\x3d"option" aria-posinset\x3d"' +
                (e + 1) +
                '"',
              ' aria-setsize\x3d"' + f + '"',
              ' aria-labelledby\x3d"' + l + '"',
              ' class\x3d"cke_specialchar" title\x3d"',
              CKEDITOR.tools.htmlEncode(m),
              '" onkeydown\x3d"CKEDITOR.tools.callFunction( ' +
                q +
                ', event, this )" onclick\x3d"CKEDITOR.tools.callFunction(' +
                p +
                ', this); return false;" tabindex\x3d"-1"\x3e\x3cspan style\x3d"margin: 0 auto;cursor: inherit"\x3e' +
                g +
                '\x3c/span\x3e\x3cspan class\x3d"cke_voice_label" id\x3d"' +
                l +
                '"\x3e' +
                m +
                "\x3c/span\x3e\x3c/a\x3e\x3c/td\x3e",
            );
          }
        d.push("\x3c/tr\x3e");
      }
      d.push(
        "\x3c/tbody\x3e\x3c/table\x3e",
        '\x3cspan id\x3d"' +
          a +
          '" class\x3d"cke_voice_label"\x3e' +
          n.options +
          "\x3c/span\x3e",
      );
      this.getContentElement("info", "charContainer")
        .getElement()
        .setHtml(d.join(""));
    },
    contents: [
      {
        id: "info",
        label: h.lang.common.generalTab,
        title: h.lang.common.generalTab,
        padding: 0,
        align: "top",
        elements: [
          {
            type: "hbox",
            align: "top",
            widths: ["320px", "90px"],
            children: [
              {
                type: "html",
                id: "charContainer",
                html: "",
                onMouseover: e,
                onMouseout: d,
                focus: function () {
                  var c = this.getElement().getElementsByTag("a").getItem(0);
                  setTimeout(function () {
                    c.focus();
                    e(null, c);
                  }, 0);
                },
                onShow: function () {
                  var c = this.getElement().getChild([0, 0, 0, 0, 0]);
                  setTimeout(function () {
                    c.focus();
                    e(null, c);
                  }, 0);
                },
                onLoad: function (c) {
                  f = c.sender;
                },
              },
              {
                type: "hbox",
                align: "top",
                widths: ["100%"],
                children: [
                  {
                    type: "vbox",
                    align: "top",
                    children: [
                      { type: "html", html: "\x3cdiv\x3e\x3c/div\x3e" },
                      {
                        type: "html",
                        id: "charPreview",
                        className: "cke_dark_background",
                        style:
                          "border:1px solid #eeeeee;font-size:28px;height:40px;width:70px;padding-top:9px;font-family:'Microsoft Sans Serif',Arial,Helvetica,Verdana;text-align:center;",
                        html: "\x3cdiv\x3e\x26nbsp;\x3c/div\x3e",
                      },
                      {
                        type: "html",
                        id: "htmlPreview",
                        className: "cke_dark_background",
                        style:
                          "border:1px solid #eeeeee;font-size:14px;height:20px;width:70px;padding-top:2px;font-family:'Microsoft Sans Serif',Arial,Helvetica,Verdana;text-align:center;",
                        html: "\x3cdiv\x3e\x26nbsp;\x3c/div\x3e",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
});
