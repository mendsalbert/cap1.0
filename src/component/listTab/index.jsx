import ProtoTypes from "prop-types";
import Pagination from "../Pagination";
import Filter from "../forms/Filter";
import FilterFull from "../forms/FilterFull";
import Search from "../forms/Search";
import UserTab from "./UserTab";
import TaskTab from "./TaskTab";
import TaskSearch from "../forms/TaskSearch";
function ListTab({ pageSize, newsData }) {
  return (
    <div className="w-full rounded-lg bg-white px-[24px] py-[20px] dark:bg-darkblack-600">
      <div className="flex flex-col space-y-5">
        {/* <FilterFull /> */}
        {/* <TaskTab pageSize={pageSize} /> */}
        <UserTab pageSize={pageSize} />
        {/* <Pagination /> */}
      </div>
    </div>
  );
}

ListTab.propTypes = {
  pageSize: ProtoTypes.number,
};

export default ListTab;
