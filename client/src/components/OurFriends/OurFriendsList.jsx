import s from './OurFriendsList.module.scss';

const OurFriendsList = ({ friends }) => {
  return (
      <ul className={s.list}>
        {friends.map(friend => (
          <li key={friend._id} className={s.card}>
            <h2 className={s.cardTitle}>{friend.title}</h2>
            <div className={s.iconDescriptionWrapper}>
              <img src={friend.icon} className={s.icon} alt="Our Friend Icon" />
              <ul className={s.discriptionList}>
                <li className={s.discriptionEl}>
                    <div className={s.time}>
                      <p className={s.discription}>Time:</p>
                      <p className={s.discription}>{friend.time}</p>
                      <div className={s.timeOverlay}>
                        <p>MN {friend.time}</p>
                        <p>TU {friend.time}</p>
                        <p>WE {friend.time}</p>
                        <p>TH {friend.time}</p>
                        <p>FR {friend.time}</p>
                        <p>SA {friend.time}</p>
                        <p>SU {friend.time}</p>
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