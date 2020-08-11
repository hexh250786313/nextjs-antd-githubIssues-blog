import PropTypes from 'prop-types'
import { Spin, Timeline as AntTimeline, message } from 'antd'
import { handleTagContent, utc2locale } from '../../core/util'
// import { ClockCircleOutlined } from '@ant-design/icons';
// import { color_primary } from '../../constants/CustomTheme';
import { useEffect, useState } from 'react'
import Router from 'next/router'
import nextFetch from '../../core/nextFetch'
import api from '../../constants/ApiUrlForBE'

const { Item } = AntTimeline

const Timeline = ({ prevList, prevPage, openIssuesCount, saveTimeLine }) => {
  console.log(`TODO`, openIssuesCount)
  const [timeLineMode, setTimeLineMode] = useState('alternate')
  const [showSeeMore, setShowSeeMore] = useState(1)
  const [postList, setPostList] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const handleClick = (e, href) => {
    e.preventDefault()
    Router.push(`/post/[number]`, href)
  }

  const fetchPostList = async () => {
    setLoading(true)
    try {
      const list = await nextFetch.get(api.getGitHubIssues, {
        query: { page, per_page: 1 },
      })
      const nextList = postList.concat(list)
      setPage(page + 1)
      setPostList(nextList)
      saveTimeLine({
        list: nextList,
        page: page,
      })
    } catch (e) {
      message.error(`你能跟上我的思必得吗~`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const deviceWidth = window.screen.width || 0
    setTimeLineMode(deviceWidth && deviceWidth < 768 ? 'left' : 'alternate')
    if (prevList.length) {
      setPage(prevPage + 1)
      setPostList(prevList)
    } else {
      fetchPostList()
    }
  }, [])

  return (
    <Spin spinning={postList.length === 0}>
      <AntTimeline mode={timeLineMode}>
        {postList.map(item => {
          const { number, title, created_at, body } = item
          let images = handleTagContent(body, `image`)
          if (images) {
            images = images.split(`--split--`)
          }
          return (
            <Item key={title}>
              <span className="type">POST</span>
              <a
                href={`/post/${number}`}
                onClick={e => handleClick(e, `/post/${number}`)}
              >
                <span className="title">{title}</span>
                <br />
                <span className="time">{utc2locale(created_at)}</span>
                <p className="content">{handleTagContent(body)}</p>
                {Array.isArray(images)
                  ? images.map((url, index) => ( <img key={index} src={url} alt="url" className="image" />))
                  : null}
              </a>
            </Item>
          )
        })}
        {postList.length >= 4 ? (
          <Item>
            <span className="type">POST</span>
            <a onClick={() => setShowSeeMore(!showSeeMore)}>
              <span className="title">hexh's blog deployed.</span>
              <br />
              <span className="time">2020/4/26 Monday</span>
            </a>
          </Item>
        ) : (
          <Spin spinning={loading}>
            <div className="see_more">
              <a onClick={fetchPostList}>See more...</a>
            </div>
          </Spin>
        )}
      </AntTimeline>
      <style jsx>{`
        .title {
          font-weight: bold;
        }

        .type {
          cursor: default;
          font-weight: bold;
          color: rgba(0, 0, 0, 0.15);
          margin-right: 10px;
        }

        .time {
          color: rgba(0, 0, 0, 0.45);
          font-size: 14px;
        }

        .content {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
          color: rgba(0, 0, 0, 0.65);
          text-overflow: ellipsis;
        }

        .see_more {
          margin-top: 10px;
          width: 100%;
          display: fles;
          justify-content: center;
        }

        .image {
          width: 100px;
          margin: 0 10px 10px 0;
        }
      `}</style>
    </Spin>
  )
}

export default Timeline

Timeline.propTypes = {
  prevList: PropTypes.array.isRequired,
  prevPage: PropTypes.number.isRequired,
  openIssuesCount: PropTypes.number.isRequired,
  saveTimeLine: PropTypes.func.isRequired,
}
