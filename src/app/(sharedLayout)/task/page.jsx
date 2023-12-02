"use client";

import React, { useEffect, useState } from "react";
import {
  updateRequestStatus,
  viewAllRequests,
} from "../../../../utils/RequestC/queries";

function Task() {
  const [txPending, setTxPending] = useState(false);

  const [requests, setrequest] = useState([]);
  useEffect(async () => {
    const requests = (await viewAllRequests()) || [];
    setrequest(requests);
  }, []);

  console.log("request", requests);

  async function onChangeStatus(index, status) {
    setTxPending(true);
    let value = await updateRequestStatus(index, status);
    alert("Task status has been updated");
    setTxPending(false);
  }
  return (
    <>
      <section className="2xl:w-70 w-full 2xl:mb-0 mb-6">
        {/* <h1 className="text-lg py-2 font-bold">(faseffd)</h1> */}
        <button className="btn mb-3 mt-2 bg-black text-white">
          Task
          <div className="badge">{requests?.length}</div>
        </button>

        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr></tr>
            </thead>
            <tbody>
              {requests
                ?.filter((request) => !request.isFulfilled) // Filter requests with isFulfilled set to false
                ?.map((request, index) => (
                  <tr>
                    <td>
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-bold">{request.requestType}</div>
                          <div className="text-sm opacity-50">
                            {request.location}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {request?.isFulfilled
                        ? "Task performed"
                        : "Task Not Performed"}
                    </td>
                    <td>
                      {new Date(
                        request?.timestamp?.toString() * 1000
                      ).toLocaleDateString("en-GB")}
                    </td>
                    <th>
                      {/* <button className="btn btn-ghost btn-xs"> */}
                      <div
                        onClick={() => {
                          onChangeStatus(index, true);
                        }}
                        className="btn badge badge-primary"
                      >
                        Update Status
                      </div>
                      {/* </button> */}
                    </th>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
      {/* <section className="2xl:flex-1 w-full">
        <Wallet />
        <TeamChat />
      </section> */}
    </>
  );
}

export default Task;
