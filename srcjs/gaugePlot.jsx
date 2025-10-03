import { reactWidget } from "reactR";
import React, { useState, useEffect } from "react";
import { GaugeComponent } from "react-gauge-component";

const GaugePlot = ({
  initialRating,
  ratingText,
  boldRatingText,
  ratingBoxText,
}) => {
  const [rating, setRating] = useState("Empty");

  // The value (out of 100) that the needle should point to for each rating
  const ratingValues = {
    Empty: 1.5,
    None: 13,
    Poor: 38,
    Partial: 63,
    Best: 88,
  };

  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  const ratingKeys = Object.keys(ratingValues);

  /**
   * Get the string to display for a given rating value.
   *
   * @param {number} value  The numeric rating value from the plot (0-100).
   * @param {string} type   The type of text to return ("bold", "gauge", or "box").
   * @return {string}       The corresponding text for the rating value and type.
   */
  function getRatingText(value, type = "bold") {
    var dict = boldRatingText;
    if (type === "gauge") {
      dict = ratingText;
    } else if (type === "box") {
      dict = ratingBoxText;
    }
    if (value <= ratingValues["Empty"]) {
      return dict["Empty"];
    }
    if (value <= ratingValues["None"]) {
      return dict["None"];
    }
    if (value <= ratingValues["Poor"]) {
      return dict["Poor"];
    }
    if (value <= ratingValues["Partial"]) {
      return dict["Partial"];
    }
    return dict["Best"];
  }

  // Margins around the gauge as a percentage of the total width/height
  const marginPerc = { top: 0.05, bottom: 0.0, left: 0.15, right: 0.15 };

  /**
   * Contains the dynamic elements of the gauge plot that change based on the rating.
   *
   * - A GaugeComponent with a semi-transparent overlay to dim the unselected sections.
   * - A GaugeComponent with the pointer.
   * - Text in the center indicating the current rating.
   */
  const dynamicGaugeElement = () => {
    var val = ratingValues[rating] || 1;
    return (
      <>
        <GaugeComponent
          id="opaque-layer"
          value={val}
          minValue={0}
          maxValue={100}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            opacity: 0.5,
          }}
          type="semicircle"
          marginInPercent={marginPerc}
          arc={{
            cornerRadius: 0,
            subArcs: [
              {
                color: "transparent",
                length: (25 * ratingKeys.indexOf(rating)) / 100,
              },
              {
                length: (100 - 25 * ratingKeys.indexOf(rating)) / 100,
                color: "#fff",
              },
            ],
            padding: 0,
            showTick: true,
            width: 0.3,
          }}
          labels={{
            valueLabel: { hide: true },
            tickLabels: {
              type: "outer",
              hideMinMax: true,
              defaultTickValueConfig: {
                formatTextValue: (value) => getRatingText(value),
                style: {
                  fill: "#000",
                  textShadow: "none",
                  fontSize: 15,
                  fontWeight: "bold",
                },
                hide: true,
              },
              defaultTickLineConfig: {
                color: "transparent",
                length: 1,
                hide: true,
              },
            },
          }}
          pointer={{
            type: "arrow",
            elastic: false,
            color: "black",
            hide: true,
          }}
        />
        <GaugeComponent
          id="pointer"
          value={val}
          minValue={0}
          maxValue={100}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
          }}
          type="semicircle"
          marginInPercent={marginPerc}
          arc={{
            cornerRadius: 0,
            subArcs: [{ color: "transparent" }],
            padding: 0,
            showTick: true,
            width: 0.2,
          }}
          labels={{
            valueLabel: { hide: true },

            tickLabels: {
              type: "outer",
              hideMinMax: true,
              defaultTickValueConfig: {
                formatTextValue: (value) => getRatingText(value),
                style: {
                  fill: "#000",
                  textShadow: "none",
                  fontSize: 15,
                  fontWeight: "bold",
                },
                hide: true,
              },
              defaultTickLineConfig: {
                color: "transparent",
                length: 1,
                hide: true,
              },
            },
          }}
          pointer={{
            type: "arrow",
            elastic: false,
            color: "black",
          }}
        />
        <div className="gauge-text-container">
          {rating !== "Empty" ? (
            <>
              <p>{ratingText[rating]}</p>
              <span className="gauge-rating">{boldRatingText[rating]}</span>
            </>
          ) : (
            <p className="empty">{ratingText[rating]}</p>
          )}
        </div>
      </>
    );
  };

  /**
   * Displays a warning message below the gauge based on the current rating.
   * If the rating is "Empty", no message is shown.
   * If the rating is not "Best", a warning icon is displayed alongside the message.
   */
  const gaugeWarning = () => {
    return (
      <>
        {rating !== "Empty" && (
          <div className="area-graph-warning">
            {rating !== "Best" && (
              <i
                class="fas fa-triangle-exclamation"
                role="presentation"
                aria-label="triangle-exclamation icon"
              ></i>
            )}
            <p>{ratingBoxText[rating]}</p>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="gauge-parent">
      <div className="gauge-plots">
        <GaugeComponent
          id="static-gauge-colours"
          value={0}
          minValue={0}
          maxValue={100}
          style={{ width: "100%" }}
          type="semicircle"
          marginInPercent={marginPerc}
          arc={{
            cornerRadius: 0,
            subArcs: [
              { length: 0.0015, color: "#00000" },
              { length: 0.248125, color: "#D73027" },
              { length: 0.0015, color: "#00000" },
              { length: 0.248125, color: "#F46D43" },
              { length: 0.0015, color: "#00000" },
              { length: 0.248125, color: "#FFCE00" },
              { length: 0.0015, color: "#00000" },
              { length: 0.248125, color: "#179850" },
              { length: 0.0015, color: "#00000" },
            ],
            padding: 0,
            showTick: true,
            width: 0.3,
          }}
          labels={{
            valueLabel: {
              formatTextValue: (value) => getRatingText(value, "gauge"),
              hide: true,
            },
            tickLabels: {
              type: "outer",
              hideMinMax: true,
              ticks: [
                { value: 13 },
                { value: 38 },
                { value: 63 },
                { value: 88 },
              ],
              defaultTickValueConfig: {
                formatTextValue: (value) => getRatingText(value),
                style: {
                  fill: "#000",
                  textShadow: "none",
                  fontSize: 15,
                  fontWeight: "bold",
                },
              },
              defaultTickLineConfig: {
                color: "transparent",
                length: 1,
              },
            },
          }}
          pointer={{
            type: "arrow",
            elastic: false,
            color: "black",
            hide: true,
          }}
        />

        {dynamicGaugeElement()}
      </div>
      {gaugeWarning()}
    </div>
  );
};

reactWidget("gaugePlot", "output", {
  GaugePlot: GaugePlot,
});
