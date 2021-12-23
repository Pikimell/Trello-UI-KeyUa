import VueRouter from "vue-router";

// import pages
import MainPage from "../pages/MainPage";
import Authorization from "../pages/Authorization";

export default new VueRouter({
    mode:'history',
    routes:[
        {
            path:"/trello_page",
            name:'trello',
            component: MainPage
        },
        {
            path:"/sign-in",
            name:"signin",
            component: Authorization
        },
        {
            path: '*',
            redirect: {name: 'signin'}
        }
    ]
})