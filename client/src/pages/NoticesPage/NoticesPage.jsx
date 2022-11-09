import { useState } from 'react';
import { useParams } from 'react-router-dom';
import NoticesCategoriesNav from 'components/NoticesCategoriesNav/NoticesCategoriesNav';
import NoticesSearch from 'components/NoticesSearch/NoticesSearch';
import NoticesCategoriesList from 'components/NoticesCategoriesList/NoticesCategoriesList';
import { useTranslation } from 'react-i18next';
import s from './NoticesPage.module.scss';

const NoticesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { categoryName } = useParams();
  const { t } = useTranslation();

  return (
    <div className={s.container}>
      <NoticesSearch
        setSearchQuery={setSearchQuery}
        title={t('titles.noticesPage')}
      />
      <NoticesCategoriesNav />
      <NoticesCategoriesList
        category={categoryName}
        searchQuery={searchQuery}
      />
    </div>
  );
};

export default NoticesPage;
