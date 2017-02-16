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

const getInactiveContent = (activeToggle)=>{
  const key = activeToggle.getAttribute('data-aparecium-toggles');
  let inactiveContent = [];

  for (let c in content){
    if (c !== key){
      inactiveContent.push(content[c]);
    }
  }

  inactiveContent = inactiveContent.reduce((prev, curr)=>{
    return prev.concat(curr);
  });

  return inactiveContent;
};

const getInactiveToggles = (item)=>{
  const activeAttribute = item.getAttribute('data-aparecium-toggles');
  let attribute;

  const inactiveToggles = toggles.filter((toggle)=>{
    attribute = toggle.getAttribute('data-aparecium-toggles');

    return attribute !== activeAttribute;
  });

  return inactiveToggles;
};

const getToggles = (data)=>{
  const toggles = data.map((item)=>{
    return document.querySelector(`[data-aparecium-toggles=${item}]`);
  });

  return toggles;
};

const initialiseContentAria = ()=>{
  const activeToggle = toggles[config.defaultShow];

  setActiveContentAria(activeToggle);
  setInactiveContentAria(activeToggle);
};

const initialiseToggleAria = ()=>{
  initialiseToggleAriaControls();
  initialiseToggleAriaSelected();
};

const initialiseToggleAriaControls = ()=>{
  let key;

  toggles.forEach((toggle)=>{
    key = toggle.getAttribute('data-aparecium-toggles');

    const idList = content[key].map((item, i)=>{
      return `${key}-${++i}`;
    });

    toggle.setAttribute('aria-controls', idList.join(' '));

    setContentIds(key, idList);
  });
};

const initialiseToggleAriaSelected = ()=>{
  const activeToggle = toggles[config.defaultShow];

  setActiveToggleAriaSelected(activeToggle);
  setInactiveToggleAriaSelected(activeToggle);
};

const setActiveContentAria = (activeToggle)=>{
  let attribute;
  const key = activeToggle.getAttribute('data-aparecium-toggles');

  content[key].forEach((item)=>{
    attribute = item.getAttribute('aria-hidden');

    if (_.isNull(attribute)){
      item.setAttribute('aria-hidden', 'false');
    } else if (config.hideSelfOnClick){
      item.setAttribute('aria-hidden', attribute === 'true' ? 'false' : 'true');
    } else {
      item.setAttribute('aria-hidden', 'false');
    }
  });
};

const setActiveToggleAriaSelected = (toggle)=>{
  if (config.hideSelfOnClick){
    const currentValue = toggle.getAttribute('aria-selected');
    toggle.setAttribute('aria-selected', currentValue === 'true' ? 'false' : 'true');
  } else {
    toggle.setAttribute('aria-selected', 'true');
  }
};

const setContentIds = (key, idList)=>{
  content[key].forEach((item, i)=>{
    item.id += idList[i];
  });
};

const setInactiveContentAria = (activeToggle)=>{
  const inactiveContent = getInactiveContent(activeToggle);

  inactiveContent.forEach((inactiveC)=>{
    inactiveC.setAttribute('aria-hidden', 'true');
  });
};

const setInactiveToggleAriaSelected = (activeToggle)=>{
  const inactiveToggles = getInactiveToggles(activeToggle);

  inactiveToggles.forEach((inactiveToggle)=>{
    inactiveToggle.setAttribute('aria-selected', 'false');
  });
};

const toggleClickHandler = (activeToggle, e)=>{
  e.preventDefault();

  setActiveContentAria(activeToggle);
  setActiveToggleAriaSelected(activeToggle);

  if (config.hideOthersOnClick){
    setInactiveContentAria(activeToggle);
    setInactiveToggleAriaSelected(activeToggle);
  }
};

export default function(data, options = {}){
  toggles = getToggles(data);
  content = getContent(data);

  if (toggles.length === 0 || content.length === 0) return;

  config = _.defaults(options, {
    defaultShow: 0
    , hideOthersOnClick: false
    , hideSelfOnClick: true
  });

  addToggleClickListener();
  initialiseToggleAria();
  initialiseContentAria();
}
/* eslint-enable */
