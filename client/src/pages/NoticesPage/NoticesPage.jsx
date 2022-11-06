import { useState } from 'react';
import { useParams } from 'react-router-dom';
import NoticesCategoriesNav from 'components/NoticesCategoriesNav/NoticesCategoriesNav';
import NoticesSearch from 'components/NoticesSearch/NoticesSearch';
import Container from 'components/Container/Container';
import NoticesCategoriesList from 'components/NoticesCategoriesList/NoticesCategoriesList';

const NoticesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { categoryName } = useParams();

  return (
    <Container>
      <NoticesSearch
        setSearchQuery={setSearchQuery}
        title="Find your favorite pet"
      />
      <NoticesCategoriesNav />
      <NoticesCategoriesList
        category={categoryName}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </Container>
  );
};

export default NoticesPage;
