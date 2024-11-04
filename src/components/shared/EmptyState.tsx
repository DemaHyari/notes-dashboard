import emptyStateImage from "../../assets/images/planEmpty.png";

const EmptyState = () => {
  return (
    <div className="empty-state flex flex-direction--column flex-align--center flex-justify--center">
      <img src={emptyStateImage} alt="empty state" />
      <h2 className="empty-state__title">No notes found</h2>
    </div>
  );
};

export default EmptyState;
