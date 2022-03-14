import React from "react";
import { Link, graphql, StaticQuery } from "gatsby";
import PreviewCompatibleImage from "./PreviewCompatibleImage";
import time from "../../static/img/time.svg";
const EventRoll = ({ data }) => {
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
  const { edges: posts } = data.allMarkdownRemark;
  return (
    <div className="columns is-multiline">
      {posts &&
        posts.map(({ node: post }) => (
          <div className="is-parent column is-6" key={post.id}>
            <article className="card">
              <header>
                {post.frontmatter.featuredimage ? (
                  <div className="card-image">
                    <PreviewCompatibleImage
                      imageInfo={{
                        image: post.frontmatter.featuredimage,
                        alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                        width:
                          post.frontmatter.featuredimage.childImageSharp
                            .gatsbyImageData.width,
                        height:
                          post.frontmatter.featuredimage.childImageSharp
                            .gatsbyImageData.height,
                      }}
                    />
                  </div>
                ) : null}
                <p className="card-content">
                  <Link
                    className="title has-text-primary is-size-4 is-block"
                    to={post.fields.slug}
                  >
                    {post.frontmatter.title}
                  </Link>
                  <span> </span>
                  <span
                    className="content subtitle is-size-5 "
                    style={{ margin: 0 }}
                  >
                    <img
                      className="fas fa-lg"
                      src={time}
                      alt="time"
                      style={{ width: "1em", height: "1em" }}
                    />{" "}
                    {dateFormatter(post.frontmatter.startAt)}
                  </span>
                  -
                  <span
                    className="content subtitle is-size-5 "
                    style={{ margin: 0 }}
                  >
                    {timeFormatter(post.frontmatter.endAt)}
                  </span>
                </p>
              </header>
              <p className="content">
                <Link
                  className="level-right button is-link"
                  to={post.fields.slug}
                >
                  Дэлгэрэнгүй унших →
                </Link>
              </p>
            </article>
          </div>
        ))}
    </div>
  );
};

export default function UfePediaRoll() {
  return (
    <StaticQuery
      query={graphql`
        query EventQueryForEventPage {
          allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___startAt] }
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
                  title
                  templateKey
                  date(formatString: "MMMM DD, YYYY")
                  summary
                  startAt
                  endAt
                  featuredimage {
                    childImageSharp {
                      gatsbyImageData(
                        width: 800
                        height: 400
                        layout: CONSTRAINED
                      )
                    }
                  }
                  color
                }
              }
            }
          }
        }
      `}
      render={(data, count) => <EventRoll data={data} count={count} />}
    />
  );
}
