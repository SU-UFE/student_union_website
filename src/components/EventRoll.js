import React from "react";
import { Link, graphql, StaticQuery } from "gatsby";
import PreviewCompatibleImage from "./PreviewCompatibleImage";

const EventRoll = ({ data }) => {
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
                    className="title has-text-primary is-size-4"
                    to={post.fields.slug}
                  >
                    {post.frontmatter.title}
                  </Link>
                  <span> </span>
                  <span className="content subtitle is-size-5 is-block">
                    {post.frontmatter.description}
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
