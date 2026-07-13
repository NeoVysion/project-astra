import {
  createRouter,
  createWebHashHistory,
} from "vue-router";
import {
  HomeOutlined,
  TeamOutlined,
  LinkOutlined,
  GoldOutlined,
} from '@ant-design/icons-vue';
import useLogin from '@/stores/login'
import { toastMessage } from "@/utils/tools";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "Login",
      component: () => import("@/views/Login.vue")
    },
    {
      path: "/dashboard",
      name: "Home",
      component: () => import("@/views/Dashboard.vue"),
      meta: {
        requiresAuth: true,
        onMenu: "Home",
        menuIcon: HomeOutlined,
        breadcrumbName: () => 'Home'
      },
    },
    {
      path: "/members",
      name: "MemberList",
      component: () => import("@/views/members/List.vue"),
      meta: {
        requiresAuth: true,
        requiresPlevel: 1,
        onMenu: "Membri",
        menuIcon: TeamOutlined,
        breadcrumbName: () => "Lista Membri",
        parent: 'Home',
      }
    },
    {
      path: "/links",
      name: "LinkList",
      component: () => import("@/views/links/List.vue"),
      meta: {
        requiresAuth: true,
        requiresPlevel: 1,
        onMenu: "Links",
        menuIcon: LinkOutlined,
        breadcrumbName: () => "Lista Links",
        parent: 'Home',
      }
    },
    {
      path: "/tokens",
      name: "TokenList",
      component: () => import("@/views/tokens/List.vue"),
      meta: {
        requiresAuth: true,
        requiresPlevel: 1,
        onMenu: "Tokens",
        menuIcon: GoldOutlined,
        breadcrumbName: () => "Lista Tokens",
        parent: 'Home',
      }
    },
    {
      path: "/members/:id_member",
      name: "MemberDetail",
      component: () => import("@/views/members/Detail.vue"),
      meta: {
        requiresAuth: true,
        breadcrumbName: () => "Dettaglio Membro",
        parent: "MemberList"
      }
    },
    {
      path: "/favors",
      name: "Favors",
      component: () => import("@/views/favors/List.vue"),
      meta: {
        requiresAuth: true,
        requiresPlevel: 4,
        onAdminMenu: "Favors",
        breadcrumbName: () => "Lista Favors",
        parent: 'Home',
      }
    },
  ],
});

router.beforeEach((to) => {
  const loginStore = useLogin();

  if (!loginStore.isAuthenticated) {
    return to.name === 'Login'
      ? true
      : { name: 'Login' };
  }

  if (to.name === 'Login') {
    return { name: 'Home' };
  }

  const userLevel = loginStore.getUser.PLEVEL ?? 0;
  const requiredLevel = to.meta.requiresPlevel ?? 0;

  if (userLevel < requiredLevel) {
    toastMessage('ACCESSO NEGATO - Il tuo ruolo non è sufficiente.', 'error');
    return false;
  }

  return true;
});

export default router;