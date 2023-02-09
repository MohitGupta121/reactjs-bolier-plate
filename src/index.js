import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import ModalComponent from './components/Modal';
import CreateIndustry from './containers/Industry/createIndustry/CreateIndustry';
import { EditIndustry } from './containers/Industry/editIndustry/EditIndustry';
import { IndustryRegisrer } from './containers/Industry/industryRegistraton/IndustryRegisrer';
import { IndustryVerification } from './containers/Industry/industryVerification/IndustryVerification';
import { IndustryVerificationProgress } from './containers/Industry/industryVerificationProgress/IndustryVerificationprogress';
import { ViewIndustry } from './containers/Industry/viewIndustry/ViewIndustry';
import { ModalTesting } from './containers/ModalTesting/modalTesting';
import ForgetPassword from './containers/Users/userLogin/ForgetPassword';
import ResetPassword from './containers/Users/userLogin/ResettPassword';
import UserLogin from './containers/Users/userLogin/UserLogin';
import UserRegister from './containers/Users/userRegistration/UserRegister';
import ChangePassword from './containers/Users/userSettings/ChangePassword';
import MyProfile from './containers/Users/userSettings/myProfile/myProfile';
import UserKYC from './containers/Users/userSettings/userKYC/userKYC';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import store from './store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<App />}></Route>
          <Route exact path="/register" element={<UserRegister />}></Route>
          <Route exact path="/login" element={<UserLogin />}></Route>
          <Route
            exact
            path="/forgetpassword"
            element={<ForgetPassword />}
          ></Route>
          <Route
            exact
            path="/resetpassword"
            element={<ResetPassword />}
          ></Route>
          <Route
            exact
            path="/industryreg"
            element={<IndustryRegisrer />}
          ></Route>

          {/* changePwdFormik */}
          <Route
            exact
            path="/changepassword"
            element={<ChangePassword />}
          ></Route>
          <Route exact path="/myprofile" element={<MyProfile />}></Route>
          <Route exact path="/userkyc" element={<UserKYC />}></Route>

          {/* reset password
          <Route
            exact 
            path="/resetpassword"
            element={<ResetPassword />}
          ></Route> */}

          <Route
            exact
            path="/industryverification"
            element={<IndustryVerification />}
          ></Route>
          <Route
            exact
            path="/industryverificationprogress"
            element={<IndustryVerificationProgress />}
          ></Route>
          <Route
            exact
            path="/createindustry"
            element={<CreateIndustry />}
          ></Route>
          <Route exact path="/editindustry" element={<EditIndustry />}></Route>
          <Route exact path="/viewindustry" element={<ViewIndustry />}></Route>
          <Route exact path="/modaltesting" element={<ModalTesting />}></Route>
          <Route exact path="/modal" element={<ModalComponent />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
