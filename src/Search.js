import React from 'react'

const Search = (props) => {
  return (
    <div className="product-search">
      <label>Search Products</label>
      <input
        type={props.type}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  )
}

export default Search
