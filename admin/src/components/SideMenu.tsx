import MenuContent from "./MenuContent";

const SideMenu = () => {
  return (
    <div className="hidden sm:flex w-[15rem] flex-col min-h-screen shadow z-10 mr-4 ring-1  ring-gray-200">
      <h2 className="text-gray-500 text-center text-2xl mt-4">The Spot</h2>
      <MenuContent />
      <hr className="h-5 text-gray-500 font-bold " />
    </div>
  );
};
export default SideMenu;
