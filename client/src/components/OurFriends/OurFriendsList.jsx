import { useTranslation } from 'react-i18next';
import s from './OurFriendsList.module.scss';

const OurFriendsList = ({ friends }) => {
  const { t } = useTranslation();

  return (
    <ul className={s.list}>
      {friends &&
        friends.map(friend => (
          <li key={friend._id} className={s.card}>
            <h2 className={s.cardTitle}>{friend.title}</h2>
            <div className={s.iconDescriptionWrapper}>
              <img
                src={`https://pet-support.herokuapp.com/${friend.icon}`}
                className={s.icon}
                alt="Our Friend Icon"
              />
              <ul className={s.discriptionList}>
                <li className={s.discriptionEl}>
                  <div className={s.time}>
                    <p className={s.timeHoverDiscription}>
                      {t('friendsPage.time')}: <br></br>
                      {friend.time}
                    </p>
                    <div className={s.timeOverlay}>
                      <p className={s.timeDiscription}>MN {friend.time}</p>
                      <p className={s.timeDiscription}>TU {friend.time}</p>
                      <p className={s.timeDiscription}>WE {friend.time}</p>
                      <p className={s.timeDiscription}>TH {friend.time}</p>
                      <p className={s.timeDiscription}>FR {friend.time}</p>
                      <p className={s.timeDiscription}>SA {friend.time}</p>
                      <p className={s.timeDiscription}>SU {friend.time}</p>
                    </div>
                  </div>
                </li>

                <li className={s.discriptionEl}>
                  <p className={s.discription}>
                    {t('friendsPage.adress')}: <br></br> {friend.adress}
                  </p>
                </li>
                <li className={s.discriptionEl}>
                  <p className={s.discription}>{t('friendsPage.email')}:</p>
                  <a href={`mailto:${friend.email}`} className={s.discription}>
                    {friend.email}
                  </a>
                </li>
                <li className={s.discriptionEl}>
                  <p className={s.discription}>{t('friendsPage.phone')}:</p>
                  <a href={`tel:${friend.phone}`} className={s.discription}>
                    {friend.phone}
                  </a>
                </li>
              </ul>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default OurFriendsList;
