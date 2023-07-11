const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("src/pages/HomePage.vue") },
    ],
  },
  {
    path: '/admin',
    name:'admin',
    component: () => import("layouts/Admin/AdminLayout.vue"),
   children: [
     {
       path: "",
       name: "base",
       component: () => import("pages/Admin/Admin.vue")
     },
     {
       path: "/articles",
       name: 'articles',
       component:() => import("pages/Admin/ArticlesList.vue")
     },
     {
       path: "/generate",
       name: "generate",
       component:() => import("pages/Admin/ArticlesForm.vue")
     },
     {
       path: "article/:id",
       name: "edit",
       component: () => import("pages/Admin/ArticlesForm.vue"),
     },
   ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
