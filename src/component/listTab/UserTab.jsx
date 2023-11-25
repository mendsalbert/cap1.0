import ProtoTypes from "prop-types";
import CustomerInfo from "./CustomerInfo";
import users from "../../data/user";
function UserTab({ pageSize }) {
  return (
    <div className="table-content w-full overflow-x-auto">
      <table className="w-full">
        <tbody>
          {users?.map((user, index) =>
            pageSize
              ? index + 1 <= pageSize && (
                  <CustomerInfo
                    key={user.id}
                    img={user.img}
                    name={user.name}
                    email={user.email}
                    location={user.location}
                    spent={user.spent}
                  />
                )
              : index < 3 && (
                  <CustomerInfo
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

UserTab.propTypes = {
  pageSize: ProtoTypes.number,
};

export default UserTab;
