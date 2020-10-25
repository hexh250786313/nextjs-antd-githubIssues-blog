const Terms = () => {
  return (
    <div className="terms">
      <p className="title">文档信息</p>

      <p className="content">
        版权声明：自由转载-非商用-非衍生-保持署名（
        <a href="http://creativecommons.org/licenses/by-nc-nd/3.0/deed.zh">
          创意共享3.0许可证
        </a>
        ）
      </p>

      <style jsx>{`
        .terms {
          width: 100%;
          background-color: #e6ecf4;
          padding: 20px;
          margin-top: 50px;
          font-weight: bold;
          font-size: 16px;
          border-radius: 10px;
        }

        .title {
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          padding-bottom: 3px;
        }

        .content {
          margin: 0;
        }
      `}</style>
    </div>
  )
}

export default Terms
