// Part 2 of technical assessment for MVP talent
// implementation can be viewed throughout
// {conveyer_machine_directory}/js/

// Base will make usage of all
(function () {
  var root = this;
  var ConveyerMachine;

  if (typeof exports !== 'undefined')
    ConveyerMachine = window.ConveyerMachine || {};
  else
    ConveyerMachine = root.ConveyerMachine;

  // Set some base math functions to the global
  // namespace
  min = min = Math.min, max = Math.max, pow = Math.pow, sqrt = Math.sqrt, log = Math.log, floor = Math.floor;

  // Do the same for array methods
  slice = Array.slice, splice = Array.splice, every = Array.every;

  // This will be needed
  // for the simulator and can be called
  ConveyerMachine.rand = function(s, e) { return floor(Math.random(s, e) * 100); };

  // base of the
  // object
  ConveyerMachine.base = {} || ConveyerMachine.base; 

  ConveyerMachine.base.mainInterval;

  ConveyerMachine.base.statusMessageStarting    = 'STARTING';
  ConveyerMachine.base.statusMessageRunning 	= 'RUNNING';
  ConveyerMachine.base.statusMessageRestarting  = 'RESTARTING';
  ConveyerMachine.base.statusMessageSimulating  = 'SIMULATING';
  ConveyerMachine.base.statusMessageDisplaying  = 'DISPLAYING';


  // total weight moved
  ConveyerMachine.base.totalWeight = 0.00;

  // statuses of the machine
  // include: lifting, simulating, resetting
  ConveyerMachine.base.statusMessage = '';

  // this will usually
  // be recomputed in the base
  ConveyerMachine.base.currentTime = new Date();

  // in seconds display
  // the amount of time
  // that has passed since inception
  // or reset
  ConveyerMachine.base.elapsedTimeSinceReset = 0;

 // the current amount of weight being
  // movied this is continuous and cannot
  // be reset
  ConveyerMachine.base.currentWeight = 0.00;

  // set the amount of runs
  // this will be incremented each time
  // the conveyer computes
  ConveyerMachine.base.amountOfRuns = 0;


  // weight that has been 
  // moved since the last
  // reset 
  ConveyerMachine.base.elapsedWeightMovedSinceReset = 0.00;

  // check if the machine has
  // been reset or not
  ConveyerMachine.base.isReset = 0;

  ConveyerMachine.base.resetCount = 0;
  
  ConveyerMachine.base.viewer = {};

  ConveyerMachine.base.restart = function()
  {
	console.log('Restaring... ');

	ConveyerMachine.base.statusMessage = ConveyerMachine.base.statusMessageRestarting;
	ConveyerMachine.base.viewer.isReset = 0;

	setTimeout(function() {
		ConveyerMachine.base.elapsedWeightMovedSinceReset = 0.00;
		ConveyerMachine.base.elapsedTimeSinceReset = 0; 
		ConveyerMachine.base.statusMessage = ConveyerMachine.base.statusMessageRunning; 
	}, 3000);
  };

  // run  the main loop
  // for this program
  // first we need to register this
  // in the viewer
  // @param callback -> function with response 
  // @param simulator -> ConvyerMachine.simulator
  // @param viewer -> ConveyerMachine.viewer
  ConveyerMachine.base.run = function(viewer, simulator, callback)
  {
	ConveyerMachine.base.viewer = viewer;
	ConveyerMachine.base.simulator = simulator;
	ConveyerMachine.base.statusMessage = ConveyerMachine.base.statusMessageStarting;
	ConveyerMachine.base.currentTime = new Date();
	ConveyerMachine.base.elapsedTimeSinceReset = 0;
	ConveyerMachine.base.viewer.display(ConveyerMachine.base);
	ConveyerMachine.base.signalStop = 0;

	return ConveyerMachine.base.mainInterval = 
	       setInterval(function() {
		    if (ConveyerMachine.base.viewer.isReset) 
		    	ConveyerMachine.base.restart();

		    if (ConveyerMachine.base.signalStop)
			return clearInterval(ConveyerMachine.base.mainInterval);
	
		    if (ConveyerMachine.base.statusMessage === ConveyerMachine.base.statusMessageRunning
                       || ConveyerMachine.base.statusMessage === ConveyerMachine.base.statusMessageStarting) {	
			    ConveyerMachine.base.statusMessage = ConveyerMachine.base.statusMessageRunning;
			    ConveyerMachine.base.oldWeight = ConveyerMachine.base.currentWeight;
			    ConveyerMachine.base.oldTime = ConveyerMachine.base.currentTime.getTime();

			    ConveyerMachine.base.currentTime = new Date();
			    ConveyerMachine.base.elapsedTimeSinceReset += Math.floor((ConveyerMachine.base.currentTime.getTime() - ConveyerMachine.base.oldTime) / 1000);
			    ConveyerMachine.base.currentWeight = simulator.generate(new Date().getTime(), ConveyerMachine.base.currentWeight, ConveyerMachine.base.statusMessage);
			    ConveyerMachine.base.elapsedWeightMovedSinceReset += ConveyerMachine.base.currentWeight - ConveyerMachine.base.oldWeight; 
		    }

		    ConveyerMachine.base.viewer.display(ConveyerMachine.base);	    
		    ConveyerMachine.base.amountOfRuns ++;

	            return callback(ConveyerMachine.base);
	}, 1000);
  };


  ConveyerMachine.base.restartOnce = function()
  {
	console.log('Restarting... ');
	this.viewer.isReset = 0;

	this.elapsedWeightMovedSinceReset = 0.00;
	this.elapsedTimeSinceReset = 0; 
	this.statusMessage = this.statusMessageRunning; 
	this.resetCount = 0;
  };

  // run once this is designed
  // for multiple instances of ConveyerMachine
  // running and must be handled externally
  // through a scheduler. Additionally
  // conveyermachine.base.register/2 must
  // be called before usage
  ConveyerMachine.base.runOnce = function()
  {
	if (this.viewer.isReset) {
		this.statusMessage = this.statusMessageRestarting;
		this.viewer.displayDom(this);
		if (this.resetCount === 5)
			this.restartOnce();
		else
			this.resetCount ++;
	}

	if (this.statusMessage === this.statusMessageRunning
           || this.statusMessage === this.statusMessageStarting
	   || this.amountOfRuns == 0)
	{
		this.statusMessage = this.statusMessageRunning;
		this.oldWeight = this.currentWeight;
		this.oldTime = this.currentTime.getTime();

		this.currentTime = new Date();
		this.elapsedTimeSinceReset += Math.ceil((this.currentTime.getTime() - this.oldTime) / 1000);
		this.currentWeight = this.simulator.generate(new Date().getTime(), this.currentWeight, this.statusMessage);
		this.elapsedWeightMovedSinceReset += this.currentWeight - this.oldWeight; 
		this.amountOfRuns += 1;
	}

	this.viewer.displayDom(this);
  };

  // register the base
  // object for the conveyer
  // @param viewer -> viewer
  // @param simulator -> simulator
  ConveyerMachine.base.register = function(viewer, simulator)
  {
	var t = clone(ConveyerMachine.base);
	t.viewer = viewer;
	t.simulator = simulator;

	return t;
  };
  
}).call(this);
