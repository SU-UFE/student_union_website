import React from "react";
import { graphql, StaticQuery, navigate } from "gatsby";

import Kalend, { CalendarView } from "kalend";
import "kalend/dist/styles/index.css"; // import styles

const Calendar = ({ data }) => {
  const { edges: events } = data.allMarkdownRemark;
  const final_events = [];
  events.forEach((element) => {
    final_events.push(
      Object.assign(element.node.frontmatter, element.node.fields)
    );
  });
  const onEventClick = (e) => {
    navigate(e.slug);
  };
  return (
    <Kalend
      onEventClick={onEventClick}
      // onNewEventClick={onNewEventClick}
      events={final_events}
      initialDate={new Date().toISOString()}
      hourHeight={60}
      initialView={CalendarView.MONTH}
      disabledViews={[CalendarView.DAY]}
      // onSelectView={onSelectView}
      // selectedView={selectedView}
      // onPageChange={onPageChange}
      timeFormat={"24"}
      weekDayStart={"Monday"}
      calendarIDsHidden={["work"]}
      language={"en"}
    />
  );
};

export default function Events() {
  return (
    <StaticQuery
      query={graphql`
        query EventQuery {
          allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { frontmatter: { templateKey: { eq: "event-post" } } }
          ) {
            edges {
              node {
                excerpt(pruneLength: 400)
                id
                fields {
                  slug
                }
                frontmatter {
                  summary: title
                  templateKey
                  date(formatString: "MMMM DD, YYYY")
                  startAt
                  endAt
                  color
                }
              }
            }
          }
        }
      `}
      render={(data, count) => <Calendar data={data} />}
    />
  );
}
