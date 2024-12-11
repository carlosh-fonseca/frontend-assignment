export function Skeleton() {
  return (
    <div className="border shadow rounded-md p-4 mx-auto w-2/4 md:w-2/12 aspect-square">
      <div className="animate-pulse w-full h-full flex space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="h-3/4 bg-slate-200 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-4 bg-slate-200 rounded col-span-1"></div>
            </div>
            <div className="h-4 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const ListSkeleton = ({
  numberElements,
}: {
  numberElements: number;
}) => {
  return (
    <>
      {Array(numberElements)
        .fill(1)
        .map((_, index) => (
          <Skeleton key={index} />
        ))}
    </>
  );
};
