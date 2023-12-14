import LoginButton from './Login';
import styles from '../css/LandingPage.module.css';

function LandingPage() {
  return (
    <>
      <main className={styles.LandingPageGridContainer}>

        <div className={styles.LandingPageLogoContainer}>
          
          <h1 className={styles.LandingPageH1}>
            WWYR
          </h1>

          {/* https://unsplash.com/photos/wMkaMXTJjlQ Samuel Regan-Asante */}
          <img 
            className={styles.LandingPageImg} 
            src="img/hero-image.jpg" 
            alt="picture of variety of movies" />

          <p className={styles.LandingPageHeroText}>
            Discover Trusted Movie Recommendations
          </p>

        </div>

        <div className={styles.LandingPageExistingUserContainer}>

          <p className={styles.LandingPageExistingUserText}>Welcome Back!</p>

          <LoginButton />
          
        </div>
      </main>
    </>
  );
}

export default LandingPage;