export const getUserId = state => state.user._id;
export const getUserName = state => state.user.name;
export const getUserEmail = state => state.user.email;
export const getUserBirthday = state => state.user.birthday;
export const getUserPhone = state => state.user.phone;
export const getUserCity = state => state.user.city;
export const getUserAvatar = state => state.user.avatarURL;
export const getUserPets = state => state.user.pets;
export const getUserIsLoading = state => state.user.isLoading;
export const getUserError = state => state.user.error;

/*   _id: null,
  name: '',
  email: '',
  birthday: '',
  phone: '',
  city: '',
  avatarURL: '',
  pets: [],
  isLoading: false,
  error: null, */
