```jsx harmony
import React, { memo, useEffect } from 'react';
import throttle from 'lodash/throttle';
import { parserBrowser } from '@/utils/tools';
import '@/modules/pageStyle/mallTab.scss';

const MallTab = ({ label, active, color, borderStyle, onActive }) => {
  const isIOS = parserBrowser() === 'ios';

  // label切换
  const handleLabel = (categoryId) => {
    if (active !== categoryId) {
      onActive && onActive(categoryId);
    }
  };

  /**
   * 设置tab吸顶
   * 1. 如果是ios用sticky，兼容性好，性能好
   * 2. 非ios时，支持交叉观察者模式，用交叉观察者模式，性能好，兼容性60%
   * 3. 非ios时，不支持交叉观察者模式用scroll
   */
  useEffect(() => {
    if (isIOS) {
      return;
    }
    const eleFixed = document.getElementsByClassName(
      'mall-tab-wrap',
    )[0];

    // 观察锚点
    const eleObs = document.getElementsByClassName('mall-tab-container')[0];

    const obsCallback = () => {
      const offsetTop = eleObs.getBoundingClientRect().top;
      if (offsetTop < 0) {
        eleFixed.classList.add('fixed');
      } else {
        eleFixed.classList.remove('fixed');
      }
    };

    if (IntersectionObserver) {
      const observer = new IntersectionObserver(obsCallback, {
        threshold: [1],
      });
      observer.observe(eleObs);
      return () => {
        observer.disconnect();
      };
    }
    window.addEventListener('scroll', throttle(obsCallback, 50));
    return () => {
      window.removeEventListener('scroll', obsCallback);
    };
  });

  return (
    <div className="mall-tab-container">
      <div className={`mall-tab-wrap ${isIOS ? 'sticky' : ''}`}>
        <div className="mall-tab-content">
          {label.map(({ categoryId, name }) => {
            const activeTab = active === categoryId;
            return (
              <div
                className={`mall-tab ${
                  activeTab ? 'mall-tab-active' : ''
                }`}
                key={categoryId}
                style={activeTab ? { color } : {}}
                onClick={() => {
                  handleLabel(categoryId);
                }}
              >
                {name}
                {activeTab && (
                  <span
                    className="mall-tab-active-border"
                    style={borderStyle || { backgroundColor: color }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default memo(MallTab);

```

```scss
@import "@/styles/func.scss";

.mall-tab-container {
  height: r(92);
}

.mall-tab-wrap {
  padding: 0 r(30);
  border-bottom: r(1) solid #eee;
  background: #fff;
  z-index: 1000;
}

.sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}

.fixed {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
}

.mall-tab-content {
  display: flex;
  flex-wrap: nowrap;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    height: 0;
  }

  .mall-tab {
    font-size: r(30);
    color: #999;
    white-space: nowrap;
    margin-right: r(90);
    height: r(90);
    line-height: r(90);

    &.mall-tab-active {
      position: relative;
      font-size: r(30);
      font-weight: 500;
      //color: #057aff;
      //border-bottom: r(6) solid #057aff;
    }
  }

  .mall-tab-active-border {
    position: absolute;
    bottom: 0;
    left: 10%;
    //background-image: linear-gradient(270deg, #fc0 0%, #ff6e0d 96%);
    width: 80%;
    height: r(6);
  }
}

```
