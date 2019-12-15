import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class About extends Component {
  render = () => {
    return (
      <div className="about-page-container">
        <div className="about-header">
          <div className="header-logo-about">
            <Link className="header-logo-about" to="/">
              GLAZED
            </Link>
          </div>
          <div className="header-details">
            <div className="about-heading">ABOUT</div>
          </div>
        </div>
        <div className="about-container">
          <div className="about-text-container">
            <div className="about-title">WHAT IS GLAZED?</div>
            <div className="about-description">
              GLAZED is a resource designed for ceramic artists, to help make
              the process of calculating, storing, and organizing glaze recipes
              faster and easier.
            </div>
            <div className="about-title">WHAT ARE CERAMIC GLAZES?</div>
            <div className="about-description">
              In the most basic sense, ceramic glazes are viscous liquids that
              are applied to the surface of a ceramic object. They typically
              consist of a liquid base into which dry and liquid ingredients are
              mixed. These ingredients react to the high temperatures of the
              firing environment in which a ceramic object is baked, and they
              produce the coloured, textured surfaces of ceramic wares.
            </div>
            <div className="about-title">HOW ARE GLAZE RECIPES MADE?</div>
            <div className="about-description">
              Typically, a glaze recipe consists of a liquid base, which is
              measured by volume, into which dry and/or wet ingredients are
              mixed. Dry ingredients can consist of powdered pigments or other
              reactive materials that are measured by mass and mixed into the
              liquid glaze base. Liquid ingredients are measured by volume and
              mixed into the glaze base, along with any dry ingredients.
            </div>
            <div className="about-title">WHAT IS A GLAZE CALCULATOR?</div>
            <div className="about-description">
              The GLAZED glaze calculator is designed to make measuring batches
              of ceramic glazes easier. Glaze recipe ingredients are often
              recorded in ratios so that batch volumes can be scaled according
              to the amount of glaze needed. The glaze calculator performs the
              operations necessary to measure out the specific amounts required
              for a given recipe.
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default About;
