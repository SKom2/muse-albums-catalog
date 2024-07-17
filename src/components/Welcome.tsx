import WelcomeImage from '@/assets/images/WelcomeImage.png';

const Welcome = () => {
  return (
    <div className="bg-screen rounded-2xl flex gap-2 flex-col justify-center items-center">
      <h1 className="title">Find your groove</h1>
      <h2 className="title-sm">Explore albums for every vibe</h2>
      <img className="w-full max-w-[412px]" src={WelcomeImage} alt="Welcome Image" />
      <p>Listen to albums on the go!</p>
    </div>
  );
};

export default Welcome;