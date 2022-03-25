import React from 'react'

import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

const ClubPageTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  let content = post.html
  let contentComponent = HTMLContent
  let PostContent = contentComponent || Content
  return (
    <Layout>
      <section className='p-5'>
        <br />
        <br />
        <br />
        <div className='container content p-4'>
          <div className='columns '>
            <div className='column is-three-fifths is-offset-one-fifth'>
              <h1 className='title is-size-2 has-text-weight-bold is-bold-light'>
                {post.frontmatter.title}
              </h1>
              <p>{post.frontmatter.description}</p>
              <br />
              <PostContent content={content} />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
export const query = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
      }
    }
  }
`
export default ClubPageTemplate
