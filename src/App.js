import React, { useState, useEffect } from 'react'
import Datatable from './datatable'
import SearchDiv from './Search'
import './App.css'

function App() {
  const [data, setData] = useState([])
  const [query, setQuery] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)

    Promise.all([
      fetch('./api/branch1.json'),
      fetch('./api/branch2.json'),
      fetch('./api/branch3.json'),
    ])
      .then((responses) => {
        return Promise.all(responses.map((response) => response.json()))
      })
      .then((data) => {
        let TransformedData = data[0].products
          .concat(data[1].products)
          .concat(data[2].products)

        const transformedData = TransformedData.map((productData, index) => {
          return {
            id: productData.id,
            key: `${index} ` + productData.name,
            productName: productData.name,
            unitPrice: productData.unitPrice,
            soldQuantity: productData.sold,
          }
        })
        setData(transformedData)
        setTimeout(() => setIsLoading(false), 500)
      })
  }, [])

  function sortOn(property) {
    return function (a, b) {
      if (a[property] < b[property]) {
        return -1
      } else if (a[property] > b[property]) {
        return 1
      } else {
        return 0
      }
    }
  }

  data.sort(sortOn('productName'))

  let reducedObjArr = Object.values(
    data.reduce((acc, curr) => {
      ;(acc[curr.productName] = acc[curr.productName] || {
        productName: curr.productName,
        key:curr.key,
        id: curr.id,
        unitPrice: curr.unitPrice,
        soldQuantity: 0,
      }).soldQuantity += curr.soldQuantity
      return acc
    }, {})
  )

  
  function search(rows) {
    return rows.filter(
      (row) =>
        row.productName
          .toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
    )
  }

  return (
    <div className="product-list">
      <div>{isLoading && <h2 className="loading">Loading...</h2>}</div>

      <div>
        {!isLoading && reducedObjArr.length > 0 && (
          <SearchDiv
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        )}
        {!isLoading && reducedObjArr.length > 0 && (
          <Datatable data={search(reducedObjArr)} />
        )}
        {!isLoading && reducedObjArr.length === 0 && (
          <h2 className="loading">Found no data!!</h2>
        )}
      </div>
    </div>
  )
}

export default App
