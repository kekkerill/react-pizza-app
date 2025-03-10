import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props: object) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="367" y="275" rx="0" ry="0" width="66" height="25" />
    <circle cx="140" cy="130" r="130" />
    <rect x="0" y="280" rx="13" ry="13" width="280" height="19" />
    <rect x="211" y="359" rx="0" ry="0" width="1" height="0" />
    <rect x="0" y="315" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="416" rx="3" ry="3" width="95" height="30" />
    <rect x="142" y="416" rx="34" ry="34" width="137" height="46" />
  </ContentLoader>
);

export default Skeleton;
