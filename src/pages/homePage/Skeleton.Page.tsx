import SkeletonProducts from './Skeleton.Products';
import SkeletonSidebar from './SkeletonSidebar';



const SkeletonPage = () => {
  return (
    <div class="max-w-screen-xl mx-auto px-4">
      <div class="hidden md:grid grid-cols-12 ">
          <SkeletonSidebar />
        
        <div class="col-span-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
            <SkeletonProducts /> 
        </div>
      </div>
    </div>
  );
};

export default SkeletonPage;
