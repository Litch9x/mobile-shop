﻿/*
 Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
(function () {
  function F(d) {
    return (
      d.type == CKEDITOR.NODE_TEXT &&
      0 < d.getLength() &&
      (!m || !d.isReadOnly())
    );
  }
  function v(d) {
    return !(
      d.type == CKEDITOR.NODE_ELEMENT &&
      d.isBlockBoundary(
        CKEDITOR.tools.extend(
          {},
          CKEDITOR.dtd.$empty,
          CKEDITOR.dtd.$nonEditable,
        ),
      )
    );
  }
  var m,
    w = function () {
      return {
        textNode: this.textNode,
        offset: this.offset,
        character: this.textNode
          ? this.textNode.getText().charAt(this.offset)
          : null,
        hitMatchBoundary: this._.matchBoundary,
      };
    },
    x = ["find", "replace"],
    q = [
      ["txtFindFind", "txtFindReplace"],
      ["txtFindCaseChk", "txtReplaceCaseChk"],
      ["txtFindWordChk", "txtReplaceWordChk"],
      ["txtFindCyclic", "txtReplaceCyclic"],
    ];
  CKEDITOR.dialog.add("find", function (d) {
    function n(a, b) {
      var c = this,
        d = new CKEDITOR.dom.walker(a);
      d.guard = b
        ? v
        : function (a) {
            !v(a) && (c._.matchBoundary = !0);
          };
      d.evaluator = F;
      d.breakOnFalse = 1;
      a.startContainer.type == CKEDITOR.NODE_TEXT &&
        ((this.textNode = a.startContainer), (this.offset = a.startOffset - 1));
      this._ = { matchWord: b, walker: d, matchBoundary: !1 };
    }
    function y(a, b) {
      var c = d.createRange();
      c.setStart(a.textNode, b ? a.offset : a.offset + 1);
      c.setEndAt(d.editable(), CKEDITOR.POSITION_BEFORE_END);
      return c;
    }
    function z(a) {
      if (!a) return !0;
      var b = a.charCodeAt(0);
      return (9 <= b && 13 >= b) || (8192 <= b && 8202 >= b) || H.test(a);
    }
    function r(a) {
      var b = d.getSelection().getRanges()[0],
        c = d.editable();
      b && !a
        ? ((a = b.clone()), a.collapse(!0))
        : ((a = d.createRange()),
          a.setStartAt(c, CKEDITOR.POSITION_AFTER_START));
      a.setEndAt(c, CKEDITOR.POSITION_BEFORE_END);
      return a;
    }
    function A(a) {
      f.find(
        a.getValueOf("find", "txtFindFind"),
        a.getValueOf("find", "txtFindCaseChk"),
        a.getValueOf("find", "txtFindWordChk"),
        a.getValueOf("find", "txtFindCyclic"),
      ) || alert(e.notFoundMsg);
    }
    function B(a) {
      f.replace(
        a,
        a.getValueOf("replace", "txtFindReplace"),
        a.getValueOf("replace", "txtReplace"),
        a.getValueOf("replace", "txtReplaceCaseChk"),
        a.getValueOf("replace", "txtReplaceWordChk"),
        a.getValueOf("replace", "txtReplaceCyclic"),
      ) || alert(e.notFoundMsg);
    }
    function I(a, b) {
      var c = b.replace(J, function (a) {
        a = a.split("");
        return CKEDITOR.tools.array
          .map(a, function (a, b) {
            return 0 === b % 2 ? " " : a;
          })
          .join("");
      });
      return a.document.createText(c);
    }
    var C = new CKEDITOR.style(
      CKEDITOR.tools.extend(
        {
          attributes: { "data-cke-highlight": 1 },
          fullMatch: 1,
          ignoreReadonly: 1,
          childRule: function () {
            return 0;
          },
        },
        d.config.find_highlight,
        !0,
      ),
    );
    n.prototype = {
      next: function () {
        return this.move();
      },
      back: function () {
        return this.move(!0);
      },
      move: function (a) {
        var b = this.textNode;
        if (null === b) return w.call(this);
        this._.matchBoundary = !1;
        if (b && a && 0 < this.offset) this.offset--;
        else if (b && this.offset < b.getLength() - 1) this.offset++;
        else {
          for (
            b = null;
            !b &&
            !((b = this._.walker[a ? "previous" : "next"].call(this._.walker)),
            (this._.matchWord && !b) || this._.walker._.end);

          );
          this.offset = (this.textNode = b) ? (a ? b.getLength() - 1 : 0) : 0;
        }
        return w.call(this);
      },
    };
    var u = function (a, b) {
      this._ = {
        walker: a,
        cursors: [],
        rangeLength: b,
        highlightRange: null,
        isMatched: 0,
      };
    };
    u.prototype = {
      toDomRange: function () {
        var a = d.createRange(),
          b = this._.cursors;
        if (1 > b.length) {
          var c = this._.walker.textNode;
          if (c) a.setStartAfter(c);
          else return null;
        } else
          (c = b[0]),
            (b = b[b.length - 1]),
            a.setStart(c.textNode, c.offset),
            a.setEnd(b.textNode, b.offset + 1);
        return a;
      },
      updateFromDomRange: function (a) {
        var b = new n(a);
        this._.cursors = [];
        do (a = b.next()), a.character && this._.cursors.push(a);
        while (a.character);
        this._.rangeLength = this._.cursors.length;
      },
      setMatched: function () {
        this._.isMatched = !0;
      },
      clearMatched: function () {
        this._.isMatched = !1;
      },
      isMatched: function () {
        return this._.isMatched;
      },
      highlight: function () {
        if (!(1 > this._.cursors.length)) {
          this._.highlightRange && this.removeHighlight();
          var a = this.toDomRange(),
            b = a.createBookmark();
          C.applyToRange(a, d);
          a.moveToBookmark(b);
          this._.highlightRange = a;
          b = a.startContainer;
          b.type != CKEDITOR.NODE_ELEMENT && (b = b.getParent());
          b.scrollIntoView();
          this.updateFromDomRange(a);
        }
      },
      removeHighlight: function () {
        if (this._.highlightRange) {
          var a = this._.highlightRange.createBookmark();
          C.removeFromRange(this._.highlightRange, d);
          this._.highlightRange.moveToBookmark(a);
          this.updateFromDomRange(this._.highlightRange);
          this._.highlightRange = null;
        }
      },
      isReadOnly: function () {
        return this._.highlightRange
          ? this._.highlightRange.startContainer.isReadOnly()
          : 0;
      },
      moveBack: function () {
        var a = this._.walker.back(),
          b = this._.cursors;
        a.hitMatchBoundary && (this._.cursors = b = []);
        b.unshift(a);
        b.length > this._.rangeLength && b.pop();
        return a;
      },
      moveNext: function () {
        var a = this._.walker.next(),
          b = this._.cursors;
        a.hitMatchBoundary && (this._.cursors = b = []);
        b.push(a);
        b.length > this._.rangeLength && b.shift();
        return a;
      },
      getEndCharacter: function () {
        var a = this._.cursors;
        return 1 > a.length ? null : a[a.length - 1].character;
      },
      getNextCharacterRange: function (a) {
        var b, c;
        c = this._.cursors;
        c = (b = c[c.length - 1]) && b.textNode ? new n(y(b)) : this._.walker;
        return new u(c, a);
      },
      getCursors: function () {
        return this._.cursors;
      },
    };
    var D = function (a, b) {
      var c = [-1];
      b && (a = a.toLowerCase());
      for (var d = 0; d < a.length; d++)
        for (
          c.push(c[d] + 1);
          0 < c[d + 1] && a.charAt(d) != a.charAt(c[d + 1] - 1);

        )
          c[d + 1] = c[c[d + 1] - 1] + 1;
      this._ = { overlap: c, state: 0, ignoreCase: !!b, pattern: a };
    };
    D.prototype = {
      feedCharacter: function (a) {
        for (this._.ignoreCase && (a = a.toLowerCase()); ; ) {
          var b;
          var c = this._.pattern.charAt(this._.state);
          a == c ? (b = !0) : ((b = E.test(a)), (c = E.test(c)), (b = b && c));
          if (b)
            return (
              this._.state++,
              this._.state == this._.pattern.length
                ? ((this._.state = 0), 2)
                : 1
            );
          if (this._.state) this._.state = this._.overlap[this._.state];
          else return 0;
        }
      },
      reset: function () {
        this._.state = 0;
      },
    };
    var H = /[.,"'?!;: \u0085\u00a0\u1680\u280e\u2028\u2029\u202f\u205f\u3000]/,
      E = /[\u0020\u00a0\u1680\u202f\u205f\u3000\u2000-\u200a]/,
      J = /[\u0020\u00a0\u1680\u202f\u205f\u3000\u2000-\u200a]{2,}/g,
      f = {
        searchRange: null,
        matchRange: null,
        find: function (a, b, c, e, G, t) {
          this.matchRange
            ? (this.matchRange.removeHighlight(),
              (this.matchRange = this.matchRange.getNextCharacterRange(
                a.length,
              )))
            : (this.matchRange = new u(new n(this.searchRange), a.length));
          for (var h = new D(a, !b), k = 0, l = "%"; null !== l; ) {
            for (
              this.matchRange.moveNext();
              (l = this.matchRange.getEndCharacter());

            ) {
              k = h.feedCharacter(l);
              if (2 == k) break;
              this.matchRange.moveNext().hitMatchBoundary && h.reset();
            }
            if (2 == k) {
              if (c) {
                var g = this.matchRange.getCursors(),
                  p = g[g.length - 1],
                  g = g[0],
                  m = d.createRange();
                m.setStartAt(d.editable(), CKEDITOR.POSITION_AFTER_START);
                m.setEnd(g.textNode, g.offset);
                g = m;
                p = y(p);
                g.trim();
                p.trim();
                g = new n(g, !0);
                p = new n(p, !0);
                if (!z(g.back().character) || !z(p.next().character)) continue;
              }
              this.matchRange.setMatched();
              !1 !== G && this.matchRange.highlight();
              return !0;
            }
          }
          this.matchRange.clearMatched();
          this.matchRange.removeHighlight();
          return e && !t
            ? ((this.searchRange = r(1)),
              (this.matchRange = null),
              f.find.apply(
                this,
                Array.prototype.slice.call(arguments).concat([!0]),
              ))
            : !1;
        },
        replaceCounter: 0,
        replace: function (a, b, c, e, f, t, h) {
          m = 1;
          a = 0;
          a = this.hasMatchOptionsChanged(b, e, f);
          if (
            !this.matchRange ||
            !this.matchRange.isMatched() ||
            this.matchRange._.isReplaced ||
            this.matchRange.isReadOnly() ||
            a
          )
            a &&
              this.matchRange &&
              (this.matchRange.clearMatched(),
              this.matchRange.removeHighlight(),
              (this.matchRange = null)),
              (a = this.find(b, e, f, t, !h));
          else {
            this.matchRange.removeHighlight();
            b = this.matchRange.toDomRange();
            c = I(d, c);
            if (!h) {
              var k = d.getSelection();
              k.selectRanges([b]);
              d.fire("saveSnapshot");
            }
            b.deleteContents();
            b.insertNode(c);
            h || (k.selectRanges([b]), d.fire("saveSnapshot"));
            this.matchRange.updateFromDomRange(b);
            h || this.matchRange.highlight();
            this.matchRange._.isReplaced = !0;
            this.replaceCounter++;
            a = 1;
          }
          m = 0;
          return a;
        },
        matchOptions: null,
        hasMatchOptionsChanged: function (a, b, c) {
          a = [a, b, c].join(".");
          b = this.matchOptions && this.matchOptions != a;
          this.matchOptions = a;
          return b;
        },
      },
      e = d.lang.find;
    return {
      title: e.title,
      resizable: CKEDITOR.DIALOG_RESIZE_NONE,
      minWidth: 350,
      minHeight: 170,
      buttons: [
        CKEDITOR.dialog.cancelButton(d, { label: d.lang.common.close }),
      ],
      contents: [
        {
          id: "find",
          label: e.find,
          title: e.find,
          accessKey: "",
          elements: [
            {
              type: "hbox",
              widths: ["230px", "90px"],
              children: [
                {
                  type: "text",
                  id: "txtFindFind",
                  label: e.findWhat,
                  isChanged: !1,
                  labelLayout: "horizontal",
                  accessKey: "F",
                  onKeyDown: function (a) {
                    13 === a.data.getKeystroke() && A(this.getDialog());
                  },
                },
                {
                  type: "button",
                  id: "btnFind",
                  align: "left",
                  style: "width:100%",
                  label: e.find,
                  onClick: function () {
                    A(this.getDialog());
                  },
                },
              ],
            },
            {
              type: "fieldset",
              className: "cke_dialog_find_fieldset",
              label: CKEDITOR.tools.htmlEncode(e.findOptions),
              style: "margin-top:29px",
              children: [
                {
                  type: "vbox",
                  padding: 0,
                  children: [
                    {
                      type: "checkbox",
                      id: "txtFindCaseChk",
                      isChanged: !1,
                      label: e.matchCase,
                    },
                    {
                      type: "checkbox",
                      id: "txtFindWordChk",
                      isChanged: !1,
                      label: e.matchWord,
                    },
                    {
                      type: "checkbox",
                      id: "txtFindCyclic",
                      isChanged: !1,
                      default: !0,
                      label: e.matchCyclic,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "replace",
          label: e.replace,
          accessKey: "M",
          elements: [
            {
              type: "hbox",
              widths: ["230px", "90px"],
              children: [
                {
                  type: "text",
                  id: "txtFindReplace",
                  label: e.findWhat,
                  isChanged: !1,
                  labelLayout: "horizontal",
                  accessKey: "F",
                  onKeyDown: function (a) {
                    13 === a.data.getKeystroke() &&
                      ((a = this.getDialog()),
                      f.find(
                        a.getValueOf("replace", "txtFindReplace"),
                        a.getValueOf("replace", "txtReplaceCaseChk"),
                        a.getValueOf("replace", "txtReplaceWordChk"),
                        a.getValueOf("replace", "txtReplaceCyclic"),
                      ) || alert(e.notFoundMsg));
                  },
                },
                {
                  type: "button",
                  id: "btnFindReplace",
                  align: "left",
                  style: "width:100%",
                  label: e.replace,
                  onClick: function () {
                    B(this.getDialog());
                  },
                },
              ],
            },
            {
              type: "hbox",
              widths: ["230px", "90px"],
              children: [
                {
                  type: "text",
                  id: "txtReplace",
                  label: e.replaceWith,
                  isChanged: !1,
                  labelLayout: "horizontal",
                  accessKey: "R",
                  onKeyDown: function (a) {
                    13 === a.data.getKeystroke() && B(this.getDialog());
                  },
                },
                {
                  type: "button",
                  id: "btnReplaceAll",
                  align: "left",
                  style: "width:100%",
                  label: e.replaceAll,
                  isChanged: !1,
                  onClick: function () {
                    var a = this.getDialog();
                    f.replaceCounter = 0;
                    f.searchRange = r(1);
                    f.matchRange &&
                      (f.matchRange.removeHighlight(), (f.matchRange = null));
                    for (
                      d.fire("saveSnapshot");
                      f.replace(
                        a,
                        a.getValueOf("replace", "txtFindReplace"),
                        a.getValueOf("replace", "txtReplace"),
                        a.getValueOf("replace", "txtReplaceCaseChk"),
                        a.getValueOf("replace", "txtReplaceWordChk"),
                        !1,
                        !0,
                      );

                    );
                    f.replaceCounter
                      ? (alert(
                          e.replaceSuccessMsg.replace(/%1/, f.replaceCounter),
                        ),
                        d.fire("saveSnapshot"))
                      : alert(e.notFoundMsg);
                  },
                },
              ],
            },
            {
              type: "fieldset",
              label: CKEDITOR.tools.htmlEncode(e.findOptions),
              children: [
                {
                  type: "vbox",
                  padding: 0,
                  children: [
                    {
                      type: "checkbox",
                      id: "txtReplaceCaseChk",
                      isChanged: !1,
                      label: e.matchCase,
                    },
                    {
                      type: "checkbox",
                      id: "txtReplaceWordChk",
                      isChanged: !1,
                      label: e.matchWord,
                    },
                    {
                      type: "checkbox",
                      id: "txtReplaceCyclic",
                      isChanged: !1,
                      default: !0,
                      label: e.matchCyclic,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      onLoad: function () {
        var a = this,
          b,
          c = 0;
        this.on("hide", function () {
          c = 0;
        });
        this.on("show", function () {
          c = 1;
        });
        this.selectPage = CKEDITOR.tools.override(
          this.selectPage,
          function (d) {
            return function (e) {
              d.call(a, e);
              var f = a._.tabs[e],
                h;
              h = "find" === e ? "txtFindWordChk" : "txtReplaceWordChk";
              b = a.getContentElement(
                e,
                "find" === e ? "txtFindFind" : "txtFindReplace",
              );
              a.getContentElement(e, h);
              f.initialized ||
                (CKEDITOR.document.getById(b._.inputId), (f.initialized = !0));
              if (c) {
                var k;
                e = "find" === e ? 1 : 0;
                var f = 1 - e,
                  l,
                  g = q.length;
                for (l = 0; l < g; l++)
                  (h = this.getContentElement(x[e], q[l][e])),
                    (k = this.getContentElement(x[f], q[l][f])),
                    k.setValue(h.getValue());
              }
            };
          },
        );
      },
      onShow: function () {
        f.searchRange = r();
        var a = this._.currentTabId,
          b = this.getParentEditor().getSelection().getSelectedText(),
          c = this.getContentElement(
            a,
            "find" == a ? "txtFindFind" : "txtFindReplace",
          );
        c.setValue(b);
        c.select();
        this[
          ("find" == a && this._.editor.readOnly ? "hide" : "show") + "Page"
        ]("replace");
      },
      onHide: function () {
        var a;
        f.matchRange &&
          f.matchRange.isMatched() &&
          (f.matchRange.removeHighlight(),
          (a = f.matchRange.toDomRange()) && d.getSelection().selectRanges([a]),
          d.focus());
        delete f.matchRange;
      },
      onFocus: function () {
        return "replace" == this._.currentTabId
          ? this.getContentElement("replace", "txtFindReplace")
          : this.getContentElement("find", "txtFindFind");
      },
    };
  });
})();
