import WelcomeImage from '@/assets/images/WelcomeImage.png';

const Welcome = () => {
  return (
    <div className="bg-screen rounded-2xl flex gap-2 flex-col justify-center items-center max-md:hidden">
      <h1 className="title">Find your groove</h1>
      <h2 className="title-sm ">Explore albums for every vibe</h2>
      <img src={WelcomeImage} alt="Welcome Image" />
      <p>Listen to albums on the go!</p>
    </div>
  );
};

export default Welcome;