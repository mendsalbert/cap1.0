import ProtoTypes from "prop-types";
import task from "@/data/task";
import TaskInfo from "./TaskInfo";

function TaskTab({ pageSize }) {
  return (
    <div className="table-content w-full overflow-x-auto">
      <table className="w-full">
        <tbody>
          {task?.map((user, index) =>
            pageSize
              ? index + 1 <= pageSize && (
                  <TaskInfo
                    key={user.id}
                    img={user.img}
                    name={user.name}
                    email={user.email}
                    location={user.location}
                    spent={user.spent}
                  />
                )
              : index < 3 && (
                  <TaskInfo
                    key={user.id}
                    img={user.img}
                    name={user.name}
                    email={user.email}
                    location={user.location}
                    spent={user.spent}
                  />
                )
          )}
        </tbody>
      </table>
    </div>
  );
}

TaskTab.propTypes = {
  pageSize: ProtoTypes.number,
};

export default TaskTab;
