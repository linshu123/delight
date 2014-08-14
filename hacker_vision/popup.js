var site;
var key1;
var key2;

function setRadio(name, value) {
  var radios = document.querySelectorAll('input[name="' + name + '"]');
  for (var i = 0; i < radios.length; i++) {
    radios[i].checked = (radios[i].value == value);
    radios[i].disabled = !getEnabled();
  }
}

function update() {
  document.body.className = getEnabled() ? '' : 'disabled';

  if (getEnabled()) {
    //$('title').innerText = 'Hacker Vision is Enabled';
    $('toggle').innerHTML = '<b>Pause Hacker Vision</b>';
    $('subcontrols').style.display = 'block';
  } else {
    //$('title').innerText = 'Hacker Vision is Disabled';
    $('toggle').innerHTML = '<b>Resume<BR>Hacker Vision</b>';
    $('subcontrols').style.display = 'none';
  }

  setRadio('keyaction', getKeyAction());
  if (site) {
    setRadio('scheme', getSiteScheme(site));
    $('make_default').disabled = (getSiteScheme(site) == getDefaultScheme());
  } else {
    setRadio('scheme', getDefaultScheme());
  }
  if (getEnabled()) {
    document.documentElement.setAttribute(
        'hc',
        site ? 'a' + getSiteScheme(site) : 'a' + getDefaultScheme());
  } else {
    document.documentElement.setAttribute('hc', 'a0');
  }
  chrome.extension.getBackgroundPage().updateTabs();
}

function onToggle() {
  setEnabled(!getEnabled());
  update();
}

function onForget() {
  resetSiteSchemes();
  update();
}

function onRadioChange(name, value) {
  switch(name) {
    case 'keyaction':
      setKeyAction(value);
      break;
    case 'apply':
      setApply(value);
      break;
    case 'scheme':
      if (site) {
        setSiteScheme(site, value);
      } else {
        setDefaultScheme(value);
      }
      break;
  }
  update();
}

function onMakeDefault() {
  setDefaultScheme(getSiteScheme(site));
  update();
}

function addRadioListeners(name) {
  var radios = document.querySelectorAll('input[name="' + name + '"]');
  for (var i = 0; i < radios.length; i++) {
    radios[i].addEventListener('change', function(evt) {
      onRadioChange(evt.target.name, evt.target.value);
    }, false);
    radios[i].addEventListener('click', function(evt) {
      onRadioChange(evt.target.name, evt.target.value);
    }, false);
  }
}

function hideShow() {
  var e = document.getElementById('hiddenQR');
       if(e.style.display != 'none')
          e.style.display = 'none';
       else
          e.style.display = 'block';
}

function init() {
  addRadioListeners('keyaction');
  addRadioListeners('apply');
  addRadioListeners('scheme');
  $('toggle').addEventListener('click', onToggle, false);
  $('make_default').addEventListener('click', onMakeDefault, false);
  $('forget').addEventListener('click', onForget, false);
  $('donateLink').addEventListener('click', hideShow);
  //document.getElementById('donateLink').addEventListener('click', hideShow);
  if (navigator.appVersion.indexOf("Mac") != -1) {
    key1 = '&#x2318;+Shift+F11';
    key2 = '&#x2318;+Shift+F12';
  } else {
    key1 = 'Shift+F11';
    key2 = 'Shift+F12';
  }

  chrome.windows.getLastFocused({'populate': true}, function(window) {
    for (var i = 0; i < window.tabs.length; i++) {
      var tab = window.tabs[i];
      if (tab.active) {
        if (isDisallowedUrl(tab.url)) {
          $('scheme_title').innerText = 'Default color scheme:';
          $('make_default').style.display = 'none';
        } else {
          site = siteFromUrl(tab.url);
          $('scheme_title').innerHTML = 'Always view <b>' + site + '</b>'+ ' in';
          $('make_default').style.display = 'block';
        }
        update();
        return;
      }
    }
    site = 'unknown site';
    update();
  });
}

document.addEventListener('DOMContentLoaded', function () {
  init();
});
//document.getElementById('donateLink').addEventListener('click', hideShow);
