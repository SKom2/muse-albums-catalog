import WelcomeImage from '@/assets/images/WelcomeImage.png';

const Welcome = () => {
  return (
    <div className="bg-screen-default flex flex-col justify-center rounded-2xl p-6 max-md:hidden text-content-primary">
      <div className="flex gap-2 flex-col justify-center items-center">
        <h1 className="heading">Find your groove</h1>
        <p className="subheading">Explore albums for every vibe</p>
        <img src={WelcomeImage} alt="Welcome Image" />
        <p className="caption">Listen to albums on the go!</p>
      </div>
    </div>
  );
};

export default Welcome;