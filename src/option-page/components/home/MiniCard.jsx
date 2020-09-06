import React from "react";
import Button from "@material-ui/core/Button";
const MiniCard = props => {
  const { title, stat, seeMoreCallback, Icon, isLink } = props;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "10px",
        background: "aliceblue"
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <div>
          <div style={{ fontSize: "medium" }}>{title}</div>
          <div style={{ fontSize: "x-large" }}>{stat}</div>
        </div>
        <div>
          <Icon style={{ fontSize: "55px" }} />
        </div>
      </div>
      <div>
        {isLink == false ? (
          ""
        ) : (
          <Button onClick={seeMoreCallback}>View More</Button>
        )}
      </div>
    </div>
  );
};

export default MiniCard;
