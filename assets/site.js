/* David Lee's Lab — shared behavior: theme toggle, reveal, nav */
(function(){
  var root=document.documentElement;
  function eff(){return root.getAttribute('data-theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');}
  function wireTheme(){
    var tb=document.getElementById('themeBtn');
    if(!tb)return;
    function paint(){tb.textContent=eff()==='dark'?'☀':'☾';}
    paint();
    tb.addEventListener('click',function(){
      var next=eff()==='dark'?'light':'dark';
      root.setAttribute('data-theme',next);
      try{localStorage.setItem('theme',next);}catch(e){}
      paint();
    });
  }
  function wireNav(){
    var nav=document.getElementById('nav');
    if(!nav)return;
    addEventListener('scroll',function(){nav.classList.toggle('scrolled',scrollY>12);});
  }
  function wireReveal(){
    var els=document.querySelectorAll('.reveal');
    if(!('IntersectionObserver'in window)){els.forEach(function(e){e.classList.add('in');});return;}
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.1});
    els.forEach(function(e){io.observe(e);});
  }
  function init(){wireTheme();wireNav();wireReveal();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
  else init();
})();
