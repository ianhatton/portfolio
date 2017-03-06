/* eslint-disable max-len, no-use-before-define */
import _, {isElement} from 'lodash';

const targetAttribute = 'data-aparecium-target';
const toggleAttribute = 'data-aparecium';

const addToggleClickListener = (data)=>{
  data.toggles.forEach((toggle)=>{
    toggle.addEventListener('click', toggleClickHandler.bind(null, toggle, data), false);
  });
};

const getInactiveTargets = (toggle, data)=>{
  const key = toggle.getAttribute(toggleAttribute);

  /* eslint-disable arrow-parens, arrow-spacing */
  let inactiveTargets = Object.keys(data.targets).filter(target => target !== key);

  if (inactiveTargets.length > 0){
    inactiveTargets = inactiveTargets
      .map(inactiveTarget => data.targets[inactiveTarget])
      .reduce((previous, current)=>{
        return previous.concat(current);
      });
  }
  /* eslint-enable */

  return inactiveTargets;
};

const getInactiveToggles = (toggle, data)=>{
  const activeAttribute = toggle.getAttribute(toggleAttribute);

  const inactiveToggles = data.toggles.filter((toggle)=>{
    const attribute = toggle.getAttribute(toggleAttribute);

    return attribute !== activeAttribute;
  });

  return inactiveToggles;
};

const getTargets = (element, toggles)=>{
  const targets = {};

  toggles.forEach((toggle)=>{
    const key = toggle.getAttribute(toggleAttribute);

    targets[key] = Array.from(element.querySelectorAll(`[${targetAttribute}='${key}']`));
  });

  return targets;
};

const getToggles = (element)=>{
  let toggles = Array.from(element.querySelectorAll((`[${toggleAttribute}]`)));

  toggles = toggles.filter((toggle)=>{
    const key = toggle.getAttribute(toggleAttribute);

    return element.querySelectorAll(`[${targetAttribute}='${key}']`).length > 0;
  });

  return toggles;
};

const initialiseDefaultToggle = (data)=>{
  const defaultToggle = _.isElement(data.toggles[data.config.defaultShow]) ? data.toggles[data.config.defaultShow] : data.toggles[0];

  return defaultToggle;
};

const initialiseTargetAria = (data)=>{
  if (data.config.defaultShow === 'all'){
    data.toggles.forEach((toggle)=>{
      setActiveTargetAria(toggle, data);
    });
  } else {
    const toggle = initialiseDefaultToggle(data);

    setActiveTargetAria(toggle, data);
    setInactiveTargetAria(toggle, data);
  }
};

const initialiseToggleAria = (data)=>{
  initialiseToggleAriaControls(data);
  initialiseToggleAriaSelected(data);
};

const initialiseToggleAriaControls = (data)=>{
  data.toggles.forEach((toggle)=>{
    const key = toggle.getAttribute(toggleAttribute);

    const idList = data.targets[key].map((item, i)=>{
      return `${key}-${++i}`;
    });

    toggle.setAttribute('aria-controls', idList.join(' '));

    setTargetIds(key, idList, data);
  });
};

const initialiseToggleAriaSelected = (data)=>{
  if (data.config.defaultShow === 'all'){
    data.toggles.forEach((toggle)=>{
      setActiveToggleAriaSelected(toggle, data);
    });
  } else {
    const toggle = initialiseDefaultToggle(data);

    setActiveToggleAriaSelected(toggle, data);
    setInactiveToggleAriaSelected(toggle, data);
  }
};

const setActiveTargetAria = (toggle, data)=>{
  const key = toggle.getAttribute(toggleAttribute);

  data.targets[key].forEach((item)=>{
    const attribute = item.getAttribute('aria-hidden');

    if (_.isNull(attribute) || !data.config.hideSelfOnClick){
      item.setAttribute('aria-hidden', 'false');
    } else {
      item.setAttribute('aria-hidden', attribute === 'true' ? 'false' : 'true');
    }
  });
};

const setActiveToggleAriaSelected = (toggle, data)=>{
  if (data.config.hideSelfOnClick){
    const currentValue = toggle.getAttribute('aria-selected');

    toggle.setAttribute('aria-selected', currentValue === 'true' ? 'false' : 'true');
  } else {
    toggle.setAttribute('aria-selected', 'true');
  }
};

const setData = (config, element, targets, toggles)=>{
  return {
    config
    , element
    , targets
    , toggles
  };
};

const setInactiveTargetAria = (toggle, data)=>{
  const inactiveTargets = getInactiveTargets(toggle, data);

  inactiveTargets.forEach((inactiveTarget)=>{
    inactiveTarget.setAttribute('aria-hidden', 'true');
  });
};

const setInactiveToggleAriaSelected = (toggle, data)=>{
  const inactiveToggles = getInactiveToggles(toggle, data);

  inactiveToggles.forEach((inactiveToggle)=>{
    inactiveToggle.setAttribute('aria-selected', 'false');
  });
};

const setTargetIds = (key, idList, data)=>{
  data.targets[key].forEach((item, i)=>{
    item.id += idList[i];
  });
};

const toggleClickHandler = (toggle, data, e)=>{
  e.preventDefault();

  setActiveTargetAria(toggle, data);
  setActiveToggleAriaSelected(toggle, data);

  if (data.config.hideOthersOnClick){
    setInactiveTargetAria(toggle, data);
    setInactiveToggleAriaSelected(toggle, data);
  }
};

export default function(id){
  let config, data, targets, toggles;

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
      targets = getTargets(element, toggles);
      data = setData(config, element, targets, toggles);

      addToggleClickListener(data);
      initialiseToggleAria(data);
      initialiseTargetAria(data);
    }
  };
}
/* eslint-enable */
