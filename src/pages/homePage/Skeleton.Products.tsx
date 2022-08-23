
import SkeletonProduct from './Skeleton.Product';


function SkeletonProducts() {
  return new Array(15).fill(0).map((item, index) => (
            <SkeletonProduct />
          )
     
  )
}

export default SkeletonProducts