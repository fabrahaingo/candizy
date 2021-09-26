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
    mutations: {
        setDepartement(state, response){
            state.data.departements = []
            console.log(response)
        }
    },
    actions: {
        async getDepartement({ commit }) {
            console.log(commit)
            console.log(this.state.api.url)
        await this.state.api.url
            .get('/public/departements')
            .then((response) => {
                commit('setDepartement', response)
                console.log(response)
            })
            .catch((error) => console.error(error))
        }
    },
    modules: {
    }
})

