import React from 'react'

const Datatable = (props) => {
  
  const formatNumber = (number) => 
    new Intl.NumberFormat('en', {
      minimumFractionDigits: 2,
      style: 'currency',
      currency: 'USD',
    }).format(number)

  let totalRevenue = props.data.reduce(function (acc, curr) {
    return acc + curr.unitPrice * curr.soldQuantity
  }, 0)
  totalRevenue = totalRevenue.toFixed(2)

  return (
    <table cellPadding={5} cellSpacing={5} >
      <thead>
        <tr>
          <th>Product</th>
          <th>Revenue</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((prop) => (
          <tr>
            <td>{prop.productName}</td>
            <td>
              {formatNumber(
                (
                  parseFloat(prop.unitPrice, 2) * parseFloat(prop.soldQuantity, 2)
                ).toFixed(2)
              )}
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td>Total</td>
          <td>{formatNumber(totalRevenue)}</td>
        </tr>
      </tfoot>
    </table>
  )
}

export default Datatable
