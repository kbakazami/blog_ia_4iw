import {useAuthStore} from "src/stores/auth";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("src/pages/HomePage.vue")
      },
      {
        path: "/login",
        name: "login",
        component: () => import("pages/Form.vue")
      },
      {
        path: "/register",
        name: "register",
        component: () => import("pages/Form.vue")
      },
    ],
  },
  {
    path: '/admin',
    name:'admin',
    meta: { requiresAdmin: true },
    component: () => import("layouts/Admin/AdminLayout.vue"),
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore();
      const publicPages = ['/login'];
      const authRequired = !publicPages.includes(to.path);

      let isAdmin = false;
      const user = authStore.user;

      if(user)
      {
        user.roles.forEach(role => {
          if(role === 'ROLE_ADMIN') {
            isAdmin = true;
          }
        });
      }

      if(authRequired && !authStore.user) {
        next('/login');
      }else if(authRequired && authStore.user && !isAdmin)
      {
        next('/');
      }else {
        next();
      }
    },
    children: [
      {
        path: "",
        name: "base",
        component: () => import("pages/Admin/Admin.vue"),
      },
      {
        path: "/articles",
        name: 'articles',
        component:() => import("pages/Admin/List.vue")
      },
      {
        path: "/generate",
        name: "generate",
        component:() => import("pages/Admin/Form.vue")
      },
      {
        path: "/article/:id",
        name: "editArticle",
        component: () => import("pages/Admin/Form.vue")
      },
      {
        path: "/users",
        name: 'users',
        component:() => import("pages/Admin/List.vue")
      },
      {
        path: "/user/:id",
        name: "editUser",
        component: () => import("pages/Admin/Form.vue")
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
