import { useState } from 'react';
import { useParams } from 'react-router-dom';
import NoticesCategoriesNav from 'components/NoticesCategoriesNav/NoticesCategoriesNav';
import NoticesSearch from 'components/NoticesSearch/NoticesSearch';
import Container from 'components/Container/Container';
import NoticesCategoriesList from 'components/NoticesCategoriesList/NoticesCategoriesList';

const NoticesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showButton, setShowButton] = useState(true);
  const { categoryName } = useParams();

  return (
    <Container>
      <NoticesSearch
        setSearchQuery={setSearchQuery}
        title="Find your favorite pet"
      />
      <NoticesCategoriesNav showButton={showButton} />
      <NoticesCategoriesList
        category={categoryName}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setShowButton={setShowButton}
      />
    </Container>
  );
};

export default NoticesPage;
