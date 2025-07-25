﻿/*
 Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
(function () {
  function v() {
    return !1;
  }
  var l = CKEDITOR.tools,
    D = CKEDITOR.plugins.pastetools,
    w = D.filters.common,
    h = w.styles,
    E = w.createAttributeStack,
    A = w.lists.getElementIndentation,
    F = ["o:p", "xml", "script", "meta", "link"],
    G =
      "v:arc v:curve v:line v:oval v:polyline v:rect v:roundrect v:group".split(
        " ",
      ),
    B = {},
    z = 0,
    u = {},
    f,
    t;
  CKEDITOR.plugins.pastetools.filters.word = u;
  CKEDITOR.plugins.pastefromword = u;
  u.rules = function (c, b, d) {
    function e(a) {
      (a.attributes["o:gfxdata"] || "v:group" === a.parent.name) &&
        k.push(a.attributes.id);
    }
    var g = Boolean(c.match(/mso-list:\s*l\d+\s+level\d+\s+lfo\d+/)),
      k = [],
      x = {
        root: function (a) {
          a.filterChildren(d);
          CKEDITOR.plugins.pastefromword.lists.cleanup(f.createLists(a, b));
        },
        elementNames: [
          [/^\?xml:namespace$/, ""],
          [/^v:shapetype/, ""],
          [new RegExp(F.join("|")), ""],
        ],
        elements: {
          a: function (a) {
            if (a.attributes.name) {
              if ("_GoBack" == a.attributes.name) {
                delete a.name;
                return;
              }
              if (a.attributes.name.match(/^OLE_LINK\d+$/)) {
                delete a.name;
                return;
              }
            }
            if (a.attributes.href && a.attributes.href.match(/#.+$/)) {
              var b = a.attributes.href.match(/#(.+)$/)[1];
              B[b] = a;
            }
            a.attributes.name &&
              B[a.attributes.name] &&
              ((a = B[a.attributes.name]),
              (a.attributes.href = a.attributes.href.replace(
                /.*#(.*)$/,
                "#$1",
              )));
          },
          div: function (a) {
            if (b.plugins.pagebreak && a.attributes["data-cke-pagebreak"])
              return a;
            h.createStyleStack(a, d, b);
          },
          img: function (a) {
            if (a.parent && a.parent.attributes) {
              var b = a.parent.attributes;
              (b = b.style || b.STYLE) &&
                b.match(/mso\-list:\s?Ignore/) &&
                (a.attributes["cke-ignored"] = !0);
            }
            h.mapCommonStyles(a);
            a.attributes.src &&
              a.attributes.src.match(/^file:\/\//) &&
              a.attributes.alt &&
              a.attributes.alt.match(/^https?:\/\//) &&
              (a.attributes.src = a.attributes.alt);
            a = a.attributes["v:shapes"]
              ? a.attributes["v:shapes"].split(" ")
              : [];
            b = CKEDITOR.tools.array.every(a, function (a) {
              return -1 < k.indexOf(a);
            });
            if (a.length && b) return !1;
          },
          p: function (a) {
            a.filterChildren(d);
            if (
              a.attributes.style &&
              a.attributes.style.match(/display:\s*none/i)
            )
              return !1;
            if (f.thisIsAListItem(b, a))
              t.isEdgeListItem(b, a) && t.cleanupEdgeListItem(a),
                f.convertToFakeListItem(b, a),
                l.array.reduce(
                  a.children,
                  function (a, b) {
                    "p" === b.name &&
                      (0 < a &&
                        new CKEDITOR.htmlParser.element("br").insertBefore(b),
                      b.replaceWithChildren(),
                      (a += 1));
                    return a;
                  },
                  0,
                );
            else {
              var c = a.getAscendant(function (a) {
                  return "ul" == a.name || "ol" == a.name;
                }),
                e = l.parseCssText(a.attributes.style);
              c &&
                !c.attributes["cke-list-level"] &&
                e["mso-list"] &&
                e["mso-list"].match(/level/) &&
                (c.attributes["cke-list-level"] =
                  e["mso-list"].match(/level(\d+)/)[1]);
              b.config.enterMode == CKEDITOR.ENTER_BR &&
                (delete a.name, a.add(new CKEDITOR.htmlParser.element("br")));
            }
            h.createStyleStack(a, d, b);
          },
          pre: function (a) {
            f.thisIsAListItem(b, a) && f.convertToFakeListItem(b, a);
            h.createStyleStack(a, d, b);
          },
          h1: function (a) {
            f.thisIsAListItem(b, a) && f.convertToFakeListItem(b, a);
            h.createStyleStack(a, d, b);
          },
          h2: function (a) {
            f.thisIsAListItem(b, a) && f.convertToFakeListItem(b, a);
            h.createStyleStack(a, d, b);
          },
          h3: function (a) {
            f.thisIsAListItem(b, a) && f.convertToFakeListItem(b, a);
            h.createStyleStack(a, d, b);
          },
          h4: function (a) {
            f.thisIsAListItem(b, a) && f.convertToFakeListItem(b, a);
            h.createStyleStack(a, d, b);
          },
          h5: function (a) {
            f.thisIsAListItem(b, a) && f.convertToFakeListItem(b, a);
            h.createStyleStack(a, d, b);
          },
          h6: function (a) {
            f.thisIsAListItem(b, a) && f.convertToFakeListItem(b, a);
            h.createStyleStack(a, d, b);
          },
          font: function (a) {
            if (a.getHtml().match(/^\s*$/))
              return (
                a.parent.type === CKEDITOR.NODE_ELEMENT &&
                  new CKEDITOR.htmlParser.text(" ").insertAfter(a),
                !1
              );
            b &&
              !0 === b.config.pasteFromWordRemoveFontStyles &&
              a.attributes.size &&
              delete a.attributes.size;
            CKEDITOR.dtd.tr[a.parent.name] &&
            CKEDITOR.tools.arrayCompare(
              CKEDITOR.tools.object.keys(a.attributes),
              ["class", "style"],
            )
              ? h.createStyleStack(a, d, b)
              : E(a, d);
          },
          ul: function (a) {
            if (g)
              return (
                "li" == a.parent.name &&
                  0 === l.indexOf(a.parent.children, a) &&
                  h.setStyle(a.parent, "list-style-type", "none"),
                f.dissolveList(a),
                !1
              );
          },
          li: function (a) {
            t.correctLevelShift(a);
            g &&
              ((a.attributes.style = h.normalizedStyles(a, b)),
              h.pushStylesLower(a));
          },
          ol: function (a) {
            if (g)
              return (
                "li" == a.parent.name &&
                  0 === l.indexOf(a.parent.children, a) &&
                  h.setStyle(a.parent, "list-style-type", "none"),
                f.dissolveList(a),
                !1
              );
          },
          span: function (a) {
            a.filterChildren(d);
            a.attributes.style = h.normalizedStyles(a, b);
            if (
              !a.attributes.style ||
              a.attributes.style.match(/^mso\-bookmark:OLE_LINK\d+$/) ||
              a.getHtml().match(/^(\s|&nbsp;)+$/)
            )
              return w.elements.replaceWithChildren(a), !1;
            a.attributes.style.match(/FONT-FAMILY:\s*Symbol/i) &&
              a.forEach(
                function (a) {
                  a.value = a.value.replace(/&nbsp;/g, "");
                },
                CKEDITOR.NODE_TEXT,
                !0,
              );
            h.createStyleStack(a, d, b);
          },
          "v:imagedata": v,
          "v:shape": function (a) {
            var b = !1;
            if (null === a.getFirst("v:imagedata")) e(a);
            else {
              a.parent.find(function (c) {
                "img" == c.name &&
                  c.attributes &&
                  c.attributes["v:shapes"] == a.attributes.id &&
                  (b = !0);
              }, !0);
              if (b) return !1;
              var c = "";
              "v:group" === a.parent.name
                ? e(a)
                : (a.forEach(
                    function (a) {
                      a.attributes &&
                        a.attributes.src &&
                        (c = a.attributes.src);
                    },
                    CKEDITOR.NODE_ELEMENT,
                    !0,
                  ),
                  a.filterChildren(d),
                  (a.name = "img"),
                  (a.attributes.src = a.attributes.src || c),
                  delete a.attributes.type);
            }
          },
          style: function () {
            return !1;
          },
          object: function (a) {
            return !(!a.attributes || !a.attributes.data);
          },
          br: function (a) {
            if (
              b.plugins.pagebreak &&
              ((a = l.parseCssText(a.attributes.style, !0)),
              "always" === a["page-break-before"] ||
                "page" === a["break-before"])
            )
              return (
                (a = CKEDITOR.plugins.pagebreak.createElement(b)),
                CKEDITOR.htmlParser.fragment.fromHtml(a.getOuterHtml())
                  .children[0]
              );
          },
        },
        attributes: {
          style: function (a, c) {
            return h.normalizedStyles(c, b) || !1;
          },
          class: function (a) {
            a = a.replace(
              /(el\d+)|(font\d+)|msonormal|msolistparagraph\w*/gi,
              "",
            );
            return "" === a ? !1 : a;
          },
          cellspacing: v,
          cellpadding: v,
          border: v,
          "v:shapes": v,
          "o:spid": v,
        },
        comment: function (a) {
          a.match(/\[if.* supportFields.*\]/) && z++;
          "[endif]" == a && (z = 0 < z ? z - 1 : 0);
          return !1;
        },
        text: function (a, b) {
          if (z) return "";
          var c = b.parent && b.parent.parent;
          return c &&
            c.attributes &&
            c.attributes.style &&
            c.attributes.style.match(/mso-list:\s*ignore/i)
            ? a.replace(/&nbsp;/g, " ")
            : a;
        },
      };
    l.array.forEach(G, function (a) {
      x.elements[a] = e;
    });
    return x;
  };
  u.lists = {
    thisIsAListItem: function (c, b) {
      return t.isEdgeListItem(c, b) ||
        (b.attributes.style &&
          b.attributes.style.match(/mso\-list:\s?l\d/) &&
          "li" !== b.parent.name) ||
        b.attributes["cke-dissolved"] ||
        b.getHtml().match(/<!\-\-\[if !supportLists]\-\->/)
        ? !0
        : !1;
    },
    convertToFakeListItem: function (c, b) {
      t.isDegenerateListItem(c, b) && t.assignListLevels(c, b);
      this.getListItemInfo(b);
      if (!b.attributes["cke-dissolved"]) {
        var d;
        b.forEach(function (b) {
          !d &&
            "img" == b.name &&
            b.attributes["cke-ignored"] &&
            "*" == b.attributes.alt &&
            ((d = "·"), b.remove());
        }, CKEDITOR.NODE_ELEMENT);
        b.forEach(function (b) {
          d || b.value.match(/^ /) || (d = b.value);
        }, CKEDITOR.NODE_TEXT);
        if ("undefined" == typeof d) return;
        b.attributes["cke-symbol"] = d.replace(/(?: |&nbsp;).*$/, "");
        f.removeSymbolText(b);
      }
      var e = b.attributes && l.parseCssText(b.attributes.style);
      if (e["margin-left"]) {
        var g = e["margin-left"],
          k = b.attributes["cke-list-level"];
        (g = Math.max(CKEDITOR.tools.convertToPx(g) - 40 * k, 0))
          ? (e["margin-left"] = g + "px")
          : delete e["margin-left"];
        b.attributes.style = CKEDITOR.tools.writeCssText(e);
      }
      b.name = "cke:li";
    },
    convertToRealListItems: function (c) {
      var b = [];
      c.forEach(
        function (c) {
          "cke:li" == c.name && ((c.name = "li"), b.push(c));
        },
        CKEDITOR.NODE_ELEMENT,
        !1,
      );
      return b;
    },
    removeSymbolText: function (c) {
      var b = c.attributes["cke-symbol"],
        d = c.findOne(function (c) {
          return c.value && -1 < c.value.indexOf(b);
        }, !0),
        e;
      d &&
        ((d.value = d.value.replace(b, "")),
        (e = d.parent),
        e.getHtml().match(/^(\s|&nbsp;)*$/) && e !== c
          ? e.remove()
          : d.value || d.remove());
    },
    setListSymbol: function (c, b, d) {
      d = d || 1;
      var e = l.parseCssText(c.attributes.style);
      if ("ol" == c.name) {
        if (c.attributes.type || e["list-style-type"]) return;
        var g = {
            "[ivx]": "lower-roman",
            "[IVX]": "upper-roman",
            "[a-z]": "lower-alpha",
            "[A-Z]": "upper-alpha",
            "\\d": "decimal",
          },
          k;
        for (k in g)
          if (f.getSubsectionSymbol(b).match(new RegExp(k))) {
            e["list-style-type"] = g[k];
            break;
          }
        c.attributes["cke-list-style-type"] = e["list-style-type"];
      } else
        (g = { "·": "disc", o: "circle", "§": "square" }),
          !e["list-style-type"] && g[b] && (e["list-style-type"] = g[b]);
      f.setListSymbol.removeRedundancies(e, d);
      (c.attributes.style = CKEDITOR.tools.writeCssText(e)) ||
        delete c.attributes.style;
    },
    setListStart: function (c) {
      for (var b = [], d = 0, e = 0; e < c.children.length; e++)
        b.push(c.children[e].attributes["cke-symbol"] || "");
      b[0] || d++;
      switch (c.attributes["cke-list-style-type"]) {
        case "lower-roman":
        case "upper-roman":
          c.attributes.start = f.toArabic(f.getSubsectionSymbol(b[d])) - d;
          break;
        case "lower-alpha":
        case "upper-alpha":
          c.attributes.start =
            f
              .getSubsectionSymbol(b[d])
              .replace(/\W/g, "")
              .toLowerCase()
              .charCodeAt(0) -
            96 -
            d;
          break;
        case "decimal":
          c.attributes.start =
            parseInt(f.getSubsectionSymbol(b[d]), 10) - d || 1;
      }
      "1" == c.attributes.start && delete c.attributes.start;
      delete c.attributes["cke-list-style-type"];
    },
    numbering: {
      toNumber: function (c, b) {
        function d(b) {
          b = b.toUpperCase();
          for (var c = 1, d = 1; 0 < b.length; d *= 26)
            (c +=
              "ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(b.charAt(b.length - 1)) * d),
              (b = b.substr(0, b.length - 1));
          return c;
        }
        function e(b) {
          var c = [
            [1e3, "M"],
            [900, "CM"],
            [500, "D"],
            [400, "CD"],
            [100, "C"],
            [90, "XC"],
            [50, "L"],
            [40, "XL"],
            [10, "X"],
            [9, "IX"],
            [5, "V"],
            [4, "IV"],
            [1, "I"],
          ];
          b = b.toUpperCase();
          for (var d = c.length, a = 0, e = 0; e < d; ++e)
            for (
              var f = c[e], q = f[1].length;
              b.substr(0, q) == f[1];
              b = b.substr(q)
            )
              a += f[0];
          return a;
        }
        return "decimal" == b
          ? Number(c)
          : "upper-roman" == b || "lower-roman" == b
            ? e(c.toUpperCase())
            : "lower-alpha" == b || "upper-alpha" == b
              ? d(c)
              : 1;
      },
      getStyle: function (c) {
        c = c.slice(0, 1);
        var b = {
          i: "lower-roman",
          v: "lower-roman",
          x: "lower-roman",
          l: "lower-roman",
          m: "lower-roman",
          I: "upper-roman",
          V: "upper-roman",
          X: "upper-roman",
          L: "upper-roman",
          M: "upper-roman",
        }[c];
        b ||
          ((b = "decimal"),
          c.match(/[a-z]/) && (b = "lower-alpha"),
          c.match(/[A-Z]/) && (b = "upper-alpha"));
        return b;
      },
    },
    getSubsectionSymbol: function (c) {
      return (c.match(/([\da-zA-Z]+).?$/) || ["placeholder", "1"])[1];
    },
    setListDir: function (c) {
      var b = 0,
        d = 0;
      c.forEach(function (c) {
        "li" == c.name &&
          ("rtl" == (c.attributes.dir || c.attributes.DIR || "").toLowerCase()
            ? d++
            : b++);
      }, CKEDITOR.ELEMENT_NODE);
      d > b && (c.attributes.dir = "rtl");
    },
    createList: function (c) {
      return (c.attributes["cke-symbol"].match(/([\da-np-zA-NP-Z]).?/) || [])[1]
        ? new CKEDITOR.htmlParser.element("ol")
        : new CKEDITOR.htmlParser.element("ul");
    },
    createLists: function (c, b) {
      function d(b) {
        return CKEDITOR.tools.array.reduce(
          b,
          function (b, a) {
            if (a.attributes && a.attributes.style)
              var c = CKEDITOR.tools.parseCssText(a.attributes.style)[
                "margin-left"
              ];
            return c ? b + parseInt(c, 10) : b;
          },
          0,
        );
      }
      function e(a, c) {
        var d = CKEDITOR.tools.parseCssText(a.attributes.style),
          e = CKEDITOR.plugins.pastetools.getConfigValue(b, "keepZeroMargins"),
          g = "margin-" + c;
        if (!(g in d)) return "";
        d = CKEDITOR.tools.convertToPx(d[g]);
        return 0 === d && e
          ? g + ": " + d + "; "
          : 0 < d
            ? g + ": " + d + "px; "
            : "";
      }
      var g,
        k,
        h,
        a,
        n = f.convertToRealListItems(c);
      if (0 === n.length) return [];
      var r = f.groupLists(n);
      for (h = 0; h < r.length; h++) {
        var q = r[h],
          p = q[0];
        for (a = 0; a < q.length; a++)
          if (1 == q[a].attributes["cke-list-level"]) {
            p = q[a];
            break;
          }
        var p = [f.createList(p)],
          m = p[0],
          C = [p[0]];
        a = e(q[0], "top");
        g = e(q[q.length - 1], "bottom");
        m.insertBefore(q[0]);
        m.attributes.style = a + g;
        for (a = 0; a < q.length; a++) {
          g = q[a];
          for (k = g.attributes["cke-list-level"]; k > p.length; ) {
            var l = f.createList(g),
              y = m.children;
            0 < y.length
              ? y[y.length - 1].add(l)
              : ((y = new CKEDITOR.htmlParser.element("li", {
                  style: "list-style-type:none",
                })),
                y.add(l),
                m.add(y));
            p.push(l);
            C.push(l);
            m = l;
            k == p.length && f.setListSymbol(l, g.attributes["cke-symbol"], k);
          }
          for (; k < p.length; )
            p.pop(),
              (m = p[p.length - 1]),
              k == p.length &&
                f.setListSymbol(m, g.attributes["cke-symbol"], k);
          g.remove();
          m.add(g);
        }
        p[0].children.length &&
          ((m = p[0].children[0].attributes["cke-symbol"]),
          !m &&
            1 < p[0].children.length &&
            (m = p[0].children[1].attributes["cke-symbol"]),
          m && f.setListSymbol(p[0], m));
        for (a = 0; a < C.length; a++) f.setListStart(C[a]);
        for (a = 0; a < q.length; a++) this.determineListItemValue(q[a]);
      }
      CKEDITOR.tools.array.forEach(n, function (b) {
        for (var a = [], c = b.parent; c; )
          "li" === c.name && a.push(c), (c = c.parent);
        var a = d(a),
          e;
        a &&
          ((b.attributes = b.attributes || {}),
          (c = CKEDITOR.tools.parseCssText(b.attributes.style)),
          (e = c["margin-left"] || 0),
          (e = Math.max(parseInt(e, 10) - a, 0))
            ? (c["margin-left"] = e + "px")
            : delete c["margin-left"],
          (b.attributes.style = CKEDITOR.tools.writeCssText(c)));
      });
      return n;
    },
    cleanup: function (c) {
      var b = [
          "cke-list-level",
          "cke-symbol",
          "cke-list-id",
          "cke-indentation",
          "cke-dissolved",
        ],
        d,
        e;
      for (d = 0; d < c.length; d++)
        for (e = 0; e < b.length; e++) delete c[d].attributes[b[e]];
    },
    determineListItemValue: function (c) {
      if ("ol" === c.parent.name) {
        var b = this.calculateValue(c),
          d = c.attributes["cke-symbol"].match(/[a-z0-9]+/gi),
          e;
        d &&
          ((d = d[d.length - 1]),
          (e =
            c.parent.attributes["cke-list-style-type"] ||
            this.numbering.getStyle(d)),
          (d = this.numbering.toNumber(d, e)),
          d !== b && (c.attributes.value = d));
      }
    },
    calculateValue: function (c) {
      if (!c.parent) return 1;
      var b = c.parent;
      c = c.getIndex();
      var d = null,
        e,
        g,
        f;
      for (f = c; 0 <= f && null === d; f--)
        (g = b.children[f]),
          g.attributes &&
            void 0 !== g.attributes.value &&
            ((e = f), (d = parseInt(g.attributes.value, 10)));
      null === d &&
        ((d =
          void 0 !== b.attributes.start ? parseInt(b.attributes.start, 10) : 1),
        (e = 0));
      return d + (c - e);
    },
    dissolveList: function (c) {
      function b(a) {
        return 50 <= a
          ? "l" + b(a - 50)
          : 40 <= a
            ? "xl" + b(a - 40)
            : 10 <= a
              ? "x" + b(a - 10)
              : 9 == a
                ? "ix"
                : 5 <= a
                  ? "v" + b(a - 5)
                  : 4 == a
                    ? "iv"
                    : 1 <= a
                      ? "i" + b(a - 1)
                      : "";
      }
      function d(a, b) {
        function c(b, d) {
          return b && b.parent
            ? a(b.parent)
              ? c(b.parent, d + 1)
              : c(b.parent, d)
            : d;
        }
        return c(b, 0);
      }
      var e = function (a) {
          return function (b) {
            return b.name == a;
          };
        },
        g = function (a) {
          return e("ul")(a) || e("ol")(a);
        },
        f = CKEDITOR.tools.array,
        x = [],
        a,
        n;
      c.forEach(
        function (a) {
          x.push(a);
        },
        CKEDITOR.NODE_ELEMENT,
        !1,
      );
      a = f.filter(x, e("li"));
      var r = f.filter(x, g);
      f.forEach(r, function (a) {
        var c = a.attributes.type,
          m = parseInt(a.attributes.start, 10) || 1,
          h = d(g, a) + 1;
        c || (c = l.parseCssText(a.attributes.style)["list-style-type"]);
        f.forEach(f.filter(a.children, e("li")), function (d, e) {
          var f;
          switch (c) {
            case "disc":
              f = "·";
              break;
            case "circle":
              f = "o";
              break;
            case "square":
              f = "§";
              break;
            case "1":
            case "decimal":
              f = m + e + ".";
              break;
            case "a":
            case "lower-alpha":
              f = String.fromCharCode(97 + m - 1 + e) + ".";
              break;
            case "A":
            case "upper-alpha":
              f = String.fromCharCode(65 + m - 1 + e) + ".";
              break;
            case "i":
            case "lower-roman":
              f = b(m + e) + ".";
              break;
            case "I":
            case "upper-roman":
              f = b(m + e).toUpperCase() + ".";
              break;
            default:
              f = "ul" == a.name ? "·" : m + e + ".";
          }
          d.attributes["cke-symbol"] = f;
          d.attributes["cke-list-level"] = h;
        });
      });
      a = f.reduce(
        a,
        function (a, b) {
          var c = b.children[0];
          if (
            c &&
            c.name &&
            c.attributes.style &&
            c.attributes.style.match(/mso-list:/i)
          ) {
            h.pushStylesLower(b, { "list-style-type": !0, display: !0 });
            var d = l.parseCssText(c.attributes.style, !0);
            h.setStyle(b, "mso-list", d["mso-list"], !0);
            h.setStyle(c, "mso-list", "");
            delete b["cke-list-level"];
            (c = d.display ? "display" : d.DISPLAY ? "DISPLAY" : "") &&
              h.setStyle(b, "display", d[c], !0);
          }
          if (1 === b.children.length && g(b.children[0])) return a;
          b.name = "p";
          b.attributes["cke-dissolved"] = !0;
          a.push(b);
          return a;
        },
        [],
      );
      for (n = a.length - 1; 0 <= n; n--) a[n].insertAfter(c);
      for (n = r.length - 1; 0 <= n; n--) delete r[n].name;
    },
    groupLists: function (c) {
      var b,
        d,
        e = [[c[0]]],
        g = e[0];
      d = c[0];
      d.attributes["cke-indentation"] = d.attributes["cke-indentation"] || A(d);
      for (b = 1; b < c.length; b++) {
        d = c[b];
        var k = c[b - 1];
        d.attributes["cke-indentation"] =
          d.attributes["cke-indentation"] || A(d);
        d.previous !== k && (f.chopDiscontinuousLists(g, e), e.push((g = [])));
        g.push(d);
      }
      f.chopDiscontinuousLists(g, e);
      return e;
    },
    chopDiscontinuousLists: function (c, b) {
      for (var d = {}, e = [[]], g, k = 0; k < c.length; k++) {
        var h = d[c[k].attributes["cke-list-level"]],
          a = this.getListItemInfo(c[k]),
          n,
          r;
        h
          ? ((r = h.type.match(/alpha/) && 7 == h.index ? "alpha" : r),
            (r =
              "o" == c[k].attributes["cke-symbol"] && 14 == h.index
                ? "alpha"
                : r),
            (n = f.getSymbolInfo(c[k].attributes["cke-symbol"], r)),
            (a = this.getListItemInfo(c[k])),
            (h.type != n.type ||
              (g && a.id != g.id && !this.isAListContinuation(c[k]))) &&
              e.push([]))
          : (n = f.getSymbolInfo(c[k].attributes["cke-symbol"]));
        for (
          g = parseInt(c[k].attributes["cke-list-level"], 10) + 1;
          20 > g;
          g++
        )
          d[g] && delete d[g];
        d[c[k].attributes["cke-list-level"]] = n;
        e[e.length - 1].push(c[k]);
        g = a;
      }
      [].splice.apply(b, [].concat([l.indexOf(b, c), 1], e));
    },
    isAListContinuation: function (c) {
      var b = c;
      do
        if ((b = b.previous) && b.type === CKEDITOR.NODE_ELEMENT) {
          if (void 0 === b.attributes["cke-list-level"]) break;
          if (b.attributes["cke-list-level"] === c.attributes["cke-list-level"])
            return b.attributes["cke-list-id"] === c.attributes["cke-list-id"];
        }
      while (b);
      return !1;
    },
    toArabic: function (c) {
      return c.match(/[ivxl]/i)
        ? c.match(/^l/i)
          ? 50 + f.toArabic(c.slice(1))
          : c.match(/^lx/i)
            ? 40 + f.toArabic(c.slice(1))
            : c.match(/^x/i)
              ? 10 + f.toArabic(c.slice(1))
              : c.match(/^ix/i)
                ? 9 + f.toArabic(c.slice(2))
                : c.match(/^v/i)
                  ? 5 + f.toArabic(c.slice(1))
                  : c.match(/^iv/i)
                    ? 4 + f.toArabic(c.slice(2))
                    : c.match(/^i/i)
                      ? 1 + f.toArabic(c.slice(1))
                      : f.toArabic(c.slice(1))
        : 0;
    },
    getSymbolInfo: function (c, b) {
      var d = c.toUpperCase() == c ? "upper-" : "lower-",
        e = { "·": ["disc", -1], o: ["circle", -2], "§": ["square", -3] };
      if (c in e || (b && b.match(/(disc|circle|square)/)))
        return { index: e[c][1], type: e[c][0] };
      if (c.match(/\d/))
        return {
          index: c ? parseInt(f.getSubsectionSymbol(c), 10) : 0,
          type: "decimal",
        };
      c = c.replace(/\W/g, "").toLowerCase();
      return (!b && c.match(/[ivxl]+/i)) || (b && "alpha" != b) || "roman" == b
        ? { index: f.toArabic(c), type: d + "roman" }
        : c.match(/[a-z]/i)
          ? { index: c.charCodeAt(0) - 97, type: d + "alpha" }
          : { index: -1, type: "disc" };
    },
    getListItemInfo: function (c) {
      if (void 0 !== c.attributes["cke-list-id"])
        return {
          id: c.attributes["cke-list-id"],
          level: c.attributes["cke-list-level"],
        };
      var b = l.parseCssText(c.attributes.style)["mso-list"],
        d = { id: "0", level: "1" };
      b &&
        ((b += " "),
        (d.level = b.match(/level(.+?)\s+/)[1]),
        (d.id = b.match(/l(\d+?)\s+/)[1]));
      c.attributes["cke-list-level"] =
        void 0 !== c.attributes["cke-list-level"]
          ? c.attributes["cke-list-level"]
          : d.level;
      c.attributes["cke-list-id"] = d.id;
      return d;
    },
  };
  f = u.lists;
  u.heuristics = {
    isEdgeListItem: function (c, b) {
      if (!CKEDITOR.env.edge || !c.config.pasteFromWord_heuristicsEdgeList)
        return !1;
      var d = "";
      b.forEach &&
        b.forEach(function (b) {
          d += b.value;
        }, CKEDITOR.NODE_TEXT);
      return d.match(/^(?: |&nbsp;)*\(?[a-zA-Z0-9]+?[\.\)](?: |&nbsp;){2,}/)
        ? !0
        : t.isDegenerateListItem(c, b);
    },
    cleanupEdgeListItem: function (c) {
      var b = !1;
      c.forEach(function (c) {
        b ||
          ((c.value = c.value.replace(/^(?:&nbsp;|[\s])+/, "")),
          c.value.length && (b = !0));
      }, CKEDITOR.NODE_TEXT);
    },
    isDegenerateListItem: function (c, b) {
      return (
        !!b.attributes["cke-list-level"] ||
        (b.attributes.style &&
          !b.attributes.style.match(/mso\-list/) &&
          !!b.find(function (c) {
            if (
              c.type == CKEDITOR.NODE_ELEMENT &&
              b.name.match(/h\d/i) &&
              c.getHtml().match(/^[a-zA-Z0-9]+?[\.\)]$/)
            )
              return !0;
            var e = l.parseCssText(c.attributes && c.attributes.style, !0);
            if (!e) return !1;
            var f = e["font-family"] || "";
            return (
              ((e.font || e["font-size"] || "").match(/7pt/i) &&
                !!c.previous) ||
              f.match(/symbol/i)
            );
          }, !0).length)
      );
    },
    assignListLevels: function (c, b) {
      if (!b.attributes || void 0 === b.attributes["cke-list-level"]) {
        for (
          var d = [A(b)], e = [b], f = [], k = CKEDITOR.tools.array, h = k.map;
          b.next &&
          b.next.attributes &&
          !b.next.attributes["cke-list-level"] &&
          t.isDegenerateListItem(c, b.next);

        )
          (b = b.next), d.push(A(b)), e.push(b);
        var a = h(d, function (a, b) {
            return 0 === b ? 0 : a - d[b - 1];
          }),
          l = this.guessIndentationStep(
            k.filter(d, function (a) {
              return 0 !== a;
            }),
          ),
          f = h(d, function (a) {
            return Math.round(a / l);
          });
        -1 !== k.indexOf(f, 0) &&
          (f = h(f, function (a) {
            return a + 1;
          }));
        k.forEach(e, function (a, b) {
          a.attributes["cke-list-level"] = f[b];
        });
        return { indents: d, levels: f, diffs: a };
      }
    },
    guessIndentationStep: function (c) {
      return c.length ? Math.min.apply(null, c) : null;
    },
    correctLevelShift: function (c) {
      if (this.isShifted(c)) {
        var b = CKEDITOR.tools.array.filter(c.children, function (b) {
            return "ul" == b.name || "ol" == b.name;
          }),
          d = CKEDITOR.tools.array.reduce(
            b,
            function (b, c) {
              return (
                c.children &&
                1 == c.children.length &&
                t.isShifted(c.children[0])
                  ? [c]
                  : c.children
              ).concat(b);
            },
            [],
          );
        CKEDITOR.tools.array.forEach(b, function (b) {
          b.remove();
        });
        CKEDITOR.tools.array.forEach(d, function (b) {
          c.add(b);
        });
        delete c.name;
      }
    },
    isShifted: function (c) {
      return "li" !== c.name
        ? !1
        : 0 ===
            CKEDITOR.tools.array.filter(c.children, function (b) {
              return b.name &&
                ("ul" == b.name ||
                  "ol" == b.name ||
                  ("p" == b.name && 0 === b.children.length))
                ? !1
                : !0;
            }).length;
    },
  };
  t = u.heuristics;
  f.setListSymbol.removeRedundancies = function (c, b) {
    ((1 === b && "disc" === c["list-style-type"]) ||
      "decimal" === c["list-style-type"]) &&
      delete c["list-style-type"];
  };
  CKEDITOR.cleanWord = CKEDITOR.pasteFilters.word = D.createFilter({
    rules: [w.rules, u.rules],
    additionalTransforms: function (c) {
      CKEDITOR.plugins.clipboard.isCustomDataTypesSupported &&
        (c = w.styles.inliner.inline(c).getBody().getHtml());
      return c.replace(/<!\[/g, "\x3c!--[").replace(/\]>/g, "]--\x3e");
    },
  });
  CKEDITOR.config.pasteFromWord_heuristicsEdgeList = !0;
})();
