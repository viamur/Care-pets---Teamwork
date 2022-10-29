import NoticeCategoryItem from 'components/NoticeCategoryItem/NoticeCategoryItem';
import s from './NoticesCategoriesList.module.scss';

const NoticesCategoriesList = () => {
  return (
    <ul className={s.list}>
      <NoticeCategoryItem />
      <NoticeCategoryItem />
      <NoticeCategoryItem />
      <NoticeCategoryItem />
      <NoticeCategoryItem />
    </ul>
  );
};

export default NoticesCategoriesList;
