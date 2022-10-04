import React from "react";
import PropTypes from "prop-types";

const PageFooter = ({render}) => {
  return (
    <footer className="page-footer">
      {render()}

      <div className="copyright">
        <p>© 2022 What to watch Ltd.</p>
      </div>
    </footer>
  );
};

PageFooter.propTypes = {
  render: PropTypes.func,
};

export default PageFooter;
