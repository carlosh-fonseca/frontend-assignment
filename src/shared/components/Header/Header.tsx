import { NavLink } from "react-router-dom";
import { Button } from "../Button/Button";

export function Header() {
  return (
    <div className="sticky flex flex-row p-4 top-0 left-0 right-0 gap-4 bg-slate-400 w-screen h-16">
      <NavLink to={"/"}>
        <Button className="flex-none">Feed</Button>
      </NavLink>
      <div className="title-wrapper grow text-center font-bold text-xl">
        App Title
      </div>
      <Button className="flex-none">Add Photo</Button>
      <NavLink to={"/my-albums"}>
        <Button className="flex-none">My Albums</Button>
      </NavLink>
    </div>
  );
}
