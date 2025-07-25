﻿(function () {
  bender.loadExternalPlugin("exportpdf", "/apps/plugin/");
  CKEDITOR.plugins.load("exportpdf", function () {
    bender.editors = {
      defaultHeader: { config: { extraPlugins: "exportpdf" } },
      customHeader: { config: exportPdfUtils.getDefaultConfig("unit") },
    };
    bender.test({
      setUp: function () {
        bender.tools.ignoreUnsupportedEnvironment("exportpdf");
        sinon.stub(CKEDITOR.plugins.exportpdf, "downloadFile");
      },
      tearDown: function () {
        CKEDITOR.plugins.exportpdf.downloadFile.restore();
      },
      "test default statistics header": function () {
        var a = this.editors.defaultHeader;
        this.editorBots.defaultHeader.setHtmlWithSelection(
          '\x3cp id\x3d"test"\x3eHello, World!\x3c/p\x3e^',
        );
        exportPdfUtils.useXHR(a, function (a) {
          assert.areEqual(
            a.requestHeaders["x-cs-app-id"],
            "cke4",
            "Default stats header is wrong.",
          );
        });
      },
      "test custom statistics header": function () {
        var a = this.editors.customHeader;
        this.editorBots.customHeader.setHtmlWithSelection(
          '\x3cp id\x3d"test"\x3eHello, World!\x3c/p\x3e^',
        );
        exportPdfUtils.useXHR(a, function (a) {
          assert.areEqual(
            a.requestHeaders["x-cs-app-id"],
            "cke4-tests-unit",
            "Custom stats header was not set properly.",
          );
        });
      },
    });
  });
})();
