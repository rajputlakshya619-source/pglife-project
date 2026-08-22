import React from 'react';
import { base_path } from './utils.js';

const FilterBar = props => {
  return (
    <div className="filter-bar row justify-content-around">

      {/* Filter */}
      <div
        className={
          "col-auto" +
          (props.currentFilter.gender !== "none" ? " sort-active" : "")
        }
        onClick={props.openFilter}
        style={{ cursor: "pointer" }}
      >
        <img src={base_path + "/img/filter.png"} alt="filter" />
        <span>Filter</span>
      </div>

      {/* Highest Rent */}
      <div
        className={
          "col-auto" +
          (props.currentSort === "desc" ? " sort-active" : "")
        }
        onClick={() => props.updateSort("desc")}
        style={{ cursor: "pointer" }}
      >
        <img src={base_path + "/img/desc.png"} alt="sort-desc" />
        <span>Highest rent first</span>
      </div>

      {/* Lowest Rent */}
      <div
        className={
          "col-auto" +
          (props.currentSort === "asc" ? " sort-active" : "")
        }
        onClick={() => props.updateSort("asc")}
        style={{ cursor: "pointer" }}
      >
        <img src={base_path + "/img/asc.png"} alt="sort-asc" />
        <span>Lowest rent first</span>
      </div>

    </div>
  );
};

export default FilterBar;