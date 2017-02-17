/* eslint-disable max-len, no-use-before-define */
import _, {isElement} from 'lodash';

const contentAttribute = 'data-aparecium-toggled-by';
const toggleAttribute = 'data-aparecium-toggles';

let config, content, toggles;

const addToggleClickListener = ()=>{
  toggles.forEach((toggle)=>{
    toggle.addEventListener('click', toggleClickHandler.bind(null, toggle), false);
  });
};

const getContent = (selectors)=>{
  const content = {};

  selectors.forEach((selector)=>{
    content[selector] = Array.from(document.querySelectorAll(`[${contentAttribute}=${selector}]`));

    if (content[selector].length === 0){
      delete content[selector];
    }
  });

  return content;
};

const getInactiveContent = (clickedToggle)=>{
  const key = clickedToggle.getAttribute(toggleAttribute);

  /* eslint-disable arrow-parens, arrow-spacing */
  let inactiveContent = Object.keys(content).filter(c => c !== key);

  if (inactiveContent.length > 0){
    inactiveContent = inactiveContent
      .map(c => content[c])
      .reduce((previous, current)=>{
        return previous.concat(current);
      });
  }
  /* eslint-enable */

  return inactiveContent;
};

const getInactiveToggles = (clickedToggle)=>{
  const activeAttribute = clickedToggle.getAttribute(toggleAttribute);

  const inactiveToggles = toggles.filter((toggle)=>{
    let attribute = toggle.getAttribute(toggleAttribute);

    return attribute !== activeAttribute;
  });

  return inactiveToggles;
};

const getToggles = (selectors)=>{
  const toggles = selectors
    .map((selector)=>{
      return document.querySelector(`[${toggleAttribute}=${selector}]`);
    })
    .filter((selector)=>{
      return !_.isNull(selector);
    });

  return toggles;
};

const initialiseContentAria = ()=>{
  const clickedToggle = initialiseDefaultToggle();

  setActiveContentAria(clickedToggle);
  setInactiveContentAria(clickedToggle);
};

const initialiseDefaultToggle = ()=>{
  const defaultToggle = _.isElement(toggles[config.defaultShow]) ? toggles[config.defaultShow] : toggles[0];

  return defaultToggle;
};

const initialiseToggleAria = ()=>{
  initialiseToggleAriaControls();
  initialiseToggleAriaSelected();
};

const initialiseToggleAriaControls = ()=>{
  toggles.forEach((toggle)=>{
    let key = toggle.getAttribute(toggleAttribute);

    const idList = content[key].map((item, i)=>{
      return `${key}-${++i}`;
    });

    toggle.setAttribute('aria-controls', idList.join(' '));

    setContentIds(key, idList);
  });
};

const initialiseToggleAriaSelected = ()=>{
  const clickedToggle = initialiseDefaultToggle();

  setActiveToggleAriaSelected(clickedToggle);
  setInactiveToggleAriaSelected(clickedToggle);
};

const setActiveContentAria = (clickedToggle)=>{
  const key = clickedToggle.getAttribute(toggleAttribute);

  content[key].forEach((item)=>{
    let attribute = item.getAttribute('aria-hidden');

    if (_.isNull(attribute)){
      item.setAttribute('aria-hidden', 'false');
    } else if (config.hideSelfOnClick){
      item.setAttribute('aria-hidden', attribute === 'true' ? 'false' : 'true');
    } else {
      item.setAttribute('aria-hidden', 'false');
    }
  });
};

const setActiveToggleAriaSelected = (clickedToggle)=>{
  if (config.hideSelfOnClick){
    const currentValue = clickedToggle.getAttribute('aria-selected');
    clickedToggle.setAttribute('aria-selected', currentValue === 'true' ? 'false' : 'true');
  } else {
    clickedToggle.setAttribute('aria-selected', 'true');
  }
};

const setContentIds = (key, idList)=>{
  content[key].forEach((item, i)=>{
    item.id += idList[i];
  });
};

const setInactiveContentAria = (clickedToggle)=>{
  const inactiveContent = getInactiveContent(clickedToggle);

  inactiveContent.forEach((inactiveC)=>{
    inactiveC.setAttribute('aria-hidden', 'true');
  });
};

const setInactiveToggleAriaSelected = (clickedToggle)=>{
  const inactiveToggles = getInactiveToggles(clickedToggle);

  inactiveToggles.forEach((inactiveToggle)=>{
    inactiveToggle.setAttribute('aria-selected', 'false');
  });
};

const toggleClickHandler = (clickedToggle, e)=>{
  e.preventDefault();

  setActiveContentAria(clickedToggle);
  setActiveToggleAriaSelected(clickedToggle);

  if (config.hideOthersOnClick){
    setInactiveContentAria(clickedToggle);
    setInactiveToggleAriaSelected(clickedToggle);
  }
};

export default function(selectors, options = {}){
  toggles = getToggles(selectors);
  content = getContent(selectors);

  if (toggles.length === 0 || _.isEmpty(content)) return;

  config = _.defaults(options, {
    defaultShow: 0
    , hideOthersOnClick: true
    , hideSelfOnClick: false
  });

  addToggleClickListener();
  initialiseToggleAria();
  initialiseContentAria();
}
/* eslint-enable */
