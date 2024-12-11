import { useAlert } from '../../hooks/useAlert';

export function Alert() {
  const { isOpen, message, type } = useAlert();
  const bgColor = type === 'error' ? 'bg-red-200' : 'bg-green-200';
  const textColor = type === 'error' ? 'text-red-800' : 'text-green-800';

  if (!isOpen) return null;
  return (
    <div className={`absolute flex alert alert-${type} w-full ${bgColor} h-12`}>
      <p className={`text-center font-bold m-auto ${textColor}`}>{message}</p>
    </div>
  );
}
