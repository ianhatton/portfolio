/* eslint-disable max-len, no-use-before-define */
import _, {isElement} from 'lodash';

let config, content, toggles;

const addToggleClickListener = ()=>{
  toggles.forEach((item)=>{
    item.addEventListener('click', toggleClickHandler.bind(null, item), false);
  });
};

const getContent = (data)=>{
  const content = {};

  data.forEach((item)=>{
    content[item] = Array.from(document.querySelectorAll(`[data-aparecium-toggled-by=${item}]`));
  });

  return content;
};

const getToggles = (data)=>{
  const toggles = data.map((item)=>{
    return document.querySelector(`[data-aparecium-toggles=${item}]`);
  });

  return toggles;
};

const setContentAria = (data)=>{
  content.forEach((item)=>{
    item.setAttribute('aria-hidden', 'true');
  });
};

const setContentIds = (key, idList)=>{
  content[key].forEach((item, i)=>{
    item.id += idList[i];
  });
};

const setContentVisibility = (item)=>{
  let className;
  let key = item.getAttribute('data-aparecium-toggles');

  content[key].forEach((item)=>{
    className = item.className;

    if (_.includes(className, 'visible')){
      item.className = className.replace(/(?:^|\s)visible(?!\S)/g, '');
    } else {
      item.className += ' visible';
    }
  });
};

const setToggleAriaControls = ()=>{
  let key;

  toggles.forEach((toggle)=>{
    key = toggle.getAttribute('data-aparecium-toggles');

    let idList = content[key].map((item, i)=>{
      return `${key}-${++i}`;
    });

    toggle.setAttribute('aria-controls', idList.join(' '));

    setContentIds(key, idList);
  });
};

const setToggleAriaDefault = ()=>{
  setToggleAriaControls();
  // setToggleAriaSelected(data);
  set();
};

const set = ()=>{
  // if (config.defaultShow === 'first'){
  //   toggles[0].
  // }

  toggles[0].setAttribute('aria-selected', 'true');

  const inactiveToggles = toggles.filter((toggle, i)=>{
    return i !== 0;
  });

  inactiveToggles.forEach((inactiveToggle)=>{
    inactiveToggle.setAttribute('aria-selected', 'false');
  });
};

const setToggleAriaSelected = ()=>{
  // const currentValue = toggle.getAttribute('aria-selected');

  // console.log(currentValue);

  toggle.setAttribute('aria-selected', currentValue === 'true' ? 'false' : 'true');
};

const toggleClickHandler = (item, e)=>{
  e.preventDefault();

  setContentVisibility(item);
  // setToggleAriaSelected();
};

export default function(data){
  toggles = getToggles(data);
  content = getContent(data);

  if (toggles.length === 0 || content.length === 0) return;

  let object = {
    init: (options = {})=>{
      config = _.defaults(options, {
        defaultShow: 'first'
        , hideOthersOnClick: false
        , hideSelfOnClick: false
      });
      addToggleClickListener();
      setToggleAriaDefault();
      // setContentAria(data);
    }
  };

  return object;
}
/* eslint-enable */

// hideOthers = When a toggle is clicked, should it affect its siblings' visibility or not?
// hideSelf = When an active toggle is clicked, should it hide its contents or should they remain visible?
