import React from 'react';

const Customers = () => {
  return (
    <>
        <div className="container p-3 mt-3">
      <div className="row mb-3">
        <div className="col">
          <h3>Customer DetDetails</h3>
        </div>
        <div className="col">
          <label>Document-Status :</label>
          <input type="Number" placeholder='Enter Status'  className="ml-2" style={{ width: '117px' }} />
        </div>
        <div className="col">
          <label>Status :</label>
          <input type="Number" placeholder='Enter Status'className="ml-2" style={{ width: '117px' }} />
        </div>
      </div>
      <table className="table table-bordered" style={{width:"100%"}}>
        <thead>
          <tr className='border'>
            <th  style={{
                  padding: "8px",
                  border: "1px solid #ddd",
                  textAlign: "left",
                  backgroundColor:'hsl(0, 22.60%, 93.90%)'
                }}>CustNo</th>
            <th  style={{
                  padding: "8px",
                  border: "1px solid #ddd",
                  textAlign: "left",
                  backgroundColor:'hsl(0, 22.60%, 93.90%)'
                }}>Name</th>
            <th  style={{
                  padding: "8px",
                  border: "1px solid #ddd",
                  textAlign: "left",
                  backgroundColor:'hsl(0, 22.60%, 93.90%)'
                }}>SysDate</th>
            <th  style={{
                  padding: "8px",
                  border: "1px solid #ddd",
                  textAlign: "left",
                  backgroundColor:'hsl(0, 22.60%, 93.90%)'
                }}>Doc-Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>one</td>
            <td>one</td>
            <td>one</td>
            <td>one</td>
          </tr>
        </tbody>
      </table>
    </div>
    </>
  );
};

export default Customers;
