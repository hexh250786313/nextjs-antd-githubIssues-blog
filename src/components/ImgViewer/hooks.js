import { useEffect, useState, useCallback } from 'react'

const initDragState = (() => {
  const obj = {
    active: false,
    currentX: 0,
    currentY: 0,
    initialX: 0,
    initialY: 0,
    xOffset: 0,
    yOffset: 0
  }
  return obj
})()

export const useTranslate = ({ container, dragItem }) => {
  const [translate, setTranslate] = useState({
    X: 0,
    Y: 0
  })
  const [dragState, setDragState] = useState(initDragState)

  const initState = useCallback(() => {
    setTranslate({ X: 0, Y: 0 })
    setDragState(initDragState)
  }, [])

  const _dragStart = useCallback(
    (e) => {
      if (e.type === 'touchstart') {
        if (e.target === dragItem) {
          setDragState((prevState) => ({
            ...prevState,
            initialX: e.touches[0].clientX - prevState.xOffset,
            initialY: e.touches[0].clientY - prevState.yOffset,
            active: true
          }))
        } else {
          setDragState((prevState) => ({
            ...prevState,
            initialX: e.touches[0].clientX - prevState.xOffset,
            initialY: e.touches[0].clientY - prevState.yOffset
          }))
        }
      } else if (e.target === dragItem) {
          setDragState((prevState) => ({
            ...prevState,
            initialX: e.clientX - prevState.xOffset,
            initialY: e.clientY - prevState.yOffset,
            active: true
          }))
        } else {
          setDragState((prevState) => ({
            ...prevState,
            initialX: e.clientX - prevState.xOffset,
            initialY: e.clientY - prevState.yOffset
          }))
        }

      // console.log(`开始拖拽`);
    },
    [dragItem]
  )

  const _dragEnd = useCallback(() => {
    setDragState((prevState) => ({
      ...prevState,
      initialX: prevState.currentX,
      initialY: prevState.currentY,
      active: false
    }))
    // console.log(`拖拽结束`);
  }, [])

  const _drag = useCallback(
    (e) => {
      if (dragState.active) {
        e.preventDefault()
        // console.log(`拖拽中`);

        if (e.type === 'touchmove') {
          setDragState((prevState) => ({
            ...prevState,
            currentX: e.touches[0].clientX - prevState.initialX,
            currentY: e.touches[0].clientY - prevState.initialY,
            xOffset: e.touches[0].clientX - prevState.initialX,
            yOffset: e.touches[0].clientY - prevState.initialY
          }))
        } else {
          setDragState((prevState) => ({
            ...prevState,
            currentX: e.clientX - prevState.initialX,
            currentY: e.clientY - prevState.initialY,
            xOffset: e.clientX - prevState.initialX,
            yOffset: e.clientY - prevState.initialY
          }))
        }

        // setTranslate({ X: nextDragState.currentX, Y: nextDragState.currentY });
      }
    },
    [dragState.active]
  )

  useEffect(() => {
    if (!!dragItem && !!container) {
      // console.log(`钩子开始`);

      container.addEventListener('touchstart', _dragStart, false)
      container.addEventListener('touchend', _dragEnd, false)
      container.addEventListener('touchmove', _drag, false)

      container.addEventListener('mousedown', _dragStart, false)
      container.addEventListener('mouseup', _dragEnd, false)
      container.addEventListener('mousemove', _drag, false)
      return () => {
        // console.log(`钩子结束`);
        container.removeEventListener('touchstart', _dragStart, false)
        container.removeEventListener('touchend', _dragEnd, false)
        container.removeEventListener('touchmove', _drag, false)

        container.removeEventListener('mousedown', _dragStart, false)
        container.removeEventListener('mouseup', _dragEnd, false)
        container.removeEventListener('mousemove', _drag, false)
      }
    }
  }, [dragItem, container, _dragStart, _dragEnd, _drag])

  useEffect(() => {
    setTranslate({
      X: dragState.currentX,
      Y: dragState.currentY
    })
  }, [dragState.currentX, dragState.currentY])

  return [translate, initState]
}
