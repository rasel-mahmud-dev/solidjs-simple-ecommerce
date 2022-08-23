import Skeleton from "components/Skeleton/Skeleton";

const SkeletonProduct = () => {
  return (
    <Skeleton className="shadow-md flex justify-between flex-col items-center p-4 white-bg py-10">
      <Skeleton.Line className="h-24 w-full mx-auto" />
      <div class="mt-2">
        <Skeleton.Line className="h-2 w-8/12 mx-auto" />
        <Skeleton.Line className="h-2 w-8/12 mx-auto" />
        <Skeleton.Line className="h-2 w-6/12 mx-auto" />
        <Skeleton.Line className="h-2 w-7/12 mx-auto" />
        <Skeleton.Line className="h-7 w-24 mx-auto mt-3" />
      </div>
    </Skeleton>
  );
};

export default SkeletonProduct