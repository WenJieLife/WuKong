import { createRouter, createWebHashHistory } from 'vue-router'
// import Home from '@/views/Home.vue'
import MagicMock from '@/views/MagicMock.vue'
import PerformanceAssessment from '@/views/Performance.vue'
// import UseCaseReactor from '@/views/UseCaseReactor.vue'
import UseCaseReactor from '@/views/caseManagement/case_design.vue'
import UseCaseLaunch from '@/views/caseLaunch/caseL.vue'
import WKResultsAnalysis from '@/views/results/result_of_chart.vue'
// import NavList from '@/views/NavList.vue'
import Dashboard from '@/views/dashboard/Dashboard.vue'
import { getUser } from "@/utils/lib/user";
const routes = [
  {
    path: "/",
    name: "Index",
    // redirect: '/',
    meta: {
      title: '首页'
    },
    component: () => import('@/views/Index.vue'),
    children: [
      {
        path: '/dashboard',
        name: 'WKDashboard',
        meta: {
          title: 'Dashboard'
        },
        component: Dashboard
      },
      {
        path: '/case_reactor',
        name: 'WKUseCaseReactor',
        meta: {
          title: '用例管理'
        },
        component: UseCaseReactor
      },
      {
        path: '/case_launch',
        name: 'WKUseCaseLaunch',
        meta: {
          title: '用例执行'
        },
        component: UseCaseLaunch
      },
      {
        path: '/performance_assessment',
        name: 'WKPerformanceAssessment',
        meta: {
          title: '性能测试'
        },
        component: PerformanceAssessment
      },
      {
        path: '/magic_mock',
        name: 'WKMagicMock',
        meta: {
          title: 'Mock'
        },
        component: MagicMock
      },
      {
        path: '/result_analysis',
        name: 'WKResultsAnalysis',
        meta: {
          title: '结果分析'
        },
        component: WKResultsAnalysis
      },
      {
        path: '/tools',
        name: 'WKTools',
        meta: {
          title: '工具箱'
        },
        component: () => import('../views/tools/tools.vue')
      },
      {
        path: '/account_management',
        name: 'WKAccount_Management',
        meta: {
          title: '账户管理'
        },
        component: () => import('../views/tools/tools.vue')
      },
      {
        path: '/sys_setting',
        name: 'WKSystemSetting',
        meta: {
          title: '系统设置'
        },
        component: () => import('../views/About.vue')
      },
      {
        path: '/about',
        name: 'WKAbout',
        meta: {
          title: '关于'
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      }]
  },
  {
    path: '/login',
    name: "Login",
    meta: {
      title: '登录'
    },
    component: () => import('@/views/login/Login.vue'),
    hidden: true
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
// token校验和重定向 to新页面 from上个页面 next重定向
router.beforeEach(function (to, from, next) {
  const vue_app_title = process.env.VUE_APP_TITLE || 'WuKong';
  // 刷新标题为路由名称
  if (to.meta.title) {
    document.title = to.meta.title + ' - ' + vue_app_title
  }
  const user = getUser()
  if (user.token === "" && user.username === "" && to.path !== "/login") {
    next({ path: '/login' });
  } else {
    next()
  }
});

export default router
