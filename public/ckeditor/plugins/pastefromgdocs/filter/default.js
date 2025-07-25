﻿/*
 Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
(function () {
  function g(b) {
    return "" === b ? !1 : b;
  }
  function h(b) {
    if (!/(o|u)l/i.test(b.parent.name)) return b;
    d.elements.replaceWithChildren(b);
    return !1;
  }
  function k(b) {
    function d(a, f) {
      var b, c;
      if (a && "tr" === a.name) {
        b = a.children;
        for (c = 0; c < f.length && b[c]; c++) b[c].attributes.width = f[c];
        d(a.next, f);
      }
    }
    var c = b.parent;
    b = (function (a) {
      return CKEDITOR.tools.array.map(a, function (a) {
        return Number(a.attributes.width);
      });
    })(b.children);
    var a = (function (a) {
      return CKEDITOR.tools.array.reduce(
        a,
        function (a, b) {
          return a + b;
        },
        0,
      );
    })(b);
    c.attributes.width = a;
    d(
      (function (a) {
        return (a = CKEDITOR.tools.array.find(a.children, function (a) {
          return a.name && ("tr" === a.name || "tbody" === a.name);
        })) &&
          a.name &&
          "tbody" === a.name
          ? a.children[0]
          : a;
      })(c),
      b,
    );
  }
  var e = CKEDITOR.plugins.pastetools,
    d = e.filters.common,
    c = d.styles;
  CKEDITOR.plugins.pastetools.filters.gdocs = {
    rules: function (b, e, l) {
      return {
        elementNames: [[/^meta/, ""]],
        comment: function () {
          return !1;
        },
        attributes: {
          id: function (a) {
            return !/^docs\-internal\-guid\-/.test(a);
          },
          dir: function (a) {
            return "ltr" === a ? !1 : a;
          },
          style: function (a, b) {
            return g(c.normalizedStyles(b, e));
          },
          class: function (a) {
            return g(a.replace(/kix-line-break/gi, ""));
          },
        },
        elements: {
          div: function (a) {
            var b = 1 === a.children.length,
              c = "table" === a.children[0].name;
            "div" === a.name && b && c && delete a.attributes.align;
          },
          colgroup: k,
          span: function (a) {
            c.createStyleStack(
              a,
              l,
              e,
              /vertical-align|white-space|font-variant/,
            );
            var b = /vertical-align:\s*sub/,
              d = a.attributes.style;
            /vertical-align:\s*super/.test(d)
              ? (a.name = "sup")
              : b.test(d) && (a.name = "sub");
            a.attributes.style = d.replace(/vertical-align\s*.+?;?/, "");
          },
          b: function (a) {
            d.elements.replaceWithChildren(a);
            return !1;
          },
          p: function (a) {
            if (a.parent && "li" === a.parent.name)
              return d.elements.replaceWithChildren(a), !1;
          },
          ul: function (a) {
            c.pushStylesLower(a);
            return h(a);
          },
          ol: function (a) {
            c.pushStylesLower(a);
            return h(a);
          },
          li: function (a) {
            c.pushStylesLower(a);
            var b = a.children,
              e = /(o|u)l/i;
            1 === b.length &&
              e.test(b[0].name) &&
              (d.elements.replaceWithChildren(a), (a = !1));
            return a;
          },
        },
      };
    },
  };
  CKEDITOR.pasteFilters.gdocs = e.createFilter({
    rules: [d.rules, CKEDITOR.plugins.pastetools.filters.gdocs.rules],
  });
})();
