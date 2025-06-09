import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@mdi/font/css/materialdesignicons.min.css";
import "./css/rtl/core.css";
import "./css/rtl/theme-default.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import crmStore, { persistor } from "./Utils/crmStore";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Unauthorized from "./Components/LoginRegistration/Unauthorized";
import PrivateRoute from "./Private/PrivateRoute";
import Login from "./Components/LoginRegistration/Login";
import AppLayout from "./ui/AppLayout";
import NotFound from "./Components/LoginRegistration/NotFound";

import SystemAdmin from "./Components/system admin/SystemAdmin";
import CompanyForm from "./Components/system admin/Forms/CompanyForm";
import BankInfoForm from "./Components/system admin/Forms/BankInfoForm";
import BankInfo from "./Components/system admin/BankInfo";
import BankInfoDetails from "./Components/system admin/BankInfoDetails";
import CompanyInfo from "./Components/system admin/CompanyInfo";
import CompanyInfoDetails from "./Components/system admin/CompanyInfoDetails";

import Employee from "./Components/EmployeeManagement/Employee";
import EmployeeProfile from "./Components/EmployeeManagement/EmployeeProfile";
import EmployeeView from "./Components/EmployeeManagement/EmployeeView";

import DeadTable from "./Components/DeadTable/DeadTable";
import EnquiryTable from "./Components/enquiryBucket/EnquiryTable";
import AddEnquiry from "./Components/enquiryBucket/AddEnquiry";
import SourceType from "./Components/enquiryBucket/SourceType";

import Allotment from "./Components/BookingForm/allotment";
import BookingFormPDF from "./Components/BookingForm/BookingFormPDF";
import Booking from "./Components/BookingForm/Booking";

import PaymentReciept from "./Components/PaymentReceipt/PaymentReciept";

import Report from "./Components/Report/Report";

import Customer from "./Components/Customer/Customer";
import AddCustomerForm from "./Components/Customer/AddCustomerForm";

import Quotation from "./Components/FollowUp/Quotation";
import Visit from "./Components/FollowUp/Visit";
import PreSalesEnquiry from "./Components/FollowUp/PreSalesEnquiry/PreSalesEnquiry";
import AddPreSalesEnquiry from "./Components/FollowUp/PreSalesEnquiry/AddPreSalesEnquiry";
import FollowUp from "./Components/FollowUp/FollowUp";
import CallReport from "./Components/FollowUp/CallReport";
import AccountProfileview from "./Components/FollowUp/AccountProfileview";
import Behaviour from "./Components/FollowUp/Behaviour";
import History from "./Components/FollowUp/History";
import GeneratorPersona from "./Components/FollowUp/GeneratorPersona";
import Productviews from "./Components/FollowUp/Productviews";
import QuoteDetail from "./Components/FollowUp/QuoteDetail";
import VisitDetail from "./Components/FollowUp/VisitDetail";
import LeadAssign from "./Components/FollowUp/LeadAssign";
import AssignVisit from "./Components/FollowUp/AssignVisit";
import AssignQuote from "./Components/FollowUp/AssignQuote";

import Product from "./Components/Product/Product";
import AddProductForm from "./Components/Product/AddProductForm";

import Masters from "./Components/BuyersPersona/Masters";
import Expectation from "./Components/BuyersPersona/Expectation";
import ProformaInvoice from "./Components/BookingForm/ProformaInvoice";
import EnquiryTabView from "./Components/Dashboard/DashboardComponents/TabView/EnquiryTabView";

import PaymentReceiptPDF from "./Components/PaymentReceipt/PaymentReceiptPDF";
import Callback from "./Components/Dashboard/Callback";


const CallStatus = lazy(() => import("./Components/FollowUp/CallStatus"));
const CallStatusMaster = lazy(() =>
  import("./Components/FollowUp/CallStatusMaster")
);

const Dashboard = lazy(() => {
  console.log("Lazy component is being loaded...");
  return import("./Components/Dashboard/dashboard");
});

