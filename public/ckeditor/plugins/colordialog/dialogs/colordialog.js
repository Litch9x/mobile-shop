﻿/*
 Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
CKEDITOR.dialog.add("colordialog", function (w) {
  function l() {
    h.getById(p).removeStyle("background-color");
    m.getContentElement("picker", "selectedColor").setValue("");
    x();
  }
  function y(a) {
    a = a.data.getTarget();
    var c;
    "td" == a.getName() &&
      (c = a.getChild(0).getHtml()) &&
      (x(),
      (e = a),
      e.setAttribute("aria-selected", !0),
      e.addClass("cke_colordialog_selected"),
      m.getContentElement("picker", "selectedColor").setValue(c));
  }
  function x() {
    e &&
      (e.removeClass("cke_colordialog_selected"),
      e.removeAttribute("aria-selected"),
      (e = null));
  }
  function D(a) {
    a = a.replace(/^#/, "");
    for (var c = 0, b = []; 2 >= c; c++)
      b[c] = parseInt(a.substr(2 * c, 2), 16);
    return 165 <= 0.2126 * b[0] + 0.7152 * b[1] + 0.0722 * b[2];
  }
  function z(a) {
    !a.name && (a = new CKEDITOR.event(a));
    var c = !/mouse/.test(a.name),
      b = a.data.getTarget(),
      f;
    "td" == b.getName() &&
      (f = b.getChild(0).getHtml()) &&
      (q(a),
      c ? (d = b) : (A = b),
      c &&
        b.addClass(
          D(f)
            ? "cke_colordialog_focused_light"
            : "cke_colordialog_focused_dark",
        ),
      r(f));
  }
  function B() {
    d &&
      (d.removeClass("cke_colordialog_focused_light"),
      d.removeClass("cke_colordialog_focused_dark"));
    r(!1);
    d = null;
  }
  function q(a) {
    if ((a = !/mouse/.test(a.name) && d))
      a.removeClass("cke_colordialog_focused_light"),
        a.removeClass("cke_colordialog_focused_dark");
    d || A || r(!1);
  }
  function r(a) {
    a
      ? (h.getById(t).setStyle("background-color", a), h.getById(u).setHtml(a))
      : (h.getById(t).removeStyle("background-color"),
        h.getById(u).setHtml("\x26nbsp;"));
  }
  function E(a) {
    var c = a.data,
      b = c.getTarget(),
      f = c.getKeystroke(),
      d = "rtl" == w.lang.dir;
    switch (f) {
      case 38:
        if ((a = b.getParent().getPrevious()))
          (a = a.getChild([b.getIndex()])), a.focus();
        c.preventDefault();
        break;
      case 40:
        (a = b.getParent().getNext()) &&
          (a = a.getChild([b.getIndex()])) &&
          1 == a.type &&
          a.focus();
        c.preventDefault();
        break;
      case 32:
      case 13:
        y(a);
        c.preventDefault();
        break;
      case d ? 37 : 39:
        (a = b.getNext())
          ? 1 == a.type && (a.focus(), c.preventDefault(!0))
          : (a = b.getParent().getNext()) &&
            (a = a.getChild([0])) &&
            1 == a.type &&
            (a.focus(), c.preventDefault(!0));
        break;
      case d ? 39 : 37:
        if ((a = b.getPrevious())) a.focus(), c.preventDefault(!0);
        else if ((a = b.getParent().getPrevious()))
          (a = a.getLast()), a.focus(), c.preventDefault(!0);
    }
  }
  var v = CKEDITOR.dom.element,
    h = CKEDITOR.document,
    g = w.lang.colordialog,
    m,
    e,
    C = { type: "html", html: "\x26nbsp;" },
    n = function (a) {
      return CKEDITOR.tools.getNextId() + "_" + a;
    },
    t = n("hicolor"),
    u = n("hicolortext"),
    p = n("selhicolor"),
    k,
    d,
    A;
  (function () {
    function a(a, d) {
      for (var e = a; e < a + 3; e++) {
        var f = new v(k.$.insertRow(-1));
        f.setAttribute("role", "row");
        for (var g = d; g < d + 3; g++)
          for (var h = 0; 6 > h; h++) c(f.$, "#" + b[g] + b[h] + b[e]);
      }
    }
    function c(a, c) {
      var b = new v(a.insertCell(-1));
      b.setAttribute("class", "ColorCell cke_colordialog_colorcell");
      b.setAttribute("tabIndex", -1);
      b.setAttribute("role", "gridcell");
      b.on("keydown", E);
      b.on("click", y);
      b.on("focus", z);
      b.on("blur", q);
      b.setStyle("background-color", c);
      var d = n("color_table_cell");
      b.setAttribute("aria-labelledby", d);
      b.append(
        CKEDITOR.dom.element.createFromHtml(
          '\x3cspan id\x3d"' +
            d +
            '" class\x3d"cke_voice_label"\x3e' +
            c +
            "\x3c/span\x3e",
          CKEDITOR.document,
        ),
      );
    }
    k = CKEDITOR.dom.element.createFromHtml(
      '\x3ctable tabIndex\x3d"-1" class\x3d"cke_colordialog_table" aria-label\x3d"' +
        g.options +
        '" role\x3d"grid" style\x3d"border-collapse:separate;" cellspacing\x3d"0"\x3e\x3ccaption class\x3d"cke_voice_label"\x3e' +
        g.options +
        '\x3c/caption\x3e\x3ctbody role\x3d"presentation"\x3e\x3c/tbody\x3e\x3c/table\x3e',
    );
    k.on("mouseover", z);
    k.on("mouseout", q);
    var b = "00 33 66 99 cc ff".split(" ");
    a(0, 0);
    a(3, 0);
    a(0, 3);
    a(3, 3);
    var f = new v(k.$.insertRow(-1));
    f.setAttribute("role", "row");
    c(f.$, "#000000");
    for (var d = 0; 16 > d; d++) {
      var e = d.toString(16);
      c(f.$, "#" + e + e + e + e + e + e);
    }
    c(f.$, "#ffffff");
  })();
  CKEDITOR.document.appendStyleSheet(
    CKEDITOR.getUrl(
      CKEDITOR.plugins.get("colordialog").path + "dialogs/colordialog.css",
    ),
  );
  return {
    title: g.title,
    minWidth: 360,
    minHeight: 220,
    onShow: function (a) {
      if (
        !a.data.selectionColor ||
        a.data.selectionColor == a.data.automaticTextColor ||
        ("#rgba(0, 0, 0, 0)" == a.data.selectionColor && "back" == a.data.type)
      )
        l(), B();
      else {
        var c = a.data.selectionColor;
        a = this.parts.contents.getElementsByTag("td").toArray();
        var b;
        m.getContentElement("picker", "selectedColor").setValue(c);
        CKEDITOR.tools.array.forEach(a, function (a) {
          b = CKEDITOR.tools.convertRgbToHex(a.getStyle("background-color"));
          c === b && (a.focus(), (d = a));
        });
      }
    },
    onLoad: function () {
      m = this;
    },
    onHide: function () {
      l();
      B();
    },
    contents: [
      {
        id: "picker",
        label: g.title,
        accessKey: "I",
        elements: [
          {
            type: "hbox",
            padding: 0,
            widths: ["70%", "10%", "30%"],
            children: [
              {
                type: "html",
                html: "\x3cdiv\x3e\x3c/div\x3e",
                onLoad: function () {
                  CKEDITOR.document.getById(this.domId).append(k);
                },
                focus: function () {
                  (
                    d || this.getElement().getElementsByTag("td").getItem(0)
                  ).focus();
                },
              },
              C,
              {
                type: "vbox",
                padding: 0,
                widths: ["70%", "5%", "25%"],
                children: [
                  {
                    type: "html",
                    html:
                      "\x3cspan\x3e" +
                      g.highlight +
                      '\x3c/span\x3e\x3cdiv id\x3d"' +
                      t +
                      '" style\x3d"border: 1px solid; height: 74px; width: 74px;"\x3e\x3c/div\x3e\x3cdiv id\x3d"' +
                      u +
                      '"\x3e\x26nbsp;\x3c/div\x3e\x3cspan\x3e' +
                      g.selected +
                      '\x3c/span\x3e\x3cdiv id\x3d"' +
                      p +
                      '" style\x3d"border: 1px solid; height: 20px; width: 74px;"\x3e\x3c/div\x3e',
                  },
                  {
                    type: "text",
                    label: g.selected,
                    labelStyle: "display:none",
                    id: "selectedColor",
                    style: "width: 76px;margin-top:4px",
                    onChange: function () {
                      try {
                        h.getById(p).setStyle(
                          "background-color",
                          this.getValue(),
                        );
                      } catch (a) {
                        l();
                      }
                    },
                  },
                  C,
                  { type: "button", id: "clear", label: g.clear, onClick: l },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
});
