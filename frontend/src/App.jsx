import React from 'react'
import {BrowserRouter,Routes,Route, Navigate} from "react-router";

import Register from './pages/Register';
import Login from './pages/Login';

import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoute from './routes/PublicRoute';


import Users from './pages/admin/User';

import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLayout from './layouts/AdminLayout';
import Transactions from './pages/admin/Transaction';
import Categories from './pages/admin/Categories';
import Reports from './pages/admin/Reports';
import Setting from './pages/admin/Setting';


import UserLayout from './layouts/UserLayout';
import Dashboard from './pages/user/Dashboard';
import AddTransaction from './pages/user/AddTransaction';
import UserTransaction from './pages/user/UserTransactions';

const App = () => {
  return (
    <BrowserRouter>
      {/* <ToastContainer /> */}


        <Routes>
            <Route element={<MainLayout />}>

              {/* public route */}
              <Route element={<PublicRoute />}>
                  <Route path="/register" element={<Register />}/>
                  <Route path="/login" element={<Login />}/>
              </Route>
            
              {/* Protected Routes  */}
              <Route element={<ProtectedRoute />}>
                
                  {/* admin */}
                  <Route path='/admin/user' element={<Users />}/>
                  <Route path='/admin'element={<AdminLayout />}/>
                  <Route path='/admin/dashboard' element={<AdminDashboard />}/>
               
                  <Route path='/transaction' element={<Transactions />}/>
                  <Route path='/category' element={<Categories />}/>
                  <Route path='/reports' element={<Reports />}/>
                  <Route path='/setting' element={<Setting />}/>

                  {/* userside */}

                  <Route path='/user/layout' element={<UserLayout />}/>
                  <Route path='/user/dashboard' element={<Dashboard />}/>
                  <Route path='/user/addtransaction' element={<AddTransaction />}/>
                  <Route path='/user/transaction' element={<UserTransaction />}/>

              </Route>

              {/* Default Route */}
               <Route path="*" element={<Navigate to="/login" />} />

            </Route>

        </Routes>
    </BrowserRouter>
  )
}

export default App