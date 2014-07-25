ConveyerViewers = [];
// Part 2 of technical assessment for MVP talent
// implementation can be viewed throughout
// {conveyer_machine_directory}/js/
(function () {
  var root = this;
  var ConveyerMachine;

  if (typeof exports !== 'undefined')
    ConveyerMachine = exports;
  else
    ConveyerMachine = root.ConveyerMachine = window.ConveyerMachine || {};

  // Set some base math functions to the global
  // namespace
  min = min = Math.min, max = Math.max, pow = Math.pow, sqrt = Math.sqrt, log = Math.log, floor = Math.floor;

  // Do the same for array methods
  slice = Array.slice, splice = Array.splice, every = Array.every;

  // This will be needed
  // for the simulator and can be
  ConveyerMachine.rand = function(s, e) { return floor(Math.random(s, e) * 100); };

  // base of the viewer
  ConveyerMachine.viewer = ConveyerMachine.viewer || {};

  ConveyerMachine.viewer.isReset = 0;
  ConveyerMachine.viewer.uid = 0;

  // all the elements needed
  // for a proper conveyer viewer
  // on startup these elements
  // should all be pointed to 
  // actual elements
  ConveyerMachine.viewer.elements = {
					currentTime: {},
					elapsedTimeSinceReset: {},
					elapsedWeightMovedSinceReset: {},
					currentWeight: {},
					statusOfMachine: {},
					statusMessage: {},
					resetButton: {}
				    };

  // setup the reset event
  // handler.
  // @param elem -> DOM element
  ConveyerMachine.viewer.setupReset = function(elem)
  {
	elem.onclick = function() {  ConveyerMachine.viewer.isReset = 1; };
  };

  // plural version of resetting
  // this will allow multiple reset
  // buttons to reset their conveyer
  // @param elem -> DOM element with data-uid attribute
  ConveyerMachine.viewer.setupResetCopy = function(elem)
  {
	elem.onclick = function() { ConveyerViewers[this.getAttribute('data-uid')].isReset = 1; };
  }

  // register the given elements to 
  // the DOM. Any event based element
  // should be treated
  // @param props -> list of dom elements
  // @param copy -> copy this viewer attach to main viewer
  ConveyerMachine.viewer.register = function(props) 
  {
	for (var i in props)
		if (typeof ConveyerMachine.viewer.elements[i] !== 'undefined')
			if (i.match(/resetButton/) != null)
			        ConveyerMachine.viewer.setupReset(props[i]);	
			else
				ConveyerMachine.viewer.elements[i] = props[i];

  	return ConveyerMachine.viewer;      
  };

  // multiple version of
  // viewer/register/1 This will
  // take a viewers properties and
  // apply to them to the uid
  // @param props -> list of dom elements
  // @param uid -> uid id
  ConveyerMachine.viewer.registerCopy = function(props, uid) 
  {
	var copy = clone(ConveyerMachine.viewer);	

	for (var i in props)
		if (typeof copy.elements[i] !== 'undefined')
			if (i.match(/resetButton/) != null)
			        copy.setupResetCopy(props[i]);	
			else
				copy.elements[i] = props[i];

	return (ConveyerViewers[uid] = copy);
  };


  // display output of the Conveyer
  // machine
  // @param props -> list of dom elements
  ConveyerMachine.viewer.display = function(props) 
  {
	for (var i in props) 
		if (typeof ConveyerMachine.viewer.elements[i] !== 'undefined'
		   || ConveyerMachine.viewer.elements[i] != null)
			ConveyerMachine.viewer.elements[i].innerHTML = props[i];
  };

  // display output of the Conveyer
  // directly to the DOM
  // @param props -> list of dom element ids
  ConveyerMachine.viewer.displayDom = function(props)
  {
	for (var i in props) 
		if (typeof this.elements[i] !== 'undefined')
			document.getElementById(this.elements[i].id).innerHTML = props[i];

  } 

}).call(this);
