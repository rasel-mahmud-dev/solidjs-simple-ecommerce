import { Outlet, useLocation } from "@solidjs/router";

const Dashboard = () => {

    const location = useLocation()

    console.log(location);
    

  return (
    <div>
      <div class="max-w-screen-xl mx-auto px-4 items-center">
          <div class="">

            <div class="hidden md:block bg-gray-500 h-screen fixed sidebar_top w-60">
                <h1>Sidebar</h1>
            </div>


            <div class="ml-0 md:ml-60 pl-4">
                <Outlet/>
            </div>

          </div>
        
      </div>
    </div>
  );
};

export default Dashboard;
