﻿/*
 Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
(function () {
  function w(a) {
    for (var b = 0, p = 0, n = 0, q, e = a.$.rows.length; n < e; n++) {
      q = a.$.rows[n];
      for (var l = (b = 0), c, d = q.cells.length; l < d; l++)
        (c = q.cells[l]), (b += c.colSpan);
      b > p && (p = b);
    }
    return p;
  }
  function t(a) {
    return function () {
      var b = this.getValue(),
        b = !!(CKEDITOR.dialog.validate.integer().call(this, b) && 0 < b);
      b || (alert(a), this.select());
      return b;
    };
  }
  function r(a, b) {
    var p = function (e) {
        return new CKEDITOR.dom.element(e, a.document);
      },
      r = a.editable(),
      q = a.plugins.dialogadvtab;
    return {
      title: a.lang.table.title,
      minWidth: 310,
      minHeight: CKEDITOR.env.ie ? 310 : 280,
      getModel: function (e) {
        return "tableProperties" !== this.dialog.getName()
          ? null
          : (e = (e = e.getSelection()) && e.getRanges()[0])
            ? e._getTableElement({ table: 1 })
            : null;
      },
      onLoad: function () {
        var e = this,
          a = e.getContentElement("advanced", "advStyles");
        if (a)
          a.on("change", function () {
            var a = this.getStyle("width", ""),
              d = e.getContentElement("info", "txtWidth");
            d && d.setValue(a, !0);
            a = this.getStyle("height", "");
            (d = e.getContentElement("info", "txtHeight")) && d.setValue(a, !0);
          });
      },
      onShow: function () {
        var e = a.getSelection(),
          l = e.getRanges(),
          c,
          d = this.getContentElement("info", "txtRows"),
          g = this.getContentElement("info", "txtCols"),
          u = this.getContentElement("info", "txtWidth"),
          m = this.getContentElement("info", "txtHeight");
        "tableProperties" == b &&
          ((e = e.getSelectedElement()) && e.is("table")
            ? (c = e)
            : 0 < l.length &&
              (CKEDITOR.env.webkit && l[0].shrink(CKEDITOR.NODE_ELEMENT),
              (c = a
                .elementPath(l[0].getCommonAncestor(!0))
                .contains("table", 1))),
          (this._.selectedElement = c));
        c
          ? (this.setupContent(c), d && d.disable(), g && g.disable())
          : (d && d.enable(), g && g.enable());
        u && u.onChange();
        m && m.onChange();
      },
      onOk: function () {
        var e = a.getSelection(),
          l = this._.selectedElement && e.createBookmarks(),
          c = this._.selectedElement || p("table"),
          d = {};
        this.commitContent(d, c);
        if (d.info) {
          d = d.info;
          if (!this._.selectedElement)
            for (
              var g = c.append(p("tbody")),
                b = parseInt(d.txtRows, 10) || 0,
                m = parseInt(d.txtCols, 10) || 0,
                h = 0;
              h < b;
              h++
            )
              for (var f = g.append(p("tr")), k = 0; k < m; k++)
                f.append(p("td")).appendBogus();
          b = d.selHeaders;
          if (!c.$.tHead && ("row" == b || "both" == b)) {
            f = c.getElementsByTag("thead").getItem(0);
            g = c.getElementsByTag("tbody").getItem(0);
            m = g.getElementsByTag("tr").getItem(0);
            f || ((f = new CKEDITOR.dom.element("thead")), f.insertBefore(g));
            for (h = 0; h < m.getChildCount(); h++)
              (g = m.getChild(h)),
                g.type != CKEDITOR.NODE_ELEMENT ||
                  g.data("cke-bookmark") ||
                  (g.renameNode("th"), g.setAttribute("scope", "col"));
            f.append(m.remove());
          }
          if (null !== c.$.tHead && "row" != b && "both" != b) {
            f = new CKEDITOR.dom.element(c.$.tHead);
            for (
              g = c.getElementsByTag("tbody").getItem(0);
              0 < f.getChildCount();

            ) {
              m = f.getFirst();
              for (h = 0; h < m.getChildCount(); h++)
                (k = m.getChild(h)),
                  k.type != CKEDITOR.NODE_ELEMENT || (b && 0 === h)
                    ? k.setAttribute("scope", "row")
                    : (k.renameNode("td"), k.removeAttribute("scope"));
              g.append(m, !0);
            }
            f.remove();
          }
          if (!this.hasColumnHeaders && ("col" == b || "both" == b))
            for (f = 0; f < c.$.rows.length; f++)
              (k = new CKEDITOR.dom.element(c.$.rows[f].cells[0])),
                k.renameNode("th"),
                "both" === b && 0 === f
                  ? k.setAttribute("scope", "col")
                  : k.setAttribute("scope", "row");
          if (this.hasColumnHeaders && "col" != b && "both" != b)
            for (h = 0; h < c.$.rows.length; h++)
              (f = new CKEDITOR.dom.element(c.$.rows[h])),
                "tbody" == f.getParent().getName() &&
                  ((k = new CKEDITOR.dom.element(f.$.cells[0])),
                  k.renameNode("td"),
                  k.removeAttribute("scope"));
          d.txtHeight
            ? c.setStyle("height", d.txtHeight)
            : c.removeStyle("height");
          d.txtWidth ? c.setStyle("width", d.txtWidth) : c.removeStyle("width");
          c.getAttribute("style") || c.removeAttribute("style");
        }
        if (this._.selectedElement)
          try {
            e.selectBookmarks(l);
          } catch (n) {}
        else
          a.insertElement(c),
            setTimeout(function () {
              var e = new CKEDITOR.dom.element(c.$.rows[0].cells[0]),
                d = a.createRange();
              d.moveToPosition(e, CKEDITOR.POSITION_AFTER_START);
              d.select();
            }, 0);
      },
      contents: [
        {
          id: "info",
          label: a.lang.table.title,
          elements: [
            {
              type: "hbox",
              widths: [null, null],
              styles: ["vertical-align:top"],
              children: [
                {
                  type: "vbox",
                  padding: 0,
                  children: [
                    {
                      type: "text",
                      id: "txtRows",
                      default: 3,
                      label: a.lang.table.rows,
                      required: !0,
                      controlStyle: "width:5em",
                      validate: t(a.lang.table.invalidRows),
                      setup: function (e) {
                        this.setValue(e.$.rows.length);
                      },
                      commit: n,
                    },
                    {
                      type: "text",
                      id: "txtCols",
                      default: 2,
                      label: a.lang.table.columns,
                      required: !0,
                      controlStyle: "width:5em",
                      validate: t(a.lang.table.invalidCols),
                      setup: function (e) {
                        this.setValue(w(e));
                      },
                      commit: n,
                    },
                    { type: "html", html: "\x26nbsp;" },
                    {
                      type: "select",
                      id: "selHeaders",
                      requiredContent: "th",
                      default: "",
                      label: a.lang.table.headers,
                      items: [
                        [a.lang.table.headersNone, ""],
                        [a.lang.table.headersRow, "row"],
                        [a.lang.table.headersColumn, "col"],
                        [a.lang.table.headersBoth, "both"],
                      ],
                      setup: function (e) {
                        var a = this.getDialog();
                        a.hasColumnHeaders = !0;
                        for (var c = 0; c < e.$.rows.length; c++) {
                          var d = e.$.rows[c].cells[0];
                          if (d && "th" != d.nodeName.toLowerCase()) {
                            a.hasColumnHeaders = !1;
                            break;
                          }
                        }
                        null !== e.$.tHead
                          ? this.setValue(a.hasColumnHeaders ? "both" : "row")
                          : this.setValue(a.hasColumnHeaders ? "col" : "");
                      },
                      commit: n,
                    },
                    {
                      type: "text",
                      id: "txtBorder",
                      requiredContent: "table[border]",
                      default: a.filter.check("table[border]") ? 1 : 0,
                      label: a.lang.table.border,
                      controlStyle: "width:3em",
                      validate: CKEDITOR.dialog.validate.number(
                        a.lang.table.invalidBorder,
                      ),
                      setup: function (e) {
                        this.setValue(e.getAttribute("border") || "");
                      },
                      commit: function (e, a) {
                        this.getValue()
                          ? a.setAttribute("border", this.getValue())
                          : a.removeAttribute("border");
                      },
                    },
                    {
                      id: "cmbAlign",
                      type: "select",
                      requiredContent: "table[align]",
                      default: "",
                      label: a.lang.common.align,
                      items: [
                        [a.lang.common.notSet, ""],
                        [a.lang.common.left, "left"],
                        [a.lang.common.center, "center"],
                        [a.lang.common.right, "right"],
                      ],
                      setup: function (a) {
                        this.setValue(a.getAttribute("align") || "");
                      },
                      commit: function (a, b) {
                        this.getValue()
                          ? b.setAttribute("align", this.getValue())
                          : b.removeAttribute("align");
                      },
                    },
                  ],
                },
                {
                  type: "vbox",
                  padding: 0,
                  children: [
                    {
                      type: "hbox",
                      widths: ["5em"],
                      children: [
                        {
                          type: "text",
                          id: "txtWidth",
                          requiredContent: "table{width}",
                          controlStyle: "width:5em",
                          label: a.lang.common.width,
                          title: a.lang.common.cssLengthTooltip,
                          default: a.filter.check("table{width}")
                            ? 500 > r.getSize("width")
                              ? "100%"
                              : 500
                            : 0,
                          getValue: v,
                          validate: CKEDITOR.dialog.validate.cssLength(
                            a.lang.common.invalidCssLength.replace(
                              "%1",
                              a.lang.common.width,
                            ),
                          ),
                          onChange: function () {
                            var a = this.getDialog().getContentElement(
                              "advanced",
                              "advStyles",
                            );
                            a && a.updateStyle("width", this.getValue());
                          },
                          setup: function (a) {
                            a = a.getStyle("width");
                            this.setValue(a);
                          },
                          commit: n,
                        },
                      ],
                    },
                    {
                      type: "hbox",
                      widths: ["5em"],
                      children: [
                        {
                          type: "text",
                          id: "txtHeight",
                          requiredContent: "table{height}",
                          controlStyle: "width:5em",
                          label: a.lang.common.height,
                          title: a.lang.common.cssLengthTooltip,
                          default: "",
                          getValue: v,
                          validate: CKEDITOR.dialog.validate.cssLength(
                            a.lang.common.invalidCssLength.replace(
                              "%1",
                              a.lang.common.height,
                            ),
                          ),
                          onChange: function () {
                            var a = this.getDialog().getContentElement(
                              "advanced",
                              "advStyles",
                            );
                            a && a.updateStyle("height", this.getValue());
                          },
                          setup: function (a) {
                            (a = a.getStyle("height")) && this.setValue(a);
                          },
                          commit: n,
                        },
                      ],
                    },
                    { type: "html", html: "\x26nbsp;" },
                    {
                      type: "text",
                      id: "txtCellSpace",
                      requiredContent: "table[cellspacing]",
                      controlStyle: "width:3em",
                      label: a.lang.table.cellSpace,
                      default: a.filter.check("table[cellspacing]") ? 1 : 0,
                      validate: CKEDITOR.dialog.validate.number(
                        a.lang.table.invalidCellSpacing,
                      ),
                      setup: function (a) {
                        this.setValue(a.getAttribute("cellSpacing") || "");
                      },
                      commit: function (a, b) {
                        this.getValue()
                          ? b.setAttribute("cellSpacing", this.getValue())
                          : b.removeAttribute("cellSpacing");
                      },
                    },
                    {
                      type: "text",
                      id: "txtCellPad",
                      requiredContent: "table[cellpadding]",
                      controlStyle: "width:3em",
                      label: a.lang.table.cellPad,
                      default: a.filter.check("table[cellpadding]") ? 1 : 0,
                      validate: CKEDITOR.dialog.validate.number(
                        a.lang.table.invalidCellPadding,
                      ),
                      setup: function (a) {
                        this.setValue(a.getAttribute("cellPadding") || "");
                      },
                      commit: function (a, b) {
                        this.getValue()
                          ? b.setAttribute("cellPadding", this.getValue())
                          : b.removeAttribute("cellPadding");
                      },
                    },
                  ],
                },
              ],
            },
            { type: "html", align: "right", html: "" },
            {
              type: "vbox",
              padding: 0,
              children: [
                {
                  type: "text",
                  id: "txtCaption",
                  requiredContent: "caption",
                  label: a.lang.table.caption,
                  setup: function (a) {
                    this.enable();
                    a = a.getElementsByTag("caption");
                    if (0 < a.count()) {
                      a = a.getItem(0);
                      var b = a.getFirst(
                        CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT),
                      );
                      b && !b.equals(a.getBogus())
                        ? (this.disable(), this.setValue(a.getText()))
                        : ((a = CKEDITOR.tools.trim(a.getText())),
                          this.setValue(a));
                    }
                  },
                  commit: function (b, l) {
                    if (this.isEnabled()) {
                      var c = this.getValue(),
                        d = l.getElementsByTag("caption");
                      if (c)
                        0 < d.count()
                          ? ((d = d.getItem(0)), d.setHtml(""))
                          : ((d = new CKEDITOR.dom.element(
                              "caption",
                              a.document,
                            )),
                            l.append(d, !0)),
                          d.append(new CKEDITOR.dom.text(c, a.document));
                      else if (0 < d.count())
                        for (c = d.count() - 1; 0 <= c; c--)
                          d.getItem(c).remove();
                    }
                  },
                },
                {
                  type: "text",
                  id: "txtSummary",
                  bidi: !0,
                  requiredContent: "table[summary]",
                  label: a.lang.table.summary,
                  setup: function (a) {
                    this.setValue(a.getAttribute("summary") || "");
                  },
                  commit: function (a, b) {
                    this.getValue()
                      ? b.setAttribute("summary", this.getValue())
                      : b.removeAttribute("summary");
                  },
                },
              ],
            },
          ],
        },
        q && q.createAdvancedTab(a, null, "table"),
      ],
    };
  }
  var v = CKEDITOR.tools.cssLength,
    n = function (a) {
      var b = this.id;
      a.info || (a.info = {});
      a.info[b] = this.getValue();
    };
  CKEDITOR.dialog.add("table", function (a) {
    return r(a, "table");
  });
  CKEDITOR.dialog.add("tableProperties", function (a) {
    return r(a, "tableProperties");
  });
})();
