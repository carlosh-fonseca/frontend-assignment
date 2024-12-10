import { NavLink } from "react-router-dom";
import { AddPhotoIcon } from "../../assets/icons/AddPhotoIcon";
import { HomeIcon } from "../../assets/icons/HomeIcon";
import { IconButton } from "../IconButton/IconButton";

export function Header() {
  return (
    <div className="sticky flex flex-row p-4 top-0 left-0 right-0 gap-4 bg-slate-400 w-screen h-16">
      <NavLink to={"/"}>
        <IconButton icon={<HomeIcon />} title="Feed" />
      </NavLink>
      <div className="title-wrapper grow text-center font-bold text-xl">
        App Title
      </div>
      <IconButton icon={<AddPhotoIcon />} title="Add Photo" />
      <NavLink to={"/my-albums"}>
        <IconButton icon={<AddPhotoIcon />} title="My Albums" />
      </NavLink>
    </div>
  );
}
