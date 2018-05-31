import Vue from 'vue'
import Vuex from "vuex"
Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        token: null,
        username: null,
        uploadedImageSrc: null
    },
    getters:{

    },
    mutations:{
        userLogin(state, obj){
            state.token = obj.token;
            state.username = obj.username;
        },
        userLogout(state){
            state.token = null;
            state.username = null;
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