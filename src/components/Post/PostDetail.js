import ImgViewer from '@/components/ImgViewer'
import { handleTagContent, utc2locale } from '@/core/util'
import { Spin } from 'antd'
import Gitalk from 'gitalk'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import CodeBlock from '../CodeBlock'
import Terms from './Term'
import './index.less'
import { listQuery } from '@/constants/ConstTypes'

const PostDetail = ({
  fetchPostDetail,
  detail,
  setTOC,
  clearDetail,
  isShowTerm,
}) => {
  let { body, created_at, updated_at } = detail
  let images = handleTagContent(body, 'image')
  let desc = handleTagContent(body, 'desc')

  if (images) {
    images = images.match(/!\[.*\]\(\S+\)/g)
    body = handleTagContent(body, 'image', 'exec')
  }

  if (desc) {
    // desc = desc.replace(/^\s+|\s+$/g, ``) // 去除头尾空白
    desc = desc.replace(/^\r\n+|\r\n+$/g, '') // 去除头尾换行+回车
    body = handleTagContent(body, 'desc', 'exec')
  }

  if (body) {
    body = body.replace(/^\s+|\s+$/g, '')
    body = handleTagContent(body, 'header-img', 'exec')
  }

  useEffect(() => {
    if (!body) {
      fetchPostDetail()
    }

    const imgs = document.getElementsByTagName('img')

    imgs.forEach((imgEle) => {
      imgEle.addEventListener('click', (e) => {
        ImgViewer.show(e.target.src)
      })
    })
  }, [body])

  useEffect(() => {
    const issueId = Number(location.pathname.split('/').pop())
    if (issueId) {
      // 如果是 https://blog.hexh.xyz 则为：Ov23liMwfBFdxuwZsdww
      // 如果是 https://blog.hexuhua.vercel.app 则为：adc241ebb434da7ae0dc
      let clientID = ''
      let clientSecret = ''
      if (location.origin.startsWith('https://blog.hexh.xyz')) {
        clientID = 'Ov23liMwfBFdxuwZsdww'
        clientSecret = 'd85c3f828cd0615e87f8c84ad5d3bd0d2c888f31'
      } else if (
        location.origin.startsWith('https://blog.hexuhua.vercel.app')
      ) {
        clientID = 'adc241ebb434da7ae0dc'
        clientSecret = '20121f9cbf6028ade5cb38e954382f4d6a73a3ec'
      }
      const gitalk = new Gitalk({
        clientID,
        clientSecret,
        repo: 'Blog',
        owner: listQuery.creator,
        number: issueId,
        proxy:
          'https://proxy.hexh.xyz/proxy/https://github.com/login/oauth/access_token',
        distractionFreeMode: false,
      })
      gitalk.render('gitalk-container')
    }
    return () => {
      setTOC('')
      clearDetail()
    }
  }, [])

  return (
    <div>
      <Spin style={{ minWidth: 0 }} spinning={!body}>
        <div className='wrapper'>
          <div className='time'>
            发布于 {utc2locale(created_at || '')}, 编辑于{' '}
            {utc2locale(updated_at || '')}
          </div>
          {desc && <p className='desc'>{desc}</p>}
          {images && (
            <div className='pic'>
              {images.map((image) => (
                <img
                  src={image.match(/\(.*\)$/)[0].replace(/^\(|\)$/g, '')}
                  alt={
                    image.match(/^!\[.*\]/)[0].replace(/^!\[|\]$/g, '') || ''
                  }
                  key={image}
                />
              ))}
            </div>
          )}
          <ReactMarkdown
            className='markdown-body'
            source={
              body ? handleTagContent(body, 'details', 'exec') : undefined
              // body ? body.replace(/^<details>[\s\S]+<\/details>/g, '') : undefined
            }
            renderers={{
              code: CodeBlock,
            }}
            escapeHtml={false}
          />
          <div id='gitalk-container'></div>
          {isShowTerm ? (
            <a href={detail.html_url}>
              <p className='comment'>点击这里前往 Github 查看原文，交流意见~</p>
            </a>
          ) : null}

          {body && isShowTerm ? <Terms /> : null}
        </div>
      </Spin>
      <style jsx>
        {`
          .wrapper {
            padding-top: 0;
            min-height: 50vh;
          }

          .pic {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 15px;
            flex-wrap: wrap;
          }

          .pic > img {
            width: 80%;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            border-radius: 9px;
          }

          .pic > img + img {
            margin: 16px 0;
          }

          .desc {
            background-color: #dedede;
            font-size: 17px;
            border-radius: 5px;
            padding: 10px 20px;
            white-space: break-spaces;
          }

          .comment {
            margin: 50px 0 0;
            padding: 10px;
            border: 1px solid;
            border-radius: 10px;
          }

          .time {
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 10px;
          }
        `}
      </style>
    </div>
  )
}

PostDetail.propTypes = {
  detail: PropTypes.object.isRequired,
  setTOC: PropTypes.func.isRequired,
  clearDetail: PropTypes.func.isRequired,
  fetchPostDetail: PropTypes.func.isRequired,
  isShowTerm: PropTypes.bool.isRequired,
}

export default PostDetail
