﻿/*
 Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
(function () {
  function d(c, e) {
    var b;
    try {
      b = c.getSelection().getRanges()[0];
    } catch (d) {
      return null;
    }
    b.shrink(CKEDITOR.SHRINK_TEXT);
    return c.elementPath(b.getCommonAncestor()).contains(e, 1);
  }
  function f(c, e) {
    var b = c.lang.liststyle;
    if ("bulletedListStyle" == e)
      return {
        title: b.bulletedTitle,
        minWidth: 300,
        minHeight: 50,
        getModel: h(c, "ul"),
        contents: [
          {
            id: "info",
            accessKey: "I",
            elements: [
              {
                type: "select",
                label: b.type,
                id: "type",
                align: "center",
                style: "width:150px",
                items: [
                  [b.notset, ""],
                  [b.circle, "circle"],
                  [b.disc, "disc"],
                  [b.square, "square"],
                ],
                setup: function (a) {
                  a =
                    a.getStyle("list-style-type") ||
                    k[a.getAttribute("type")] ||
                    a.getAttribute("type") ||
                    "";
                  this.setValue(a);
                },
                commit: function (a) {
                  var b = this.getValue();
                  b
                    ? a.setStyle("list-style-type", b)
                    : a.removeStyle("list-style-type");
                },
              },
            ],
          },
        ],
        onShow: function () {
          var a = this.getParentEditor();
          (a = d(a, "ul")) && this.setupContent(a);
        },
        onOk: function () {
          var a = this.getParentEditor();
          (a = d(a, "ul")) && this.commitContent(a);
        },
      };
    if ("numberedListStyle" == e) {
      var f = [
        [b.notset, ""],
        [b.lowerRoman, "lower-roman"],
        [b.upperRoman, "upper-roman"],
        [b.lowerAlpha, "lower-alpha"],
        [b.upperAlpha, "upper-alpha"],
        [b.decimal, "decimal"],
      ];
      return {
        title: b.numberedTitle,
        minWidth: 300,
        minHeight: 50,
        getModel: h(c, "ol"),
        contents: [
          {
            id: "info",
            accessKey: "I",
            elements: [
              {
                type: "hbox",
                widths: ["25%", "75%"],
                children: [
                  {
                    label: b.start,
                    type: "text",
                    id: "start",
                    validate: CKEDITOR.dialog.validate.integer(
                      b.validateStartNumber,
                    ),
                    setup: function (a) {
                      a =
                        a.getFirst(g).getAttribute("value") ||
                        a.getAttribute("start") ||
                        1;
                      this.setValue(a);
                    },
                    commit: function (a) {
                      var b = a.getFirst(g),
                        c =
                          b.getAttribute("value") ||
                          a.getAttribute("start") ||
                          1;
                      a.getFirst(g).removeAttribute("value");
                      var d = parseInt(this.getValue(), 10);
                      isNaN(d)
                        ? a.removeAttribute("start")
                        : a.setAttribute("start", d);
                      a = b;
                      b = c;
                      for (d = isNaN(d) ? 1 : d; (a = a.getNext(g)) && b++; )
                        a.getAttribute("value") == b &&
                          a.setAttribute("value", d + b - c);
                    },
                  },
                  {
                    type: "select",
                    label: b.type,
                    id: "type",
                    style: "width: 100%;",
                    items: f,
                    setup: function (a) {
                      a =
                        a.getStyle("list-style-type") ||
                        k[a.getAttribute("type")] ||
                        a.getAttribute("type") ||
                        "";
                      this.setValue(a);
                    },
                    commit: function (a) {
                      var b = this.getValue();
                      b
                        ? a.setStyle("list-style-type", b)
                        : a.removeStyle("list-style-type");
                    },
                  },
                ],
              },
            ],
          },
        ],
        onShow: function () {
          var a = this.getParentEditor();
          (a = d(a, "ol")) && this.setupContent(a);
        },
        onOk: function () {
          var a = this.getParentEditor();
          (a = d(a, "ol")) && this.commitContent(a);
        },
      };
    }
  }
  function h(c, e) {
    return function () {
      return d(c, e) || null;
    };
  }
  var g = function (c) {
      return c.type == CKEDITOR.NODE_ELEMENT && c.is("li");
    },
    k = {
      a: "lower-alpha",
      A: "upper-alpha",
      i: "lower-roman",
      I: "upper-roman",
      1: "decimal",
      disc: "disc",
      circle: "circle",
      square: "square",
    };
  CKEDITOR.dialog.add("numberedListStyle", function (c) {
    return f(c, "numberedListStyle");
  });
  CKEDITOR.dialog.add("bulletedListStyle", function (c) {
    return f(c, "bulletedListStyle");
  });
})();
