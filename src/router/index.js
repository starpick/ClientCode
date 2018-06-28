import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '@/components/LoginPage'
import HomePage from '@/components/HomePage'
import UploadPage from '@/components/UploadPage'
import UploadFromAlbum from '@/components/UploadFromAlbum'
import UploadFromCam from '@/components/UploadFromCam'
import UploadInfo from '@/components/UploadInfo'
import UploadShare from '@/components/UploadShare'
import PickEntryDetail from '@/components/PickEntryDetail'
import PickRanking from '@/components/PickRanking'
import Setting from '@/components/Setting'
import $ from 'jquery'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LoginPage',
      component: LoginPage
    },{
      path: '/home',
      name: 'HomePage',
      component: HomePage
        
    }, {
      path: '/upload',
      name: 'UploadPage',
      component: UploadPage

    }, {
      path: '/upload/cam',
      name: 'UploadFromCam',
      component: UploadFromCam

    }, {
      path: '/upload/album',
      name: 'UploadFromAlbum',
      component: UploadFromAlbum

    }, {
      path: '/upload/info',
      name: 'UploadInfo',
      component: UploadInfo

    }, {
      path: '/upload/share',
      name: 'UploadShare',
      component: UploadShare

    }, {
      path: '/pickentry/',
      name: 'PickEntryDetail',
      component: PickEntryDetail

    }, {
      path: '/pickranking/',
      name: 'PickRanking',
      component: PickRanking
    }, {
      path: '/setting/',
      name: 'Setting',
      component: Setting
    }
  ]
})
