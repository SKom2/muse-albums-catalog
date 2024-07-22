import WelcomeImage from '@/assets/images/WelcomeImage.png';

const Welcome = () => {
  return (
    <div className="bg-screen h-full flex flex-col justify-center rounded-2xl p-6 max-md:hidden">
      <div className="flex gap-2 flex-col justify-center items-center">
        <h1 className="title">Find your groove</h1>
        <h2 className="title-sm ">Explore albums for every vibe</h2>
        <img src={WelcomeImage} alt="Welcome Image" />
        <p className="main-text">Listen to albums on the go!</p>
      </div>
    </div>
  );
};

export default Welcome;