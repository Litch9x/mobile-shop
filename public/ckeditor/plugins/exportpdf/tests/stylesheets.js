﻿(function () {
  bender.loadExternalPlugin("exportpdf", "/apps/plugin/");
  CKEDITOR.plugins.load("exportpdf", function () {
    function a(a) {
      var e = exportPdfUtils.getDefaultConfig("unit", a.extraConfig || {});
      bender.editorBot.create(
        { name: "editor" + Date.now(), config: e, creator: a.creator },
        function (d) {
          var c = d.editor;
          d.setHtmlWithSelection(a.initialHtml);
          c.once(
            "exportPdf",
            function (b) {
              assert.areEqual(a.initialHtml, b.data.html);
            },
            null,
            null,
            10,
          );
          c.once(
            "exportPdf",
            function (b) {
              b.cancel();
              a.expectCss
                ? assert.isNotUndefined(b.data.css, "Some CSS should be sent.")
                : assert.isUndefined(b.data.css, "No CSS should be sent.");
              b = b.data.html.replace(/\?t=[a-z0-9]+/gi, "");
              assert.areEqual(a.expectedHtml, b, "HTML is incorrect.");
            },
            null,
            null,
            16,
          );
          c.execCommand("exportPdf");
        },
      );
    }
    bender.test({
      setUp: function () {
        bender.tools.ignoreUnsupportedEnvironment("exportpdf");
      },
      "test no custom stylesheets attached to divarea editor": function () {
        a({
          creator: "replace",
          initialHtml: '\x3cp id\x3d"test"\x3eHello, World!\x3c/p\x3e',
          expectedHtml:
            '\x3cdiv class\x3d"cke_editable cke_contents_ltr"\x3e\x3cp id\x3d"test"\x3eHello, World!\x3c/p\x3e\x3c/div\x3e',
          expectCss: !1,
        });
      },
      "test one absolute path custom stylesheet attached to divarea editor":
        function () {
          a({
            creator: "replace",
            initialHtml: '\x3cp id\x3d"test"\x3eHello, World!\x3c/p\x3e',
            expectedHtml:
              '\x3clink type\x3d"text/css" rel\x3dstylesheet href\x3d"https://ckeditor.com/"\x3e\x3cdiv class\x3d"cke_editable cke_contents_ltr"\x3e\x3cp id\x3d"test"\x3eHello, World!\x3c/p\x3e\x3c/div\x3e',
            expectCss: !1,
            extraConfig: { exportPdf_stylesheets: ["https://ckeditor.com"] },
          });
        },
      "test two absolute path custom stylesheets attached to divarea editor":
        function () {
          a({
            creator: "replace",
            initialHtml: '\x3cp id\x3d"test"\x3eHello, World!\x3c/p\x3e',
            expectedHtml:
              '\x3clink type\x3d"text/css" rel\x3dstylesheet href\x3d"https://ckeditor.css/"\x3e\x3clink type\x3d"text/css" rel\x3dstylesheet href\x3d"https://cksource.css/"\x3e\x3cdiv class\x3d"cke_editable cke_contents_ltr"\x3e\x3cp id\x3d"test"\x3eHello, World!\x3c/p\x3e\x3c/div\x3e',
            expectCss: !1,
            extraConfig: {
              exportPdf_stylesheets: [
                "https://ckeditor.css",
                "https://cksource.css",
              ],
            },
          });
        },
      "test one relative path custom stylesheet attached to divarea editor":
        function () {
          a({
            creator: "replace",
            initialHtml: '\x3cp id\x3d"test"\x3eHello, World!\x3c/p\x3e',
            expectedHtml:
              '\x3clink type\x3d"text/css" rel\x3dstylesheet href\x3d"' +
              exportPdfUtils.toAbsoluteUrl("/css/ckeditor.css") +
              '"\x3e\x3cdiv class\x3d"cke_editable cke_contents_ltr"\x3e\x3cp id\x3d"test"\x3eHello, World!\x3c/p\x3e\x3c/div\x3e',
            expectCss: !1,
            extraConfig: { exportPdf_stylesheets: ["/css/ckeditor.css"] },
          });
        },
      "test two relative path custom stylesheets attached to divarea editor":
        function () {
          a({
            creator: "replace",
            initialHtml: '\x3cp id\x3d"test"\x3eHello, World!\x3c/p\x3e',
            expectedHtml:
              '\x3clink type\x3d"text/css" rel\x3dstylesheet href\x3d"' +
              exportPdfUtils.toAbsoluteUrl("/css/ckeditor.css") +
              '"\x3e\x3clink type\x3d"text/css" rel\x3dstylesheet href\x3d"' +
              exportPdfUtils.toAbsoluteUrl("/css/cksource.css") +
              '"\x3e\x3cdiv class\x3d"cke_editable cke_contents_ltr"\x3e\x3cp id\x3d"test"\x3eHello, World!\x3c/p\x3e\x3c/div\x3e',
            expectCss: !1,
            extraConfig: {
              exportPdf_stylesheets: ["/css/ckeditor.css", "/css/cksource.css"],
            },
          });
        },
      "test one relative and one absolute path custom stylesheets attached to divarea editor":
        function () {
          a({
            creator: "replace",
            initialHtml: '\x3cp id\x3d"test"\x3eHello, World!\x3c/p\x3e',
            expectedHtml:
              '\x3clink type\x3d"text/css" rel\x3dstylesheet href\x3d"' +
              exportPdfUtils.toAbsoluteUrl("/css/ckeditor.css") +
              '"\x3e\x3clink type\x3d"text/css" rel\x3dstylesheet href\x3d"https://ckeditor.com/"\x3e\x3cdiv class\x3d"cke_editable cke_contents_ltr"\x3e\x3cp id\x3d"test"\x3eHello, World!\x3c/p\x3e\x3c/div\x3e',
            expectCss: !1,
            extraConfig: {
              exportPdf_stylesheets: [
                "/css/ckeditor.css",
                "https://ckeditor.com",
              ],
            },
          });
        },
      "test no custom stylesheets attached to inline editor": function () {
        a({
          creator: "inline",
          initialHtml: '\x3cp id\x3d"test"\x3eHello, World!\x3c/p\x3e',
          expectedHtml:
            '\x3cdiv class\x3d"cke_editable cke_contents_ltr"\x3e\x3cp id\x3d"test"\x3eHello, World!\x3c/p\x3e\x3c/div\x3e',
          expectCss: !1,
        });
      },
      "test one absolute path custom stylesheet attached to inline editor":
        function () {
          a({
            creator: "inline",
            initialHtml: '\x3cp id\x3d"test"\x3eHello, World!\x3c/p\x3e',
            expectedHtml:
              '\x3clink type\x3d"text/css" rel\x3dstylesheet href\x3d"https://ckeditor.com/"\x3e\x3cdiv class\x3d"cke_editable cke_contents_ltr"\x3e\x3cp id\x3d"test"\x3eHello, World!\x3c/p\x3e\x3c/div\x3e',
            expectCss: !1,
            extraConfig: { exportPdf_stylesheets: ["https://ckeditor.com"] },
          });
        },
      "test two absolute path custom stylesheets attached to inline editor":
        function () {
          a({
            creator: "inline",
            initialHtml: '\x3cp id\x3d"test"\x3eHello, World!\x3c/p\x3e',
            expectedHtml:
              '\x3clink type\x3d"text/css" rel\x3dstylesheet href\x3d"https://ckeditor.css/"\x3e\x3clink type\x3d"text/css" rel\x3dstylesheet href\x3d"https://cksource.css/"\x3e\x3cdiv class\x3d"cke_editable cke_contents_ltr"\x3e\x3cp id\x3d"test"\x3eHello, World!\x3c/p\x3e\x3c/div\x3e',
            expectCss: !1,
            extraConfig: {
              exportPdf_stylesheets: [
                "https://ckeditor.css",
                "https://cksource.css",
              ],
            },
          });
        },
      "test one relative path custom stylesheet attached to inline editor":
        function () {
          a({
            creator: "inline",
            initialHtml: '\x3cp id\x3d"test"\x3eHello, World!\x3c/p\x3e',
            expectedHtml:
              '\x3clink type\x3d"text/css" rel\x3dstylesheet href\x3d"' +
              exportPdfUtils.toAbsoluteUrl("/css/ckeditor.css") +
              '"\x3e\x3cdiv class\x3d"cke_editable cke_contents_ltr"\x3e\x3cp id\x3d"test"\x3eHello, World!\x3c/p\x3e\x3c/div\x3e',
            expectCss: !1,
            extraConfig: { exportPdf_stylesheets: ["/css/ckeditor.css"] },
          });
        },
      "test two relative path custom stylesheets attached to inline editor":
        function () {
          a({
            creator: "inline",
            initialHtml: '\x3cp id\x3d"test"\x3eHello, World!\x3c/p\x3e',
            expectedHtml:
              '\x3clink type\x3d"text/css" rel\x3dstylesheet href\x3d"' +
              exportPdfUtils.toAbsoluteUrl("/css/ckeditor.css") +
              '"\x3e\x3clink type\x3d"text/css" rel\x3dstylesheet href\x3d"' +
              exportPdfUtils.toAbsoluteUrl("/css/cksource.css") +
              '"\x3e\x3cdiv class\x3d"cke_editable cke_contents_ltr"\x3e\x3cp id\x3d"test"\x3eHello, World!\x3c/p\x3e\x3c/div\x3e',
            expectCss: !1,
            extraConfig: {
              exportPdf_stylesheets: ["/css/ckeditor.css", "/css/cksource.css"],
            },
          });
        },
      "test one relative and one absolute path custom stylesheets attached to inline editor":
        function () {
          a({
            creator: "inline",
            initialHtml: '\x3cp id\x3d"test"\x3eHello, World!\x3c/p\x3e',
            expectedHtml:
              '\x3clink type\x3d"text/css" rel\x3dstylesheet href\x3d"' +
              exportPdfUtils.toAbsoluteUrl("/css/ckeditor.css") +
              '"\x3e\x3clink type\x3d"text/css" rel\x3dstylesheet href\x3d"https://ckeditor.com/"\x3e\x3cdiv class\x3d"cke_editable cke_contents_ltr"\x3e\x3cp id\x3d"test"\x3eHello, World!\x3c/p\x3e\x3c/div\x3e',
            expectCss: !1,
            extraConfig: {
              exportPdf_stylesheets: [
                "/css/ckeditor.css",
                "https://ckeditor.com",
              ],
            },
          });
        },
      "test no custom stylesheets attached to classic editor": function () {
        a({
          creator: "replace",
          initialHtml: '\x3cp id\x3d"test"\x3eHello, World!\x3c/p\x3e',
          expectedHtml:
            '\x3cdiv class\x3d"cke_editable cke_contents_ltr"\x3e\x3cp id\x3d"test"\x3eHello, World!\x3c/p\x3e\x3c/div\x3e',
          expectCss: !0,
          extraConfig: { removePlugins: "divarea" },
        });
      },
      "test one absolute path custom stylesheet attached to classic editor":
        function () {
          a({
            creator: "replace",
            initialHtml: '\x3cp id\x3d"test"\x3eHello, World!\x3c/p\x3e',
            expectedHtml:
              '\x3clink type\x3d"text/css" rel\x3dstylesheet href\x3d"https://ckeditor.com/"\x3e\x3cdiv class\x3d"cke_editable cke_contents_ltr"\x3e\x3cp id\x3d"test"\x3eHello, World!\x3c/p\x3e\x3c/div\x3e',
            expectCss: !1,
            extraConfig: {
              removePlugins: "divarea",
              exportPdf_stylesheets: ["https://ckeditor.com"],
            },
          });
        },
      "test two absolute path custom stylesheets attached to classic editor":
        function () {
          a({
            creator: "replace",
            initialHtml: '\x3cp id\x3d"test"\x3eHello, World!\x3c/p\x3e',
            expectedHtml:
              '\x3clink type\x3d"text/css" rel\x3dstylesheet href\x3d"https://ckeditor.css/"\x3e\x3clink type\x3d"text/css" rel\x3dstylesheet href\x3d"https://cksource.css/"\x3e\x3cdiv class\x3d"cke_editable cke_contents_ltr"\x3e\x3cp id\x3d"test"\x3eHello, World!\x3c/p\x3e\x3c/div\x3e',
            expectCss: !1,
            extraConfig: {
              removePlugins: "divarea",
              exportPdf_stylesheets: [
                "https://ckeditor.css",
                "https://cksource.css",
              ],
            },
          });
        },
      "test one relative path custom stylesheet attached to classic editor":
        function () {
          a({
            creator: "replace",
            initialHtml: '\x3cp id\x3d"test"\x3eHello, World!\x3c/p\x3e',
            expectedHtml:
              '\x3clink type\x3d"text/css" rel\x3dstylesheet href\x3d"' +
              exportPdfUtils.toAbsoluteUrl("/css/ckeditor.css") +
              '"\x3e\x3cdiv class\x3d"cke_editable cke_contents_ltr"\x3e\x3cp id\x3d"test"\x3eHello, World!\x3c/p\x3e\x3c/div\x3e',
            expectCss: !1,
            extraConfig: {
              removePlugins: "divarea",
              exportPdf_stylesheets: ["/css/ckeditor.css"],
            },
          });
        },
      "test two relative path custom stylesheets attached to classic editor":
        function () {
          a({
            creator: "replace",
            initialHtml: '\x3cp id\x3d"test"\x3eHello, World!\x3c/p\x3e',
            expectedHtml:
              '\x3clink type\x3d"text/css" rel\x3dstylesheet href\x3d"' +
              exportPdfUtils.toAbsoluteUrl("/css/ckeditor.css") +
              '"\x3e\x3clink type\x3d"text/css" rel\x3dstylesheet href\x3d"' +
              exportPdfUtils.toAbsoluteUrl("/css/cksource.css") +
              '"\x3e\x3cdiv class\x3d"cke_editable cke_contents_ltr"\x3e\x3cp id\x3d"test"\x3eHello, World!\x3c/p\x3e\x3c/div\x3e',
            expectCss: !1,
            extraConfig: {
              removePlugins: "divarea",
              exportPdf_stylesheets: ["/css/ckeditor.css", "/css/cksource.css"],
            },
          });
        },
      "test one relative and one absolute path custom stylesheets attached to classic editor":
        function () {
          a({
            creator: "replace",
            initialHtml: '\x3cp id\x3d"test"\x3eHello, World!\x3c/p\x3e',
            expectedHtml:
              '\x3clink type\x3d"text/css" rel\x3dstylesheet href\x3d"' +
              exportPdfUtils.toAbsoluteUrl("/css/ckeditor.css") +
              '"\x3e\x3clink type\x3d"text/css" rel\x3dstylesheet href\x3d"https://ckeditor.com/"\x3e\x3cdiv class\x3d"cke_editable cke_contents_ltr"\x3e\x3cp id\x3d"test"\x3eHello, World!\x3c/p\x3e\x3c/div\x3e',
            expectCss: !1,
            extraConfig: {
              removePlugins: "divarea",
              exportPdf_stylesheets: [
                "/css/ckeditor.css",
                "https://ckeditor.com",
              ],
            },
          });
        },
    });
  });
})();
