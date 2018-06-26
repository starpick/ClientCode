import Vue from 'vue'
import Vuex from "vuex"
Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        token: null,
        username: null,
        email: null,
        uploadedImageSrc: null,
        id: null
    },
    getters:{

    },
    mutations:{
        userLogin(state, obj){
            state.token = obj.token;
            state.username = obj.username;
            state.id = obj.id;
            state.email = obj.email;

            window.localStorage.username = obj.username;
            window.localStorage.email = obj.email;
            window.localStorage.id = obj.id;
            window.localStorage.token = obj.token;
        },
        userLogout(state){
            state.token = null;
            state.username = null;
            state.id = null;
            state.email = null;

            window.localStorage.removeItem('username');
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('id');
            
        },
        addUploadImageSrcs(state, src){
            state.uploadedImageSrc = (src);
        },
        clearUploadImageSrcs(state) {
            // state.uploadedImageSrcs.splice(0,state.uploadedImageSrcs.length);
            state.uploadedImageSrc = null;
        }

    },
    actions:{

    },
    modules:{

    }
});

export default store;