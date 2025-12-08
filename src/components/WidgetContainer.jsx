import { useState } from "react";
import WidgetPreview from "./WidgetPreview";
import WidgetTitle from "./WidgetTitle";
import WidgetSpinner from "./WidgetSpinner";

import { widgets } from "../constants";

const WidgetContainer = () => {
  const [index, setIndex] = useState(0);
  return (
    <section className="widgets">
      <WidgetPreview src={widgets[index].src} />
      <WidgetTitle title={widgets[index].title} />
      <WidgetSpinner onSegmentChange={setIndex} />
    </section>
  );
};

export default WidgetContainer;
