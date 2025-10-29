import { LogoContainer } from "../_components/logoContainer";
import { SideBarButtons } from "../_components/sideBarButtons";

export const SideBar = ({ background, setBackground }) => {
  return (
    <div className="bg-[#ffffff] h-full w-2xs flex py-9 px-5 flex-col gap-10">
      <LogoContainer />
      <SideBarButtons background={background} setBackground={setBackground} />
    </div>
  );
};
