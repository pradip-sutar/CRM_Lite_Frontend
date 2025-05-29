import { useNavigate } from "react-router-dom";


function CustomerRow({ customer ,index}) {
  const navigate = useNavigate();
  return (
    <tr className={customer.id % 2 === 0 ? "even" : "odd"}>
      <td className="sorting_1">{index+1}</td>
      <td>{customer.name}</td>
      <td>+91 {customer.mob}</td>
      <td>{customer.email}</td>
      <td>{customer.gender}</td>
      <td>{customer.present_address}</td>
      <td>{customer.present_district}</td>
      <td>{customer.present_pincode}</td>
      <td>{customer.customer_id}</td>
      <td>
        <div className="d-inline-block">
          <button
            onClick={() =>
              navigate("/customer/addCustomer", {
                state: { customerDetails: customer },
              })
            }
            className="btn btn-text-danger btn-sm small py-1 px-2 waves-effect waves-light"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-bs-original-title="Edit"
          >
            <i className="mdi mdi-pencil-outline"></i>
          </button>
        </div>
      </td>
    </tr>
  );
}

export default CustomerRow;
