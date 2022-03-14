import React from "react";
import EventRoll from "../../components/EventRoll";
import Layout from "../../components/Layout";
import loadable from "@loadable/component";
const Calendar = loadable(() => import("../../components/Calendar"));
const ClubsIndex = () => {
  return (
    <Layout>
      <div className="container">
        <h1
          className="has-text-weight-bold is-size-1"
          style={{
            color: "black",
            padding: "1rem",
            marginTop: "1rem",
          }}
        >
          Арга хэмжээ
        </h1>
      </div>

      <section className="section">
        <div className="container">
          <div className="content">
            <div style={{ height: "44rem" }}>
              <Calendar />
            </div>
            <EventRoll />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ClubsIndex;
