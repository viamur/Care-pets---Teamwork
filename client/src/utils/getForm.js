export const getFormName = (formName, userStore) => { 
    switch(formName){
        case 'Name': return userStore.name
        case 'Email': return userStore.email
        case 'Phone': return userStore.phone
        case 'Birthday': return userStore.birthday
        case 'City': return userStore.city
        default: return 'none'
    }
};

export const getFormObj = (formName,currentValue) => { 
    switch(formName){
    case 'Name': return {name:currentValue}
    case 'Email': return {email:currentValue}
    case 'Phone':return {phone:currentValue}
    case 'Birthday': return {birthday:currentValue}
    case 'City': return {city:currentValue}
    default: return 'none'
    }
};
