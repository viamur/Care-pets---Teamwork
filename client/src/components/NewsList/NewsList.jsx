import { useTranslation } from 'react-i18next';
import s from './NewsList.module.scss';

const NewsList = ({ news }) => {
  const { t } = useTranslation();

  return (
    <ul className={s.list}>
      {news &&
        news.map(el => {
          const { title, text, date, _id, link } = el;

          return (
            <li className={s.item} key={_id}>
              <h3 className={s.subtitle}>{title}</h3>
              <p className={s.text}>{text}</p>
              <div className={s.addData}>
                <p className={s.date}>{date}</p>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={s.link}
                >
                  {t('newsPage.more')}
                </a>
              </div>
            </li>
          );
        })}
    </ul>
  );
};

export default NewsList;
