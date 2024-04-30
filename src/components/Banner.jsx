import React from "react";
import PropTypes from "prop-types";

import { Alert } from "@edx/paragon";
import { Info } from "@edx/paragon/icons";

export const Banner = ({ children, variant, icon, className }) => (
  <Alert variant={variant} className={className} icon={icon}>
    {children}
  </Alert>
);
Banner.defaultProps = {
  icon: Info,
  variant: "info",
  className: "ml-3",
};
Banner.propTypes = {
  variant: PropTypes.string,
  icon: PropTypes.func,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Banner;
