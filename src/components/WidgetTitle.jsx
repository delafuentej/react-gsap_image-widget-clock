const WidgetTitle = ({ currentWidget }) => {
  if (!currentWidget) return null;
  return <div className="widget-title">{currentWidget.title}</div>;
};

export default WidgetTitle;
