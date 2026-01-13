import { useState } from "react";
import WidgetPreview from "./WidgetPreview";
import WidgetTitle from "./WidgetTitle";
import WidgetSpinner from "./WidgetSpinner";

import { widgets } from "../constants";

const WidgetContainer = () => {
  const [currentWidget, setCurrentWidget] = useState(widgets[0]);

  return (
    <section className="widgets">
      <WidgetPreview activeWidget={currentWidget} />
      <WidgetTitle currentWidget={currentWidget} />
      <WidgetSpinner widgets={widgets} onSegmentChange={setCurrentWidget} />
    </section>
  );
};

export default WidgetContainer;
