﻿/*
 Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
CKEDITOR.addTemplates("default", {
  imagesPath: CKEDITOR.getUrl(
    CKEDITOR.plugins.getPath("templates") + "templates/images/",
  ),
  templates: [
    {
      title: "Image and Title",
      image: "template1.gif",
      description:
        "One main image with a title and text that surround the image.",
      html: '\x3ch3\x3e\x3cimg src\x3d" " alt\x3d"" style\x3d"margin-right: 10px" height\x3d"100" width\x3d"100" align\x3d"left" /\x3eType the title here\x3c/h3\x3e\x3cp\x3eType the text here\x3c/p\x3e',
    },
    {
      title: "Strange Template",
      image: "template2.gif",
      description:
        "A template that defines two columns, each one with a title, and some text.",
      html: '\x3ctable cellspacing\x3d"0" cellpadding\x3d"0" style\x3d"width:100%" border\x3d"0"\x3e\x3ctr\x3e\x3ctd style\x3d"width:50%"\x3e\x3ch3\x3eTitle 1\x3c/h3\x3e\x3c/td\x3e\x3ctd\x3e\x3c/td\x3e\x3ctd style\x3d"width:50%"\x3e\x3ch3\x3eTitle 2\x3c/h3\x3e\x3c/td\x3e\x3c/tr\x3e\x3ctr\x3e\x3ctd\x3eText 1\x3c/td\x3e\x3ctd\x3e\x3c/td\x3e\x3ctd\x3eText 2\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e\x3cp\x3eMore text goes here.\x3c/p\x3e',
    },
    {
      title: "Text and Table",
      image: "template3.gif",
      description: "A title with some text and a table.",
      html: '\x3cdiv style\x3d"width: 80%"\x3e\x3ch3\x3eTitle goes here\x3c/h3\x3e\x3ctable style\x3d"width:150px;float: right" cellspacing\x3d"0" cellpadding\x3d"0" border\x3d"1"\x3e\x3ccaption style\x3d"border:solid 1px black"\x3e\x3cstrong\x3eTable title\x3c/strong\x3e\x3c/caption\x3e\x3ctr\x3e\x3ctd\x3e\x26nbsp;\x3c/td\x3e\x3ctd\x3e\x26nbsp;\x3c/td\x3e\x3ctd\x3e\x26nbsp;\x3c/td\x3e\x3c/tr\x3e\x3ctr\x3e\x3ctd\x3e\x26nbsp;\x3c/td\x3e\x3ctd\x3e\x26nbsp;\x3c/td\x3e\x3ctd\x3e\x26nbsp;\x3c/td\x3e\x3c/tr\x3e\x3ctr\x3e\x3ctd\x3e\x26nbsp;\x3c/td\x3e\x3ctd\x3e\x26nbsp;\x3c/td\x3e\x3ctd\x3e\x26nbsp;\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e\x3cp\x3eType the text here\x3c/p\x3e\x3c/div\x3e',
    },
  ],
});
