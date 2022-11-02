const PET_DELETE = 'PET-DELETE'

let initialState = {
    pets: [{
        id: 1,
        name: 'Jack',
        dateBidthday: '02.02.2018',
        breed: 'JKKKKKK',
        comments: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
    },
    {
        id: 2,
        name: 'Sim',
        dateBidthday: '02.02.2018',
        breed: 'JKKKKKK',
        comments: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
    }]
};

const deletePetR = (state, action) => {
    let listPets = []
    state.pets.map((pet) => {
        if (pet.id !== action.id) {
            listPets.push(pet)
        }
    })
    return ({
        ...state,
        pets: [...listPets]
    })
};

const petsReducer = (state = initialState, action) => {
    switch (action.type) {
        case PET_DELETE: return deletePetR(state, action)
        default: return state
    }
};

export default petsReducer
export const deletePet = (id) => ({
    type:PET_DELETE,
    id
});
