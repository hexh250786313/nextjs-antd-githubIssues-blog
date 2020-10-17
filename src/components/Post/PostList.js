import PropTypes from 'prop-types'
import { Spin, List, Pagination, Skeleton } from 'antd'
import Router from 'next/router'
import { handleTagContent, utc2locale } from '@/core/util'
import { useEffect } from 'react'

const handleClick = (e, href) => {
  e.preventDefault()
  Router.push(`/post/[number]`, href)
}

const routerToAbout = e => {
  e.preventDefault()
  Router.push(`/about`, `/about`)
}

const PostList = ({
  perPage,
  list: postList,
  postsAmount,
  currentPage,
  onLoad,
  loading,
  handlePaginationClick,
}) => {
  useEffect(() => {
    return onLoad()
  }, [])

  return (
    <div className="container">
      <Spin spinning={loading}>
        {postList.length !== 0 ? (
          <List>
            {postList.map(item => {
              const {
                number,
                title,
                body,
                created_at,
                labels: [label],
              } = item
              return (
                <a
                  key={number}
                  href={`/post/${number}`}
                  // onClick={e => handleClick(e, `/post/${number}`)}
                  // onClick={e => handleClick(e, `/post/${number}`)}
                  onClick={e =>
                    label.name === `about`
                      ? routerToAbout(e)
                      : handleClick(e, `/post/${number}`)
                  }
                >
                  <List.Item>
                    <List.Item.Meta
                      // title={<span className="title">{title}</span>}
                      title={<span className="title">{title}</span>}
                      description={
                        <span className="time">{utc2locale(created_at)}</span>
                      }
                    />
                    <p className="description">{handleTagContent(body)}</p>
                  </List.Item>
                </a>
              )
            })}
          </List>
        ) : (
          <Skeleton />
        )}
      </Spin>
      <Pagination
        onChange={handlePaginationClick}
        pageSize={perPage}
        defaultCurrent={1}
        current={currentPage}
        total={postsAmount}
        // total={openIssuesCount}
        showSizeChanger={false}
      />
      <style jsx>{`
        :global(.container .ant-list-item) {
          flex-direction: column;
          align-items: flex-start;
          padding: 0;
          margin: 0 0 25px;
        }

        :global(.container .ant-list-item-meta, .container
            .ant-list-item-meta-content) {
          width: 100%;
        }

        :global(.container .ant-list-item-meta-title) {
          color: inherit;
          line-height: 1.2;
          margin: 0;
        }

        :global(.container .ant-list-item-meta-description) {
          line-height: 1;
          margin: 0 0 5px;
        }

        .time {
          font-size: 14px;
        }

        .title {
          display: inline-block;
          width: 100%;
          font-size: 18px;
          font-weight: bold;
          word-break: break-all;
        }

        .description {
          color: rgba(0, 0, 0, 0.65);
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
          text-overflow: ellipsis;
          margin: 0;
          word-break: break-all;
        }
      `}</style>
    </div>
  )
}

export default PostList

PostList.propTypes = {
  list: PropTypes.array.isRequired,
  postsAmount: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  fetchPostList: PropTypes.func.isRequired,
  onLoad: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  handlePaginationClick: PropTypes.func.isRequired,
}
