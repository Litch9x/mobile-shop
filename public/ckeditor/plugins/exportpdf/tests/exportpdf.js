﻿(function () {
  bender.loadExternalPlugin("exportpdf", "/apps/plugin/");
  CKEDITOR.plugins.load("exportpdf", function () {
    bender.test({
      setUp: function () {
        bender.tools.ignoreUnsupportedEnvironment("exportpdf");
      },
      "test data is correct at read and send stages": function () {
        bender.editorBot.create(
          { name: "editor1", config: exportPdfUtils.getDefaultConfig("unit") },
          function (c) {
            var b = c.editor;
            c.setHtmlWithSelection(
              '\x3cp id\x3d"test"\x3eHello, World!\x3c/p\x3e^',
            );
            b.once("exportPdf", function (a) {
              assert.areEqual(
                a.data.html,
                b.getData(),
                "Data from editor is incorrect.",
              );
              assert.isTrue(
                CKEDITOR.tools.isEmpty(a.data.options),
                "`options` object should be initially empty.",
              );
            });
            b.once(
              "exportPdf",
              function (a) {
                a.cancel();
                assert.areEqual(
                  '\x3cdiv class\x3d"cke_editable cke_contents_ltr"\x3e' +
                    b.getData() +
                    "\x3c/div\x3e",
                  a.data.html,
                  "Preprocessed data sent to endpoint is incorrect.",
                );
                assert.isNotNull(a.data.css, "CSS should be attached.");
              },
              null,
              null,
              16,
            );
            b.execCommand("exportPdf");
          },
        );
      },
      "test options provided via config": function () {
        bender.editorBot.create(
          {
            name: "editor2",
            config: exportPdfUtils.getDefaultConfig("unit", {
              exportPdf_options: { format: "A6" },
            }),
          },
          function (c) {
            var b = c.editor;
            c.setHtmlWithSelection(
              '\x3cp id\x3d"test"\x3eHello, World!\x3c/p\x3e^',
            );
            b.once("exportPdf", function (a) {
              a.cancel();
              assert.areEqual(a.data.options.format, "A6");
            });
            b.execCommand("exportPdf");
          },
        );
      },
      "test html changed via event": function () {
        bender.editorBot.create(
          { name: "editor3", config: exportPdfUtils.getDefaultConfig("unit") },
          function (c) {
            var b = c.editor;
            c.setHtmlWithSelection(
              '\x3cp id\x3d"test"\x3eHello, World!\x3c/p\x3e^',
            );
            b.once("exportPdf", function (a) {
              a.cancel();
              assert.areEqual(a.data.html, "");
            });
            b.once(
              "exportPdf",
              function (a) {
                assert.areNotEqual(a.data.html, "");
                a.data.html = "";
              },
              null,
              null,
              1,
            );
            b.execCommand("exportPdf");
          },
        );
      },
      "test options changed via event": function () {
        bender.editorBot.create(
          { name: "editor4", config: exportPdfUtils.getDefaultConfig("unit") },
          function (c) {
            var b = c.editor;
            c.setHtmlWithSelection(
              '\x3cp id\x3d"test"\x3eHello, World!\x3c/p\x3e^',
            );
            b.once("exportPdf", function (a) {
              a.cancel();
              assert.areEqual(a.data.options.format, "A5");
            });
            b.once(
              "exportPdf",
              function (a) {
                a.data.options.format = "A5";
              },
              null,
              null,
              1,
            );
            b.execCommand("exportPdf");
          },
        );
      },
      "test html changed via event asynchronously": function () {
        bender.editorBot.create(
          { name: "editor5", config: exportPdfUtils.getDefaultConfig("unit") },
          function (c) {
            var b = c.editor;
            c.setHtmlWithSelection(
              '\x3cp id\x3d"test"\x3eHello, World!\x3c/p\x3e^',
            );
            b.on("exportPdf", function (a) {
              a.cancel();
              a.data.asyncDone &&
                (resume(),
                assert.areEqual(
                  a.data.html,
                  "\x3cp\x3eContent filtered!\x3c/p\x3e",
                ),
                delete a.data.asyncDone,
                assert.isUndefined(a.data.asyncDone));
            });
            b.on(
              "exportPdf",
              function (a) {
                a.data.asyncDone ||
                  setTimeout(function () {
                    a.data.html = "\x3cp\x3eContent filtered!\x3c/p\x3e";
                    a.data.asyncDone = !0;
                    b.fire("exportPdf", a.data);
                  }, 1e3);
              },
              null,
              null,
              1,
            );
            b.execCommand("exportPdf");
            wait();
          },
        );
      },
      "test options changed via event asynchronously": function () {
        bender.editorBot.create(
          {
            name: "editor6",
            config: exportPdfUtils.getDefaultConfig("unit", {
              exportPdf_options: { format: "A5" },
            }),
          },
          function (c) {
            var b = c.editor;
            c.setHtmlWithSelection(
              '\x3cp id\x3d"test"\x3eHello, World!\x3c/p\x3e^',
            );
            b.on("exportPdf", function (a) {
              a.cancel();
              a.data.asyncDone &&
                (resume(),
                assert.areEqual(a.data.options.format, "A4"),
                delete a.data.asyncDone,
                assert.isUndefined(a.data.asyncDone));
            });
            b.on(
              "exportPdf",
              function (a) {
                a.data.asyncDone ||
                  setTimeout(function () {
                    a.data.options.format = "A4";
                    a.data.asyncDone = !0;
                    b.fire("exportPdf", a.data);
                  }, 1e3);
              },
              null,
              null,
              1,
            );
            b.execCommand("exportPdf");
            wait();
          },
        );
      },
      "test default CKEditor config": function () {
        bender.editorBot.create(
          { name: "editor7", config: exportPdfUtils.getDefaultConfig("unit") },
          function (c) {
            CKEDITOR.config.exportPdf_isDev
              ? assert.areEqual(
                  c.editor.config.exportPdf_service,
                  "https://pdf-converter.cke-cs-staging.com/v1/convert",
                  "Default dev endpoint is incorrect.",
                )
              : assert.areEqual(
                  c.editor.config.exportPdf_service,
                  "https://pdf-converter.cke-cs.com/v1/convert",
                  "Default prod endpoint is incorrect.",
                );
            assert.areEqual(
              c.editor.config.exportPdf_fileName,
              "ckeditor4-export-pdf.pdf",
              "Default file name is incorrect.",
            );
          },
        );
      },
      "test inaccessible stylesheets are handled correctly": function () {
        bender.editorBot.create(
          {
            name: "editor8",
            config: exportPdfUtils.getDefaultConfig("unit", {
              contentsCss:
                "https://cdn.ckeditor.com/4.16.0/full-all/samples/css/samples.css",
            }),
          },
          function (c) {
            var b = c.editor,
              a = !1,
              d = CKEDITOR.on("log", function (b) {
                "exportpdf-stylesheets-inaccessible" === b.data.errorCode &&
                  (b.cancel(), CKEDITOR.removeListener("log", d), (a = !0));
              });
            c.setHtmlWithSelection(
              '\x3cp id\x3d"test"\x3eHello, World!\x3c/p\x3e^',
            );
            b.once(
              "exportPdf",
              function (b) {
                b.cancel();
                resume(function () {
                  a
                    ? assert.pass()
                    : assert.fail(
                        "No errors thrown while accessing stylesheets rules.",
                      );
                });
              },
              null,
              null,
              19,
            );
            CKEDITOR.tools.setTimeout(function () {
              b.execCommand("exportPdf");
            }, 1e3);
            wait();
          },
        );
      },
    });
  });
})();
