import Mock from "mockjs";
const data = [
  {
    id: "@uuid",
    name: "@ctitle(1, 10)",
    "url|1": ["@url", null],
    "github|1": ["@url", null],
    "description|1-4": ["@cparagraph(1, 5)"],
    thumb: "@image(300x250, @color, #fff, @natural)",
  },
]

Mock.mock(/^\/api\/project\/?$/, "get", {
  code: 0,
  msg: "",
  "data|10-20": [
    {
      id: "@uuid",
      name: "@ctitle(1, 10)",
      "url|1": ["@url", null],
      "github|1": ["@url", null],
      "description|1-4": ["@cparagraph(1, 5)"],
      thumb: "@image(300x250, @color, #fff, @natural)",
    },
  ],
});

/**
 * {
      id: "@uuid",
      name: "轮播图项目",
      "url|1": ["@url", null],
      "github|1": ["@url", null],
      "description": ["这是一个关于滚动轮播图的项目",
    "知识点：transform"],
      thumb: "@image(300x250, @color, #fff, @natural)",
    },
    {
      id: "@uuid",
      name: "学生管理系统项目",
      "url|1": ["@url", null],
      "github|1": ["@url", null],
      "description":["这是一个关于前后端交互的项目",
      "知识点：transform",
              "网络方面的知识"],
      thumb: "@image(300x250, @color, #fff, @natural)",
    },
 * */ 
