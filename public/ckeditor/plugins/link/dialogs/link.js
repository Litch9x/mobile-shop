﻿/*
 Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
(function () {
  function u() {
    var c = this.getDialog(),
      p = c._.editor,
      n = p.config.linkPhoneRegExp,
      q = p.config.linkPhoneMsg,
      p = CKEDITOR.dialog.validate.notEmpty(p.lang.link.noTel).apply(this);
    if (
      !c.getContentElement("info", "linkType") ||
      "tel" != c.getValueOf("info", "linkType")
    )
      return !0;
    if (!0 !== p) return p;
    if (n) return CKEDITOR.dialog.validate.regex(n, q).call(this);
  }
  CKEDITOR.dialog.add("link", function (c) {
    function p(a, b) {
      var c = a.createRange();
      c.setStartBefore(b);
      c.setEndAfter(b);
      return c;
    }
    var n = CKEDITOR.plugins.link,
      q,
      t = function () {
        var a = this.getDialog(),
          b = a.getContentElement("target", "popupFeatures"),
          a = a.getContentElement("target", "linkTargetName"),
          r = this.getValue();
        if (b && a)
          switch (((b = b.getElement()), b.hide(), a.setValue(""), r)) {
            case "frame":
              a.setLabel(c.lang.link.targetFrameName);
              a.getElement().show();
              break;
            case "popup":
              b.show();
              a.setLabel(c.lang.link.targetPopupName);
              a.getElement().show();
              break;
            default:
              a.setValue(r), a.getElement().hide();
          }
      },
      d = function (a) {
        a.target && this.setValue(a.target[this.id] || "");
      },
      g = function (a) {
        a.advanced && this.setValue(a.advanced[this.id] || "");
      },
      e = function (a) {
        a.target || (a.target = {});
        a.target[this.id] = this.getValue() || "";
      },
      k = function (a) {
        a.advanced || (a.advanced = {});
        a.advanced[this.id] = this.getValue() || "";
      },
      h = c.lang.common,
      b = c.lang.link,
      l;
    return {
      title: b.title,
      minWidth:
        "moono-lisa" == (CKEDITOR.skinName || c.config.skin) ? 450 : 350,
      minHeight: 240,
      getModel: function (a) {
        return n.getSelectedLink(a, !0)[0] || null;
      },
      contents: [
        {
          id: "info",
          label: b.info,
          title: b.info,
          elements: [
            {
              type: "text",
              id: "linkDisplayText",
              label: b.displayText,
              setup: function () {
                this.enable();
                this.setValue(c.getSelection().getSelectedText());
                q = this.getValue();
              },
              commit: function (a) {
                a.linkText = this.isEnabled() ? this.getValue() : "";
              },
            },
            {
              id: "linkType",
              type: "select",
              label: b.type,
              default: "url",
              items: [
                [b.toUrl, "url"],
                [b.toAnchor, "anchor"],
                [b.toEmail, "email"],
                [b.toPhone, "tel"],
              ],
              onChange: function () {
                var a = this.getDialog(),
                  b = [
                    "urlOptions",
                    "anchorOptions",
                    "emailOptions",
                    "telOptions",
                  ],
                  r = this.getValue(),
                  f = a.definition.getContents("upload"),
                  f = f && f.hidden;
                "url" == r
                  ? (c.config.linkShowTargetTab && a.showPage("target"),
                    f || a.showPage("upload"))
                  : (a.hidePage("target"), f || a.hidePage("upload"));
                for (f = 0; f < b.length; f++) {
                  var m = a.getContentElement("info", b[f]);
                  m &&
                    ((m = m.getElement().getParent().getParent()),
                    b[f] == r + "Options" ? m.show() : m.hide());
                }
                a.layout();
              },
              setup: function (a) {
                this.setValue(a.type || "url");
              },
              commit: function (a) {
                a.type = this.getValue();
              },
            },
            {
              type: "vbox",
              id: "urlOptions",
              children: [
                {
                  type: "hbox",
                  widths: ["25%", "75%"],
                  children: [
                    {
                      id: "protocol",
                      type: "select",
                      label: h.protocol,
                      items: [
                        ["http://‎", "http://"],
                        ["https://‎", "https://"],
                        ["ftp://‎", "ftp://"],
                        ["news://‎", "news://"],
                        [b.other, ""],
                      ],
                      default: c.config.linkDefaultProtocol,
                      setup: function (a) {
                        a.url && this.setValue(a.url.protocol || "");
                      },
                      commit: function (a) {
                        a.url || (a.url = {});
                        a.url.protocol = this.getValue();
                      },
                    },
                    {
                      type: "text",
                      id: "url",
                      label: h.url,
                      required: !0,
                      onLoad: function () {
                        this.allowOnChange = !0;
                      },
                      onKeyUp: function () {
                        this.allowOnChange = !1;
                        var a = this.getDialog().getContentElement(
                            "info",
                            "protocol",
                          ),
                          b = this.getValue(),
                          c = /^((javascript:)|[#\/\.\?])/i,
                          f = /^(http|https|ftp|news):\/\/(?=.)/i.exec(b);
                        f
                          ? (this.setValue(b.substr(f[0].length)),
                            a.setValue(f[0].toLowerCase()))
                          : c.test(b) && a.setValue("");
                        this.allowOnChange = !0;
                      },
                      onChange: function () {
                        if (this.allowOnChange) this.onKeyUp();
                      },
                      validate: function () {
                        var a = this.getDialog();
                        return a.getContentElement("info", "linkType") &&
                          "url" != a.getValueOf("info", "linkType")
                          ? !0
                          : !c.config.linkJavaScriptLinksAllowed &&
                              /javascript\:/.test(this.getValue())
                            ? (alert(h.invalidValue), !1)
                            : this.getDialog().fakeObj
                              ? !0
                              : CKEDITOR.dialog.validate
                                  .notEmpty(b.noUrl)
                                  .apply(this);
                      },
                      setup: function (a) {
                        this.allowOnChange = !1;
                        a.url && this.setValue(a.url.url);
                        this.allowOnChange = !0;
                      },
                      commit: function (a) {
                        this.onChange();
                        a.url || (a.url = {});
                        a.url.url = this.getValue();
                        this.allowOnChange = !1;
                      },
                    },
                  ],
                  setup: function () {
                    this.getDialog().getContentElement("info", "linkType") ||
                      this.getElement().show();
                  },
                },
                {
                  type: "button",
                  id: "browse",
                  hidden: "true",
                  filebrowser: "info:url",
                  label: h.browseServer,
                },
              ],
            },
            {
              type: "vbox",
              id: "anchorOptions",
              width: 260,
              align: "center",
              padding: 0,
              children: [
                {
                  type: "fieldset",
                  id: "selectAnchorText",
                  label: b.selectAnchor,
                  setup: function () {
                    l = n.getEditorAnchors(c);
                    this.getElement()[l && l.length ? "show" : "hide"]();
                  },
                  children: [
                    {
                      type: "hbox",
                      id: "selectAnchor",
                      children: [
                        {
                          type: "select",
                          id: "anchorName",
                          default: "",
                          label: b.anchorName,
                          style: "width: 100%;",
                          items: [[""]],
                          setup: function (a) {
                            this.clear();
                            this.add("");
                            if (l)
                              for (var b = 0; b < l.length; b++)
                                l[b].name && this.add(l[b].name);
                            a.anchor && this.setValue(a.anchor.name);
                            (a = this.getDialog().getContentElement(
                              "info",
                              "linkType",
                            )) &&
                              "email" == a.getValue() &&
                              this.focus();
                          },
                          commit: function (a) {
                            a.anchor || (a.anchor = {});
                            a.anchor.name = this.getValue();
                          },
                        },
                        {
                          type: "select",
                          id: "anchorId",
                          default: "",
                          label: b.anchorId,
                          style: "width: 100%;",
                          items: [[""]],
                          setup: function (a) {
                            this.clear();
                            this.add("");
                            if (l)
                              for (var b = 0; b < l.length; b++)
                                l[b].id && this.add(l[b].id);
                            a.anchor && this.setValue(a.anchor.id);
                          },
                          commit: function (a) {
                            a.anchor || (a.anchor = {});
                            a.anchor.id = this.getValue();
                          },
                        },
                      ],
                      setup: function () {
                        this.getElement()[l && l.length ? "show" : "hide"]();
                      },
                    },
                  ],
                },
                {
                  type: "html",
                  id: "noAnchors",
                  style: "text-align: center;",
                  html:
                    '\x3cdiv role\x3d"note" tabIndex\x3d"-1"\x3e' +
                    CKEDITOR.tools.htmlEncode(b.noAnchors) +
                    "\x3c/div\x3e",
                  focus: !0,
                  setup: function () {
                    this.getElement()[l && l.length ? "hide" : "show"]();
                  },
                },
              ],
              setup: function () {
                this.getDialog().getContentElement("info", "linkType") ||
                  this.getElement().hide();
              },
            },
            {
              type: "vbox",
              id: "emailOptions",
              padding: 1,
              children: [
                {
                  type: "text",
                  id: "emailAddress",
                  label: b.emailAddress,
                  required: !0,
                  validate: function () {
                    var a = this.getDialog();
                    return a.getContentElement("info", "linkType") &&
                      "email" == a.getValueOf("info", "linkType")
                      ? CKEDITOR.dialog.validate.notEmpty(b.noEmail).apply(this)
                      : !0;
                  },
                  setup: function (a) {
                    a.email && this.setValue(a.email.address);
                    (a = this.getDialog().getContentElement(
                      "info",
                      "linkType",
                    )) &&
                      "email" == a.getValue() &&
                      this.select();
                  },
                  commit: function (a) {
                    a.email || (a.email = {});
                    a.email.address = this.getValue();
                  },
                },
                {
                  type: "text",
                  id: "emailSubject",
                  label: b.emailSubject,
                  setup: function (a) {
                    a.email && this.setValue(a.email.subject);
                  },
                  commit: function (a) {
                    a.email || (a.email = {});
                    a.email.subject = this.getValue();
                  },
                },
                {
                  type: "textarea",
                  id: "emailBody",
                  label: b.emailBody,
                  rows: 3,
                  default: "",
                  setup: function (a) {
                    a.email && this.setValue(a.email.body);
                  },
                  commit: function (a) {
                    a.email || (a.email = {});
                    a.email.body = this.getValue();
                  },
                },
              ],
              setup: function () {
                this.getDialog().getContentElement("info", "linkType") ||
                  this.getElement().hide();
              },
            },
            {
              type: "vbox",
              id: "telOptions",
              padding: 1,
              children: [
                {
                  type: "tel",
                  id: "telNumber",
                  label: b.phoneNumber,
                  required: !0,
                  validate: u,
                  setup: function (a) {
                    a.tel && this.setValue(a.tel);
                    (a = this.getDialog().getContentElement(
                      "info",
                      "linkType",
                    )) &&
                      "tel" == a.getValue() &&
                      this.select();
                  },
                  commit: function (a) {
                    a.tel = this.getValue();
                  },
                },
              ],
              setup: function () {
                this.getDialog().getContentElement("info", "linkType") ||
                  this.getElement().hide();
              },
            },
          ],
        },
        {
          id: "target",
          requiredContent: "a[target]",
          label: b.target,
          title: b.target,
          elements: [
            {
              type: "hbox",
              widths: ["50%", "50%"],
              children: [
                {
                  type: "select",
                  id: "linkTargetType",
                  label: h.target,
                  default: "notSet",
                  style: "width : 100%;",
                  items: [
                    [h.notSet, "notSet"],
                    [b.targetFrame, "frame"],
                    [b.targetPopup, "popup"],
                    [h.targetNew, "_blank"],
                    [h.targetTop, "_top"],
                    [h.targetSelf, "_self"],
                    [h.targetParent, "_parent"],
                  ],
                  onChange: t,
                  setup: function (a) {
                    a.target && this.setValue(a.target.type || "notSet");
                    t.call(this);
                  },
                  commit: function (a) {
                    a.target || (a.target = {});
                    a.target.type = this.getValue();
                  },
                },
                {
                  type: "text",
                  id: "linkTargetName",
                  label: b.targetFrameName,
                  default: "",
                  setup: function (a) {
                    a.target && this.setValue(a.target.name);
                  },
                  commit: function (a) {
                    a.target || (a.target = {});
                    a.target.name = this.getValue().replace(
                      /([^\x00-\x7F]|\s)/gi,
                      "",
                    );
                  },
                },
              ],
            },
            {
              type: "vbox",
              width: "100%",
              align: "center",
              padding: 2,
              id: "popupFeatures",
              children: [
                {
                  type: "fieldset",
                  label: b.popupFeatures,
                  children: [
                    {
                      type: "hbox",
                      children: [
                        {
                          type: "checkbox",
                          id: "resizable",
                          label: b.popupResizable,
                          setup: d,
                          commit: e,
                        },
                        {
                          type: "checkbox",
                          id: "status",
                          label: b.popupStatusBar,
                          setup: d,
                          commit: e,
                        },
                      ],
                    },
                    {
                      type: "hbox",
                      children: [
                        {
                          type: "checkbox",
                          id: "location",
                          label: b.popupLocationBar,
                          setup: d,
                          commit: e,
                        },
                        {
                          type: "checkbox",
                          id: "toolbar",
                          label: b.popupToolbar,
                          setup: d,
                          commit: e,
                        },
                      ],
                    },
                    {
                      type: "hbox",
                      children: [
                        {
                          type: "checkbox",
                          id: "menubar",
                          label: b.popupMenuBar,
                          setup: d,
                          commit: e,
                        },
                        {
                          type: "checkbox",
                          id: "fullscreen",
                          label: b.popupFullScreen,
                          setup: d,
                          commit: e,
                        },
                      ],
                    },
                    {
                      type: "hbox",
                      children: [
                        {
                          type: "checkbox",
                          id: "scrollbars",
                          label: b.popupScrollBars,
                          setup: d,
                          commit: e,
                        },
                        {
                          type: "checkbox",
                          id: "dependent",
                          label: b.popupDependent,
                          setup: d,
                          commit: e,
                        },
                      ],
                    },
                    {
                      type: "hbox",
                      children: [
                        {
                          type: "text",
                          widths: ["50%", "50%"],
                          labelLayout: "horizontal",
                          label: h.width,
                          id: "width",
                          setup: d,
                          commit: e,
                        },
                        {
                          type: "text",
                          labelLayout: "horizontal",
                          widths: ["50%", "50%"],
                          label: b.popupLeft,
                          id: "left",
                          setup: d,
                          commit: e,
                        },
                      ],
                    },
                    {
                      type: "hbox",
                      children: [
                        {
                          type: "text",
                          labelLayout: "horizontal",
                          widths: ["50%", "50%"],
                          label: h.height,
                          id: "height",
                          setup: d,
                          commit: e,
                        },
                        {
                          type: "text",
                          labelLayout: "horizontal",
                          label: b.popupTop,
                          widths: ["50%", "50%"],
                          id: "top",
                          setup: d,
                          commit: e,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "upload",
          label: b.upload,
          title: b.upload,
          hidden: !0,
          filebrowser: "uploadButton",
          elements: [
            {
              type: "file",
              id: "upload",
              label: h.upload,
              style: "height:40px",
              size: 29,
            },
            {
              type: "fileButton",
              id: "uploadButton",
              label: h.uploadSubmit,
              filebrowser: "info:url",
              for: ["upload", "upload"],
            },
          ],
        },
        {
          id: "advanced",
          label: b.advanced,
          title: b.advanced,
          elements: [
            {
              type: "vbox",
              padding: 1,
              children: [
                {
                  type: "hbox",
                  widths: ["45%", "35%", "20%"],
                  children: [
                    {
                      type: "text",
                      id: "advId",
                      requiredContent: "a[id]",
                      label: b.id,
                      setup: g,
                      commit: k,
                    },
                    {
                      type: "select",
                      id: "advLangDir",
                      requiredContent: "a[dir]",
                      label: b.langDir,
                      default: "",
                      style: "width:110px",
                      items: [
                        [h.notSet, ""],
                        [b.langDirLTR, "ltr"],
                        [b.langDirRTL, "rtl"],
                      ],
                      setup: g,
                      commit: k,
                    },
                    {
                      type: "text",
                      id: "advAccessKey",
                      requiredContent: "a[accesskey]",
                      width: "80px",
                      label: b.acccessKey,
                      maxLength: 1,
                      setup: g,
                      commit: k,
                    },
                  ],
                },
                {
                  type: "hbox",
                  widths: ["45%", "35%", "20%"],
                  children: [
                    {
                      type: "text",
                      label: b.name,
                      id: "advName",
                      requiredContent: "a[name]",
                      setup: g,
                      commit: k,
                    },
                    {
                      type: "text",
                      label: b.langCode,
                      id: "advLangCode",
                      requiredContent: "a[lang]",
                      width: "110px",
                      default: "",
                      setup: g,
                      commit: k,
                    },
                    {
                      type: "text",
                      label: b.tabIndex,
                      id: "advTabIndex",
                      requiredContent: "a[tabindex]",
                      width: "80px",
                      maxLength: 5,
                      setup: g,
                      commit: k,
                    },
                  ],
                },
              ],
            },
            {
              type: "vbox",
              padding: 1,
              children: [
                {
                  type: "hbox",
                  widths: ["45%", "55%"],
                  children: [
                    {
                      type: "text",
                      label: b.advisoryTitle,
                      requiredContent: "a[title]",
                      default: "",
                      id: "advTitle",
                      setup: g,
                      commit: k,
                    },
                    {
                      type: "text",
                      label: b.advisoryContentType,
                      requiredContent: "a[type]",
                      default: "",
                      id: "advContentType",
                      setup: g,
                      commit: k,
                    },
                  ],
                },
                {
                  type: "hbox",
                  widths: ["45%", "55%"],
                  children: [
                    {
                      type: "text",
                      label: b.cssClasses,
                      requiredContent: "a(cke-xyz)",
                      default: "",
                      id: "advCSSClasses",
                      setup: g,
                      commit: k,
                    },
                    {
                      type: "text",
                      label: b.charset,
                      requiredContent: "a[charset]",
                      default: "",
                      id: "advCharset",
                      setup: g,
                      commit: k,
                    },
                  ],
                },
                {
                  type: "hbox",
                  widths: ["45%", "55%"],
                  children: [
                    {
                      type: "text",
                      label: b.rel,
                      requiredContent: "a[rel]",
                      default: "",
                      id: "advRel",
                      setup: g,
                      commit: k,
                    },
                    {
                      type: "text",
                      label: b.styles,
                      requiredContent: "a{cke-xyz}",
                      default: "",
                      id: "advStyles",
                      validate: CKEDITOR.dialog.validate.inlineStyle(
                        c.lang.common.invalidInlineStyle,
                      ),
                      setup: g,
                      commit: k,
                    },
                  ],
                },
                {
                  type: "hbox",
                  widths: ["45%", "55%"],
                  children: [
                    {
                      type: "checkbox",
                      id: "download",
                      requiredContent: "a[download]",
                      label: b.download,
                      setup: function (a) {
                        void 0 !== a.download &&
                          this.setValue("checked", "checked");
                      },
                      commit: function (a) {
                        this.getValue() && (a.download = this.getValue());
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      onShow: function () {
        var a = this.getParentEditor(),
          b = a.getSelection(),
          c = this.getContentElement("info", "linkDisplayText")
            .getElement()
            .getParent()
            .getParent(),
          f = n.getSelectedLink(a, !0),
          m = f[0] || null;
        m &&
          m.hasAttribute("href") &&
          (b.getSelectedElement() || b.isInTable() || b.selectElement(m));
        b = n.parseLinkAttributes(a, m);
        1 >= f.length && n.showDisplayTextForElement(m, a)
          ? c.show()
          : c.hide();
        this._.selectedElements = f;
        this.setupContent(b);
      },
      onOk: function () {
        var a = {};
        this.commitContent(a);
        if (this._.selectedElements.length) {
          var b = this._.selectedElements,
            h = n.getLinkAttributes(c, a),
            f = [],
            m,
            l,
            d,
            g,
            e,
            k;
          for (k = 0; k < b.length; k++) {
            g = b[k];
            l = g.data("cke-saved-href");
            m = a.linkText && q != a.linkText;
            d = l == q;
            l = "email" == a.type && l == "mailto:" + q;
            g.setAttributes(h.set);
            g.removeAttributes(h.removed);
            if (m) e = a.linkText;
            else if (d || l)
              e =
                "email" == a.type
                  ? a.email.address
                  : h.set["data-cke-saved-href"];
            e && g.setText(e);
            f.push(p(c, g));
          }
          c.getSelection().selectRanges(f);
          delete this._.selectedElements;
        } else {
          b = n.getLinkAttributes(c, a);
          h = c.getSelection().getRanges();
          f = new CKEDITOR.style({ element: "a", attributes: b.set });
          m = [];
          f.type = CKEDITOR.STYLE_INLINE;
          for (g = 0; g < h.length; g++) {
            d = h[g];
            d.collapsed
              ? ((e = new CKEDITOR.dom.text(
                  a.linkText ||
                    ("email" == a.type
                      ? a.email.address
                      : b.set["data-cke-saved-href"]),
                  c.document,
                )),
                d.insertNode(e),
                d.selectNodeContents(e))
              : q !== a.linkText &&
                ((e = new CKEDITOR.dom.text(a.linkText, c.document)),
                d.shrink(CKEDITOR.SHRINK_TEXT),
                c.editable().extractHtmlFromRange(d),
                d.insertNode(e));
            e = d._find("a");
            for (k = 0; k < e.length; k++) e[k].remove(!0);
            f.applyToRange(d, c);
            m.push(d);
          }
          c.getSelection().selectRanges(m);
        }
      },
      onLoad: function () {
        c.config.linkShowAdvancedTab || this.hidePage("advanced");
        c.config.linkShowTargetTab || this.hidePage("target");
      },
      onFocus: function () {
        var a = this.getContentElement("info", "linkType");
        a &&
          "url" == a.getValue() &&
          ((a = this.getContentElement("info", "url")), a.select());
      },
    };
  });
})();
