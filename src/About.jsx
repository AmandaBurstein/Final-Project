import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class About extends Component {
  render = () => {
    return (
      <div className="homepage-container">
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
          <div className="about-title">WHAT IS A GLAZE CALCULATOR?</div>
          <div className="about-description">
            The glaze calculator was created to make mixing batches of ceramic
            glazes easier. Glaze recipe ingredients are often recorded in
            ratios, or percentages, so that batch volumes can be easily scaled
            according the amount of glaze needed.
          </div>
          <div className="about-title">WHAT ARE CERAMIC GLAZES?</div>
          <div className="about-description">
            In the most basic sense, ceramic glazes are viscous liquids that are
            applied to the surface of a ceramic object. They typically consist
            of a liquid base into which dry and liquid ingredients are mixed.
            These ingredients react to the high temperatures of the firing
            environment in which a ceramic object is baked, and they produce the
            coloured, textured surface of ceramic wares. For example, your
            dinner plates, bowls, and mugs at home probably have a shiny,
            coloured finish that help make the piece food-safe and easy to
            clean.
          </div>
          <div className="about-title">HOW ARE GLAZE RECIPES MADE?</div>
          <div className="about-description">
            Typically, a glaze recipe consists of a liquid base, which is
            measured by volume, into which dry and/or wet ingredients are mixed.
            Dry ingredients can consist of powdered pigments or other reactive
            materials that are measured by mass and mixed into the liquid glaze
            base. Liquid ingredients are measured by volume and mixed into the
            glaze base, along with any dry ingredients.
          </div>
        </div>
      </div>
    );
  };
}

export default About;
