import { useSearchParams } from "react-router";
import styles from "./FormControls.module.css";

function StatusFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentStatus = searchParams.get("status") || "all";

  const handleStatusChange = (status) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (status === "all") {
      newSearchParams.delete("status");
    } else {
      newSearchParams.set("status", status);
    }

    setSearchParams(newSearchParams);
  };

  return (
    <div className={styles.control}>
      <label className={styles.label} htmlFor="statusFilter">
        Show:
      </label>
      <select
        className={styles.select}
        id="statusFilter"
        value={currentStatus}
        onChange={(event) => handleStatusChange(event.target.value)}
      >
        <option value="all">All Todos</option>
        <option value="active">Active Todos</option>
        <option value="completed">Completed Todos</option>
      </select>
    </div>
  );
}

export default StatusFilter;