﻿/*
 Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
(function () {
  function u(a, c, b) {
    c = l(c);
    var e, d;
    if (0 === c.length) return a;
    e = CKEDITOR.tools.array.map(
      c,
      function (a) {
        return h(a);
      },
      this,
    );
    if (b.length !== e.length)
      return (
        CKEDITOR.error("pastetools-failed-image-extraction", {
          rtf: c.length,
          html: b.length,
        }),
        a
      );
    for (d = 0; d < b.length; d++)
      if (0 === b[d].indexOf("file://"))
        if (e[d]) {
          var k = b[d].replace(/\\/g, "\\\\");
          a = a.replace(
            new RegExp("(\x3cimg [^\x3e]*src\x3d[\"']?)" + k),
            "$1" + e[d],
          );
        } else
          CKEDITOR.error("pastetools-unsupported-image", {
            type: c[d].type,
            index: d,
          });
    return a;
  }
  function v(a, c, b) {
    var e = CKEDITOR.tools.array.unique(
      CKEDITOR.tools.array.filter(b, function (a) {
        return a.match(/^blob:/i);
      }),
    );
    b = CKEDITOR.tools.array.map(e, m);
    CKEDITOR.tools.promise.all(b).then(function (b) {
      CKEDITOR.tools.array.forEach(b, function (b, c) {
        if (b) {
          var d = e[c],
            d = a
              .editable()
              .find('img[src\x3d"' + d + '"]')
              .toArray();
          CKEDITOR.tools.array.forEach(
            d,
            function (a) {
              a.setAttribute("src", b);
              a.setAttribute("data-cke-saved-src", b);
            },
            this,
          );
        } else
          CKEDITOR.error("pastetools-unsupported-image", {
            type: "blob",
            index: c,
          });
      });
    });
    return c;
  }
  function l(a) {
    function c(a) {
      return "string" !== typeof a
        ? -1
        : CKEDITOR.tools.array.indexOf(d, function (b) {
            return b.id === a;
          });
    }
    function b(a) {
      var b = a.match(/\\blipuid (\w+)\}/);
      a = a.match(/\\bliptag(-?\d+)/);
      return b ? b[1] : a ? a[1] : null;
    }
    var e = CKEDITOR.plugins.pastetools.filters.common.rtf,
      d = [];
    a = e.removeGroups(a, "(?:(?:header|footer)[lrf]?|nonshppict|shprslt)");
    a = e.getGroups(a, "pict");
    if (!a) return d;
    for (var k = 0; k < a.length; k++) {
      var f = a[k].content,
        h = b(f),
        n = t(f),
        g = c(h),
        p = -1 !== g && d[g].hex,
        l = p && d[g].type === n,
        p = p && d[g].type !== n && g === d.length - 1,
        m = -1 !== f.indexOf("\\defshp"),
        q =
          -1 !==
          CKEDITOR.tools.array.indexOf(
            CKEDITOR.pasteFilters.image.supportedImageTypes,
            n,
          ),
        r = -1 !== CKEDITOR.tools.indexOf(f, "fHorizRule");
      l
        ? d.push(d[g])
        : p ||
          m ||
          r ||
          ((f = {
            id: h,
            hex: q ? e.extractGroupContent(f).replace(/\s/g, "") : null,
            type: n,
          }),
          -1 !== g ? d.splice(g, 1, f) : d.push(f));
    }
    return d;
  }
  function q(a) {
    for (var c = /<img[^>]+src="([^"]+)[^>]+/g, b = [], e; (e = c.exec(a)); )
      b.push(e[1]);
    return b;
  }
  function t(a) {
    var c = CKEDITOR.tools.array.find(
      CKEDITOR.pasteFilters.image.recognizableImageTypes,
      function (b) {
        return b.marker.test(a);
      },
    );
    return c ? c.type : "unknown";
  }
  function h(a) {
    var c =
        -1 !==
        CKEDITOR.tools.array.indexOf(
          CKEDITOR.pasteFilters.image.supportedImageTypes,
          a.type,
        ),
      b = a.hex;
    if (!c) return null;
    "string" === typeof b &&
      (b = CKEDITOR.tools.convertHexStringToBytes(a.hex));
    return a.type
      ? "data:" + a.type + ";base64," + CKEDITOR.tools.convertBytesToBase64(b)
      : null;
  }
  function m(a) {
    return new CKEDITOR.tools.promise(function (c) {
      CKEDITOR.ajax.load(
        a,
        function (a) {
          a = new Uint8Array(a);
          var e = r(a);
          a = h({ type: e, hex: a });
          c(a);
        },
        "arraybuffer",
      );
    });
  }
  function r(a) {
    a = a.subarray(0, 4);
    var c = CKEDITOR.tools.array
      .map(a, function (a) {
        return a.toString(16);
      })
      .join("");
    return (a = CKEDITOR.tools.array.find(
      CKEDITOR.pasteFilters.image.recognizableImageSignatures,
      function (a) {
        return 0 === c.indexOf(a.signature);
      },
    ))
      ? a.type
      : null;
  }
  CKEDITOR.pasteFilters.image = function (a, c, b) {
    var e;
    if (c.activeFilter && !c.activeFilter.check("img[src]")) return a;
    e = q(a);
    return 0 === e.length ? a : b ? u(a, b, e) : v(c, a, e);
  };
  CKEDITOR.pasteFilters.image.extractFromRtf = l;
  CKEDITOR.pasteFilters.image.extractTagsFromHtml = q;
  CKEDITOR.pasteFilters.image.getImageType = t;
  CKEDITOR.pasteFilters.image.createSrcWithBase64 = h;
  CKEDITOR.pasteFilters.image.convertBlobUrlToBase64 = m;
  CKEDITOR.pasteFilters.image.getImageTypeFromSignature = r;
  CKEDITOR.pasteFilters.image.supportedImageTypes = [
    "image/png",
    "image/jpeg",
    "image/gif",
  ];
  CKEDITOR.pasteFilters.image.recognizableImageTypes = [
    { marker: /\\pngblip/, type: "image/png" },
    { marker: /\\jpegblip/, type: "image/jpeg" },
    { marker: /\\emfblip/, type: "image/emf" },
    { marker: /\\wmetafile\d/, type: "image/wmf" },
  ];
  CKEDITOR.pasteFilters.image.recognizableImageSignatures = [
    { signature: "ffd8ff", type: "image/jpeg" },
    { signature: "47494638", type: "image/gif" },
    { signature: "89504e47", type: "image/png" },
  ];
})();
