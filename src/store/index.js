import { createStore } from 'vuex'
import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://beta.interieur.gouv.fr/candilib/api/v2'
})

export default createStore({
    state: {
        api: {
            url: instance
        },
        user: {
            id: -1,
            token: '',
            firstName: '',
            lastName: '',
            email: '',
            address: '',
            mobile: '',
        },
        data: {
            departements : []
        }
    },
    getters: {
        gettersDepartement (state) {
            return state.data.departements
        }
    },
    mutations: {
        setDepartement(state, response){
            state.data.departements = []
            console.log('setDepartement :',response)
        },
        setInfoUser(state, response){
            console.log('setInfoUser :', response)
        },
    },
    actions: {
        async getDepartement({ commit }) {
        await this.state.api.url
            .get('/public/departements')
            .then((response) => {
                commit('setDepartement', response)
                console.log('getDepartement :',response)
            })
            .catch((error) => console.error(error))
        },
        async postNewCandidat({ commit }, candidat) {
            await this.state.api.url
            .post('/candidat/preinscription', candidat)
            .then((response) => {
                commit('setInfoUser', response)
                console.log('postNewCandidat :',response)
            })
        }
    },
    modules: {
    }
})

