export function initialiseToggleAria(toggles, content){
  initialiseToggleAriaControls(toggles, content);
  initialiseToggleAriaSelected();
}

export function setActiveToggleAriaSelected(toggle){
  if (config.hideSelfOnClick){
    const currentValue = toggle.getAttribute('aria-selected');
    toggle.setAttribute('aria-selected', currentValue === 'true' ? 'false' : 'true');
  } else {
    toggle.setAttribute('aria-selected', 'true');
  }
}

export function setContentAria(data){
  content.forEach((item)=>{
    item.setAttribute('aria-hidden', 'true');
  });
}

export function setInactiveToggleAria(activeToggle){
  if (config.hideOthersOnClick){
    setInactiveToggleAriaSelected(activeToggle);
  }
}

const initialiseToggleAriaControls = (toggles, content)=>{
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

const setInactiveToggleAriaSelected = (activeToggle)=>{
  const inactiveToggles = getInactiveToggles(activeToggle);

  inactiveToggles.forEach((inactiveToggle)=>{
    inactiveToggle.setAttribute('aria-selected', 'false');
  });
};