import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/Home'
import Dictionary from '@/components/Dictionary/Dictionary.vue'
import Hospital from '@/components/Hospital/Hospital.vue'
import Task from '@/components/Task/Task.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/dictionary',
          name: 'Dictionary',
          component: Dictionary
        },
        {
          path: '/hospital',
          name: 'Hospital',
          component: Hospital
        },
        {
          path: '/task',
          name: 'Task',
          component: Task
        }
      ]
    }

  ]
})
