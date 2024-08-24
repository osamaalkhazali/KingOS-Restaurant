import './App.css';
import './admin.css';
import AdminNavBar from './components/AdminNavbar'
import { Routes, Route  } from 'react-router-dom';
import FoodMenu from './pages/FoodMenu';
import AddItem from './pages/AddItem';
import TopBar from './components/TopBar';
import Footer from './components/Footer';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import Workers from './pages/Workers';
import AddWorker from './pages/AddWorker';
import EditWorker from './pages/EditWorker';
import Tables from './pages/Tables';
import AddTable from './pages/addTable';
import Orders from './pages/orders';
import EditTable from './pages/editTable';


function App() {
    return (
    <>
    <AdminNavBar/>
    <section className="dashboard">
        <TopBar/>
        <div className="dash-content">
            <div className='container'>
        <div className="overview">
                <Routes>
                    {/*Workers Routes */}
                    <Route element={<ProtectedRoute requiredPositions={["Manger" , "Worker"]}/>}  > 
                        <Route path='/' element={'home'} />
                        <Route path='FoodMenu' element={<FoodMenu/>} />
                        <Route path='Tables' element={<Tables/>} />
                        <Route path='Orders' element={<Orders/>} />
                    </Route>
                    {/*Mangers Routes */}
                    <Route element={<ProtectedRoute requiredPositions={["Manger" ]}/>}  > 
                        <Route path='addFoodItem' element={<AddItem/>} />
                        <Route path='workers' element={<Workers/>} />
                        <Route path='addWorker' element={<AddWorker/>} />
                        <Route path='workers/:id' element={<EditWorker/>} />
                        <Route path='addTable' element={<AddTable/>} />
                        <Route path='tables/:id' element={<EditTable/>} />
                    </Route>
                </Routes>
        </div>  
        </div>  
        </div>
    </section>
    <Footer/>
    

    </>
    );
}


export default App;



































/* <div class="boxes">
                    <div class="box box1">
                        <i class="uil uil-thumbs-up"></i>
                        <span class="text">Total Likes</span>
                        <span class="number">50,120</span>
                    </div>
                    <div class="box box2">
                        <i class="uil uil-comments"></i>
                        <span class="text">Comments</span>
                        <span class="number">20,120</span>
                    </div>
                    <div class="box box3">
                        <i class="uil uil-share"></i>
                        <span class="text">Total Share</span>
                        <span class="number">10,120</span>
                    </div>
                </div>
            </div>

            <div class="activity">
                <div class="title">
                    <i class="uil uil-clock-three"></i>
                    <span class="text">Recent Activity</span>
                </div>

                <div class="activity-data">
                    <div class="data names">
                        <span class="data-title">Name</span>
                        <span class="data-list">Prem Shahi</span>
                        <span class="data-list">Deepa Chand</span>
                        <span class="data-list">Manisha Chand</span>
                        <span class="data-list">Pratima Shahi</span>
                        <span class="data-list">Man Shahi</span>
                        <span class="data-list">Ganesh Chand</span>
                        <span class="data-list">Bikash Chand</span>
                    </div>
                    <div class="data email">
                        <span class="data-title">Email</span>
                        <span class="data-list">premshahi@gmail.com</span>
                        <span class="data-list">deepachand@gmail.com</span>
                        <span class="data-list">prakashhai@gmail.com</span>
                        <span class="data-list">manishachand@gmail.com</span>
                        <span class="data-list">pratimashhai@gmail.com</span>
                        <span class="data-list">manshahi@gmail.com</span>
                        <span class="data-list">ganeshchand@gmail.com</span>
                    </div>
                    <div class="data joined">
                        <span class="data-title">Joined</span>
                        <span class="data-list">2022-02-12</span>
                        <span class="data-list">2022-02-12</span>
                        <span class="data-list">2022-02-13</span>
                        <span class="data-list">2022-02-13</span>
                        <span class="data-list">2022-02-14</span>
                        <span class="data-list">2022-02-14</span>
                        <span class="data-list">2022-02-15</span>
                    </div>
                    <div class="data type">
                        <span class="data-title">Type</span>
                        <span class="data-list">New</span>
                        <span class="data-list">Member</span>
                        <span class="data-list">Member</span>
                        <span class="data-list">New</span>
                        <span class="data-list">Member</span>
                        <span class="data-list">New</span>
                        <span class="data-list">Member</span>
                    </div>
                    <div class="data status">
                        <span class="data-title">Status</span>
                        <span class="data-list">Liked</span>
                        <span class="data-list">Liked</span>
                        <span class="data-list">Liked</span>
                        <span class="data-list">Liked</span>
                        <span class="data-list">Liked</span>
                        <span class="data-list">Liked</span>
                        <span class="data-list">Liked</span>
                    </div>
                </div>
            </div> */