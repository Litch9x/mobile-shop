﻿/*
 Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
CKEDITOR.dialog.add("select", function (c) {
  function h(a, b, e, d, c) {
    a = f(a);
    d = d ? d.createElement("OPTION") : document.createElement("OPTION");
    if (a && d && "option" == d.getName())
      CKEDITOR.env.ie
        ? (isNaN(parseInt(c, 10))
            ? a.$.options.add(d.$)
            : a.$.options.add(d.$, c),
          (d.$.innerHTML = 0 < b.length ? b : ""),
          (d.$.value = e))
        : (null !== c && c < a.getChildCount()
            ? a.getChild(0 > c ? 0 : c).insertBeforeMe(d)
            : a.append(d),
          d.setText(0 < b.length ? b : ""),
          d.setValue(e));
    else return !1;
    return d;
  }
  function p(a) {
    a = f(a);
    for (var b = g(a), e = a.getChildren().count() - 1; 0 <= e; e--)
      a.getChild(e).$.selected && a.getChild(e).remove();
    k(a, b);
  }
  function q(a, b, e, d) {
    a = f(a);
    if (0 > b) return !1;
    a = a.getChild(b);
    a.setText(e);
    a.setValue(d);
    return a;
  }
  function m(a) {
    for (a = f(a); a.getChild(0) && a.getChild(0).remove(); );
  }
  function l(a, b, e) {
    a = f(a);
    var d = g(a);
    if (0 > d) return !1;
    b = d + b;
    b = 0 > b ? 0 : b;
    b = b >= a.getChildCount() ? a.getChildCount() - 1 : b;
    if (d == b) return !1;
    var d = a.getChild(d),
      c = d.getText(),
      r = d.getValue();
    d.remove();
    d = h(a, c, r, e ? e : null, b);
    k(a, b);
    return d;
  }
  function g(a) {
    return (a = f(a)) ? a.$.selectedIndex : -1;
  }
  function k(a, b) {
    a = f(a);
    if (0 > b) return null;
    var e = a.getChildren().count();
    a.$.selectedIndex = b >= e ? e - 1 : b;
    return a;
  }
  function n(a) {
    return (a = f(a)) ? a.getChildren() : !1;
  }
  function f(a) {
    return a && a.domId && a.getInputElement().$
      ? a.getInputElement()
      : a && a.$
        ? a
        : !1;
  }
  return {
    title: c.lang.forms.select.title,
    minWidth: CKEDITOR.env.ie ? 460 : 395,
    minHeight: CKEDITOR.env.ie ? 320 : 300,
    getModel: function (a) {
      return (a = a.getSelection().getSelectedElement()) &&
        "select" == a.getName()
        ? a
        : null;
    },
    onShow: function () {
      this.setupContent("clear");
      var a = this.getModel(this.getParentEditor());
      if (a) {
        this.setupContent(a.getName(), a);
        for (var a = n(a), b = 0; b < a.count(); b++)
          this.setupContent("option", a.getItem(b));
      }
    },
    onOk: function () {
      var a = this.getParentEditor(),
        b = this.getModel(a),
        e = this.getMode(a) == CKEDITOR.dialog.CREATION_MODE;
      e && (b = a.document.createElement("select"));
      this.commitContent(b);
      if (e && (a.insertElement(b), CKEDITOR.env.ie)) {
        var d = a.getSelection(),
          c = d.createBookmarks();
        setTimeout(function () {
          d.selectBookmarks(c);
        }, 0);
      }
    },
    contents: [
      {
        id: "info",
        label: c.lang.forms.select.selectInfo,
        title: c.lang.forms.select.selectInfo,
        accessKey: "",
        elements: [
          {
            id: "txtName",
            type: "text",
            widths: ["25%", "75%"],
            labelLayout: "horizontal",
            label: c.lang.common.name,
            default: "",
            accessKey: "N",
            style: "width:350px",
            setup: function (a, b) {
              "clear" == a
                ? this.setValue(this["default"] || "")
                : "select" == a &&
                  this.setValue(
                    b.data("cke-saved-name") || b.getAttribute("name") || "",
                  );
            },
            commit: function (a) {
              this.getValue()
                ? a.data("cke-saved-name", this.getValue())
                : (a.data("cke-saved-name", !1), a.removeAttribute("name"));
            },
          },
          {
            id: "txtValue",
            type: "text",
            widths: ["25%", "75%"],
            labelLayout: "horizontal",
            label: c.lang.forms.select.value,
            style: "width:350px",
            default: "",
            className: "cke_disabled",
            onLoad: function () {
              this.getInputElement().setAttribute("readOnly", !0);
            },
            setup: function (a, b) {
              "clear" == a
                ? this.setValue("")
                : "option" == a &&
                  b.getAttribute("selected") &&
                  this.setValue(b.$.value);
            },
          },
          {
            type: "hbox",
            className: "cke_dialog_forms_select_order_txtsize",
            widths: ["175px", "170px"],
            children: [
              {
                id: "txtSize",
                type: "text",
                labelLayout: "horizontal",
                label: c.lang.forms.select.size,
                default: "",
                accessKey: "S",
                style: "width:175px",
                validate: function () {
                  var a = CKEDITOR.dialog.validate.integer(
                    c.lang.common.validateNumberFailed,
                  );
                  return "" === this.getValue() || a.apply(this);
                },
                setup: function (a, b) {
                  "select" == a && this.setValue(b.getAttribute("size") || "");
                  CKEDITOR.env.webkit &&
                    this.getInputElement().setStyle("width", "86px");
                },
                commit: function (a) {
                  this.getValue()
                    ? a.setAttribute("size", this.getValue())
                    : a.removeAttribute("size");
                },
              },
              {
                type: "html",
                html:
                  "\x3cspan\x3e" +
                  CKEDITOR.tools.htmlEncode(c.lang.forms.select.lines) +
                  "\x3c/span\x3e",
              },
            ],
          },
          {
            type: "html",
            html:
              "\x3cspan\x3e" +
              CKEDITOR.tools.htmlEncode(c.lang.forms.select.opAvail) +
              "\x3c/span\x3e",
          },
          {
            type: "hbox",
            widths: ["115px", "115px", "100px"],
            className: "cke_dialog_forms_select_order",
            children: [
              {
                type: "vbox",
                children: [
                  {
                    id: "txtOptName",
                    type: "text",
                    label: c.lang.forms.select.opText,
                    style: "width:115px",
                    setup: function (a) {
                      "clear" == a && this.setValue("");
                    },
                  },
                  {
                    type: "select",
                    id: "cmbName",
                    label: "",
                    title: "",
                    size: 5,
                    style: "width:115px;height:75px",
                    items: [],
                    onChange: function () {
                      var a = this.getDialog(),
                        b = a.getContentElement("info", "cmbValue"),
                        e = a.getContentElement("info", "txtOptName"),
                        a = a.getContentElement("info", "txtOptValue"),
                        d = g(this);
                      k(b, d);
                      e.setValue(this.getValue());
                      a.setValue(b.getValue());
                    },
                    setup: function (a, b) {
                      "clear" == a
                        ? m(this)
                        : "option" == a &&
                          h(
                            this,
                            b.getText(),
                            b.getText(),
                            this.getDialog().getParentEditor().document,
                          );
                    },
                    commit: function (a) {
                      var b = this.getDialog(),
                        e = n(this),
                        d = n(b.getContentElement("info", "cmbValue")),
                        c = b.getContentElement("info", "txtValue").getValue();
                      m(a);
                      for (var f = 0; f < e.count(); f++) {
                        var g = h(
                          a,
                          e.getItem(f).getValue(),
                          d.getItem(f).getValue(),
                          b.getParentEditor().document,
                        );
                        d.getItem(f).getValue() == c &&
                          (g.setAttribute("selected", "selected"),
                          (g.selected = !0));
                      }
                    },
                  },
                ],
              },
              {
                type: "vbox",
                children: [
                  {
                    id: "txtOptValue",
                    type: "text",
                    label: c.lang.forms.select.opValue,
                    style: "width:115px",
                    setup: function (a) {
                      "clear" == a && this.setValue("");
                    },
                  },
                  {
                    type: "select",
                    id: "cmbValue",
                    label: "",
                    size: 5,
                    style: "width:115px;height:75px",
                    items: [],
                    onChange: function () {
                      var a = this.getDialog(),
                        b = a.getContentElement("info", "cmbName"),
                        e = a.getContentElement("info", "txtOptName"),
                        a = a.getContentElement("info", "txtOptValue"),
                        d = g(this);
                      k(b, d);
                      e.setValue(b.getValue());
                      a.setValue(this.getValue());
                    },
                    setup: function (a, b) {
                      if ("clear" == a) m(this);
                      else if ("option" == a) {
                        var e = b.getValue();
                        h(
                          this,
                          e,
                          e,
                          this.getDialog().getParentEditor().document,
                        );
                        "selected" == b.getAttribute("selected") &&
                          this.getDialog()
                            .getContentElement("info", "txtValue")
                            .setValue(e);
                      }
                    },
                  },
                ],
              },
              {
                type: "vbox",
                padding: 5,
                children: [
                  {
                    type: "button",
                    id: "btnAdd",
                    label: c.lang.forms.select.btnAdd,
                    title: c.lang.forms.select.btnAdd,
                    style: "width:100%;",
                    onClick: function () {
                      var a = this.getDialog(),
                        b = a.getContentElement("info", "txtOptName"),
                        e = a.getContentElement("info", "txtOptValue"),
                        d = a.getContentElement("info", "cmbName"),
                        c = a.getContentElement("info", "cmbValue");
                      h(
                        d,
                        b.getValue(),
                        b.getValue(),
                        a.getParentEditor().document,
                      );
                      h(
                        c,
                        e.getValue(),
                        e.getValue(),
                        a.getParentEditor().document,
                      );
                      b.setValue("");
                      e.setValue("");
                    },
                  },
                  {
                    type: "button",
                    id: "btnModify",
                    label: c.lang.forms.select.btnModify,
                    title: c.lang.forms.select.btnModify,
                    style: "width:100%;",
                    onClick: function () {
                      var a = this.getDialog(),
                        b = a.getContentElement("info", "txtOptName"),
                        e = a.getContentElement("info", "txtOptValue"),
                        d = a.getContentElement("info", "cmbName"),
                        a = a.getContentElement("info", "cmbValue"),
                        c = g(d);
                      0 <= c &&
                        (q(d, c, b.getValue(), b.getValue()),
                        q(a, c, e.getValue(), e.getValue()));
                    },
                  },
                  {
                    type: "button",
                    id: "btnUp",
                    style: "width:100%;",
                    label: c.lang.forms.select.btnUp,
                    title: c.lang.forms.select.btnUp,
                    onClick: function () {
                      var a = this.getDialog(),
                        b = a.getContentElement("info", "cmbName"),
                        c = a.getContentElement("info", "cmbValue");
                      l(b, -1, a.getParentEditor().document);
                      l(c, -1, a.getParentEditor().document);
                    },
                  },
                  {
                    type: "button",
                    id: "btnDown",
                    style: "width:100%;",
                    label: c.lang.forms.select.btnDown,
                    title: c.lang.forms.select.btnDown,
                    onClick: function () {
                      var a = this.getDialog(),
                        b = a.getContentElement("info", "cmbName"),
                        c = a.getContentElement("info", "cmbValue");
                      l(b, 1, a.getParentEditor().document);
                      l(c, 1, a.getParentEditor().document);
                    },
                  },
                ],
              },
            ],
          },
          {
            type: "hbox",
            widths: ["40%", "20%", "40%"],
            children: [
              {
                type: "button",
                id: "btnSetValue",
                label: c.lang.forms.select.btnSetValue,
                title: c.lang.forms.select.btnSetValue,
                onClick: function () {
                  var a = this.getDialog(),
                    b = a.getContentElement("info", "cmbValue");
                  a.getContentElement("info", "txtValue").setValue(
                    b.getValue(),
                  );
                },
              },
              {
                type: "button",
                id: "btnDelete",
                label: c.lang.forms.select.btnDelete,
                title: c.lang.forms.select.btnDelete,
                onClick: function () {
                  var a = this.getDialog(),
                    b = a.getContentElement("info", "cmbName"),
                    c = a.getContentElement("info", "cmbValue"),
                    d = a.getContentElement("info", "txtOptName"),
                    a = a.getContentElement("info", "txtOptValue");
                  p(b);
                  p(c);
                  d.setValue("");
                  a.setValue("");
                },
              },
              {
                type: "vbox",
                children: [
                  {
                    id: "chkMulti",
                    type: "checkbox",
                    label: c.lang.forms.select.chkMulti,
                    default: "",
                    accessKey: "M",
                    value: "checked",
                    setup: function (a, b) {
                      "select" == a &&
                        this.setValue(b.getAttribute("multiple"));
                    },
                    commit: function (a) {
                      this.getValue()
                        ? a.setAttribute("multiple", this.getValue())
                        : a.removeAttribute("multiple");
                    },
                  },
                  {
                    id: "required",
                    type: "checkbox",
                    label: c.lang.forms.select.required,
                    default: "",
                    accessKey: "Q",
                    value: "checked",
                    setup: function (a, b) {
                      "select" == a &&
                        CKEDITOR.plugins.forms._setupRequiredAttribute.call(
                          this,
                          b,
                        );
                    },
                    commit: function (a) {
                      this.getValue()
                        ? a.setAttribute("required", "required")
                        : a.removeAttribute("required");
                    },
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
