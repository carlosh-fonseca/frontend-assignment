import { NavLink } from 'react-router-dom';
import { AddPhoto } from '../../../views/addPhoto/AddPhoto';
import { AddPhotoIcon } from '../../assets/icons/AddPhotoIcon';
import { HomeIcon } from '../../assets/icons/HomeIcon';
import { PhotoAlbumsIcon } from '../../assets/icons/PhotoAlbumsIcon';
import { useModal } from '../../hooks/useModal';
import { IconButton } from '../IconButton/IconButton';

export function Header() {
  const { openModal } = useModal();
  const handleAddPhotoClick = () => {
    openModal({
      title: 'Add New Photo',
      content: <AddPhoto />,
    });
  };
  return (
    <div className="sticky flex flex-row p-4 top-0 left-0 right-0 gap-4 bg-slate-400 w-screen h-16">
      <NavLink to={'/'}>
        <IconButton icon={<HomeIcon />} title="Feed" />
      </NavLink>
      <div className="title-wrapper grow text-center font-bold text-xl">
        MyPhotoShoot
      </div>

      <IconButton
        icon={<AddPhotoIcon />}
        title="Add Photo"
        onClick={handleAddPhotoClick}
      />
      <NavLink to={'/users/1'}>
        <IconButton icon={<PhotoAlbumsIcon />} title="My Albums" />
      </NavLink>
    </div>
  );
}
