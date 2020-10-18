import PropTypes from 'prop-types'
import { Spin, List, Pagination, Skeleton } from 'antd'
import { handleTagContent, utc2locale } from '@/core/util'
import { useEffect } from 'react'
import Link from 'next/link'

const getLink = (tag, number) => {
  let res = {
    href: ``,
    as: ``,
  }

  switch (tag) {
    case `about`:
      res.href = `/about`
      res.as = `/about`
      break
    default:
      res.href = `/post/[number]`
      res.as = `/post/${number}`
      break
  }

  return res
}

const PostList = ({
  perPage,
  list: postList,
  postsAmount,
  currentPage,
  onLoad,
  loading,
  handlePaginationClick,
  listType,
}) => {
  useEffect(() => {
    return onLoad()
  }, [])

  const itemRender = (current, type, originalElement) => {
    if (type === `page`) {
      switch (listType) {
        default:
        case `list`:
          return (
            <Link href={`/post/list?page=${current}`}>
              <a target="_self">{current}</a>
            </Link>
          )
        case `search`:
          return originalElement
      }
    }

    return originalElement
  }

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

              let images = handleTagContent(body, `image`)
              let desc = handleTagContent(body, `desc`)

              if (images) {
                images = images.split(`--split--`)
              }

              return (
                <Link {...getLink(label.name, number)} key={number}>
                  <a target="_self">
                    <List.Item>
                      <List.Item.Meta
                        title={<span className="title">{title}</span>}
                        description={
                          <span className="time">{utc2locale(created_at)}</span>
                        }
                      />
                      {desc && <p className="description">{desc}</p>}
                      {images && (
                        <div className="pic">
                          {images.map(image => (
                            <img
                              className="pic"
                              src={image}
                              alt=""
                              key={image}
                            />
                          ))}
                        </div>
                      )}
                    </List.Item>
                  </a>
                </Link>
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
        showSizeChanger={false}
        itemRender={itemRender}
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
          margin-bottom: 5px;
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

        .pic {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          flex-wrap: wrap;
          margin-top: 10px;
        }

        .pic > img {
          margin: 0 10px 0 0;
          width: 100px;
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
  listType: PropTypes.string.isRequired,
}
