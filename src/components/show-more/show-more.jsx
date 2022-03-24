import React from "react";
import PropTypes from "prop-types";

const ShowMore = ({onShowMore}) => {
  return <div className="catalog__more">
    <button className="catalog__button" type="button" onClick={onShowMore}>Show more</button>
  </div>;
};

ShowMore.propTypes = {
  onShowMore: PropTypes.func.isRequired,
};

export default ShowMore;
