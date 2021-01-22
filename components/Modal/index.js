import classnames from 'classnames'
import './index.less'

export default function Modal({ content, onClick, isMobile,style }) {
  return (
    <div 
    style={style}
    className="modalBgc" onClick={onClick}>
      <div className={classnames("modal")}>
        {content}
      </div>
    </div>
  )
}
