import s from './OurFriendsList.module.scss';

const OurFriendsList = ({ friends }) => {
  return (
      <ul className={s.list}>
        {friends.map(friend => (
          <li key={friend._id} className={s.card}>
            <h2 className={s.cardTitle}>{friend.title}</h2>
            <div className={s.iconDescriptionWrapper}>
              <img src={`https://pet-support.herokuapp.com/${friend.icon}`} className={s.icon} alt="Our Friend Icon" />
              <ul className={s.discriptionList}>
                <li className={s.discriptionEl}>
                    <div className={s.time}>
                      <p className={s.discription}>Time:</p>
                      <p className={s.discription}>{friend.time}</p>
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
                  <p className={s.discription}>Adress:</p>
                  <p className={s.discription}>{friend.adress}</p>
                </li>
                <li className={s.discriptionEl}>
                  <p className={s.discription}>Email:</p>
                  <p className={s.discription}>{friend.email}</p>
                </li>
                <li className={s.discriptionEl}>
                  <p className={s.discription}>Phone:</p>
                  <p className={s.discription}>{friend.phone}</p>
                </li>
              </ul>
            </div>
          </li>
        ))}
      </ul>
  );
};

export default OurFriendsList;