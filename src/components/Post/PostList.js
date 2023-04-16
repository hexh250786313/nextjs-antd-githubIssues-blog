import PropTypes from 'prop-types'
import { Spin, List, Pagination, Skeleton } from 'antd'
import { handleTagContent, utc2locale } from '@/core/util'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const getLink = (tag, number) => {
  const res = {
    href: '',
    as: '',
  }

  switch (tag) {
    case 'about':
      res.href = '/about'
      res.as = '/about'
      break
    default:
      res.href = '/post/[number]'
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
  const [wrapperClass, setWrapperClass] = useState('wrapper-mouse-hover')
  const router = useRouter()

  useEffect(() => {
    return onLoad()
  }, [])

  const itemRender = (current, type, originalElement) => {
    if (type === 'prev') {
      switch (listType) {
        default:
        case 'list':
          return (
            <a
              onClick={() => {
                if (currentPage - 1 > 0) {
                  router.push(`/post/list?page=${currentPage - 1}`)
                }
              }}
            >
              Previous
            </a>
          )
        case 'search':
          return originalElement
      }
    }
    if (type === 'next') {
      switch (listType) {
        default:
        case 'list':
          return (
            <a
              onClick={() => {
                if (currentPage * perPage < postsAmount) {
                  router.push(`/post/list?page=${currentPage + 1}`)
                }
              }}
            >
              Next
            </a>
          )
        case 'search':
          return originalElement
      }
    }
    if (type === 'page') {
      switch (listType) {
        default:
        case 'list':
          return (
            <Link href={`/post/list?page=${current}`}>
              <a target='_self'>{current}</a>
            </Link>
          )
        case 'search':
          return originalElement
      }
    }

    return originalElement
  }

  return (
    <div className='container'>
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

              let images = handleTagContent(body, 'image')
              const desc = handleTagContent(body, 'desc')

              if (images) {
                images = images.match(/!\[.*\]\(\S+\)/g)
              }

              return (
                <Link {...getLink(label && label.name, number)} key={number}>
                  <a target='_self'>
                    <div className='wrapper'>
                      <List.Item>
                        <List.Item.Meta
                          title={<span className='title'>{title}</span>}
                          description={
                            <span className='time'>
                              {utc2locale(created_at)}
                            </span>
                          }
                        />
                        {desc && <p className='description'>{desc}</p>}
                        {images && (
                          <div className='pic'>
                            {images.map(image => (
                              <img
                                className='pic'
                                src={image
                                  .match(/\(.*\)$/)[0]
                                  .replace(/^\(|\)$/g, '')}
                                alt={
                                  image
                                    .match(/^!\[.*\]/)[0]
                                    .replace(/^!\[|\]$/g, '') || ''
                                }
                                key={image}
                              />
                            ))}
                          </div>
                        )}
                      </List.Item>
                    </div>
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
        style={{ marginTop: 10 }}
      />
      <style jsx>
        {`
          :global(.container .ant-list-item) {
            flex-direction: column;
            align-items: flex-start;
            padding: 0;
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
            border-radius: 3px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }

          @media (max-width: 767px) {
            .wrapper {
              padding: 0 0 15px;
              border-radius: 0;
              background-color: inherit;
            }

            .wrapper:hover {
              background-color: inherit;
            }

            :global(.container .ant-pagination) {
              margin-left: 0;
            }
          }

          @media (min-width: 768px) {
            .wrapper {
              padding: 15px;
              border-radius: 5px;
              background-color: inherit;
            }

            .wrapper:hover {
              background-color: #e6ecf4;
            }

            :global(.container .ant-pagination) {
              margin-left: 15px;
            }
          }
        `}
      </style>
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
