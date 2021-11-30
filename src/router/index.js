import VueRouter from "vue-router";

// import pages
import MainPage from "../pages/MainPage";
import Authorization from "../pages/Authorization";

export default new VueRouter({
    routes:[
        {
            path:"/trello_page",
            component: MainPage
        },
        {
            path:"/authorization",
            component: Authorization
        }
    ]
})