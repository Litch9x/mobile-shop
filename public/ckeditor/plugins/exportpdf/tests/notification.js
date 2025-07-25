﻿(function () {
  bender.loadExternalPlugin("exportpdf", "/apps/plugin/");
  CKEDITOR.plugins.load("exportpdf", function () {
    function c(a, b) {
      var c = a._.notificationArea.notifications[0];
      assert.areSame(b.message, c.message, "Message should be the same.");
      assert.areSame(b.type, c.type, "Type should be the same.");
      assert.areSame(b.progress, c.progress, "Progress should be the same.");
    }
    bender.editors = {
      successEditor: { config: exportPdfUtils.getDefaultConfig("unit") },
      errorEditor: { config: exportPdfUtils.getDefaultConfig("unit") },
    };
    bender.test({
      setUp: function () {
        bender.tools.ignoreUnsupportedEnvironment("exportpdf");
        sinon.stub(CKEDITOR.plugins.exportpdf, "downloadFile");
      },
      tearDown: function () {
        CKEDITOR.plugins.exportpdf.downloadFile.restore();
      },
      "test notifications and progress steps are correct in happy path":
        function () {
          var a = this.editors.successEditor;
          this.editorBots.successEditor.setHtmlWithSelection(
            '\x3cp id\x3d"test"\x3eHello, World!\x3c/p\x3e^',
          );
          a.once("exportPdf", function () {
            c(a, {
              message: "Processing PDF document...",
              type: "progress",
              progress: 0,
            });
          });
          a.once(
            "exportPdf",
            function () {
              c(a, {
                message: "Processing PDF document...",
                type: "progress",
                progress: 0.2,
              });
            },
            null,
            null,
            16,
          );
          exportPdfUtils.useXHR(a, function (b) {
            b.addEventListener("progress", function () {
              c(a, {
                message: "Processing PDF document...",
                type: "progress",
                progress: 0.8,
              });
            });
            b.addEventListener("loadend", function () {
              c(a, {
                message: "Document is ready!",
                type: "success",
                progress: 1,
              });
            });
            b.respond(200, {}, "");
          });
        },
      "test notifications and progress steps are correct in sad path":
        function () {
          var a = this.editors.errorEditor;
          this.editorBots.errorEditor.setHtmlWithSelection(
            '\x3cp id\x3d"test"\x3eHello, World!\x3c/p\x3e^',
          );
          exportPdfUtils.useXHR(a, function (b) {
            var d = sinon.stub(console, "error", function (a) {
              assert.areSame(
                "Validation failed.",
                a.message,
                "Message from endpoint is incorrect.",
              );
              d.restore();
            });
            b.addEventListener("loadend", function () {
              c(a, { message: "Error occurred.", type: "warning" });
            });
            b.respond(400, {}, '{ "message": "Validation failed." }');
          });
        },
    });
  });
})();
