import Container from '../../components/Container/Container';
import s from './HomePage.module.scss';

const HomePage = () => {
  return (
    <section className={s.container}>
      <Container>
        <h1 className={s.title}>Take good care of your small pets</h1>
      </Container>
    </section>
  );
};

export default HomePage;
