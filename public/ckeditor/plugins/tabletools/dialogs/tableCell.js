﻿/*
 Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
CKEDITOR.dialog.add("cellProperties", function (g) {
  function k(a) {
    return {
      isSpacer: !0,
      type: "html",
      html: "\x26nbsp;",
      requiredContent: a ? a : void 0,
    };
  }
  function r() {
    return { type: "vbox", padding: 0, children: [] };
  }
  function t(a) {
    return {
      requiredContent: "td{" + a + "}",
      type: "hbox",
      widths: ["70%", "30%"],
      children: [
        {
          type: "text",
          id: a,
          width: "100px",
          label: e[a],
          validate: p.number(d["invalid" + CKEDITOR.tools.capitalize(a)]),
          onLoad: function () {
            var b = this.getDialog()
                .getContentElement("info", a + "Type")
                .getElement(),
              c = this.getInputElement(),
              d = c.getAttribute("aria-labelledby");
            c.setAttribute("aria-labelledby", [d, b.$.id].join(" "));
          },
          setup: f(function (b) {
            var c = parseFloat(b.getAttribute(a), 10);
            b = parseFloat(b.getStyle(a), 10);
            if (!isNaN(b)) return b;
            if (!isNaN(c)) return c;
          }),
          commit: function (b) {
            var c = parseFloat(this.getValue(), 10),
              d = this.getDialog().getValueOf("info", a + "Type") || u(b, a);
            isNaN(c) ? b.removeStyle(a) : b.setStyle(a, c + d);
            b.removeAttribute(a);
          },
          default: "",
        },
        {
          type: "select",
          id: a + "Type",
          label: g.lang.table[a + "Unit"],
          labelStyle: "visibility:hidden;display:block;width:0;overflow:hidden",
          default: "px",
          items: [
            [q.widthPx, "px"],
            [q.widthPc, "%"],
          ],
          setup: f(function (b) {
            return u(b, a);
          }),
        },
      ],
    };
  }
  function f(a) {
    return function (b) {
      for (var c = a(b[0]), d = 1; d < b.length; d++)
        if (a(b[d]) !== c) {
          c = null;
          break;
        }
      "undefined" != typeof c &&
        (this.setValue(c),
        CKEDITOR.env.gecko &&
          "select" == this.type &&
          !c &&
          (this.getInputElement().$.selectedIndex = -1));
    };
  }
  function u(a, b) {
    var c = /^(\d+(?:\.\d+)?)(px|%)$/.exec(a.getStyle(b) || a.getAttribute(b));
    if (c) return c[2];
  }
  function v(a, b) {
    g.getColorFromDialog(function (c) {
      c && a.getDialog().getContentElement("info", b).setValue(c);
      a.focus();
    }, a);
  }
  function w(a, b, c) {
    (a = a.getValue()) ? b.setStyle(c, a) : b.removeStyle(c);
    "background-color" == c
      ? b.removeAttribute("bgColor")
      : "border-color" == c && b.removeAttribute("borderColor");
  }
  var q = g.lang.table,
    d = q.cell,
    e = g.lang.common,
    p = CKEDITOR.dialog.validate,
    z = "rtl" == g.lang.dir,
    m = g.plugins.colordialog,
    l = t("width"),
    A = t("height"),
    B = k(["td{width}", "td{height}"]),
    C = {
      type: "select",
      id: "wordWrap",
      requiredContent: "td{white-space}",
      label: d.wordWrap,
      default: "yes",
      items: [
        [d.yes, "yes"],
        [d.no, "no"],
      ],
      setup: f(function (a) {
        var b = a.getAttribute("noWrap");
        if ("nowrap" == a.getStyle("white-space") || b) return "no";
      }),
      commit: function (a) {
        "no" == this.getValue()
          ? a.setStyle("white-space", "nowrap")
          : a.removeStyle("white-space");
        a.removeAttribute("noWrap");
      },
    },
    D = k("td{white-space}"),
    E = {
      type: "select",
      id: "hAlign",
      requiredContent: "td{text-align}",
      label: d.hAlign,
      default: "",
      items: [
        [e.notSet, ""],
        [e.left, "left"],
        [e.center, "center"],
        [e.right, "right"],
        [e.justify, "justify"],
      ],
      setup: f(function (a) {
        var b = a.getAttribute("align");
        return a.getStyle("text-align") || b || "";
      }),
      commit: function (a) {
        var b = this.getValue();
        b ? a.setStyle("text-align", b) : a.removeStyle("text-align");
        a.removeAttribute("align");
      },
    },
    F = {
      type: "select",
      id: "vAlign",
      requiredContent: "td{vertical-align}",
      label: d.vAlign,
      default: "",
      items: [
        [e.notSet, ""],
        [e.alignTop, "top"],
        [e.alignMiddle, "middle"],
        [e.alignBottom, "bottom"],
        [d.alignBaseline, "baseline"],
      ],
      setup: f(function (a) {
        var b = a.getAttribute("vAlign");
        a = a.getStyle("vertical-align");
        switch (a) {
          case "top":
          case "middle":
          case "bottom":
          case "baseline":
            break;
          default:
            a = "";
        }
        return a || b || "";
      }),
      commit: function (a) {
        var b = this.getValue();
        b ? a.setStyle("vertical-align", b) : a.removeStyle("vertical-align");
        a.removeAttribute("vAlign");
      },
    },
    G = k(["td{text-align}", "td{vertical-align}"]),
    H = d.cellType,
    x;
  x = g.config.tabletools_scopedHeaders
    ? [
        [d.data, "td"],
        [d.columnHeader, "thc"],
        [d.rowHeader, "thr"],
      ]
    : [
        [d.data, "td"],
        [d.header, "th"],
      ];
  var l = [
      l,
      A,
      B,
      C,
      D,
      E,
      F,
      G,
      {
        type: "select",
        id: "cellType",
        requiredContent: "th[scope]",
        label: H,
        default: "td",
        items: x,
        setup: f(function (a) {
          var b = a.getName();
          a = a.getAttribute("scope");
          if ("td" === b) return "td";
          switch (a) {
            case "row":
              return "thr";
            case "col":
              return "thc";
            default:
              return "th";
          }
        }),
        commit: function (a) {
          var b = {
            td: { name: "td" },
            th: { name: "th" },
            thc: { name: "th", scope: "col" },
            thr: { name: "th", scope: "row" },
          }[this.getValue()];
          a.renameNode(b.name);
          b.scope
            ? a.setAttribute("scope", b.scope)
            : a.removeAttribute("scope");
        },
      },
      k("th"),
      {
        type: "text",
        id: "rowSpan",
        requiredContent: "td[rowspan]",
        label: d.rowSpan,
        default: "",
        validate: p.integer(d.invalidRowSpan),
        setup: f(function (a) {
          if ((a = parseInt(a.getAttribute("rowSpan"), 10)) && 1 != a) return a;
        }),
        commit: function (a) {
          var b = parseInt(this.getValue(), 10);
          b && 1 != b
            ? a.setAttribute("rowSpan", this.getValue())
            : a.removeAttribute("rowSpan");
        },
      },
      {
        type: "text",
        id: "colSpan",
        requiredContent: "td[colspan]",
        label: d.colSpan,
        default: "",
        validate: p.integer(d.invalidColSpan),
        setup: f(function (a) {
          if ((a = parseInt(a.getAttribute("colSpan"), 10)) && 1 != a) return a;
        }),
        commit: function (a) {
          var b = parseInt(this.getValue(), 10);
          b && 1 != b
            ? a.setAttribute("colSpan", this.getValue())
            : a.removeAttribute("colSpan");
        },
      },
      k(["td[colspan]", "td[rowspan]"]),
      {
        type: "hbox",
        padding: 0,
        widths: m ? ["60%", "40%"] : ["100%"],
        requiredContent: "td{background-color}",
        children: (function () {
          var a = [
            {
              type: "text",
              id: "bgColor",
              label: d.bgColor,
              default: "",
              setup: f(function (a) {
                var c = a.getAttribute("bgColor");
                return a.getStyle("background-color") || c;
              }),
              commit: function (a) {
                w(this, a, "background-color");
              },
            },
          ];
          m &&
            a.push({
              type: "button",
              id: "bgColorChoose",
              class: "colorChooser",
              label: d.chooseColor,
              onLoad: function () {
                this.getElement()
                  .getParent()
                  .setStyle("vertical-align", "bottom");
              },
              onClick: function () {
                v(this, "bgColor");
              },
            });
          return a;
        })(),
      },
      {
        type: "hbox",
        padding: 0,
        widths: m ? ["60%", "40%"] : ["100%"],
        requiredContent: "td{border-color}",
        children: (function () {
          var a = [
            {
              type: "text",
              id: "borderColor",
              label: d.borderColor,
              default: "",
              setup: f(function (a) {
                var c = a.getAttribute("borderColor");
                return a.getStyle("border-color") || c;
              }),
              commit: function (a) {
                w(this, a, "border-color");
              },
            },
          ];
          m &&
            a.push({
              type: "button",
              id: "borderColorChoose",
              class: "colorChooser",
              label: d.chooseColor,
              style: (z ? "margin-right" : "margin-left") + ": 10px",
              onLoad: function () {
                this.getElement()
                  .getParent()
                  .setStyle("vertical-align", "bottom");
              },
              onClick: function () {
                v(this, "borderColor");
              },
            });
          return a;
        })(),
      },
    ],
    n = 0,
    y = -1,
    h = [r()],
    l = CKEDITOR.tools.array.filter(l, function (a) {
      var b = a.requiredContent;
      delete a.requiredContent;
      (b = g.filter.check(b)) && !a.isSpacer && n++;
      return b;
    });
  5 < n && (h = h.concat([k(), r()]));
  CKEDITOR.tools.array.forEach(l, function (a) {
    a.isSpacer || y++;
    5 < n && y >= n / 2 ? h[2].children.push(a) : h[0].children.push(a);
  });
  CKEDITOR.tools.array.forEach(h, function (a) {
    a.isSpacer || ((a = a.children), a[a.length - 1].isSpacer && a.pop());
  });
  return {
    title: d.title,
    minWidth: 1 === h.length ? 205 : 410,
    minHeight: 50,
    contents: [
      {
        id: "info",
        label: d.title,
        accessKey: "I",
        elements: [
          {
            type: "hbox",
            widths: 1 === h.length ? ["100%"] : ["40%", "5%", "40%"],
            children: h,
          },
        ],
      },
    ],
    getModel: function (a) {
      return CKEDITOR.plugins.tabletools.getSelectedCells(a.getSelection());
    },
    onShow: function () {
      var a = this.getModel(this.getParentEditor());
      this.setupContent(a);
    },
    onOk: function () {
      for (
        var a = this._.editor.getSelection(),
          b = a.createBookmarks(),
          c = this.getParentEditor(),
          d = this.getModel(c),
          e = 0;
        e < d.length;
        e++
      )
        this.commitContent(d[e]);
      c.forceNextSelectionCheck();
      a.selectBookmarks(b);
      c.selectionChange();
    },
    onLoad: function () {
      var a = {};
      this.foreach(function (b) {
        b.setup &&
          b.commit &&
          ((b.setup = CKEDITOR.tools.override(b.setup, function (c) {
            return function () {
              c.apply(this, arguments);
              a[b.id] = b.getValue();
            };
          })),
          (b.commit = CKEDITOR.tools.override(b.commit, function (c) {
            return function () {
              a[b.id] !== b.getValue() && c.apply(this, arguments);
            };
          })));
      });
    },
  };
});
