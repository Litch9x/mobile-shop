﻿/*
 Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
(function () {
  function k(b, c) {
    if (
      !(
        b.previous &&
        g(b.previous) &&
        b.getFirst().children.length &&
        1 === b.children.length &&
        g(b.getFirst().getFirst())
      )
    )
      return !1;
    for (
      var d = l(b.previous), a = 0, f = d, r = q();
      (f = f.getAscendant(r));

    )
      a++;
    return (a = m(b, a)) ? (d.add(a), a.filterChildren(c), !0) : !1;
  }
  function l(b) {
    var c = b.children[b.children.length - 1];
    return g(c) || "li" === c.name ? l(c) : b;
  }
  function q() {
    var b = !1;
    return function (c) {
      return b ? !1 : g(c) || "li" === c.name ? g(c) : ((b = !0), !1);
    };
  }
  function m(b, c) {
    return c ? m(b.getFirst().getFirst(), --c) : b;
  }
  function g(b) {
    return "ol" === b.name || "ul" === b.name;
  }
  function h() {
    return !1;
  }
  var n = CKEDITOR.plugins.pastetools,
    p = n.filters.common,
    e = p.styles;
  CKEDITOR.plugins.pastetools.filters.libreoffice = {
    rules: function (b, c, d) {
      return {
        root: function (a) {
          a.filterChildren(d);
        },
        comment: function () {
          return !1;
        },
        elementNames: [
          [/^head$/i, ""],
          [/^meta$/i, ""],
          [/^strike$/i, "s"],
        ],
        elements: {
          "!doctype": function (a) {
            a.replaceWithChildren();
          },
          span: function (a) {
            a.attributes.style &&
              ((a.attributes.style = e.normalizedStyles(a, c)),
              e.createStyleStack(a, d, c));
            CKEDITOR.tools.object.entries(a.attributes).length ||
              a.replaceWithChildren();
          },
          p: function (a) {
            var f = CKEDITOR.tools.parseCssText(a.attributes.style);
            if (
              c.plugins.pagebreak &&
              ("always" === f["page-break-before"] ||
                "page" === f["break-before"])
            ) {
              var b = CKEDITOR.plugins.pagebreak.createElement(c),
                b = CKEDITOR.htmlParser.fragment.fromHtml(b.getOuterHtml())
                  .children[0];
              b.insertBefore(a);
            }
            a.attributes.style = CKEDITOR.tools.writeCssText(f);
            a.filterChildren(d);
            e.createStyleStack(a, d, c);
          },
          div: function (a) {
            e.createStyleStack(a, d, c);
          },
          a: function (a) {
            if (a.attributes.style) {
              var c = a.attributes;
              a = CKEDITOR.tools.parseCssText(a.attributes.style);
              "#000080" === a.color && delete a.color;
              "underline" === a["text-decoration"] &&
                delete a["text-decoration"];
              a = CKEDITOR.tools.writeCssText(a);
              c.style = a;
            }
          },
          h1: function (a) {
            e.createStyleStack(a, d, c);
          },
          h2: function (a) {
            e.createStyleStack(a, d, c);
          },
          h3: function (a) {
            e.createStyleStack(a, d, c);
          },
          h4: function (a) {
            e.createStyleStack(a, d, c);
          },
          h5: function (a) {
            e.createStyleStack(a, d, c);
          },
          h6: function (a) {
            e.createStyleStack(a, d, c);
          },
          pre: function (a) {
            e.createStyleStack(a, d, c);
          },
          font: function (a) {
            var c;
            c =
              "a" === a.parent.name && "#000080" === a.attributes.color
                ? !0
                : 1 !== a.parent.children.length ||
                    ("sup" !== a.parent.name && "sub" !== a.parent.name) ||
                    "2" !== a.attributes.size
                  ? !1
                  : !0;
            c && a.replaceWithChildren();
            c = CKEDITOR.tools.parseCssText(a.attributes.style);
            var b = a.getFirst();
            a.attributes.size &&
              b &&
              b.type === CKEDITOR.NODE_ELEMENT &&
              /font-size/.test(b.attributes.style) &&
              a.replaceWithChildren();
            c["font-size"] &&
              (delete a.attributes.size,
              (a.name = "span"),
              b &&
                b.type === CKEDITOR.NODE_ELEMENT &&
                b.attributes.size &&
                b.replaceWithChildren());
          },
          ul: function (a) {
            if (k(a, d)) return !1;
          },
          ol: function (a) {
            if (k(a, d)) return !1;
          },
          img: function (a) {
            if (!a.attributes.src) return !1;
          },
          table: function (a) {
            var c = a.attributes;
            a = a.attributes.style;
            var b = CKEDITOR.tools.parseCssText(a);
            b["border-collapse"] ||
              ((b["border-collapse"] = "collapse"),
              (a = CKEDITOR.tools.writeCssText(b)));
            c.style = a;
          },
        },
        attributes: {
          style: function (a, b) {
            return e.normalizedStyles(b, c) || !1;
          },
          align: function (a, b) {
            if ("img" !== b.name) {
              var c = CKEDITOR.tools.parseCssText(b.attributes.style);
              c["text-align"] = b.attributes.align;
              b.attributes.style = CKEDITOR.tools.writeCssText(c);
              return !1;
            }
          },
          cellspacing: h,
          cellpadding: h,
          border: h,
        },
      };
    },
  };
  CKEDITOR.pasteFilters.libreoffice = n.createFilter({
    rules: [p.rules, CKEDITOR.plugins.pastetools.filters.libreoffice.rules],
  });
})();
