// import PropTypes from 'prop-types';
// import { Button } from 'antd';
import { Progress } from 'antd';
import { usePromiseTracker } from 'react-promise-tracker';
import { useState, useEffect, useRef } from 'react';

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const _Progress = () => {
  const { promiseInProgress } = usePromiseTracker();
  let [count, setCount] = useState(0);
  let [status, setStatus] = useState(false);

  if (promiseInProgress !== status) {
    setCount(0);
    setStatus(promiseInProgress);
  }

  useInterval(
    () => {
      console.log(count);
      // Your custom logic here
      if (count < 90) {
        setCount(count + 20);
      }
    },
    promiseInProgress ? 1000 : null,
  );

  return (
    <div
      // className='myprogress'
      className="top-progress"
      style={promiseInProgress ? { display: 'block' } : { display: 'none' }}
    >
      <style jsx>{`
        .top-progress {
          position: fixed;
          top: 0;
          width: 100vw;
          z-index: 1000;
        }

        :global(.top-progress .ant-progress) {
          line-height: 0;
          display: flex;
        }

        :global(.top-progress .ant-progress-inner) {
          border-radius: 0;
          height: 15px;
        }

        :global(.top-progress .ant-progress-bg) {
          height: 2px !important;
          border-radius: 0 100px 100px 0 !important;
          box-shadow: 0px 0px 10px 1px #000;
        }

        .myprogress {
          pointer-events: none;
        }

        .bar {
          background: #ffc900;
          position: fixed;
          z-index: 1031;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
        }
        .peg {
          display: block;
          position: absolute;
          right: 0px;
          width: 100px;
          height: 100%;
          box-shadow: 0 0 10px #ffc900, 0 0 5px #ffc900;
          opacity: 1;
          -webkit-transform: rotate(3deg) translate(0px, -4px);
          -ms-transform: rotate(3deg) translate(0px, -4px);
          transform: rotate(3deg) translate(0px, -4px);
        }
        .spinner {
          display: block;
          position: fixed;
          z-index: 1031;
          top: 15px;
          right: 15px;
        }
        .spinner-icon {
          width: 18px;
          height: 18px;
          box-sizing: border-box;
          border: solid 2px transparent;
          border-top-color: #ffc900;
          border-left-color: #ffc900;
          border-radius: 50%;
          -webkit-animation: myprogress-spinner 400ms linear infinite;
          animation: myprogress-spinner 400ms linear infinite;
        }
        .myprogress-custom-parent {
          overflow: hidden;
          position: relative;
        }

        .myprogress-custom-parent .myprogress .spinner,
        .myprogress-custom-parent .myprogress .bar {
          position: absolute;
        }

        @-webkit-keyframes myprogress-spinner {
          0% {
            -webkit-transform: rotate(0deg);
          }
          100% {
            -webkit-transform: rotate(360deg);
          }
        }
        @keyframes myprogress-spinner {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
      {
        // <>
        // <div className='bar'>
        // <div className='peg' />
        // </div>
        // <div className='spinner'>
        // <div className='spinner-icon' />
        // </div>
        // </>
      }

      {
        <Progress
          percent={count}
          size="small"
          showInfo={false}
          trailColor="rgba(0, 0, 0, 0)"
          status="active"
          strokeLinecap="square"
        />
      }
    </div>
  );
};

export default _Progress;

_Progress.propTypes = {
  // increment: PropTypes.func.isRequired,
  // decrement: PropTypes.func.isRequired,
  // reset: PropTypes.func.isRequired,
  // count: PropTypes.number.isRequired,
  // percent: PropTypes.number.isRequired,
};