const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <HashRouter>
        <Provider store={crmStore}>
          <PersistGate loading={null} persistor={persistor}>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/unauthorized" element={<Unauthorized />} />

                {/* <Route element={<PrivateRoute />}> */}
                <Route element={<AppLayout />}>
                  {/* <Route element={<FinancialGraph />} path="/dashboard"></Route> */}

                  <Route element={<Dashboard />} path="/dashboard"></Route>

                  <Route element={<SystemAdmin />}>
                    <Route
                      path="systemAdmin/companyInfo"
                      element={<CompanyInfo />}
                    />
                    <Route
                      path="systemAdmin/companyInfoDetails"
                      element={<CompanyInfoDetails />}
                    />
                    <Route
                      path="systemAdmin/companyInfoForm"
                      element={<CompanyForm />}
                    />

                    <Route path="systemAdmin/bankInfo" element={<BankInfo />} />

                    <Route
                      path="systemAdmin/bankInfoForm"
                      element={<BankInfoForm />}
                    />

                    <Route
                      path="systemAdmin/bankdetails"
                      element={<BankInfoDetails />}
                    />

                    <Route
                      path="product/product-details"
                      element={<Product />}
                    />
                    <Route
                      path="product/product-form"
                      element={<AddProductForm />}
                    />
                    <Route
                      path="/BuyersPersona/Masters"
                      element={<Masters />}
                    />
                    <Route
                      path="/BuyersPersona/Expectation"
                      element={<Expectation />}
                    />

                    <Route
                      path="enquiryBucket/deadTable"
                      element={<DeadTable />}
                    />
                    <Route
                      path="enquiryBucket/enquiryTable"
                      element={<EnquiryTable />}
                    />
                    <Route
                      path="/enquiryBucket/addEnquiry"
                      element={<AddEnquiry />}
                    />
                    <Route
                      path="enquiryBucket/sourceType"
                      element={<SourceType />}
                    />

                    <Route path="/Booking" element={<Booking />} />

                    <Route path="/employee/employee" element={<Employee />} />
                    <Route
                      path="/employee/EmployeeProfile"
                      element={<EmployeeProfile />}
                    />
                     <Route
                      path="employee/EmployeeView"
                      element={<EmployeeView />}
                    />

                    <Route
                      path="/BookingForm/allotment"
                      element={<Allotment />}
                    />
                    <Route
                      path="/FollowUp/BookingAllotment"
                      element={<Allotment />}
                    />
                    <Route
                      path="/BookingForm/PDF"
                      element={<ProformaInvoice />}
                    />

                    <Route path="/customer" element={<Customer />} />
                    <Route path="/customer/addCustomer" element={<AddCustomerForm />} />

                    <Route path="/followUp" element={<FollowUp />} />
                    <Route
                      path="/followUp/CallReport"
                      element={<CallReport />}
                    />

                    <Route
                      path="/followUp/preSalesEnquiry"
                      element={<PreSalesEnquiry />}
                    />

                    <Route
                      path="/followUp/addpreSaleEnquiry"
                      element={<AddPreSalesEnquiry />}
                    />
                    <Route path="/followUp/Quotation" element={<Quotation />} />
                    <Route
                      path="/CustomerHistory/Quotation"
                      element={<Quotation />}
                    />

                    <Route
                      path="/FollowUp/AccountProfileview"
                      element={<AccountProfileview />}
                    />
                    <Route path="/FollowUp/Behaviour" element={<Behaviour />} />
                    <Route path="/FollowUp/History" element={<History />} />
                    <Route
                      path="/FollowUp/GeneratorPersona"
                      element={<GeneratorPersona />}
                    />
                    <Route
                      path="/FollowUp/Productviews"
                      element={<Productviews />}
                    />
                    <Route
                      path="/FollowUp/QuotationDetails"
                      element={<QuoteDetail />}
                    />
                    <Route
                      path="/FollowUp/version1Detail"
                      element={<version1Detail />}
                    />
                    <Route
                      path="/FollowUp/VisitDetail/"
                      element={<VisitDetail />}
                    />
                    <Route
                      path="/FollowUp/AccountProfileview/LeadAssign"
                      element={<LeadAssign />}
                    />
                    <Route
                      path="/FollowUp/AccountProfileview/AssignVisit"
                      element={<AssignVisit />}
                    />
                    <Route
                      path="/FollowUp/AccountProfileview/AssignQuote"
                      element={<AssignQuote />}
                    />
                    <Route path="/FollowUp/Visit" element={<Visit />} />
                    <Route path="/Customer/Visit" element={<Visit />} />
                    {/* <Route path="/rolesRight/Roles" element={<Roles />} /> */}

                    <Route
                      path="sales/paymentRecipt"
                      element={<PaymentReciept />}
                    />

                    <Route path="report" element={<Report />} />

                    <Route
                      path="/followUp/CallStatus"
                      element={<CallStatus />}
                    />

                    <Route
                      path="/followUp/AddCallStatus"
                      element={<CallStatusMaster />}
                    />
                  </Route>

                  <Route
                    path="/followUp/UpdateCallStatus"
                    element={<CallStatusMaster />}
                  />
                    <Route
                      path="/Sales/PaymetnReceiptPDF"
                      element={<PaymentReceiptPDF />}
                    />
                  <Route
                    path="/dashboard/enquiry/enquiryTabView"
                    element={<EnquiryTabView />}
                  />
                  <Route path="/callback"
                  element={<Callback />}
                  />
                  <Route path="/*" element={<NotFound />} />

                </Route>
              </Routes>
            </Suspense>

            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <Toaster position="top-center" />
          </PersistGate>
        </Provider>
      </HashRouter>
    </QueryClientProvider>
  );
};

export default App;
