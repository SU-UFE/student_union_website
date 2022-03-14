import React from "react";
import time from "../../static/img/time.svg";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";

const ClubPageTemplate = ({ data, location }) => {
  const post = data.markdownRemark;
  let content = post.html;
  let event = post.frontmatter;
  let contentComponent = HTMLContent;
  let PostContent = contentComponent || Content;
  const dateFormatter = (dt) => {
    dt = new Date(dt);
    var year = dt.getFullYear();
    var month = dt.getUTCMonth() + 1;
    var day = dt.getDate();

    var time = dt.getHours();
    var minute = dt.getMinutes();

    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    time = time < 10 ? "0" + time : time;
    minute = minute < 10 ? "0" + minute : minute;

    return `${year}/${month}/${day} ${time}:${minute}`;
  };
  const timeFormatter = (dt) => {
    dt = new Date(dt);

    var time = dt.getHours();
    var minute = dt.getMinutes();

    time = time < 10 ? "0" + time : time;
    minute = minute < 10 ? "0" + minute : minute;

    return `${time}:${minute}`;
  };
  return (
    <Layout>
      <section className="p-5">
        <br />
        <br />
        <br />
        <div className="container content p-4">
          <div className="columns ">
            <div className="column is-three-fifths is-offset-one-fifth">
              <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
                {post.frontmatter.title}
              </h1>
              <img
                className="fas fa-lg"
                src={time}
                alt="time"
                style={{ width: "1em", height: "1em" }}
              />{" "}
              <span
                className="content subtitle is-size-5"
                style={({ margin: 0 }, { fontWeight: "bold" })}
              >
                {dateFormatter(event.startAt)}
              </span>
              -
              <span
                className="content subtitle is-size-5"
                style={({ margin: 0 }, { fontWeight: "bold" })}
              >
                {timeFormatter(event.endAt)}
              </span>
              <p>{post.frontmatter.description}</p>
              <br />
              <PostContent content={content} />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
export const query = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        startAt
        endAt
      }
    }
  }
`;
export default ClubPageTemplate;
