import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Index from '../components/Index.vue'
import Home from '../components/Home.vue'

// 标签管理
import Query from '../components/labelManagement/Query.vue'
import Classify from '../components/labelManagement/Classify.vue'
import Additional from '../components/labelManagement/Additional.vue'
import BuildSelf from '../components/labelManagement/BuildSelf.vue'
// 详情
import Detail from '../components/labelManagement/Detail.vue'
// 修改
import Modify from '../components/labelManagement/Modify.vue'
// 审核
import Verify from '../components/labelManagement/Verify.vue'

// 人员管理
import Inquiry from '../components/personnelManagement/Inquiry.vue'
// 系统管理
import User from '../components/systemManagement/User.vue'
import Role from '../components/systemManagement/Role.vue'
import Collection from '../components/systemManagement/Collection.vue'
import Download from '../components/systemManagement/Download.vue'
import Hide from '../components/systemManagement/Hide.vue'
// 群组管理
import Create from '../components/groupManagement/Create.vue'
import Polling from '../components/groupManagement/Polling.vue'
import Update from '../components/groupManagement/Update.vue'
import See from '../components/groupManagement/See.vue'
// 策略管理
import Kanban from '../components/strategicManagement/Kanban.vue'
import Found from '../components/strategicManagement/Found.vue'
import Check from '../components/strategicManagement/Check.vue'
// 画像
import Portrait from '@/components/portrait/index.vue'

import StrategyCreate from '@/components/strategy/create.vue'
import StrategyExamine from '@/components/strategy/examine.vue'
import StrategyQuery from '@/components/strategy/query.vue'
import StrategySee from '@/components/strategy/see.vue'
import StrategyTemplatesView from '@/components/strategy/templatesView.vue'
import StrategyUpdate from '@/components/strategy/update.vue'
import StrategyReportForm from '@/components/strategy/reportForm.vue'

import Error from '../components/error.vue'

// 角色看板
import roleBoard from '../components/roleBoard/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/error',
    name: 'error',
    component: Error
  },
  {
    path: '/index',
    name: 'index',
    redirect: '/home',
    component: Index,
    children: [
      // 标签管理
      { path: '/labelManagement/query', name: 'query', component: Query },
      { path: '/labelManagement/classify', name: 'classify', component: Classify },
      { path: '/labelManagement/additional', name: 'additional', component: Additional },
      { path: '/labelManagement/detail', name: 'detail', component: Detail },
      { path: '/labelManagement/modify', name: 'modify', component: Modify },
      { path: '/labelManagement/verify', name: 'verify', component: Verify },
      { path: '/labelManagement/buildSelf', name: 'buildSelf', component: BuildSelf },
      { path: '/home', name: 'home', component: Home },
      // 系统管理
      { path: '/systemManagement/user', name: 'user', component: User },
      { path: '/systemManagement/role', name: 'role', component: Role },
      { path: '/systemManagement/collection', name: 'collection', component: Collection },
      { path: '/systemManagement/download', name: 'download', component: Download },
      { path: '/systemManagement/hide', name: 'hide', component: Hide },
      // 人员管理
      { path: '/personnelManagement/inquiry', name: 'inquiry', component: Inquiry },
      // 群组管理
      { path: '/groupManagement/create', name: 'create', component: Create },
      { path: '/groupManagement/polling', name: 'polling', component: Polling },
      { path: '/groupManagement/update', name: 'Update', component: Update },
      { path: '/groupManagement/see', name: 'See', component: See },
      // 策略管理
      { path: '/strategicManagement/check', name: 'check', component: Check },
      { path: '/strategicManagement/found', name: 'found', component: Found },
      { path: '/strategicManagement/kanban', name: 'kanban', component: Kanban },
      // 画像
      { path: '/portrait', name: 'kanban', component: Portrait },
      // 策略
      { path: '/strategy/create', name: 'StrategyCreate', component: StrategyCreate },
      { path: '/strategy/examine', name: 'StrategyExamine', component: StrategyExamine },
      { path: '/strategy/query', name: 'StrategyQuery', component: StrategyQuery },
      { path: '/strategy/see', name: 'StrategySee', component: StrategySee },
      { path: '/strategy/TemplatesView', name: 'StrategyTemplatesView', component: StrategyTemplatesView },
      { path: '/strategy/Update', name: 'StrategyUpdate', component: StrategyUpdate },
      { path: '/strategy/reportForm', name: 'StrategyReportForm', component: StrategyReportForm },
      // 角色看板
      { path: '/roleBoard', name: 'roleBoard', component: roleBoard }
    ]
  }
  // },
  // {
  //   path: '/tagquery',
  //   name: 'tagquery',
  //   component: TagQuery
  // }
]

const router = new VueRouter({
  mode: 'hash',
  routes,
  scrollBehavior: () => {
    history.pushState(null, null, document.URL)
  }
})

export default router
