﻿(function () {
  bender.loadExternalPlugin("exportpdf", "/apps/plugin/");
  CKEDITOR.plugins.load("exportpdf", function () {
    function a(a, d, b) {
      b = exportPdfUtils.getDefaultConfig("unit", b || {});
      bender.editorBot.create(
        { name: "editor" + Date.now(), config: b },
        function (b) {
          var c = b.editor;
          b.setHtmlWithSelection(a);
          c.once(
            "exportPdf",
            function (b) {
              assert.areEqual(a, b.data.html);
            },
            null,
            null,
            10,
          );
          c.once(
            "exportPdf",
            function (a) {
              a.cancel();
              assert.areEqual(
                '\x3cdiv class\x3d"cke_editable cke_contents_ltr"\x3e' +
                  d +
                  "\x3c/div\x3e",
                a.data.html,
              );
            },
            null,
            null,
            16,
          );
          c.execCommand("exportPdf");
        },
      );
    }
    function b(a, b) {
      a = a.replace(/\/$/g, "");
      b && 0 < b && (a = a.split("/").slice(0, -b).join("/"));
      return a;
    }
    bender.test({
      setUp: function () {
        bender.tools.ignoreUnsupportedEnvironment("exportpdf");
        this.paths = {
          relative0: b(bender.testDir),
          relative1: b(bender.testDir, 1),
          relative3: b(bender.testDir, 3),
        };
      },
      "test absolute image urls are not changed": function () {
        a(
          '\x3cp\x3eFoo \x3cimg src\x3d"https://ckeditor.com/img/image1.jpg" /\x3e\x3cimg src\x3d"https://ckeditor.com/img/image2.png" /\x3e\x3c/p\x3e',
          '\x3cp\x3eFoo \x3cimg src\x3d"https://ckeditor.com/img/image1.jpg" /\x3e\x3cimg src\x3d"https://ckeditor.com/img/image2.png" /\x3e\x3c/p\x3e',
        );
      },
      "test relative (to root) image urls are changed to absolute":
        function () {
          a(
            '\x3cp\x3e\x3cimg src\x3d"/img/image1.jpg" /\x3e Bar \x3cimg src\x3d"/img/big/image2.png" /\x3e\x3c/p\x3e',
            '\x3cp\x3e\x3cimg src\x3d"' +
              exportPdfUtils.toAbsoluteUrl("/img/image1.jpg") +
              '" /\x3e Bar \x3cimg src\x3d"' +
              exportPdfUtils.toAbsoluteUrl("/img/big/image2.png") +
              '" /\x3e\x3c/p\x3e',
          );
        },
      'test relative (to root) image urls with ".." are changed to absolute':
        function () {
          a(
            '\x3cp\x3e\x3cimg src\x3d"/../img/image1.jpg" /\x3e Bar \x3cimg src\x3d"/../../img/big/image2.png" /\x3e\x3c/p\x3e',
            '\x3cp\x3e\x3cimg src\x3d"' +
              exportPdfUtils.toAbsoluteUrl("/img/image1.jpg") +
              '" /\x3e Bar \x3cimg src\x3d"' +
              exportPdfUtils.toAbsoluteUrl("/img/big/image2.png") +
              '" /\x3e\x3c/p\x3e',
          );
        },
      "test relative (to root) image urls with custom baseHref are changed to absolute":
        function () {
          a(
            '\x3cp\x3e\x3cimg src\x3d"/img/image1.jpg" /\x3e Bar \x3cimg src\x3d"/img/big/image2.png" /\x3e\x3c/p\x3e',
            '\x3cp\x3e\x3cimg src\x3d"' +
              exportPdfUtils.toAbsoluteUrl(
                "/img/image1.jpg",
                "http://ckeditor.com",
              ) +
              '" /\x3e Bar \x3cimg src\x3d"' +
              exportPdfUtils.toAbsoluteUrl(
                "/img/big/image2.png",
                "http://ckeditor.com",
              ) +
              '" /\x3e\x3c/p\x3e',
            { baseHref: "http://ckeditor.com/ckeditor4/" },
          );
        },
      'test relative (to root) image urls with custom baseHref and ".." are changed to absolute':
        function () {
          a(
            '\x3cp\x3e\x3cimg src\x3d"/../img/image1.jpg" /\x3e Bar \x3cimg src\x3d"/../../img/big/image2.png" /\x3e\x3c/p\x3e',
            '\x3cp\x3e\x3cimg src\x3d"' +
              exportPdfUtils.toAbsoluteUrl(
                "/img/image1.jpg",
                "http://ckeditor.com",
              ) +
              '" /\x3e Bar \x3cimg src\x3d"' +
              exportPdfUtils.toAbsoluteUrl(
                "/img/big/image2.png",
                "http://ckeditor.com",
              ) +
              '" /\x3e\x3c/p\x3e',
            { baseHref: "http://ckeditor.com/ckeditor4/" },
          );
        },
      "test relative (to current url) image urls are changed to absolute":
        function () {
          a(
            '\x3cp\x3e\x3cimg src\x3d"img/image1.jpg" /\x3e Bar \x3cimg src\x3d"img/big/image2.png" /\x3e\x3c/p\x3e',
            '\x3cp\x3e\x3cimg src\x3d"' +
              exportPdfUtils.toAbsoluteUrl(
                this.paths.relative0 + "/img/image1.jpg",
              ) +
              '" /\x3e Bar \x3cimg src\x3d"' +
              exportPdfUtils.toAbsoluteUrl(
                this.paths.relative0 + "/img/big/image2.png",
              ) +
              '" /\x3e\x3c/p\x3e',
          );
        },
      'test relative (to current url) image urls with ".." are changed to absolute':
        function () {
          a(
            '\x3cp\x3e\x3cimg src\x3d"../img/image1.jpg" /\x3e Bar \x3cimg src\x3d"../../../img/big/image2.png" /\x3e\x3c/p\x3e',
            '\x3cp\x3e\x3cimg src\x3d"' +
              exportPdfUtils.toAbsoluteUrl(
                this.paths.relative1 + "/img/image1.jpg",
              ) +
              '" /\x3e Bar \x3cimg src\x3d"' +
              exportPdfUtils.toAbsoluteUrl(
                this.paths.relative3 + "/img/big/image2.png",
              ) +
              '" /\x3e\x3c/p\x3e',
          );
        },
      "test relative (to current url) image urls with custom baseHref are changed to absolute":
        function () {
          a(
            '\x3cp\x3e\x3cimg src\x3d"img/image1.jpg" /\x3e Bar \x3cimg src\x3d"img/big/image2.png" /\x3e\x3c/p\x3e',
            '\x3cp\x3e\x3cimg src\x3d"' +
              exportPdfUtils.toAbsoluteUrl(
                "img/image1.jpg",
                "http://ckeditor.com/ckeditor4/",
              ) +
              '" /\x3e Bar \x3cimg src\x3d"' +
              exportPdfUtils.toAbsoluteUrl(
                "img/big/image2.png",
                "http://ckeditor.com/ckeditor4/",
              ) +
              '" /\x3e\x3c/p\x3e',
            { baseHref: "http://ckeditor.com/ckeditor4/" },
          );
        },
      'test relative (to current url) image urls with custom baseHref and ".." are changed to absolute':
        function () {
          a(
            '\x3cp\x3e\x3cimg src\x3d"../img/image1.jpg" /\x3e Bar \x3cimg src\x3d"../../img/big/image2.png" /\x3e\x3c/p\x3e',
            '\x3cp\x3e\x3cimg src\x3d"' +
              exportPdfUtils.toAbsoluteUrl(
                "img/image1.jpg",
                "https://ckeditor.com/ckeditor4/",
              ) +
              '" /\x3e Bar \x3cimg src\x3d"' +
              exportPdfUtils.toAbsoluteUrl(
                "img/big/image2.png",
                "https://ckeditor.com/",
              ) +
              '" /\x3e\x3c/p\x3e',
            { baseHref: "https://ckeditor.com/ckeditor4/demo/" },
          );
        },
    });
  });
})();
