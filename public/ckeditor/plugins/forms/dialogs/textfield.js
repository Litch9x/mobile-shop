﻿/*
 Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
CKEDITOR.dialog.add("textfield", function (b) {
  function e(a) {
    a = a.element;
    var b = this.getValue();
    b ? a.setAttribute(this.id, b) : a.removeAttribute(this.id);
  }
  function f(a) {
    a = a.hasAttribute(this.id) && a.getAttribute(this.id);
    this.setValue(a || "");
  }
  var g = { email: 1, password: 1, search: 1, tel: 1, text: 1, url: 1 };
  return {
    title: b.lang.forms.textfield.title,
    minWidth: 350,
    minHeight: 150,
    getModel: function (a) {
      a = a.getSelection().getSelectedElement();
      return !a ||
        "input" != a.getName() ||
        (!g[a.getAttribute("type")] && a.getAttribute("type"))
        ? null
        : a;
    },
    onShow: function () {
      var a = this.getModel(this.getParentEditor());
      a && this.setupContent(a);
    },
    onOk: function () {
      var a = this.getParentEditor(),
        b = this.getModel(a),
        c = this.getMode(a) == CKEDITOR.dialog.CREATION_MODE;
      c &&
        ((b = a.document.createElement("input")),
        b.setAttribute("type", "text"));
      b = { element: b };
      c && a.insertElement(b.element);
      this.commitContent(b);
      c || a.getSelection().selectElement(b.element);
    },
    onLoad: function () {
      this.foreach(function (a) {
        a.getValue && (a.setup || (a.setup = f), a.commit || (a.commit = e));
      });
    },
    contents: [
      {
        id: "info",
        label: b.lang.forms.textfield.title,
        title: b.lang.forms.textfield.title,
        elements: [
          {
            type: "hbox",
            widths: ["50%", "50%"],
            children: [
              {
                id: "_cke_saved_name",
                type: "text",
                label: b.lang.forms.textfield.name,
                default: "",
                accessKey: "N",
                setup: function (a) {
                  this.setValue(
                    a.data("cke-saved-name") || a.getAttribute("name") || "",
                  );
                },
                commit: function (a) {
                  a = a.element;
                  this.getValue()
                    ? a.data("cke-saved-name", this.getValue())
                    : (a.data("cke-saved-name", !1), a.removeAttribute("name"));
                },
              },
              {
                id: "value",
                type: "text",
                label: b.lang.forms.textfield.value,
                default: "",
                accessKey: "V",
                commit: function (a) {
                  if (CKEDITOR.env.ie && !this.getValue()) {
                    var d = a.element,
                      c = new CKEDITOR.dom.element("input", b.document);
                    d.copyAttributes(c, { value: 1 });
                    c.replace(d);
                    a.element = c;
                  } else e.call(this, a);
                },
              },
            ],
          },
          {
            type: "hbox",
            widths: ["50%", "50%"],
            children: [
              {
                id: "size",
                type: "text",
                label: b.lang.forms.textfield.charWidth,
                default: "",
                accessKey: "C",
                style: "width:50px",
                validate: CKEDITOR.dialog.validate.integer(
                  b.lang.common.validateNumberFailed,
                ),
              },
              {
                id: "maxLength",
                type: "text",
                label: b.lang.forms.textfield.maxChars,
                default: "",
                accessKey: "M",
                style: "width:50px",
                validate: CKEDITOR.dialog.validate.integer(
                  b.lang.common.validateNumberFailed,
                ),
              },
            ],
            onLoad: function () {
              CKEDITOR.env.ie7Compat &&
                this.getElement().setStyle("zoom", "100%");
            },
          },
          {
            id: "type",
            type: "select",
            label: b.lang.forms.textfield.type,
            default: "text",
            accessKey: "M",
            items: [
              [b.lang.forms.textfield.typeEmail, "email"],
              [b.lang.forms.textfield.typePass, "password"],
              [b.lang.forms.textfield.typeSearch, "search"],
              [b.lang.forms.textfield.typeTel, "tel"],
              [b.lang.forms.textfield.typeText, "text"],
              [b.lang.forms.textfield.typeUrl, "url"],
            ],
            setup: function (a) {
              this.setValue(a.getAttribute("type"));
            },
            commit: function (a) {
              var d = a.element;
              if (CKEDITOR.env.ie) {
                var c = d.getAttribute("type"),
                  e = this.getValue();
                c != e &&
                  ((c = CKEDITOR.dom.element.createFromHtml(
                    '\x3cinput type\x3d"' + e + '"\x3e\x3c/input\x3e',
                    b.document,
                  )),
                  d.copyAttributes(c, { type: 1 }),
                  c.replace(d),
                  (a.element = c));
              } else d.setAttribute("type", this.getValue());
            },
          },
          {
            id: "required",
            type: "checkbox",
            label: b.lang.forms.textfield.required,
            default: "",
            accessKey: "Q",
            value: "required",
            setup: CKEDITOR.plugins.forms._setupRequiredAttribute,
            commit: function (a) {
              a = a.element;
              this.getValue()
                ? a.setAttribute("required", "required")
                : a.removeAttribute("required");
            },
          },
        ],
      },
    ],
  };
});
