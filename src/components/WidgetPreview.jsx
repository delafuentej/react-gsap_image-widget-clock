// src/components/WidgetPreview.jsx
const WidgetPreview = ({ activeWidget }) => {
  if (!activeWidget) return null;

  return (
    <div className="widget-preview-img">
      <img src={activeWidget.src} alt={activeWidget.title} />
    </div>
  );
};

export default WidgetPreview;
