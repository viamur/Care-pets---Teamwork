import s from './OurFriendsPage.module.scss';
import axios from 'axios';

const OurFriendsPage = () => {
  const list = []
  axios.defaults.baseURL = 'http://localhost:3000/api/';

const fetchOurFriends = () => {
  return axios
    .get('friends')
    .then(response => list.push(response.data));
  // .then(response => console.log(response.data));
  };
  fetchOurFriends();
  console.log(list)
  
  return <>
    <h1>Our friend</h1>
    <ul>
      {/* {list.map(el => (
                <li><p>{el}</p></li>
      // <ImageGalleryItem
      //       key={image.id}
      //       id={image.id}
      //   webformatURL={image.webformatURL}
      //   largeImageURL={image.largeImageURL}
      //   setModalFoto={setModalFoto}
      //     />
    ))} */}
    <li><p>Hi</p></li>
    <li><p>Hi</p></li>
    <li><p>Hi</p></li>
    </ul></>;

};

export default OurFriendsPage;
