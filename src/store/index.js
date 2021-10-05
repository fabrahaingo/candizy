import { createStore } from 'vuex'
import axios from 'axios'
import router from '../router'

const urlCandizy = axios.create({
    baseURL: 'http://localhost:3000'
})

export default createStore({
    state: {
        api: {
            urlCandizy: urlCandizy,
        },
        user: {
            id: -1,
            tokenCandilib: '',
            tokenCandizy: '',
            nomNaissance: '',
            prenom: '',
            email: '',
            adresse: '',
            portable: '',
            departement: '',
            codeNeph: '',
            preInscription: ''
        },
        data: {
            departements : []
        }
    },
    getters: {
        gettersDepartements (state) {
            return state.data.departements
        },
        gettersUserInfos (state) {
            return state.user
        }
    },
    mutations: {
        setDepartement(state, response){
            state.data.departements = []
            state.data.departements = response
            console.log('setDepartement :',response)
        },
        setInfoUser(state, response){
            console.log('setInfoUser :', response)
            state.user.id = response.userId
            state.user.tokenCandizy = response.token
            state.user.nomNaissance = response.nomNaissance
            state.user.prenom = response.prenom
            state.user.email = response.email
            state.user.portable = response.portable
            state.user.codeNeph = response.codeNeph
            state.user.departement = response.departement
            state.user.preInscription = response.preInscription
            urlCandizy.defaults.headers.common["Authorization"] = "Bearen " + response.token
            console.log(state.user)
        },
        setLogout(state){
            state.user.id = -1
            state.user.tokenCandizy = ''
            state.user.nomNaissance = ''
            state.user.prenom = ''
            state.user.email = ''
            state.user.portable = ''
            state.user.codeNeph = ''
            state.user.departement = ''
            state.user.preInscription = ''
            urlCandizy.defaults.headers.common["Authorization"] = ''
            router.push('/')
            console.log(state.user)
        }
    },
    actions: {
        async getDepartement({ commit }) {
        await this.state.api.urlCandizy
            .get('/api/candilib/departements')
            .then((response) => {
                commit('setDepartement', response.data.departements.departementsId)
                console.log('getDepartement :',response.data.departements.departementsId)
            })
            .catch((error) => console.error(error))
        },
        async registerNewCandidat({ dispatch }, candidat) {
            await this.state.api.urlCandizy
            .post('/api/auth/signup', candidat)
            .then((response) => {
                if(response.data.data.status == 400 ){
                    console.log(response.data.data)
                } else if(response.data.data.status == 401){
                    document.getElementById('errorEmail').classList.remove('opacity-0')
                    setTimeout(function(){
                        document.getElementById('errorEmail').classList.add('opacity-0')
                    },5000)
                    console.log(response.data.data)
                } else {
                    dispatch('loginCandidat', candidat)
                    console.log('registerNewCandidat :', response.data.data)
                }
            })
            .catch(error => console.log(error))
        },
        async loginCandidat({ commit }, candidat) {
            await this.state.api.urlCandizy
            .post('/api/auth/login', candidat)
            .then((response) => {
                commit('setInfoUser', response.data.data)
                router.push('/space')
                console.log('loginCandidat :', response.data.data)
            })
            .catch(error => {
                document.getElementById('errorLogin').classList.remove('opacity-0')
                setTimeout(function(){
                    document.getElementById('errorLogin').classList.add('opacity-0')
                },5000)
                console.log(error)
            })
        },
        logout({ commit }){
            commit('setLogout')
        },
        async preInscriptionCandidat({ commit }, candidat) {
            await this.state.api.urlCandizy
            .post('/api/candilib/pre-inscription', candidat)
            .then((response) => {
                commit('setPreInscriptionCandidat', response)
                console.log('setPreInscriptionCandidat :', response)
            })

        }
    },
})

