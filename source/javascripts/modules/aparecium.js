/* eslint-disable max-len, no-use-before-define */
import _, {isElement} from 'lodash';

const contentAttribute = 'data-aparecium-target';
const toggleAttribute = 'data-aparecium';

const addToggleClickListener = (data)=>{
  data.toggles.forEach((toggle)=>{
    toggle.addEventListener('click', toggleClickHandler.bind(null, toggle, data), false);
  });
};

const getContent = (element, toggles)=>{
  const content = {};

  toggles.forEach((toggle)=>{
    const key = toggle.getAttribute(toggleAttribute);

    content[key] = Array.from(element.querySelectorAll(`[${contentAttribute}='${key}']`));
  });

  return content;
};

const getInactiveContent = (clickedToggle, data)=>{
  const key = clickedToggle.getAttribute(toggleAttribute);

  /* eslint-disable arrow-parens, arrow-spacing */
  let inactiveContent = Object.keys(data.content).filter(c => c !== key);

  if (inactiveContent.length > 0){
    inactiveContent = inactiveContent
      .map(c => data.content[c])
      .reduce((previous, current)=>{
        return previous.concat(current);
      });
  }
  /* eslint-enable */

  return inactiveContent;
};

const getInactiveToggles = (clickedToggle, data)=>{
  const activeAttribute = clickedToggle.getAttribute(toggleAttribute);

  const inactiveToggles = data.toggles.filter((toggle)=>{
    const attribute = toggle.getAttribute(toggleAttribute);

    return attribute !== activeAttribute;
  });

  return inactiveToggles;
};

const getToggles = (element)=>{
  let toggles = Array.from(element.querySelectorAll((`[${toggleAttribute}]`)));

  toggles = toggles.filter((toggle)=>{
    const key = toggle.getAttribute(toggleAttribute);

    return element.querySelectorAll(`[${contentAttribute}='${key}']`).length > 0;
  });

  return toggles;
};

const initialiseContentAria = (data)=>{
  const clickedToggle = initialiseDefaultToggle(data);

  setActiveContentAria(clickedToggle, data);
  setInactiveContentAria(clickedToggle, data);
};

const initialiseDefaultToggle = (data)=>{
  const defaultToggle = _.isElement(data.toggles[data.config.defaultShow]) ? data.toggles[data.config.defaultShow] : data.toggles[0];

  return defaultToggle;
};

const initialiseToggleAria = (data)=>{
  initialiseToggleAriaControls(data);
  initialiseToggleAriaSelected(data);
};

const initialiseToggleAriaControls = (data)=>{
  data.toggles.forEach((toggle)=>{
    const key = toggle.getAttribute(toggleAttribute);

    const idList = data.content[key].map((item, i)=>{
      return `${key}-${++i}`;
    });

    toggle.setAttribute('aria-controls', idList.join(' '));

    setContentIds(key, idList, data);
  });
};

const initialiseToggleAriaSelected = (data)=>{
  const clickedToggle = initialiseDefaultToggle(data);

  setActiveToggleAriaSelected(clickedToggle, data);
  setInactiveToggleAriaSelected(clickedToggle, data);
};

const setActiveContentAria = (clickedToggle, data)=>{
  const key = clickedToggle.getAttribute(toggleAttribute);

  data.content[key].forEach((item)=>{
    const attribute = item.getAttribute('aria-hidden');

    if (_.isNull(attribute) || !data.config.hideSelfOnClick){
      item.setAttribute('aria-hidden', 'false');
    } else {
      item.setAttribute('aria-hidden', attribute === 'true' ? 'false' : 'true');
    }
  });
};

const setActiveToggleAriaSelected = (clickedToggle, data)=>{
  if (data.config.hideSelfOnClick){
    const currentValue = clickedToggle.getAttribute('aria-selected');

    clickedToggle.setAttribute('aria-selected', currentValue === 'true' ? 'false' : 'true');
  } else {
    clickedToggle.setAttribute('aria-selected', 'true');
  }
};

const setContentIds = (key, idList, data)=>{
  data.content[key].forEach((item, i)=>{
    item.id += idList[i];
  });
};

const setData = (config, content, element, toggles)=>{
  return {
    config
    , content
    , element
    , toggles
  };
};

const setInactiveContentAria = (clickedToggle, data)=>{
  const inactiveContent = getInactiveContent(clickedToggle, data);

  inactiveContent.forEach((inactiveC)=>{
    inactiveC.setAttribute('aria-hidden', 'true');
  });
};

const setInactiveToggleAriaSelected = (clickedToggle, data)=>{
  const inactiveToggles = getInactiveToggles(clickedToggle, data);

  inactiveToggles.forEach((inactiveToggle)=>{
    inactiveToggle.setAttribute('aria-selected', 'false');
  });
};

const toggleClickHandler = (clickedToggle, data, e)=>{
  e.preventDefault();

  setActiveContentAria(clickedToggle, data);
  setActiveToggleAriaSelected(clickedToggle, data);

  if (data.config.hideOthersOnClick){
    setInactiveContentAria(clickedToggle, data);
    setInactiveToggleAriaSelected(clickedToggle, data);
  }
};

export default function(id){
  let config, content, data, toggles;

  const element = document.getElementById(id);

  if (!_.isElement(element)) return;

  return {
    init: (options = {})=>{
      config = _.defaults(options, {
        defaultShow: 0
        , hideOthersOnClick: true
        , hideSelfOnClick: false
      });
      toggles = getToggles(element);
      content = getContent(element, toggles);
      data = setData(config, content, element, toggles);

      addToggleClickListener(data);
      initialiseToggleAria(data);
      initialiseContentAria(data);
    }
  };
}
/* eslint-enable */
