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
                dispatch('loginCandidat', candidat)
                console.log('registerNewCandidat :', response.data.data)
            })
        },
        async loginCandidat({ commit }, candidat) {
            await this.state.api.urlCandizy
            .post('/api/auth/login', candidat)
            .then((response) => {
                commit('setInfoUser', response.data.data)
                router.push('/space')
                console.log('loginCandidat :', response.data.data)
            })
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

