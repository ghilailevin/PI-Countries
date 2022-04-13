import {GET_ALL_COUNTRIES, GET_COUNTRY_DETAIL, GET_COUNTRY_NAME, ORDER_BY} from '../actions/actions.js'

const initialState = {
    allCountries: [],
    countryDetail:{},
    sortedCountries: []
}

export default function rootReducer(state = initialState, action){
    switch (action.type) {
        case GET_ALL_COUNTRIES:
            return{
                ...state,
                allCountries: action.payload
            }
        case GET_COUNTRY_DETAIL:
            return{
                ...state,
                countryDetail: action.payload
            }
        case GET_COUNTRY_NAME:
            return{
                ...state,
                allCountries: action.payload
            }
        case ORDER_BY:

            let sendOrderAndFilter;

            if (action.payload.continent && !action.payload.order && !action.payload.tourism) {

                sendOrderAndFilter = state.allCountries.filter(country => country.continent === action.payload.continent)

            } else if (!action.payload.continent && action.payload.order && !action.payload.tourism) {

                switch (action.payload.order) {
                    case 'name ASC':
                        sendOrderAndFilter = state.allCountries.sort((a,b) => {
                            if (a.name > b.name) return 1;
                            if(a.name < b.name) return -1;
                            return 0;
                        }) 
                        break;

                    case 'name DESC':
                        sendOrderAndFilter = state.allCountries.sort((a,b) => {
                            if (a.name > b.name) return -1;
                            if(a.name < b.name) return 1;
                            return 0;
                        })
                        break;
                        
                        case 'population ASC':
                            sendOrderAndFilter = state.allCountries.sort((a,b) => {
                            return a.population - b.population
                        })
                        break;

                    case 'population DESC':
                        sendOrderAndFilter = state.allCountries.sort((a,b) => {
                            return b.population - a.population
                        })
                        break;
        
                    default: 
                    break;
                }

            } else if (!action.payload.continent && !action.payload.order && action.payload.tourism) {
                
                sendOrderAndFilter = state.allCountries.filter(country => country.activities.some((tour) => tour.name === action.payload.tourism));

            } else if (action.payload.continent && action.payload.order && !action.payload.tourism) {

                switch (action.payload.order) {
                    case 'name ASC':
                        let firstFilterContNA = state.allCountries.filter(country => country.continent === action.payload.continent);

                        sendOrderAndFilter = firstFilterContNA.sort((a,b) => {
                            if (a.name > b.name) return 1;
                            if(a.name < b.name) return -1;
                            return 0;
                        })
                        break; 
                        
                    case 'name DESC':
                        let firstFilterContND = state.allCountries.filter(country => country.continent === action.payload.continent);

                        sendOrderAndFilter = firstFilterContND.sort((a,b) => {
                            if (a.name > b.name) return -1;
                            if(a.name < b.name) return 1;
                            return 0;
                        })
                        break;
                        
                        
                    case 'population ASC':
                        let firstFilterContPA = state.allCountries.filter(country => country.continent === action.payload.continent);

                        sendOrderAndFilter = firstFilterContPA.sort((a,b) => {
                            return a.population - b.population
                        })
                        break;

                    case 'population DESC':
                        let firstFilterContPD = state.allCountries.filter(country => country.continent === action.payload.continent);

                        sendOrderAndFilter = firstFilterContPD.sort((a,b) => {
                            return b.population - a.population
                        })
                        break;
                        
                    default: 
                    break;
                }

            } else if (!action.payload.continent && action.payload.order && action.payload.tourism) {

                switch (action.payload.order) {
                    case 'name ASC':
                        let firstFilterTourNA = state.allCountries.filter(country => country.activities.some((tour) => tour.name === action.payload.tourism));

                        sendOrderAndFilter = firstFilterTourNA.sort((a,b) => {
                            if (a.name > b.name) return 1;
                            if(a.name < b.name) return -1;
                            return 0;
                        })
                        break; 
                        
                    case 'name DESC':
                        let firstFilterTourND = state.allCountries.filter(country => country.activities.some((tour) => tour.name === action.payload.tourism));

                        sendOrderAndFilter = firstFilterTourND.sort((a,b) => {
                            if (a.name > b.name) return -1;
                            if(a.name < b.name) return 1;
                            return 0;
                        })
                        break;
                        
                        
                    case 'population ASC':
                        let firstFilterTourPA = state.allCountries.filter(country => country.activities.some((tour) => tour.name === action.payload.tourism));

                        sendOrderAndFilter = firstFilterTourPA.sort((a,b) => {
                            return a.population - b.population
                        })
                        break;

                    case 'population DESC':
                        let firstFilterTourPD = state.allCountries.filter(country => country.activities.some((tour) => tour.name === action.payload.tourism));

                        sendOrderAndFilter = firstFilterTourPD.sort((a,b) => {
                            return b.population - a.population
                        })
                        break;
                        
                    default: 
                    break;
                }
            } else {
                sendOrderAndFilter = []
            }

            return {
                ...state,
                sortedCountries: sendOrderAndFilter
            }

        default: 
            return state;
    }
}